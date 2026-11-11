// Bala (BPHS ch27 + ch26 drishti) module checks. Run: node tests/validate-bala.js
// Fixture provenance: docs/bala-ledger-draft.md worked example F1 (reviewer-verified 12:00),
// shadbala_spec_checks F1/F2/F3 (reviewer spec), Raman Standard Horoscope Kala decomposition.
// Tolerances: only representational rounding bounds, each derived at the assertion (2dp
// fixtures -> 0.0051; Raman dig printed rows -> 0.008 from minute-rounded powerless
// points + 2dp print, section 18d). No formula tolerances, no universal allowances.
'use strict';
const vm=require('vm'),fs=require('fs'),path=require('path');
const B=require('../kundli-bala.js');
const J=require('../kundli-engine.js');
const c={Date};vm.createContext(c);
vm.runInContext(fs.readFileSync(path.join(__dirname,'..','astro-core.js'),'utf8'),c);
const A=c.BrahmAstro;
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}
const near=(a,b,e)=>Math.abs(a-b)<=(e??1e-9);
const PLANETS=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const P=(graha,longitude)=>({graha,rashi:Math.floor(longitude/30),longitude});
const H=3600000;

// F1/F2/F3 reviewer fixtures (shadbala_spec_checks-82810eb0.json, embedded)
const SPEC={
 F1:{lon:[256.2879,196.7119,303.9406,247.6923,1.3916,217.4435,16.546],asc:343.1891,
     dig:[58.97,18.83,43.08,28.17,53.93,11.92,11.12],
     uchcha:[22.10,5.43,58.02,32.44,28.80,13.48,1.15],
     kendradi:[60,30,15,60,30,15,30],drekkana:[0,0,15,0,15,0,15],ojhaRasi:[15,0,15,15,15,15,15]},
 F2:{lon:[60.4172,23.758,70.21,69.6382,293.1436,14.6908,209.0701],asc:82.2127,
     dig:[37.27,10.52,34.0,55.81,10.31,7.49,42.29]},
 F3:{lon:[196.1219,184.3814,69.0399,180.7197,353.5598,149.6272,99.3164],asc:83.3972,
     dig:[7.57,56.34,34.79,27.56,30.05,52.08,5.31]}};
const NAIS=[60,51.42857142857143,17.142857142857142,25.714285714285715,34.285714285714285,42.857142857142854,8.571428571428571];

