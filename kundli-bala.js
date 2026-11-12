/* Original BrahmTatva extension. BPHS ch.27 (Shadbala) formulas + ch.26 sphuta drishti.
Sources, conventions and mat-bhed records: docs/bala-ledger-draft.md (v0.7). Convention
choices there are recorded with their evidence; build-scope approval belongs to the project
review process, not to this file.
Not computed here (explicit): Graha-yuddha (no source definition), Bhava-bala totals
(individual 27.26-31 terms live separately in kundli-bhava.js). Mars-Saturn Cheshta is
computed ONLY when input.cheshtaCtx is supplied; otherwise its unmodeled note stands.
Partial sums only - never presented as full Shadbala. All angles zero-based degrees. */
(function(root){'use strict';
const mod=(x,n=360)=>{const r=x%n;return r<0?r+n:r;};
const fold=x=>{x=mod(x);return x>180?360-x:x;};
const PLANETS=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const FALL={Sun:190,Moon:213,Mars:118,Mercury:345,Jupiter:275,Venus:177,Saturn:20}; // ch3.49-50 deep-fall
const WEAKHOUSE={Sun:4,Moon:10,Mars:4,Mercury:7,Jupiter:7,Venus:10,Saturn:1}; // 27.7-7.5 powerless cusp
const GENDER={Sun:'M',Moon:'F',Mars:'M',Mercury:'N',Jupiter:'M',Venus:'F',Saturn:'N'}; // ch3.19
const NAIS_RANK={Saturn:1,Mars:2,Mercury:3,Jupiter:4,Venus:5,Moon:6,Sun:7}; // 27.14
const NATURAL={ // ch3.55 printed table
 Sun:{friend:['Moon','Mars','Jupiter'],enemy:['Venus','Saturn'],neutral:['Mercury']},
 Moon:{friend:['Sun','Mercury'],enemy:[],neutral:['Mars','Jupiter','Venus','Saturn']},
 Mars:{friend:['Sun','Moon','Jupiter'],enemy:['Mercury'],neutral:['Venus','Saturn']},
 Mercury:{friend:['Sun','Venus'],enemy:['Moon'],neutral:['Mars','Jupiter','Saturn']},
 Jupiter:{friend:['Sun','Moon','Mars'],enemy:['Mercury','Venus'],neutral:['Saturn']},
 Venus:{friend:['Mercury','Saturn'],enemy:['Moon','Sun'],neutral:['Mars','Jupiter']},
 Saturn:{friend:['Mercury','Venus'],enemy:['Sun','Moon','Mars'],neutral:['Jupiter']}};
const DREK_NEED={M:1,N:2,F:3}; // 27.6: male/neuter/female -> 1st/middle/last (vedicpupil+Raman; jyotishvidya conflict recorded)
const KHANDA=[[0,0],[30,45],[60,78],[90,90]]; // 27.15-17 piecewise lavas (cumulative 45/33/12)
const CHALDEAN=['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
const WEEKDAY_LORD=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn']; // Sunday first
const OWN_SIGNS={Sun:[4],Moon:[3],Mars:[0,7],Mercury:[2,5],Jupiter:[8,11],Venus:[1,6],Saturn:[9,10]};
// Moolatrikona: D1 (rasi) only, and within the BPHS 3.51-54 degree zone (reviewer 12:33 ruling).
// Mat-bhed recorded in ledger: Raman reads the full rasi; the BPHS verse's all-seven-vargas reading
// is also recorded. [rasi, zoneStartDeg, zoneEndDeg):
const MT_ZONE={Sun:[4,0,20],Moon:[1,3,30],Mars:[0,0,12],Mercury:[5,15,20],Jupiter:[8,0,10],Venus:[6,0,15],Saturn:[10,0,20]};
function isMT(lon,p){const [s,lo,hi]=MT_ZONE[p];const r=Math.floor(mod(lon)/30),d=mod(lon)%30;return r===s&&d>=lo&&d<hi;}
const SAPTA_VALUES={mt:45,own:30,greatfriend:20,friend:15,neutral:10,enemy:4,greatenemy:2}; // BPHS 27.2-4 (Raman p.22 values differ - not used)
const DAY_MS=86400000;

function uchchaBala(lon,p){return fold(lon-FALL[p])/3;}
function digBala(lon,asc,p){const cusp=mod(asc+(WEAKHOUSE[p]-1)*30);return fold(lon-cusp)/3;}
function naisargikaBala(p){return 60/7*NAIS_RANK[p];}
function kendradiBala(lon,asc){const h=mod(Math.floor(mod(lon)/30)-Math.floor(mod(asc)/30),12)+1;return h%3===1?{1:60,4:60,7:60,10:60}[h]||60:(h%3===2?30:15);}
function ojhaYugmaRasi(lon,p){const odd=Math.floor(mod(lon)/30)%2===0;const wantsEven=(p==='Moon'||p==='Venus');return (wantsEven?!odd:odd)?15:0;}
function ojhaYugmaNavamsa(lon,p,varga){const ns=varga(lon,9).rashi;const odd=ns%2===0;const wantsEven=(p==='Moon'||p==='Venus');return (wantsEven?!odd:odd)?15:0;}
function drekkanaBala(lon,p){const d=Math.floor(mod(lon)%30/10)+1;return d===DREK_NEED[GENDER[p]]?15:0;}
function pakshaBala(sun,moon,p){const pb=fold(moon-sun)/3;return ['Moon','Mercury','Venus','Jupiter'].includes(p)?pb:60-pb;} // 27.10-11, Mercury unconditional
function nathonnathaBala(birthMs,transitMs,p){let d=Math.abs(birthMs-transitMs)/3600000;d=Math.min(d,24-d);const ghatis=d*2.5;if(p==='Mercury')return 60;return ['Moon','Mars','Saturn'].includes(p)?2*ghatis:60-2*ghatis;} // 27.8-9, true-transit noon reference
function tribhagaBala(birthMs,sunriseMs,sunsetMs,nextSunriseMs,p){if(p==='Jupiter')return 60;let t,third,day;
 if(birthMs>=sunriseMs&&birthMs<sunsetMs){day=true;third=(sunsetMs-sunriseMs)/3;t=birthMs-sunriseMs;}
 else{day=false;const ns=nextSunriseMs??sunriseMs+DAY_MS;
  if(birthMs<sunsetMs)throw new Error('tribhagaBala: night birth before the given sunset - pass the PREVIOUS sunset (pre-sunrise rollover)');
  third=(ns-sunsetMs)/3;t=birthMs-sunsetMs;}
 const k=Math.min(2,Math.floor(t/third));
 const dayLords=['Mercury','Sun','Saturn'],nightLords=['Moon','Venus','Mars'];
 return (day?dayLords[k]:nightLords[k])===p?60:0;} // 27.12
function varaBala(weekday,p){return WEEKDAY_LORD[weekday]===p?45:0;} // 27.13 dina-lord 45
function horaBala(birthMs,sunriseMs,weekday,p){const dayLord=WEEKDAY_LORD[weekday];const start=CHALDEAN.indexOf(dayLord);
 const n=Math.floor((birthMs-sunriseMs)/3600000); // Raman Rule 1: equal 1-hour horas from sunrise,
 // cycle continues UNWRAPPED past 24h (a >24h solar day has a 25th hora before the next sunrise)
 if(n<0)throw new Error('horaBala: birth before sunriseMs - pass the previous sunrise (jyotish-day rollover)');
 return CHALDEAN[(start+n)%7]===p?60:0;} // 27.13 hora-lord 60
// Civil-date helpers for jyotish-day rollover (reviewer 12:38: NEVER subtract 86400000 -
// across a DST transition that skips/duplicates a local calendar date; select the previous
// LOCAL calendar date).
function localDateString(ms,timeZone){return new Intl.DateTimeFormat('en-CA',{timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(ms));}
function previousLocalDateString(ms,timeZone){const [y,m,d]=localDateString(ms,timeZone).split('-').map(Number);return new Date(Date.UTC(y,m-1,d-1)).toISOString().slice(0,10);}
function lavas(b){for(let i=1;i<KHANDA.length;i++){if(b<=KHANDA[i][0]){const[x0,y0]=KHANDA[i-1],[x1,y1]=KHANDA[i];return y0+(y1-y0)*(b-x0)/(x1-x0);}}return 90;}
function ayanaBala(lonSidereal,ayanamsa,p){const sayana=mod(lonSidereal+ayanamsa);const q=mod(sayana,180);const bhuja=Math.min(q,180-q);
 const lv=lavas(bhuja);const north=sayana<180;let add;
 if(p==='Mercury')add=true;else if(['Sun','Mars','Jupiter','Venus'].includes(p))add=north;else add=!north; // 27.15-17 sign rules
 return (90+(add?lv:-lv))/3;} // BPHS-khanda primary; up to ~1 virupa vs declination method (ledger note)
function cheshtaBalaSunMoon(sun,moon,p,ayanaSun,pakshaMoon){if(p==='Sun')return ayanaSun;if(p==='Moon')return pakshaMoon;return null;} // 27.18, counted once here and once in kala - no doubling
// Cheshta (Mars-Saturn), BPHS 27.24-25 cheshta-kendra scheme with the MODERN
// mean-elements convention. Sources/decisions: docs/bala-ledger-draft.md (v0.9),
// docs/frame-time-resolution-draft.md. Convention names, not accuracy claims:
// "Simon et al. 1994 sec5.9 mean longitudes (VSOP87/JASON84-based), of-date mean
// equinox; true input = app apparent geocentric sidereal + mean ayanamsha
// (apparent-geocentric in mean-equinoctial-longitude convention, not strict
// mean-frame identity); TDB approximated by TT (IAU 2006 B3: <2ms)."
// Simon 1994 sec5.9.1-5.9.6 lambda coefficients (arcseconds for t^1..t^6;
// t = Julian MILLENNIA from J2000). Second-transcribed from the paper's page
// images twice (worker + reviewer), 4 initial-transcription deltas resolved:
// Mercury t3 .06522, Saturn t4 -.35004, Saturn t6 +.00103, Jupiter t6 -.00014.
const SIMON_LAMBDA={
 Mercury:[252.25090552,5381066598.20037,109.25943,0.06522,-0.23500,-0.00179,0.00020],
 Venus:[181.97980085,2106691666.31989,111.65021,0.05368,-0.23516,-0.00179,0.00020],
 Earth:[100.46645683,1296027711.03429,109.15809,0.07207,-0.23530,-0.00180,0.00020],
 Mars:[355.43299958,689101069.33069,111.78674,0.05624,-0.23516,-0.00180,0.00020],
 Jupiter:[34.35151874,109306899.89453,80.38700,0.13327,-0.18850,0.00411,-0.00014],
 Saturn:[50.07744430,44046398.47038,186.86817,-0.10748,-0.35004,-0.01630,0.00103]};
function meanLambda(planet,jdTt){
 const t=(jdTt-2451545.0)/365250.0,c=SIMON_LAMBDA[planet];
 let a=0;for(let k=1;k<=6;k++)a+=c[k]*Math.pow(t,k);
 return mod(c[0]+a/3600.0);}
const wrap180=x=>{x=mod(x);return x>180?x-360:x;};
// Low-level formula (fixture-direct): midpoint between mean and true, kendra from apogee.
function cheshtaFromComponents(mean,trueME,apogee){
 const midpoint=mod(mean+wrap180(trueME-mean)/2); // angle-lifted averaging
 return Math.abs(wrap180(apogee-midpoint))/3;}
// Guard policy: INCLUSIVE UTC birth years 1900..2100 (the app form's policy), applied
// on JD_TT with the boundary DeltaT shift named exactly - NOT an "equal ranges" claim:
//   MIN = engine TT of 1900-01-01T00:00:00Z  = 2415020.4999680677 (DeltaT -2.7589 s), INCLUSIVE
//   MAX = engine TT of 2101-01-01T00:00:00Z  = 2488434.502372775 (DeltaT +205.008 s), EXCLUSIVE
// So the whole of 2100 computes down to the last millisecond (2100-12-31T23:59:59.999Z
// is inside), and the first instant of 2101 is rejected.
const CHESHTA_GUARD_JD_MIN=2415020.4999680677,CHESHTA_GUARD_JD_MAX=2488434.502372775;
function cheshtaBalaTara(p,trueSiderealLon,meanAyanamsha,jdTt){
 if(p==='Sun'||p==='Moon')return null;               // 27.18 handled by cheshtaBalaSunMoon
 if(!Number.isFinite(jdTt)||!Number.isFinite(meanAyanamsha)||!Number.isFinite(trueSiderealLon))return null; // NaN never passes the guard
 if(jdTt<CHESHTA_GUARD_JD_MIN||jdTt>=CHESHTA_GUARD_JD_MAX)return null; // guard: MIN inclusive, MAX exclusive; unavailable, NOT zero
 const meanSun=mod(meanLambda('Earth',jdTt)+180);
 const lam=meanLambda(p,jdTt);
 const inner=(p==='Mercury'||p==='Venus');
 const mean=inner?meanSun:lam,apogee=inner?lam:meanSun;  // sheeghrochcha mapping (Raman pp75-78 support)
 const trueME=mod(trueSiderealLon+meanAyanamsha);        // named frame convention
 return cheshtaFromComponents(mean,trueME,apogee);}
// ch26.6-12 sphuta drishti value (cross-read in two translations; reviewer spec.py)
function drishtiValue(d,planet){d=mod(d);const x=d%30,sg=Math.floor(d/30);
 if(planet==='Saturn'){if(sg===1)return 2*x;if(sg===9)return 2*(30-x);if(sg===2)return 60-x/2;if(sg===8)return x+30;}
 if(planet==='Mars'){if(sg===3||sg===7)return 60-x;if(sg===2)return 1.5*x+15;if(sg===6)return 60;}
 if(planet==='Jupiter'){if(sg===3||sg===7)return x/2+45;if(sg===4||sg===8)return 60-x;}
 if(d<30)return 0;if(d<60)return (d-30)/2;if(d<90)return d-45;if(d<120)return 30+(120-d)/2;
 if(d<150)return 150-d;if(d<180)return 2*(d-150);if(d<300)return (300-d)/2;return 0;}
function isBeneficForDrik(p,positions){const get=g=>positions.find(q=>q.graha===g);
 if(p==='Mercury'){const me=get('Mercury');return !['Sun','Mars','Saturn'].some(g=>{const o=get(g);return o&&Math.floor(mod(o.longitude)/30)===Math.floor(mod(me.longitude)/30);});}
 if(p==='Moon'){const s=get('Sun'),m=get('Moon');return mod(m.longitude-s.longitude)<180;} // waxing benefic (convention note: ch3.11 "decreasing Moon")
 return ['Jupiter','Venus'].includes(p);}
// 27.19: benefic aspect +quarter, malefic aspect -quarter, Jupiter full-add; Mercury full-add
// when benefic, malefic -quarter when conjoined with a malefic (ch3.11) - provisional, see note.
function drikBala(p,positions){const me=positions.find(q=>q.graha===p);let total=0;
 for(const o of positions){if(o.graha===p)continue;const v=drishtiValue(me.longitude-o.longitude,o.graha);if(v<=0)continue; // 26.6: aspecting subtracted FROM aspected (target - aspecter)
  if(o.graha==='Jupiter')total+=v;
  else if(o.graha==='Mercury')total+=isBeneficForDrik('Mercury',positions)?v:-v/4;
  else total+=isBeneficForDrik(o.graha,positions)?v/4:-v/4;}
 return total;}
function compoundRelation(p,other,positions){ // ch3.55-58: natural + temporary -> five-fold
 const nat=NATURAL[p].friend.includes(other)?'friend':NATURAL[p].enemy.includes(other)?'enemy':'neutral';
 const a=positions.find(q=>q.graha===p),b=positions.find(q=>q.graha===other);
 const h=mod(Math.floor(mod(b.longitude)/30)-Math.floor(mod(a.longitude)/30),12)+1;
 const temp=[2,3,4,10,11,12].includes(h)?'friend':'enemy';
 if(nat==='friend'&&temp==='friend')return 'greatfriend';
 if(nat==='enemy'&&temp==='enemy')return 'greatenemy';
 if((nat==='friend'&&temp==='enemy')||(nat==='enemy'&&temp==='friend'))return 'neutral';
 return nat==='neutral'?temp:nat;}
function saptavargaScore(lon,p,positions,varga,vargas){ // BPHS 27.2-4 values; compound friendship convention (no golden)
 const LORDS=['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
 let total=0,detail=[];
 for(const n of vargas){const sign=varga(lon,n).rashi;let key;
  if(n===1&&isMT(lon,p))key='mt';else if(OWN_SIGNS[p].includes(sign))key='own';
  else key=compoundRelation(p,LORDS[sign],positions);
  total+=SAPTA_VALUES[key];detail.push({varga:n,sign,relation:key,value:SAPTA_VALUES[key]});}
 return {total,detail};}
const AHARGANA_EPOCH=Date.UTC(1827,4,1); // Raman/Sripati schematic convention - NOT BPHS method
function abdaMasaLords(birthMs){const A=Math.floor((birthMs-AHARGANA_EPOCH)/DAY_MS);
 const yv=3*Math.floor(A/360)+1,mv=2*Math.floor(A/30)+1;
 const fromWed=v=>WEEKDAY_LORD[mod(v-1+3,7)]; // condensed count, 1-indexed from Wednesday; reproduces Raman (Saturn/Mercury) and his Table I epoch values 33116/33405 exactly
 return {abdaLord:fromWed(yv),masaLord:fromWed(mv),ahargana:A};}
function abdaBala(lords,p){return lords.abdaLord===p?15:0;}
function masaBala(lords,p){return lords.masaLord===p?30:0;}

// Apparent solar transit (local true noon, for Nathonnatha 27.8-9 ruling): solve LST = Sun RA.
// Standard Meeus constants (Astronomical Algorithms ch.12/22): GMST polynomial and mean
// obliquity; nutation (<20s of time) ignored. Sun RA from the caller's sidereal longitude +
// ayanamsha (tropical conversion). Iterated from the rise/set midpoint; converges to <1s.
// Astronomy, not a jyotish convention.
const D2R=Math.PI/180;
function solarTransitMs(sunriseMs,sunsetMs,lonEastDeg,sunSiderealFn,ayanamshaFn){
 let t=(sunriseMs+sunsetMs)/2;
 for(let i=0;i<4;i++){
  const jd=t/86400000+2440587.5,T=(jd-2451545)/36525;
  const eps=23+26/60+21.448/3600-(46.8150/3600)*T-(0.00059/3600)*T*T+(0.001813/3600)*T*T*T;
  const lam=mod(sunSiderealFn(t)+ayanamshaFn(t))*D2R;
  const ra=mod(Math.atan2(Math.sin(lam)*Math.cos(eps*D2R),Math.cos(lam))/D2R);
  const gmst=mod(280.46061837+360.98564736629*(jd-2451545)+0.000387933*T*T-T*T*T/38710000);
  let delta=ra-mod(gmst+lonEastDeg);delta=((delta+540)%360)-180;
  t+=delta/15.0410686*3600000;
 }
 return t;}

const PROVISIONAL=[{id:'drik-classification',note:'Drik-bala computed per BPHS 26.6-12 sphuta drishti (aspected minus aspecting) + 27.19 weighting; benefic/malefic classification is a CHOSEN CONVENTION, provisional pending verified incoming-aspect/classifier fixtures: waxing Moon benefic / waning malefic (ch3.11); Mercury malefic only when conjoined with Sun/Mars/Saturn (ch3.11), in which case it is treated under the malefic -quarter rule instead of the 27.19 Mercury full-add; Jupiter always full-add. The literal 27.19 wording (Mercury full-add without qualification) is the alternative reading, recorded for the review. Raman pp85-88 uses a different model (general aspect + fixed special additions 15/30/45, all quarter-weighted) and is NOT a golden for this model - cross-convention sign comparison withdrawn (reviewer 12:34 Q2).'},{id:'drik-26-12-coefficient',note:'SOURCE CONFLICT unresolved (bala audit 11 Nov 17:11): this module computes Jupiter 4/8-sign intervals as 60-x, following the jyotishvidya/siva.sh English translations; the Sanskrit of 26.12 (dvigunais tu lavaish chonaah kharasaash chaturashtabhe, verified siva.sh/vedicpupil) reads 60-2x (doubled elapsed degrees). vedicpupil English preserves the doubling; the other two translations omit it. Fixture impact measured: 3 of 21 fixture cells change materially (F1Mars, F3Sun, F3Mars; see docs/yuddha-drik-research-ledger-draft.md). No numeric patch applied; both readings preserved pending explicit source resolution.'},{id:'drik-27-19-weighting',note:'SOURCE READING unresolved (bala audit 11 Nov 17:11): 27.19 quarters malefic/benefic aspects and then SUPERADDS the entire Mercury and Jupiter aspects (additive on top of quarters); this module uses REPLACEMENT weighting (Jupiter/Mercury counted once at full). Measured delta example F1Saturn: replacement 84.93548 vs quarter-plus-superadd 107.80056. The Mercury-malefic question is separate and also open. Both readings preserved; drik remains experimental and outside partial sums.'}];
const UNMODELED=[
 {id:'cheshta-ma-sa',note:'Cheshta (Mars-Saturn): computed when cheshtaCtx (jdTt + meanAyanamsha) is supplied and inside the 1900-2100 guard; otherwise not computed.'},
 {id:'yuddha',note:'Graha-yuddha (27.20): verse gives no war definition; Raman rule is Sripati-based without golden; not computed.'},
 {id:'bhava-bala',note:'Bhava-bala (27.26-31): read but not cross-checked; not computed in this increment.'}];
// Input-time convention (jyotish day, NOT civil date): sunriseMs and weekday belong to the
// sunrise that OPENS the current jyotish day (for a pre-sunrise birth: the PREVIOUS civil
// date's sunrise and weekday). sunsetMs is the most recent sunset bounding the birth
// (previous evening's for a pre-sunrise birth). nextSunriseMs is the next sunrise after birth.
function compute(input){
 const {positions,lagna,birthMs,weekday,sunriseMs,sunsetMs,nextSunriseMs,transitMs,ayanamsa,varga}=input;
 if(birthMs<sunriseMs)throw new Error('compute: birth before sunriseMs - pass the previous civil date sunrise and weekday for a pre-sunrise birth (jyotish-day rollover)');
 const sun=positions.find(p=>p.graha==='Sun').longitude,moon=positions.find(p=>p.graha==='Moon').longitude;
 const vargasFn=varga||root.BrahmJyotish?.varga;
 const pakshaMoon=pakshaBala(sun,moon,'Moon'),ayanaSun=ayanaBala(sun,ayanamsa,'Sun');
 const lords=abdaMasaLords(birthMs);
 const planets=positions.filter(p=>PLANETS.includes(p.graha)).map(p=>{
  const g=p.graha;
  const sthana={uchcha:uchchaBala(p.longitude,g),saptavargaja:saptavargaScore(p.longitude,g,positions,vargasFn,[1,2,3,7,9,12,30]),
   ojhayugma:ojhaYugmaRasi(p.longitude,g)+ojhaYugmaNavamsa(p.longitude,g,vargasFn),kendradi:kendradiBala(p.longitude,lagna),
   drekkana:drekkanaBala(p.longitude,g)};
  sthana.total=sthana.uchcha+sthana.saptavargaja.total+sthana.ojhayugma+sthana.kendradi+sthana.drekkana;
  const dig=digBala(p.longitude,lagna,g); // separate sixfold bucket - NOT a Sthana subcomponent
  const kala={nathonnatha:nathonnathaBala(birthMs,transitMs,g),paksha:pakshaBala(sun,moon,g),
   tribhaga:tribhagaBala(birthMs,sunriseMs,sunsetMs,nextSunriseMs,g),abda:abdaBala(lords,g),masa:masaBala(lords,g),
   vara:varaBala(weekday,g),hora:horaBala(birthMs,sunriseMs,weekday,g),ayana:ayanaBala(p.longitude,ayanamsa,g)};
  kala.total=kala.nathonnatha+kala.paksha+kala.tribhaga+kala.abda+kala.masa+kala.vara+kala.hora+kala.ayana;
  let cheshta=cheshtaBalaSunMoon(sun,moon,g,ayanaSun,pakshaMoon);
  if(cheshta==null&&input.cheshtaCtx)
   cheshta=cheshtaBalaTara(g,p.longitude,input.cheshtaCtx.meanAyanamsha,input.cheshtaCtx.jdTt);
  const drik=drikBala(g,positions);
  // Reviewer 12:34 Q2: drik EXCLUDED from the numeric partial sum until verified
  // incoming-aspect/classifier fixtures exist; kept as a separate experimental field.
  return {graha:g,sthana,dig,kala,cheshta,naisargika:naisargikaBala(g),drik,
   partialSum:sthana.total+dig+kala.total+(cheshta??0)+naisargikaBala(g)};});
 // Availability = a finite, in-guard context (reviewer: presence of an object is not availability).
 const _cc=input.cheshtaCtx;
 const cheshtaComputed=_cc!=null&&Number.isFinite(_cc.jdTt)&&Number.isFinite(_cc.meanAyanamsha)
  &&_cc.jdTt>=CHESHTA_GUARD_JD_MIN&&_cc.jdTt<CHESHTA_GUARD_JD_MAX;
 // Caller-assembly CONTRACT TAG (reviewer): a usable context MUST carry birthMs equal to
 // the birth instant. Absence or mismatch is a caller contract violation (throws), not
 // unavailable data - an incoherent instant (e.g. birth 2000 with a 2100 JD) must never
 // silently compute and drop the missing note. This is ONLY a caller-contract tag: the
 // module cannot validate the JD mathematically (a matching tag with a still-wrong JD
 // is accepted); the actual panel-body regression verifies the current caller's assembly.
 if(cheshtaComputed&&(!Number.isFinite(_cc.birthMs)||_cc.birthMs!==birthMs))
  throw new Error('compute: cheshtaCtx must carry birthMs equal to the birth instant (caller-assembly contract tag)');
 // Status from ACTUAL results, not context alone: exactly the five tara planets, each
 // with a finite cheshta value.
 const tara=planets.filter(x=>!['Sun','Moon'].includes(x.graha));
 const cheshtaActive=cheshtaComputed&&tara.length===5&&tara.every(x=>typeof x.cheshta==='number'&&Number.isFinite(x.cheshta));
 const unmodeled=UNMODELED.filter(u=>!(cheshtaActive&&u.id==='cheshta-ma-sa'));
 return {planets,unmodeled,provisional:PROVISIONAL,partialOnly:true,experimental:['drik'],
  note:(cheshtaActive
   ?'Partial sums only - Yuddha and Bhava-bala totals are not computed; this is not a full Shadbala total and no ratio against required strengths is given. Mars-Saturn Cheshta is computed under the MODERN Simon-1994 mean-elements convention (see conventions). Drik is shown separately as experimental and is NOT included in the partial sums pending verified classification fixtures.'
   :'Partial sums only - Mars-Saturn Cheshta, Yuddha and Bhava-bala are not computed; this is not a full Shadbala total and no ratio against required strengths is given. Drik is shown separately as experimental and is NOT included in the partial sums pending verified classification fixtures.'),
  conventions:(cheshtaActive?['cheshta (Mars-Saturn): BPHS 27.24-25 cheshta-kendra with Simon 1994 sec5.9 mean elements (VSOP87/JASON84-based) - MODERN named convention, not a classical mean-longitude source; frame: apparent-geocentric in mean-equinoctial-longitude convention; TDB~TT (IAU2006B3); guard = inclusive UTC years 1900-2100 with exact TT endpoints (boundary DeltaT shift named), unavailable is not zero; validated vs Raman 1918 published rounded inputs (bound 0.008334 virupa), not vs modern goldens']:[]).concat([
   'saptavargaja: compound (natural+temporary) friendship, BPHS 27.2-4 values; moolatrikona 45 in D1 degree-zone per BPHS 3.51-54 (Raman full-rasi and all-seven-vargas readings recorded) - no golden',
   'abda/masa lords: Raman/Sripati schematic ahargana (epoch 1827-05-01) - not a BPHS method, reproduction-only',
   'ayana: BPHS khanda piecewise lavas primary; Raman uses a 15-degree segment interpolation table (his pp57-59) - a different method, so printed Raman ayana values are not an accuracy bound for khanda',
   'nathonnatha: distance from true solar transit (local apparent noon)'])};
}
const api={compute,solarTransitMs,localDateString,previousLocalDateString,uchchaBala,digBala,naisargikaBala,kendradiBala,ojhaYugmaRasi,ojhaYugmaNavamsa,drekkanaBala,pakshaBala,nathonnathaBala,tribhagaBala,varaBala,horaBala,ayanaBala,lavas,drishtiValue,drikBala,compoundRelation,saptavargaScore,abdaMasaLords,cheshtaBalaTara,cheshtaFromComponents,meanLambda,SIMON_LAMBDA,CHESHTA_GUARD_JD_MIN,CHESHTA_GUARD_JD_MAX,UNMODELED,PLANETS};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmBala=api;
})(typeof window!=='undefined'?window:globalThis);
