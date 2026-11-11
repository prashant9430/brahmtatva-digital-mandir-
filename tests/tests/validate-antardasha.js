// AD-* antardasha pair layer checks (BPHS ch52-60). Run: node tests/validate-antardasha.js
const R = require('../kundli-rules.js');
const DP = require('../kundli-dasha-pairs.js');
const REFS = require('../harness/antardasha-refs.json');
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push({id,detail});console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}
const VIM=['Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury','Ketu','Venus'];
const P=(graha,rashi,deg=10)=>({graha,rashi,longitude:rashi*30+deg,degreesInRashi:deg});
function base(r){return VIM.map(g=>P(g,r));}
function set(ps,g,r,deg){const p=ps.find(x=>x.graha===g);p.rashi=r;p.longitude=r*30+(deg===undefined?10:deg);if(deg!==undefined)p.degreesInRashi=deg;return ps;}

// AD-1: 81 pairs, chapter + ref agreement with the reviewer-verified refs contract
{
 let n=0,errs=[];
 for(const m of VIM)for(const a of VIM){
  const rec=DP.pair(m,a),ref=REFS.pairs[m+'-'+a];n++;
  if(!rec){errs.push('missing '+m+'-'+a);continue;}
  if(rec.ch!==ref.ch)errs.push('ch mismatch '+m+'-'+a);
  if(!rec.ref.startsWith('BPHS '+rec.ch+'.'))errs.push('ref prefix '+m+'-'+a);
 }
 ck('AD-1 81-pair coverage vs refs contract',n===81&&errs.length===0,errs);
}
// AD-2: fav/adv prose always present (no-fabricated-balance: one-sided pairs keep source prose, never invented opposing content)
{
 const errs=[];
 for(const m of VIM)for(const a of VIM){const r=DP.pair(m,a);if(!r.fav||!r.adv)errs.push(m+'-'+a);}
 ck('AD-2 fav+adv prose present on all 81',errs.length===0,errs);
 ck('AD-2b one-sided-house pair keeps source prose (Venus-Ketu)',DP.pair('Venus','Ketu').fl.length===0&&DP.pair('Venus','Ketu').fm.length===0&&DP.pair('Venus','Ketu').fav.length>50);
}
// AD-3: omission invariants - no death/remedy vocabulary in pair prose
{
 const banned=['मृत्यु','मरण','आकाल','देहांत','श्राद्ध','उपाय','मृत्युंजय','सहस्रनाम','सप्तशती','प्रायश्चित'];
 const errs=[];
 for(const m of VIM)for(const a of VIM){const r=DP.pair(m,a),t=[r.fav,r.adv,r.mid||''].join(' ');
  for(const b of banned)if(t.includes(b))errs.push(m+'-'+a+' has '+b);}
 ck('AD-3 omission vocabulary absent from all pair prose',errs.length===0,errs);
}
// AD-4: flag invariants against reviewer-verified lists
{
 const f=fn=>VIM.flatMap(m=>VIM.filter(a=>fn(DP.pair(m,a))).map(a=>m+'-'+a));
 ck('AD-4a weak == 4 verified',JSON.stringify(f(r=>r.weak))===JSON.stringify(['Sun-Moon','Jupiter-Moon','Saturn-Moon','Mercury-Moon']),f(r=>r.weak));
 ck('AD-4b waning == 3 verified',JSON.stringify(f(r=>r.waning))===JSON.stringify(['Sun-Moon','Mars-Moon','Saturn-Moon']),f(r=>r.waning));
 ck('AD-4c waxing == 2 verified',JSON.stringify(f(r=>r.waxing))===JSON.stringify(['Mars-Moon','Ketu-Moon']),f(r=>r.waxing));
 ck('AD-4d no dig/deb on node antars',f(r=>(r.dig||r.deb)&&false).length===0&&VIM.every(m=>!DP.pair(m,'Rahu').dig&&!DP.pair(m,'Rahu').deb&&!DP.pair(m,'Ketu').dig&&!DP.pair(m,'Ketu').deb));
 ck('AD-4e waning/waxing only Moon antars',f(r=>(r.waning||r.waxing)).every(k=>k.endsWith('-Moon')));
 ck('AD-4f prov only Mercury-Ketu',JSON.stringify(f(r=>r.prov))===JSON.stringify(['Mercury-Ketu']));
 ck('AD-4g gap flags',DP.pair('Mercury','Rahu').gap==='58.50'&&DP.pair('Ketu','Saturn').gap==='59.66'&&f(r=>r.gap).length===2);
 ck('AD-4h census',f(r=>r.remedy).length===77&&f(r=>r.maraka).length===35&&f(r=>r.deathx).length===20&&f(r=>r.dig).length===59,[f(r=>r.remedy).length,f(r=>r.maraka).length,f(r=>r.deathx).length,f(r=>r.dig).length]);
 ck('AD-4i digk kinds subset',VIM.every(m=>VIM.every(a=>{const k=DP.pair(m,a).digk||[];return k.every(x=>['ex','own','mt','nav'].includes(x))&&(!k.length||DP.pair(m,a).dig);})));
}
// AD-5: dashaPairContext computation
{
 // Saturn maha (rashi 0), Moon antar rashi 3 -> 4th from lagna AND 4th from maha
 let ps=set(base(0),'Saturn',0);set(ps,'Moon',3);
 let pc=R.dashaPairContext(ps,0,'Saturn','Moon','shukla');
 ck('AD-5a favH lagna+fromMaha',pc.favH.some(x=>x.basis==='लग्न से 4वाँ भाव')&&pc.favH.some(x=>x.basis==='महादशा-स्वामी से 4वाँ भाव'),pc.favH);
 // Moon rashi 5 -> 6th from both; Saturn-Moon has no lagna-adverse list, am=[6,8,12]
 set(ps,'Moon',5);pc=R.dashaPairContext(ps,0,'Saturn','Moon','krishna');
 ck('AD-5b advH fromMaha only',pc.advH.length===1&&pc.advH[0].basis==='महादशा-स्वामी से 6वाँ भाव',pc.advH);
 ck('AD-5c waning hit krishna',pc.pakshaNote.includes('प्रतिकूल शर्त बनती है'),pc.pakshaNote);
 // same-lord pair: no from-maha rows
 ps=set(base(0),'Sun',3);pc=R.dashaPairContext(ps,0,'Sun','Sun','shukla');
 ck('AD-5d same-lord no fromMaha rows',!pc.favH.concat(pc.advH).some(x=>x.basis.includes('महादशा-स्वामी'))&&pc.houseFromMaha===1);
 // dig: Rahu-Saturn digk ex/own/mt - Saturn Tula exalted
 ps=set(base(0),'Rahu',0);set(ps,'Saturn',6);
 pc=R.dashaPairContext(ps,0,'Rahu','Saturn','shukla');
 ck('AD-5e dig exalted hit',pc.favH.some(x=>x.basis.includes('उच्च राशि')),pc.favH);
 // Mars-Mercury digk ex only: Mercury Mithuna own -> no dig hit + note
 ps=set(base(0),'Mars',0);set(ps,'Mercury',2);
 pc=R.dashaPairContext(ps,0,'Mars','Mercury','shukla');
 ck('AD-5f digk own not named -> no hit + note',!pc.favH.some(x=>x.basis.includes('गरिमा'))&&pc.notes.some(n=>n.includes('नामित गरिमा-शर्त')),pc.notes);
 set(ps,'Mercury',5);pc=R.dashaPairContext(ps,0,'Mars','Mercury','shukla');
 ck('AD-5g digk ex named -> hit',pc.favH.some(x=>x.basis.includes('उच्च राशि')),pc.favH);
 // deb: Mars-Saturn deb flag, Saturn Mesha debilitated
 ps=set(base(0),'Mars',0);set(ps,'Saturn',0);
 pc=R.dashaPairContext(ps,0,'Mars','Saturn','shukla');
 ck('AD-5h debilitation hit',pc.advH.some(x=>x.basis.includes('नीच राशि')),pc.advH);
 // reviewer 11:38 gate 2: Mars-Saturn digk nav-only (translation ambiguity) - exalted rashi Saturn gives NO rashi dignity hit
 set(ps,'Saturn',6);pc=R.dashaPairContext(ps,0,'Mars','Saturn','shukla');
 ck('AD-5h2 Mars-Saturn nav-only digk',!pc.favH.some(x=>x.basis.includes('गरिमा'))&&pc.notes.some(n=>n.includes('नवांश-गरिमा भी शर्त'))&&pc.notes.some(n=>n.includes('नामित गरिमा-शर्त')),{favH:pc.favH,notes:pc.notes});
 // paksha variants
 ps=set(base(0),'Mars',0);set(ps,'Moon',3);
 ck('AD-5i waxing shukla full',R.dashaPairContext(ps,0,'Mars','Moon','shukla').pakshaNote.includes('पूर्ण फल'));
 ck('AD-5j waning modifier krishna',R.dashaPairContext(ps,0,'Mars','Moon','krishna').pakshaNote.includes('कुछ कमी'));
 ps=set(base(0),'Ketu',0);set(ps,'Moon',3);
 ck('AD-5k waxing-only pair krishna',R.dashaPairContext(ps,0,'Ketu','Moon','krishna').pakshaNote.includes('पूर्णता की शर्त नहीं बनती'));
 ck('AD-5l paksha missing',R.dashaPairContext(ps,0,'Ketu','Moon').pakshaNote.includes('नहीं जाँची गई'));
 // weak never evaluated
 ps=set(base(0),'Jupiter',0);set(ps,'Moon',3);
 pc=R.dashaPairContext(ps,0,'Jupiter','Moon','krishna');
 ck('AD-5m weak unevaluated note',pc.notes.some(n=>n.includes('अनियंत्रित')),pc.notes);
 // node antar: dignity unmodeled
 ps=set(base(0),'Rahu',0);
 pc=R.dashaPairContext(ps,0,'Rahu','Rahu','shukla');
 ck('AD-5n node dignity unmodeled',pc.dignity===null&&pc.notes.some(n=>n.includes('मत-भेद')));
 // omissions content
 ps=set(base(0),'Mars',0);set(ps,'Saturn',0);
 pc=R.dashaPairContext(ps,0,'Mars','Saturn','shukla');
 ck('AD-5o maraka+deathx+remedy omission lines',pc.omissions.some(o=>o.includes('मारक')&&o.includes('मृत्यु-पदावली'))&&pc.omissions.some(o=>o.includes('अन्य मृत्यु-संबंधी'))&&pc.omissions.some(o=>o.includes('उपाय/दान/जप')),pc.omissions);
 pc=R.dashaPairContext(set(base(0),'Mercury',0),0,'Mercury','Ketu','shukla');
 ck('AD-5p provenance note',pc.omissions.some(o=>o.includes('स्वामित्व-टिप्पणी')),pc.omissions);
 pc=R.dashaPairContext(set(base(0),'Mercury',0),0,'Mercury','Rahu','shukla');
 ck('AD-5q gap note',pc.omissions.some(o=>o.includes('58.50')),pc.omissions);
 // error paths
 let e1=null,e2=null,e3=null;
 try{R.dashaPairContext(ps,0,'Pluto','Moon','shukla');}catch(e){e1=e.message;}
 try{R.dashaPairContext(ps,0,'Mars','Moon','waxing');}catch(e){e2=e.message;}
 try{R.dashaPairContext(base(0).slice(0,8),0,'Mars','Moon','shukla');}catch(e){e3=e.message;}
 ck('AD-5r error paths',!!e1&&!!e2&&!!e3,[e1,e2,e3]);
}
// AD-6: temporal qualifiers retained in known temporal-division pairs
{
 const temporal=['Mars-Ketu','Saturn-Saturn','Saturn-Mercury','Jupiter-Mercury','Mercury-Mars','Mercury-Rahu','Venus-Rahu','Venus-Mercury','Venus-Ketu','Ketu-Moon','Ketu-Sun','Moon-Rahu','Mercury-Moon','Ketu-Jupiter','Saturn-Rahu','Rahu-Mercury'];
 const errs=temporal.filter(k=>{const[m,a]=k.split('-'),r=DP.pair(m,a),t=[r.fav,r.adv,r.mid||''].join(' ');return !(t.includes('आरम्भ')||t.includes('काल-विभाजित')||t.includes('मध्य')||t.includes('पाँच मास')||t.includes('5 मास')||t.includes('बुधवार'));});
 ck('AD-6 temporal qualifiers retained',errs.length===0,errs);
}
// AD-7: mid blocks only where authored; Mercury-Rahu mid names the pair-local inversion
ck('AD-7 mid count and inversion note',VIM.flatMap(m=>VIM.filter(a=>DP.pair(m,a).mid)).length===5&&DP.pair('Mercury','Rahu').mid.includes('युग्म-विशेष')&&DP.pair('Venus','Saturn').adv.includes('लाभ/11 अप्रतिकूल'));
console.log('\n'+pass+'/'+(pass+fail)+' passed');if(fail){console.log(JSON.stringify(bad,null,1));process.exit(1);}
