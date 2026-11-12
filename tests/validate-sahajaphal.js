// Bhavaphal ch14 (sahaja/vikrama bhava, 3rd house) checks. Run: node tests/validate-sahajaphal.js
// Fixtures: hand-computed synthetic charts (whole-sign houses from stated lagna; BPHS 3.11
// classes with dynamic Moon/Mercury). Curation: docs/bhavaphal-ch14-ledger-draft.md.
// Hardened scans from day one: quote-aware module+panel literal scans, raw scans,
// marker-injection mutations, workflow-token scan. The single modeled row uses no
// dignity machinery, so the module must declare NO duplicated EXALT map (guarded).
'use strict';
const fs=require('fs');
const T=require('../kundli-sahajaphal.js');
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}

const SEVENG=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
function mk(map,rahu,ketu){const ps=SEVENG.map(g=>({graha:g,rashi:map[g],degreesInRashi:10}));
 if(rahu!==undefined&&rahu!==null)ps.push({graha:'Rahu',rashi:rahu,degreesInRashi:10});
 if(ketu!==undefined&&ketu!==null)ps.push({graha:'Ketu',rashi:ketu,degreesInRashi:10});return ps;}
function row(rep,id){const r=rep.rows.find(x=>x.id===id);if(!r)throw Error('row missing '+id);return r;}
// asc 0 (Aries): bhava 3 = sign 2 (Taurus).

