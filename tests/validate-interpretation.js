const R = require('../kundli-rules.js');
const S={Mesha:0,Vrishabha:1,Mithuna:2,Karka:3,Simha:4,Kanya:5,Tula:6,Vrischika:7,Dhanu:8,Makara:9,Kumbha:10,Meena:11};
let pass=0,fail=0;const bad=[];
function ck(id,actual,expected){const ok=JSON.stringify(actual)===JSON.stringify(expected);ok?pass++:fail++;if(!ok)bad.push({id,actual,expected});console.log((ok?'PASS ':'FAIL ')+id+' | actual='+JSON.stringify(actual)+' expected='+JSON.stringify(expected));}
const P=(graha,rashi,extra={})=>Object.assign({graha,rashi,longitude:rashi*30+10,degreesInRashi:10},extra);
function base(moonRashi){return ['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'].map(g=>P(g,moonRashi));}
function set(ps,g,r,extra){const p=ps.find(x=>x.graha===g);p.rashi=r;p.longitude=r*30+(extra&&extra.deg||10);if(extra&&extra.deg!==undefined)p.degreesInRashi=extra.deg;return ps;}

// --- Avakhada F1: Moon Mesha, Bharani pada 3
ck('F1-avakhada',R.avakhada({rashi:S.Mesha,nakshatra:1,pada:3,degreesInRashi:20}),
 {element:'अग्नि',varna:'क्षत्रिय',vashya:'चतुष्पद',yoni:'गज',gana:'मनुष्य',nadi:'मध्य',syllable:'Le'});
// vashya halves
ck('vashya-Dhanu-14.9',R.avakhada({rashi:S.Dhanu,nakshatra:19,pada:1,degreesInRashi:14.9}).vashya,'मानव');
ck('vashya-Dhanu-15.1',R.avakhada({rashi:S.Dhanu,nakshatra:19,pada:1,degreesInRashi:15.1}).vashya,'चतुष्पद');
ck('vashya-Makara-14.9',R.avakhada({rashi:S.Makara,nakshatra:21,pada:1,degreesInRashi:14.9}).vashya,'चतुष्पद');
ck('vashya-Makara-15.1',R.avakhada({rashi:S.Makara,nakshatra:21,pada:1,degreesInRashi:15.1}).vashya,'जलचर');
// yoni/gana/nadi spot rows
ck('yoni-UAshadha-label',R.avakhada({rashi:S.Dhanu,nakshatra:20,pada:1,degreesInRashi:5}).yoni,'वृषभ (NP पाठ)');
ck('nadi-Rohini',R.avakhada({rashi:S.Vrishabha,nakshatra:3,pada:1,degreesInRashi:5}).nadi,'अन्त्य');
ck('gana-Ashlesha',R.avakhada({rashi:S.Karka,nakshatra:8,pada:1,degreesInRashi:5}).gana,'राक्षस');
ck('syllable-Shravana-p2',R.avakhada({rashi:S.Makara,nakshatra:21,pada:2,degreesInRashi:5}).syllable,'Je');

// --- Mahapurusha F6g (corrected geometry)
function maha(ps,asc,id){const out=R.yogas(ps,asc).filter(y=>y.id.startsWith(id));return out.map(y=>[y.id,y.hit]);}
ck('F6g+ lagna-Karka Mars-Mesha',maha(set(base(S.Simha),'Mars',S.Mesha),S.Karka,'Mars'),[['Mars-लग्न',true],['Mars-चन्द्र',false]]);
ck('F6g-k lagna-Kumbha Mars-Mesha',maha(set(base(S.Simha),'Mars',S.Mesha),S.Kumbha,'Mars'),[['Mars-लग्न',false],['Mars-चन्द्र',false]]);
ck('F6g-d lagna-Makara Mars-Tula',maha(set(base(S.Simha),'Mars',S.Tula),S.Makara,'Mars'),[['Mars-लग्न',false],['Mars-चन्द्र',false]]);
// Moon-origin per Phal 6.4: Moon Karka, Mars Mesha (10th from Moon, own) -> chandra row true
ck('Maha-Moon-origin-6.4',maha(set(base(S.Karka),'Mars',S.Mesha),S.Meena,'Mars'),[['Mars-लग्न',false],['Mars-चन्द्र',true]]);
// exaltation limb: Jupiter Karka (exalted) kendra from lagna Mesha
ck('Maha-exalt-limb',maha(set(base(S.Vrishabha),'Jupiter',S.Karka),S.Mesha,'Jupiter'),[['Jupiter-लग्न',true],['Jupiter-चन्द्र',false]]);

