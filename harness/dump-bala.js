// Dumps bala module inputs/outputs for the python harness (harness/test-bala.py).
// Run: node harness/dump-bala.js > /tmp/bala-dump.json
'use strict';
const vm=require('vm'),fs=require('fs'),path=require('path');
const B=require('../kundli-bala.js');
const J=require('../kundli-engine.js');
const c={Date};vm.createContext(c);
vm.runInContext(fs.readFileSync(path.join(__dirname,'..','astro-core.js'),'utf8'),c);
const A=c.BrahmAstro;
const PLANETS=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const P=(graha,longitude)=>({graha,rashi:Math.floor(longitude/30),longitude});
const sunFn=t=>A.grahaPositions(new Date(t)).find(g=>g.graha==='Sun').longitude;
const ayFn=t=>A.ayanamsha(new Date(t));

function build({birth,l,weekday,positions,lagna}){
 const daily=A.dailyPanchanga(birth,l);
 if(!daily.sunrise||!daily.sunset)throw Error('no sunrise/sunset');
 const next=A.riseSet('rise',A.nextLocalDayStartUTC(birth,l.timeZone),l);
 const srMs=+new Date(daily.sunrise),ssMs=+new Date(daily.sunset),nsMs=next?+new Date(next):null;
 const transit=B.solarTransitMs(srMs,ssMs,l.longitude,sunFn,ayFn);
 const ayanamsa=A.ayanamsha(birth);
 const out=B.compute({positions,lagna,birthMs:+birth,weekday,sunriseMs:srMs,sunsetMs:ssMs,
  nextSunriseMs:nsMs??undefined,transitMs:transit,ayanamsa,varga:(lon,n)=>J.varga(lon,n)});
 return {birthUtc:birth.toISOString(),weekday,sunriseMs:srMs,sunsetMs:ssMs,nextSunriseMs:nsMs,
  transitMs:transit,ayanamsa,engineSunAtBirth:sunFn(+birth),positions:positions.map(p=>({graha:p.graha,longitude:p.longitude})),lagna,output:out,
  // isolated ayana fixture with the BOOK's ayanamsha 21d16' (do not mix
  // book ayanamsha with engine Lahiri; engine Lahiri stays for real charts)
  ayanaBook21:Object.fromEntries(PLANETS.map(p=>[p,B.ayanaBala(positions.find(q=>q.graha===p).longitude,21+16/60,p)]))};
}

const F1=build({
 birth:new Date(Date.UTC(2000,0,1,6,30)),
 l:{latitude:28.6139,longitude:77.2090,timeZone:'Asia/Calcutta'},weekday:6,
 positions:[256.2879,196.7119,303.9406,247.6923,1.3916,217.4435,16.546].map((lon,i)=>P(PLANETS[i],lon)),
 lagna:343.1891});

// Raman Standard Horoscope: 1918-10-16 14:06:16 LMT (5h10m20s), 13N 77.5833E; fixture nirayana longitudes
const RLON={Sun:180+53/60+55/3600,Moon:311+17/60+19/3600,Mars:229+30/60+34/3600,Mercury:181+31/60+34/3600,Jupiter:84+0/60+49/3600,Venus:171+9/60+56/3600,Saturn:124+22/60+41/3600};
const RAMAN=build({
 birth:new Date(Date.UTC(1918,9,16,14,6,16)-(5*3600000+10*60000+20000)),
 l:{latitude:13,longitude:77+35/60,timeZone:'Asia/Kolkata'},weekday:3,
 positions:PLANETS.map(p=>P(p,RLON[p])),
 lagna:298+27/60});

console.log(JSON.stringify({F1,RAMAN},null,1));
