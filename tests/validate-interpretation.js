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


// --- Yoga-panel omission-boundary correction (main 14:35; same boundary as E2/E3)
// kesari 6.16: आयु-पद हटाया, omit=1
{const y=y1(base(S.Simha),S.Mesha,'kesari');ck('kesari-aayu-omitted',[/दीर्घायु/.test(y.phal),y.omit],[false,1]);}
// anapha 6.6: स्वास्थ्य-स्थिति पद हटाया, omit=1
{const ps=base(S.Simha);set(ps,'Mars',S.Karka);const y=R.yogas(ps,S.Mesha).find(q=>q.id==='anapha');ck('anapha-health-omitted',[y.hit,/आरोग्य/.test(y.phal),y.omit],[true,false,1]);}
// bhadra 6.2: आयु-पद हटाया, omit=1
{const ps=base(S.Simha);set(ps,'Mercury',S.Mithuna);const y=R.yogas(ps,S.Mithuna).find(q=>q.id==='Mercury-लग्न');ck('bhadra-aayu-omitted',[y.hit,/दीर्घायु/.test(y.phal),y.omit],[true,false,1]);}
// sasa 6.4: प्रतिकूल पद पुनःस्थापित (silent adverse-drop उल्टा), कोई लोप नहीं
{const ps=base(S.Simha);set(ps,'Saturn',S.Tula);const y=R.yogas(ps,S.Tula).find(q=>q.id==='Saturn-लग्न');ck('sasa-adverse-restored',[y.hit,/पर-स्त्री-संसर्ग/.test(y.phal),/ऐतिहासिक भाषा/.test(y.phal),y.omit||0],[true,true,true,0]);}
// source-level scan: PHAL block free of every boundary class
{const fs=require('fs');const src=fs.readFileSync(__dirname+'/../kundli-rules.js','utf8');const pb=src.slice(src.indexOf('const PHAL={'),src.indexOf('const PHAL_OMIT'));
 for(const badw of ['दीर्घायु','लघुायु','आरोग्य','रोग-मुक्त','निरोग','अंग-हीन','वियोग','अपंग'])ck('yogaphal-free-'+badw,pb.includes(badw),false);}
// UI: phalLine generic count-only notice, no categories
{const fs=require('fs');const ui=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');const pl=ui.slice(ui.indexOf('function phalLine'));const ple=pl.indexOf('\nfunction ');const plb=pl.slice(0,ple>0?ple:undefined);
 ck('phalline-generic-notice',plb.includes('तकनीकी लोप: '),true);for(const badw of ['दीर्घायु','आरोग्य','रोग-मुक्त','अंग-हीन'])ck('phalline-free-'+badw,plb.includes(badw),false);}

// --- Dasha stage-1: dashaContext (BPHS ch47, ledger dasha-phal-ledger-draft.md)
function dc(ps,asc,lord){try{return R.dashaContext(ps,asc,lord);}catch(e){return 'ERR:'+e.message;}}
ck('dasha-swarashi-Sun',(x=>[x.dignity,x.house,x.zone,x.node])(dc(set(base(S.Simha),'Sun',S.Simha),S.Mesha,'Sun')),['स्वराशि',5,'त्रिकोण',false]);
ck('dasha-uchcha-Mars',(x=>[x.dignity,x.house,x.zone])(dc(set(base(S.Simha),'Mars',S.Makara),S.Karka,'Mars')),['उच्च राशि',7,'केंद्र']);
ck('dasha-neecha-Venus',(x=>[x.dignity,x.zone])(dc(set(base(S.Simha),'Venus',S.Kanya),S.Mesha,'Venus')),['नीच राशि','6/8/12']);
ck('dasha-lagna-bhava-zone',dc(set(base(S.Simha),'Jupiter',S.Mesha),S.Mesha,'Jupiter').zone,'केंद्र और त्रिकोण (लग्न भाव)');
ck('dasha-trikona-9',(x=>[x.house,x.zone])(dc(set(base(S.Simha),'Saturn',S.Dhanu),S.Mesha,'Saturn')),[9,'त्रिकोण']);
ck('dasha-other-zone',(x=>[x.dignity,x.house,x.zone])(dc(set(base(S.Simha),'Sun',S.Vrishabha),S.Mesha,'Sun')),['अन्य राशि (मित्रता का निर्णय नहीं)',2,'अन्य']);
ck('dasha-node-no-dignity',(x=>[x.node,x.dignity])(dc(base(S.Simha),S.Mesha,'Rahu')),[true,null]);
{const ps=base(S.Simha);['Moon','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'].forEach((g,i)=>set(ps,g,[1,2,3,5,6,7,8][i]));set(ps,'Mars',S.Simha);
 ck('dasha-conjunct',dc(ps,S.Mesha,'Sun').conjunct,['Mars']);
 ck('dasha-no-conjunct',dc(ps,S.Mesha,'Moon').conjunct,[]);}