// --- Moon yogas
function my(ps,ids){const out=R.yogas(ps,S.Mesha);return ids.map(i=>[i,out.find(y=>y.id===i).hit]);}
ck('F6a Sunapha',my(set(base(S.Simha),'Mars',S.Kanya),['sunapha','anapha','durudhura']),[['sunapha',true],['anapha',false],['durudhura',false]]);
ck('F6b Anapha',my(set(base(S.Simha),'Mercury',S.Karka),['sunapha','anapha','durudhura']),[['sunapha',false],['anapha',true],['durudhura',false]]);
{const ps=set(base(S.Simha),'Mars',S.Kanya);set(ps,'Venus',S.Karka);
 ck('F6c Durudhura',my(ps,['sunapha','anapha','durudhura']),[['sunapha',true],['anapha',true],['durudhura',true]]);}
{const ps=set(base(S.Simha),'Sun',S.Kanya);
 ck('Sun-excluded-Sunapha',my(ps,['sunapha','anapha','durudhura']),[['sunapha',false],['anapha',false],['durudhura',false]]);}
ck('F6e+ Kesari',my(set(base(S.Simha),'Jupiter',S.Vrischika),['kesari']),[['kesari',true]]);
ck('F6e- no-Kesari',my(set(base(S.Simha),'Jupiter',S.Dhanu),['kesari']),[['kesari',false]]);
ck('Kesari-opp',my(set(base(S.Simha),'Jupiter',S.Kumbha),['kesari']),[['kesari',true]]);

