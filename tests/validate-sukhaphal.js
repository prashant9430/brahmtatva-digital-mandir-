// Bhavaphal ch15 (sukha bhava, 4th house) checks. Run: node tests/validate-sukhaphal.js
// Fixtures: hand-computed synthetic charts (whole-sign houses from stated lagna; BPHS 3.11
// classes with dynamic Moon/Mercury). Curation: docs/bhavaphal-ch15-ledger-draft.md.
// Hardened scans from day one: quote-aware module+panel literal scans, raw scans,
// marker-injection mutations, workflow-token scan. c15-3 uses dignity machinery, so the
// module's duplicated EXALT map is byte-sync asserted against kundli-engine.js and all
// seven exaltation signs are pinned through c15-3.
'use strict';
const fs=require('fs');
const T=require('../kundli-sukhaphal.js');
const BP=require('../kundli-bhavaphal.js');
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}

const SEVENG=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
function mk(map,rahu,ketu){const ps=SEVENG.map(g=>({graha:g,rashi:map[g],degreesInRashi:10}));
 if(rahu!==undefined&&rahu!==null)ps.push({graha:'Rahu',rashi:rahu,degreesInRashi:10});
 if(ketu!==undefined&&ketu!==null)ps.push({graha:'Ketu',rashi:ketu,degreesInRashi:10});return ps;}
function row(rep,id){const r=rep.rows.find(x=>x.id===id);if(!r)throw Error('row missing '+id);return r;}
// asc 0 (Aries): bhava 4 = sign 3 (Cancer, L4=Moon), bhava 10 = sign 9 (L10=Saturn), L1=Mars.

