// Bhavaphal ch23 (vyaya bhava) checks. Run: node tests/validate-vyayaphal.js
// Fixtures: hand-computed synthetic charts (whole-sign houses from stated lagna; BPHS 3.11
// classes with dynamic Moon/Mercury). Curation: docs/bhavaphal-ch23-ledger-draft.md.
// Hardened scans from day one: quote-aware module+panel literal scans, raw scans,
// marker-injection mutations, workflow-token scan, EXALT byte-sync assertion.
'use strict';
const fs=require('fs');
const T=require('../kundli-vyayaphal.js');
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}

const SEVENG=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const T_EXALT={Sun:0,Moon:1,Mars:9,Mercury:5,Jupiter:3,Venus:11,Saturn:6}; // independent hardcode for the F11 pin
function mk(map,rahu){const ps=SEVENG.map(g=>({graha:g,rashi:map[g],degreesInRashi:10}));
 if(rahu!==undefined&&rahu!==null)ps.push({graha:'Rahu',rashi:rahu,degreesInRashi:10});return ps;}
function row(rep,id){const r=rep.rows.find(x=>x.id===id);if(!r)throw Error('row missing '+id);return r;}
// asc 0 (Aries): bhava 12 = sign 11 (Pisces) -> vyayesh=Jupiter, lagnesh=Mars.

