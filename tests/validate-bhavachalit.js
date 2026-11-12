// Bhav-chalit view checks (Sripati-madhya presentation layer; prep-GO 2026-11-11 17:15,
// labels verbatim from docs/bhavachalit-bhavaphal-plan-draft.md). Run: node tests/validate-bhavachalit.js
// Fixtures: Raman p21 printed anchors -> hand-computed boundary literals (same geometry the
// reviewed bhava-terms suite pins); shift fixtures hand-computed against whole-sign houses;
// UI checks run the ACTUAL chalitPanel body sliced out of kundli-suite-ui.js.
'use strict';
const fs=require('fs'),vm=require('vm');
const BV=require('../kundli-bhava.js'),J=require('../kundli-engine.js');
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}
const mod=x=>{const r=x%360;return r<0?r+360:r;};
const d=(dg,m)=>dg+m/60;

// --- A. module-level chalit mapping on the p21 anchor set --------------------
// p21 printed anchors (geometry fixture, same as validate-bhava-terms.js section 1/5a)
const ASC=d(298,27),IC=d(36,36),DESC=d(118,27),MC=d(216,36);
const MAD=BV.madhyas(ASC,IC,DESC,MC),BND=BV.boundaries(MAD);
// hand-computed boundary literals (from p21 madhyas; pinned identically in bhava-terms 5a)
const LIT=[[284,48.5],[314,48.5],[347,31.5],[20,14.5],[50,14.5],[77,31.5],[104,48.5],[134,48.5],[167,31.5],[200,14.5],[230,14.5],[257,31.5]];
{
 const errs=[];BND.forEach((b,i)=>{const e=LIT[i][0]+LIT[i][1]/60;if(Math.abs(b-e)>1e-9)errs.push([i+1,b,e]);});
 ck('A1 p21 boundaries match hand-computed literals',errs.length===0,errs);
}
// hand-computed memberships: bhava i spans [LIT[i-1], LIT[i]) forward
const CASES=[
 ['A2 madhya-1 longitude -> bhava 1',d(298,27),1],
 ['A3 exact sandhi 284d48.5m -> NEXT bhava (1), half-open',d(284,48.5),1],
 ['A4 exact sandhi 314d48.5m -> NEXT bhava (2), half-open',d(314,48.5),2],
 ['A5 one 1e-4 arcmin below sandhi stays in previous bhava',d(314,48.4999),1],
 ['A6 wrap case: 0d -> bhava 3',0,3],
 ['A7 100d -> bhava 6',100,6],
 ['A8 271d09.999m -> bhava 12',d(271,9.999),12]];
for(const [id,lon,exp] of CASES){let got;try{got=BV.bhavaOf(lon,BND);}catch(e){got='THROW '+e.message;}
 ck(id,got===exp,{got,exp});}

// --- B. shift fixtures vs whole-sign (lagna 298d27m -> sign index 9) ---------
const LAGNA=ASC; // Capricorn lagna (sign 9)
{
 const lon=0,ws=J.house(lon,LAGNA),ch=BV.bhavaOf(lon,BND); // hand: ws=mod(0-9,12)+1=4, ch=3
 ck('B1 shifted planet fixture (0d: whole-sign 4, chalit 3)',ws===4&&ch===3&&ws!==ch,{ws,ch});
}
{
 // non-vacuity mutation: 0d -> 25d keeps whole-sign 4 but chalit becomes 4 (shift disappears)
 const lon=25,ws=J.house(lon,LAGNA),ch=BV.bhavaOf(lon,BND);
 ck('B2 mutation flips shift flag (25d: whole-sign 4, chalit 4, unshifted)',ws===4&&ch===4&&ws===ch,{ws,ch});
}

