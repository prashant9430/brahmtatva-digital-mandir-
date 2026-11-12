// Bhava individual terms (BPHS 27.26-31) module checks. Run: node tests/validate-bhava-terms.js
// Mirror of harness/bhava-terms-prep.py. Fixtures: Raman p21 (printed angles -> printed
// madhyas, geometry check only), hand-computed p21 boundary literals, MC oracle
// harness/mc-oracle.json (Swiss isolated comparator; cross-model residuals MEASURED and
// named, never acceptance tolerances). No totals/ranks are tested because none exist.
'use strict';
const fs=require('fs'),path=require('path');
const V=require('../kundli-bhava.js');
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}
const mod=x=>{const r=x%360;return r<0?r+360:r;};
const w180=x=>{x=mod(x);return x>180?x-360:x;};
const fwd=(a,b)=>mod(b-a);
const d=(dg,m)=>dg+m/60;

// --- 1. Raman p21 geometry fixture (angles -> 12 madhyas, tol 1/3 arcmin)
{
 const got=V.madhyas(d(298,27),d(36,36),d(118,27),d(216,36));
 const exp=[d(298,27),d(331,10),d(3,53),d(36,36),d(63,53),d(91,10),d(118,27),d(151,10),d(183,53),d(216,36),d(243,53),d(271,10)];
 const tol=(1/3)/60;
 const errs=[];got.forEach((g,i)=>{if(Math.abs(w180(g-exp[i]))>tol)errs.push([i+1,g,exp[i]]);});
 ck('p21 madhya fixture (12, tol 1/3 arcmin)',errs.length===0,errs);
 global.__p21={got};
}
// --- 2. exact 90-deg quadrants -> uniform 30-deg spacing
{
 const g2=V.madhyas(0,90,180,270);
 ck('uniform quadrants',g2.every((g,i)=>Math.abs(w180(g-30*i))<1e-9));
}
// --- 3. madhya rotation invariance (seeded)
{
 let s=7;const rnd=()=>{s=(1103515245*s+12345)%2147483648;return s/2147483648;};
 let ok=true;
 for(let i=0;i<300;i++){
  const an=[rnd()*360,rnd()*360,rnd()*360,rnd()*360].sort((a,b)=>a-b);
  const m1=V.madhyas(...an),rot=rnd()*360;
  const m2=V.madhyas(...an.map(a=>mod(a+rot)));
  if(m2.some((g,k)=>Math.abs(w180(g-mod(m1[k]+rot)))>1e-9))ok=false;}
 ck('madhya rotation invariance x300',ok);
}
// --- 4. forward order preserved for irregular anchors
{
 const m=V.madhyas(10,100,181,300);
 ck('forward order',m.every((_,i)=>fwd(m[i],m[(i+1)%12])>0));
 global.__m=m;
}
// --- 5a. p21 boundary literals (hand-computed from printed p21 madhyas:
// quadrant thirds 32d43'/27d17', halves 16d21.5'/13d38.5')
{
 const bp=V.boundaries(global.__p21.got);
 const LIT=[[284,48.5],[314,48.5],[347,31.5],[20,14.5],[50,14.5],[77,31.5],[104,48.5],[134,48.5],[167,31.5],[200,14.5],[230,14.5],[257,31.5]];
 const errs=[];bp.forEach((b,i)=>{const e=LIT[i][0]+LIT[i][1]/60;if(Math.abs(w180(b-e))>1e-9)errs.push([i+1,b,e]);});
 ck('p21 boundary literals (12 hand-computed)',errs.length===0,errs);
}
// --- 5b. structural invariants on the irregular-anchor set
{
 const b=V.boundaries(global.__m);
 const ws=b.map((s,i)=>mod(b[(i+1)%12]-s));
 ck('all widths positive',ws.every(w=>w>0));
 ck('widths sum to 360',Math.abs(ws.reduce((a,x)=>a+x,0)-360)<1e-9);
 // independent lifted-mid path (different code than boundaries())
 // independent lifted-mid path (different code than boundaries()): boundary i = mid of madhya i-1 -> madhya i
 const m=global.__m,liftedMid=(x,y)=>mod((x+(y<x?y+360:y))/2);
 const bexp=m.map((_,i)=>liftedMid(m[(i+11)%12],m[i]));
 ck('boundaries equal independent lifted-mid values',b.every((g,i)=>Math.abs(w180(g-bexp[i]))<1e-12));
 // unique occupancy x2000 (seeded)
 let s=99;const rnd=()=>{s=(1103515245*s+12345)%2147483648;return s/2147483648;};
 let ok=true;
 for(let i=0;i<2000;i++){const x=rnd()*360;try{V.bhavaOf(x,b);}catch(e){ok=false;break;}}
 ck('unique occupancy x2000',ok);
 // negative controls: these MUST fail the invariants (provable non-vacuity)
 const bdup=b.slice();bdup[3]=bdup[2];
 const wsd=bdup.map((s,i)=>mod(bdup[(i+1)%12]-s));
 ck('negative control: duplicate boundary fails widths>0',!wsd.every(w=>w>0));
 const bswap=b.slice();[bswap[0],bswap[1]]=[bswap[1],bswap[0]];
 let uniq=false;for(let i=0;i<2000;i++){const x=rnd()*360;try{V.bhavaOf(x,bswap);}catch(e){uniq=true;break;}}
 ck('negative control: swapped boundaries fail unique occupancy',uniq);
 const p21ws=global.__p21.got;
 const wholesign=p21ws.map((_,i)=>mod(Math.floor(p21ws[0]/30)*30+15+30*i)); // whole-sign substitution
 const wsb=V.boundaries(wholesign);
 const LIT=[[284,48.5],[314,48.5],[347,31.5],[20,14.5],[50,14.5],[77,31.5],[104,48.5],[134,48.5],[167,31.5],[200,14.5],[230,14.5],[257,31.5]];
 ck('negative control: whole-sign substitution fails p21 literals',wsb.some((g,i)=>Math.abs(w180(g-(LIT[i][0]+LIT[i][1]/60)))>1e-9));
 // sandhi half-open: exact boundary belongs to NEXT bhava
 ck('sandhi half-open (12 boundaries)',b.every((_,i)=>V.bhavaOf(b[(i+1)%12],b)===((i+1)%12)+1));
 ck('madhya inside own bhava',global.__m.every((mm,i)=>V.bhavaOf(mm,b)===i+1));
}
// --- 6. rising types (Saravali 3.24 groups; ubhayodaya = Pisces only)
{
 ck('rising: 15 Gemini shirshodaya',V.risingType(75)==='shirshodaya');
 ck('rising: 15 Pisces ubhayodaya',V.risingType(345)==='ubhayodaya');
 ck('rising: 15 Aries prishthodaya',V.risingType(15)==='prishthodaya');
 ck('rising: 15 Scorpio shirshodaya',V.risingType(225)==='shirshodaya');
 ck('rising: Sagittarius back-first (Saravali)',V.risingType(255)==='prishthodaya');
 const all=new Set();for(let s=0;s<12;s++)all.add(V.risingType(s*30+15));
 ck('rising classes cover 12 signs',all.size===3);
}
// --- 7. day/twilight/night classification (provisional 72-min windows)
{
 const H=3600000,MIN=60000;
 const sr=Date.UTC(2000,0,1,1),ss=Date.UTC(2000,0,1,13);
 ck('dayPart day',V.dayPart(sr+2*H,sr,ss)==='day');
 ck('dayPart night',V.dayPart(ss+5*H,sr,ss)==='night');
 ck('dayPart morning twilight (before sunrise)',V.dayPart(sr-30*MIN,sr,ss)==='twilight');
 ck('dayPart evening twilight (after sunset, priority over night)',V.dayPart(ss+30*MIN,sr,ss)==='twilight');
 ck('twilight window edges exclusive->night',V.dayPart(ss+V.TWILIGHT_MIN*MIN,sr,ss)==='night');
 ck('risingTerm shirshodaya+day=15',V.risingTerm(75,'day')===15);
 ck('risingTerm shirshodaya+night=0',V.risingTerm(75,'night')===0);
 ck('risingTerm ubhayodaya+twilight=15',V.risingTerm(345,'twilight')===15);
 ck('risingTerm ubhayodaya+day=0',V.risingTerm(345,'day')===0);
 ck('risingTerm prishthodaya+night=15',V.risingTerm(15,'night')===15);
}
// --- 7b. neighbor twilight windows (refined boundary handling)
{
 const D=86400000,sr=Date.UTC(2000,2,20,6),ss=Date.UTC(2000,2,20,18);
 // evening window crossing midnight: previous sunset 23:45, birth 00:10 next civil date
 const prevSet=Date.UTC(2000,2,19,23,45),t1=prevSet+25*60000; // 00:10 next day
 const srNext=Date.UTC(2000,2,20,6),ssNext=Date.UTC(2000,2,20,23,46);
 ck('midnight-crossing evening window -> twilight',V.dayPart(t1,srNext,ssNext,{prevSunsetMs:prevSet})==='twilight');
 ck('control: without prevSunset neighbor it would read night',V.dayPart(t1,srNext,ssNext)==='night');
 // next-sunrise morning window starting before local midnight (high latitude)
 const t2=Date.UTC(2000,2,20,23,50),nextSr=Date.UTC(2000,2,21,0,50);
 ck('next-sunrise window before midnight -> twilight',V.dayPart(t2,sr,ss,{nextSunriseMs:nextSr})==='twilight');
 ck('control: without nextSunrise neighbor it would read night',V.dayPart(t2,sr,ss)==='night');
 // overlapping windows (very short night) still twilight
 const t3=Date.UTC(2000,2,21,0,10),prevSet2=Date.UTC(2000,2,20,23,30),nextSr2=Date.UTC(2000,2,21,0,50);
 ck('overlapping twilight windows -> twilight',V.dayPart(t3,Date.UTC(2000,2,21,5),Date.UTC(2000,2,21,18),{prevSunsetMs:prevSet2,nextSunriseMs:nextSr2})==='twilight');
 // twilight priority over night is preserved; day unaffected
 ck('plain day still day',V.dayPart(sr+3600000,sr,ss,{prevSunsetMs:prevSet,nextSunriseMs:nextSr})==='day');
 ck('plain night still night',V.dayPart(ss+6*3600000,sr,ss)==='night');
}
// --- 7c. input validation: invalid input throws (UI renders pending), never silent numbers
{
 const base={positions:['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].map((g,i)=>({graha:g,longitude:(i*47+30)%360})),
  asc:10,ic:100,desc:190,mc:280,birthMs:Date.UTC(2000,0,1,12),sunriseMs:Date.UTC(2000,0,1,6),sunsetMs:Date.UTC(2000,0,1,18)};
 const throws=(mut,id)=>{let t=false;try{V.compute(mut({...base,positions:base.positions.map(p=>({...p}))}));}catch(e){t=true;}ck(id,t);};
 throws(x=>(x.birthMs=NaN,x),'NaN birthMs throws');
 throws(x=>(x.sunriseMs=x.sunsetMs,x),'sunrise==sunset throws');
 throws(x=>(x.sunriseMs=NaN,x),'NaN sunrise throws');
 throws(x=>(x.desc=x.asc,x),'duplicate anchors throw');
 throws(x=>(x.desc=185,x),'non-opposite Asc/Desc throws');
 throws(x=>(x.ic=270,x.desc=180,x.mc=90,x.asc=0,x),'wrapped anchors (0,270,180,90) fail one-revolution');
 {let ok=true;try{V.validateAnchors(0,90,180,270);}catch(e){ok=false;}ck('valid anchors (0,90,180,270) pass',ok);}
 {let t=false;try{V.validateAnchors(0,270,180,90);}catch(e){t=true;}ck('validateAnchors(0,270,180,90) throws (sum 1080)',t);}
 throws(x=>(x.ic=275,x),'non-opposite MC/IC throws');
 throws(x=>(x.positions=x.positions.slice(0,6),x),'six planets throw');
 throws(x=>(x.positions=[...x.positions,{graha:'Rahu',longitude:100}],x),'eight planets throw');
 throws(x=>(x.positions[1]={graha:'Sun',longitude:50},x),'duplicate planet throws');
 throws(x=>(x.positions[2].longitude=NaN,x),'NaN longitude throws (not silently dropped)');
 throws(x=>(x.positions[2].longitude=360,x),'longitude 360 throws');
 throws(x=>(x.positions[2].longitude=-1,x),'negative longitude throws');
 throws(x=>(x.prevSunsetMs=x.sunsetMs+1000,x),'prevSunsetMs after sunset throws');
 throws(x=>(x.nextSunriseMs=x.sunriseMs-1000,x),'nextSunriseMs before sunrise throws');
 // occupancy non-suppression: with a NaN longitude the OLD code filtered the planet out
 // (a -60 occupant class vanished to 0); now it must throw before any occupancy filtering.
 let occOk=true;try{V.compute({...base,positions:base.positions.map((p,i)=>i===2?{graha:'Mars',longitude:NaN}:{...p})});occOk=false;}catch(e){}
 ck('occupancy error surfaces (no silent 0)',occOk);
}
// --- 7d. actual panel-context fixture: 30 min before today's sunrise, Pisces madhya gets 15, back-first does not
{
 const sr=Date.UTC(2000,5,15,1),ss=Date.UTC(2000,5,15,14);
 const out=V.compute({positions:['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].map((g,i)=>({graha:g,longitude:(i*47+30)%360})),
  asc:345,ic:80,desc:165,mc:260,birthMs:sr-30*60000,sunriseMs:sr,sunsetMs:ss});
 const b1=out.bhavas[0];
 ck('pre-sunrise birth: bhava 1 (Pisces, ubhayodaya) morning twilight -> 15',b1.risingType==='ubhayodaya'&&out.bhavas[0].dayPart==='twilight'&&b1.rising===15);
 const backFirst=out.bhavas.find(b=>b.risingType==='prishthodaya');
 ck('pre-sunrise birth: back-first bhava gets 0 (NOT night-15)',backFirst&&backFirst.rising===0);
}
// --- 8. arc term (27.26-28 continuous-arc model; reference points = actual madhyas)
{
 // madhya 10 deg Aries -> Aries first-half -> IC group; arc = fold(madhya-ic)/3
 ck('arc Aries 1H half -> IC ref',Math.abs(V.arcTerm(10,0,90,180,270)-Math.abs(w180(10-90))/3)<1e-9);
 // Sagittarius first half -> Desc, second half -> IC
 ck('arc Sag 10deg -> Desc ref',V.arcRefSign(250)===7);
 ck('arc Sag 20deg -> IC ref',V.arcRefSign(260)===4);
 ck('arc Cap 10deg -> IC ref',V.arcRefSign(280)===4);
 ck('arc Cap 20deg -> MC ref',V.arcRefSign(290)===10);
 ck('arc Cancer -> Asc (BPHS; Raman differs)',V.arcRefSign(95)===1);
 ck('arc Pisces -> MC ref',V.arcRefSign(345)===10);
 ck('arc max 60 at opposition to reference',Math.abs(V.arcTerm(345,0,90,180,165)-60)<1e-9); // Pisces->MC ref=165, madhya opposite
 ck('arc zero at own reference',Math.abs(V.arcTerm(95,95,185,275,5))<1e-9); // Cancer madhya at Asc
}
// --- 9. occupant term (provisional once-per-class)
{
 ck('occ Me only +60',V.occupantTerm(['Mercury']).term===60&&!V.occupantTerm(['Mercury']).collision);
 ck('occ Me+Ju +60 once',V.occupantTerm(['Mercury','Jupiter']).term===60);
 ck('occ Su+Ma+Sa -60 once',V.occupantTerm(['Sun','Mars','Saturn']).term===-60);
 ck('occ both classes 0 + collision',V.occupantTerm(['Jupiter','Mars']).term===0&&V.occupantTerm(['Jupiter','Mars']).collision);
 ck('occ none 0',V.occupantTerm([]).term===0);
}
// --- 10. MC formula vs independent Swiss oracle (identical inputs, 1e-12;
// cross-model residuals measured+named, not acceptance tolerances)
{
 const mcTropical=(ramc,eps)=>{const r=ramc*Math.PI/180,e=eps*Math.PI/180;return mod(Math.atan2(Math.sin(r),Math.cos(r)*Math.cos(e))*180/Math.PI);};
 const oc=JSON.parse(fs.readFileSync(path.join(__dirname,'..','harness','mc-oracle.json'),'utf8')).cases;
 for(const r of oc){
  ck('MC formula @swiss-inputs '+r.utc,Math.abs(w180(mcTropical(r.swiss.armc,r.swiss.trueObliquity)-r.swiss.mc))<1e-12);
  ck('MC formula @bundle-inputs '+r.utc,Math.abs(w180(mcTropical(r.astronomyEngineProbe.ramc,r.astronomyEngineProbe.obliquity)-r.astronomyEngineProbe.mc))<1e-12);
  console.log('   measured model residual %s: mc=%+.5f arcsec (gast %+.5f, obl %+.5f)',r.utc,r.residualArcsec.mc,r.residualArcsec.gast,r.residualArcsec.obliquity);}
 const r2100=oc.find(r=>r.utc.includes('2100'));
 if(r2100)console.log('   NAMED future-epoch difference (2100): %+.5f arcsec, GAST-dominated, recorded not smoothed',r2100.residualArcsec.mc);
 ck('MC(RAMC)=RAMC at cardinal points',[0,90,180,270].every(ra=>Math.abs(w180(mcTropical(ra,23.4393)-ra))<1e-9));
 {let s2=4242;const rnd2=()=>{s2=(1103515245*s2+12345)%2147483648;return s2/2147483648;};
  const q=x=>Math.floor(mod(x)/90);let okq=true;
  for(let i=0;i<360;i++){const ra=rnd2()*360;if(q(mcTropical(ra,23.4393))!==q(ra))okq=false;}
  ck('MC quadrant preservation x360',okq);}
 ck('MC 360-periodic',Math.abs(w180(mcTropical(45,23.4393)-mcTropical(405,23.4393)))<1e-9);
}
// --- 11. compute() end-to-end: terms individually labeled, NO totals field
{
 const sr=Date.UTC(1918,9,16,8),ss=Date.UTC(1918,9,16,20); // rough day window
 const positions=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].map((g,i)=>({graha:g,longitude:mod(180+i*40)}));
 const out=V.compute({positions,asc:d(298,27),ic:d(36,36),desc:d(118,27),mc:d(216,36),birthMs:sr+3*3600000,sunriseMs:sr,sunsetMs:ss});
 ck('compute returns 12 bhavas',out.bhavas.length===12);
 ck('geometry label names sripati-madhya',/sripati-madhya/.test(out.geometry));
 ck('NO totals field anywhere',!('total' in out)&&out.bhavas.every(b=>!('total' in b)&&!('rank' in b)));
 ck('each bhava carries arc/rising/occupant labels',out.bhavas.every(b=>typeof b.arc==='number'&&typeof b.rising==='number'&&typeof b.occupant==='number'));
 ck('blocked list names bhavadhipathi + drishti with reasons',out.blocked.some(x=>/bhavadhipathi/.test(x)&&/FULL Shadbala Pinda/.test(x))&&out.blocked.some(x=>/drishti/.test(x)));
 ck('note forbids totals/ranks',/no bhava totals, ratios or ranks/.test(out.note));
 ck('note names provisional conventions',/PROVISIONAL/.test(out.note));
 ck('note names CIVIL-date day-part context',/CIVIL date of birth/.test(out.note));
}
// --- 12. civilBhavaEvents assembly via the real astro bundle (DST-safe, absolute ms)
{
 const vm=require('vm');const c={Date};vm.createContext(c);
 vm.runInContext(fs.readFileSync(path.join(__dirname,'..','astro-core.js'),'utf8'),c);const A=c.BrahmAstro;
 for(const [day,tz,lat,lon] of [['2000-06-15','Asia/Calcutta',28.6139,77.209],['2024-03-11','America/New_York',40.7128,-74.006],['2024-11-03','America/New_York',40.7128,-74.006]]){
  const l={latitude:lat,longitude:lon,timeZone:tz};
  const noon=A.grahaPositions?null:null;
  const birthNoon=new Date(Date.UTC(...(()=>{const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(day+'T12:00:00Z')).map(x=>[x.type,x.value]));return[+p.year,+p.month-1,+p.day,17,0,0];})()));
  const daily=A.dailyPanchanga(birthNoon,l);
  const birth=new Date(+new Date(daily.sunrise)-30*60000); // 30 min before civil sunrise
  const ev=V.civilBhavaEvents(A,birth,l);
  ck('assembly events present '+day+' '+tz,ev!==null&&Number.isFinite(ev.sunriseMs)&&Number.isFinite(ev.sunsetMs));
  ck('assembly order prev<sunrise<sunset<next '+day,ev.prevSunsetMs<ev.sunriseMs&&ev.sunriseMs<ev.sunsetMs&&ev.sunsetMs<ev.nextSunriseMs,
   {prev:ev.prevSunsetMs&&new Date(ev.prevSunsetMs).toISOString(),sr:new Date(ev.sunriseMs).toISOString(),ss:new Date(ev.sunsetMs).toISOString(),next:ev.nextSunriseMs&&new Date(ev.nextSunriseMs).toISOString()});
  ck('assembly sunrise is the birth civil-date sunrise '+day,ev.sunriseMs===+new Date(daily.sunrise));
  ck('30-min pre-sunrise classifies twilight '+day,V.dayPart(+birth,ev.sunriseMs,ev.sunsetMs,ev)==='twilight');
 }
}
console.log(`\n${pass} pass, ${fail} fail${bad.length?': '+bad.join(', '):''}`);
process.exit(fail?1:0);
