// Bhavaphal ch20 (bhagya bhava, 9th house) checks. Run: node tests/validate-bhagyaphal.js
// Fixtures: hand-computed synthetic charts (whole-sign houses from stated lagna; BPHS 3.11
// classes with dynamic Moon/Mercury). Curation: docs/bhavaphal-ch20-ledger-draft.md.
// Hardened scans from day one: quote-aware module+panel literal scans, raw scans,
// marker-injection mutations, workflow-token scan.
'use strict';
const fs=require('fs');
const T=require('../kundli-bhagyaphal.js');
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}

const SEVENG=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
function mk(map,rahu,ketu){const ps=SEVENG.map(g=>({graha:g,rashi:map[g],degreesInRashi:10}));
 if(rahu!==undefined&&rahu!==null)ps.push({graha:'Rahu',rashi:rahu,degreesInRashi:10});
 if(ketu!==undefined&&ketu!==null)ps.push({graha:'Ketu',rashi:ketu,degreesInRashi:10});return ps;}
function row(rep,id){const r=rep.rows.find(x=>x.id===id);if(!r)throw Error('row missing '+id);return r;}
// asc 1 (Taurus): bhava h = sign h; L1=Venus, bhava 9 = sign 9 (L9=Saturn), bhava 7 = sign 7, bhava 5 = sign 5.

