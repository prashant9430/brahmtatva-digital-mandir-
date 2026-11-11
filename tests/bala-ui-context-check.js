// Actual-body regression for the balaPanel cheshtaCtx ASSEMBLY CONTRACT (reviewer
// 13:18): the panel's compute() input must bind jdTt, meanAyanamsha and birthMs to
// the SAME birth instant. Runs the real function body extracted from kundli-suite-ui.js.
// Run: node tests/bala-ui-context-check.js
const fs=require('fs'),vm=require('vm'),B=require('../kundli-bala.js'),J=require('../kundli-engine.js');
const c={Date};vm.createContext(c);vm.runInContext(fs.readFileSync(__dirname+'/../astro-core.js','utf8'),c);const A=c.BrahmAstro;
const source=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
const body=source.slice(source.indexOf('function balaPanel(){'),source.indexOf('\nfunction bhavaTermsPanel(){'));
function civilUTC(date,time,tz){const base=Date.parse(date+'T'+time+':00Z');let t=base;for(let i=0;i<4;i++){const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(t).map(x=>[x.type,x.value]));t+=base-Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);}return new Date(t)}
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}
const l={latitude:28.6139,longitude:77.209,timeZone:'Asia/Calcutta'};
for(const [label,day,time] of [['noon','2000-01-01','12:00'],['pre-sunrise','2000-01-01','04:00']]){
 const birth=civilUTC(day,time,l.timeZone),ps=A.grahaPositions(birth),lagna=A.siderealLagna(birth,l);
 let captured,result;
 const proxy={...B,compute:x=>{captured=x;result=B.compute(x);return result;}};
 const f=new Function('window','J','A','ps','lagna','birth','l','civilUTC','panel','pending','G',body+';return balaPanel();');
 const html=f({BrahmBala:proxy},J,A,ps,lagna,birth,l,civilUTC,(t,s)=>s,(t,s)=>'PENDING '+s,Object.fromEntries(B.PLANETS.map(p=>[p,p])));
 ck(label+': panel computed (not pending)',typeof html==='string'&&!html.startsWith('PENDING'),html&&html.slice(0,80));
 ck(label+': ctx birthMs token === birth instant',captured.cheshtaCtx.birthMs===+birth&&captured.birthMs===+birth);
 ck(label+': ctx jdTt assembled from the SAME instant',captured.cheshtaCtx.jdTt===2451545+A.astroTt(birth),{got:captured.cheshtaCtx.jdTt,want:2451545+A.astroTt(birth)});
 ck(label+': ctx meanAyanamsha assembled from the SAME instant',captured.cheshtaCtx.meanAyanamsha===A.meanAyanamsha(birth));
 ck(label+': actual Ma-Sa results finite',result.planets.filter(p=>!['Sun','Moon'].includes(p.graha)).every(p=>Number.isFinite(p.cheshta)));
 ck(label+': unmodeled drops cheshta-ma-sa when active',!result.unmodeled.some(u=>u.id==='cheshta-ma-sa'));
}
console.log(`\n${pass} pass, ${fail} fail${bad.length?': '+bad.join(', '):''}`);
process.exit(fail?1:0);