// --- C. real-chart all-seven mapping (1990-06-15 10:30 Patna, the pixel-proof chart)
const c={Date};vm.createContext(c);vm.runInContext(fs.readFileSync(__dirname+'/../astro-core.js','utf8'),c);const A=c.BrahmAstro;
function civilUTC(date,time,tz){const base=Date.parse(date+'T'+time+':00Z');let t=base;for(let i=0;i<4;i++){const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(t).map(x=>[x.type,x.value]));t+=base-Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);}return new Date(t)}
const PATNA={latitude:25.5941,longitude:85.1376,timeZone:'Asia/Kolkata'};
const birth=civilUTC('1990-06-15','10:30','Asia/Kolkata');
const ps=A.grahaPositions(birth),lagna=A.siderealLagna(birth,PATNA);
let realMc;{
 const ramc=J.mod(15*A.gastHours(birth)+PATNA.longitude);
 const r=ramc*Math.PI/180,e=A.trueObliquity(birth)*Math.PI/180;
 const mcTrop=J.mod(Math.atan2(Math.sin(r),Math.cos(r)*Math.cos(e))*180/Math.PI);
 realMc=J.mod(mcTrop-A.ayanamsha(birth,{nutation:true}));
}
const rBnd=BV.boundaries(BV.madhyas(lagna,J.mod(realMc+180),J.mod(lagna+180),realMc));
{
 const seven=ps.filter(p=>['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].includes(p.graha));
 const errs=[];for(const p of seven){let ch;try{ch=BV.bhavaOf(p.longitude,rBnd);}catch(e){errs.push([p.graha,'THROW',e.message]);continue;}
  if(!(ch>=1&&ch<=12))errs.push([p.graha,ch]);}
 ck('C1 real chart: all seven map to exactly one chalit bhava',errs.length===0,errs);
}

// --- D. UI checks on the ACTUAL chalitPanel body ------------------------------
const source=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
const start=source.indexOf('function chalitPanel(){'),end=source.indexOf('\nconst tabs=');
ck('D0 chalitPanel body sliceable from UI source',start>0&&end>start,{start,end});
const body=source.slice(start,end);
const G={Sun:'सूर्य',Moon:'चन्द्र',Mars:'मंगल',Mercury:'बुध',Jupiter:'गुरु',Venus:'शुक्र',Saturn:'शनि'};
const R=Array.from({length:12},(_,i)=>'R'+i);
const deg=x=>String(x);
function runChalit(over){
 const captured={};
 const proxy=Object.assign({},BV,{bhavaOf:(lon,b)=>{const r=BV.bhavaOf(lon,b);captured.last=r;return r;}});
 const f=new Function('window','BrahmBala','A','J','birth','l','ps','lagna','civilUTC','panel','pending','G','R','deg',
  body+';return chalitPanel();');
 const html=f({BrahmBhava:proxy},{PLANETS:['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn']},
  A,J,over.birth,over.l,over.ps,over.lagna,civilUTC,(t,s)=>s,(t,s)=>'PENDING['+t+'] '+s,G,R,deg);
 return html;
}
// D1: real chart render
{
 const html=runChalit({birth,l:PATNA,ps,lagna});
 ck('D1a real chart renders panel, not pending',!html.startsWith('PENDING'),html.slice(0,80));
 ck('D1b header caveat verbatim',html.includes('यह भाव-चलित दृश्य Sripati-madhya परंपरा पर आधारित है; ऊपर का मुख्य चार्ट whole-sign (राशि-भाव) परंपरा में है और अपरिवर्तित रहता है।'));
 ck('D1c nodes-unmodelled label verbatim',html.includes('राहु-केतु की भाव-चलित भागीदारी इस संस्करण में अमॉडल है।'));
 ck('D1d sandhi convention footnote verbatim',html.includes('भाव-संधि पर ठीक स्थित ग्रह अगले भाव में गिना जाता है (अर्ध-खुला सीमा-नियम)।'));
 ck('D1e no-chalit-phal statement present',html.includes('इस दृश्य से कोई भाव-फल निष्कर्ष नहीं निकाला गया।'));
 const bodyRows=(html.match(/<tr>/g)||[]).length-1; // minus header row
 ck('D1f exactly seven graha rows (no nodes)',bodyRows===7,{bodyRows});
 ck('D1g no Rahu/Ketu row headers',!html.includes('<th>राहु</th>')&&!html.includes('<th>केतु</th>'));
 ck('D1h horizontal-scroll hint present (mobile table pattern)',html.includes('⇠ तालिका को बाईं-दाईं ओर खिसकाएँ ⇢'));
}
// D2: synthetic shift fixture -> factual note verbatim.
// Anchor-consistent synthetic sky: zero sidereal time/obliquity/ayanamsha => mc == l.longitude
// (85.1376); lagna 120d (Leo) keeps the required asc->ic->desc->mc forward order.
// Hand-computed from those anchors: bhava spans 8 = [324.1896, 12.5688) wraps 0d, so Sun 0d
// -> chalit 8; whole-sign from Leo lagna: mod(0-4,12)+1 = 9. Others at 120d -> bhava 1 = ws 1.
const zeroA=Object.assign({},A,{gastHours:()=>0,trueObliquity:()=>0,ayanamsha:()=>0});
const synPs=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].map(g=>({graha:g,longitude:g==='Sun'?0:120,rashi:Math.floor((g==='Sun'?0:120)/30)}));
function runChalitWith(Ax,over){
 const f=new Function('window','BrahmBala','A','J','birth','l','ps','lagna','civilUTC','panel','pending','G','R','deg',
  body+';return chalitPanel();');
 return f({BrahmBhava:BV},{PLANETS:['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn']},
  Ax,J,over.birth,over.l,over.ps,over.lagna,civilUTC,(t,s)=>s,(t,s)=>'PENDING['+t+'] '+s,G,R,deg);
}
{
 const html=runChalitWith(zeroA,{birth,l:PATNA,ps:synPs,lagna:120});
 ck('D2a shifted planet note verbatim (Sun 0d)',html.includes('चलित भाव: 8 (whole-sign: 9)'),html.slice(0,200));
 const shifted=(html.match(/चलित भाव: \d+ \(whole-sign: \d+\)/g)||[]).length;
 ck('D2b exactly one shifted row in fixture',shifted===1,{shifted});
}
// D3: mutation removes the note (non-vacuity of the UI fixture): Sun 0d->25d -> chalit 9
// ([12.5688,60.948) span), whole-sign still 9 -> unshifted, note disappears.
{
 const mut=synPs.map(p=>p.graha==='Sun'?{...p,longitude:25}:p);
 const html=runChalitWith(zeroA,{birth,l:PATNA,ps:mut,lagna:120});
 ck('D3 mutation 0d->25d removes the shift note',!html.includes('(whole-sign:'));
}
// D4: fewer than seven planets -> honest pending, no partial table
{
 const html=runChalit({birth,l:PATNA,ps:synPs.slice(0,6),lagna:LAGNA});
 ck('D4 six-planet input renders pending, no table',html.startsWith('PENDING')&&!html.includes('<tr>'),html.slice(0,120));
}
// D5: source-level integration checks
{
 ck('D5a renderCharts body calls chalitPanel()',(()=>{
  const rcStart=source.indexOf('function renderCharts(){'),rcEnd=source.indexOf('\nfunction ',rcStart+10);
  const rcBody=source.slice(rcStart,rcEnd);
  return rcStart>0&&rcEnd>rcStart&&!rcBody.includes('function chalitPanel')&&rcBody.includes('+chalitPanel()');})());
 // non-vacuity: deleting the invocation from the renderCharts body must fail this check
 ck('D5a-mut deletion of the call from renderCharts body breaks D5a',(()=>{
  const rcStart=source.indexOf('function renderCharts(){'),rcEnd=source.indexOf('\nfunction ',rcStart+10);
  const rcMut=source.slice(rcStart,rcEnd).replace('+chalitPanel()','');
  return rcMut.includes('chalitPanel()')===false;})());
 ck('D5b old KP-caveat pending removed',!source.includes('KP के बिना गैर-KP भाव-चलित'));
 const bana=source.slice(source.indexOf('बना:'),source.indexOf('अधूरा:'));
 ck('D5c ledger bana list names the chalit view with labels',bana.includes('भाव-चलित दृश्य (श्रीपति-मध्य परंपरा')&&bana.includes('whole-sign मुख्य चार्ट अपरिवर्तित')&&bana.includes('राहु-केतु अमॉडल'));
 const adhura=source.slice(source.indexOf('अधूरा:'),source.indexOf('प्रिंट में छह भाग'));
 ck('D5d ledger adhura list no longer lists Bhav Chalit',!adhura.includes('Bhav Chalit')&&!adhura.includes('भाव चलित'));
 ck('D5e reviewed bhavaTermsPanel body untouched (still first)',source.indexOf('function bhavaTermsPanel(){')<start);
}

console.log(`\nbhavachalit: ${pass} pass, ${fail} fail`);
if(bad.length)console.log('FAILED:',bad.join(', '));
process.exitCode=fail?1:0;