ck('dasha-unknown-lord',dc(base(S.Simha),S.Mesha,'Pluto'),'ERR:Unknown dasha lord Pluto');
ck('dasha-missing-planet',dc(base(S.Simha).filter(p=>p.graha!=='Rahu'),S.Mesha,'Rahu'),'ERR:Missing planet Rahu');
ck('dasha-phal-all-lords',['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'].every(l=>{const x=dc(base(S.Simha),S.Mesha,l);return x.phal&&x.phal.fav.length>20&&x.phal.adv.length>20&&/^BPHS 47/.test(x.phal.ref);}),true);
ck('dasha-no-aggregate-score','score' in dc(base(S.Simha),S.Mesha,'Sun'),false);

// --- Dasha stage-1: dashaContext (BPHS ch47, ledger dasha-phal-ledger-draft.md)
function dc(ps,asc,lord){try{return R.dashaContext(ps,asc,lord);}catch(e){return 'ERR:'+e.message;}}
ck('dasha-swarashi-Sun',(x=>[x.dignity,x.house,x.zone,x.node])(dc(set(base(S.Simha),'Sun',S.Simha),S.Mesha,'Sun')),['स्वराशि',5,'त्रिकोण',false]);
ck('dasha-uchcha-Mars',(x=>[x.dignity,x.house,x.zone])(dc(set(base(S.Simha),'Mars',S.Makara),S.Karka,'Mars')),['उच्च राशि',7,'केंद्र']);
ck('dasha-neecha-Venus',(x=>[x.dignity,x.zone])(dc(set(base(S.Simha),'Venus',S.Kanya),S.Mesha,'Venus')),['नीच राशि','6/8/12']);
ck('dasha-lagna-bhava-zone',dc(set(base(S.Simha),'Jupiter',S.Mesha),S.Mesha,'Jupiter').zone,'केंद्र और त्रिकोण (लग्न भाव)');
ck('dasha-trikona-9',(x=>[x.house,x.zone])(dc(set(base(S.Simha),'Saturn',S.Dhanu),S.Mesha,'Saturn')),[9,'त्रिकोण']);
ck('dasha-other-zone',(x=>[x.dignity,x.house,x.zone])(dc(set(base(S.Simha),'Sun',S.Vrishabha),S.Mesha,'Sun')),['अन्य राशि (मित्रता का निर्णय नहीं)',2,'अन्य']);
ck('dasha-node-no-dignity',(x=>[x.node,x.dignity])(dc(base(S.Simha),S.Mesha,'Rahu')),[true,null]);
{const ps=base(S.Simha);['Moon','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'].forEach((g,i)=>set(ps,g,[1,2,3,5,6,7,8][i]));set(ps,'Mars',S.Simha);
 ck('dasha-conjunct',dc(ps,S.Mesha,'Sun').conjunct,['Mars']);
 ck('dasha-no-conjunct',dc(ps,S.Mesha,'Moon').conjunct,[]);}