// --- F1: c20-9 (Sun in 5th/9th AND 9L in 7th AND Jupiter contact on 9L; lagna-inclusive trikona excluded)
{
 // F1a: Sun in bhava 5, Saturn(L9) in bhava 7, Jupiter yuti Saturn -> served
 const r1=row(T.report(mk({Sun:5,Moon:0,Mars:2,Mercury:3,Jupiter:7,Venus:4,Saturn:7}),1),'c20-9');
 ck('F1a served via 5th + 9L-in-7th + Jupiter yuti',r1.served===true&&r1.detail.includes('खंड1 (सूर्य 5वें/9वें भाव में): हाँ')&&r1.detail.includes('खंड2 (भाग्येश शनि 7वें भाव में): हाँ')&&r1.detail.includes('खंड3 (भाग्येश पर गुरु-स्पर्श): हाँ'),{d:r1.detail});
 // F1b: Sun in bhava 9, Saturn in 7, Jupiter in 3 (5th-aspect onto 7) -> served via drishti
 const r2=row(T.report(mk({Sun:9,Moon:0,Mars:2,Mercury:4,Jupiter:3,Venus:5,Saturn:7}),1),'c20-9');
 ck('F1b served via 9th + Jupiter drishti',r2.served===true,{d:r2.detail});
 // F1c: Sun in 5, Saturn in 7, Jupiter in 10 (no contact) -> unserved
 const r3=row(T.report(mk({Sun:5,Moon:0,Mars:2,Mercury:3,Jupiter:10,Venus:4,Saturn:7}),1),'c20-9');
 ck('F1c mutation: no Jupiter contact -> unserved',r3.served===false&&r3.detail.includes('खंड3 (भाग्येश पर गुरु-स्पर्श): नहीं'),{d:r3.detail});
 // F1d: Sun in LAGNA (bhava 1) with other legs met -> unserved (lagna-inclusive reading excluded)
 const r4=row(T.report(mk({Sun:1,Moon:0,Mars:2,Mercury:3,Jupiter:7,Venus:4,Saturn:7}),1),'c20-9');
 ck('F1d lagna-inclusive trikona reading excluded (Sun in lagna)',r4.served===false&&r4.detail.includes('खंड1 (सूर्य 5वें/9वें भाव में): नहीं'),{d:r4.detail});
 // F1e: asc 0 (Aries): L9=Jupiter itself, in bhava 7, Sun in bhava 5 -> self-contact never serves
 const r5=row(T.report(mk({Sun:4,Moon:1,Mars:2,Mercury:3,Jupiter:6,Venus:5,Saturn:8}),0),'c20-9');
 ck('F1e 9L = Jupiter: self-contact excluded -> unserved',r5.served===false&&r5.detail.includes('खंड3 (भाग्येश पर गुरु-स्पर्श): नहीं'),{d:r5.detail});
 // F1f: Rahu yuti with the 9L never counts as Jupiter contact
 const r6=row(T.report(mk({Sun:5,Moon:0,Mars:2,Mercury:3,Jupiter:10,Venus:4,Saturn:7},7,1),1),'c20-9');
 ck('F1f Rahu conjunct 9L: node contact ignored -> unserved',r6.served===false,{d:r6.detail});
}
// --- F2: c20-29 (L1 in 9th AND 9L in lagna AND Jupiter in 7th)
{
 // F2a: Venus(L1) in sign 9 (bhava 9), Saturn(L9) in sign 1 (lagna), Jupiter in sign 7 -> served
 const r1=row(T.report(mk({Sun:0,Moon:2,Mars:3,Mercury:4,Jupiter:7,Venus:9,Saturn:1}),1),'c20-29');
 ck('F2a all three legs -> served',r1.served===true&&r1.detail.includes('खंड1 (लग्नेश शुक्र 9वें भाव में): हाँ')&&r1.detail.includes('खंड2 (भाग्येश शनि लग्न में): हाँ')&&r1.detail.includes('खंड3 (गुरु 7वें भाव में): हाँ'),{d:r1.detail});
 // F2b: Jupiter in 8 instead of 7 -> unserved
 const r2=row(T.report(mk({Sun:0,Moon:2,Mars:3,Mercury:4,Jupiter:8,Venus:9,Saturn:1}),1),'c20-29');
 ck('F2b mutation: Jupiter outside 7th -> unserved',r2.served===false&&r2.detail.includes('खंड3 (गुरु 7वें भाव में): नहीं'),{d:r2.detail});
 // F2c: L1/L9 placements swapped (Venus in lagna, Saturn in 9) -> unserved
 const r3=row(T.report(mk({Sun:0,Moon:2,Mars:3,Mercury:4,Jupiter:7,Venus:1,Saturn:9}),1),'c20-29');
 ck('F2c mutation: swapped placements -> unserved',r3.served===false&&r3.detail.includes('खंड1 (लग्नेश शुक्र 9वें भाव में): नहीं')&&r3.detail.includes('खंड2 (भाग्येश शनि लग्न में): नहीं'),{d:r3.detail});
 // F2d: whole-sign bhava follows lagna - asc 4 (Leo): L1=Sun in sign 0 (bhava 9), L9=Mars in sign 4 (lagna), Jupiter in sign 10 (bhava 7) -> served
 const r4=row(T.report(mk({Sun:0,Moon:1,Mars:4,Mercury:2,Jupiter:10,Venus:3,Saturn:5}),4),'c20-29');
 ck('F2d whole-sign bhava follows lagna (asc 4)',r4.served===true,{d:r4.detail});
}
// --- F3: input guards (mirror sibling modules)
{
 let threw=0;for(const badx of [[null,0],[mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:0,Saturn:6}),12],[mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:0,Saturn:6}),-1]]){try{T.report(badx[0],badx[1]);}catch(e){threw++;}}
 ck('F3a invalid asc/planets rejected',threw===3,{threw});
 const dup=mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:0,Saturn:6});dup.push({graha:'Sun',rashi:5,degreesInRashi:1});
 let threw2=false;try{T.report(dup,0);}catch(e){threw2=true;}
 ck('F3b duplicate graha rejected',threw2);
}
// --- F12: hardened omission/workflow scans on module + panel (ch15 F12 family).
{
 const banned=['माता','मातृ','जननी','मातु','दीर्घ','आयु','अल्पायु','मूक','बधिर','गूंग','वत्सर','मृत्यु','मरण','विनाश','हन्ति','मारक','रोग','व्याधि','व्रण','उपाय','मंत्र','रत्न','निष्क','भिक्षा'];
 const charts=[mk({Sun:5,Moon:0,Mars:2,Mercury:3,Jupiter:7,Venus:4,Saturn:7},0,6),
  mk({Sun:1,Moon:0,Mars:2,Mercury:3,Jupiter:7,Venus:4,Saturn:7},1),
  mk({Sun:0,Moon:2,Mars:3,Mercury:4,Jupiter:7,Venus:9,Saturn:1},1),
  mk({Sun:4,Moon:1,Mars:2,Mercury:3,Jupiter:6,Venus:5,Saturn:8},0)];
 const leaks=[];
 charts.forEach((psx,i)=>{const asc=i===0?1:[1,1,0][i-1]??1;const rep=T.report(psx,i===0?1:(i===3?0:1));
  for(const r of rep.rows){if(!r.served)continue;
   for(const w of banned){if(r.text.includes(w)||(r.detail||'').includes(w)||(r.transparency||'').includes(w)||(r.note||'').includes(w))leaks.push([r.id,w]);}
   if(!/परंपरा/.test(r.text))leaks.push([r.id,'missing tradition-label']);}});
 ck('F12a no banned wording in any served text/detail/transparency/note',leaks.length===0,leaks);
 const tsrcRaw=fs.readFileSync(__dirname+'/../kundli-bhagyaphal.js','utf8');
 const uiRaw=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
 const pStart=uiRaw.indexOf('function bhagyaphalPanel(){'),pEnd=uiRaw.indexOf('function phalMethodPanel(){');
 ck('F12p bhagyaphalPanel body sliceable',pStart>0&&pEnd>pStart);
 const panelRaw=uiRaw.slice(pStart,pEnd);
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
 const lits=extractLiterals(tsrcRaw),pLits=extractLiterals(panelRaw);
 const srcLeaks=lits.flatMap(t=>banned.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,40),w})));
 const pLeaks=pLits.flatMap(t=>banned.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,40),w})));
 ck('F12b module literal scan (quote-aware): no banned wording',srcLeaks.length===0,{n:lits.length,srcLeaks});
 ck('F12bP panel literal scan (quote-aware): no banned wording',pLeaks.length===0,{n:pLits.length,pLeaks});
 const rawHits=banned.filter(w=>tsrcRaw.includes(w)),rawPHits=banned.filter(w=>panelRaw.includes(w));
 ck('F12b2 module raw-source scan: no banned token ANYWHERE',rawHits.length===0,rawHits);
 ck('F12b2P panel raw-slice scan: no banned token ANYWHERE',rawPHits.length===0,rawPHits);
 const tam1=tsrcRaw.replace('सूर्य लग्न से 5वें/9वें भाव में','सूर्य /* उपाय */ लग्न से 5वें/9वें भाव में'); // comment marker INSIDE a template chunk
 const tam2=tsrcRaw.replace('सूर्य लग्न से 5वें/9वें भाव में','सूर्य उपाय लग्न से 5वें/9वें भाव में'); // plain injection
 ck('F12b3 mutation caught: /* उपाय */ inside a module template chunk',tam1!==tsrcRaw&&banned.some(w=>tam1.includes(w))&&extractLiterals(tam1).some(t=>t.includes('उपाय')));
 ck('F12b4 mutation caught: plain module template injection',tam2!==tsrcRaw&&extractLiterals(tam2).some(t=>t.includes('उपाय')));
 const tam3=panelRaw.replace('<div class="suite-yogas">','<div class="suite-yogas">/* उपाय */');
 const tam4=panelRaw.replace('<div class="suite-yogas">','<div class="suite-yogas">उपाय');
 ck('F12b5 mutation caught: /* उपाय */ inside the panel template',tam3!==panelRaw&&extractLiterals(tam3).some(t=>t.includes('उपाय')));
 ck('F12b6 mutation caught: plain panel template injection',tam4!==panelRaw&&extractLiterals(tam4).some(t=>t.includes('उपाय')));
 ck('F12c backtick templates actually covered by the module scan',lits.some(t=>t.includes('खंड1 (सूर्य')),{n:lits.length});
 ck('F12cP panel template chunks actually covered',pLits.some(t=>t.includes('suite-yogas')),{n:pLits.length});
 const workflow=['G1','G2','G3','G4','G5','G6','G7','G8','G9','SF1','SF2','SF3','M1','M2','M3','gate','GATE','reviewer','breadth','ledger','cache','स्कैन'];
 const wfLeaks=lits.concat(pLits).flatMap(t=>workflow.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,50),w})));
 ck('F12c2 no review-workflow/scan-machinery tokens in module or panel literals',wfLeaks.length===0,wfLeaks);
 const all=T.report(charts[1],1);
 ck('F12d omitN is 29 (9 fortune units, 5 father-state units, 14 father life-span timing units, 1 conduct unit)',all.omitN===29,{omitN:all.omitN});
 ck('F12e omit/breadth/unmodeled notices present and category-explicit',all.omitNotice.includes('29 खंड')&&all.omitNotice.includes('भाग्य-कथन')&&all.omitNotice.includes('पितृ-स्थिति-कथन')&&all.omitNotice.includes('पितृ-जीवन-काल-कथन')&&all.omitNotice.includes('आचरण-कथन')&&all.omitNotice.includes('20.13 से 20.25')&&all.omitNotice.includes('20.10, 20.27, 20.28')&&all.breadthNotice.includes('20.32')&&all.breadthNotice.includes('स्थिति')&&all.unmodeledNotice.includes('परमोच्च')&&all.unmodeledNotice.includes('नवांश')&&all.unmodeledNotice.includes('अमॉडल'));
 ck('F12f nodes-note present',all.nodesNote.includes('अमॉडल'));
 ck('F12g exactly 2 rows (limited chapter scope)',all.rows.length===2,{n:all.rows.length});
 ck('F12h header states no-prediction framing + limited scope, no complete-chapter claim',all.header.includes('भविष्यकथन या निश्चय नहीं')&&all.header.includes('परिमित')&&all.header.includes('अध्याय-पूर्णता का दावा नहीं'));
 ck('F12i polarity favourable only (adverse/omitted rows carried by counts)',all.rows.filter(r=>r.polarity==='अनुकूल').length===2&&all.rows.filter(r=>r.polarity==='प्रतिकूल').length===0);
 ck('F12j scope string discloses limited chapter scope + conventions',all.scope.includes('परिमित अध्याय-दायरा')&&all.scope.includes('अध्याय-पूर्णता का दावा नहीं')&&all.scope.includes('सीमा-लोप 29'));
 ck('F12m conduct frame explicit on c20-9 (not a character assessment, chart never proves devotion)',row(all,'c20-9').note.includes('चरित्र-मूल्यांकन या नैतिक निर्णय नहीं')&&row(all,'c20-9').note.includes('सिद्ध नहीं करती')&&row(all,'c20-9').text.includes('चरित्र-मूल्यांकन या नैतिक निर्णय नहीं'));
 // F12k wiring pins: chain order and html tag
 const chainIdx=uiRaw.indexOf('riputphalPanel()+bhagyaphalPanel()');
 ck('F12k chain: bhagyaphalPanel() immediately after riputphalPanel()',chainIdx>0,{chainIdx});
 const htmlRaw=fs.readFileSync(__dirname+'/../kundli.html','utf8');
 ck('F12k2 kundli.html loads kundli-bhagyaphal.js after kundli-riputphal.js',htmlRaw.indexOf('kundli-riputphal.js')>0&&htmlRaw.indexOf('kundli-bhagyaphal.js')>htmlRaw.indexOf('kundli-riputphal.js'));
}
console.log('---');console.log(pass+' passed, '+fail+' failed');
if(fail){console.log('FAILED: '+bad.join(', '));process.exit(1);}
