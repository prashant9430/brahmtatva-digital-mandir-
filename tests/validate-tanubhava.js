// Bhavaphal ch12 pilot (tanubhava) checks. Run: node tests/validate-tanubhava.js
// Fixtures: hand-computed synthetic charts (whole-sign houses from stated lagna; BPHS 3.11
// classes with dynamic Moon; 26.2-5 whole-sign drishti). Curation rulings: reviewer 17:15/17:17.
'use strict';
const fs=require('fs');
const T=require('../kundli-tanubhava.js');
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}

// planets builder: {graha:sign}; degrees 10 default; Sun/Moon placed for chosen paksha
function mk(map){const seven=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
 return seven.map(g=>({graha:g,rashi:map[g],degreesInRashi:10}));}
function row(rep,id){const r=rep.rows.find(x=>x.id===id);if(!r)throw Error('row missing '+id);return r;}

// --- F1: c12-1a JOINT served (asc Aries; lagnesh Mars in Scorpio=8th, yuti Saturn)
{
 const rep=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:7}),0);
 ck('F1a c12-1a served (Mars+Saturn in 8th)',row(rep,'c12-1a').served===true);
 ck('F1b c12-1a detail names Saturn',row(rep,'c12-1a').detail.includes('शनि'));
 ck('F1c c12-1b unserved (8th not kendra/trikona)',row(rep,'c12-1b').served===false);
 // mutation: Saturn away -> 1a unserved even though Mars still in 8th (JOINT, not OR)
 const m=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:5}),0);
 ck('F1d mutation: malefic yuti removed -> c12-1a unserved (JOINT pinned)',row(m,'c12-1a').served===false);
 // counter-mutation: Mars+Saturn move to 10th (kendra) -> 1a unserved, 1b served
 const m2=T.report(mk({Sun:0,Moon:3,Mars:9,Mercury:1,Jupiter:2,Venus:4,Saturn:9}),0);
 ck('F1e mutation: yuti pair to 10th -> 1a unserved, 1b served',row(m2,'c12-1a').served===false&&row(m2,'c12-1b').served===true);
}
// --- F2: c12-1b + c12-5 (asc Aries, Mars in Capricorn=10th kendra)
{
 const rep=T.report(mk({Sun:0,Moon:3,Mars:9,Mercury:5,Jupiter:7,Venus:8,Saturn:11}),0);
 ck('F2a c12-1b served (lagnesh 10th)',row(rep,'c12-1b').served===true);
 ck('F2b c12-5 served (lagnesh kendra)',row(rep,'c12-5').served===true);
 ck('F2c c12-5 text carries historical frame, no longevity word',
  row(rep,'c12-5').text.includes('ऐतिहासिक')&&!row(rep,'c12-5').text.includes('दीर्घ')&&!row(rep,'c12-5').text.includes('आयु'));
 // mutation: all four out of kendra/trikona
 const m=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:7,Jupiter:7,Venus:7,Saturn:11}),0);
 ck('F2d mutation: none in kendra/trikona -> c12-5 unserved',row(m,'c12-5').served===false);
}
// --- F3: c12-4a/4b/4c with coexisting malefic transparency (asc Aries; Jupiter+Saturn in lagna)
{
 const rep=T.report(mk({Sun:5,Moon:8,Mars:9,Mercury:6,Jupiter:0,Venus:3,Saturn:0}),0);
 ck('F3a c12-4a served (benefic in lagna)',row(rep,'c12-4a').served===true);
 ck('F3b c12-4b served (malefic in lagna) - adverse listed alongside',row(rep,'c12-4b').served===true);
 const r4c=row(rep,'c12-4c');
 ck('F3c c12-4c served (benefic yuti)',r4c.served===true);
 ck('F3d c12-4c transparency names coexisting malefic, not a blocker',
  !!r4c.transparency&&r4c.transparency.includes('शनि')&&r4c.transparency.includes('रोक नहीं'));
 // mutation: lagna empty and no benefic aspect -> 4c unserved
 const m=T.report(mk({Sun:5,Moon:8,Mars:9,Mercury:7,Jupiter:7,Venus:7,Saturn:11}),0);
 ck('F3e mutation: no benefic yuti/aspect on lagna -> c12-4c unserved',row(m,'c12-4c').served===false,{d:row(m,'c12-4c').detail});
}
// --- F4: c12-6 (asc Aries; Mars in Cancer=movable; Venus in Capricorn -> 7th aspect on Cancer)
{
 // hand: Venus sign 9 -> houseOf(3,9)=7 -> ordinary 7th aspect on sign 3 (Cancer)
 const rep=T.report(mk({Sun:0,Moon:5,Mars:3,Mercury:1,Jupiter:8,Venus:9,Saturn:11}),0);
 ck('F4a c12-6 served (movable lagnesh + benefic aspect)',row(rep,'c12-6').served===true,{d:row(rep,'c12-6').detail});
 // coexisting malefic aspect: Saturn in Libra(sign 6) -> houseOf(3,6)=10 -> Saturn special 10th
 const rep2=T.report(mk({Sun:0,Moon:5,Mars:3,Mercury:1,Jupiter:8,Venus:9,Saturn:6}),0);
 const r=row(rep2,'c12-6');
 ck('F4b coexisting malefic aspect = transparency, row still served',r.served===true&&!!r.transparency&&r.transparency.includes('शनि'));
 // mutation: lagnesh in fixed sign -> unserved even with benefic aspect
 const m=T.report(mk({Sun:0,Moon:5,Mars:4,Mercury:1,Jupiter:8,Venus:10,Saturn:11}),0);
 // Venus sign 10 -> houseOf(4,10)=7 -> aspect present; Mars sign 4 (Leo, fixed)
 ck('F4c mutation: fixed-sign lagnesh -> c12-6 unserved',row(m,'c12-6').served===false);
}
// --- F5: c12-7 (asc Aries; Moon+Mercury in lagna)
{
 const rep=T.report(mk({Sun:5,Moon:0,Mars:9,Mercury:0,Jupiter:7,Venus:8,Saturn:11}),0);
 ck('F5a c12-7 served (Mercury with Moon in lagna)',row(rep,'c12-7').served===true);
 ck('F5b c12-7 detail notes चन्द्र-सहित लग्न',row(rep,'c12-7').detail.includes('चन्द्र-सहित'));
 // kendra-only path: Venus in 4th
 const rep2=T.report(mk({Sun:5,Moon:8,Mars:9,Mercury:6,Jupiter:7,Venus:3,Saturn:11}),0);
 ck('F5c c12-7 served via kendra (Venus 4th)',row(rep2,'c12-7').served===true);
 // mutation: none of the three in lagna/kendra, Moon away
 const m=T.report(mk({Sun:5,Moon:8,Mars:9,Mercury:7,Jupiter:7,Venus:7,Saturn:11}),0);
 ck('F5d mutation -> c12-7 unserved',row(m,'c12-7').served===false);
}
// --- F6: nodes tolerated but never fire conditions (asc Aries; Rahu+Ketu present)
{
 const ps=mk({Sun:5,Moon:8,Mars:9,Mercury:6,Jupiter:7,Venus:3,Saturn:11});
 ps.push({graha:'Rahu',rashi:0,degreesInRashi:10},{graha:'Ketu',rashi:6,degreesInRashi:10});
 const rep=T.report(ps,0);
 ck('F6a nodes accepted, report builds',Array.isArray(rep.rows));
 ck('F6b Rahu in lagna does not fire c12-4b',row(rep,'c12-4b').served===false);
 ck('F6c nodes-note present',typeof rep.nodesNote==='string'&&rep.nodesNote.includes('अमॉडल'));
}
// --- F7: waning Moon counts as malefic yuti partner (3.11 dynamic class)
{
 // all planets at deg 10: Sun sign 10 -> 310d, Moon+Mars sign 7 -> 220d;
 // elongation mod(220-310,360)=270 -> >180 -> waning -> पाप (3.11 dynamic class)
 const rep=T.report(mk({Sun:10,Moon:7,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:11}),0);
 ck('F7 waning Moon yuti fires c12-1a (dynamic class)',row(rep,'c12-1a').served===true,{d:row(rep,'c12-1a').detail});
}
// --- F8: omission scan on ALL served texts across fixtures + module strings
{
 const charts=[mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:7}),
  mk({Sun:5,Moon:8,Mars:9,Mercury:6,Jupiter:0,Venus:3,Saturn:0}),
  mk({Sun:0,Moon:5,Mars:3,Mercury:1,Jupiter:8,Venus:9,Saturn:6}),
  mk({Sun:5,Moon:0,Mars:9,Mercury:0,Jupiter:7,Venus:8,Saturn:11})];
 const banned=['रोग','दीर्घ','आयु','व्रण','यमल','नाल','त्रिमाता','मृत्यु','मारक','उपाय','मंत्र','रत्न'];
 const leaks=[];
 for(const psx of charts){const rep=T.report(psx,0);
  for(const r of rep.rows){if(!r.served)continue;
   for(const w of banned){if(r.text.includes(w)||(r.detail||'').includes(w)||(r.transparency||'').includes(w))leaks.push([r.id,w]);}
   if(/परंपरा-कथन/.test(r.text)===false&&r.id!=='c12-11')leaks.push([r.id,'missing tradition-label']);}}
 ck('F8a no banned wording in any served text/detail/transparency',leaks.length===0,leaks);
 // source-level: scan EVERY string literal in the module (comments carry the omitted
 // category words and are not literals) - served texts, details, transparency, notices -
 // independent of the four fixtures above
 const tsrc=fs.readFileSync(__dirname+'/../kundli-tanubhava.js','utf8');
 const lits=[...tsrc.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(m=>m[1]);
 const srcLeaks=lits.flatMap(t=>banned.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,40),w})));
 ck('F8i source-level: no banned wording in any module string literal',srcLeaks.length===0,{literals:lits.length,srcLeaks});
 const all=T.report(charts[1],0);
 ck('F8b omitN is 10',all.omitN===10,{omitN:all.omitN});
 ck('F8c count-only omission notice (no category words)',banned.every(w=>!all.omitNotice.includes(w))&&all.omitNotice.includes('10'));
 ck('F8d mat-bhed record on 12.1 rows',row(all,'c12-1a').matbhed.includes('संयुक्त')&&row(all,'c12-1a').matbhed.includes('or'));
 ck('F8e drishti binary note present',all.drishtiNote.includes('binary')&&all.drishtiNote.includes('असमीक्षित'));
 ck('F8f c12-11 always served (method note)',charts.every(psx=>row(T.report(psx,0),'c12-11').served===true));
 ck('F8g exactly 9 rows',all.rows.length===9,{n:all.rows.length});
 ck('F8h header states no-prediction framing',all.header.includes('भविष्यकथन या निश्चय नहीं'));
}
// --- F9: input validation
{
 let e1=null,e2=null,e3=null;
 try{T.report(mk({Sun:0,Moon:1,Mars:2,Mercury:3,Jupiter:4,Venus:5,Saturn:6}),12);}catch(e){e1=e;}
 try{T.report(mk({Sun:0,Moon:3,Mars:9,Mercury:6,Jupiter:7,Venus:3,Saturn:11}).slice(0,6),0);}catch(e){e2=e;}
 const bad3=mk({Sun:0,Moon:3,Mars:9,Mercury:6,Jupiter:7,Venus:3,Saturn:11});delete bad3[0].degreesInRashi;
 try{T.report(bad3,0);}catch(e){e3=e;}
 ck('F9a asc out of range rejected',!!e1);
 ck('F9b missing graha rejected',!!e2);
 ck('F9c missing degreesInRashi rejected (3.11 machinery needs it)',!!e3);
}
// --- F10: real chart smoke (1990-06-15 10:30 Patna via astro-core) - rows build, scan clean
{
 const vm=require('vm');const c={Date};vm.createContext(c);
 vm.runInContext(fs.readFileSync(__dirname+'/../astro-core.js','utf8'),c);const A=c.BrahmAstro;
 function civilUTC(date,time,tz){const base=Date.parse(date+'T'+time+':00Z');let t=base;for(let i=0;i<4;i++){const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(t).map(x=>[x.type,x.value]));t+=base-Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);}return new Date(t)}
 const l={latitude:25.5941,longitude:85.1376,timeZone:'Asia/Kolkata'};
 const birth=civilUTC('1990-06-15','10:30','Asia/Kolkata');
 const ps=A.grahaPositions(birth),lagna=A.siderealLagna(birth,l);
 const rep=T.report(ps.map(x=>({graha:x.graha,rashi:x.rashi,degreesInRashi:x.degreesInRashi})),Math.floor(lagna/30));
 ck('F10a real chart: 9 rows build',rep.rows.length===9);
 const served=rep.rows.filter(r=>r.served);
 ck('F10b real chart: at least one served, one unserved (non-vacuous on real sky)',served.length>0&&served.length<9,{served:served.map(r=>r.id)});
 const leaks=[];for(const r of served)for(const w of ['रोग','दीर्घ','आयु','व्रण','यमल','मृत्यु','उपाय','मंत्र'])if((r.text+r.detail+(r.transparency||'')).includes(w))leaks.push([r.id,w]);
 ck('F10c real chart: omission scan clean on served rows',leaks.length===0,leaks);
}
// --- F11: UI checks on the ACTUAL tanuPanel body -------------------------------
{
 const source=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
 const start=source.indexOf('function tanuPanel(){'),end=source.indexOf('\nconst tabs=');
 ck('F11a tanuPanel body sliceable',start>0&&end>start);
 const body=source.slice(start,end);
 const esc=s=>String(s).replace(/[&<>"']/g,c=>' ');
 const run=(psx,asc)=>{const f=new Function('window','ps','ls','esc','panel','pending',body+';return tanuPanel();');
  return f({BrahmTanuPhal:T},psx,asc,esc,(t,s)=>s,(t,s)=>'PENDING['+t+'] '+s);};
 const psx=mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:7});
 const html=run(psx,0);
 ck('F11b panel renders (not pending)',!html.startsWith('PENDING'),html.slice(0,80));
 ck('F11c header verbatim',html.includes(T.HEADER));
 ck('F11d omit notice verbatim',html.includes(T.OMIT_NOTICE));
 ck('F11e 9 row cards',(html.match(/<details>/g)||[]).length===9);
 ck('F11f served row shows tradition text',html.includes('देह-सुख में कमी बताई है'));
 ck('F11g unserved row hides tradition text',html.includes('पूरी नहीं बनी; परंपरा-कथन नहीं दिखाया गया'));
 const unservedCount=(html.match(/शर्त नहीं बनी/g)||[]).length;
 ck('F11h F1 chart: served/unserved mix visible',unservedCount>0&&unservedCount<9,{unservedCount});
 ck('F11i mat-bhed line rendered',html.includes('पठन-भेद दर्ज'));
 ck('F11j nodes+drishti notes rendered',html.includes('अमॉडल')&&html.includes('binary'));
 ck('F11k pane-report wiring (phalMethodPanel inserted after bhavaphalPanel; sequence pin updated)',source.includes('bhavaphalPanel()+phalMethodPanel()+tanuPanel()+yutiphalPanel()'));
 ck('F11l module absent -> honest pending',(()=>{const f=new Function('window','ps','ls','esc','panel','pending',body+';return tanuPanel();');
  return f({},psx,0,esc,(t,s)=>s,(t,s)=>'PENDING '+s);})().startsWith('PENDING'));
 ck('F11m kundli.html loads module',fs.readFileSync(__dirname+'/../kundli.html','utf8').includes('kundli-tanubhava.js'));
}
console.log(`\ntanubhava: ${pass} pass, ${fail} fail`);
if(bad.length)console.log('FAILED:',bad.join(', '));
process.exitCode=fail?1:0;
