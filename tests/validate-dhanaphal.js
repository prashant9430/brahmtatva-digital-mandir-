// Bhavaphal ch13 (dhana bhava) checks. Run: node tests/validate-dhanaphal.js
// Fixtures: hand-computed synthetic charts (whole-sign houses from stated lagna; BPHS 3.11
// classes with dynamic Moon/Mercury). Curation: docs/bhavaphal-ch13-ledger-draft.md.
// Scans: served text+detail+transparency+note scan; UI literal scan extended to backtick
// templates; EXALT byte-sync assertion against kundli-engine.js.
'use strict';
const fs=require('fs');
const T=require('../kundli-dhanaphal.js');
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}

const SEVENG=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const T_EXALT={Sun:0,Moon:1,Mars:9,Mercury:5,Jupiter:3,Venus:11,Saturn:6}; // independent hardcode for the F15 pin
function mk(map,rahu){const ps=SEVENG.map(g=>({graha:g,rashi:map[g],degreesInRashi:10}));
 if(rahu!==undefined&&rahu!==null)ps.push({graha:'Rahu',rashi:rahu,degreesInRashi:10});return ps;}
function row(rep,id){const r=rep.rows.find(x=>x.id===id);if(!r)throw Error('row missing '+id);return r;}
// asc 0 (Aries): dhanesh=Venus (sign1), labhesh=Saturn (sign10). bhava of sign s = s+1.

