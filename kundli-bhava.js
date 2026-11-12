/* Original BrahmTatva extension. Bhava-bala INDIVIDUAL TERMS, BPHS 27.26-31.
Separate explicitly named SRIPATI MADHYA geometry - the app's whole-sign chart houses are
unchanged and never substituted here.
NOT computed (blocked/explicit): Bhavadhipathi-bala (needs each lord's FULL
Shadbala Pinda; planetary strength is incomplete/experimental - missing is not
zero), bhava drishti terms (27.28-29 aspect reading ambiguity unresolved; drik
classification experimental). NO bhava totals, ratios or ranks anywhere. */
(function(root){'use strict';
const mod=(x,n=360)=>{const r=x%n;return r<0?r+n:r;};
const fold=x=>{x=mod(x);return x>180?360-x:x;};
const wrap180=x=>{x=mod(x);return x>180?x-360:x;};

// --- Sripati madhya geometry: I=Asc, IV=IC, VII=Desc, X=MC; each forward
// quadrant trisected. Geometry fixture: Raman p21 (printed angles -> printed
// madhyas within 1/3 arcmin) - a geometry check, not a modern-astronomy golden.
function madhyas(asc,ic,desc,mc){
 const a=[mod(asc),mod(ic),mod(desc),mod(mc)],out=[];
 for(let q=0;q<4;q++){
  const step=mod(a[(q+1)%4]-a[q])/3;
  for(let k=0;k<3;k++)out.push(mod(a[q]+k*step));}
 return out;}
// Occupancy boundaries halfway between adjacent madhyas; half-open [start,end)
// forward; exact sandhi belongs to the NEXT bhava (named convention).
function boundaries(mad){return mad.map((m,i)=>mod(mad[(i+11)%12]+mod(m-mad[(i+11)%12])/2));}
function bhavaOf(lon,bound){
 lon=mod(lon);const hits=[];
 for(let i=0;i<12;i++){const s=bound[i],w=mod(bound[(i+1)%12]-s);
  if(mod(lon-s)<w)hits.push(i+1);}
 if(hits.length!==1)throw new Error('bhavaOf: longitude in '+hits.length+' bhavas');
 return hits[0];}

// --- 27.26-28 arc term (BPHS continuous-arc model; Raman art131 integer
// bhava-distance x10 is a DIFFERENT model - Ex59 rows are not a golden here).
// Reference points use the actual angular madhyas (I/IV/VII/X), per decisions.
const ARC_REF_GROUPS=[
 {signs:[5,2,6,10],ref:7},{signs:[1,0,4],ref:4},          // whole-sign entries
 {signs:[3,7],ref:1},{signs:[11],ref:10}];                // Cancer+Scorpio -> Lagna (BPHS; Raman differs for Cancer)
function arcRefSign(madhya){
 const s=Math.floor(mod(madhya)/30),d=mod(madhya)%30;
 if(s===8)return d<15?7:4;       // Sagittarius: first half -> 7H, latter -> 4H
 if(s===9)return d<15?4:10;      // Capricorn: first half -> 4H, latter -> 10H
 for(const g of ARC_REF_GROUPS)if(g.signs.includes(s))return g.ref;
 throw new Error('arcRefSign: unmapped sign '+s);}
function arcTerm(madhya,asc,ic,desc,mc){
 const refs={1:asc,4:ic,7:desc,10:mc};
 return fold(madhya-refs[arcRefSign(madhya)])/3;}

// --- 27.31 rising-type term. Classification by the sign containing the MADHYA.
// Rising groups per Saravali 3.24 (cited because BPHS4 web translations
// conflict on Scorpio/Sagittarius); ubhayodaya = Pisces ONLY (BPHS 4.23).
const HEAD_FIRST=new Set([2,4,5,6,7,10]),BACK_FIRST=new Set([0,1,3,8,9]); // both-ways: 11
function risingType(madhya){
 const s=Math.floor(mod(madhya)/30);
 if(HEAD_FIRST.has(s))return 'shirshodaya';
 if(BACK_FIRST.has(s))return 'prishthodaya';
 if(s===11)return 'ubhayodaya';
 throw new Error('risingType: unmapped sign '+s);}
// Twilight: PROVISIONAL cross-chapter transfer of BPHS 9.14 - 72 min BEFORE
// half-disc sunrise and 72 min AFTER half-disc sunset (labeled transfer, not a
// 27.31 mandate; BPHS 46.44's 5-ghati-each-side recorded as the alternative).
// NOTE: app sunrise/sunset events are assumed upper-limb contacts; the
// half-disc vs upper-limb difference is an unresolved approximation, named in
// the UI note (not silently absorbed).
// CONTEXT CONTRACT: sunriseMs/sunsetMs are the CIVIL
// DATE OF BIRTH's events - NOT the Kala jyotish-day context. A birth 30 min
// before today's sunrise is MORNING TWILIGHT of today (Pisces/ubhayodaya gets
// 15); rolling to the previous day's events would misread it as night. The
// Kala jyotish-day rollover stays in kundli-bala.js where it belongs.
function assertCivilDayEvents(sunriseMs,sunsetMs){
 if(!Number.isFinite(sunriseMs)||!Number.isFinite(sunsetMs))
  throw new Error('bhava dayPart: finite civil-date sunrise/sunset required');
 if(sunriseMs>=sunsetMs)
  throw new Error('bhava dayPart: civil-date events must satisfy sunrise < sunset (jyotish-day rollover context is invalid here)');}
const TWILIGHT_MIN=72;
// Day-part at the birth MOMENT (27.31), from absolute-ms event times. NEIGHBORING
// windows are considered, not just the civil-date pair: the evening window can
// cross midnight (previous sunset's +72min reaches into the birth's civil date)
// and at high latitudes the morning window of the NEXT sunrise can start before
// local midnight. Twilight has priority over day/night; overlapping twilight
// windows still classify as twilight.
function dayPart(birthMs,sunriseMs,sunsetMs,neighbors){
 if(!Number.isFinite(birthMs))throw new Error('bhava dayPart: finite birth time required');
 const tw=TWILIGHT_MIN*60000,nb=neighbors||{};
 const inWindow=(a,b)=>birthMs>=a&&birthMs<b;
 const twilight=inWindow(sunriseMs-tw,sunriseMs)||inWindow(sunsetMs,sunsetMs+tw)
  ||(nb.nextSunriseMs!=null&&inWindow(nb.nextSunriseMs-tw,nb.nextSunriseMs))
  ||(nb.prevSunsetMs!=null&&inWindow(nb.prevSunsetMs,nb.prevSunsetMs+tw));
 if(twilight)return 'twilight';
 if(inWindow(sunriseMs,sunsetMs))return 'day';
 return 'night';}
// Assemble the birth's CIVIL-date events plus neighbor windows from the astro
// bundle, keyed by LOCAL calendar dates through the bundle's own DST-safe helpers
// (never +/-86400000). Used by the UI; exercised directly by node tests.
// Named limitation: the previous-sunset search starts 12h before local midnight,
// so a previous-day sunset before local noon (extreme latitudes) is not found.
function civilBhavaEvents(A,birth,l){
 const daily=A.dailyPanchanga(birth,l);
 if(!daily.sunrise||!daily.sunset)return null;  // polar day/night: caller shows pending
 const next=A.riseSet('rise',A.nextLocalDayStartUTC(birth,l.timeZone),l);
 const prev=A.riseSet('set',A.startOfLocalDayUTC(birth,l.timeZone)-12*3600000,l);
 return {sunriseMs:+new Date(daily.sunrise),sunsetMs:+new Date(daily.sunset),
  nextSunriseMs:next?+new Date(next):undefined,prevSunsetMs:prev?+new Date(prev):undefined};}
function risingTerm(madhya,part){
 const t=risingType(madhya);
 return (t==='shirshodaya'&&part==='day')||(t==='ubhayodaya'&&part==='twilight')||(t==='prishthodaya'&&part==='night')?15:0;}

// --- 27.30 occupant term, PROVISIONAL once-per-class convention (the verse
// does not settle once-per-class vs once-per-occupant; collisions explicit).
const OCC_BEN=new Set(['Mercury','Jupiter']),OCC_MAL=new Set(['Sun','Mars','Saturn']);
function occupantTerm(occupants){
 const ben=occupants.some(p=>OCC_BEN.has(p)),mal=occupants.some(p=>OCC_MAL.has(p));
 return {term:(ben?60:0)-(mal?60:0),collision:ben&&mal};}

const SEVEN=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
function assertFinite(x,name){if(!Number.isFinite(x))throw new Error('bhava compute: '+name+' must be finite');}
function validateAnchors(asc,ic,desc,mc){
 assertFinite(asc,'asc');assertFinite(ic,'ic');assertFinite(desc,'desc');assertFinite(mc,'mc');
 const opp=(a,b)=>Math.abs(Math.abs(wrap180(a-b))-180)<1e-9;
 if(!opp(asc,desc))throw new Error('bhava compute: Asc and Desc must be exactly opposite');
 if(!opp(mc,ic))throw new Error('bhava compute: MC and IC must be exactly opposite');
 const q=[mod(ic-asc),mod(desc-ic),mod(mc-desc),mod(asc-mc)]; // forward widths
 if(q.some(w=>w<=1e-9))throw new Error('bhava compute: duplicate or non-ordered anchors');
 // one forward revolution: widths must sum to exactly one circle (rejects wrapped sets
 // like (0,270,180,90) whose four 270-degree widths pass opposition and positivity)
 if(Math.abs(q[0]+q[1]+q[2]+q[3]-360)>1e-9)throw new Error('bhava compute: anchors do not span one forward revolution');}
function validatePositions(positions){
 if(!Array.isArray(positions)||positions.length!==7)throw new Error('bhava compute: exactly the seven classical planets required');
 const names=positions.map(p=>p.graha);
 if(new Set(names).size!==7||!SEVEN.every(g=>names.includes(g)))
  throw new Error('bhava compute: the seven classical planets, unique, no others');
 for(const p of positions){assertFinite(p.longitude,'longitude of '+p.graha);
  if(p.longitude<0||p.longitude>=360)throw new Error('bhava compute: longitude of '+p.graha+' outside [0,360)');}}
function validateEventTimes(input){
 const {birthMs,sunriseMs,sunsetMs,prevSunsetMs,nextSunriseMs}=input;
 assertFinite(birthMs,'birthMs');
 assertCivilDayEvents(sunriseMs,sunsetMs); // finite + sunrise < sunset, civil-date pair
 if(prevSunsetMs!=null){assertFinite(prevSunsetMs,'prevSunsetMs');
  if(prevSunsetMs>=sunsetMs)throw new Error('bhava compute: prevSunsetMs must precede sunsetMs');}
 if(nextSunriseMs!=null){assertFinite(nextSunriseMs,'nextSunriseMs');
  if(nextSunriseMs<=sunriseMs)throw new Error('bhava compute: nextSunriseMs must follow sunriseMs');}}
function compute(input){
 const {positions,asc,ic,desc,mc,birthMs,sunriseMs,sunsetMs,prevSunsetMs,nextSunriseMs}=input;
 validateAnchors(asc,ic,desc,mc);validatePositions(positions);validateEventTimes(input);
 const mad=madhyas(asc,ic,desc,mc),bound=boundaries(mad),
  part=dayPart(birthMs,sunriseMs,sunsetMs,{prevSunsetMs,nextSunriseMs});
 const bhavas=mad.map((m,i)=>{
  const occupants=positions.filter(p=>bhavaOf(p.longitude,bound)===i+1).map(p=>p.graha); // occupancy errors surface, never suppressed
  const occ=occupantTerm(occupants);
  return {bhava:i+1,madhya:m,risingType:risingType(m),dayPart:part,
   arc:arcTerm(m,asc,ic,desc,mc),rising:risingTerm(m,part),
   occupant:occ.term,occupantCollision:occ.collision,occupants};});
 return {geometry:'sripati-madhya (separate from whole-sign chart)',bhavas,
  blocked:['bhavadhipathi-bala: needs each lord\'s FULL Shadbala Pinda; planetary strength incomplete/experimental - missing is not zero, no substitution',
   'bhava-drishti terms: 27.28-29 aspect reading (additional-full vs replacement) unresolved; drik classification experimental'],
  note:'Individual source-labeled terms only - no bhava totals, ratios or ranks. 27.30 once-per-class and 27.31 twilight-window conventions are PROVISIONAL and labeled; twilight windows assume upper-limb rise/set events pending a half-disc budget. Day/twilight/night uses the CIVIL date of birth\'s sunrise/sunset, separate from the Kala jyotish-day context.'};}
const api={compute,madhyas,boundaries,bhavaOf,arcTerm,arcRefSign,risingType,risingTerm,dayPart,occupantTerm,assertCivilDayEvents,civilBhavaEvents,validateAnchors,validatePositions,TWILIGHT_MIN};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmBhava=api;
})(typeof window!=='undefined'?window:globalThis);