// --- F1: c15-2 ((4L in 4th OR 1L in 4th) AND benefic drishti on the 4th)
{
 // F1a: Moon(L4) in bhava 4, Jupiter in 11 (5th-aspect onto sign 3) -> served via k1+k3
 const r1=row(T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:4,Jupiter:11,Venus:2,Saturn:6}),0),'c15-2');
 ck('F1a served via 4L-in-4th + benefic drishti',r1.served===true&&r1.detail.includes('खंड1 (चतुर्थेश चन्द्र 4रे भाव में): हाँ')&&r1.detail.includes('खंड2 (लग्नेश मंगल 4रे भाव में): नहीं')&&r1.detail.includes('खंड3 (4रे भाव पर शुभ-दृष्टि): गुरु'),{d:r1.detail});
 // F1b: Mars(L1) in bhava 4, Jupiter aspect on the 4th, L4 elsewhere -> served via k2+k3
 const r2=row(T.report(mk({Sun:0,Moon:5,Mars:3,Mercury:4,Jupiter:11,Venus:2,Saturn:6}),0),'c15-2');
 ck('F1b served via 1L-in-4th + benefic drishti',r2.served===true&&r2.detail.includes('खंड1 (चतुर्थेश चन्द्र 4रे भाव में): नहीं')&&r2.detail.includes('खंड2 (लग्नेश मंगल 4रे भाव में): हाँ'),{d:r2.detail});
 // F1c: placement (Moon in 4th) but NO benefic drishti on the 4th -> unserved
 const r3=row(T.report(mk({Sun:6,Moon:3,Mars:9,Mercury:0,Jupiter:5,Venus:2,Saturn:1}),0),'c15-2');
 ck('F1c mutation: placement without benefic drishti -> unserved',r3.served===false&&r3.detail.includes('खंड3 (4रे भाव पर शुभ-दृष्टि): कोई नहीं'),{d:r3.detail});
 // F1d: benefic drishti (Jupiter in 11) but no placement -> unserved
 const r4=row(T.report(mk({Sun:0,Moon:8,Mars:7,Mercury:4,Jupiter:11,Venus:2,Saturn:6}),0),'c15-2');
 ck('F1d mutation: drishti without placement -> unserved',r4.served===false,{d:r4.detail});
 // F1e: nodes occupying/aspecting the 4th never satisfy a leg
 const r5=row(T.report(mk({Sun:6,Moon:3,Mars:9,Mercury:0,Jupiter:5,Venus:2,Saturn:1},3,9),0),'c15-2');
 ck('F1e Rahu+Ketu on the 4th axis: still unserved',r5.served===false,{d:r5.detail});
 // F1f: malefic-only drishti on the 4th (Mars 8th-aspect, Saturn 10th-aspect) does not serve
 const r6=row(T.report(mk({Sun:6,Moon:5,Mars:9,Mercury:0,Jupiter:2,Venus:4,Saturn:1}),0),'c15-2');
 ck('F1f malefic-only drishti on the 4th -> unserved',r6.served===false&&r6.detail.includes('खंड3 (4रे भाव पर शुभ-दृष्टि): कोई नहीं'),{d:r6.detail});
 // F1g: lagna shift - asc 10 (Aquarius): bhava 4 = sign 1; L4=Venus in 1 + Jupiter in 9 aspects 1 (5th) -> served
 const r7=row(T.report(mk({Sun:0,Moon:5,Mars:7,Mercury:4,Jupiter:9,Venus:1,Saturn:6}),10),'c15-2');
 ck('F1g whole-sign bhava follows lagna (asc 10)',r7.served===true,{d:r7.detail});
}
// --- F2: c15-3 (4L own sign OR exaltation; navamsha leg unmodeled) + EXALT all-7 pin
{
 // F2a: Moon(L4) in own sign Cancer -> served via own-sign leg
 const r1=row(T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:4,Jupiter:11,Venus:2,Saturn:6}),0),'c15-3');
 ck('F2a served via own sign',r1.served===true&&r1.detail.includes('स्व-राशि'),{d:r1.detail});
 // F2b: Moon(L4) in Taurus (exaltation) -> served via exaltation leg
 const r2=row(T.report(mk({Sun:0,Moon:1,Mars:7,Mercury:4,Jupiter:11,Venus:2,Saturn:6}),0),'c15-3');
 ck('F2b served via exaltation',r2.served===true&&r2.detail.includes('उच्च'),{d:r2.detail});
 // F2c: Moon(L4) in Leo: neither own nor exalted; navamsha unknown -> unserved (never assumed)
 const r3=row(T.report(mk({Sun:0,Moon:4,Mars:7,Mercury:0,Jupiter:11,Venus:2,Saturn:6}),0),'c15-3');
 ck('F2c neither own nor exalted -> unserved (navamsha never assumed)',r3.served===false&&r3.detail.includes('न उच्च, न स्व-राशि')&&r3.detail.includes('अमॉडल'),{d:r3.detail});
 // F2d/F15: EXALT pinned for ALL seven grahas via c15-3 (asc chosen so g is the 4th lord)
 const T_EXALT={Sun:0,Moon:1,Mars:9,Mercury:5,Jupiter:3,Venus:11,Saturn:6}; // independent hardcode for the pin
 const ASC4={Sun:1,Moon:0,Mars:9,Mercury:11,Jupiter:5,Venus:10,Saturn:6}; // asc with SIGN_LORD[(asc+3)%12]===g
 for(const g of SEVENG){
  const asc=ASC4[g];
  const map={};let slot=0;for(const h of SEVENG)map[h]=(slot++)%12;
  map[g]=T_EXALT[g];
  const d=row(T.report(mk(map),asc),'c15-3').detail;
  ck('F2d exaltation sign pinned for '+g,d.includes('उच्च')&&row(T.report(mk(map),asc),'c15-3').served===true,{asc,d});
  // mutation: g at a neutral sign (not own, not exalted) -> unserved
  const neutral=[...Array(12).keys()].find(x=>x!==T_EXALT[g]&&BP.SIGN_LORD[x]!==g);
  map[g]=neutral;
  const rN=row(T.report(mk(map),asc),'c15-3');
  ck('F2d2 '+g+' at neutral sign -> unserved',rN.served===false&&rN.detail.includes('न उच्च, न स्व-राशि'),{neutral,d:rN.detail});
 }
 // F2x: duplicated EXALT literal byte-identical to kundli-engine.js
 const modSrc=fs.readFileSync(__dirname+'/../kundli-sukhaphal.js','utf8');
 const engSrc=fs.readFileSync(__dirname+'/../kundli-engine.js','utf8');
 const exL=(modSrc.match(/const EXALT=\{[^}]*\}/)||[])[0];
 const exE=(engSrc.match(/const EXALT=\{[^}]*\}/)||[])[0];
 ck('F2x duplicated EXALT literal byte-identical to kundli-engine.js',!!exL&&exL===exE,{exL,exE});
}
// --- F3: c15-4 ((4L yuti 10L) AND (4L in kendra/trikona))
{
 // F3a: Moon+Saturn in sign 3 (bhava 4, kendra) -> served
 const r1=row(T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:4,Jupiter:11,Venus:2,Saturn:3}),0),'c15-4');
 ck('F3a yuti + kendra -> served',r1.served===true&&r1.detail.includes('से युति): हाँ')&&r1.detail.includes('केंद्र/कोण हाँ'),{d:r1.detail});
 // F3b: yuti (Moon+Saturn in 5) but bhava 6 is a dusthana -> unserved
 const r2=row(T.report(mk({Sun:0,Moon:5,Mars:7,Mercury:4,Jupiter:11,Venus:2,Saturn:5}),0),'c15-4');
 ck('F3b yuti without kendra/trikona -> unserved',r2.served===false&&r2.detail.includes('से युति): हाँ')&&r2.detail.includes('केंद्र/कोण नहीं'),{d:r2.detail});
 // F3c: Moon in kendra (bhava 4) but no yuti (Saturn in 6) -> unserved
 const r3=row(T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:4,Jupiter:11,Venus:2,Saturn:6}),0),'c15-4');
 ck('F3c kendra without yuti -> unserved',r3.served===false&&r3.detail.includes('से युति): नहीं'),{d:r3.detail});
 // F3d: yuti in bhava 3 (not kendra/trikona) -> unserved
 const r4=row(T.report(mk({Sun:0,Moon:2,Mars:7,Mercury:4,Jupiter:11,Venus:5,Saturn:2}),0),'c15-4');
 ck('F3d yuti in bhava 3 -> unserved',r4.served===false,{d:r4.detail});
}
// --- F4: c15-5 (4L benefic AND other-benefic yuti/drishti on 4L AND Mercury in lagna)
{
 // F4a: Moon(L4) waxing-shubh in 3, Jupiter drishti on 3 from 11, Mercury in lagna -> served
 const r1=row(T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:0,Jupiter:11,Venus:2,Saturn:6}),0),'c15-5');
 ck('F4a all three legs via drishti -> served',r1.served===true&&r1.detail.includes('खंड3 (बुध लग्न में): हाँ'),{d:r1.detail});
 // F4b: Moon waning (Sun 0, Moon 9) -> 4L paap -> unserved despite contact+lagna legs
 const r2=row(T.report(mk({Sun:0,Moon:9,Mars:7,Mercury:0,Jupiter:1,Venus:2,Saturn:6}),0),'c15-5');
 ck('F4b mutation: 4L malefic -> unserved',r2.served===false&&r2.detail.includes('खंड1 (चतुर्थेश चन्द्र शुभ): नहीं'),{d:r2.detail});
 // F4c: Moon shubh in 3, Mercury in lagna, but no other-benefic contact on 3 -> unserved
 const r3=row(T.report(mk({Sun:1,Moon:3,Mars:9,Mercury:0,Jupiter:5,Venus:2,Saturn:6}),0),'c15-5');
 ck('F4c mutation: no benefic contact -> unserved',r3.served===false&&r3.detail.includes('खंड2 (चतुर्थेश पर अन्य शुभ-युति/दृष्टि): कोई नहीं'),{d:r3.detail});
 // F4d: contact present but Mercury not in lagna -> unserved
 const r4=row(T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:4,Jupiter:11,Venus:2,Saturn:6}),0),'c15-5');
 ck('F4d mutation: Mercury not in lagna -> unserved',r4.served===false&&r4.detail.includes('खंड3 (बुध लग्न में): नहीं'),{d:r4.detail});
 // F4e: the 4th lord's own presence never counts as its own contact (asc 5, L4=Jupiter in 8)
 const r5=row(T.report(mk({Sun:1,Moon:3,Mars:7,Mercury:5,Jupiter:8,Venus:1,Saturn:6}),5),'c15-5');
 ck('F4e self-contact excluded (L4 alone in its sign)',r5.served===false&&r5.detail.includes('खंड2 (चतुर्थेश पर अन्य शुभ-युति/दृष्टि): कोई नहीं'),{d:r5.detail});
 // F4f: yuti leg variant - Venus conjunct Moon in 3 -> served via yuti (not drishti)
 const r6=row(T.report(mk({Sun:1,Moon:3,Mars:9,Mercury:0,Jupiter:5,Venus:3,Saturn:6}),0),'c15-5');
 ck('F4f served via benefic yuti leg',r6.served===true&&r6.detail.includes('शुक्र'),{d:r6.detail});
}
// --- F5: c15-8 (Sun in 4th AND Saturn in 4th AND Moon in 9th AND Mars in 11th)
{
 // F5a: Sun:3, Saturn:3, Moon:8, Mars:10 -> all four legs -> served
 const r1=row(T.report(mk({Sun:3,Moon:8,Mars:10,Mercury:0,Jupiter:5,Venus:2,Saturn:3}),0),'c15-8');
 ck('F5a all four legs -> served',r1.served===true,{d:r1.detail});
 // F5b: translation-divergence mutation: Moon AND Saturn in the 9th (Santhanam reading),
 // Sun alone in the 4th -> unserved (Sanskrit reading governs: Saturn must be in the 4th)
 const r2=row(T.report(mk({Sun:3,Moon:8,Mars:10,Mercury:0,Jupiter:5,Venus:2,Saturn:8}),0),'c15-8');
 ck('F5b jv-reading mutation (Saturn in 9th) -> unserved',r2.served===false&&r2.detail.includes('खंड2 (शनि 4रे भाव में, सूर्य-युक्त): नहीं')&&r2.detail.includes('खंड3 (चन्द्र 9वें भाव में): हाँ'),{d:r2.detail});
 // F5c: Mars not in the 11th -> unserved
 const r3=row(T.report(mk({Sun:3,Moon:8,Mars:7,Mercury:0,Jupiter:5,Venus:2,Saturn:3}),0),'c15-8');
 ck('F5c Mars outside the 11th -> unserved',r3.served===false&&r3.detail.includes('खंड4 (मंगल 11वें भाव में): नहीं'),{d:r3.detail});
}
// --- F6: input guards (mirror sibling modules)
{
 let threw=0;for(const badx of [[null,0],[mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:0,Saturn:6}),12],[mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:0,Saturn:6}),-1]]){try{T.report(badx[0],badx[1]);}catch(e){threw++;}}
 ck('F6a invalid asc/planets rejected',threw===3,{threw});
 const dup=mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:0,Saturn:6});dup.push({graha:'Sun',rashi:5,degreesInRashi:1});
 let threw2=false;try{T.report(dup,0);}catch(e){threw2=true;}
 ck('F6b duplicate graha rejected',threw2);
}
// --- F12: hardened omission/workflow scans on module + panel (ch21 F17 family).
{
 const banned=['माता','मातृ','जननी','मातु','दीर्घ','आयु','अल्पायु','मूक','बधिर','गूंग','वत्सर','मृत्यु','विनाश','हन्ति','मारक','रोग','व्याधि','व्रण','उपाय','मंत्र','रत्न','निष्क'];
 const charts=[mk({Sun:0,Moon:3,Mars:7,Mercury:4,Jupiter:11,Venus:2,Saturn:3},0),
  mk({Sun:0,Moon:3,Mars:7,Mercury:0,Jupiter:11,Venus:2,Saturn:6},0),
  mk({Sun:3,Moon:8,Mars:10,Mercury:0,Jupiter:5,Venus:2,Saturn:3},0),
  mk({Sun:0,Moon:4,Mars:7,Mercury:0,Jupiter:11,Venus:2,Saturn:6},0)];
 const ascs=[0,0,0,0];
 const leaks=[];
 charts.forEach((psx,i)=>{const rep=T.report(psx,ascs[i]);
  for(const r of rep.rows){if(!r.served)continue;
   for(const w of banned){if(r.text.includes(w)||(r.detail||'').includes(w)||(r.transparency||'').includes(w)||(r.note||'').includes(w))leaks.push([r.id,w]);}
   if(!/परंपरा-कथन/.test(r.text))leaks.push([r.id,'missing tradition-label']);}});
 ck('F12a no banned wording in any served text/detail/transparency/note',leaks.length===0,leaks);
 const tsrcRaw=fs.readFileSync(__dirname+'/../kundli-sukhaphal.js','utf8');
 const uiRaw=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
 const pStart=uiRaw.indexOf('function sukhaphalPanel(){'),pEnd=uiRaw.indexOf('function phalMethodPanel(){');
 ck('F12p sukhaphalPanel body sliceable',pStart>0&&pEnd>pStart);
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
 const tam1=tsrcRaw.replace('चतुर्थेश स्व-राशि या उच्च-राशि में','चतुर्थेश /* उपाय */ स्व-राशि या उच्च-राशि में'); // comment marker INSIDE a backtick template chunk
 const tam2=tsrcRaw.replace('चतुर्थेश स्व-राशि या उच्च-राशि में','चतुर्थेश उपाय स्व-राशि या उच्च-राशि में'); // plain backtick injection
 ck('F12b3 mutation caught: /* उपाय */ inside a module backtick template',tam1!==tsrcRaw&&banned.some(w=>tam1.includes(w))&&extractLiterals(tam1).some(t=>t.includes('उपाय')));
 ck('F12b4 mutation caught: plain module backtick injection',tam2!==tsrcRaw&&extractLiterals(tam2).some(t=>t.includes('उपाय')));
 const tam3=panelRaw.replace('<div class="suite-yogas">','<div class="suite-yogas">/* उपाय */'); // marker inside the panel backtick template
 const tam4=panelRaw.replace('<div class="suite-yogas">','<div class="suite-yogas">उपाय');
 ck('F12b5 mutation caught: /* उपाय */ inside the panel template',tam3!==panelRaw&&extractLiterals(tam3).some(t=>t.includes('उपाय')));
 ck('F12b6 mutation caught: plain panel template injection',tam4!==panelRaw&&extractLiterals(tam4).some(t=>t.includes('उपाय')));
 ck('F12c backtick templates actually covered by the module scan',lits.some(t=>t.includes('खंड1 (चतुर्थेश')),{n:lits.length});
 ck('F12cP panel template chunks actually covered',pLits.some(t=>t.includes('suite-yogas')),{n:pLits.length});
 const workflow=['G1','G2','G3','G4','G5','G6','G7','G8','G9','SF1','SF2','SF3','M1','M2','M3','gate','GATE','reviewer','breadth','ledger','cache','स्कैन'];
 const wfLeaks=lits.concat(pLits).flatMap(t=>workflow.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,50),w})));
 ck('F12c2 no review-workflow/scan-machinery tokens in module or panel literals',wfLeaks.length===0,wfLeaks);
 const all=T.report(charts[0],0);
 ck('F12d omitN is 7 (1 life-span unit, 1 family-happiness unit, 1 bodily-state unit, 4 time-specified conveyance yogas)',all.omitN===7,{omitN:all.omitN});
 ck('F12e omit/breadth/unmodeled notices present and category-explicit',all.omitNotice.includes('7 खंड')&&all.omitNotice.includes('जीवन-अवधि')&&all.omitNotice.includes('पारिवारिक सुख-कथन')&&all.omitNotice.includes('शारीरिक-स्थिति')&&all.omitNotice.includes('काल-निर्दिष्ट यान-योग')&&all.omitNotice.includes('15.6')&&all.omitNotice.includes('15.7')&&all.omitNotice.includes('15.9')&&all.breadthNotice.includes('15.1')&&all.breadthNotice.includes('15.14उत्तर')&&all.unmodeledNotice.includes('स्वांशक')&&all.unmodeledNotice.includes('अमॉडल'));
 ck('F12f nodes-note present; no conduct-note in this chapter (no conduct rows)',all.nodesNote.includes('अमॉडल')&&all.conductNote===undefined);
 ck('F12g exactly 5 rows (limited chapter scope)',all.rows.length===5,{n:all.rows.length});
 ck('F12h header states no-prediction framing + limited scope, no complete-chapter claim',all.header.includes('भविष्यकथन या निश्चय नहीं')&&all.header.includes('परिमित')&&all.header.includes('अध्याय-पूर्णता का दावा नहीं'));
 ck('F12i polarity favourable only (adverse/omitted rows carried by counts)',all.rows.filter(r=>r.polarity==='अनुकूल').length===5&&all.rows.filter(r=>r.polarity==='प्रतिकूल').length===0);
 ck('F12j scope string discloses limited chapter scope + conventions',all.scope.includes('परिमित अध्याय-दायरा')&&all.scope.includes('अध्याय-पूर्णता का दावा नहीं')&&all.scope.includes('सीमा-लोप 7'));
 // F12k wiring pins: chain order and html tag
 const chainIdx=uiRaw.indexOf('sahajaphalPanel()+sukhaphalPanel()');
 ck('F12k chain: sukhaphalPanel() immediately after sahajaphalPanel()',chainIdx>0,{chainIdx});
 const htmlRaw=fs.readFileSync(__dirname+'/../kundli.html','utf8');
 ck('F12m kundli.html loads kundli-sukhaphal.js',htmlRaw.includes('<script src="kundli-sukhaphal.js"></script>'));
}
console.log(`\nsukhaphal: ${pass} pass, ${fail} fail`);
if(bad.length)console.log('FAILED:',bad.join(', '));
process.exitCode=fail?1:0;