ck('dasha-unknown-lord',dc(base(S.Simha),S.Mesha,'Pluto'),'ERR:Unknown dasha lord Pluto');
ck('dasha-missing-planet',dc(base(S.Simha).filter(p=>p.graha!=='Rahu'),S.Mesha,'Rahu'),'ERR:Missing planet Rahu');
ck('dasha-phal-all-lords',['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'].every(l=>{const x=dc(base(S.Simha),S.Mesha,l);return x.phal&&x.phal.fav.length>20&&x.phal.adv.length>20&&/^BPHS 47/.test(x.phal.ref);}),true);
ck('dasha-no-aggregate-score','score' in dc(base(S.Simha),S.Mesha,'Sun'),false);
ck('dasha-venus-remedy-omission-noted',/उपाय-अंश नीति से नहीं लिया गया/.test(dc(base(S.Simha),S.Mesha,'Venus').phal.adv),true);
console.log('\nFINAL3 '+pass+'/'+(pass+fail)+' passed');if(fail){console.log(JSON.stringify(bad,null,1));process.exit(1);}

// --- Dasha stage-2 groundwork: bhavaLord + lordOf (no phal text yet)
ck('bhavaLord-Mesha',[1,2,4,7,9,10].map(h=>R.bhavaLord(0,h)),['Mars','Venus','Moon','Venus','Jupiter','Saturn']);
ck('bhavaLord-Karka-10',R.bhavaLord(3,10),'Mars');
ck('bhavaLord-range-err',(()=>{try{R.bhavaLord(0,13);return 'no-throw';}catch(e){return e.message}})(),'House must be 1-12');
ck('lordOf-Venus-Mesha',dc(base(S.Simha),S.Mesha,'Venus').lordOf,[2,7]);
ck('lordOf-Mars-Mesha',dc(base(S.Simha),S.Mesha,'Mars').lordOf,[1,8]);
ck('lordOf-Jupiter-Mesha',dc(base(S.Simha),S.Mesha,'Jupiter').lordOf,[9,12]);
ck('lordOf-node-empty',dc(base(S.Simha),S.Mesha,'Rahu').lordOf,[]);

console.log('\nFINAL4 '+pass+'/'+(pass+fail)+' passed');if(fail){console.log(JSON.stringify(bad,null,1));process.exit(1);}

