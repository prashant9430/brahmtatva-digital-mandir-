// Bhavaphal ch21 (karma bhava) checks. Run: node tests/validate-karmaphal.js
// Fixtures: hand-computed synthetic charts (whole-sign houses from stated lagna; BPHS 3.11
// classes with dynamic Moon). Curation record: docs/bhavaphal-ch21-ledger-draft.md
// (sign/reading corrections). Scans hardened per the ch22 correction:
// served text+detail+transparency+note scan plus source-literal
// scan EXTENDED to backtick templates.
'use strict';
const fs=require('fs');
const T=require('../kundli-karmaphal.js');
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}

const SEVENG=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
function mk(map,rahu){const ps=SEVENG.map(g=>({graha:g,rashi:map[g],degreesInRashi:10}));
 if(rahu!==undefined&&rahu!==null)ps.push({graha:'Rahu',rashi:rahu,degreesInRashi:10});return ps;}
function row(rep,id){const r=rep.rows.find(x=>x.id===id);if(!r)throw Error('row missing '+id);return r;}
// asc 0 (Aries): karmesh=SIGN_LORD[9]=Saturn, labhesh=SIGN_LORD[10]=Saturn, lagnesh=Mars,
// bhagyesh=Jupiter, randhresh=Mars, saptamesh=Venus; kendrashesh={Mars,Moon,Venus,Saturn}