// --- 1. Uchcha (27.1-2): synthetic extremes + F1 fixture
{
 ck('uchcha at deep-fall = 0',near(B.uchchaBala(190,'Sun'),0));
 ck('uchcha at exaltation = 60',near(B.uchchaBala(10,'Sun'),60));
 ck('uchcha fold at 90 deg = 30',near(B.uchchaBala(280,'Sun'),30));
 const f=SPEC.F1,errs=[];
 PLANETS.forEach((p,i)=>{const v=B.uchchaBala(f.lon[i],p);if(!near(v,f.uchcha[i],0.0051))errs.push([p,v,f.uchcha[i]]);});
 ck('uchcha F1 fixture (2dp rounding bound)',errs.length===0,errs);
}
// --- 2. Dig (27.7-7.5): synthetic + F1/F2/F3 spec fixtures
{
 ck('dig at powerless cusp = 0',near(B.digBala(90,0,'Sun'),0)); // Sun weak 4H: cusp=asc+90
 ck('dig opposite powerless = 60',near(B.digBala(270,0,'Sun'),60));
 const errs=[];
 for(const k of ['F1','F2','F3']){const f=SPEC[k];
  PLANETS.forEach((p,i)=>{const v=B.digBala(f.lon[i],f.asc,p);if(!near(v,f.dig[i],0.0051))errs.push([k,p,v,f.dig[i]]);});}
 ck('dig F1/F2/F3 spec fixtures (2dp rounding bound)',errs.length===0,errs);
 // PyJHora oracle cells where equal-house convention aligns (ledger: Me/Ju F1, Ju/Sa F2, Me/Ju/Sa F3)
 const ORA={F1:{Mercury:28.17,Jupiter:53.93},F2:{Jupiter:10.31,Saturn:42.29},F3:{Mercury:27.56,Jupiter:30.05,Saturn:5.31}};
 const oerrs=[];
 // Reviewer 12:34: 0.06 was a mislabeled observed residual, withdrawn. Compare oracle cells at
 // the 2dp representational bound; any cell beyond it is excluded BY NAME (listed here) as a
 // suspected oracle-convention divergence, never covered by a blanket allowance.
 const DIG_ORACLE_EXCLUDED=[]; // [fixture, planet] cells excluded with reason recorded in refs
 for(const k of ['F1','F2','F3'])for(const[p,v0]of Object.entries(ORA[k])){const v=B.digBala(SPEC[k].lon[PLANETS.indexOf(p)],SPEC[k].asc,p);if(!near(v,v0,0.0051)&&!DIG_ORACLE_EXCLUDED.some(e=>e[0]===k&&e[1]===p))oerrs.push([k,p,v,v0]);}
 ck('dig PyJHora oracle aligned cells (2dp bound, named exclusions only)',oerrs.length===0,oerrs);
}
// --- 3. Naisargika (27.14)
PLANETS.forEach((p,i)=>ck('naisargika '+p,near(B.naisargikaBala(p),NAIS[i])));
// --- 4. Kendradi (27.5): whole-sign 60/30/15 + F1 fixture
{
 const asc=0; // Aries lagna
 ck('kendradi 1st=60',B.kendradiBala(15,asc)===60);
 ck('kendradi 2nd=30',B.kendradiBala(45,asc)===30);
 ck('kendradi 3rd=15',B.kendradiBala(75,asc)===15);
 ck('kendradi 10th=60',B.kendradiBala(285,asc)===60);
 ck('kendradi 12th=15',B.kendradiBala(345,asc)===15);
 const f=SPEC.F1,errs=[];
 PLANETS.forEach((p,i)=>{const v=B.kendradiBala(f.lon[i],f.asc);if(v!==f.kendradi[i])errs.push([p,v,f.kendradi[i]]);});
 ck('kendradi F1 fixture',errs.length===0,errs);
}
// --- 5. Ojha-yugma rasi + navamsa (27.4.5) + F1 rasi fixture
{
 const vf=(lon,n)=>J.varga(lon,n);
 ck('ojha Moon even rasi = 15',B.ojhaYugmaRasi(45,'Moon')===15);   // Taurus
 ck('ojha Moon odd rasi = 0',B.ojhaYugmaRasi(15,'Moon')===0);
 ck('ojha Sun odd rasi = 15',B.ojhaYugmaRasi(15,'Sun')===15);
 ck('ojha Sun even rasi = 0',B.ojhaYugmaRasi(45,'Sun')===0);
 ck('ojha navamsa Venus in even navamsa = 15',B.ojhaYugmaNavamsa(31,'Venus',vf)===15); // navamsa of 1 deg Taurus -> Virgo(5)
 ck('ojha navamsa Sun odd navamsa = 15',B.ojhaYugmaNavamsa(1,'Sun',vf)===15); // navamsa Aries
 const f=SPEC.F1,errs=[];
 PLANETS.forEach((p,i)=>{const v=B.ojhaYugmaRasi(f.lon[i],p);if(v!==f.ojhaRasi[i])errs.push([p,v,f.ojhaRasi[i]]);});
 ck('ojha-rasi F1 fixture',errs.length===0,errs);
}
// --- 6. Drekkana (27.6, neuter-middle ruling) + F1 regression (12:00 fix Mo 0, Sa 15)
{
 ck('drekkana male 1st = 15',B.drekkanaBala(5,'Sun')===15);
 ck('drekkana male 2nd = 0',B.drekkanaBala(15,'Sun')===0);
 ck('drekkana neuter 2nd = 15',B.drekkanaBala(15,'Mercury')===15);
 ck('drekkana neuter 1st = 0',B.drekkanaBala(5,'Saturn')===0);
 ck('drekkana female 3rd = 15',B.drekkanaBala(25,'Venus')===15);
 ck('drekkana female 2nd = 0',B.drekkanaBala(15,'Moon')===0);
 const f=SPEC.F1,errs=[];
 PLANETS.forEach((p,i)=>{const v=B.drekkanaBala(f.lon[i],p);if(v!==f.drekkana[i])errs.push([p,v,f.drekkana[i]]);});
 ck('drekkana F1 fixture (Mo 0, Sa 15 fix)',errs.length===0,errs);
}
// --- 7. Paksha (27.10-11): exact from F1 longitudes; Mercury unconditional first group
{
 const PB=Math.abs(SPEC.F1.lon[1]-SPEC.F1.lon[0])/3; // 19.858666...
 for(const p of ['Moon','Mercury','Venus','Jupiter'])ck('paksha F1 '+p,near(B.pakshaBala(SPEC.F1.lon[0],SPEC.F1.lon[1],p),PB));
 for(const p of ['Sun','Mars','Saturn'])ck('paksha F1 '+p,near(B.pakshaBala(SPEC.F1.lon[0],SPEC.F1.lon[1],p),60-PB));
 ck('paksha fold past 180',near(B.pakshaBala(10,190,'Moon'),60-0)); // fold(180)=180 -> 60 wait: |190-10|=180 fold=180 /3=60
 ck('paksha full moon = 60',near(B.pakshaBala(0,180,'Jupiter'),60));
 ck('paksha new moon = 0',near(B.pakshaBala(0,0,'Moon'),0));
}
// --- 8. Nathonnatha (27.8-9): synthetic controlled times
{
 const transit=Date.UTC(2000,0,1,12);const birth=h=>transit+h*H;
 ck('nath noon: Mo/Ma/Sa = 0',B.nathonnathaBala(birth(0),transit,'Moon')===0);
 ck('nath noon: Su/Ju/Ve = 60',B.nathonnathaBala(birth(0),transit,'Sun')===60);
 ck('nath midnight: Mo = 60',B.nathonnathaBala(birth(12),transit,'Moon')===60);
 ck('nath midnight: Su = 0',B.nathonnathaBala(birth(-12),transit,'Jupiter')===0);
 ck('nath 6h = 15 ghatis: Mo = 30',B.nathonnathaBala(birth(6),transit,'Mars')===30);
 ck('nath 6h: Ve = 30',B.nathonnathaBala(birth(-6),transit,'Venus')===30);
 ck('nath Mercury always 60',B.nathonnathaBala(birth(3),transit,'Mercury')===60&&B.nathonnathaBala(birth(11),transit,'Mercury')===60);
 ck('nath wraps past midnight',B.nathonnathaBala(birth(13),transit,'Saturn')===55); // 13h -> min(13,11)=11h -> 27.5 gh -> 55
 // Raman golden: birth 14:06:16 LMT, transit 11:46:00 LMT -> d=5.84 ghatis -> 11.68 / 48.32
 const lmt=ms=>Date.UTC(1918,9,16,0,0,0)+ms;
 const tr=lmt((11*60+46)*60000),bi=lmt((14*60+6)*60000+16000);
 const dGhatis=Math.abs(bi-tr)/H*2.5;
 ck('nath Raman d = 5.84 ghatis (2dp)',near(dGhatis,5.84,0.0051),dGhatis);
 // source rounding chain: Raman rounds d to 2dp in ghatis (5.84), then doubles -> bound 0.005*2+fp
 ck('nath Raman Mo/Ma/Sa 11.68',near(B.nathonnathaBala(bi,tr,'Moon'),11.68,0.0101));
 ck('nath Raman Su/Ju/Ve 48.32',near(B.nathonnathaBala(bi,tr,'Venus'),48.32,0.0101));
 ck('nath Raman Me 60',B.nathonnathaBala(bi,tr,'Mercury')===60);
}
// --- 9. Tribhaga (27.12): synthetic day/night thirds
{
 const sr=Date.UTC(2000,0,1,6),ss=Date.UTC(2000,0,1,18),ns=Date.UTC(2000,0,2,6);
 ck('tribhaga day-1 Mercury',B.tribhagaBala(sr+2*H,sr,ss,ns,'Mercury')===60&&B.tribhagaBala(sr+2*H,sr,ss,ns,'Sun')===0);
 ck('tribhaga day-2 Sun',B.tribhagaBala(sr+6*H,sr,ss,ns,'Sun')===60);
 ck('tribhaga day-3 Saturn',B.tribhagaBala(sr+10*H,sr,ss,ns,'Saturn')===60);
 ck('tribhaga night-1 Moon',B.tribhagaBala(ss+2*H,sr,ss,ns,'Moon')===60);
 ck('tribhaga night-2 Venus',B.tribhagaBala(ss+6*H,sr,ss,ns,'Venus')===60);
 ck('tribhaga night-3 Mars',B.tribhagaBala(ss+10*H,sr,ss,ns,'Mars')===60);
 ck('tribhaga Jupiter always 60',B.tribhagaBala(sr+3*H,sr,ss,ns,'Jupiter')===60&&B.tribhagaBala(ss+3*H,sr,ss,ns,'Jupiter')===60);
 ck('tribhaga night past midnight',B.tribhagaBala(ns-1*H,sr,ss,ns,'Mars')===60); // last night third
}
// --- 10. Vara (27.13)
ck('vara Saturday = Saturn 45',B.varaBala(6,'Saturn')===45&&B.varaBala(6,'Sun')===0);
ck('vara Sunday = Sun 45',B.varaBala(0,'Sun')===45);
// --- 11. Hora (27.13, Chaldean from sunrise, equal hours - Raman Rule 1)
{
 const sr=Date.UTC(2000,0,1,1,44); // Saturday, 07:14 IST
 const seq=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
 let ok=true,detail=[];
 for(let n=0;n<24;n++){const b=sr+n*H+30*60000;
  for(const p of PLANETS){const v=B.horaBala(b,sr,6,p);const exp=seq[n%7]===p?60:0;if(v!==exp){ok=false;detail.push([n,p,v,exp]);}}}
 ck('hora Chaldean sequence over 24h from Saturday sunrise',ok,detail.slice(0,5));
 // F1: 5th hora on Saturday = Venus (reviewer verdict)
 ck('hora F1 5th = Venus',B.horaBala(Date.UTC(2000,0,1,6,30),sr,6,'Venus')===60);
}
// --- 12. Ayana (27.15-17, BPHS khanda): synthetic with ayanamsha=0
{
 ck('ayana lavas khanda breakpoints',near(B.lavas(0),0)&&near(B.lavas(30),45)&&near(B.lavas(60),78)&&near(B.lavas(90),90));
 ck('ayana lavas interpolation',near(B.lavas(15),22.5)&&near(B.lavas(45),61.5)&&near(B.lavas(75),84));
 ck('ayana Sun at 0 sayana = 30',near(B.ayanaBala(0,0,'Sun'),30));
 ck('ayana Sun at 90 sayana = 60',near(B.ayanaBala(90,0,'Sun'),60));
 ck('ayana Sun at 180 sayana = 30',near(B.ayanaBala(180,0,'Sun'),30));
 ck('ayana Sun at 270 sayana = 0',near(B.ayanaBala(270,0,'Sun'),0));
 ck('ayana Moon at 90 sayana = 0',near(B.ayanaBala(90,0,'Moon'),0)); // lavas(90)=90, subtract
 ck('ayana Moon at 0 sayana = 30',near(B.ayanaBala(0,0,'Moon'),30));
 ck('ayana Moon at 270 sayana = 60',near(B.ayanaBala(270,0,'Moon'),60));
 ck('ayana Mercury always add',near(B.ayanaBala(270,0,'Mercury'),60)&&near(B.ayanaBala(90,0,'Mercury'),60));
 ck('ayana Saturn mirrors Moon',near(B.ayanaBala(90,0,'Saturn'),B.ayanaBala(90,0,'Moon')));
 ck('ayana ayanamsha applied',near(B.ayanaBala(66.147,23.853,'Sun'),B.ayanaBala(90,0,'Sun'),1e-6));
}
// --- 13. Cheshta Sun/Moon (27.18): identity, counted once
ck('cheshta Sun = Sun ayana',B.UNMODELED.length===3&&(()=>{const out=B.compute(mkSynthetic());const s=out.planets.find(p=>p.graha==='Sun');return near(s.cheshta,s.kala.ayana);})());
ck('cheshta Moon = Moon paksha',(()=>{const out=B.compute(mkSynthetic());const m=out.planets.find(p=>p.graha==='Moon');return near(m.cheshta,m.kala.paksha);})());
ck('cheshta others null (not fabricated)',(()=>{const out=B.compute(mkSynthetic());return out.planets.filter(p=>!['Sun','Moon'].includes(p.graha)).every(p=>p.cheshta===null);})());
// --- 14. Drishti values (ch26.6-12, spec.py reading)
{
 const D=B.drishtiValue;
 ck('drishti general slabs',near(D(45),7.5)&&near(D(60),15)&&near(D(75),30)&&near(D(90),45)&&near(D(105),37.5)&&near(D(120),30)&&near(D(135),15)&&near(D(150),0)&&near(D(165),30)&&near(D(180),60)&&near(D(270),15)&&near(D(300),0)&&near(D(25),0));
 // house spans (sg): 3rd=[60,90), 4th=[90,120), 5th=[120,150), 7th=[180,210), 8th=[210,240), 9th=[240,270), 10th=[270,300)
 ck('drishti Saturn 3rd full at cusp, decreasing',near(D(60,'Saturn'),60)&&near(D(75,'Saturn'),52.5));
 ck('drishti Saturn 3rd ramp-in',near(D(45,'Saturn'),30));
 ck('drishti Saturn 10th full at cusp, decreasing',near(D(270,'Saturn'),60)&&near(D(285,'Saturn'),30));
 ck('drishti Mars 4th full 60',near(D(90,'Mars'),60));
 ck('drishti Mars 7th constant 60',near(D(180,'Mars'),60)&&near(D(195,'Mars'),60));
 ck('drishti Mars 8th full at cusp, decreasing',near(D(210,'Mars'),60)&&near(D(225,'Mars'),45));
 ck('drishti Jupiter 5th full at cusp, decreasing',near(D(120,'Jupiter'),60)&&near(D(135,'Jupiter'),45));
 ck('drishti Jupiter 9th full 60',near(D(240,'Jupiter'),60));
 ck('drishti Jupiter 5th ramp-in',near(D(105,'Jupiter'),52.5));
}
// --- 15. Drik (27.19, provisional classification): controlled aspects
{
 // Jupiter 7th full aspect on Sun: +60 (full, benefic)
 let ps=[P('Sun',0),P('Moon',40),P('Mars',120),P('Mercury',50),P('Jupiter',180),P('Venus',90),P('Saturn',210)];
 ck('drik Jupiter full-add',near(B.drikBala('Sun',ps.filter(p=>['Sun','Jupiter'].includes(p.graha))),60));
 // 26.6 direction (reviewer blocker 1): d = aspected MINUS aspecting (target - aspecter).
 // Mars at 90 on Sun at 0: d = 0-90 = 270 -> general (300-270)/2 = 15 -> malefic -15/4 = -3.75
 ck('drik Mars malefic -quarter',near(B.drikBala('Sun',[P('Sun',0),P('Mars',90)]),-3.75));
 // Waxing Moon (Sun 0, Moon 90): d = 0-90 = 270 -> general 15 -> benefic +15/4 = +3.75
 ck('drik waxing Moon benefic +quarter',near(B.drikBala('Sun',[P('Sun',0),P('Moon',90)]),3.75));
 // Waning Moon (Sun 0, Moon 270): d = 0-270 = 90 -> general 45 -> malefic -45/4 = -11.25
 ck('drik waning Moon malefic -quarter',near(B.drikBala('Sun',[P('Sun',0),P('Moon',270)]),-11.25));
 // Mercury unafflicted full-add: Mercury at 300 -> d = 0-300 = 60 -> general 15 -> +15
 ck('drik Mercury full-add unafflicted',near(B.drikBala('Sun',[P('Sun',0),P('Mercury',300)]),15));
 // Mercury at 35 on Venus(200): d = 200-35 = 165 -> general 2*(165-150) = 30 -> benefic full-add +30
 ck('drik Mercury unafflicted benefic full-add',near(B.drikBala('Venus',[P('Venus',200),P('Mercury',35)]),30));
 // Mercury(5) conjoined Sun(0) on Venus(200): Mercury d=195 -> 52.5 malefic -13.125;
 // Sun d=200 -> 50 malefic -12.5; total -25.625
 ck('drik Mercury conjoined Sun = malefic -quarter',near(B.drikBala('Venus',[P('Venus',200),P('Sun',0),P('Mercury',5)]),-25.625));
 // Venus benefic +quarter: Venus 7th on Sun (d=180, symmetric) -> +15
 ck('drik Venus benefic +quarter',near(B.drikBala('Sun',[P('Sun',0),P('Venus',180)]),15));
 // Saturn at 90 on Sun: d = 0-90 = 270 -> Saturn 10th sg9 x=0 -> 60 -> -15;
 // Saturn at 60 on Sun: d = 0-60 = 300 -> value 0 -> 0
 ck('drik Saturn malefic -quarter',near(B.drikBala('Sun',[P('Sun',0),P('Saturn',90)]),-15)&&near(B.drikBala('Sun',[P('Sun',0),P('Saturn',60)]),0));
 // Direction fixtures (special-aspect curves are asymmetric - these distinguish direction):
 // Saturn 3rd aspect: Saturn at 0 aspecting Sun at 70: d=70 sg2 x=10 -> 60-5 = 55 -> -13.75.
 // The mirror geometry (Sun 70, Saturn 0) is the SAME d by construction here; the discriminating
 // pair is who sits ahead: Sun at 60 with Saturn at 0: d=60 -> sg2 x=0 -> 60 -> -15 (Saturn 3rd),
 // whereas Sun at 0 with Saturn at 60: d=300 -> 0 (above).
 ck('drik direction: Saturn 3rd only when target ahead',near(B.drikBala('Sun',[P('Sun',60),P('Saturn',0)]),-15));
 ck('drik direction: Saturn 10th only when target ahead',near(B.drikBala('Sun',[P('Sun',270),P('Saturn',0)]),-15)&&near(B.drikBala('Sun',[P('Sun',285),P('Saturn',0)]),-7.5));
 // Jupiter 5th: Jupiter at 0, Sun at 130: d=130 sg4 x=10 -> 60-10 = 50 full-add +50;
 // Sun at 230 with Jupiter at 0: d=230 sg7 x=20 -> 20/2+45 = 55 full-add +55
 ck('drik direction: Jupiter 5th/9th zones',near(B.drikBala('Sun',[P('Sun',130),P('Jupiter',0)]),50)&&near(B.drikBala('Sun',[P('Sun',230),P('Jupiter',0)]),55));
 // Mars 8th: Mars at 0, Sun at 220: d=220 sg7 x=10 -> 60-10 = 50 -> -12.5; Sun at 140: d=140 -> general 10 -> -2.5
 ck('drik direction: Mars 8th zone',near(B.drikBala('Sun',[P('Sun',220),P('Mars',0)]),-12.5)&&near(B.drikBala('Sun',[P('Sun',140),P('Mars',0)]),-2.5));
}
// --- 16. Compound relation (ch3.55-58)
{
 const ps=[P('Sun',0),P('Moon',45),P('Mars',90),P('Mercury',135),P('Jupiter',180),P('Venus',225),P('Saturn',270)];
 // Sun->Moon: natural friend; Moon 2nd from Sun? sign 1 vs 0 -> house 2 -> temp friend -> greatfriend
 ck('compound friend+friend = greatfriend',B.compoundRelation('Sun','Moon',ps)==='greatfriend');
 // Sun->Venus: natural enemy; Venus sign 7 -> house 8 -> temp enemy -> greatenemy
 ck('compound enemy+enemy = greatenemy',B.compoundRelation('Sun','Venus',ps)==='greatenemy');
 // Sun->Mercury: natural neutral; Mercury sign 4 -> house 5 -> temp enemy -> enemy
 ck('compound neutral+enemy = enemy',B.compoundRelation('Sun','Mercury',ps)==='enemy');
 // Sun->Mars: natural friend; Mars sign 3 -> house 4 -> temp friend -> greatfriend
 ck('compound Sun-Mars greatfriend',B.compoundRelation('Sun','Mars',ps)==='greatfriend');
 // Sun->Jupiter: natural friend; Jupiter sign 6 -> house 7 -> temp enemy -> neutral
 ck('compound friend+enemy = neutral',B.compoundRelation('Sun','Jupiter',ps)==='neutral');
 // Sun->Saturn: natural enemy; Saturn sign 9 -> house 10 -> temp friend -> neutral
 ck('compound enemy+friend = neutral',B.compoundRelation('Sun','Saturn',ps)==='neutral');
}
// --- 17. Saptavargaja (27.2-4, BPHS values, compound, MT rasi-only)
{
 // Sun at 4 Leo: D1 MT 45; D2 own(Leo hora) 30; D3 own 30; D7 own 30;
 // D9 -> Taurus(Venus), Venus placed in Leo (same sign -> temp enemy): enemy+enemy=greatenemy 2;
 // D12 -> Virgo(Mercury), Mercury in Leo: neutral+enemy=enemy 4;
 // D30 -> Aries(Mars), Mars in Leo: friend+enemy=neutral 10. Total 151.
 const ps=[P('Sun',124),P('Moon',45),P('Mars',124),P('Mercury',124),P('Jupiter',180),P('Venus',124),P('Saturn',270)];
 const s=B.saptavargaScore(124,'Sun',ps,(lon,n)=>J.varga(lon,n),[1,2,3,7,9,12,30]);
 ck('saptavargaja synthetic Sun total 151',near(s.total,151),s.detail);
 ck('saptavargaja MT rasi-only (D2 Leo = own 30, not MT 45)',s.detail.find(d=>d.varga===2).relation==='own'&&s.detail.find(d=>d.varga===2).value===30);
 ck('saptavargaja BPHS values set',JSON.stringify(Object.values(s.detail.map(d=>d.value)).sort((a,b)=>a-b))===JSON.stringify([2,4,10,30,30,30,45].sort((a,b)=>a-b)),s.detail.map(d=>d.value));
 // Raman Sun structural (verdict 12:02 decision 1): fixture longitudes -> BPHS total 100
 const RP={Sun:180+53/60+55/3600,Moon:311+17/60+19/3600,Mars:229+30/60+34/3600,Mercury:181+31/60+34/3600,Jupiter:84+0/60+49/3600,Venus:171+9/60+56/3600,Saturn:124+22/60+41/3600};
 const rps=Object.entries(RP).map(([g,l])=>P(g,l));
 const rs=B.saptavargaScore(RP.Sun,'Sun',rps,(lon,n)=>J.varga(lon,n),[1,2,3,7,9,12,30]);
 ck('saptavargaja Raman Sun structural = 100 (BPHS values)',near(rs.total,100),rs.detail);
 ck('saptavargaja Raman Sun pattern',JSON.stringify(rs.detail.map(d=>d.value))===JSON.stringify([10,30,10,10,10,10,20]),rs.detail);
}
// --- 18. Abda/Masa (Raman/Sripati convention, reproduction)
{
 const l=B.abdaMasaLords(Date.UTC(1918,9,16,14,6,16)- (5*60+10)*60000-20*1000); // 1918-10-16 14:06:16 LMT 5h10m20s
 ck('abda/masa ahargana 33405',l.ahargana===33405,l.ahargana);
 ck('abda-lord Saturn (Raman reproduction)',l.abdaLord==='Saturn',l.abdaLord);
 ck('masa-lord Mercury (Raman reproduction)',l.masaLord==='Mercury',l.masaLord);
 const e=B.abdaMasaLords(Date.UTC(1917,11,31,12));
 ck('epoch check A(1917-12-31)=33116 (Table I)',e.ahargana===33116,e.ahargana);
 const f=B.abdaMasaLords(Date.UTC(2000,0,1,6,30));
 ck('abda/masa F1 = Mercury/Sun',f.abdaLord==='Mercury'&&f.masaLord==='Sun',[f.abdaLord,f.masaLord]);
}
// --- 18b. Moolatrikona D1 degree-zones (BPHS 3.51-54, reviewer 12:33)
{
 const ps=[P('Sun',0),P('Moon',45),P('Mars',90),P('Mercury',135),P('Jupiter',180),P('Venus',225),P('Saturn',270)];
 const rel=(lon,p)=>B.saptavargaScore(lon,p,ps,(l,n)=>J.varga(l,n),[1,2,3,7,9,12,30]).detail[0];
 // Mercury Virgo: zone 15-20 -> 164.99 own 30, 165 MT 45, 169.99 MT 45, 170 own 30
 ck('MT Mercury Virgo zone 15-20',rel(164.99,'Mercury').value===30&&rel(165,'Mercury').value===45&&rel(169.99,'Mercury').value===45&&rel(170,'Mercury').value===30);
 // Moon Taurus: zone 3-30 -> 32.99 not MT, 33 MT 45, 59.99 MT 45
 ck('MT Moon Taurus zone 3-30',rel(32.99,'Moon').relation!=='mt'&&rel(33,'Moon').value===45&&rel(59.99,'Moon').value===45);
 // Sun Leo: zone 0-20 -> 120 MT, 139.99 MT, 140 own 30
 ck('MT Sun Leo zone 0-20',rel(120,'Sun').value===45&&rel(139.99,'Sun').value===45&&rel(140,'Sun').value===30);
 // Mars Aries 0-12, Jupiter Sag 0-10, Venus Libra 0-15, Saturn Aqu 0-20
 ck('MT zones Ma/Ju/Ve/Sa',rel(11.99,'Mars').value===45&&rel(12,'Mars').value===30&&rel(249.99,'Jupiter').value===45&&rel(250,'Jupiter').value===30&&rel(194.99,'Venus').value===45&&rel(195,'Venus').value===30&&rel(319.99,'Saturn').value===45&&rel(320,'Saturn').value===30);
 // outside MT sign: no MT (Moon in Cancer = own, not mt)
 ck('MT only in its own rasi',rel(100,'Moon').relation==='own');
}
// --- 18c. Pre-sunrise rollover (reviewer blocker 3): jyotish-day inputs
{
 // Birth Tuesday 03:00 UTC before civil sunrise 06:00: caller passes PREVIOUS civil date's
 // sunrise (Mon 06:00), weekday Monday=1, previous sunset (Mon 18:00), next sunrise (Tue 06:00).
 const srMon=Date.UTC(2021,2,1,6),ssMon=Date.UTC(2021,2,1,18),srTue=Date.UTC(2021,2,2,6),birth=Date.UTC(2021,2,2,3);
 ck('rollover vara: Monday lord Moon, not Tuesday Mars',B.varaBala(1,'Moon')===45&&B.varaBala(2,'Moon')===0);
 // hora: 21h from Mon 06:00; Chaldean from Moon idx 6: (6+21)%7=6 -> Moon -> 60
 ck('rollover hora: counted from previous sunrise + Monday lord',B.horaBala(birth,srMon,1,'Moon')===60&&B.horaBala(birth,srMon,1,'Mars')===0);
 // tribhaga: night Mon 18:00 -> Tue 06:00, third=4h; t=9h -> k=2 -> night lord Mars -> 60
 ck('rollover tribhaga: previous sunset bounds the night',B.tribhagaBala(birth,srMon,ssMon,srTue,'Mars')===60&&B.tribhagaBala(birth,srMon,ssMon,srTue,'Moon')===0);
 // misuse guards: civil-date inputs for a pre-sunrise birth must throw, not silently miscompute
 let threw=0;try{B.compute({positions:[P('Sun',10),P('Moon',50),P('Mars',100),P('Mercury',140),P('Jupiter',190),P('Venus',230),P('Saturn',280)],lagna:0,birthMs:birth,weekday:2,sunriseMs:srTue,sunsetMs:Date.UTC(2021,2,2,18),nextSunriseMs:Date.UTC(2021,2,3,6),transitMs:Date.UTC(2021,2,2,12),ayanamsa:24,varga:(l,n)=>J.varga(l,n)});}catch(e){threw++;}
 try{B.tribhagaBala(birth,srTue,Date.UTC(2021,2,2,18),Date.UTC(2021,2,3,6),'Mars');}catch(e){threw++;}
 ck('rollover misuse guards throw',threw===2);
 // rolled-over compute() end-to-end: vara Moon 45, hora Moon 60, tribhaga Mars 60
 const out=B.compute({positions:[P('Sun',10),P('Moon',50),P('Mars',100),P('Mercury',140),P('Jupiter',190),P('Venus',230),P('Saturn',280)],lagna:0,birthMs:birth,weekday:1,sunriseMs:srMon,sunsetMs:ssMon,nextSunriseMs:srTue,transitMs:(srMon+ssMon)/2,ayanamsa:24,varga:(l,n)=>J.varga(l,n)});
 const g=x=>out.planets.find(p=>p.graha===x);
 ck('rollover compute end-to-end',g('Moon').kala.vara===45&&g('Moon').kala.hora===60&&g('Mars').kala.tribhaga===60&&g('Moon').kala.tribhaga===0);
}
// --- 18d. Raman printed dig rows vs the ARC FORMULA on the book's own p32 powerless points
// (reviewer 12:34: test the stated arc formula; exclude print-inconsistent rows; no 0.06).
// Convention note: Raman uses his meridian powerless points (IC/MC table), the module uses
// equal-house from lagna (reviewer spec) - recorded convention difference, no module change.
{
 const fold=x=>{x=((x%360)+360)%360;return x>180?360-x:x;};
 const RL={Sun:180+53/60+55/3600,Moon:311+17/60+19/3600,Mars:229+30/60+34/3600,Mercury:181+31/60+34/3600,Jupiter:84+0/60+49/3600,Venus:171+9/60+56/3600,Saturn:124+22/60+41/3600};
 const PP={Sun:36+36/60,Moon:216+36/60,Mars:36+36/60,Mercury:118+27/60,Jupiter:118+27/60,Venus:216+36/60,Saturn:298+27/60};
 const PRINT={Sun:48.10,Moon:31.56,Mars:55.70,Mercury:21.09,Jupiter:11.50,Venus:15.15,Saturn:58.02};
 // excluded rows (printed value inconsistent with the book's own arc/3, recorded from pixels):
 // Mercury printed 21.09 vs arc 63d5'/3 = 21.03; Jupiter printed 11.50 vs arc 34d26'/3 = 11.48
 const EXCL=['Mercury','Jupiter'];
 // bound: powerless point printed to the minute (+/-0.5' -> +/-0.00278) + printed dig 2dp (+/-0.005) = 0.0078 -> 0.008
 const errs=[];for(const p of ['Sun','Moon','Mars','Venus','Saturn']){const v=fold(RL[p]-PP[p])/3;if(!near(v,PRINT[p],0.008))errs.push([p,v,PRINT[p]]);}
 ck('Raman dig printed rows (5, Me/Ju excluded) vs arc formula',errs.length===0,errs);
 ck('Raman dig excluded rows confirmed print-inconsistent',Math.abs(fold(RL.Mercury-PP.Mercury)/3-PRINT.Mercury)>0.008&&Math.abs(fold(RL.Jupiter-PP.Jupiter)/3-PRINT.Jupiter)>0.008);
}
// --- 18e. DST-zone engine fixture (reviewer 12:38): pre-sunrise birth across a DST
// transition uses the engine's ACTUAL instants (Europe/London, BST starts 2024-03-31).
{
 const l={latitude:51.5074,longitude:-0.1278,timeZone:'Europe/London'};
 const birth=new Date(Date.UTC(2024,2,31,3,30)); // 04:30 BST (civil Sunday), before sunrise
 const civil=A.dailyPanchanga(birth,l);
 // rollover via the helper: previous LOCAL calendar date at civil noon (never -86400000)
 const prevDateStr=B.previousLocalDateString(+birth,l.timeZone); // '2024-03-30' (Saturday)
 ck('DST fixture: previousLocalDateString = 2024-03-30',prevDateStr==='2024-03-30',prevDateStr);
 const prev=A.dailyPanchanga(new Date(prevDateStr+'T12:00:00Z'),l); // civil Saturday (GMT)
 const ld=d=>new Intl.DateTimeFormat('en-GB',{timeZone:l.timeZone,day:'2-digit',month:'2-digit'}).format(new Date(d));
 ck('DST fixture: civil and previous sunrise on distinct civil dates',ld(civil.sunrise)==='31/03'&&ld(prev.sunrise)==='30/03',[ld(civil.sunrise),ld(prev.sunrise)]);
 // jyotish day = Saturday: vara lord Saturn 45
 ck('DST fixture vara: Saturday lord (rollover), not Sunday',B.varaBala(6,'Saturn')===45&&B.varaBala(0,'Saturn')===0);
 // hora: whole hours from the ACTUAL Saturday sunrise instant across the clock change
 const srMs=+new Date(prev.sunrise),ssMs=+new Date(prev.sunset),nsMs=+new Date(civil.sunrise);
 const n=Math.floor((+birth-srMs)/3600000),lord=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'][(0+n)%7];
 ck('DST fixture hora: module agrees with engine-derived instant count',B.horaBala(+birth,srMs,6,lord)===60,['n='+n,lord]);
 ck('DST fixture hora: civil-day inputs would give a DIFFERENT lord (guard matters)',
   ['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'][(0+Math.floor((+birth-+new Date(civil.sunrise))/3600000))%7]!==lord);
 // tribhaga: night bounded by ACTUAL previous sunset and next sunrise across the clock change
 const third=(nsMs-ssMs)/3,k=Math.min(2,Math.floor((+birth-ssMs)/third)),tl=['Moon','Venus','Mars'][k];
 ck('DST fixture tribhaga: module agrees with engine-derived night thirds',B.tribhagaBala(+birth,srMs,ssMs,nsMs,tl)===60,['k='+k,tl]);
}
// --- 18f. previousLocalDateString: exact spring-forward and fall-back UI-context fixtures
// (reviewer 12:38:59: the old birth-86400000 skipped/duplicated a local date; the helper
// must return the previous LOCAL calendar date and the wrong arithmetic must differ).
{
 const ny='America/New_York';
 // spring forward 2024-03-10 02:00 EST -> 03:00 EDT; birth Mon 2024-03-11 00:30 EDT
 const b1=+new Date('2024-03-11T00:30:00-04:00');
 ck('NY spring-forward: previousLocalDateString = 2024-03-10 (Sunday)',B.previousLocalDateString(b1,ny)==='2024-03-10',B.previousLocalDateString(b1,ny));
 // the old 24h subtraction lands on Saturday 2024-03-09 23:30 EST -> wrong date
 ck('NY spring-forward: 86400000-subtract would be WRONG (2024-03-09)',B.localDateString(b1-86400000,ny)==='2024-03-09',B.localDateString(b1-86400000,ny));
 // fall back 2024-11-03 02:00 EDT -> 01:00 EST; birth Mon 2024-11-04 00:30 EST
 const b2=+new Date('2024-11-04T00:30:00-05:00');
 ck('NY fall-back: previousLocalDateString = 2024-11-03 (Sunday)',B.previousLocalDateString(b2,ny)==='2024-11-03',B.previousLocalDateString(b2,ny));
 ck('NY fall-back: helper is stable across the 25-hour day',B.localDateString(b2,ny)==='2024-11-04');
 // weekday pairing: 2024-03-10 and 2024-11-03 are both Sundays -> vara lord Sun
 const wd1=new Date(Date.UTC(...B.previousLocalDateString(b1,ny).split('-').map(Number).map((v,i)=>i===1?v-1:v))).getUTCDay();
 const wd2=new Date(Date.UTC(...B.previousLocalDateString(b2,ny).split('-').map(Number).map((v,i)=>i===1?v-1:v))).getUTCDay();
 ck('NY fixtures weekday pairing: both Sundays, vara lord Sun=45',wd1===0&&wd2===0&&B.varaBala(0,'Sun')===45,[wd1,wd2]);
}
// --- 18g. hora cycle UNWRAPPED past 24h (reviewer 12:38:59): a >24h solar day has a 25th
// hora before the next sunrise; the 7-lord cycle must continue, no %24 reset.
{
 const CHALD=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
 const srMon=Date.UTC(2024,0,1,6,0);       // Monday 06:00 UTC sunrise
 const srTue=Date.UTC(2024,0,2,7,0);       // next sunrise Tuesday 07:00 -> 25h solar day
 const birth=Date.UTC(2024,0,2,6,30);      // Tuesday 06:30, 24.5h after Monday sunrise
 const n=Math.floor((birth-srMon)/3600000); // 24 -> the 25th hora
 ck('hora 25th hour: n=24, lord Mars (unwrapped cycle)',n===24&&CHALD[(6+n)%7]==='Mars'&&B.horaBala(birth,srMon,1,'Mars')===60&&B.horaBala(birth,srMon,1,'Moon')===0,['n='+n]);
 // a %24 wrap (the old bug) would reset to the day lord Moon
 ck('hora 25th hour: buggy %24 wrap would give Moon (guard matters)',CHALD[(6+(n%24))%7]==='Moon');
 // next-day boundary: after Tuesday's sunrise the count restarts from Tuesday's lord Mars
 const b2=srTue+1800000; // 07:30 Tuesday -> first hora of Tuesday = Mars
 ck('hora next-day boundary: first hora after next sunrise = day lord Mars',B.horaBala(b2,srTue,2,'Mars')===60&&B.horaBala(b2,srTue,2,'Moon')===0);
 // misuse must throw, never silently miscompute
 let threw=false;try{B.horaBala(srMon-1,srMon,1,'Moon');}catch(e){threw=true;}
 ck('hora misuse: birth before sunriseMs throws',threw);
}
// --- 19. Solar transit helper (Meeus GMST/obliquity, standard astronomy)
{
 // F1 Delhi: transit expected near 12:24 IST (longitude +21.2min, EoT ~-3.1min; reviewer estimate)
 const birth=new Date(Date.UTC(2000,0,1,6,30)),l={latitude:28.6139,longitude:77.2090,timeZone:'Asia/Calcutta'};
 const daily=A.dailyPanchanga(birth,l);
 const srMs=+new Date(daily.sunrise),ssMs=+new Date(daily.sunset);
 const tr=B.solarTransitMs(srMs,ssMs,l.longitude,
   t=>A.grahaPositions(new Date(t)).find(g=>g.graha==='Sun').longitude,t=>A.ayanamsha(new Date(t)));
 const ist=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Calcutta',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(tr));
 ck('transit F1 within sunrise..sunset',tr>srMs&&tr<ssMs,ist);
 console.log('INFO transit F1 IST =',ist,'(reviewer estimate ~12:24)');
 ck('transit F1 within 2 min of independent estimate 12:24',Math.abs(tr-Date.UTC(2000,0,1,6,54))<=120000,ist);
 // Raman chart: 1918-10-16, 13N 77.5833E (LMT 5h10m20s). Source value minute-rounded: 11:46 LMT -> bound 30s+computation slack
 const rb=new Date(Date.UTC(1918,9,16,14,6,16)-(5*H+10*60000+20000));
 const rl={latitude:13,longitude:77+35/60,timeZone:'Asia/Kolkata'};
 const rd=A.dailyPanchanga(rb,rl);
 const rt=B.solarTransitMs(+new Date(rd.sunrise),+new Date(rd.sunset),rl.longitude,
   t=>A.grahaPositions(new Date(t)).find(g=>g.graha==='Sun').longitude,t=>A.ayanamsha(new Date(t)));
 const rtLmt=(rt-(Date.UTC(1918,9,16,0,0,0)-(5*H+10*60000+20000)))/60000; // minutes into LMT day
 ck('transit Raman within source minute-rounding of 11:46 LMT',Math.abs(rtLmt-(11*60+46))<=1.0,rtLmt);
 console.log('INFO transit Raman LMT =',(rtLmt/60).toFixed(4),'h (printed 11:46, minute-rounded)');
}
// --- 20. Full compute(): F1 spec-fed + structural invariants
function mkSynthetic(){
 const ps=[P('Sun',10),P('Moon',50),P('Mars',100),P('Mercury',140),P('Jupiter',190),P('Venus',230),P('Saturn',280)];
 const sr=Date.UTC(2000,0,1,6),ss=Date.UTC(2000,0,1,18);
 return {positions:ps,lagna:0,birthMs:sr+3*H,weekday:6,sunriseMs:sr,sunsetMs:ss,nextSunriseMs:ss+12*H,transitMs:(sr+ss)/2,ayanamsa:24,varga:(lon,n)=>J.varga(lon,n)};
}
{
 const f=SPEC.F1;
 const birth=new Date(Date.UTC(2000,0,1,6,30)),l={latitude:28.6139,longitude:77.2090,timeZone:'Asia/Calcutta'};
 const daily=A.dailyPanchanga(birth,l);
 const next=A.riseSet('rise',A.nextLocalDayStartUTC(birth,l.timeZone),l);
 const transit=B.solarTransitMs(+new Date(daily.sunrise),+new Date(daily.sunset),l.longitude,
   t=>A.grahaPositions(new Date(t)).find(g=>g.graha==='Sun').longitude,t=>A.ayanamsha(new Date(t)));
 const out=B.compute({positions:PLANETS.map((p,i)=>P(p,f.lon[i])),lagna:f.asc,birthMs:+birth,weekday:6,
   sunriseMs:+new Date(daily.sunrise),sunsetMs:+new Date(daily.sunset),nextSunriseMs:next?+new Date(next):undefined,transitMs:transit,ayanamsa:A.ayanamsha(birth),varga:(lon,n)=>J.varga(lon,n)});
 // tier-1 fixture values inside compute()
 const errs=[];
 PLANETS.forEach((p,i)=>{const pl=out.planets.find(q=>q.graha===p);
  if(!near(pl.sthana.uchcha,f.uchcha[i],0.0051))errs.push([p,'uchcha',pl.sthana.uchcha,f.uchcha[i]]);
  if(pl.sthana.kendradi!==f.kendradi[i])errs.push([p,'kendradi',pl.sthana.kendradi,f.kendradi[i]]);
  if(pl.sthana.drekkana!==f.drekkana[i])errs.push([p,'drekkana',pl.sthana.drekkana,f.drekkana[i]]);
  if(!near(pl.naisargika,NAIS[i]))errs.push([p,'naisargika',pl.naisargika,NAIS[i]]);});
 ck('compute F1 tier-1 fixture',errs.length===0,errs);
 // paksha exact from spec longitudes
 const PB=Math.abs(f.lon[1]-f.lon[0])/3;
 ck('compute F1 paksha exact',near(out.planets.find(p=>p.graha==='Moon').kala.paksha,PB)&&near(out.planets.find(p=>p.graha==='Sun').kala.paksha,60-PB));
 // dig inside compute vs spec fixture: exact formula values, 2dp representational bound only
 // (reviewer 12:34: the 0.06 allowance is withdrawn; the arc formula is what is tested)
 const derrs=PLANETS.map((p,i)=>{const pl=out.planets.find(q=>q.graha===p);return Math.abs(pl.dig-f.dig[i]);});
 ck('compute F1 dig bucket, spec within 2dp rounding 0.0051',derrs.every(d=>d<=0.0051),derrs);
 // decomposition invariant (main 12:20): sixfold buckets separate; sthana.total has NO dig;
 // partialSum = sthana.total + dig + kala.total + cheshta + naisargika + drik, dig exactly once
 let ids=true;
 for(const pl of out.planets){
  if(!near(pl.sthana.total,pl.sthana.uchcha+pl.sthana.saptavargaja.total+pl.sthana.ojhayugma+pl.sthana.kendradi+pl.sthana.drekkana))ids=false;
  if('dig' in pl.sthana)ids=false;
  if(!near(pl.kala.total,pl.kala.nathonnatha+pl.kala.paksha+pl.kala.tribhaga+pl.kala.abda+pl.kala.masa+pl.kala.vara+pl.kala.hora+pl.kala.ayana))ids=false;
  if(!near(pl.partialSum,pl.sthana.total+pl.dig+pl.kala.total+(pl.cheshta??0)+pl.naisargika))ids=false;}
 ck('decomposition invariant: buckets separate, dig once in partialSum',ids);
 // invariants: partial only, no totals/ratios
 ck('invariant partialOnly true',out.partialOnly===true);
 ck('invariant provisional drik noted',out.provisional.some(p=>p.id==='drik-classification'));
 ck('invariant drik experimental, excluded from partialSum',out.experimental.includes('drik')&&out.note.includes('NOT included in the partial sums'));
 ck('invariant unmodeled set',JSON.stringify(out.unmodeled.map(u=>u.id).sort())===JSON.stringify(['bhava-bala','cheshta-ma-sa','yuddha']));
 ck('invariant no total/ratio/rupa fields',out.planets.every(p=>!('total' in p)&&!('ratio' in p)&&!('rupa' in p))&&!('total' in out)&&!('ratio' in out));
 ck('invariant cheshta null Ma-Sa',out.planets.filter(p=>!['Sun','Moon'].includes(p.graha)).every(p=>p.cheshta===null));
 ck('invariant note names partial-only',out.note.includes('Partial sums only'));
 ck('invariant conventions listed',out.conventions.length===4);
 // kala structural: F1 Saturday, birth 12:00 IST
 ck('compute F1 vara Saturn 45',out.planets.find(p=>p.graha==='Saturn').kala.vara===45&&out.planets.filter(p=>p.kala.vara===45).length===1);
 ck('compute F1 hora Venus 60 (5th hora Saturday)',out.planets.find(p=>p.graha==='Venus').kala.hora===60&&out.planets.filter(p=>p.kala.hora===60).length===1);
 ck('compute F1 tribhaga Sun+Jupiter only',out.planets.filter(p=>p.kala.tribhaga===60).map(p=>p.graha).sort().join()===['Jupiter','Sun'].sort().join());
 ck('compute F1 abda Mercury / masa Sun',out.planets.find(p=>p.graha==='Mercury').kala.abda===15&&out.planets.find(p=>p.graha==='Sun').kala.masa===30&&out.planets.every(p=>p.kala.abda+p.kala.masa>0===(p.graha==='Mercury'||p.graha==='Sun')));
 ck('compute F1 nathonnatha Me 60 + groups sum 60',out.planets.find(p=>p.graha==='Mercury').kala.nathonnatha===60&&near(out.planets.find(p=>p.graha==='Moon').kala.nathonnatha+out.planets.find(p=>p.graha==='Sun').kala.nathonnatha,60));
 console.log('INFO F1 partial sums:',PLANETS.map(p=>{const pl=out.planets.find(q=>q.graha===p);return p+' '+pl.partialSum.toFixed(2);}).join(' | '));
 console.log('INFO F1 kala:',PLANETS.map(p=>{const pl=out.planets.find(q=>q.graha===p);return p+' '+pl.kala.total.toFixed(2);}).join(' | '));
}
// --- 21. Engine ephemeris vs reviewer spec longitudes: gross-mismatch guard only.
// The two ephemerides (Astronomy Engine vs PyJHora/Swiss) differ by up to ~0.013 deg here;
// not a constant ayanamsha shift. Formula fixtures above use the spec longitudes directly,
// so this delta does not leak into formula checks. 0.02 deg is a sanity bound, not a
// precision claim.
{
 const birth=new Date(Date.UTC(2000,0,1,6,30)),l={latitude:28.6139,longitude:77.2090,timeZone:'Asia/Calcutta'};
 const ps=A.grahaPositions(birth,{node:'mean'}),lagna=A.siderealLagna(birth,l);
 const f=SPEC.F1,errs=[],deltas=[];
 PLANETS.forEach((p,i)=>{const v=ps.find(q=>q.graha===p).longitude;deltas.push(p+' '+(v-f.lon[i]).toFixed(4));if(!near(v,f.lon[i],0.02))errs.push([p,v,f.lon[i]]);});
 console.log('INFO engine-vs-spec F1 longitude deltas (deg):',deltas.join(' | '));
 ck('engine F1 longitudes gross-match spec within 0.02 deg',errs.length===0,errs);
 ck('engine F1 lagna gross-matches spec within 0.02 deg',near(lagna,f.asc,0.02),[lagna,f.asc]);
}
// --- 22. Omission vocabulary in module output strings
{
 const banned=['मृत्यु','मरण','आकाल','देहांत','उपाय','मृत्युंजय','प्रायश्चित','रत्न'];
 const txt=JSON.stringify(B.compute(mkSynthetic()));
 const hits=banned.filter(b=>txt.includes(b));
 ck('omission vocabulary absent from module output',hits.length===0,hits);
}
console.log(`\nbala: ${pass} pass, ${fail} fail`+(fail?(' | FAILED: '+bad.join(', ')):''));
process.exit(fail?1:0);