// --- F1: c14-1 (two independent legs, OR)
{
 // F1a: Jupiter occupies bhava 3 -> served via leg1 (Jupiter also aspects 8/0/4, none is 2)
 const rep=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:0,Saturn:6}),0);
 const r=row(rep,'c14-1');
 ck('F1a served via leg1 (benefic in the 3rd)',r.served===true&&r.detail.includes('खंड1 (3रे भाव में शुभ): गुरु'),{d:r.detail});
 // F1b: Jupiter in sign 8 (7th aspect onto sign 2), no benefic in the 3rd; Moon waning
 // (Sun 9, Moon 8 -> 330 deg ahead) so only गुरु counts for leg2.
 const r2=row(T.report(mk({Sun:9,Moon:8,Mars:7,Mercury:0,Jupiter:8,Venus:4,Saturn:1}),0),'c14-1');
 ck('F1b served via leg2 (benefic drishti on the 3rd)',r2.served===true&&r2.detail.includes('खंड1 (3रे भाव में शुभ): कोई नहीं')&&r2.detail.includes('खंड2 (3रे भाव पर शुभ-दृष्टि): गुरु'),{d:r2.detail});
 // F1c: no benefic occupies or aspects sign 2; Mars 4th-aspect from 11 is malefic-only
 const r3=row(T.report(mk({Sun:6,Moon:5,Mars:11,Mercury:0,Jupiter:5,Venus:3,Saturn:1}),0),'c14-1');
 ck('F1c mutation: no benefic leg -> unserved',r3.served===false&&r3.detail.includes('खंड1 (3रे भाव में शुभ): कोई नहीं')&&r3.detail.includes('खंड2 (3रे भाव पर शुभ-दृष्टि): कोई नहीं'),{d:r3.detail});
 // F1d: nodes in the 3rd never satisfy a leg (yuti/drishti participation unmodeled)
 const r4=row(T.report(mk({Sun:6,Moon:5,Mars:11,Mercury:0,Jupiter:5,Venus:3,Saturn:1},2,8),0),'c14-1');
 ck('F1d Rahu+Ketu in/aspecting the 3rd: still unserved',r4.served===false,{d:r4.detail});
 // F1e: 3.11 dynamic class - Mercury joined Mars in the 3rd is malefic, no other benefic leg
 const r5=row(T.report(mk({Sun:6,Moon:5,Mars:2,Mercury:2,Jupiter:5,Venus:3,Saturn:1}),0),'c14-1');
 ck('F1e Mercury+Mars in the 3rd (Mercury paap) -> unserved',r5.served===false,{d:r5.detail});
 // F1e2 control: Mercury alone in the 3rd (shubh) -> served
 const r5b=row(T.report(mk({Sun:6,Moon:5,Mars:11,Mercury:2,Jupiter:5,Venus:3,Saturn:1}),0),'c14-1');
 ck('F1e2 Mercury alone in the 3rd (shubh) -> served',r5b.served===true&&r5b.detail.includes('खंड1 (3रे भाव में शुभ): बुध'),{d:r5b.detail});
 // F1f: Venus in the 3rd also serves (any benefic, not a fixed graha)
 const r6=row(T.report(mk({Sun:6,Moon:5,Mars:11,Mercury:0,Jupiter:5,Venus:2,Saturn:1}),0),'c14-1');
 ck('F1f Venus in the 3rd -> served',r6.served===true&&r6.detail.includes('शुक्र'),{d:r6.detail});
 // F1g: served text is valor-only, tradition-labeled; note discloses the limited scope
 ck('F1g served text valor-only + tradition label',r.text==='परंपरा-कथन: पराक्रम की चर्चा है।'&&r.note.includes('परिमित दायरे')&&r.note.includes('विक्रम-खंड'));
 // F1h: unserved row carries no fruit text in the panel contract (text field reserved)
 ck('F1h row contract fields present',typeof r.condition==='string'&&typeof r.detail==='string'&&r.polarity==='अनुकूल'&&r.ref==='BPHS 14.1');
 // F1i: lagna shift - asc 10 (Aquarius): bhava 3 = sign 0; Jupiter in 0 serves
 const r7=row(T.report(mk({Sun:6,Moon:5,Mars:11,Mercury:4,Jupiter:0,Venus:3,Saturn:1}),10),'c14-1');
 ck('F1i whole-sign bhava follows lagna (asc 10, Jupiter in Aries)',r7.served===true,{d:r7.detail});
 // F1j: input guards (mirror sibling modules)
 let threw=0;for(const badx of [[null,0],[mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:0,Saturn:6}),12],[mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:0,Saturn:6}),-1]]){try{T.report(badx[0],badx[1]);}catch(e){threw++;}}
 ck('F1j invalid asc/planets rejected',threw===3,{threw});
 const dup=mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:0,Saturn:6});dup.push({graha:'Sun',rashi:5,degreesInRashi:1});
 let threw2=false;try{T.report(dup,0);}catch(e){threw2=true;}
 ck('F1j2 duplicate graha rejected',threw2);
}
// --- F12: hardened omission/workflow scans on module + panel (ch21 F17 family).
// Quote-aware literal extraction; NO destructive comment stripping - a comment
// marker inside a template literal is literal text and stays visible. Module
// code has no regex literals and no double-quoted strings.
{
 const banned=['रोग','व्याधि','दीर्घ','आयु','व्रण','यमल','मृत्यु','मारक','उपाय','मंत्र','रत्न','निष्क','भगिनी','बहन','भाई','सहोदर','भ्रातृ','विनाश','हन्ति','अल्पायु'];
 const charts=[mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:0,Saturn:6},0),
  mk({Sun:9,Moon:8,Mars:7,Mercury:0,Jupiter:8,Venus:4,Saturn:1},0),
  mk({Sun:6,Moon:5,Mars:11,Mercury:0,Jupiter:5,Venus:3,Saturn:1},2,8),
  mk({Sun:6,Moon:5,Mars:11,Mercury:4,Jupiter:0,Venus:3,Saturn:1},10)];
 const ascs=[0,0,0,10];
 const leaks=[];
 charts.forEach((psx,i)=>{const rep=T.report(psx,ascs[i]);
  for(const r of rep.rows){if(!r.served)continue;
   for(const w of banned){if(r.text.includes(w)||(r.detail||'').includes(w)||(r.transparency||'').includes(w)||(r.note||'').includes(w))leaks.push([r.id,w]);}
   if(!/परंपरा-कथन/.test(r.text))leaks.push([r.id,'missing tradition-label']);}});
 ck('F12a no banned wording in any served text/detail/transparency/note',leaks.length===0,leaks);
 const tsrcRaw=fs.readFileSync(__dirname+'/../kundli-sahajaphal.js','utf8');
 const uiRaw=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
 const pStart=uiRaw.indexOf('function sahajaphalPanel(){'),pEnd=uiRaw.indexOf('function vyayaphalPanel(){');
 ck('F12p sahajaphalPanel body sliceable',pStart>0&&pEnd>pStart);
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
 const tam1=tsrcRaw.replace('3रा भाव शुभ-युक्त (शुभ-ग्रह स्थित) या शुभ-दृष्ट','3रा भाव /* उपाय */ शुभ-युक्त (शुभ-ग्रह स्थित) या शुभ-दृष्ट'); // comment marker INSIDE a backtick template chunk
 const tam2=tsrcRaw.replace('3रा भाव शुभ-युक्त (शुभ-ग्रह स्थित) या शुभ-दृष्ट','3रा भाव उपाय शुभ-युक्त (शुभ-ग्रह स्थित) या शुभ-दृष्ट'); // plain backtick injection
 ck('F12b3 mutation caught: /* उपाय */ inside a module backtick template',tam1!==tsrcRaw&&banned.some(w=>tam1.includes(w))&&extractLiterals(tam1).some(t=>t.includes('उपाय')));
 ck('F12b4 mutation caught: plain module backtick injection',tam2!==tsrcRaw&&extractLiterals(tam2).some(t=>t.includes('उपाय')));
 const tam3=panelRaw.replace('<div class="suite-yogas">','<div class="suite-yogas">/* उपाय */'); // marker inside the panel backtick template
 const tam4=panelRaw.replace('<div class="suite-yogas">','<div class="suite-yogas">उपाय');
 ck('F12b5 mutation caught: /* उपाय */ inside the panel template',tam3!==panelRaw&&extractLiterals(tam3).some(t=>t.includes('उपाय')));
 ck('F12b6 mutation caught: plain panel template injection',tam4!==panelRaw&&extractLiterals(tam4).some(t=>t.includes('उपाय')));
 ck('F12c backtick templates actually covered by the module scan',lits.some(t=>t.includes('खंड1 (3रे भाव में शुभ)')),{n:lits.length});
 ck('F12cP panel template chunks actually covered',pLits.some(t=>t.includes('suite-yogas')),{n:pLits.length});
 const workflow=['G1','G2','G3','G4','G5','G6','G7','G8','G9','SF1','SF2','SF3','M1','M2','M3','gate','GATE','reviewer','breadth','ledger','cache','स्कैन'];
 const wfLeaks=lits.concat(pLits).flatMap(t=>workflow.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,50),w})));
 ck('F12c2 no review-workflow/scan-machinery tokens in module or panel literals',wfLeaks.length===0,wfLeaks);
 ck('F12x module declares no EXALT map (row uses no dignity machinery)',!/const EXALT=/.test(tsrcRaw));
 const all=T.report(charts[0],0);
 ck('F12d omitN is 11 (5 life-loss units, 5 family-structure units, 1 family-happiness unit)',all.omitN===11,{omitN:all.omitN});
 ck('F12e omit/breadth/unmodeled notices present and category-explicit',all.omitNotice.includes('11 खंड')&&all.omitNotice.includes('जीवन-क्षय')&&all.omitNotice.includes('जन्म-क्रम')&&all.omitNotice.includes('14.6')&&all.omitNotice.includes('परिमित दायरा')&&all.breadthNotice.includes('14.5पूर्व')&&all.breadthNotice.includes('14.15')&&all.breadthNotice.includes('पद्धति')&&all.unmodeledNotice.includes('राहु-युति')&&all.unmodeledNotice.includes('अंश-खंड')&&all.unmodeledNotice.includes('ग्रह-बल'));
 ck('F12f nodes-note present; no conduct-note in this chapter (no conduct rows)',all.nodesNote.includes('अमॉडल')&&all.conductNote===undefined);
 ck('F12g exactly 1 row (limited chapter scope)',all.rows.length===1,{n:all.rows.length});
 ck('F12h header states no-prediction framing + limited scope, no complete-chapter claim',all.header.includes('भविष्यकथन या निश्चय नहीं')&&all.header.includes('परिमित')&&all.header.includes('अध्याय-पूर्णता का दावा नहीं'));
 ck('F12i polarity favourable only (adverse/family rows omitted with counts)',all.rows.filter(r=>r.polarity==='अनुकूल').length===1&&all.rows.filter(r=>r.polarity==='प्रतिकूल').length===0);
 ck('F12j scope string discloses limited chapter scope + conventions',all.scope.includes('परिमित अध्याय-दायरा')&&all.scope.includes('अध्याय-पूर्णता का दावा नहीं')&&all.scope.includes('सीमा-लोप 11'));
}
console.log(`\nsahajaphal: ${pass} pass, ${fail} fail`);
if(bad.length)console.log('FAILED:',bad.join(', '));
process.exitCode=fail?1:0;