// --- Dasha stage-2: dashaBhava (BPHS ch48, ledger dasha-stage2-ledger-draft.md)
function mk(map){return ['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'].map(g=>P(g,map[g]));}
const db=(ps,asc,lord)=>R.dashaBhava(ps,asc,lord);
const refs=(rs,side)=>rs[side].map(r=>r.ref);
// 48.9 per-lord: 9th lord Jupiter conjunct 5th lord Sun suffices alone
ck('s2-48.9-per-lord',(x=>[refs(x,'fav').includes('BPHS 48.9'),x.fav.find(r=>r.ref==='BPHS 48.9').text.includes('9वें')])(db(mk({Sun:8,Jupiter:8,Moon:0,Mars:1,Mercury:2,Venus:3,Saturn:4,Rahu:5,Ketu:6}),0,'Jupiter')),[true,true]);
// 48.9 for 10th lord alone (both not required)
ck('s2-48.9-10th-alone',(x=>[refs(x,'fav').includes('BPHS 48.9'),x.fav.find(r=>r.ref==='BPHS 48.9').text.includes('10वें')])(db(mk({Sun:8,Saturn:8,Jupiter:0,Moon:1,Mars:2,Mercury:3,Venus:4,Rahu:5,Ketu:6}),0,'Saturn')),[true,true]);
// 48.10 chosen pronoun reading: other planet's dasha, ambiguity recorded
ck('s2-48.10-pronoun',(x=>{const r=x.fav.find(r=>r.ref==='BPHS 48.10');return [!!r,r&&r.text.includes('मंगल'),r&&r.text.includes('सर्वनाम-अस्पष्टता')];})(db(mk({Sun:4,Mars:4,Moon:0,Jupiter:1,Mercury:2,Venus:3,Saturn:6,Rahu:7,Ketu:8}),0,'Mars')),[true,true,true]);
// 48.14 x 48.18 overlap: both shown, never netted (Mercury = 3rd/6th lord conjunct trikona lord Jupiter)
ck('s2-overlap-both',(x=>[refs(x,'fav').includes('BPHS 48.14'),refs(x,'adv').includes('BPHS 48.18')])(db(mk({Jupiter:11,Mercury:11,Sun:0,Moon:1,Mars:2,Venus:3,Saturn:4,Rahu:5,Ketu:6}),0,'Mercury')),[true,true]);
// 48.1 joint only: exalted+good house favourable
ck('s2-48.1-fav',db(mk({Mars:9,Sun:0,Moon:1,Mercury:2,Jupiter:3,Venus:4,Saturn:5,Rahu:6,Ketu:7}),0,'Mars').d48.kind,'fav');
// 48.1 debilitated+6/8/12 adverse (Kumbha lagna, Mars Karka = 6th)
ck('s2-48.1-adv',db(mk({Mars:3,Sun:10,Moon:11,Mercury:0,Jupiter:1,Venus:2,Saturn:4,Rahu:5,Ketu:6}),10,'Mars').d48.kind,'adv');
// 48.1 mixed = source silent, note not interpolation
ck('s2-48.1-mixed-silent',(x=>[x.d48===null,x.notes.some(n=>n.includes('48.1')&&n.includes('मौन'))])(db(mk({Mercury:5,Sun:0,Moon:1,Mars:2,Jupiter:3,Venus:4,Saturn:6,Rahu:7,Ketu:8}),0,'Mercury')),[true,true]);
// 48.20 node exception: no adverse placement row for Rahu in 3rd, exception noted
ck('s2-node-exception',(x=>[!x.adv.some(r=>r.text.includes('3/6/11 भाव में स्थिति')),x.notes.some(n=>n.includes('48.20'))])(db(mk({Rahu:2,Sun:0,Moon:1,Mars:4,Jupiter:6,Venus:7,Saturn:8,Mercury:9,Ketu:10}),0,'Rahu')),[true,true]);
// 48.19 maraka technical only: Sun conjunct Venus (2nd/7th lord) and in 2nd
ck('s2-maraka',(x=>{const r=x.adv.find(r=>r.ref==='BPHS 48.19');return [!!r,r&&r.text.includes('मारक'),r&&r.text.includes('हटाई गई')];})(db(mk({Venus:1,Sun:1,Moon:3,Mars:4,Mercury:5,Jupiter:6,Saturn:7,Rahu:8,Ketu:9}),0,'Sun')),[true,true,true]);
// 48.20 eighth placement
ck('s2-eighth',refs(db(mk({Moon:7,Sun:0,Mars:1,Mercury:2,Jupiter:3,Venus:4,Saturn:5,Rahu:6,Ketu:8}),0,'Moon'),'adv').includes('BPHS 48.20'),true);
// bhava-lordship rows for Venus (2nd+7th), and no death word anywhere in output
ck('s2-bhava-rows',(x=>[x.lordOf,x.bhavaCharcha.length,x.bhavaCharcha[0].text.includes('हटाया गया')])(db(mk({Venus:1,Sun:0,Moon:3,Mars:4,Mercury:5,Jupiter:6,Saturn:7,Rahu:8,Ketu:9}),0,'Venus')),[[2,7],2,true]);
ck('s2-no-death-word',JSON.stringify(db(mk({Venus:1,Sun:1,Moon:3,Mars:4,Mercury:5,Jupiter:6,Saturn:7,Rahu:8,Ketu:9}),0,'Sun')).includes('मृत्यु'),false);
// dasha-start placement flagged essential-unmodeled
ck('s2-unmodeled',db(mk({Sun:0,Moon:1,Mars:2,Mercury:3,Jupiter:4,Venus:5,Saturn:6,Rahu:7,Ketu:8}),0,'Sun').unmodeled[0].includes('दशा-आरम्भ'),true);
// node in 3/6/11 as conjunction partner: adverse conjunction row withheld, uncertainty noted
ck('s2-node-partner-uncertain',(x=>[!x.adv.some(r=>r.text.includes('राहु')),x.notes.some(n=>n.includes('48.18/48.20')&&n.includes('अनिश्चित'))])(db(mk({Rahu:5,Sun:5,Moon:0,Mars:1,Mercury:3,Jupiter:4,Venus:6,Saturn:7,Ketu:8}),0,'Sun')),[true,true]);
// 48.16-17 lagnesh-dharmesh mutual placement (Mesha lagna: Jupiter in lagna, Mars in 9th)
ck('s2-48.16-17',refs(db(mk({Jupiter:0,Mars:8,Sun:3,Moon:4,Mercury:5,Venus:6,Saturn:7,Rahu:10,Ketu:11}),0,'Jupiter'),'fav').includes('BPHS 48.16-17'),true);
// 48.17-17.5 lagnesh-karmesh mutual placement (Saturn in lagna, Mars in 10th)
ck('s2-48.17-karm',refs(db(mk({Saturn:0,Mars:9,Sun:3,Moon:4,Mercury:5,Venus:6,Jupiter:7,Rahu:10,Ketu:11}),0,'Saturn'),'fav').includes('BPHS 48.17-17½'),true);
// negative fixtures: mutual-placement rows absent when either limb missing
ck('s2-48.16-17-neg-no9',refs(db(mk({Jupiter:0,Mars:7,Sun:3,Moon:4,Mercury:5,Venus:6,Saturn:9,Rahu:10,Ketu:11}),0,'Jupiter'),'fav').includes('BPHS 48.16-17'),false);
ck('s2-48.16-17-neg-no1',refs(db(mk({Jupiter:4,Mars:8,Sun:0,Moon:1,Mercury:5,Venus:6,Saturn:7,Rahu:10,Ketu:11}),0,'Jupiter'),'fav').includes('BPHS 48.16-17'),false);
ck('s2-48.17-karm-neg',refs(db(mk({Saturn:0,Mars:8,Sun:3,Moon:4,Mercury:5,Venus:6,Jupiter:7,Rahu:10,Ketu:11}),0,'Saturn'),'fav').includes('BPHS 48.17-17½'),false);
// 48.9 label names both houses when one lord rules 9+10 (Saturn, Taurus lagna)
ck('s2-48.9-both-labels',(x=>{const r=x.fav.find(r=>r.ref==='BPHS 48.9');return r?r.text.includes('9वें/10वें'):false;})(db(mk({Saturn:5,Mercury:5,Sun:1,Moon:2,Mars:3,Jupiter:6,Venus:7,Rahu:8,Ketu:9}),1,'Saturn')),true);
console.log('\nFINAL5 '+pass+'/'+(pass+fail)+' passed');if(fail){console.log(JSON.stringify(bad,null,1));process.exit(1);}