// --- F1: c13-2a (2nd lord in 2nd or kendra/trikona)
{
 const rep=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:2,Jupiter:6,Venus:1,Saturn:8}),0);
 ck('F1a c13-2a served (dhanesh in 2nd)',row(rep,'c13-2a').served===true,{d:row(rep,'c13-2a').detail});
 const rep2=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:2,Jupiter:6,Venus:0,Saturn:8}),0);
 ck('F1b c13-2a served via kendra (bhava 1)',row(rep2,'c13-2a').served===true);
 const m=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:6,Venus:2,Saturn:9}),0);
 ck('F1c mutation: bhava 3 -> unserved',row(m,'c13-2a').served===false,{d:row(m,'c13-2a').detail});
}
// --- F2: c13-2b (2nd lord in 6/8/12)
{
 const rep=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:2,Jupiter:6,Venus:5,Saturn:8}),0);
 ck('F2a c13-2b served (dhanesh bhava 6)',row(rep,'c13-2b').served===true,{d:row(rep,'c13-2b').detail});
 const m=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:2,Jupiter:6,Venus:1,Saturn:8}),0);
 ck('F2b mutation: bhava 2 -> unserved',row(m,'c13-2b').served===false);
}
// --- F3: c13-2c (benefic/malefic in the 2nd; both-directions; coexistence transparency)
{
 const rep=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:1,Venus:9,Saturn:10}),0);
 ck('F3a benefic in 2nd -> served, detail names it',row(rep,'c13-2c').served===true&&row(rep,'c13-2c').detail.includes('शुभ: गुरु'),{d:row(rep,'c13-2c').detail});
 const rep2=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:1,Venus:9,Saturn:1}),0);
 const r2=row(rep2,'c13-2c');
 ck('F3b benefic+malefic coexisting -> transparency shown',r2.served===true&&typeof r2.transparency==='string'&&r2.transparency.includes('दोनों वर्ग'),{t:r2.transparency});
 const rep3=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:6,Venus:9,Saturn:1}),0);
 ck('F3c malefic-only in 2nd -> served, shubh leg honest',row(rep3,'c13-2c').served===true&&row(rep3,'c13-2c').detail.includes('शुभ: कोई नहीं'),{d:row(rep3,'c13-2c').detail});
 const m=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:6,Venus:9,Saturn:10}),0);
 ck('F3d neither -> unserved',row(m,'c13-2c').served===false);
 const m2=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:6,Venus:9,Saturn:10},1),0);
 ck('F3e Rahu in 2nd does NOT count',row(m2,'c13-2c').served===false,{d:row(m2,'c13-2c').detail});
}
// --- F4: c13-3 (Jupiter as 2nd lord; Mars-yuti unrestricted) - asc 7 (Scorpio): dhanesh=Jupiter
{
 const rep=T.report(mk({Sun:0,Moon:3,Mars:5,Mercury:6,Jupiter:8,Venus:11,Saturn:1}),7);
 ck('F4a c13-3 served (Jupiter dhanesh in 2nd)',row(rep,'c13-3').served===true,{d:row(rep,'c13-3').detail});
 const m=T.report(mk({Sun:2,Moon:3,Mars:5,Mercury:6,Jupiter:0,Venus:11,Saturn:1}),7);
 ck('F4b mutation: Jupiter out of 2nd, no Mars yuti -> unserved',row(m,'c13-3').served===false,{d:row(m,'c13-3').detail});
 const rep2=T.report(mk({Sun:2,Moon:3,Mars:0,Mercury:6,Jupiter:0,Venus:11,Saturn:1}),7);
 ck('F4c Mars-yuti OUTSIDE the 2nd still serves (unrestricted reading)',row(rep2,'c13-3').served===true,{d:row(rep2,'c13-3').detail});
 const rep3=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:2,Jupiter:6,Venus:1,Saturn:8}),0);
 ck('F4d asc0 (dhanesh Venus): honest not-applicable detail',row(rep3,'c13-3').served===false&&row(rep3,'c13-3').detail.includes('लागू नहीं'),{d:row(rep3,'c13-3').detail});
 ck('F4e note records unrestricted reading + vp divergence',row(rep,'c13-3').note.includes('unrestricted')&&row(rep,'c13-3').note.includes('विमत'));
}
// --- F5: c13-4 (three independent alternatives; no yuti; vacuous-shape regression)
{
 const repA=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:6,Venus:10,Saturn:2}),0);
 ck('F5a alt1: dhanesh in 11th serves WITHOUT any kendra clause',row(repA,'c13-4').served===true,{d:row(repA,'c13-4').detail});
 const repB=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:6,Venus:2,Saturn:1}),0);
 ck('F5b alt2: labhesh in 2nd serves',row(repB,'c13-4').served===true,{d:row(repB,'c13-4').detail});
 const repC=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:6,Venus:0,Saturn:9}),0);
 ck('F5c alt3: both lords separately in kendra/trikona (no yuti)',row(repC,'c13-4').served===true,{d:row(repC,'c13-4').detail});
 const m=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:6,Venus:2,Saturn:2}),0);
 ck('F5d negative: no alternative -> unserved',row(m,'c13-4').served===false,{d:row(m,'c13-4').detail});
 const repE=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:6,Venus:10,Saturn:1}),0);
 ck('F5e regression: placement-link serves where the old vacuous AND-shape failed',row(repE,'c13-4').served===true,{d:row(repE,'c13-4').detail});
 const d=row(repA,'c13-4').detail;
 ck('F5f detail shows all three alternatives separately',d.includes('विकल्प1')&&d.includes('विकल्प2')&&d.includes('विकल्प3'),{d});
 ck('F5g note discloses Santhanam strict-exchange + added join',row(repA,'c13-4').note.includes('strict-exchange')&&row(repA,'c13-4').note.includes('join'));
}
// --- F6: c13-5 (kendra dhanesh + sign-trine labhesh + cover semantics:
// BOTH lords genuinely covered by Jupiter/Venus, BOTH benefics
// participating, and NO benefic-lord identity - identity anywhere leaves
// the row unserved. Not per-cell bothxboth: that would vacate
// non-conjunction sign-trine geometries.)
{
 // identity negative: Venus IS dhanesh (asc 0); Jupiter genuinely covers both lords
 const rep=T.report(mk({Sun:5,Moon:3,Mars:9,Mercury:7,Jupiter:0,Venus:0,Saturn:4}),0);
 const r=row(rep,'c13-5');
 ck('F6a dhanesh-identity negative: unserved even though Jupiter covers both lords',r.served===false&&r.detail.includes('धनेश-संबंध: गुरु')&&r.detail.includes('लाभेश-संबंध: गुरु'),{d:r.detail});
 ck('F6b identity disclosed plainly in detail',r.detail.includes('शुक्र स्वयं धनेश है')&&r.detail.includes('तात्विकता संबंध नहीं'),{d:r.detail});
 const m=T.report(mk({Sun:5,Moon:3,Mars:9,Mercury:7,Jupiter:0,Venus:0,Saturn:5}),0);
 ck('F6c mutation: labhesh out of sign-trine -> unserved',row(m,'c13-5').served===false,{d:row(m,'c13-5').detail});
 const m2=T.report(mk({Sun:5,Moon:3,Mars:9,Mercury:7,Jupiter:0,Venus:2,Saturn:4}),0);
 ck('F6d mutation: dhanesh out of kendra -> unserved',row(m2,'c13-5').served===false);
 // participation mutation (asc 2, Gemini: dhanesh=Moon, labhesh=Mars; no identity):
 // Venus covers dhanesh by yuti; Jupiter at 9 relates to NEITHER lord
 const m3=T.report(mk({Sun:5,Moon:2,Mars:6,Mercury:9,Jupiter:9,Venus:2,Saturn:11}),2);
 const r3=row(m3,'c13-5');
 ck('F6e mutation: Jupiter participates nowhere -> unserved, coverage shown per lord',r3.served===false&&r3.detail.includes('धनेश-संबंध: शुक्र')&&r3.detail.includes('लाभेश-संबंध: कोई नहीं'),{d:r3.detail});
 // asc 1 (Taurus): dhanesh=Mercury, labhesh=Jupiter - Jupiter IS labhesh
 const rep2=T.report(mk({Sun:6,Moon:3,Mars:9,Mercury:1,Jupiter:5,Venus:11,Saturn:7}),1);
 const rf=row(rep2,'c13-5');
 ck('F6f labhesh-identity negative: unserved even with genuine dhanesh coverage',rf.served===false&&rf.detail.includes('गुरु स्वयं लाभेश है')&&rf.detail.includes('तात्विकता संबंध नहीं'),{d:rf.detail});
 const m4=T.report(mk({Sun:6,Moon:3,Mars:9,Mercury:1,Jupiter:5,Venus:10,Saturn:7}),1);
 ck('F6g mutation: Venus relates to neither lord -> unserved',row(m4,'c13-5').served===false,{d:row(m4,'c13-5').detail});
 ck('F6h note records cover semantics + dvandva + sign-trine + identity rule',r.note.includes('आवरण-पठन')&&r.note.includes('द्वंद्व')&&r.note.includes('±4/±8')&&r.note.includes('तात्विकता संबंध नहीं मानी जाती'));
 // asc 0 (Aries), second geometry: Venus dhanesh at bhava 4, Saturn labhesh at 7; Jupiter genuine on BOTH lords
 const r2=row(T.report(mk({Sun:5,Moon:2,Mars:9,Mercury:8,Jupiter:7,Venus:3,Saturn:7}),0),'c13-5');
 ck('F6i dhanesh-identity negative #2 (Jupiter genuine on both; only Venus-identity present)',r2.served===false&&r2.detail.includes('शुक्र स्वयं धनेश है'),{d:r2.detail});
 // asc 3 (Cancer): dhanesh=Sun at 6 (bhava 4 kendra), labhesh=Venus at 10 (sign-trine of 6); Jupiter genuine on BOTH
 const rj=row(T.report(mk({Sun:6,Moon:1,Mars:0,Mercury:2,Jupiter:10,Venus:10,Saturn:8}),3),'c13-5');
 ck('F6j labhesh-identity negative #2 (Venus IS labhesh; genuine relations absent)',rj.served===false&&rj.detail.includes('शुक्र स्वयं लाभेश है'),{d:rj.detail});
 // asc 2 (Gemini): dhanesh=Moon at 2, labhesh=Mars at 6 - no identity.
 // Jupiter at 2: yuti with Moon AND 5th-aspect on Mars at 6 -> covers BOTH lords.
 // Venus at 8: 7th-aspect on Moon at 2 -> participates via dhanesh.
 const rk=row(T.report(mk({Sun:5,Moon:2,Mars:6,Mercury:9,Jupiter:2,Venus:8,Saturn:11}),2),'c13-5');
 ck('F6k positive control: served, per-lord coverage shown (Jupiter covers both, Venus dhanesh)',rk.served===true&&rk.detail.includes('धनेश-संबंध: गुरु, शुक्र')&&rk.detail.includes('लाभेश-संबंध: गुरु')&&!rk.detail.includes('स्वयं'),{d:rk.detail});
 // P2 coverage-negative (asc 2): BOTH benefics touch ONLY dhanesh - labhesh uncovered
 const rp=row(T.report(mk({Sun:5,Moon:2,Mars:6,Mercury:9,Jupiter:8,Venus:2,Saturn:11}),2),'c13-5');
 ck('F6l coverage-negative: both benefics on dhanesh only, labhesh uncovered -> unserved',rp.served===false&&rp.detail.includes('धनेश-संबंध: गुरु, शुक्र')&&rp.detail.includes('लाभेश-संबंध: कोई नहीं'),{d:rp.detail});
 // split-cover positive (asc 2): Jupiter -> labhesh (yuti at 6), Venus -> dhanesh (7th from 8)
 const rs=row(T.report(mk({Sun:5,Moon:2,Mars:6,Mercury:9,Jupiter:6,Venus:8,Saturn:11}),2),'c13-5');
 ck('F6m split-cover positive: J->labhesh + V->dhanesh -> served',rs.served===true&&rs.detail.includes('धनेश-संबंध: गुरु, शुक्र')&&rs.detail.includes('लाभेश-संबंध: गुरु'),{d:rs.detail});
 // participation is independently required: Venus removed (neither lord), Jupiter still covers both
 const rn=row(T.report(mk({Sun:5,Moon:2,Mars:6,Mercury:9,Jupiter:6,Venus:10,Saturn:11}),2),'c13-5');
 ck('F6n Venus-participation required: covers both via Jupiter alone -> still unserved',rn.served===false&&rn.detail.includes('धनेश-संबंध: गुरु')&&rn.detail.includes('लाभेश-संबंध: गुरु'),{d:rn.detail});
}
// --- F7: c13-6 (both lords in the 6th, OR both malefic-joined/aspected)
{
 const rep=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:8,Jupiter:6,Venus:5,Saturn:5}),0);
 ck('F7a both lords in 6th -> served',row(rep,'c13-6').served===true,{d:row(rep,'c13-6').detail});
 const m=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:8,Jupiter:6,Venus:5,Saturn:4}),0);
 ck('F7b mutation: labhesh out of 6th, no afflictions -> unserved',row(m,'c13-6').served===false,{d:row(m,'c13-6').detail});
 const rep2=T.report(mk({Sun:3,Moon:0,Mars:1,Mercury:6,Jupiter:9,Venus:1,Saturn:3}),0);
 ck('F7c alt2: both lords malefic-yuti -> served',row(rep2,'c13-6').served===true,{d:row(rep2,'c13-6').detail});
 const m2=T.report(mk({Sun:4,Moon:0,Mars:1,Mercury:6,Jupiter:9,Venus:1,Saturn:3}),0);
 ck('F7d mutation: labhesh affliction removed -> unserved',row(m2,'c13-6').served===false,{d:row(m2,'c13-6').detail});
 const rep3=T.report(mk({Sun:9,Moon:2,Mars:7,Mercury:6,Jupiter:0,Venus:1,Saturn:3}),0);
 const r3=row(rep3,'c13-6');
 ck('F7e alt2 via malefic DRISHTI on both lords -> served',r3.served===true&&r3.detail.includes('-दृष्टि'),{d:r3.detail});
 const m3=T.report(mk({Sun:3,Moon:0,Mars:2,Mercury:6,Jupiter:9,Venus:1,Saturn:3},1),0);
 ck('F7f Rahu-yuti with dhanesh does NOT count as affliction',row(m3,'c13-6').served===false,{d:row(m3,'c13-6').detail});
 ck('F7g note records 6th-specific + disclosed alternatives',row(rep,'c13-6').note.includes('6ठा भाव विशिष्ट'));
}
// --- F8: c13-8 (both lords in dusthanas jointly/separately + Mars 11th + Rahu 2nd)
{
 const rep=T.report(mk({Sun:0,Moon:3,Mars:10,Mercury:8,Jupiter:6,Venus:5,Saturn:11},1),0);
 ck('F8a served (dhanesh 6th, labhesh 12th - separately; Mars 11th; Rahu 2nd)',row(rep,'c13-8').served===true,{d:row(rep,'c13-8').detail});
 const m=T.report(mk({Sun:0,Moon:3,Mars:9,Mercury:8,Jupiter:6,Venus:5,Saturn:11},1),0);
 ck('F8b mutation: Mars out of 11th -> unserved',row(m,'c13-8').served===false);
 const m2=T.report(mk({Sun:0,Moon:3,Mars:10,Mercury:8,Jupiter:6,Venus:5,Saturn:11},0),0);
 ck('F8c mutation: Rahu out of 2nd -> unserved',row(m2,'c13-8').served===false);
 const m3=T.report(mk({Sun:0,Moon:3,Mars:10,Mercury:8,Jupiter:6,Venus:1,Saturn:11},1),0);
 ck('F8d mutation: dhanesh out of dusthana -> unserved',row(m3,'c13-8').served===false);
 ck('F8e historical frame + jointly-or-separately in condition',row(rep,'c13-8').text.includes('ऐतिहासिक अभिप्राय')&&row(rep,'c13-8').condition.includes('संयुक्त या पृथक'));
}
// --- F9: c13-9 (Jupiter 11th, Venus 2nd, dhanesh benefic-joined, benefic OCCUPYING 12th)
{
 const rep=T.report(mk({Sun:8,Moon:1,Mars:6,Mercury:11,Jupiter:10,Venus:1,Saturn:3}),0);
 ck('F9a served (all four legs)',row(rep,'c13-9').served===true,{d:row(rep,'c13-9').detail});
 const m=T.report(mk({Sun:8,Moon:1,Mars:6,Mercury:11,Jupiter:9,Venus:1,Saturn:3}),0);
 ck('F9b mutation: Jupiter out of 11th -> unserved',row(m,'c13-9').served===false);
 const m2=T.report(mk({Sun:8,Moon:1,Mars:6,Mercury:2,Jupiter:10,Venus:1,Saturn:3}),0);
 const r2=row(m2,'c13-9');
 ck('F9c 12th benefic-LORD (Jupiter rules sign11) without benefic OCCUPANT -> unserved',r2.served===false&&r2.detail.includes('12वें में शुभ: कोई नहीं'),{d:r2.detail});
 ck('F9d activity-description note (no instruction)',row(rep,'c13-9').note.includes('क्रिया-निर्देश नहीं'));
}
// --- F10: c13-10 (dhanesh own or exalted)
{
 const rep=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:6,Venus:1,Saturn:10}),0);
 ck('F10a own-sign -> served, detail says स्व-राशि',row(rep,'c13-10').served===true&&row(rep,'c13-10').detail.includes('स्व-राशि'),{d:row(rep,'c13-10').detail});
 const rep2=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:6,Venus:11,Saturn:10}),0);
 ck('F10b exalted -> served, detail says उच्च',row(rep2,'c13-10').served===true&&row(rep2,'c13-10').detail.includes('उच्च'),{d:row(rep2,'c13-10').detail});
 const m=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:6,Venus:0,Saturn:10}),0);
 ck('F10c neutral -> unserved + honest detail',row(m,'c13-10').served===false&&row(m,'c13-10').detail.includes('न उच्च, न स्व-राशि'),{d:row(m,'c13-10').detail});
}
// --- F11: c13-13a (BOTH legs AND; two-leg transparency; conduct framing)
{
 const rep=T.report(mk({Sun:5,Moon:3,Mars:2,Mercury:8,Jupiter:9,Venus:2,Saturn:1}),0);
 const r=row(rep,'c13-13a');
 ck('F11a both legs -> served',r.served===true,{d:r.detail});
 ck('F11b detail shows both legs separately',r.detail.includes('अंग1')&&r.detail.includes('अंग2'),{d:r.detail});
 const m=T.report(mk({Sun:5,Moon:3,Mars:2,Mercury:8,Jupiter:9,Venus:2,Saturn:4}),0);
 ck('F11c leg1 only (dhanesh malefic-yuti, 2nd clean) -> unserved',row(m,'c13-13a').served===false,{d:row(m,'c13-13a').detail});
 const m2=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:2,Jupiter:9,Venus:2,Saturn:1}),0);
 ck('F11d leg2 only (2nd occupied, dhanesh clean) -> unserved',row(m2,'c13-13a').served===false,{d:row(m2,'c13-13a').detail});
 const m3=T.report(mk({Sun:5,Moon:3,Mars:7,Mercury:8,Jupiter:9,Venus:2,Saturn:4},1),0);
 ck('F11e Rahu in 2nd does NOT satisfy leg2',row(m3,'c13-13a').served===false,{d:row(m3,'c13-13a').detail});
 ck('F11f conduct framing + AND note',r.text.includes('ऐतिहासिक आचरण-कथन')&&r.note.includes('दोनों अंग'),{t:r.text});
 ck('F11g CONDUCT_NOTE shipped on report',rep.conductNote.includes('चरित्र-निर्णय'));
}
// --- F12: input validation
{
 let e1=null,e2=null,e3=null;
 try{T.report(mk({Sun:0,Moon:1,Mars:2,Mercury:3,Jupiter:4,Venus:5,Saturn:6}),12);}catch(e){e1=e;}
 try{T.report(mk({Sun:0,Moon:3,Mars:9,Mercury:6,Jupiter:7,Venus:3,Saturn:11}).slice(0,6),0);}catch(e){e2=e;}
 const bad3=mk({Sun:0,Moon:3,Mars:9,Mercury:6,Jupiter:7,Venus:3,Saturn:11});delete bad3[0].degreesInRashi;
 try{T.report(bad3,0);}catch(e){e3=e;}
 ck('F12a asc out of range rejected',!!e1);
 ck('F12b missing graha rejected',!!e2);
 ck('F12c missing degreesInRashi rejected (3.11 machinery needs it)',!!e3);
}
// --- F13: real chart smoke (astro-core; Patna) - rows build, non-vacuous, scan clean
{
 const vm=require('vm');const c={Date};vm.createContext(c);
 vm.runInContext(fs.readFileSync(__dirname+'/../astro-core.js','utf8'),c);const A=c.BrahmAstro;
 function civilUTC(date,time,tz){const base=Date.parse(date+'T'+time+':00Z');let t=base;for(let i=0;i<4;i++){const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(t).map(x=>[x.type,x.value]));t+=base-Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);}return new Date(t)}
 const l={latitude:25.5941,longitude:85.1376,timeZone:'Asia/Kolkata'};
 const birth=civilUTC('1990-06-15','10:30','Asia/Kolkata');
 const ps=A.grahaPositions(birth),lagna=A.siderealLagna(birth,l);
 const rep=T.report(ps.map(x=>({graha:x.graha,rashi:x.rashi,degreesInRashi:x.degreesInRashi})),Math.floor(lagna/30));
 ck('F13a real chart 1 (1990-06-15): 11 rows build',rep.rows.length===11);
 const s1=rep.rows.filter(r=>r.served);
 ck('F13b real chart 1 non-vacuous (some served, some not; details factual)',s1.length>0&&s1.length<11&&rep.rows.every(r=>typeof r.detail==='string'&&r.detail.length>0),{served:s1.map(r=>r.id)});
 const birth2=civilUTC('1985-03-10','08:15','Asia/Kolkata');
 const ps2=A.grahaPositions(birth2),lagna2=A.siderealLagna(birth2,l);
 const rep2=T.report(ps2.map(x=>({graha:x.graha,rashi:x.rashi,degreesInRashi:x.degreesInRashi})),Math.floor(lagna2/30));
 const s2=rep2.rows.filter(r=>r.served);
 ck('F13c real chart 2 (1985-03-10) non-vacuous',s2.length>0&&s2.length<11,{served:s2.map(r=>r.id)});
 const leaks=[];for(const r of [...s1,...s2])for(const w of ['रोग','दीर्घ','आयु','व्रण','यमल','मृत्यु','उपाय','मंत्र','रत्न','निष्क'])if((r.text+r.detail+(r.transparency||'')+(r.note||'')).includes(w))leaks.push([r.id,w]);
 ck('F13d omission scan clean on served rows (both charts)',leaks.length===0,leaks);
 ck('F13e report notices present',rep.omitNotice.includes('2 खंड')&&rep.breadthNotice.includes('सम्बोधन')&&rep.unmodeledNotice.includes('3 पंक्तियाँ'),{o:rep.omitNotice});
}
// --- F14: UI checks on the ACTUAL dhanaphalPanel body ------------------------------
{
 const source=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
 const start=source.indexOf('function dhanaphalPanel(){'),end=source.indexOf('const tabs=');
 ck('F14a dhanaphalPanel body sliceable',start>0&&end>start);
 const body=source.slice(start,end);
 const esc=s=>String(s).replace(/[&<>"']/g,c=>' ');
 const run=(psx,asc)=>{const f=new Function('window','ps','ls','esc','panel','pending',body+';return dhanaphalPanel();');
  return f({BrahmDhanaPhal:T},psx,asc,esc,(t,s)=>s,(t,s)=>'PENDING['+t+'] '+s);};
 const psx=mk({Sun:5,Moon:3,Mars:2,Mercury:8,Jupiter:9,Venus:2,Saturn:1},10);
 const html=run(psx,0);
 ck('F14b panel renders (not pending)',!html.startsWith('PENDING'),html.slice(0,80));
 ck('F14c header verbatim',html.includes(T.HEADER));
 ck('F14d omit/breadth/unmodeled notices verbatim',html.includes(T.OMIT_NOTICE)&&html.includes(T.BREADTH_NOTICE)&&html.includes(T.UNMODELED_NOTICE));
 ck('F14e 11 row cards',(html.match(/<details>/g)||[]).length===11);
 ck('F14f served row shows tradition text',html.includes('पिशुनता और असत्य-वचन की चर्चा'));
 ck('F14g unserved row hides tradition text',html.includes('पूरी नहीं बनी; परंपरा-कथन नहीं दिखाया गया'));
 ck('F14h two-leg detail rendered (C1 transparency)',html.includes('अंग1')&&html.includes('अंग2'));
 ck('F14i row note rendered (13.4 disclosure)',html.includes('strict-exchange'));
 ck('F14j nodes+conduct notes rendered',html.includes('राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल')&&html.includes('चरित्र-निर्णय'));
 ck('F14k pane-report wiring (appended after karmaphalPanel; prior substrings intact)',source.includes('labhaPanel()+karmaphalPanel()+dhanaphalPanel()'));
 ck('F14l module absent -> honest pending',(()=>{const f=new Function('window','ps','ls','esc','panel','pending',body+';return dhanaphalPanel();');
  return f({},psx,0,esc,(t,s)=>s,(t,s)=>'PENDING '+s);})().startsWith('PENDING'));
 ck('F14m kundli.html loads module',fs.readFileSync(__dirname+'/../kundli.html','utf8').includes('kundli-dhanaphal.js'));
 const banned=['रोग','दीर्घ','आयु','व्रण','यमल','नाल','त्रिमाता','मृत्यु','मारक','उपाय','मंत्र','रत्न','निष्क'];
 const uiLits=[...body.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(m=>m[1])
  .concat([...body.matchAll(/`((?:[^`\\]|\\.)*)`/gs)].map(m=>m[1]));
 const uiLeaks=uiLits.flatMap(t=>banned.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,40),w})));
 ck('F14n dhanaphalPanel body literals clean (single-quote + backtick)',uiLeaks.length===0,{n:uiLits.length,uiLeaks});
}
// --- F15: EXALT pinned for ALL seven grahas via c13-10 detail + byte-sync assertion
{
 const BP=require('../kundli-bhavaphal.js');
 const modN=(x,n)=>((x%n)+n)%n;
 for(const g of SEVENG){
  const s=BP.SIGN_LORD.findIndex(l=>l===g); // a sign this graha rules
  const asc=modN(s-1,12); // make that sign the 2nd bhava -> g becomes dhanesh
  const own=BP.SIGN_LORD.findIndex((l,i)=>l===g&&i!==T_EXALT[g]);
  const neutral=[...Array(12).keys()].find(x=>x!==T_EXALT[g]&&BP.SIGN_LORD[x]!==g&&x!==modN(T_EXALT[g]+6,12));
  const chart=target=>{const map={};for(const o of SEVENG)map[o]=neutral;map[g]=target;return mk(map);};
  const dE=row(T.report(chart(T_EXALT[g]),asc),'c13-10').detail;
  ck('F15-ex-'+g+' exalted dhanesh detail says उच्च',dE.includes('(उच्च'),{g,asc,dE});
  const dO=row(T.report(chart(own),asc),'c13-10').detail;
  ck('F15-own-'+g+' own-sign dhanesh detail says स्व-राशि',dO.includes('स्व-राशि'),{g,asc,dO});
  const dN=row(T.report(chart(neutral),asc),'c13-10').detail;
  ck('F15-ctl-'+g+' neutral-sign dhanesh: no dignity claimed',dN.includes('न उच्च, न स्व-राशि'),{g,dN});
 }
 const modSrc=fs.readFileSync(__dirname+'/../kundli-dhanaphal.js','utf8');
 const engSrc=fs.readFileSync(__dirname+'/../kundli-engine.js','utf8');
 const exL=(modSrc.match(/const EXALT=\{[^}]*\}/)||[])[0];
 const exE=(engSrc.match(/const EXALT=\{[^}]*\}/)||[])[0];
 ck('F15x duplicated EXALT literal byte-identical to kundli-engine.js',!!exL&&exL===exE,{exL,exE});
}
// --- F17: hardened omission/workflow scans on module + panel (ported from the
// ch21 F17 family). Quote-aware literal extraction; NO destructive comment
// stripping - a comment marker inside a template literal is literal text and
// stays visible. Module code has no regex literals and no double-quoted strings.
{
 const banned=['रोग','व्याधि','दीर्घ','आयु','व्रण','यमल','मृत्यु','मारक','उपाय','मंत्र','रत्न','निष्क'];
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
 ck('F17a no banned wording in any served text/detail/transparency/note',leaks.length===0,leaks);
 const tsrcRaw=fs.readFileSync(__dirname+'/../kundli-dhanaphal.js','utf8');
 const uiRaw=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
 const pStart=uiRaw.indexOf('function dhanaphalPanel(){'),pEnd=uiRaw.indexOf('const tabs=');
 ck('F17p dhanaphalPanel body sliceable',pStart>0&&pEnd>pStart);
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
 ck('F17b module literal scan (quote-aware): no banned wording',srcLeaks.length===0,{n:lits.length,srcLeaks});
 ck('F17bP panel literal scan (quote-aware): no banned wording',pLeaks.length===0,{n:pLits.length,pLeaks});
 const rawHits=banned.filter(w=>tsrcRaw.includes(w)),rawPHits=banned.filter(w=>panelRaw.includes(w));
 ck('F17b2 module raw-source scan: no banned token ANYWHERE',rawHits.length===0,rawHits);
 ck('F17b2P panel raw-slice scan: no banned token ANYWHERE',rawPHits.length===0,rawPHits);
 const tam1=tsrcRaw.replace('या केन्द्र/त्रिकोण में','या केन्द्र/त्रिकोण /* उपाय */ में'); // comment marker INSIDE a backtick template chunk
 const tam2=tsrcRaw.replace('या केन्द्र/त्रिकोण में','या केन्द्र/त्रिकोण उपाय में'); // plain backtick injection
 ck('F17b3 mutation caught: /* उपाय */ inside a module backtick template',tam1!==tsrcRaw&&banned.some(w=>tam1.includes(w))&&extractLiterals(tam1).some(t=>t.includes('उपाय')));
 ck('F17b4 mutation caught: plain module backtick injection',tam2!==tsrcRaw&&extractLiterals(tam2).some(t=>t.includes('उपाय')));
 const tam3=panelRaw.replace('<div class="suite-yogas">','<div class="suite-yogas">/* उपाय */'); // marker inside the panel backtick template
 const tam4=panelRaw.replace('<div class="suite-yogas">','<div class="suite-yogas">उपाय');
 ck('F17b5 mutation caught: /* उपाय */ inside the panel template',tam3!==panelRaw&&extractLiterals(tam3).some(t=>t.includes('उपाय')));
 ck('F17b6 mutation caught: plain panel template injection',tam4!==panelRaw&&extractLiterals(tam4).some(t=>t.includes('उपाय')));
 ck('F17c backtick templates actually covered by the module scan',lits.some(t=>t.includes('धनेश (')),{n:lits.length});
 ck('F17cP panel template chunks actually covered',pLits.some(t=>t.includes('suite-yogas')),{n:pLits.length});
 const workflow=['G1','G2','G3','G4','G5','G6','G7','G8','G9','SF1','SF2','SF3','M1','M2','M3','gate','GATE','reviewer','breadth','ledger','cache','स्कैन'];
 const wfLeaks=lits.concat(pLits).flatMap(t=>workflow.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,50),w})));
 ck('F17c2 no review-workflow/scan-machinery tokens in module or panel literals',wfLeaks.length===0,wfLeaks);
 const all=T.report(charts[0],0);
 ck('F17d omitN is 2 (13.12b, 13.13b disease-class)',all.omitN===2,{omitN:all.omitN});
 ck('F17e omit/breadth/unmodeled notices present and category-explicit',all.omitNotice.includes('2 खंड')&&all.omitNotice.includes('स्वास्थ्य-विषयक')&&all.breadthNotice.includes('सम्बोधन')&&all.breadthNotice.includes('13.1')&&all.unmodeledNotice.includes('3 पंक्तियाँ')&&all.unmodeledNotice.includes('13.12'));
 ck('F17f nodes-note + conduct-note present',all.nodesNote.includes('अमॉडल')&&all.conductNote.includes('चरित्र-निर्णय')&&all.conductNote.includes('नैतिक'));
 ck('F17g exactly 11 rows',all.rows.length===11,{n:all.rows.length});
 ck('F17h header states no-prediction framing',all.header.includes('भविष्यकथन या निश्चय नहीं'));
 ck('F17i polarity counts favourable/adverse/mixed/neutral = 5/4/1/1',all.rows.filter(r=>r.polarity==='अनुकूल').length===5&&all.rows.filter(r=>r.polarity==='प्रतिकूल').length===4&&all.rows.filter(r=>r.polarity==='अनुकूल/प्रतिकूल').length===1&&all.rows.filter(r=>r.polarity==='तटस्थ-वर्णन').length===1);
 ck('F17j unserved rows absent from checklist (not silently listed)',!all.rows.some(r=>['c13-7','c13-11','c13-12a'].includes(r.id)));
}
console.log(`\ndhanaphal: ${pass} pass, ${fail} fail`);
if(bad.length)console.log('FAILED:',bad.join(', '));
process.exitCode=fail?1:0;
