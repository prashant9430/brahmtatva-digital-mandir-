// Avastha (BPHS45.5-10 jagratadi + deeptadi) module checks. Run: node tests/validate-avastha.js
// Oracles: sloka-by-sloka mapping in docs/avastha-ledger-draft.md (reviewer scoped GO 2026-11-11,
// rulings 1-4 + conditions A-C). siva.sh Sanskrit decisive; jyotishvidya duhkhita-drop anomaly guarded.
// Labeled conventions under test: panchadha yardstick (jagratadi), first-match precedence in sloka
// order, whole-sign yuti, kshina-chandra by paksha (sandhi -> anirnit), khalagriha = adhishatru.
// Kopa/combustion is never computed (no orb in 45.9; project-wide unmodeled) - pinned here.
// Mercury's 3.11 conditional maleficence is result-neutral under whole-sign yuti (vacuity documented);
// no Mercury-sole-trigger fixture exists - attribution always lands on a base malefic (condition B-ii).
// ck() is harness-style: ck(id, actual, expected) with JSON comparison - a wrong value FAILS.
'use strict';
const S=require('../kundli-states.js');
const Rel=require('../kundli-relations.js');
let pass=0,fail=0;const bad=[];
function ck(id,actual,expected){const ok=JSON.stringify(actual)===JSON.stringify(expected);ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | actual='+JSON.stringify(actual)+' expected='+JSON.stringify(expected)));}

// Default chart: every body alone in its sign, Moon waxing (Sun Leo15, Moon Virgo15, elong 30).
// Distinct signs: Sun Leo, Moon Virgo, Mars Taurus, Mercury Gemini, Jupiter Sagittarius,
// Venus Capricorn, Saturn Pisces, Rahu Aries, Ketu Libra.
function mk(ov){const p={Sun:125,Moon:155,Mars:45,Mercury:75,Jupiter:255,Venus:285,Saturn:345,Rahu:15,Ketu:195};return Object.assign(p,ov||{});}
const nm=(g,p)=>S.avastha(g,p).deeptadi.name, jg=(g,p)=>S.avastha(g,p).jagratadi.name;

// --- 1. Deeptadi sign clauses (45.8-9), panchadha compound to sign lord ---
{
 // Deepta: exaltation (Sun in Aries 10 deg)
 ck('deepta exalted Sun Aries',nm('Sun',mk({Sun:10})),'दीप्त');
 // Swastha: own sign (Sun in Leo)
 ck('swastha own Sun Leo',nm('Sun',mk()),'स्वस्थ');
 // Pramudita: compound +2 (Moon in Virgo, lord Mercury natural +1, Mercury in Gemini = house 10 -> temporary +1)
 ck('pramudita Moon Virgo, Mercury Gemini (+2)',nm('Moon',mk()),'प्रमुदित');
 // Shanta: compound +1 (Moon in Aries, lord Mars natural 0, Mars in Taurus = house 2 -> temporary +1)
 ck('shanta Moon Aries, Mars Taurus (+1)',nm('Moon',mk({Moon:15,Mars:45,Rahu:155,Ketu:335})),'शान्त');
 // Deena: compound 0 (Sun in Taurus, lord Venus natural -1, Venus in Gemini = house 2 -> temporary +1)
 ck('deena Sun Taurus, Venus Gemini (0)',nm('Sun',mk({Sun:45,Venus:75,Mercury:105,Moon:135,Mars:100})),'दीन');
 // Duhkhita: compound -1 (Sun in Gemini, lord Mercury natural 0, Mercury in Gemini = house 1 -> temporary -1)
 ck('duhkhita Sun Gemini, Mercury Gemini (-1)',nm('Sun',mk({Sun:75,Mercury:78})),'दुःखित');
 // Khala: compound -2 without papa-yuti (Jupiter in Gemini, lord Mercury natural -1, Mercury in Gemini = house 1 -> -1)
 const khalaP=mk({Jupiter:75,Mercury:78});
 ck('khala Jupiter Gemini, Mercury Gemini (-2, no papa-yuti)',nm('Jupiter',khalaP),'खल');
 ck('khala vikala not applied',S.avastha('Jupiter',khalaP).vikala.applies,false);
 // Vikala as primary: compound -2 + papa companion (Saturn joins Gemini)
 const vikP=mk({Jupiter:75,Mercury:78,Saturn:79});
 const vikR=S.avastha('Jupiter',vikP);
 ck('vikala primary Jupiter Gemini + Saturn (-2 + papa-yuti)',vikR.deeptadi.name,'विकल');
 ck('vikala attributed to base malefic Saturn',vikR.vikala.via,['Saturn']);
}
// --- 2. First-match precedence + vikala indicator line (labeled convention) ---
{
 // exalted + papa-yuti: Deepta stays primary, vikala indicator applies (Rahu moved away)
 const r=S.avastha('Sun',mk({Sun:10,Mars:12,Rahu:100,Ketu:280}));
 ck('precedence: exalted + papa-yuti -> deepta',r.deeptadi.name,'दीप्त');
 ck('precedence: vikala indicator still fires',r.vikala.applies,true);
 ck('precedence: vikala via Mars',r.vikala.viaNames,['मंगल']);
 ck('precedence note labeled convention',/परिपाटी/.test(r.deeptadi.precedenceNote)&&/स्रोत-कथन नहीं/.test(r.deeptadi.precedenceNote),true);
 // relation clause precedes vikala: compound 0 + papa-yuti -> Deena primary + indicator
 const r2=S.avastha('Sun',mk({Sun:45,Venus:75,Mercury:105,Moon:135,Mars:47})); // deena fixture + Mars conjunct
 ck('precedence: deena + papa-yuti -> deena',r2.deeptadi.name,'दीन');
 ck('precedence: indicator via Mars',[r2.vikala.applies,r2.vikala.via],[true,['Mars']]);
}
// --- 3. Jagratadi (45.5-6), incl. debilitation override and panchadha yardstick ---
{
 ck('jagrat via own (Sun Leo)',jg('Sun',mk()),'जाग्रत्');
 ck('jagrat via exalt (Sun Aries)',jg('Sun',mk({Sun:10})),'जाग्रत्');
 ck('svapna via adhimitra tier (Moon Virgo, +2)',jg('Moon',mk()),'स्वप्न');
 ck('svapna via sama tier (Sun Taurus, Venus Gemini, 0)',jg('Sun',mk({Sun:45,Venus:75,Mercury:105,Moon:135,Mars:100})),'स्वप्न');
 ck('sushupti via shatru tier (Sun Gemini, Mercury Gemini, -1)',jg('Sun',mk({Sun:75,Mercury:78})),'सुषुप्ति');
 ck('sushupti via adhishatru tier (Jupiter Gemini, -2)',jg('Jupiter',mk({Jupiter:75,Mercury:78})),'सुषुप्ति');
 // debilitation override: Jupiter in Capricorn, Saturn in Aquarius (house 2 -> temporary +1, natural 0 -> compound +1)
 // neecha clause still -> sushupti (45.5 names debilitation in the sushupti tier)
 const nd=S.avastha('Jupiter',mk({Jupiter:285,Saturn:315,Venus:255}));
 ck('sushupti via debilitation override (Jupiter Capricorn, compound +1)',[nd.jagratadi.name,nd.compound],['सुषुप्ति',1]);
 ck('debilitation basis names neecha',/नीच/.test(nd.jagratadi.basis),true);
 ck('jagratadi phal mapping 45.6',[S.avastha('Sun',mk()).jagratadi.phal,S.avastha('Moon',mk()).jagratadi.phal,S.avastha('Jupiter',mk({Jupiter:285,Saturn:315,Venus:255})).jagratadi.phal],['पूर्ण','मध्यम','शून्य']);
 ck('jagratadi phal labeled as 45.6 statement',/45\.6/.test(S.avastha('Sun',mk()).jagratadi.phalNote),true);
}
// --- 4. Vikala companion rules (BPHS3.11 set; condition B fixtures) ---
{
 // B-i: waning/waxing Moon pair. Subject Jupiter own sign Sagittarius (swastha), Moon conjunct.
 const waning=S.avastha('Jupiter',mk({Moon:255,Sun:60}));   // elong mod(255-60)=195 -> Krishna -> papa
 const waxing=S.avastha('Jupiter',mk({Moon:255,Sun:225}));  // elong 30 -> Shukla -> not papa; Sun Scorpio, not conjunct
 ck('waning Moon conjunct -> vikala applies via Moon',[waning.vikala.applies,waning.vikala.via],[true,['Moon']]);
 ck('waxing Moon same setup -> vikala not applied',waxing.vikala.applies,false);
 ck('waxing fixture still swastha',waxing.deeptadi.name,'स्वस्थ');
 // B-ii: Mercury attribution. Jupiter+Mercury alone in Gemini -> not vikala.
 const jm=S.avastha('Jupiter',mk({Jupiter:75,Mercury:78}));
 ck('Jupiter+Mercury alone -> not vikala (Mercury not base)',jm.vikala.applies,false);
 // Jupiter+Mercury+Saturn -> vikala via SATURN, Mercury never listed
 const jms=S.avastha('Jupiter',mk({Jupiter:75,Mercury:78,Saturn:79}));
 ck('Jupiter+Mercury+Saturn -> vikala via Saturn (base attribution)',jms.vikala.via,['Saturn']);
 ck('Mercury never in via list',!jms.vikala.via.includes('Mercury')&&!jms.vikala.viaNames.includes('बुध'),true);
 // nodes are papa companions per 3.11 (avastha scope; E1 yuti rows keep nodes unmodeled - labeled difference)
 const rahu=S.avastha('Venus',mk({Venus:15})); // Venus conjunct Rahu in Aries
 ck('Rahu conjunct -> vikala via Rahu',[rahu.vikala.applies,rahu.vikala.via],[true,['Rahu']]);
 const ketu=S.avastha('Venus',mk({Venus:195})); // Venus conjunct Ketu in Libra
 ck('Ketu conjunct -> vikala via Ketu',[ketu.vikala.applies,ketu.vikala.via],[true,['Ketu']]);
}
// --- 5. Moon sandhi -> anirnit, incl. vikala/khala boundary (45.9 precedence) ---
{
 // Jupiter Gemini, Mercury Gemini (-2), Moon conjunct at exact 180 deg elongation -> sandhi
 const sandhi=S.avastha('Jupiter',mk({Jupiter:75,Mercury:78,Moon:75,Sun:255})); // elong mod(75-255)=180
 ck('sandhi Moon conjunct -> vikala unresolved',sandhi.vikala.applies,null);
 ck('sandhi unresolved names Moon',sandhi.vikala.unresolved,['Moon']);
 ck('sandhi + adhishatru sign -> deeptadi anirnit (never silently khala)',sandhi.deeptadi.name,'अनिर्णीत');
 // resolve both ways
 ck('same setup off sandhi (elong 185, Krishna) -> vikala primary',nm('Jupiter',mk({Jupiter:75,Mercury:78,Moon:75,Sun:250})),'विकल');
 ck('same setup off sandhi (elong 175, Shukla) -> khala',nm('Jupiter',mk({Jupiter:75,Mercury:78,Moon:75,Sun:260})),'खल');
}
// --- 6. Kopa / combustion: never computed ---
{
 const r=S.avastha('Sun',mk());
 ck('kopa unavailable',r.kopa.available,false);
 ck('kopa note states no orb in source + unmodeled',/कक्षा-सीमा नहीं/.test(r.kopa.note)&&/अमॉडलित/.test(r.kopa.note)&&/अनिर्णीत/.test(r.kopa.note),true);
 // seeded LCG sweep: deeptadi never returns Kopa; vikala never names Mercury; applies => via nonempty
 let s=987654321;const rnd=()=>{s=(1103515245*s+12345)%2147483648;return s/2147483648;};
 let ok=true,sawVikala=false,sawKhala=false,sawDuhkhita=false;
 for(let i=0;i<500;i++){
  const p={};for(const g of ['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu'])p[g]=rnd()*360;
  p.Ketu=(p.Rahu+180)%360; // mean-node convention
  for(const g of Rel.planets){
   const r2=S.avastha(g,p);
   if(r2.deeptadi.name==='कोप')ok=false;
   if(r2.vikala.via.includes('Mercury'))ok=false;
   if(r2.vikala.applies===true&&r2.vikala.via.length===0)ok=false;
   if(r2.deeptadi.name==='विकल'){sawVikala=true;if(r2.vikala.applies!==true)ok=false;}
   if(r2.deeptadi.name==='खल')sawKhala=true;
   if(r2.deeptadi.name==='दुःखित')sawDuhkhita=true;
   if(r2.vikala.applies===null&&!(r2.vikala.unresolved.length>0))ok=false;
  }
 }
 ck('sweep 500 random charts: no Kopa, no Mercury via, applies=>via, anirnit=>unresolved',ok,true);
 ck('sweep exercised vikala/khala/duhkhita states',sawVikala&&sawKhala&&sawDuhkhita,true);
}
// --- 7. Anomaly guards + labels (conditions A and C) ---
{
 ck('nine deeptadi names incl. duhkhita (Sanskrit list)',[S.DEEPTADI.length,S.DEEPTADI.includes('दुःखित'),S.DEEPTADI[7],S.DEEPTADI[8]],[9,true,'खल','कोप']);
 const r=S.avastha('Sun',mk());
 ck('anomaly note recorded (duhkhita drop / siva decisive)',/दुःखित/.test(r.anomalyNote)&&/siva/.test(r.anomalyNote),true);
 ck('six labeled conventions present',Array.isArray(r.conventions)&&r.conventions.length===6,true);
 ck('convention labels: panchadha yardstick',r.conventions.some(c=>/पांचधा/.test(c)&&/परिपाटी/.test(c)),true);
 ck('convention labels: first-match precedence',r.conventions.some(c=>/प्रथम-मेल/.test(c)&&/स्रोत पूर्वता नहीं/.test(c)),true);
 ck('convention labels: whole-sign yuti',r.conventions.some(c=>/whole-sign/.test(c)&&/परिपाटी/.test(c)),true);
 ck('convention labels: tithi/paksha kshina-chandra',r.conventions.some(c=>/तिथि 16-30/.test(c)&&/सन्धि/.test(c)),true);
 ck('convention labels: Mercury vacuity documented (condition A)',r.conventions.some(c=>/बुध/.test(c)&&/परिणाम-तटस्थ/.test(c)&&/एकमात्र विकल-कारण नहीं/.test(c)),true);
 ck('convention labels: khalagriha reading + anomaly pointer',r.conventions.some(c=>/खलगृह = अधिशत्रु/.test(c)),true);
 ck('phal honesty: no per-state phal claim',/फल-परिच्छेद स्रोत \(45\.7-10\) में नहीं/.test(r.phalNote)&&/काल्पनिक फल-पाठ नहीं/.test(r.phalNote),true);
}
// --- 8. Boundary + misuse ---
{
 ck('sign boundary 30.0 -> sign 1',S.avastha('Sun',mk({Sun:30})).sign,1);
 ck('snap 30-1e-13 -> sign 1',S.avastha('Sun',mk({Sun:30-1e-13})).sign,1);
 ck('nosnap 30-1e-9 -> sign 0',S.avastha('Sun',mk({Sun:30-1e-9})).sign,0);
 ck('wrap 360 == wrap 0',[S.avastha('Sun',mk({Sun:360})).sign,S.avastha('Sun',mk({Sun:0})).deeptadi.name],[S.avastha('Sun',mk({Sun:0})).sign,'दीप्त']);
 ck('Pluto not assigned',S.avastha('Pluto',mk()).available,false);
 ck('Rahu not assigned',S.avastha('Rahu',mk()).available,false);
 ck('Ascendant not assigned',S.avastha('Ascendant',mk()).available,false);
 let threw=0;
 for(const v of [NaN,Infinity,-Infinity,'x',null,undefined]){try{S.avastha('Sun',mk({Sun:v}));}catch(e){threw++;}}
 ck('throws on bad Sun longitude',threw,6);
 let t2=0;for(const b2 of [{},[],null,undefined,42]){try{S.avastha('Sun',b2);}catch(e){t2++;}}
 ck('throws on bad positions map',t2,5);
 let t3=false;try{S.avastha('Sun',(p=>{delete p.Ketu;return p;})(mk()));}catch(e){t3=/Ketu/.test(e.message);}
 ck('missing Ketu throws naming Ketu',t3,true);
}
// --- 9. Non-vacuity: every primary fixture flips under mutation ---
{
 const cases=[
  ['deepta','Sun',mk({Sun:10}),mk({Sun:40})],                    // exalt -> Taurus (-2 + Mars yuti)
  ['swastha','Sun',mk(),mk({Sun:40})],
  ['pramudita','Moon',mk(),mk({Mercury:155})],                  // Mercury house 10 -> house 1: compound 0
  ['shanta','Moon',mk({Moon:15,Mars:45,Rahu:155,Ketu:335}),mk({Moon:15,Mars:15,Rahu:155,Ketu:335})], // Mars house 1: -1
  ['deena','Sun',mk({Sun:45,Venus:75,Mercury:105,Moon:135,Mars:100}),mk({Sun:45,Venus:45,Mercury:105,Moon:135,Mars:100})], // Venus house 1: -2
  ['duhkhita','Sun',mk({Sun:75,Mercury:78}),mk({Sun:75,Mercury:105})], // Mercury house 2: +1
  ['khala','Jupiter',mk({Jupiter:75,Mercury:78}),mk({Jupiter:75,Mercury:105})], // Mercury house 2: 0
  ['vikala','Jupiter',mk({Jupiter:75,Mercury:78,Saturn:79}),mk({Jupiter:75,Mercury:78,Saturn:345})],
 ];
 for(const [label,g,a,b] of cases){
  const x=S.avastha(g,a).deeptadi.name,y=S.avastha(g,b).deeptadi.name;
  ck('non-vacuity '+label+' ('+x+' != '+y+')',x!==y,true);
 }
}
console.log(`\n${pass} pass, ${fail} fail${bad.length?': '+bad.join(', '):''}`);
process.exit(fail?1:0);
