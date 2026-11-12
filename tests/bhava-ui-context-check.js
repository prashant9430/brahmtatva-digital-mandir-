// Regression against the ACTUAL function body. Run in bundle root.
const fs=require('fs'),vm=require('vm'),B=require('../kundli-bala'),J=require('../kundli-engine'),BV=require('../kundli-bhava');
const c={Date};vm.createContext(c);vm.runInContext(fs.readFileSync(__dirname+'/../astro-core.js','utf8'),c);const A=c.BrahmAstro;
const source=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');const body=source.slice(source.indexOf('function bhavaTermsPanel(){'),source.indexOf('\nconst tabs='));
function civilUTC(date,time,tz){const base=Date.parse(date+'T'+time+':00Z');let t=base;for(let i=0;i<4;i++){const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(t).map(x=>[x.type,x.value]));t+=base-Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);}return new Date(t)}
let fail=0;
for(const [day,tz,lat,lon] of [['2000-06-15','Asia/Kolkata',28.6139,77.209],['2024-03-11','America/New_York',40.7128,-74.006],['2024-11-04','America/New_York',40.7128,-74.006]]){
 const l={latitude:lat,longitude:lon,timeZone:tz},daily=A.dailyPanchanga(civilUTC(day,'12:00',tz),l),birth=new Date(+new Date(daily.sunrise)-30*60000),ps=A.grahaPositions(birth),lagna=A.siderealLagna(birth,l);let captured,result;
 const proxy={...BV,compute:x=>{captured=x;result=BV.compute(x);return result;}};
 const f=new Function('window','BrahmBala','A','J','birth','l','ps','lagna','civilUTC','panel','pending','G','R','deg',body+';return bhavaTermsPanel();');
 const html=f({BrahmBhava:proxy},B,A,J,birth,l,ps,lagna,civilUTC,(t,s)=>s,(t,s)=>'PENDING '+s,Object.fromEntries(B.PLANETS.map(p=>[p,p])),Array.from({length:12},(_,i)=>String(i)),String);
 const got=result?.bhavas[0].dayPart,expected='twilight';console.log(day,tz,birth.toISOString(),{got,expected,passed:got===expected,passedSunrise:new Date(captured.sunriseMs).toISOString(),civilSunrise:daily.sunrise});if(got!==expected)fail++;
}
console.log('actual Bhava panel-context failures',fail);process.exitCode=fail?1:0;