// --- Manglik / sade sati
function dg(ps,asc,satRashi){return R.doshaGeometry(ps,asc,[P('Saturn',satRashi)]);}
ck('F2 Manglik-12th',(x=>[x.marsHouse,x.marsPlacement])(dg(set(base(S.Simha),'Mars',S.Mithuna),S.Karka,S.Meena)),[12,true]);
ck('F3a Mars-8th',(x=>[x.marsHouse,x.marsPlacement])(dg(set(base(S.Simha),'Mars',S.Dhanu),S.Vrishabha,S.Meena)),[8,true]);
ck('Manglik-1st',(x=>[x.marsHouse,x.marsPlacement])(dg(set(base(S.Simha),'Mars',S.Mesha),S.Mesha,S.Meena)),[1,true]);
ck('Manglik-6th-neg',(x=>[x.marsHouse,x.marsPlacement])(dg(set(base(S.Simha),'Mars',S.Kanya),S.Mesha,S.Meena)),[6,false]);
ck('F9a sadeSati-2',dg(base(S.Meena),S.Mesha,S.Meena).sadeSati,'दूसरा');
ck('F9b sadeSati-3',dg(base(S.Kumbha),S.Mesha,S.Meena).sadeSati,'तीसरा');
ck('F9c sadeSati-1',dg(base(S.Mesha),S.Mesha,S.Meena).sadeSati,'पहला');
ck('sadeSati-none',dg(base(S.Simha),S.Mesha,S.Meena).sadeSati,null);
// axis screen: all planets within one hemisphere of Rahu
{const ps=base(S.Mesha);['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].forEach((g,i)=>{const p=ps.find(x=>x.graha===g);p.longitude=10+i*15;});ps.find(x=>x.graha==='Rahu').longitude=0;
 ck('axis-one-side',dg(ps,S.Mesha,S.Meena).axis,'सातों ग्रह एक अर्धवृत्त में');}
{const ps=base(S.Mesha);['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].forEach((g,i)=>{const p=ps.find(x=>x.graha===g);p.longitude=10+i*30;});ps.find(x=>x.graha==='Rahu').longitude=0;
 ck('axis-spread',dg(ps,S.Mesha,S.Meena).axis,'सातों ग्रह एक अर्धवृत्त में नहीं');}
console.log('\n'+pass+'/'+(pass+fail)+' passed');if(fail)process.exit(1);

const assert=require('node:assert/strict');
for(const field of ['rashi','nakshatra','pada','degreesInRashi'])for(const v of [undefined,NaN,'1',-1,100]){const moon={rashi:0,nakshatra:0,pada:1,degreesInRashi:1};moon[field]=v;assert.throws(()=>R.avakhada(moon));}
assert.throws(()=>R.yogas([],0));assert.throws(()=>R.yogas(base(0),'0'));assert.throws(()=>R.yogas([...base(0),P('Moon',1)],0));assert.throws(()=>R.doshaGeometry(base(0),0,[]));assert.throws(()=>R.doshaGeometry(base(0),0,[P('Saturn',NaN)]));
console.log('25 additional fail-closed input cases PASS');

// --- Phaladeepika 6.5/6.14 additions: Sakata, Kemadruma, Moon-from-Sun grade
function y1(ps,asc,id){return R.yogas(ps,asc).find(y=>y.id===id);}
// Sakata: Moon Simha, Jupiter Meena -> Moon 6th from Jupiter; asc Mesha (Moon 5th, no kendra) -> hit, not cancelled
ck('Sakata-hit',(x=>[x.hit,x.cancelled])(y1(set(base(S.Simha),'Jupiter',S.Meena),S.Mesha,'sakata')),[true,false]);
// Same geometry, asc Vrishabha -> Moon 4th from lagna (kendra) -> cancelled per 6.14
ck('Sakata-cancelled',(x=>[x.hit,x.cancelled])(y1(set(base(S.Simha),'Jupiter',S.Meena),S.Vrishabha,'sakata')),[true,true]);
// Kesari geometry excludes Sakata
{const ps=set(base(S.Simha),'Jupiter',S.Vrischika);ck('Sakata-Kesari-exclusive',(x=>[x.hit])(y1(ps,S.Mesha,'sakata')).concat([y1(ps,S.Mesha,'kesari').hit]),[false,true]);}
// Sakata negative: Moon 2nd from Jupiter
ck('Sakata-neg',y1(set(base(S.Simha),'Jupiter',S.Karka),S.Mesha,'sakata').hit,false);
// Kemadruma: base chart has every planet conjunct Moon -> hit true, cancelled true (conjunction limb)
ck('Kemadruma-conj-cancel',(x=>[x.hit,x.cancelled])(y1(base(S.Simha),S.Mesha,'kemadruma')),[true,true]);
// Spread: others in Tula (3rd from Moon), Sun in Kanya (2nd, excluded from formation; not conjunct/kendra) -> hit, not cancelled
{const ps=base(S.Simha);['Mars','Mercury','Jupiter','Venus','Saturn'].forEach(g=>set(ps,g,S.Tula));set(ps,'Sun',S.Kanya);
 ck('Kemadruma-hit-not-cancelled',(x=>[x.hit,x.cancelled])(y1(ps,S.Mesha,'kemadruma')),[true,false]);}
// Cancellation limb: Moon kendra from lagna
{const ps=base(S.Simha);['Mars','Mercury','Jupiter','Venus','Saturn'].forEach(g=>set(ps,g,S.Tula));
 ck('Kemadruma-lagna-kendra-cancel',(x=>[x.hit,x.cancelled])(y1(ps,S.Vrishabha,'kemadruma')),[true,true]);}
// Cancellation limb: planet kendra from Moon
{const ps=base(S.Simha);['Mars','Mercury','Jupiter','Venus'].forEach(g=>set(ps,g,S.Tula));set(ps,'Saturn',S.Vrischika);
 ck('Kemadruma-moon-kendra-cancel',(x=>[x.hit,x.cancelled])(y1(ps,S.Mesha,'kemadruma')),[true,true]);}
// No Kemadruma when Sunapha present
ck('Kemadruma-neg-sunapha',y1(set(base(S.Simha),'Mars',S.Kanya),S.Mesha,'kemadruma').hit,false);
// Sun alone adjacent (2nd) does not create formation (6.5 first half excludes Sun); non-conjunct non-kendra Sun does not cancel either
{const ps=base(S.Simha);set(ps,'Sun',S.Kanya);['Mars','Mercury','Jupiter','Venus','Saturn'].forEach(g=>set(ps,g,S.Tula));
 ck('Kemadruma-sun-excluded',(x=>[x.hit,x.cancelled])(y1(ps,S.Mesha,'kemadruma')),[true,false]);}
// Cancellation limbs include Sun (6.5 cancellation wording does not repeat the exclusion - recorded interpretation choice)
{const ps=base(S.Simha);['Mars','Mercury','Jupiter','Venus','Saturn'].forEach(g=>set(ps,g,S.Tula));
 ck('Kemadruma-sun-conj-cancel',(x=>[x.hit,x.cancelled])(y1(ps,S.Mesha,'kemadruma')),[true,true]);}
{const ps=base(S.Simha);['Mars','Mercury','Jupiter','Venus','Saturn'].forEach(g=>set(ps,g,S.Tula));set(ps,'Sun',S.Vrishabha);
 ck('Kemadruma-sun-kendra-cancel',(x=>[x.hit,x.cancelled])(y1(ps,S.Mesha,'kemadruma')),[true,true]);}
// PanchaMahapurusha count = distinct yogas across lagna/Moon origins (6.4 pancakam/tesveka) - reviewer synthetic: lagna+Moon Karka, Mars Mesha, Jupiter Karka, Saturn Tula => 3, not 6
{const ps=base(S.Simha);set(ps,'Moon',S.Karka);set(ps,'Mars',S.Mesha);set(ps,'Jupiter',S.Karka);set(ps,'Saturn',S.Tula);const s=R.panchaMaha(R.yogas(ps,S.Karka));
 ck('PanchaMaha-distinct-3',s.count,3);
 ck('PanchaMaha-origins-both',s.entries.map(e=>e.origins),[['लग्न','चन्द्र'],['लग्न','चन्द्र'],['लग्न','चन्द्र']]);
 ck('PanchaMaha-single-origin',R.panchaMaha(R.yogas(set(base(S.Simha),'Mars',S.Mesha),S.Karka)).count,1);}
// Moon-from-Sun grade
ck('MSame-adhama',y1(base(S.Simha),S.Mesha,'moon-from-sun').level,'अधमा');
ck('M2-sama',y1(set(base(S.Simha),'Sun',S.Karka),S.Mesha,'moon-from-sun').level,'सम');
ck('M3-varishtha',y1(set(base(S.Simha),'Sun',S.Mithuna),S.Mesha,'moon-from-sun').level,'वरिष्ठ');
ck('M5-sama',y1(set(base(S.Simha),'Sun',S.Mesha),S.Mesha,'moon-from-sun').level,'सम');
ck('M9-varishtha',y1(set(base(S.Simha),'Sun',S.Dhanu),S.Mesha,'moon-from-sun').level,'वरिष्ठ');
ck('M10-adhama',y1(set(base(S.Simha),'Sun',S.Vrischika),S.Mesha,'moon-from-sun').level,'अधमा');
console.log('\nFINAL '+pass+'/'+(pass+fail)+' passed');if(fail){console.log(JSON.stringify(bad,null,1));process.exit(1);}

// --- phal wiring semantics (review-adjusted)
// phal text present on all named yogas; Mahapurusha phal keyed by planet
ck('phal-kesari-present',/सिंह-सदृश/.test(y1(base(S.Simha),S.Mesha,'kesari').phal||''),true);
ck('phal-mahapurusha-keyed',(y1(set(base(S.Simha),'Mars',S.Mesha),S.Karka,'Mars-लग्न').phal||'').length>10,true);
// Durudhura subsumes Sunapha/Anapha display (geometry booleans unchanged)
{const ps=set(base(S.Simha),'Mars',S.Kanya);set(ps,'Venus',S.Karka);
 const out=R.yogas(ps,S.Mesha);
 ck('durudhura-subsumes',out.filter(y=>y.subsumed==='durudhura').map(y=>y.id).sort(),['anapha','sunapha']);
 ck('durudhura-booleans-kept',out.filter(y=>['sunapha','anapha','durudhura'].includes(y.id)).every(y=>y.hit),true);}
// No subsumption when only one side occupied
ck('no-subsumed-single',R.yogas(set(base(S.Simha),'Mars',S.Kanya),S.Mesha).every(y=>!y.subsumed),true);
// moon-from-sun always hit, exactly one level, phal framed as classification
{const y=y1(base(S.Simha),S.Mesha,'moon-from-sun');ck('msun-universal',[y.hit,/सामान्य वर्गीकरण/.test(y.phal)],[true,true]);}
// cancelled sakata still carries phal field (UI suppresses it), kemadruma ditto
{const y=y1(set(base(S.Simha),'Jupiter',S.Meena),S.Vrishabha,'sakata');ck('sakata-cancelled-phal-held',[y.hit,y.cancelled,(y.phal||'').length>10],[true,true,true]);}
console.log('\nFINAL2 '+pass+'/'+(pass+fail)+' passed');if(fail){console.log(JSON.stringify(bad,null,1));process.exit(1);}
