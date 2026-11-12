// Bhavaphal ch22 (labha bhava) checks. Run: node tests/validate-labhaphal.js
// Fixtures: hand-computed synthetic charts (whole-sign houses from stated lagna; BPHS 3.11
// classes with dynamic Moon). Curation record: docs/bhavaphal-ch22-ledger-draft.md.
// Scans hardened per the ch22 correction: served
// text+detail+transparency scan plus source-literal scan EXTENDED to backtick templates.
'use strict';
const fs=require('fs');
const T=require('../kundli-labhaphal.js');
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}

function mk(map){const seven=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
 return seven.map(g=>({graha:g,rashi:map[g],degreesInRashi:10}));}
function row(rep,id){const r=rep.rows.find(x=>x.id===id);if(!r)throw Error('row missing '+id);return r;}
// asc 0 (Aries): labhesh=SIGN_LORD[10]=Saturn, dhanesh=SIGN_LORD[1]=Venus, sahajesh=SIGN_LORD[2]=Mercury

// --- F1: c22-2a placement (11th / kendra / trikona)
{
 const rep=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:10}),0);
 ck('F1a c22-2a served (labhesh in 11th)',row(rep,'c22-2a').served===true);
 const m=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:3}),0);
 ck('F1b c22-2a served via kendra (labhesh 4th)',row(m,'c22-2a').served===true);
 const m2=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:8}),0);
 ck('F1c c22-2a served via trikona (labhesh 9th)',row(m2,'c22-2a').served===true);
 const m3=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:1}),0);
 ck('F1d mutation: labhesh in 2nd -> c22-2a unserved',row(m3,'c22-2a').served===false,{d:row(m3,'c22-2a').detail});
}
// --- F2: c22-2b exaltation + unmodeled note 22.2c
{
 const rep=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:6}),0);
 const r=row(rep,'c22-2b');
 ck('F2a c22-2b served (Saturn exalted in Libra)',r.served===true,{d:r.detail});
 ck('F2b unmodeled 22.2c note names both readings',r.unmodeled.includes('मतभेद')&&r.unmodeled.includes('combustion')&&r.unmodeled.includes('division'));
 ck('F2c unmodeled note states no effect on the row',r.unmodeled.includes('असर नहीं'));
 const m=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:5}),0);
 ck('F2d mutation: Saturn in Virgo -> c22-2b unserved',row(m,'c22-2b').served===false);
}
// --- F3: c22-3 conjunction (labhesh 2nd; dhanesh kendra with Jupiter)
{
 const rep=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:5,Jupiter:9,Venus:9,Saturn:1}),0);
 ck('F3a c22-3 served (Saturn 2nd; Venus+Jupiter 10th)',row(rep,'c22-3').served===true,{d:row(rep,'c22-3').detail});
 const m=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:5,Jupiter:8,Venus:9,Saturn:1}),0);
 ck('F3b mutation: Jupiter away -> c22-3 unserved',row(m,'c22-3').served===false);
 const m2=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:5,Jupiter:1,Venus:1,Saturn:1}),0);
 ck('F3c mutation: dhanesh to 2nd (not kendra) -> c22-3 unserved',row(m2,'c22-3').served===false);
 const m3=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:5,Jupiter:9,Venus:9,Saturn:0}),0);
 ck('F3d mutation: labhesh to 1st -> c22-3 unserved',row(m3,'c22-3').served===false);
}
// --- F4: c22-7 (Jupiter+Mercury+Moon all in 9th); gate-corrected wording
{
 const rep=T.report(mk({Sun:0,Moon:8,Mars:7,Mercury:8,Jupiter:8,Venus:4,Saturn:1}),0);
 const r=row(rep,'c22-7');
 ck('F4a c22-7 served (all three in 9th)',r.served===true,{d:r.detail});
 ck('F4b gate-corrected text (no scan-collision token)',r.text.includes('आभूषण')&&r.text.includes('ऐतिहासिक अभिप्राय'));
 const m=T.report(mk({Sun:0,Moon:8,Mars:7,Mercury:7,Jupiter:8,Venus:4,Saturn:1}),0);
 ck('F4c mutation: Mercury out of 9th -> c22-7 unserved',row(m,'c22-7').served===false);
}
// --- F5: c22-9 / c22-10 exchanges (separate charts - labhesh cannot be in 2nd and 3rd at once)
{
 const rep=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:5,Jupiter:8,Venus:10,Saturn:1}),0);
 ck('F5a c22-9 served (dhanesh 11th, labhesh 2nd)',row(rep,'c22-9').served===true);
 ck('F5b c22-9 text carries historical frame',row(rep,'c22-9').text.includes('ऐतिहासिक अभिप्राय'));
 const m=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:5,Jupiter:8,Venus:9,Saturn:1}),0);
 ck('F5c mutation: dhanesh to 10th -> c22-9 unserved',row(m,'c22-9').served===false);
 const rep2=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:10,Jupiter:8,Venus:4,Saturn:2}),0);
 ck('F5d c22-10 served (sahajesh 11th, labhesh 3rd)',row(rep2,'c22-10').served===true);
 const m2=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:10,Jupiter:8,Venus:4,Saturn:1}),0);
 ck('F5e mutation: labhesh to 2nd -> c22-10 unserved',row(m2,'c22-10').served===false);
}
// --- F6: c22-11a debilitation, c22-11c dusthana+malefic; unmodeled 22.11b note
{
 const rep=T.report(mk({Sun:5,Moon:8,Mars:9,Mercury:1,Jupiter:2,Venus:4,Saturn:0}),0);
 ck('F6a c22-11a served (Saturn debilitated in Aries)',row(rep,'c22-11a').served===true,{d:row(rep,'c22-11a').detail});
 ck('F6b unmodeled 22.11b note on 11a (combustion machinery)',row(rep,'c22-11a').unmodeled.includes('अमॉडल'));
 const rep2=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:7}),0);
 const r=row(rep2,'c22-11c');
 ck('F6c c22-11c served (Saturn 8th + Mars yuti)',r.served===true,{d:r.detail});
 ck('F6d c22-11c detail names the malefic',r.detail.includes('मंगल'));
 const m=T.report(mk({Sun:0,Moon:3,Mars:9,Mercury:1,Jupiter:2,Venus:4,Saturn:7}),0);
 ck('F6e mutation: malefic removed -> c22-11c unserved',row(m,'c22-11c').served===false);
 const m2=T.report(mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:5}),0);
 ck('F6f mutation: labhesh to 6th without malefic -> c22-11c unserved',row(m2,'c22-11c').served===false);
}
// --- F7: nodes tolerated but never fire conditions (incl. 22.11c malefic yuti)
{
 const ps=mk({Sun:0,Moon:3,Mars:9,Mercury:1,Jupiter:2,Venus:4,Saturn:7});
 ps.push({graha:'Rahu',rashi:7,degreesInRashi:10},{graha:'Ketu',rashi:1,degreesInRashi:10});
 const rep=T.report(ps,0);
 ck('F7a nodes accepted, report builds',Array.isArray(rep.rows));
 ck('F7b Rahu yuti with labhesh in 8th does NOT fire c22-11c',row(rep,'c22-11c').served===false,{d:row(rep,'c22-11c').detail});
 ck('F7c nodes-note present and shipped',typeof rep.nodesNote==='string'&&rep.nodesNote.includes('अमॉडल')&&rep.nodesNote.includes('सात ग्रह'));
}
// --- F8: waning Moon counts as malefic yuti partner (3.11 dynamic class)
{
 // Sun sign 10 -> 310d, Moon+Saturn sign 7 -> 220d; elongation mod(220-310,360)=270 -> waning -> पाप
 const rep=T.report(mk({Sun:10,Moon:7,Mars:9,Mercury:1,Jupiter:2,Venus:4,Saturn:7}),0);
 ck('F8 waning Moon yuti fires c22-11c (dynamic class)',row(rep,'c22-11c').served===true,{d:row(rep,'c22-11c').detail});
}
// --- F9: omission scans on served rows + source literals (single-quoted AND backtick templates)
{
 const charts=[mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:10}),
  mk({Sun:0,Moon:8,Mars:7,Mercury:8,Jupiter:8,Venus:4,Saturn:1}),
  mk({Sun:5,Moon:8,Mars:9,Mercury:1,Jupiter:2,Venus:4,Saturn:0}),
  mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:7})];
 const banned=['रोग','दीर्घ','आयु','व्रण','यमल','नाल','त्रिमाता','मृत्यु','मारक','उपाय','मंत्र','रत्न','निष्क'];
 const leaks=[];
 for(const psx of charts){const rep=T.report(psx,0);
  for(const r of rep.rows){if(!r.served)continue;
   for(const w of banned){if(r.text.includes(w)||(r.detail||'').includes(w)||(r.transparency||'').includes(w))leaks.push([r.id,w]);}
   if(/परंपरा-कथन/.test(r.text)===false)leaks.push([r.id,'missing tradition-label']);}}
 ck('F9a no banned wording in any served text/detail/transparency',leaks.length===0,leaks);
 // source-level: EVERY string literal in the module - single-quoted AND backtick
 // template literals (ch22 correction: backtick gap closed from day one).
 // Comments carry the omitted category words and are not literals.
 const tsrc=fs.readFileSync(__dirname+'/../kundli-labhaphal.js','utf8');
 const sq=[...tsrc.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(m=>m[1]);
 const bt=[...tsrc.matchAll(/`((?:[^`\\]|\\.)*)`/gs)].map(m=>m[1]);
 const srcLeaks=sq.concat(bt).flatMap(t=>banned.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,40),w})));
 ck('F9b source-level: no banned wording in any literal (single-quote + backtick)',srcLeaks.length===0,{sq:sq.length,bt:bt.length,srcLeaks});
 ck('F9c backtick templates actually covered by the scan',bt.length>0,{bt:bt.length});
 const all=T.report(charts[0],0);
 ck('F9d omitN is 5',all.omitN===5,{omitN:all.omitN});
 ck('F9e count-only omission notice (no category words)',banned.every(w=>!all.omitNotice.includes(w))&&all.omitNotice.includes('5'));
 ck('F9f nodes-note present',all.nodesNote.includes('अमॉडल'));
 ck('F9g exactly 8 rows',all.rows.length===8,{n:all.rows.length});
 ck('F9h header states no-prediction framing',all.header.includes('भविष्यकथन या निश्चय नहीं'));
 ck('F9i favourable and adverse rows both present',all.rows.some(r=>r.polarity==='अनुकूल')&&all.rows.some(r=>r.polarity==='प्रतिकूल'));
 ck('F9j unmodeled segments not counted in omitN',all.omitN===5&&!all.omitNotice.includes('सूर्यांशग'));
}
// --- F10: input validation
{
 let e1=null,e2=null,e3=null;
 try{T.report(mk({Sun:0,Moon:1,Mars:2,Mercury:3,Jupiter:4,Venus:5,Saturn:6}),12);}catch(e){e1=e;}
 try{T.report(mk({Sun:0,Moon:3,Mars:9,Mercury:6,Jupiter:7,Venus:3,Saturn:11}).slice(0,6),0);}catch(e){e2=e;}
 const bad3=mk({Sun:0,Moon:3,Mars:9,Mercury:6,Jupiter:7,Venus:3,Saturn:11});delete bad3[0].degreesInRashi;
 try{T.report(bad3,0);}catch(e){e3=e;}
 ck('F10a asc out of range rejected',!!e1);
 ck('F10b missing graha rejected',!!e2);
 ck('F10c missing degreesInRashi rejected (3.11 machinery needs it)',!!e3);
}
// --- F11: real chart smoke (1990-06-15 10:30 Patna via astro-core) - rows build, scan clean
{
 const vm=require('vm');const c={Date};vm.createContext(c);
 vm.runInContext(fs.readFileSync(__dirname+'/../astro-core.js','utf8'),c);const A=c.BrahmAstro;
 function civilUTC(date,time,tz){const base=Date.parse(date+'T'+time+':00Z');let t=base;for(let i=0;i<4;i++){const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(t).map(x=>[x.type,x.value]));t+=base-Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);}return new Date(t)}
 const l={latitude:25.5941,longitude:85.1376,timeZone:'Asia/Kolkata'};
 const birth=civilUTC('1990-06-15','10:30','Asia/Kolkata');
 const ps=A.grahaPositions(birth),lagna=A.siderealLagna(birth,l);
 const rep=T.report(ps.map(x=>({graha:x.graha,rashi:x.rashi,degreesInRashi:x.degreesInRashi})),Math.floor(lagna/30));
 ck('F11a real chart: 8 rows build',rep.rows.length===8);
 const served=rep.rows.filter(r=>r.served);
 ck('F11b real chart: at least one served, one unserved (non-vacuous on real sky)',served.length>0&&served.length<8,{served:served.map(r=>r.id)});
 const leaks=[];for(const r of served)for(const w of ['रोग','दीर्घ','आयु','व्रण','यमल','मृत्यु','उपाय','मंत्र','रत्न','निष्क'])if((r.text+r.detail+(r.transparency||'')).includes(w))leaks.push([r.id,w]);
 ck('F11c real chart: omission scan clean on served rows',leaks.length===0,leaks);
}
// --- F12: UI checks on the ACTUAL labhaPanel body -------------------------------
{
 const source=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
 const start=source.indexOf('function labhaPanel(){'),end=source.indexOf('function tanuPanel(){');
 ck('F12a labhaPanel body sliceable',start>0&&end>start);
 const body=source.slice(start,end);
 const esc=s=>String(s).replace(/[&<>"']/g,c=>' ');
 const run=(psx,asc)=>{const f=new Function('window','ps','ls','esc','panel','pending',body+';return labhaPanel();');
  return f({BrahmLabhaPhal:T},psx,asc,esc,(t,s)=>s,(t,s)=>'PENDING['+t+'] '+s);};
 const psx=mk({Sun:0,Moon:3,Mars:7,Mercury:1,Jupiter:2,Venus:4,Saturn:7});
 const html=run(psx,0);
 ck('F12b panel renders (not pending)',!html.startsWith('PENDING'),html.slice(0,80));
 ck('F12c header verbatim',html.includes(T.HEADER));
 ck('F12d omit notice verbatim',html.includes(T.OMIT_NOTICE));
 ck('F12e 8 row cards',(html.match(/<details>/g)||[]).length===8);
 ck('F12f served row shows tradition text',html.includes('बहुत चेष्टा के बावजूद लाभ न मिलने की चर्चा है'));
 ck('F12g unserved row hides tradition text',html.includes('पूरी नहीं बनी; परंपरा-कथन नहीं दिखाया गया'));
 const unservedCount=(html.match(/शर्त नहीं बनी/g)||[]).length;
 ck('F12h F1 chart: served/unserved mix visible',unservedCount>0&&unservedCount<8,{unservedCount});
 ck('F12i unmodeled note rendered',html.includes('अस्तता-गणना अभी अमॉडल'));
 ck('F12j nodes note rendered',html.includes('राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल'));
 ck('F12k pane-report wiring (phalMethodPanel inserted after bhavaphalPanel; sequence pin updated)',source.includes('bhavaphalPanel()+phalMethodPanel()+tanuPanel()+yutiphalPanel()+labhaPanel()'));
 ck('F12l module absent -> honest pending',(()=>{const f=new Function('window','ps','ls','esc','panel','pending',body+';return labhaPanel();');
  return f({},psx,0,esc,(t,s)=>s,(t,s)=>'PENDING '+s);})().startsWith('PENDING'));
 ck('F12m kundli.html loads module',fs.readFileSync(__dirname+'/../kundli.html','utf8').includes('kundli-labhaphal.js'));
 // UI-body literal scan (hardened scans carried to the panel): no banned wording
 // in any single-quoted or backtick literal inside labhaPanel's own body
 const banned=['रोग','दीर्घ','आयु','व्रण','यमल','नाल','त्रिमाता','मृत्यु','मारक','उपाय','मंत्र','रत्न','निष्क'];
 const uiLits=[...body.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(m=>m[1])
  .concat([...body.matchAll(/`((?:[^`\\]|\\.)*)`/gs)].map(m=>m[1]));
 const uiLeaks=uiLits.flatMap(t=>banned.filter(w=>t.includes(w)).map(w=>({lit:t.slice(0,40),w})));
 ck('F12n labhaPanel body literals clean (single-quote + backtick)',uiLeaks.length===0,{n:uiLits.length,uiLeaks});
}
// --- F13: EXALT pinned for ALL seven grahas (implementation fix)
// Prior gap: only Saturn's dignity was fixture-pinned; labhesh can be any graha, so a
// wrong EXALT value for the other six would ship silently (the Mercury 5->4
// tamper probe passed 60/60). Now: per-graha fixtures for c22-2b/c22-11a across all 7,
// expectations hardcoded HERE from the standard uccha/nicha list (independent of the
// module), plus a byte-level sync assertion of the duplicated EXALT literal.
{
 const BP=require('../kundli-bhavaphal.js');
 const DIGNITY={Sun:[0,6],Moon:[1,7],Mars:[9,3],Mercury:[5,11],Jupiter:[3,9],Venus:[11,5],Saturn:[6,0]}; // [exalt, debil] - standard uccha/nicha, hardcoded independently
 const SEVENG=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
 const modN=(x,n)=>((x%n)+n)%n;
 for(const g of SEVENG){
  const s=BP.SIGN_LORD.findIndex(l=>l===g); // a sign this graha rules
  const asc=modN(s-10,12); // make that sign the 11th bhava -> g becomes labhesh
  const neutral=modN(s+4,12);
  const chart=target=>{const map={};for(const o of SEVENG)map[o]=neutral;map[g]=target;return mk(map);};
  const [ex,de]=DIGNITY[g];
  const repE=T.report(chart(ex),asc);
  ck('F13-2b-'+g+' exalted labhesh serves c22-2b',row(repE,'c22-2b').served===true,{g,asc,d:row(repE,'c22-2b').detail});
  ck('F13-11a-'+g+' exalted labhesh does NOT serve c22-11a',row(repE,'c22-11a').served===false);
  const repD=T.report(chart(de),asc);
  ck('F13-11a-'+g+' debilitated labhesh serves c22-11a',row(repD,'c22-11a').served===true,{g,asc,d:row(repD,'c22-11a').detail});
  ck('F13-2b-'+g+' debilitated labhesh does NOT serve c22-2b',row(repD,'c22-2b').served===false);
  const repC=T.report(chart(modN(ex+3,12)),asc); // neither exalt nor debil
  ck('F13-ctl-'+g+' neutral-sign labhesh serves neither',row(repC,'c22-2b').served===false&&row(repC,'c22-11a').served===false);
 }
 const modSrc=fs.readFileSync(__dirname+'/../kundli-labhaphal.js','utf8');
 const engSrc=fs.readFileSync(__dirname+'/../kundli-engine.js','utf8');
 const exL=(modSrc.match(/const EXALT=\{[^}]*\}/)||[])[0];
 const exE=(engSrc.match(/const EXALT=\{[^}]*\}/)||[])[0];
 ck('F13x duplicated EXALT literal byte-identical to kundli-engine.js',!!exL&&exL===exE,{exL,exE});
}
console.log(`\nlabhaphal: ${pass} pass, ${fail} fail`);
if(bad.length)console.log('FAILED:',bad.join(', '));
process.exitCode=fail?1:0;
