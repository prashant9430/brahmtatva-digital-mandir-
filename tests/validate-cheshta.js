// Cheshta (Mars-Saturn) module checks. Run: node tests/validate-cheshta.js
// Fixtures: harness/cheshta-refs.json (cheshta-research-fixture-c582db41,
// superseding transcription) + harness/simon-mean-elements.json (8c3e507b).
// Provenance labels kept exact: polynomial reproductions are NON-INDEPENDENT (same
// coefficients, consistency only); Raman 1918 rows are published rounded inputs,
// bound derived in the fixture header (0.008334 virupa). No universal tolerances.
'use strict';
const fs=require('fs'),path=require('path');
const B=require('../kundli-bala.js');
const J=require('../kundli-engine.js');
const CFX=JSON.parse(fs.readFileSync(path.join(__dirname,'..','harness','cheshta-refs.json'),'utf8'));
const SFX=JSON.parse(fs.readFileSync(path.join(__dirname,'..','harness','simon-mean-elements.json'),'utf8'));
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}
const near=(a,b,e)=>Math.abs(a-b)<=(e??1e-9);

// --- 1. Polynomial reproductions (labeled non-independent: same coefficients)
{
 ck('simon coefficients identical to superseding transcription fixture',JSON.stringify(B.SIMON_LAMBDA)===JSON.stringify(SFX.lambda_coefficients),{ours:B.SIMON_LAMBDA,fixture:SFX.lambda_coefficients});
 const errs=[];
 for(const [jd,planets] of Object.entries(CFX.modern_polynomial_reproductions_not_independent_goldens))
  for(const [p,v] of Object.entries(planets)){const got=B.meanLambda(p,Number(jd));if(!near(got,v,1e-9))errs.push([jd,p,got,v]);}
 ck('polynomial reproductions (NON-INDEPENDENT, consistency only)',errs.length===0,errs);
}
// --- 2. Raman 1918 published rounded inputs -> printed 2dp (bound 0.008334 from fixture header)
{
 const errs=[];
 for(const r of CFX.cheshta_inputs_from_published_columns){
  const got=B.cheshtaFromComponents(r.mean,r.true,r.sheeghrochcha);
  if(!near(got,r.computed,1e-9)||Math.abs(got-r.printed)>0.008334)errs.push([r.planet,got,r.printed]);}
 ck('Raman 1918 published-input rows (bound 0.008334)',errs.length===0,errs);
 ck('named typo exclusion: Saturn sheeghrochcha = meanSun 181.2275, not p77 misprint 151.23',
  CFX.printed_typo.includes('151.23')&&CFX.cheshta_inputs_from_published_columns.find(r=>r.planet==='Saturn').sheeghrochcha===181.2275);
}
// --- 3. Wrap regressions (fixtures)
{
 const errs=[];
 for(const w of CFX.wrap_regression){const got=B.cheshtaFromComponents(w.mean,w.true,w.apogee);if(!near(got,w.expected,1e-9))errs.push([w,got]);}
 ck('wrap regressions at 0/360 seam',errs.length===0,errs);
}
// --- 4. Rotation invariance: adding 360k to every input changes nothing (seeded LCG)
{
 let s=123456789;const rnd=()=>{s=(1103515245*s+12345)%2147483648;return s/2147483648;};
 const errs=[];
 for(let i=0;i<1000;i++){
  const m=rnd()*360,t=rnd()*360,a=rnd()*360,k=1+Math.floor(rnd()*5);
  const v0=B.cheshtaFromComponents(m,t,a),v1=B.cheshtaFromComponents(m+360*k,t+360*k,a+360*k);
  if(!near(v0,v1,1e-9))errs.push([m,t,a,v0,v1]);}
 ck('rotation invariance 1000x (angle-lifted midpoint)',errs.length===0,errs);
}
// --- 5. cheshtaBalaTara: sheeghrochcha mapping + guard
{
 const jd=2451545.0;
 const meanSun=(B.meanLambda('Earth',jd)+180)%360;
 // Mars at true==mean -> midpoint=mean; kendra=|mean-meanSun|
 const expectMars=Math.abs(((B.meanLambda('Mars',jd)-meanSun+540)%360)-180)/3;
 ck('Mars mapping: own-lambda mean, meanSun apogee',near(B.cheshtaBalaTara('Mars',(B.meanLambda('Mars',jd)-0)%360,0,jd),expectMars,1e-9));
 // Mercury at true==meanSun -> midpoint=meanSun; kendra=|meanSun-ownLambda|/3
 const expectMerc=Math.abs(((meanSun-B.meanLambda('Mercury',jd)+540)%360)-180)/3;
 ck('Mercury mapping: meanSun mean, own-lambda apogee',near(B.cheshtaBalaTara('Mercury',meanSun,0,jd),expectMerc,1e-9));
 ck('frame convention: true = sidereal + meanAyanamsha',near(B.cheshtaBalaTara('Mars',100,23.85,jd),B.cheshtaFromComponents(B.meanLambda('Mars',jd),(100+23.85)%360,meanSun),1e-9));
 ck('Sun/Moon return null (27.18 path)',B.cheshtaBalaTara('Sun',0,0,jd)===null&&B.cheshtaBalaTara('Moon',0,0,jd)===null);
 ck('guard 1899 -> null (unavailable, not zero)',B.cheshtaBalaTara('Mars',100,0,B.CHESHTA_GUARD_JD_MIN-1)===null);
 ck('guard 2101 -> null',B.cheshtaBalaTara('Mars',100,0,B.CHESHTA_GUARD_JD_MAX+1)===null);
 ck('guard missing jdTt -> null',B.cheshtaBalaTara('Mars',100,0,null)===null);
 ck('guard boundaries: MIN inclusive computes, MAX exclusive null',typeof B.cheshtaBalaTara('Mars',100,0,B.CHESHTA_GUARD_JD_MIN)==='number'&&B.cheshtaBalaTara('Mars',100,0,B.CHESHTA_GUARD_JD_MAX)===null);
}
// --- 6. compute() integration: COHERENT identity (F1: 2000-01-01 12:00 IST Delhi =
// 2000-01-01T06:30:00Z; jdTt pinned from the probe row in harness/mc-oracle.json)
{
 const JD_TT_F1=2451544.7715723016; // 2451545 + probe tt -0.228427698185655, 2000-01-01T06:30:00Z
 const base={positions:['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].map((g,i)=>({graha:g,longitude:[256.2879,196.7119,303.9406,247.6923,1.3916,217.4435,16.546][i]})),
  lagna:343.1891,birthMs:Date.UTC(2000,0,1,6,30),weekday:6,sunriseMs:Date.UTC(2000,0,1,1,44),
  sunsetMs:Date.UTC(1999,11,31,12,13),nextSunriseMs:Date.UTC(2000,0,2,1,45),transitMs:Date.UTC(2000,0,1,7,1),ayanamsa:23.853,varga:J.varga};
 const no=B.compute(base);
 ck('no cheshtaCtx: Ma-Sa cheshta null, unmodeled lists cheshta-ma-sa',
  no.planets.filter(p=>!['Sun','Moon'].includes(p.graha)).every(p=>p.cheshta===null)&&no.unmodeled.some(u=>u.id==='cheshta-ma-sa'));
 const yes=B.compute({...base,cheshtaCtx:{jdTt:JD_TT_F1,meanAyanamsha:23.853,birthMs:Date.UTC(2000,0,1,6,30)}});
 const mars=yes.planets.find(p=>p.graha==='Mars');
 ck('with cheshtaCtx: Ma-Sa cheshta computed and matches direct call at the SAME jdTt (identity)',
  typeof mars.cheshta==='number'&&near(mars.cheshta,B.cheshtaBalaTara('Mars',base.positions[2].longitude,23.853,JD_TT_F1),1e-9));
 ck('with cheshtaCtx: unmodeled drops cheshta-ma-sa, yuddha stays',!yes.unmodeled.some(u=>u.id==='cheshta-ma-sa')&&yes.unmodeled.some(u=>u.id==='yuddha'));
 ck('with cheshtaCtx: note still forbids totals/ratios',/not a full Shadbala total/.test(yes.note)&&/no ratio/.test(yes.note));
 ck('with cheshtaCtx: convention string names Simon 1994 + guard',yes.conventions.some(c=>/Simon 1994/.test(c)&&/1900-2100/.test(c)));
 ck('partialSum includes cheshta when computed',near(mars.partialSum,mars.sthana.total+mars.dig+mars.kala.total+mars.cheshta+mars.naisargika,1e-9));
 ck('partialOnly flag remains true',yes.partialOnly===true);
 // availability semantics: an OBJECT is not availability - out-of-guard or
 // non-finite contexts leave the unmodeled note and produce no numeric cheshta.
 const outGuard=B.compute({...base,cheshtaCtx:{jdTt:B.CHESHTA_GUARD_JD_MAX+10,meanAyanamsha:23.853,birthMs:Date.UTC(2000,0,1,6,30)}});
 ck('ctx out of guard: cheshta null, unmodeled retains cheshta-ma-sa',
  outGuard.planets.filter(p=>!['Sun','Moon'].includes(p.graha)).every(p=>p.cheshta===null)&&outGuard.unmodeled.some(u=>u.id==='cheshta-ma-sa'));
 const nanCtx=B.compute({...base,cheshtaCtx:{jdTt:NaN,meanAyanamsha:23.853,birthMs:Date.UTC(2000,0,1,6,30)}});
 ck('ctx NaN jdTt: cheshta null, unmodeled retains, partialSum finite',
  nanCtx.planets.every(p=>p.cheshta===null||['Sun','Moon'].includes(p.graha))&&nanCtx.unmodeled.some(u=>u.id==='cheshta-ma-sa')&&nanCtx.planets.every(p=>Number.isFinite(p.partialSum)));
 const nanAy=B.compute({...base,cheshtaCtx:{jdTt:JD_TT_F1,meanAyanamsha:NaN,birthMs:Date.UTC(2000,0,1,6,30)}});
 ck('ctx NaN meanAyanamsha: same unavailability behavior',
  nanAy.planets.filter(p=>!['Sun','Moon'].includes(p.graha)).every(p=>p.cheshta===null)&&nanAy.unmodeled.some(u=>u.id==='cheshta-ma-sa')&&nanAy.planets.every(p=>Number.isFinite(p.partialSum)));
}
// --- 6b. same-instant assembly contract (reproduction case: birth 2000 + 2100 JD
// succeeded and dropped the missing note -> now a contract violation)
{
 const base={positions:['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].map((g,i)=>({graha:g,longitude:[256.2879,196.7119,303.9406,247.6923,1.3916,217.4435,16.546][i]})),
  lagna:343.1891,birthMs:Date.UTC(2000,0,1,6,30),weekday:6,sunriseMs:Date.UTC(2000,0,1,1,44),
  sunsetMs:Date.UTC(1999,11,31,12,13),nextSunriseMs:Date.UTC(2000,0,2,1,45),transitMs:Date.UTC(2000,0,1,7,1),ayanamsa:23.853,varga:J.varga};
 const JD_TT_F1=2451544.7715723016;
 const attempt=ctx=>{try{B.compute({...base,cheshtaCtx:ctx});return 'computed';}catch(e){return 'thrown';}};
 ck('ctx missing birthMs token -> throws',attempt({jdTt:JD_TT_F1,meanAyanamsha:23.853})==='thrown');
 ck('ctx mismatched birthMs -> throws',attempt({jdTt:JD_TT_F1,meanAyanamsha:23.853,birthMs:Date.UTC(2000,0,2,6,30)})==='thrown');
 ck('ctx NaN birthMs -> throws',attempt({jdTt:JD_TT_F1,meanAyanamsha:23.853,birthMs:NaN})==='thrown');
 ck('ctx matching birthMs -> computes',attempt({jdTt:JD_TT_F1,meanAyanamsha:23.853,birthMs:Date.UTC(2000,0,1,6,30)})==='computed');
 // out-of-guard / non-finite ctx are UNAVAILABILITY (no throw, note retained), distinct from contract violations
 const outGuard=B.compute({...base,cheshtaCtx:{jdTt:B.CHESHTA_GUARD_JD_MAX+10,meanAyanamsha:23.853}}); // no token needed: not usable anyway
 ck('out-of-guard without token: unavailability, no throw',outGuard.unmodeled.some(u=>u.id==='cheshta-ma-sa'));
}
// --- 7. guard endpoints: inclusive UTC years 1900..2100 on exact TT boundaries
{
 ck('start: 1899-12-31T23:59:59Z TT (2415020.4999564933) -> null',B.cheshtaBalaTara('Mars',100,0,2415020.4999564933)===null);
 ck('start: 1900-01-01T00:00:00Z TT (2415020.4999680677) -> computed',typeof B.cheshtaBalaTara('Mars',100,0,2415020.4999680677)==='number');
 ck('mid-2100 computes (range not truncated at 2100-01-01)',typeof B.cheshtaBalaTara('Mars',100,0,2488220.5)==='number');
 ck('end: 2100-12-31T23:59:59Z TT -> computed',typeof B.cheshtaBalaTara('Mars',100,0,2488434.5023612007)==='number');
 ck('end-ms: 2100-12-31T23:59:59.999Z TT (2488434.502372763) -> computed',typeof B.cheshtaBalaTara('Mars',100,0,2488434.502372763)==='number');
 ck('beyond: 2101-01-01T00:00:00Z TT (2488434.502372775, EXCLUSIVE MAX) -> null',B.cheshtaBalaTara('Mars',100,0,2488434.502372775)===null);
 ck('beyond-ms: 2101-01-01T00:00:00.001Z TT -> null',B.cheshtaBalaTara('Mars',100,0,2488434.502372787)===null);
 ck('NaN jdTt -> null (NaN never passes)',B.cheshtaBalaTara('Mars',100,0,NaN)===null);
 ck('NaN meanAyanamsha -> null',B.cheshtaBalaTara('Mars',100,NaN,2451545)===null);
 ck('NaN true longitude -> null',B.cheshtaBalaTara('Mars',NaN,0,2451545)===null);
 ck('endpoint constants match the named policy (MIN inclusive, MAX exclusive)',B.CHESHTA_GUARD_JD_MIN===2415020.4999680677&&B.CHESHTA_GUARD_JD_MAX===2488434.502372775);
}
console.log(`\n${pass} pass, ${fail} fail${bad.length?': '+bad.join(', '):''}`);
process.exit(fail?1:0);