// --- Moolatrikona/degree-zone layer (BPHS 3.49-54, ledger moolatrikona-ledger-draft.md)
const dz=(graha,rashi,deg)=>{const ps=base(S.Simha);const p=ps.find(x=>x.graha===graha);p.rashi=rashi;p.degreesInRashi=deg;p.longitude=rashi*30+deg;return R.dashaContext(ps,S.Mesha,graha).degreeZone;};
ck('zone-sun-mt',dz('Sun',S.Simha,10),{zone:'मूलत्रिकोण क्षेत्र',boundary:false});
ck('zone-sun-own',dz('Sun',S.Simha,25),{zone:'स्वराशि अंश (मूलत्रिकोण राशि का शेष)',boundary:false});
ck('zone-moon-uc',dz('Moon',S.Vrishabha,1),{zone:'उच्च-क्षेत्र',boundary:false});
ck('zone-moon-mt',dz('Moon',S.Vrishabha,10),{zone:'मूलत्रिकोण क्षेत्र',boundary:false});
ck('zone-mercury-uc',dz('Mercury',S.Kanya,10),{zone:'उच्च-क्षेत्र',boundary:false});
ck('zone-mercury-mt',dz('Mercury',S.Kanya,17),{zone:'मूलत्रिकोण क्षेत्र',boundary:false});
ck('zone-mercury-own',dz('Mercury',S.Kanya,25),{zone:'स्वराशि अंश (मूलत्रिकोण राशि का शेष)',boundary:false});
ck('zone-mars-mt',dz('Mars',S.Mesha,5),{zone:'मूलत्रिकोण क्षेत्र',boundary:false});
ck('zone-mars-own',dz('Mars',S.Mesha,20),{zone:'स्वराशि अंश (मूलत्रिकोण राशि का शेष)',boundary:false});
ck('zone-jupiter-mt',dz('Jupiter',S.Dhanu,5),{zone:'मूलत्रिकोण क्षेत्र',boundary:false});
ck('zone-venus-own',dz('Venus',S.Tula,20),{zone:'स्वराशि अंश (मूलत्रिकोण राशि का शेष)',boundary:false});
ck('zone-saturn-mt',dz('Saturn',S.Kumbha,10),{zone:'मूलत्रिकोण क्षेत्र',boundary:false});
// rashi layer unchanged: exaltation RASHI label coexists with degree zone
ck('rashi-layer-mercury',(x=>[x.dignity,x.degreeZone.zone])(R.dashaContext((ps=>{const p=ps.find(q=>q.graha==='Mercury');p.rashi=S.Kanya;p.degreesInRashi=17;p.longitude=5*30+17;return ps;})(base(S.Simha)),S.Mesha,'Mercury')),['उच्च राशि','मूलत्रिकोण क्षेत्र']);
ck('rashi-layer-moon',(x=>[x.dignity,x.degreeZone.zone])(R.dashaContext((ps=>{const p=ps.find(q=>q.graha==='Moon');p.rashi=S.Vrishabha;p.degreesInRashi=10;p.longitude=1*30+10;return ps;})(base(S.Simha)),S.Mesha,'Moon')),['उच्च राशि','मूलत्रिकोण क्षेत्र']);
// boundaries: half-open intervals + disclosed ±0.01 window, no label near boundary
ck('bnd-sun-20.00',dz('Sun',S.Simha,20.00),{zone:null,boundary:true});
ck('bnd-sun-20.005',dz('Sun',S.Simha,20.005),{zone:null,boundary:true});
ck('bnd-sun-19.995',dz('Sun',S.Simha,19.995),{zone:null,boundary:true});
ck('bnd-sun-19.9',dz('Sun',S.Simha,19.9).zone,'मूलत्रिकोण क्षेत्र');
ck('bnd-sun-20.1',dz('Sun',S.Simha,20.1).zone,'स्वराशि अंश (मूलत्रिकोण राशि का शेष)');
ck('bnd-mercury-15.00',dz('Mercury',S.Kanya,15.00),{zone:null,boundary:true});
ck('bnd-mercury-14.995',dz('Mercury',S.Kanya,14.995).boundary,true);
ck('bnd-mercury-15.005',dz('Mercury',S.Kanya,15.005).boundary,true);
ck('bnd-mercury-14.9',dz('Mercury',S.Kanya,14.9).zone,'उच्च-क्षेत्र');
ck('bnd-mercury-15.1',dz('Mercury',S.Kanya,15.1).zone,'मूलत्रिकोण क्षेत्र');
ck('bnd-moon-3.00',dz('Moon',S.Vrishabha,3.00),{zone:null,boundary:true});
// nodes and missing degree
ck('zone-node-null',dz('Rahu',S.Simha,5),{zone:null,boundary:false});
ck('zone-missing-deg',(()=>{const ps=base(S.Simha);delete ps.find(x=>x.graha==='Sun').degreesInRashi;return R.dashaContext(ps,S.Mesha,'Sun').degreeZone;})(),{zone:null,boundary:false,missing:true});
// 48.1 expanded-reading branch (MT only, explicit interpretation)
ck('d48x-mt-good',(x=>[x.d48===null,x.d48x&&x.d48x.kind,x.d48x&&x.d48x.text.includes('विस्तृत पठन')&&x.d48x.text.includes('शाब्दिक')])(db(mk({Jupiter:8,Sun:0,Moon:1,Mars:2,Mercury:3,Venus:4,Saturn:5,Rahu:6,Ketu:7}).map(p=>Object.assign(p,{degreesInRashi:5})),8,'Jupiter')),[true,'fav-expanded',true]);
ck('d48x-neg-badhouse',db(mk({Jupiter:8,Sun:0,Moon:1,Mars:2,Mercury:4,Venus:5,Saturn:6,Rahu:7,Ketu:9}).map(p=>Object.assign(p,{degreesInRashi:5})),3,'Jupiter').d48x,null);
ck('d48x-not-for-own-sign',(x=>[x.d48===null,x.d48x===null])(db(mk({Sun:4,Moon:0,Mars:1,Mercury:2,Jupiter:3,Venus:5,Saturn:6,Rahu:7,Ketu:8}).map(p=>Object.assign(p,{degreesInRashi:25})),0,'Sun')),[true,true]);
// cross-module: relations moola signs == DASHA_MT signs (via zone behaviour)
{const fs=require('fs'),src=fs.readFileSync(__dirname+'/../kundli-relations.js','utf8'),m=src.match(/moola=\{([^}]*)\}/)[1];
 const moola=Object.fromEntries(m.split(',').map(e=>e.split(':').map(x=>x.trim())));
 const mids={Sun:10,Moon:15,Mars:6,Mercury:17.5,Jupiter:5,Venus:7.5,Saturn:10};
 ck('xmod-moola-signs',Object.entries(moola).map(([g,sg])=>dz(g,+sg,mids[g]).zone),Array(7).fill('मूलत्रिकोण क्षेत्र'));}