// --- F1: c21-3b Rahu placement (fact) in kendra/trikona
{
 const rep=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:10},3),0);
 ck('F1a c21-3b served (Rahu bhava 4, kendra)',row(rep,'c21-3b').served===true,{d:row(rep,'c21-3b').detail});
 const m=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:10},1),0);
 ck('F1b mutation: Rahu bhava 2 -> c21-3b unserved',row(m,'c21-3b').served===false);
 const m2=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:10}),0);
 ck('F1c Rahu absent -> unserved + honest detail',row(m2,'c21-3b').served===false&&row(m2,'c21-3b').detail.includes('उपलब्ध नहीं'));
 ck('F1d note disclaims instruction + node participation',row(rep,'c21-3b').note.includes('क्रिया-निर्देश नहीं')&&row(rep,'c21-3b').note.includes('अमॉडल'));
}
// --- F2: c21-4 benefic yuti + kendra/trikona (AND; proxy named)
{
 const rep=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:0,Saturn:0}),0);
 ck('F2a c21-4 served (Saturn bhava1 + Venus yuti)',row(rep,'c21-4').served===true,{d:row(rep,'c21-4').detail});
 const m=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:1,Saturn:1}),0);
 ck('F2b mutation: karmesh to bhava 2 -> unserved',row(m,'c21-4').served===false);
 const m2=T.report(mk({Sun:5,Moon:3,Mars:0,Mercury:1,Jupiter:2,Venus:4,Saturn:0}),0);
 ck('F2c mutation: malefic-only yuti -> unserved',row(m2,'c21-4').served===false,{d:row(m2,'c21-4').detail});
 ck('F2d note records Sanskrit-primary AND + named proxy + no anyatha row',row(rep,'c21-4').note.includes('Sanskrit-primary AND')&&row(rep,'c21-4').note.includes('नामित परिपाटी'));
}
// --- F3: c21-5 malefics in 10th AND 11th; nodes never count
{
 const rep=T.report(mk({Sun:5,Moon:3,Mars:9,Mercury:1,Jupiter:2,Venus:4,Saturn:10}),0);
 ck('F3a c21-5 served (Mars 10th, Saturn 11th)',row(rep,'c21-5').served===true,{d:row(rep,'c21-5').detail});
 const m=T.report(mk({Sun:5,Moon:3,Mars:9,Mercury:1,Jupiter:2,Venus:4,Saturn:0}),0);
 ck('F3b mutation: no malefic in 11th -> unserved',row(m,'c21-5').served===false);
 const m2=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:10},9),0);
 ck('F3c Rahu in 10th does NOT count as the 10th-bhava malefic',row(m2,'c21-5').served===false,{d:row(m2,'c21-5').detail});
 ck('F3d conduct framing in text',row(rep,'c21-5').text.includes('ऐतिहासिक आचरण-कथन'));
}
// --- F4: c21-7 (karmesh+Mars+Saturn in 7th; saptamesh malefic-yuti) - G6 softened
{
 const rep=T.report(mk({Sun:2,Moon:3,Mars:6,Mercury:1,Jupiter:4,Venus:2,Saturn:6}),0);
 ck('F4a c21-7 served (Saturn+Mars 7th; Venus+Sun yuti)',row(rep,'c21-7').served===true,{d:row(rep,'c21-7').detail});
 ck('F4b G6 softened text',row(rep,'c21-7').text.includes('भोग-परायण आचरण')&&row(rep,'c21-7').text.includes('ऐतिहासिक आचरण-कथन'));
 const m=T.report(mk({Sun:5,Moon:3,Mars:6,Mercury:1,Jupiter:2,Venus:2,Saturn:6}),0);
 ck('F4c mutation: saptamesh without malefic yuti -> unserved',row(m,'c21-7').served===false);
 const m2=T.report(mk({Sun:2,Moon:3,Mars:5,Mercury:1,Jupiter:4,Venus:2,Saturn:6}),0);
 ck('F4d mutation: Mars out of 7th -> unserved',row(m2,'c21-7').served===false);
}
// --- F5: c21-8 (asc 4 Leo: karmesh Venus, bhagyesh Mars)
{
 const rep=T.report(mk({Sun:5,Moon:3,Mars:1,Mercury:2,Jupiter:11,Venus:11,Saturn:7}),4);
 ck('F5a c21-8 served (Venus exalted + Jupiter yuti; Mars bhava10)',row(rep,'c21-8').served===true,{d:row(rep,'c21-8').detail});
 const m=T.report(mk({Sun:5,Moon:3,Mars:1,Mercury:2,Jupiter:0,Venus:11,Saturn:7}),4);
 ck('F5b mutation: Jupiter yuti removed -> unserved',row(m,'c21-8').served===false);
 const m2=T.report(mk({Sun:5,Moon:3,Mars:0,Mercury:2,Jupiter:11,Venus:11,Saturn:7}),4);
 ck('F5c mutation: bhagyesh out of 10th -> unserved',row(m2,'c21-8').served===false);
 const m3=T.report(mk({Sun:5,Moon:3,Mars:1,Mercury:2,Jupiter:11,Venus:10,Saturn:7}),4);
 ck('F5d mutation: Venus not exalted -> unserved',row(m3,'c21-8').served===false,{d:row(m3,'c21-8').detail});
}
// --- F6: c21-9 (asc 1 Taurus: karmesh Saturn, labhesh Jupiter) - both branches, no yuti needed
{
 const rep=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:2,Jupiter:10,Venus:4,Saturn:1}),1);
 ck('F6a c21-9 served (labhesh 10th + karmesh lagna)',row(rep,'c21-9').served===true,{d:row(rep,'c21-9').detail});
 const rep2=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:2,Jupiter:7,Venus:4,Saturn:4}),1);
 ck('F6b c21-9 served via both-in-kendra (no yuti)',row(rep2,'c21-9').served===true,{d:row(rep2,'c21-9').detail});
 const m=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:2,Jupiter:3,Venus:4,Saturn:2}),1);
 ck('F6c mutation: neither branch -> unserved',row(m,'c21-9').served===false);
 ck('F6d note records no-yuti reading',row(rep,'c21-9').note.includes('Sanskrit-primary')&&row(rep,'c21-9').note.includes('युति-शर्त नहीं'));
}
// --- F7: c21-11 (Sun+Rahu+Mars+Saturn all in 11th)
{
 const rep=T.report(mk({Sun:10,Moon:3,Mars:10,Mercury:1,Jupiter:2,Venus:4,Saturn:10},10),0);
 ck('F7a c21-11 served (all four in 11th)',row(rep,'c21-11').served===true,{d:row(rep,'c21-11').detail});
 const m=T.report(mk({Sun:10,Moon:3,Mars:10,Mercury:1,Jupiter:2,Venus:4,Saturn:10},9),0);
 ck('F7b mutation: Rahu out of 11th -> unserved',row(m,'c21-11').served===false);
 const m2=T.report(mk({Sun:10,Moon:3,Mars:10,Mercury:1,Jupiter:2,Venus:4,Saturn:9},10),0);
 ck('F7c mutation: Saturn out of 11th -> unserved',row(m2,'c21-11').served===false);
}
// --- F8: c21-13 (kendresh in 11th; labhesh lagna; Venus 10th) - kendresh Sanskrit-primary
{
 const rep=T.report(mk({Sun:5,Moon:10,Mars:7,Mercury:1,Jupiter:2,Venus:9,Saturn:0}),0);
 ck('F8a c21-13 served (Moon kendresh in 11th; Saturn lagna; Venus 10th)',row(rep,'c21-13').served===true,{d:row(rep,'c21-13').detail});
 ck('F8b rewording note keeps meaning without scan token',row(rep,'c21-13').note.includes('अर्थ-संकेत')&&row(rep,'c21-13').note.includes('स्रोत-अभिलेख')&&!row(rep,'c21-13').note.includes('रत्न'));
 ck('F8c reworded fruit text',row(rep,'c21-13').text.includes('आभूषण-समृद्धि')&&row(rep,'c21-13').text.includes('ऐतिहासिक अभिप्राय'));
 const m=T.report(mk({Sun:5,Moon:11,Mars:7,Mercury:1,Jupiter:2,Venus:9,Saturn:0}),0);
 ck('F8d mutation: no kendresh in 11th -> unserved',row(m,'c21-13').served===false,{d:row(m,'c21-13').detail});
 const m2=T.report(mk({Sun:5,Moon:10,Mars:7,Mercury:1,Jupiter:2,Venus:8,Saturn:0}),0);
 ck('F8e mutation: Venus out of 10th -> unserved',row(m2,'c21-13').served===false);
}
// --- F9: c21-14 (asc 0: karmesh Saturn exalted bhava7; Jupiter yuti OR drishti)
{
 const rep=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:1,Jupiter:6,Venus:4,Saturn:6}),0);
 ck('F9a c21-14 served via Jupiter yuti',row(rep,'c21-14').served===true,{d:row(rep,'c21-14').detail});
 const rep2=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:1,Jupiter:0,Venus:4,Saturn:6}),0);
 const r2=row(rep2,'c21-14');
 ck('F9b c21-14 served via Jupiter 7th drishti',r2.served===true&&r2.detail.includes('दृष्टि'),{d:r2.detail});
 const m=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:1,Jupiter:1,Venus:4,Saturn:6}),0);
 ck('F9c mutation: no yuti, no aspect -> unserved',row(m,'c21-14').served===false,{d:row(m,'c21-14').detail});
 const m2=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:1,Jupiter:6,Venus:4,Saturn:5}),0);
 ck('F9d mutation: not exalted -> unserved',row(m2,'c21-14').served===false);
}
// --- F10: c21-15 (asc 1: karmesh Saturn in lagna with lagnesh Venus; Moon KT)
{
 const rep=T.report(mk({Sun:5,Moon:4,Mars:7,Mercury:2,Jupiter:3,Venus:1,Saturn:1}),1);
 ck('F10a c21-15 served (Saturn+Venus lagna; Moon bhava4)',row(rep,'c21-15').served===true,{d:row(rep,'c21-15').detail});
 const m=T.report(mk({Sun:5,Moon:4,Mars:7,Mercury:2,Jupiter:3,Venus:0,Saturn:1}),1);
 ck('F10b mutation: lagnesh yuti removed -> unserved',row(m,'c21-15').served===false);
 const m2=T.report(mk({Sun:5,Moon:0,Mars:7,Mercury:2,Jupiter:3,Venus:1,Saturn:1}),1); // Moon sign 0 = bhava 12 (not KT)
 ck('F10c mutation: Moon out of KT -> unserved',row(m2,'c21-15').served===false);
 const m3=T.report(mk({Sun:5,Moon:8,Mars:7,Mercury:5,Jupiter:3,Venus:1,Saturn:2}),5); // Virgo: lagnesh=karmesh=Mercury
 ck('F10d karmesh==lagnesh: honestly unserved + noted',row(m3,'c21-15').served===false&&row(m3,'c21-15').detail.includes('युति स्वयं से संभव नहीं'),{d:row(m3,'c21-15').detail});
}
// --- F11: c21-17 (karmesh 8th; randhresh 10th with malefic yuti)
{
 const rep=T.report(mk({Sun:9,Moon:3,Mars:9,Mercury:1,Jupiter:2,Venus:4,Saturn:7}),0);
 ck('F11a c21-17 served (Saturn 8th; Mars 10th + Sun)',row(rep,'c21-17').served===true,{d:row(rep,'c21-17').detail});
 const m=T.report(mk({Sun:5,Moon:3,Mars:9,Mercury:1,Jupiter:2,Venus:4,Saturn:7}),0);
 ck('F11b mutation: randhresh without malefic yuti -> unserved',row(m,'c21-17').served===false);
 const m2=T.report(mk({Sun:9,Moon:3,Mars:9,Mercury:1,Jupiter:2,Venus:4,Saturn:6}),0);
 ck('F11c mutation: karmesh out of 8th -> unserved',row(m2,'c21-17').served===false);
}
// --- F12: c21-18 (debilitated karmesh; malefics in 10th and 7th=10th-from-10th)
{
 const rep=T.report(mk({Sun:6,Moon:3,Mars:9,Mercury:1,Jupiter:2,Venus:4,Saturn:0}),0);
 ck('F12a c21-18 served (Saturn debil; Sun 7th, Mars 10th)',row(rep,'c21-18').served===true,{d:row(rep,'c21-18').detail});
 const m=T.report(mk({Sun:6,Moon:3,Mars:9,Mercury:1,Jupiter:2,Venus:4,Saturn:6}),0);
 ck('F12b mutation: karmesh not debilitated -> unserved',row(m,'c21-18').served===false);
 const m2=T.report(mk({Sun:5,Moon:3,Mars:9,Mercury:1,Jupiter:2,Venus:4,Saturn:0}),0);
 ck('F12c mutation: no malefic in 7th -> unserved',row(m2,'c21-18').served===false);
}
// --- F13: c21-19 (Moon 10th; karmesh in 2nd/6th=trine-from-10th; lagnesh kendra)
{
 const rep=T.report(mk({Sun:5,Moon:9,Mars:0,Mercury:3,Jupiter:2,Venus:4,Saturn:1}),0);
 ck('F13a c21-19 served (Moon 10th; Saturn 2nd; Mars lagna)',row(rep,'c21-19').served===true,{d:row(rep,'c21-19').detail});
 const rep2=T.report(mk({Sun:5,Moon:9,Mars:0,Mercury:3,Jupiter:2,Venus:4,Saturn:5}),0);
 ck('F13b c21-19 served via 6th (other trine)',row(rep2,'c21-19').served===true);
 const m=T.report(mk({Sun:5,Moon:9,Mars:0,Mercury:3,Jupiter:2,Venus:4,Saturn:2}),0);
 ck('F13c mutation: karmesh 3rd (not trine-from-10th) -> unserved',row(m,'c21-19').served===false);
 const m2=T.report(mk({Sun:5,Moon:8,Mars:0,Mercury:3,Jupiter:2,Venus:4,Saturn:1}),0);
 ck('F13d mutation: Moon out of 10th -> unserved',row(m2,'c21-19').served===false);
 ck('F13e note records karmesh-trine reading',row(rep,'c21-19').note.includes('त्रिकोण')&&row(rep,'c21-19').note.includes('विमत'));
}
// --- F14: c21-21 (karmesh 9th; lagnesh 10th; Moon 5th)
{
 const rep=T.report(mk({Sun:5,Moon:4,Mars:9,Mercury:3,Jupiter:2,Venus:6,Saturn:8}),0);
 ck('F14a c21-21 served (Saturn 9th; Mars 10th; Moon 5th)',row(rep,'c21-21').served===true,{d:row(rep,'c21-21').detail});
 const m=T.report(mk({Sun:5,Moon:4,Mars:8,Mercury:3,Jupiter:2,Venus:6,Saturn:8}),0);
 ck('F14b mutation: lagnesh out of 10th -> unserved',row(m,'c21-21').served===false);
 const m2=T.report(mk({Sun:5,Moon:3,Mars:9,Mercury:3,Jupiter:2,Venus:6,Saturn:8}),0);
 ck('F14c mutation: Moon out of 5th -> unserved',row(m2,'c21-21').served===false);
}
// --- F15: node yuti never fires any yuti condition
{
 const rep=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:0},0),0);
 ck('F15a Rahu yuti with karmesh does NOT fire c21-4',row(rep,'c21-4').served===false,{d:row(rep,'c21-4').detail});
 const rep2=T.report(mk({Sun:5,Moon:3,Mars:6,Mercury:1,Jupiter:4,Venus:2,Saturn:6},2),0);
 ck('F15b Rahu yuti with saptamesh does NOT fire c21-7',row(rep2,'c21-7').served===false,{d:row(rep2,'c21-7').detail});
}
// --- F16: waning Moon counts as the malefic (3.11 dynamic class) for c21-5
{
 // Sun sign 2 -> 70d; Moon sign 10 -> 310d; elongation mod(310-70,360)=240 -> waning -> पाप
 const rep=T.report(mk({Sun:2,Moon:10,Mars:9,Mercury:1,Jupiter:3,Venus:4,Saturn:6}),0);
 ck('F16 waning Moon in 11th fires c21-5 (dynamic class)',row(rep,'c21-5').served===true,{d:row(rep,'c21-5').detail});
}
// --- F17: omission scans on served rows + source literals (single-quoted AND backtick)
// Also: no internal workflow tokens in any user-facing literal.
{
 const charts=[mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:0,Saturn:0},3),
  mk({Sun:2,Moon:3,Mars:6,Mercury:1,Jupiter:4,Venus:2,Saturn:6},10),
  mk({Sun:10,Moon:10,Mars:9,Mercury:1,Jupiter:2,Venus:9,Saturn:0},10),
  mk({Sun:5,Moon:3,Mars:1,Mercury:2,Jupiter:11,Venus:11,Saturn:7},11)];
 const ascs=[0,0,0,4];
 const banned=['रोग','दीर्घ','आयु','व्रण','यमल','नाल','त्रिमाता','मृत्यु','मारक','उपाय','मंत्र','रत्न','निष्क'];
 const leaks=[];
 charts.forEach((psx,i)=>{const rep=T.report(psx,ascs[i]);
  for(const r of rep.rows){if(!r.served)continue;
   for(const w of banned){if(r.text.includes(w)||(r.detail||'').includes(w)||(r.transparency||'').includes(w)||(r.note||'').includes(w))leaks.push([r.id,w]);}
   if(/परंपरा-कथन/.test(r.text)===false)leaks.push([r.id,'missing tradition-label']);}});
 ck('F17a no banned wording in any served text/detail/transparency/note',leaks.length===0,leaks);
 const tsrcRaw=fs.readFileSync(__dirname+'/../kundli-karmaphal.js','utf8');
 // Quote-aware literal extractor. NO destructive comment stripping:
 // a comment marker inside a template literal is literal text and stays visible.
 // Module code has no regex literals and no double-quoted strings.
 function extractLiterals(src){const lits=[];let i=0;const n=src.length;
  while(i<n){const c=src[i];
   if(c==='/'&&src[i+1]==='/'){const e=src.indexOf('\n',i);if(e<0)break;i=e;continue;}
   if(c==='/'&&src[i+1]==='*'){const e=src.indexOf('*/',i+2);i=e<0?n:e+2;continue;}
   if(c==="'"){let j=i+1,s='';while(j<n){if(src[j]==='\\'){s+=src[j]+src[j+1];j+=2;continue;}if(src[j]==="'")break;s+=src[j];j++;}lits.push(s);i=j+1;continue;}
   if(c==='`'){let j=i+1,s='';while(j<n){if(src[j]==='\\'){s+=src[j]+src[j+1];j+=2;continue;}
     if(src[j]==='$'&&src[j+1]==='{'){let d=1,k=j+2;const start=k;
       while(k<n&&d>0){if(src[k]==='{')d++;else if(src[k]==='}')d--;
         else if(src[k]==="'"||src[k]==='"'){const q=src[k];k++;while(k<n){if(src[k]==='\\'){k+=2;continue;}if(src[k]===q)break;k++;}}k++;}
       lits.push(...extractLiterals(src.slice(start,k-1)));j=k;continue;}
     if(src[j]==='`')break;s+=src[j];j++;}lits.push(s);i=j+1;continue;}
   i++;}
  return lits;}
 const lits=extractLiterals(tsrcRaw);
 const srcLeaks=lits.flatMap(t=>banned.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,40),w})));
 ck('F17b literal scan (quote-aware extractor): no banned wording',srcLeaks.length===0,{n:lits.length,srcLeaks});
 const rawHits=banned.filter(w=>tsrcRaw.includes(w));
 ck('F17b2 raw-source scan: no banned token ANYWHERE (comments currently carry none)',rawHits.length===0,rawHits);
 const tam1=tsrcRaw.replace('शुभ-ग्रह-सहित और केन्द्र','शुभ/* उपाय */ग्रह-सहित और केन्द्र'); // reviewer's probe: comment marker INSIDE a backtick literal
 const tam2=tsrcRaw.replace('शुभ-ग्रह-सहित और केन्द्र','शुभ-ग्रह उपाय और केन्द्र'); // plain backtick injection
 ck('F17b3 mutation caught: /* उपाय */ inside a backtick literal',tam1!==tsrcRaw&&banned.some(w=>tam1.includes(w))&&extractLiterals(tam1).some(t=>t.includes('उपाय')));
 ck('F17b4 mutation caught: plain backtick injection',tam2!==tsrcRaw&&extractLiterals(tam2).some(t=>t.includes('उपाय')));
 ck('F17c backtick templates actually covered by the scan',lits.some(t=>t.includes('कर्मेश (')),{n:lits.length});
 const workflow=['G1','G2','G3','G4','G5','G6','G7','G8','G9','SF1','SF2','SF3','M1','M2','M3','gate','GATE','reviewer','breadth','ledger','cache','स्कैन'];
 const wfLeaks=lits.flatMap(t=>workflow.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,50),w})));
 ck('F17c2 no review-workflow/scan-machinery tokens in any module literal',wfLeaks.length===0,wfLeaks);
 const all=T.report(charts[0],0);
 ck('F17d omitN is 0 (no safety omission this chapter)',all.omitN===0,{omitN:all.omitN});
 ck('F17e safety/breadth/unmodeled notices present and category-explicit',all.safetyNotice.includes('सुरक्षा-लोप 0')&&all.breadthNotice.includes('21.1')&&all.breadthNotice.includes('21.22')&&all.unmodeledNotice.includes('7 पंक्तियाँ')&&all.unmodeledNotice.includes('21.16'));
 ck('F17f nodes-note + conduct-note present',all.nodesNote.includes('अमॉडल')&&all.conductNote.includes('चरित्र-निर्णय')&&all.conductNote.includes('नैतिक'));
 ck('F17g exactly 14 rows',all.rows.length===14,{n:all.rows.length});
 ck('F17h header states no-prediction framing',all.header.includes('भविष्यकथन या निश्चय नहीं'));
 ck('F17i favourable/adverse/neutral rows all present',all.rows.filter(r=>r.polarity==='अनुकूल').length===8&&all.rows.filter(r=>r.polarity==='प्रतिकूल').length===5&&all.rows.filter(r=>r.polarity==='तटस्थ-वर्णन').length===1);
 ck('F17j unserved rows absent from checklist (not silently listed)',!all.rows.some(r=>['c21-2','c21-3a','c21-6','c21-10','c21-12','c21-16','c21-20'].includes(r.id)));
}
// --- F18: input validation
{
 let e1=null,e2=null,e3=null;
 try{T.report(mk({Sun:0,Moon:1,Mars:2,Mercury:3,Jupiter:4,Venus:5,Saturn:6}),12);}catch(e){e1=e;}
 try{T.report(mk({Sun:0,Moon:3,Mars:9,Mercury:6,Jupiter:7,Venus:3,Saturn:11}).slice(0,6),0);}catch(e){e2=e;}
 const bad3=mk({Sun:0,Moon:3,Mars:9,Mercury:6,Jupiter:7,Venus:3,Saturn:11});delete bad3[0].degreesInRashi;
 try{T.report(bad3,0);}catch(e){e3=e;}
 ck('F18a asc out of range rejected',!!e1);
 ck('F18b missing graha rejected',!!e2);
 ck('F18c missing degreesInRashi rejected (3.11 machinery needs it)',!!e3);
}
// --- F19: real chart smoke (1990-06-15 10:30 Patna via astro-core) - rows build, scan clean
{
 const vm=require('vm');const c={Date};vm.createContext(c);
 vm.runInContext(fs.readFileSync(__dirname+'/../astro-core.js','utf8'),c);const A=c.BrahmAstro;
 function civilUTC(date,time,tz){const base=Date.parse(date+'T'+time+':00Z');let t=base;for(let i=0;i<4;i++){const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(t).map(x=>[x.type,x.value]));t+=base-Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);}return new Date(t)}
 const l={latitude:25.5941,longitude:85.1376,timeZone:'Asia/Kolkata'};
 const birth=civilUTC('1990-06-15','10:30','Asia/Kolkata');
 const ps=A.grahaPositions(birth),lagna=A.siderealLagna(birth,l);
 const rep=T.report(ps.map(x=>({graha:x.graha,rashi:x.rashi,degreesInRashi:x.degreesInRashi})),Math.floor(lagna/30));
 ck('F19a real chart: 14 rows build',rep.rows.length===14);
 const served0=rep.rows.filter(r=>r.served);
 ck('F19a2 reference chart: all 14 legitimately unserved is allowed (details factual)',rep.rows.every(r=>typeof r.detail==='string'&&r.detail.length>0),{served:served0.map(r=>r.id)});
 const birth2=civilUTC('1985-03-10','08:15','Asia/Kolkata');
 const ps2=A.grahaPositions(birth2),lagna2=A.siderealLagna(birth2,l);
 const rep2=T.report(ps2.map(x=>({graha:x.graha,rashi:x.rashi,degreesInRashi:x.degreesInRashi})),Math.floor(lagna2/30));
 const served=rep2.rows.filter(r=>r.served);
 ck('F19b real chart 2 (1985-03-10): at least one served, one unserved (non-vacuous on real sky)',served.length>0&&served.length<14,{served:served.map(r=>r.id)});
 const leaks=[];for(const r of served)for(const w of ['रोग','दीर्घ','आयु','व्रण','यमल','मृत्यु','उपाय','मंत्र','रत्न','निष्क'])if((r.text+r.detail+(r.transparency||'')+(r.note||'')).includes(w))leaks.push([r.id,w]);
 ck('F19c real chart: omission scan clean on served rows',leaks.length===0,leaks);
}
// --- F20: UI checks on the ACTUAL karmaphalPanel body ------------------------------
{
 const source=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
 const start=source.indexOf('function karmaphalPanel(){'),end=source.indexOf('const tabs=');
 ck('F20a karmaphalPanel body sliceable',start>0&&end>start);
 const body=source.slice(start,end);
 const esc=s=>String(s).replace(/[&<>"']/g,c=>' ');
 const run=(psx,asc)=>{const f=new Function('window','ps','ls','esc','panel','pending',body+';return karmaphalPanel();');
  return f({BrahmKarmaPhal:T},psx,asc,esc,(t,s)=>s,(t,s)=>'PENDING['+t+'] '+s);};
 const psx=mk({Sun:2,Moon:3,Mars:6,Mercury:1,Jupiter:4,Venus:2,Saturn:6},10);
 const html=run(psx,0);
 ck('F20b panel renders (not pending)',!html.startsWith('PENDING'),html.slice(0,80));
 ck('F20c header verbatim',html.includes(T.HEADER));
 ck('F20d safety/breadth/unmodeled notices verbatim',html.includes(T.SAFETY_NOTICE)&&html.includes(T.BREADTH_NOTICE)&&html.includes(T.UNMODELED_NOTICE));
 ck('F20e 14 row cards',(html.match(/<details>/g)||[]).length===14);
 ck('F20f served row shows tradition text',html.includes('भोग-परायण आचरण की चर्चा'));
 ck('F20g unserved row hides tradition text',html.includes('पूरी नहीं बनी; परंपरा-कथन नहीं दिखाया गया'));
 const unservedCount=(html.match(/शर्त नहीं बनी/g)||[]).length;
 ck('F20h F4 chart: served/unserved mix visible',unservedCount>0&&unservedCount<14,{unservedCount});
 ck('F20i row note rendered (AND/proxy)',html.includes('Sanskrit-primary AND'));
 ck('F20j nodes+conduct notes rendered',html.includes('राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल')&&html.includes('चरित्र-निर्णय'));
 ck('F20k pane-report wiring (phalMethodPanel inserted after bhavaphalPanel; sequence pin updated)',source.includes('bhavaphalPanel()+phalMethodPanel()+tanuPanel()+yutiphalPanel()+labhaPanel()+karmaphalPanel()'));
 ck('F20l module absent -> honest pending',(()=>{const f=new Function('window','ps','ls','esc','panel','pending',body+';return karmaphalPanel();');
  return f({},psx,0,esc,(t,s)=>s,(t,s)=>'PENDING '+s);})().startsWith('PENDING'));
 ck('F20m kundli.html loads module',fs.readFileSync(__dirname+'/../kundli.html','utf8').includes('kundli-karmaphal.js'));
 const banned=['रोग','दीर्घ','आयु','व्रण','यमल','नाल','त्रिमाता','मृत्यु','मारक','उपाय','मंत्र','रत्न','निष्क'];
 const uiLits=[...body.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(m=>m[1])
  .concat([...body.matchAll(/`((?:[^`\\]|\\.)*)`/gs)].map(m=>m[1]));
 const uiLeaks=uiLits.flatMap(t=>banned.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,40),w})));
 ck('F20n karmaphalPanel body literals clean (single-quote + backtick)',uiLeaks.length===0,{n:uiLits.length,uiLeaks});
}
// --- F21: EXALT pinned for ALL seven grahas (ch22 pin pattern)
// No single-condition dignity row exists in ch21, so the pin is on the DETAIL text of
// c21-14 (exalt) and c21-18 (debil) which report dignity independent of the conjunction,
// plus full-serve fixtures where the conjunction is satisfiable. Byte-level sync assertion
// of the duplicated EXALT literal closes the class.
{
 const BP=require('../kundli-bhavaphal.js');
 const DIGNITY={Sun:[0,6],Moon:[1,7],Mars:[9,3],Mercury:[5,11],Jupiter:[3,9],Venus:[11,5],Saturn:[6,0]}; // [exalt, debil] - standard uccha/nicha, hardcoded independently
 const modN=(x,n)=>((x%n)+n)%n;
 for(const g of SEVENG){
  const s=BP.SIGN_LORD.findIndex(l=>l===g); // a sign this graha rules
  const asc=modN(s-9,12); // make that sign the 10th bhava -> g becomes karmesh
  const [exN,deN]=DIGNITY[g];
  const neutral=[...Array(12).keys()].find(x=>x!==exN&&x!==deN); // a sign that is neither exaltation nor debilitation for this graha
  const chart=target=>{const map={};for(const o of SEVENG)map[o]=neutral;map[g]=target;return mk(map);};
  const [ex,de]=DIGNITY[g];
  const dE=row(T.report(chart(ex),asc),'c21-14').detail;
  ck('F21-14-'+g+' exalted karmesh detail says उच्च',dE.includes('(भाव')&&/उच्च\)/.test(dE)&&!dE.includes('उच्च नहीं'),{g,asc,dE});
  const dD=row(T.report(chart(de),asc),'c21-18').detail;
  ck('F21-18-'+g+' debilitated karmesh detail says नीच',/नीच\)/.test(dD)&&!dD.includes('नीच नहीं'),{g,asc,dD});
  const dN14=row(T.report(chart(neutral),asc),'c21-14').detail;
  const dN18=row(T.report(chart(neutral),asc),'c21-18').detail;
  ck('F21-ctl-'+g+' neutral-sign karmesh: neither dignity claimed',dN14.includes('उच्च नहीं')&&dN18.includes('नीच नहीं'),{g,dN14,dN18});
 }
 // full-serve neecha fixtures for three karmesh grahas (malefics placed in 10th and 7th)
 const serve18=(g,s,asc,sunSign,marsSign)=>{const map={Sun:sunSign,Moon:modN(s+3,12),Mars:marsSign,Mercury:modN(s+5,12),Jupiter:modN(s+6,12),Venus:modN(s+7,12),Saturn:modN(s+8,12)};map[g]=modN(DIGNITY[g][1],12);return T.report(mk(map),asc);};
 {const s=9,asc=0; // karmesh Saturn; Sun->bhava7 sign6, Mars->bhava10 sign9
  const rep=serve18('Saturn',s,asc,6,9);
  ck('F21-full-18-Saturn debilitated karmesh + malefics serves c21-18',row(rep,'c21-18').served===true,{d:row(rep,'c21-18').detail});}
 {const s=1,asc=4; // karmesh Venus; Sun->bhava10 sign1? Sun IS malefic; Mars->bhava7 sign10
  const rep=serve18('Venus',s,asc,1,10);
  ck('F21-full-18-Venus debilitated karmesh + malefics serves c21-18',row(rep,'c21-18').served===true,{d:row(rep,'c21-18').detail});}
 {const s=0,asc=3; // karmesh Mars; Sun->bhava10 sign0, Saturn->bhava7 sign9
  const map={Sun:0,Moon:3,Mars:3,Mercury:5,Jupiter:6,Venus:7,Saturn:9}; // Mars at debil sign 3
  const rep=T.report(mk(map),asc);
  ck('F21-full-18-Mars debilitated karmesh + malefics serves c21-18',row(rep,'c21-18').served===true,{d:row(rep,'c21-18').detail});}
 // karmesh===Jupiter: guru-yuti/guru-drishti impossible - honest notes
 {const s=8,asc=11; // Jupiter rules Sagittarius(8); asc 11 -> bhava10 sign 8
  const map={Sun:0,Moon:3,Mars:3,Mercury:5,Jupiter:3,Venus:7,Saturn:9}; // Jupiter exalted, bhava 5 (KT)
  const rep=T.report(mk(map),asc);
  ck('F21-Jupiter karmesh: c21-14 honestly unserved + noted',row(rep,'c21-14').served===false&&row(rep,'c21-14').detail.includes('गुरु-युति संभव नहीं'),{d:row(rep,'c21-14').detail});}
 const modSrc=fs.readFileSync(__dirname+'/../kundli-karmaphal.js','utf8');
 const engSrc=fs.readFileSync(__dirname+'/../kundli-engine.js','utf8');
 const exL=(modSrc.match(/const EXALT=\{[^}]*\}/)||[])[0];
 const exE=(engSrc.match(/const EXALT=\{[^}]*\}/)||[])[0];
 ck('F21x duplicated EXALT literal byte-identical to kundli-engine.js',!!exL&&exL===exE,{exL,exE});
}
console.log(`\nkarmaphal: ${pass} pass, ${fail} fail`);
if(bad.length)console.log('FAILED:',bad.join(', '));
process.exitCode=fail?1:0;