// --- F1: c23-1 (four independent alternatives)
{
 const rep=T.report(mk({Sun:0,Moon:7,Mars:9,Mercury:4,Jupiter:5,Venus:5,Saturn:6}),0);
 const r=row(rep,'c23-1');
 ck('F1a served via leg1 (vyayesh shubh-yuti)',r.served===true&&r.detail.includes('विकल्प1 (व्ययेश शुभ-युति): शुक्र'),{d:r.detail});
 const r2=row(T.report(mk({Sun:0,Moon:7,Mars:9,Mercury:4,Jupiter:8,Venus:2,Saturn:6}),0),'c23-1');
 ck('F1b served via leg2 (own sign)',r2.served===true&&r2.detail.includes('विकल्प2 (स्व-राशि): हाँ'),{d:r2.detail});
 const r3=row(T.report(mk({Sun:0,Moon:7,Mars:9,Mercury:4,Jupiter:3,Venus:2,Saturn:6}),0),'c23-1');
 ck('F1c served via leg3 (exalted)',r3.served===true&&r3.detail.includes('विकल्प3 (उच्च-राशि): हाँ'),{d:r3.detail});
 const r4=row(T.report(mk({Sun:0,Moon:7,Mars:9,Mercury:4,Jupiter:5,Venus:11,Saturn:6}),0),'c23-1');
 ck('F1d served via leg4 (benefic in the 12th)',r4.served===true&&r4.detail.includes('विकल्प4 (12वें में शुभ): शुक्र'),{d:r4.detail});
 const m=T.report(mk({Sun:0,Moon:7,Mars:9,Mercury:2,Jupiter:4,Venus:6,Saturn:8}),0);
 ck('F1e mutation: no leg -> unserved',row(m,'c23-1').served===false,{d:row(m,'c23-1').detail});
 ck('F1f note frames description-not-instruction',r.note.includes('क्रिया-निर्देश नहीं'));
}
// --- F2: c23-2 (Moon as 12th lord; OR structure; asc 4 = Leo -> vyayesh=Moon)
{
 const rep=T.report(mk({Sun:9,Moon:0,Mars:8,Mercury:10,Jupiter:6,Venus:7,Saturn:11}),4);
 const r=row(rep,'c23-2');
 ck('F2a served via bhava leg (Moon in the 9th)',r.served===true&&r.detail.includes('भाव 9/11/5: हाँ'),{d:r.detail});
 const r2=row(T.report(mk({Sun:9,Moon:1,Mars:8,Mercury:10,Jupiter:6,Venus:7,Saturn:11}),4),'c23-2');
 ck('F2b served via exaltation leg (Moon in Taurus)',r2.served===true&&r2.detail.includes('उच्च: हाँ'),{d:r2.detail});
 const r3=row(T.report(mk({Sun:9,Moon:3,Mars:8,Mercury:10,Jupiter:6,Venus:7,Saturn:11}),4),'c23-2');
 ck('F2c served via own-sign leg (Moon in Cancer)',r3.served===true&&r3.detail.includes('स्व-राशि: हाँ'),{d:r3.detail});
 const m=T.report(mk({Sun:9,Moon:4,Mars:8,Mercury:10,Jupiter:6,Venus:7,Saturn:11}),4);
 const rm=row(m,'c23-2');
 ck('F2d mutation: Moon in none of the legs -> unserved, all legs shown false',rm.served===false&&rm.detail.includes('भाव 9/11/5: नहीं')&&rm.detail.includes('उच्च: नहीं')&&rm.detail.includes('स्व-राशि: नहीं'),{d:rm.detail});
 const r5=row(T.report(mk({Sun:0,Moon:0,Mars:9,Mercury:4,Jupiter:5,Venus:5,Saturn:6}),0),'c23-2');
 ck('F2e non-Moon vyayesh: row not applicable, honest detail',r5.served===false&&r5.detail.includes('लागू नहीं'),{d:r5.detail});
 ck('F2f note records OR-structure + vacuity divergence + unmodeled navamsha + omitted segment',r.note.includes('OR-संरचना')&&r.note.includes('कभी बन ही नहीं सकती')&&r.note.includes('नवांश-विकल्प अमॉडल')&&r.note.includes('केवल गिनती'));
}
// --- F3: c23-3 (12th lord in the 6th/8th)
{
 const rep=T.report(mk({Sun:0,Moon:7,Mars:9,Mercury:4,Jupiter:5,Venus:2,Saturn:6}),0);
 ck('F3a served (vyayesh in the 6th)',row(rep,'c23-3').served===true,{d:row(rep,'c23-3').detail});
 const rep2=T.report(mk({Sun:0,Moon:7,Mars:9,Mercury:4,Jupiter:7,Venus:2,Saturn:6}),0);
 ck('F3b served (vyayesh in the 8th)',row(rep2,'c23-3').served===true);
 const m=T.report(mk({Sun:0,Moon:7,Mars:9,Mercury:4,Jupiter:4,Venus:2,Saturn:6}),0);
 ck('F3c mutation: vyayesh elsewhere -> unserved',row(m,'c23-3').served===false);
 ck('F3d note labels unmodeled navamsha segment + omitted segment count',row(rep,'c23-3').note.includes('अंश')&&row(rep,'c23-3').note.includes('स्वतः पूरा नहीं माना गया')&&row(rep,'c23-3').note.includes('केवल गिनती'));
}
// --- F4: c23-9 (ALL THREE malefic legs AND; nonvacuous witness)
{
 const rep=T.report(mk({Sun:5,Moon:8,Mars:5,Mercury:2,Jupiter:5,Venus:6,Saturn:11}),0);
 const r=row(rep,'c23-9');
 ck('F4a witness: all three legs -> served',r.served===true,{d:r.detail});
 const m1=T.report(mk({Sun:4,Moon:3,Mars:8,Mercury:2,Jupiter:5,Venus:6,Saturn:11}),0);
 ck('F4b mutation: leg1 missing -> unserved',row(m1,'c23-9').served===false&&row(m1,'c23-9').detail.includes('अंग1 (व्ययेश पाप-युति): नहीं'),{d:row(m1,'c23-9').detail});
 const m2=T.report(mk({Sun:5,Moon:8,Mars:5,Mercury:2,Jupiter:5,Venus:6,Saturn:10}),0);
 ck('F4c mutation: leg2 missing -> unserved',row(m2,'c23-9').served===false&&row(m2,'c23-9').detail.includes('अंग2 (12वें भाव में पाप): नहीं'),{d:row(m2,'c23-9').detail});
 const m3=T.report(mk({Sun:0,Moon:8,Mars:3,Mercury:2,Jupiter:3,Venus:6,Saturn:11}),0);
 const r3=row(m3,'c23-9');
 ck('F4d mutation: leg3 missing -> unserved, legs 1+2 still shown true (AND transparency, non-OR)',r3.served===false&&r3.detail.includes('अंग1 (व्ययेश पाप-युति): मंगल')&&r3.detail.includes('अंग2 (12वें भाव में पाप): शनि')&&r3.detail.includes('अंग3 (12वें भाव पर पाप-दृष्टि): नहीं'),{d:r3.detail});
 ck('F4e note records AND reading + vp-OR divergence',r.note.includes('तीनों अंग एक साथ')&&r.note.includes('OR विमत'));
}
// --- F5: c23-10 (ALL THREE benefic legs AND; shubha-rashi named convention)
{
 const rep=T.report(mk({Sun:0,Moon:3,Mars:9,Mercury:5,Jupiter:8,Venus:11,Saturn:6}),0);
 const r=row(rep,'c23-10');
 ck('F5a witness: all three legs -> served',r.served===true,{d:r.detail});
 const m1=T.report(mk({Sun:0,Moon:3,Mars:9,Mercury:5,Jupiter:4,Venus:11,Saturn:6}),0);
 ck('F5b mutation: vyayesh out of shubha-rashi -> unserved',row(m1,'c23-10').served===false&&row(m1,'c23-10').detail.includes('अंग1 (व्ययेश शुभ-राशि में): नहीं'),{d:row(m1,'c23-10').detail});
 const m2=T.report(mk({Sun:0,Moon:3,Mars:9,Mercury:5,Jupiter:8,Venus:10,Saturn:6}),0);
 ck('F5c mutation: leg2 missing -> unserved',row(m2,'c23-10').served===false);
 const m3=T.report(mk({Sun:0,Moon:3,Mars:9,Mercury:6,Jupiter:8,Venus:11,Saturn:2}),0);
 ck('F5d mutation: leg3 missing -> unserved',row(m3,'c23-10').served===false);
 // convention fixture: asc 11 -> bhava 12 = sign 10 (Capricorn) -> vyayesh=Saturn; Saturn in CANCER counts (static Moon-ruled sign)
 const rc=row(T.report(mk({Sun:0,Moon:6,Mars:8,Mercury:4,Jupiter:1,Venus:10,Saturn:3}),11),'c23-10');
 ck('F5e convention: Cancer in the static shubha-rashi list (conditional-Moon issue disclosed)',rc.served===true&&rc.detail.includes('अंग1 (व्ययेश शुभ-राशि में): हाँ')&&rc.detail.includes('कर्क'),{d:rc.detail});
 ck('F5f note records AND + direction divergence + named convention incl. paksha disclosure',r.note.includes('AND-पठन')&&r.note.includes('in his own country')&&r.note.includes('नामित परिपाटी')&&r.note.includes('पक्ष-सापेक्ष'));
}
// --- F6: c23-11 (Saturn AND Mars in the 12th; ZERO benefic aspect - negative check)
{
 const rep=T.report(mk({Sun:9,Moon:6,Mars:11,Mercury:4,Jupiter:0,Venus:2,Saturn:11}),0);
 const r=row(rep,'c23-11');
 ck('F6a witness: both in 12th, no benefic aspect -> served',r.served===true&&r.detail.includes('12वें भाव पर शुभ-दृष्टि: कोई नहीं'),{d:r.detail});
 const m1=T.report(mk({Sun:9,Moon:6,Mars:11,Mercury:4,Jupiter:5,Venus:2,Saturn:11}),0);
 const r1=row(m1,'c23-11');
 ck('F6b mutation: benefic aspect present -> unserved, aspect named',r1.served===false&&r1.detail.includes('12वें भाव पर शुभ-दृष्टि: गुरु'),{d:r1.detail});
 const m2=T.report(mk({Sun:9,Moon:6,Mars:9,Mercury:4,Jupiter:0,Venus:2,Saturn:11}),0);
 ck('F6c mutation: Mars missing -> unserved',row(m2,'c23-11').served===false);
 const m3=T.report(mk({Sun:9,Moon:6,Mars:11,Mercury:4,Jupiter:0,Venus:2,Saturn:9}),0);
 ck('F6d mutation: Saturn missing -> unserved',row(m3,'c23-11').served===false);
 ck('F6e note records Sanskrit-both + jv-or divergence + Saturn-only narrowness + negative-check',r.note.includes('दोनों 12वें में')&&r.note.includes('Saturn or Mars')&&r.note.includes('केवल शनि गिना गया')&&r.note.includes('negative-check'));
 ck('F6f conduct text carries historical frame',r.text.includes('ऐतिहासिक आचरण-कथन'));
}
// --- F7: c23-12 (lagnesh in 12th AND vyayesh in lagna AND vyayesh Venus-joined)
{
 const rep=T.report(mk({Sun:5,Moon:7,Mars:11,Mercury:3,Jupiter:0,Venus:0,Saturn:8}),0);
 const r=row(rep,'c23-12');
 ck('F7a witness: all three legs -> served',r.served===true,{d:r.detail});
 const m1=T.report(mk({Sun:5,Moon:7,Mars:10,Mercury:3,Jupiter:0,Venus:0,Saturn:8}),0);
 ck('F7b mutation: lagnesh out of 12th -> unserved',row(m1,'c23-12').served===false);
 const m2=T.report(mk({Sun:5,Moon:7,Mars:11,Mercury:3,Jupiter:1,Venus:1,Saturn:8}),0);
 ck('F7c mutation: vyayesh out of lagna -> unserved',row(m2,'c23-12').served===false);
 const m3=T.report(mk({Sun:5,Moon:7,Mars:11,Mercury:3,Jupiter:0,Venus:2,Saturn:8}),0);
 ck('F7d mutation: Venus-yuti missing -> unserved',row(m3,'c23-12').served===false&&row(m3,'c23-12').detail.includes('अंग3 (व्ययेश शुक्र-युति): नहीं'),{d:row(m3,'c23-12').detail});
 // identity fail-closed: asc 2 (Gemini) -> bhava 12 = Taurus -> vyayesh=Venus; Venus in lagna, Mercury(lagnesh) in 12th
 const m4=T.report(mk({Sun:6,Moon:8,Mars:9,Mercury:1,Jupiter:4,Venus:2,Saturn:10}),2);
 const r4=row(m4,'c23-12');
 ck('F7e Venus-identity fail-closed: legs 1+2 true, row still unserved, disclosed',r4.served===false&&r4.detail.includes('अंग1 (लग्नेश 12वें में): हाँ')&&r4.detail.includes('अंग2 (व्ययेश लग्न में): हाँ')&&r4.detail.includes('स्वयं शुक्र')&&r4.detail.includes('स्वतः नहीं मानी गई'),{d:r4.detail});
 ck('F7f note frames description-not-instruction',r.note.includes('क्रिया-निर्देश नहीं'));
}
// --- F8: input validation
{
 let e1=null,e2=null,e3=null;
 try{T.report(mk({Sun:0,Moon:1,Mars:2,Mercury:3,Jupiter:4,Venus:5,Saturn:6}),12);}catch(e){e1=e;}
 try{T.report(mk({Sun:0,Moon:3,Mars:9,Mercury:6,Jupiter:7,Venus:3,Saturn:11}).slice(0,6),0);}catch(e){e2=e;}
 const bad3=mk({Sun:0,Moon:3,Mars:9,Mercury:6,Jupiter:7,Venus:3,Saturn:11});delete bad3[0].degreesInRashi;
 try{T.report(bad3,0);}catch(e){e3=e;}
 ck('F8a asc out of range rejected',!!e1);
 ck('F8b missing graha rejected',!!e2);
 ck('F8c missing degreesInRashi rejected (3.11 machinery needs it)',!!e3);
}
// --- F9: real chart smoke (astro-core; Patna) - rows build, non-vacuous, scan clean
{
 const vm=require('vm');const c={Date};vm.createContext(c);
 vm.runInContext(fs.readFileSync(__dirname+'/../astro-core.js','utf8'),c);const A=c.BrahmAstro;
 function civilUTC(date,time,tz){const base=Date.parse(date+'T'+time+':00Z');let t=base;for(let i=0;i<4;i++){const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(t).map(x=>[x.type,x.value]));t+=base-Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);}return new Date(t)}
 const l={latitude:25.5941,longitude:85.1376,timeZone:'Asia/Kolkata'};
 const birth=civilUTC('1990-06-15','10:30','Asia/Kolkata');
 const ps=A.grahaPositions(birth),lagna=A.siderealLagna(birth,l);
 const rep=T.report(ps.map(x=>({graha:x.graha,rashi:x.rashi,degreesInRashi:x.degreesInRashi})),Math.floor(lagna/30));
 ck('F9a real chart 1 (1990-06-15): 7 rows build',rep.rows.length===7);
 const s1=rep.rows.filter(r=>r.served);
 ck('F9b real chart 1: details factual, not all served (zero served is honest)',s1.length<7&&rep.rows.every(r=>typeof r.detail==='string'&&r.detail.length>0),{served:s1.map(r=>r.id)});
 const birth2=civilUTC('1985-03-10','08:15','Asia/Kolkata');
 const ps2=A.grahaPositions(birth2),lagna2=A.siderealLagna(birth2,l);
 const rep2=T.report(ps2.map(x=>({graha:x.graha,rashi:x.rashi,degreesInRashi:x.degreesInRashi})),Math.floor(lagna2/30));
 const s2=rep2.rows.filter(r=>r.served);
 ck('F9c real chart 2 (1985-03-10) non-vacuous',s2.length>0&&s2.length<7,{served:s2.map(r=>r.id)});
 const banned=['रोग','व्याधि','दीर्घ','आयु','व्रण','यमल','मृत्यु','मारक','उपाय','मंत्र','रत्न','निष्क','नरक','मोक्ष','कान्ता','रमणो'];
 const leaks=[];for(const r of [...s1,...s2])for(const w of banned)if((r.text+r.detail+(r.transparency||'')+(r.note||'')).includes(w))leaks.push([r.id,w]);
 ck('F9d omission scan clean on served rows (both charts)',leaks.length===0,leaks);
 ck('F9e report notices present',rep.omitNotice.includes('5 खंड')&&rep.breadthNotice.includes('23.7')&&rep.unmodeledNotice.includes('नवांश'),{o:rep.omitNotice});
}
// --- F10: UI checks on the ACTUAL vyayaphalPanel body ------------------------------
{
 const source=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
 const start=source.indexOf('function vyayaphalPanel(){'),end=source.indexOf("$('astroResult')");
 ck('F10a vyayaphalPanel body sliceable',start>0&&end>start);
 const body=source.slice(start,end);
 const esc=s=>String(s).replace(/[&<>"']/g,c=>' ');
 const run=(psx,asc)=>{const f=new Function('window','ps','ls','esc','panel','pending',body+';return vyayaphalPanel();');
  return f({BrahmVyayaPhal:T},psx,asc,esc,(t,s)=>s,(t,s)=>'PENDING['+t+'] '+s);};
 const psx=mk({Sun:9,Moon:6,Mars:11,Mercury:4,Jupiter:0,Venus:2,Saturn:11},11);
 const html=run(psx,0);
 ck('F10b panel renders (not pending)',!html.startsWith('PENDING'),html.slice(0,80));
 ck('F10c header verbatim',html.includes(T.HEADER));
 ck('F10d omit/breadth/unmodeled notices verbatim',html.includes(T.OMIT_NOTICE)&&html.includes(T.BREADTH_NOTICE)&&html.includes(T.UNMODELED_NOTICE));
 ck('F10e 7 row cards',(html.match(/<details>/g)||[]).length===7);
 ck('F10f served row shows tradition text',html.includes('अनुचित मार्ग से धनार्जन की चर्चा'));
 ck('F10g unserved row hides tradition text',html.includes('पूरी नहीं बनी; परंपरा-कथन नहीं दिखाया गया'));
 ck('F10h three-leg detail rendered (AND transparency)',html.includes('अंग1')&&html.includes('अंग2')&&html.includes('अंग3'));
 ck('F10i row note rendered (23.13 disclosure)',html.includes('negative-check'));
 ck('F10j nodes+conduct notes rendered',html.includes('राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल')&&html.includes('चरित्र-निर्णय'));
 ck('F10k pane-report wiring (appended after dhanaphalPanel; prior substrings intact)',source.includes('dhanaphalPanel()+vyayaphalPanel()')&&source.includes('labhaPanel()+karmaphalPanel()+dhanaphalPanel()'));
 ck('F10l module absent -> honest pending',(()=>{const f=new Function('window','ps','ls','esc','panel','pending',body+';return vyayaphalPanel();');
  return f({},psx,0,esc,(t,s)=>s,(t,s)=>'PENDING '+s);})().startsWith('PENDING'));
 ck('F10m kundli.html loads module',fs.readFileSync(__dirname+'/../kundli.html','utf8').includes('kundli-vyayaphal.js'));
 const banned=['रोग','व्याधि','दीर्घ','आयु','व्रण','यमल','मृत्यु','मारक','उपाय','मंत्र','रत्न','निष्क','नरक','मोक्ष','कान्ता','रमणो'];
 const uiLits=[...body.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(m=>m[1])
  .concat([...body.matchAll(/`((?:[^`\\]|\\.)*)`/gs)].map(m=>m[1]));
 const uiLeaks=uiLits.flatMap(t=>banned.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,40),w})));
 ck('F10n vyayaphalPanel body literals clean (single-quote + backtick)',uiLeaks.length===0,{n:uiLits.length,uiLeaks});
}
// --- F11: EXALT pinned for ALL seven grahas via c23-1 detail + byte-sync assertion
{
 const BP=require('../kundli-bhavaphal.js');
 const modN=(x,n)=>((x%n)+n)%n;
 for(const g of SEVENG){
  const s=BP.SIGN_LORD.findIndex(l=>l===g); // a sign this graha rules -> make it the 12th bhava
  const asc=modN(s+1,12); // bhava 12 = sign s -> g becomes vyayesh
  const neutral=[...Array(12).keys()].find(x=>x!==T_EXALT[g]&&BP.SIGN_LORD[x]!==g&&x!==s);
  const chart=target=>{const map={};for(const o of SEVENG)map[o]=neutral;map[g]=target;return mk(map);};
  const dE=row(T.report(chart(T_EXALT[g]),asc),'c23-1').detail;
  ck('F11-ex-'+g+' exalted vyayesh detail says उच्च',dE.includes('विकल्प3 (उच्च-राशि): हाँ'),{g,asc,dE});
  const dN=row(T.report(chart(neutral),asc),'c23-1').detail;
  ck('F11-ctl-'+g+' neutral-sign vyayesh: no dignity claimed',dN.includes('विकल्प3 (उच्च-राशि): नहीं')&&dN.includes('विकल्प2 (स्व-राशि): नहीं'),{g,dN});
 }
 const modSrc=fs.readFileSync(__dirname+'/../kundli-vyayaphal.js','utf8');
 const engSrc=fs.readFileSync(__dirname+'/../kundli-engine.js','utf8');
 const exL=(modSrc.match(/const EXALT=\{[^}]*\}/)||[])[0];
 const exE=(engSrc.match(/const EXALT=\{[^}]*\}/)||[])[0];
 ck('F11x duplicated EXALT literal byte-identical to kundli-engine.js',!!exL&&exL===exE,{exL,exE});
}
// --- F12: hardened omission/workflow scans on module + panel (ch21 F17 family).
// Quote-aware literal extraction; NO destructive comment stripping - a comment
// marker inside a template literal is literal text and stays visible. Module
// code has no regex literals and no double-quoted strings.
{
 const banned=['रोग','व्याधि','दीर्घ','आयु','व्रण','यमल','मृत्यु','मारक','उपाय','मंत्र','रत्न','निष्क','नरक','मोक्ष','कान्ता','रमणो'];
 const charts=[mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:0,Saturn:0},3),
  mk({Sun:2,Moon:3,Mars:6,Mercury:1,Jupiter:4,Venus:2,Saturn:6},10),
  mk({Sun:10,Moon:10,Mars:9,Mercury:1,Jupiter:2,Venus:9,Saturn:0},10),
  mk({Sun:5,Moon:3,Mars:1,Mercury:2,Jupiter:11,Venus:11,Saturn:7},11)];
 const ascs=[0,0,0,4];
 const leaks=[];
 charts.forEach((psx,i)=>{const rep=T.report(psx,ascs[i]);
  for(const r of rep.rows){if(!r.served)continue;
   for(const w of banned){if(r.text.includes(w)||(r.detail||'').includes(w)||(r.transparency||'').includes(w)||(r.note||'').includes(w))leaks.push([r.id,w]);}
   if(!/परंपरा-कथन/.test(r.text))leaks.push([r.id,'missing tradition-label']);}});
 ck('F12a no banned wording in any served text/detail/transparency/note',leaks.length===0,leaks);
 const tsrcRaw=fs.readFileSync(__dirname+'/../kundli-vyayaphal.js','utf8');
 const uiRaw=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
 const pStart=uiRaw.indexOf('function vyayaphalPanel(){'),pEnd=uiRaw.indexOf("$('astroResult')");
 ck('F12p vyayaphalPanel body sliceable',pStart>0&&pEnd>pStart);
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
 const tam1=tsrcRaw.replace('चार स्वतंत्र विकल्पों में कोई एक','चार स्वतंत्र /* उपाय */ विकल्पों में कोई एक'); // comment marker INSIDE a backtick template chunk
 const tam2=tsrcRaw.replace('चार स्वतंत्र विकल्पों में कोई एक','चार स्वतंत्र उपाय विकल्पों में कोई एक'); // plain backtick injection
 ck('F12b3 mutation caught: /* उपाय */ inside a module backtick template',tam1!==tsrcRaw&&banned.some(w=>tam1.includes(w))&&extractLiterals(tam1).some(t=>t.includes('उपाय')));
 ck('F12b4 mutation caught: plain module backtick injection',tam2!==tsrcRaw&&extractLiterals(tam2).some(t=>t.includes('उपाय')));
 const tam3=panelRaw.replace('<div class="suite-yogas">','<div class="suite-yogas">/* उपाय */'); // marker inside the panel backtick template
 const tam4=panelRaw.replace('<div class="suite-yogas">','<div class="suite-yogas">उपाय');
 ck('F12b5 mutation caught: /* उपाय */ inside the panel template',tam3!==panelRaw&&extractLiterals(tam3).some(t=>t.includes('उपाय')));
 ck('F12b6 mutation caught: plain panel template injection',tam4!==panelRaw&&extractLiterals(tam4).some(t=>t.includes('उपाय')));
 ck('F12c backtick templates actually covered by the module scan',lits.some(t=>t.includes('व्ययेश (')),{n:lits.length});
 ck('F12cP panel template chunks actually covered',pLits.some(t=>t.includes('suite-yogas')),{n:pLits.length});
 const workflow=['G1','G2','G3','G4','G5','G6','G7','G8','G9','SF1','SF2','SF3','M1','M2','M3','gate','GATE','reviewer','breadth','ledger','cache','स्कैन'];
 const wfLeaks=lits.concat(pLits).flatMap(t=>workflow.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,50),w})));
 ck('F12c2 no review-workflow/scan-machinery tokens in module or panel literals',wfLeaks.length===0,wfLeaks);
 const all=T.report(charts[0],0);
 ck('F12d omitN is 5 (23.9, 23.10, 23.6b, two relationship segments)',all.omitN===5,{omitN:all.omitN});
 ck('F12e omit/breadth/unmodeled notices present and category-explicit',all.omitNotice.includes('5 खंड')&&all.omitNotice.includes('परलोक')&&all.omitNotice.includes('संबंध-सुख')&&all.breadthNotice.includes('सम्बोधन')&&all.breadthNotice.includes('23.7')&&all.breadthNotice.includes('23.8')&&all.unmodeledNotice.includes('2 शर्त-खंड')&&all.unmodeledNotice.includes('नवांश'));
 ck('F12f nodes-note + conduct-note present',all.nodesNote.includes('अमॉडल')&&all.conductNote.includes('चरित्र-निर्णय')&&all.conductNote.includes('नैतिक'));
 ck('F12g exactly 7 rows',all.rows.length===7,{n:all.rows.length});
 ck('F12h header states no-prediction framing',all.header.includes('भविष्यकथन या निश्चय नहीं'));
 ck('F12i polarity counts favourable/adverse/neutral = 1/2/4',all.rows.filter(r=>r.polarity==='अनुकूल').length===1&&all.rows.filter(r=>r.polarity==='प्रतिकूल').length===2&&all.rows.filter(r=>r.polarity==='तटस्थ-वर्णन').length===4);
}
console.log(`\nvyayaphal: ${pass} pass, ${fail} fail`);
if(bad.length)console.log('FAILED:',bad.join(', '));
process.exitCode=fail?1:0;