console.log('\nFINAL6 '+pass+'/'+(pass+fail)+' passed');if(fail){console.log(JSON.stringify(bad,null,1));process.exit(1);}

// --- next-touch guards: out-of-range degree loud, missing label path, MT+6/8/12 mixed source-silent
ck('zone-invalid-30',dz('Sun',S.Simha,30),{zone:null,boundary:false,invalid:true});
ck('zone-invalid-negative',dz('Sun',S.Simha,-0.5),{zone:null,boundary:false,invalid:true});
ck('zone-invalid-high',dz('Moon',S.Vrishabha,31),{zone:null,boundary:false,invalid:true});
ck('zone-invalid-near-upper',dz('Sun',S.Simha,29.999).zone,'स्वराशि अंश (मूलत्रिकोण राशि का शेष)');
ck('d48xm-mixed-silent',(x=>[x.d48===null,x.d48x===null,x.d48xm&&x.d48xm.kind,x.d48xm&&x.d48xm.text.includes('मौन')&&x.d48xm.text.includes('अनुमान नहीं')])(db(mk({Jupiter:8,Sun:0,Moon:1,Mars:2,Mercury:4,Venus:5,Saturn:6,Rahu:7,Ketu:9}).map(p=>Object.assign(p,{degreesInRashi:5})),3,'Jupiter')),[true,true,'mixed-silent',true]);
ck('d48xm-not-when-good',db(mk({Jupiter:8,Sun:0,Moon:1,Mars:2,Mercury:3,Venus:4,Saturn:5,Rahu:6,Ketu:7}).map(p=>Object.assign(p,{degreesInRashi:5})),8,'Jupiter').d48xm,null);
ck('d48xm-not-for-own-sign-rest',(x=>[x.d48x===null,x.d48xm===null])(db(mk({Sun:4,Moon:0,Mars:1,Mercury:2,Jupiter:3,Venus:5,Saturn:6,Rahu:7,Ketu:8}).map(p=>Object.assign(p,{degreesInRashi:25})),11,'Sun')),[true,true]);
console.log('\nFINAL7 '+pass+'/'+(pass+fail)+' passed');if(fail){console.log(JSON.stringify(bad,null,1));process.exit(1);}
