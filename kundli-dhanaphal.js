/* Bhavaphal ch13 (BPHS धन-भाव फल, 2nd house) - condition-matched tradition
rows. Curation: docs/bhavaphal-ch13-ledger-draft.md (13 verses -> 17 row
objects).
MODELED 11 rows: 13.2a, 13.2b, 13.2c, 13.3, 13.4, 13.5, 13.6, 13.8, 13.9,
13.10, 13.13a.
UNSERVED + count-only (a required unmodeled term never silently drops out of
a conjunction): 13.7 (required combustion/asta), 13.11 (required
paravatamsha - dashavarga amsha class), 13.12a (required graha-bala; the
sources list strength and dignity separately, so a dignity proxy would
contradict the source).
SAFETY-OMIT (count-only): 13.12b, 13.13b (disease-class descriptions).
BREADTH-OMIT (not safety): 13.1's address phrase only - that verse's
condition clause lives on in c13-2a.
Reading decisions (ledger mat-bhed, disclosed on the rows):
 13.3 Mars-yuti is UNRESTRICTED (Sanskrit वाऽपि is an independent
 predicate; jyotishvidya + siva.sh read unrestricted; vedicpupil's English
 "there" restriction is a documented divergence).
 13.4 THREE independent alternatives (Sanskrit वा explicit): 2nd lord in
 the 11th, OR 11th lord in the 2nd, OR both lords separately in
 kendra/trikona (no yuti requirement). Santhanam's strict-exchange
 ("while") reading of the first pair and his added "join" on the kendra
 alternative are disclosed, not adopted.
 13.5 dvandva: BOTH Jupiter AND Venus must participate AND BOTH lords
 (dhanesh/labhesh) must each receive a genuine yuti/drishti from at least
 one of them (cover semantics - not per-cell bothxboth, which would
 vacate non-conjunction sign-trine geometries). If either benefic IS one
 of the two lords the row stays unserved: identity is not a relation
 (aspects fall on other signs, never reflexively), disclosed in the
 detail. Santhanam's 11th-lord-only alternative is disclosed.
 तत्त्रिकोणगे = a trine FROM THE 2ND LORD'S SIGN (own sign included,
 +/-4/+8), not a bhava offset.
 13.6 ripu-bhava = the 6th specifically (Sanskrit तद्गतो = that same 6th);
 Santhanam's loose "evil house" and jyotishvidya's extra malefic-in-2nd
 clause disclosed, not adopted.
 13.8 dusthana occupancy jointly OR separately (Sanskrit वाऽपि explicit);
 Mars in the 11th; Rahu in the 2nd is a PLACEMENT fact.
 13.9 the 12th-bhava term is a benefic OCCUPANT of the 12th, not its lord.
 13.13a AND of BOTH legs (Sanskrit dvandva without वा; jyotishvidya +
 siva.sh read AND; vedicpupil's English OR is a documented divergence) -
 both legs always shown separately in the detail.
Sources (caches in sources/): vedicpupil chapter-13 (Sanskrit per verse,
12 Nov 18:36), jyotishvidya.com/ch13.htm (Santhanam, 12 Nov 18:36).
Machinery (kundli-bhavaphal.js): BPHS 3.11 benefic/malefic classes
(dynamic Moon/Mercury), 26.2-5 whole-sign graha-drishti incl. special
aspects (binary presence only). Dignity: EXALT map duplicated from
kundli-engine.js:18 (byte-stable snippet, same values; that file
untouched).
Conventions (labeled, ch12 module 1:1):
 - Whole-sign bhavas from Lagna. All yuti/drishti conditions use only the
   seven grahas; nodes' yuti/drishti participation is unmodeled (NODES_NOTE).
   Node PLACEMENT is a plain fact (13.8) - the chart shows it.
 - Favourable and adverse rows both always listed (served or unserved);
   no verdicts, no scores; rows are tradition-labeled statements, not
   predictions. Conduct-topic rows are historical/tradition conduct
   discussion only - never a verdict on a present person's moral
   character (CONDUCT_NOTE).
 - The 3 unserved rows are never shown as "शर्त बनी/नहीं बनी" - they were
   not checked at all; only a count-only category note is shipped. */
(function(root){'use strict';
const BP=(typeof module!=='undefined'&&module.exports)?require('./kundli-bhavaphal.js'):root.BrahmBhavaPhal;
const SEVEN=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const G=BP.G,RASHI=BP.RASHI,SIGN_LORD=BP.SIGN_LORD;
const mod=(x,n)=>((x%n)+n)%n,houseOf=(sign,asc)=>mod(sign-asc,12)+1;
const KENDRA=[1,4,7,10],KT=[1,4,5,7,9,10],DUSTHANA=[6,8,12];
const EXALT={Sun:0,Moon:1,Mars:9,Mercury:5,Jupiter:3,Venus:11,Saturn:6}; // duplicated from kundli-engine.js:18 (same values)
const OMIT_N=2;
const OMIT_NOTICE='BPHS अध्याय 13 की इस परंपरा-सूची के '+OMIT_N+' खंड सुरक्षा-नीति से हटाए गए हैं (दोनों स्वास्थ्य-विषयक वर्णन; केवल गिनती दी गई है)।';
const BREADTH_NOTICE='इस दृश्य में BPHS अध्याय 13 के प्रारम्भ-श्लोक (13.1) का सम्बोधन-वाक्यांश शामिल नहीं है — उसमें स्वतंत्र शर्त-फल नहीं है; उसी श्लोक की शर्त 13.2 की पंक्ति में जाँची गई है। यह सुरक्षा-लोप नहीं है।';
const UNMODELED_NOTICE='BPHS ch13 की 3 पंक्तियाँ अभी नहीं दिखाई गईं (ये जाँची ही नहीं गईं): 1 में ग्रह-बल (सबल) की अपेक्षा है जो अमॉडल है (13.12); 1 में अस्तता (combustion) अमॉडल है (13.7); 1 में परावतांश (अंश-वर्ग) अमॉडल है (13.11)।';
const HEADER='ये पंक्तियाँ BPHS अध्याय 13 (धन-भाव फल) की परंपरा-वर्णित शर्त-फल सूची हैं — शर्त बने तो परंपरा-कथन दिखता है, न बने तो पंक्ति पारदर्शिता के लिए बिना फल-पाठ के रहती है। ये भविष्यकथन या निश्चय नहीं; अनुकूल और प्रतिकूल पंक्तियाँ साथ दी गई हैं, कोई निर्णय/स्कोर नहीं।';
const NODES_NOTE='राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल (परंपरा-भेद); शर्तों में केवल सात ग्रह। राहु/केतु की भाव-स्थिति केवल तथ्य के रूप में दिखती है।';
const CONDUCT_NOTE='आचरण-विषयक पंक्तियाँ ऐतिहासिक/परंपरा आचरण-चर्चा हैं — किसी वर्तमान व्यक्ति पर नैतिक या चरित्र-निर्णय या शिक्षा नहीं।';
const NOTE_13_3='13.3 में "मंगल-सहित" शर्त स्थान-मुक्त (unrestricted) है — Sanskrit वाऽपि स्वतंत्र predicate है और jyotishvidya/siva.sh यही पढ़ते हैं; vedicpupil-अंग्रेजी का "there" (2रे में) सीमित पठन विमत के रूप में दर्ज है।';
const NOTE_13_4='13.4 में Sanskrit वा स्पष्ट है — तीन स्वतंत्र विकल्प; किसी में युति-शर्त नहीं। Santhanam-अनुवाद पहली जोड़ी को strict-exchange ("while") पढ़ता है और केन्द्र-विकल्प में "join" जोड़ता है — दोनों अतिरिक्त प्रतिबंध दर्ज हैं, अपनाए नहीं गए।';
const NOTE_13_5='13.5 में (द्वंद्व) गुरु और शुक्र दोनों की भागीदारी अपेक्षित है और दोनों स्वामी (धनेश/लाभेश) गुरु/शुक्र में से किसी से वास्तविक युति/दृष्टि-संबंध प्राप्त करें — यह आवरण-पठन है: प्रत्येक स्वामी के लिए कोई एक संबंध पर्याप्त है, चारों ग्रह-स्वामी कोष्टिकाएँ अनिवार्य नहीं (उससे अधिकांश राशि-त्रिकोण आकृतियाँ कभी बन ही नहीं सकतीं)। Santhanam का केवल-लाभेश विकल्प इससे शिथिल है और दर्ज है। "तत्त्रिकोणगे" = धनेश की राशि से त्रिकोण (स्व-राशि सहित ±4/±8), भाव-गणना नहीं। युति/दृष्टि दो भिन्न ग्रहों का संबंध है — गुरु/शुक्र में से कोई स्वयं धनेश/लाभेश हो तो तात्विकता संबंध नहीं मानी जाती और पंक्ति असेवित रहती है; विवरण में यह स्पष्ट दिखता है।';
const NOTE_13_6='13.6 में रिपुभाव = 6ठा भाव विशिष्ट (Sanskrit तद्गतो = उसी 6ठे में); Santhanam का "evil house" (6/8/12) शिथिल पठन और jyotishvidya का अतिरिक्त खंड दर्ज हैं, अपनाए नहीं गए।';
const NOTE_13_13A='13.13 में Sanskrit द्वंद्व-सूची है (वा नहीं) — दोनों अंग एक साथ आवश्यक: धनेश पाप-युति और 2रा भाव पाप-युक्त। jyotishvidya/siva.sh AND पढ़ते हैं; vedicpupil-अंग्रेजी OR विमत के रूप में दर्ज है।';
function checkPlanets(planets,asc){if(!Number.isInteger(asc)||asc<0||asc>11)throw Error('asc must be an integer sign 0..11');
 if(!Array.isArray(planets))throw Error('planets must be an array');const seen=new Set();
 for(const p of planets){if(!p||!SEVEN.includes(p.graha)){if(p&&(p.graha==='Rahu'||p.graha==='Ketu')){if(!Number.isInteger(p.rashi)||p.rashi<0||p.rashi>11)throw Error(p.graha+' rashi must be an integer sign 0..11');}continue;} // nodes tolerated; yuti/drishti participation excluded, placement usable as fact
  if(seen.has(p.graha))throw Error('duplicate graha '+p.graha);seen.add(p.graha);
  if(!Number.isInteger(p.rashi)||p.rashi<0||p.rashi>11)throw Error(p.graha+' rashi must be an integer sign 0..11');
  if(typeof p.degreesInRashi!=='number'||!Number.isFinite(p.degreesInRashi)||p.degreesInRashi<0||p.degreesInRashi>=30)throw Error(p.graha+' degreesInRashi must be finite in [0,30) - needed by the 3.11 dynamic-class machinery');}
 for(const g of SEVEN)if(!seen.has(g))throw Error('missing graha '+g);}
function report(planets,asc){checkPlanets(planets,asc);
 const p={};for(const x of planets)if(SEVEN.includes(x.graha))p[x.graha]=x;
 const cls=BP.classes(planets); // 3.11 machinery tolerates nodes; rows still exclude node participation
 const bhavaSign=h=>mod(asc+h-1,12);
 const dhanesh=SIGN_LORD[bhavaSign(2)],labhesh=SIGN_LORD[bhavaSign(11)];
 const bhOf=g=>houseOf(p[g].rashi,asc);
 const yutiWith=g=>SEVEN.filter(o=>o!==g&&p[o].rashi===p[g].rashi);
 const benYuti=g=>yutiWith(g).filter(o=>cls[o].cls==='शुभ');
 const malYuti=g=>yutiWith(g).filter(o=>cls[o].cls==='पाप');
 const benIn=h=>SEVEN.filter(g=>bhOf(g)===h&&cls[g].cls==='शुभ');
 const malIn=h=>SEVEN.filter(g=>bhOf(g)===h&&cls[g].cls==='पाप');
 const malDrishtiOn=sign=>SEVEN.filter(m=>cls[m].cls==='पाप'&&p[m].rashi!==sign&&BP.drishti(p[m].rashi,sign,m));
 const afflict=g=>({yuti:malYuti(g),drishti:malDrishtiOn(p[g].rashi)});
 const affText=a=>(a.yuti.length||a.drishti.length)?[...a.yuti.map(g=>G[g]+'-युति'),...a.drishti.map(g=>G[g]+'-दृष्टि')].join(', '):'कोई नहीं';
 const trineOf=s=>[s,mod(s+4,12),mod(s+8,12)];
 const rahu=planets.find(x=>x&&x.graha==='Rahu');
 const rahuBh=rahu?houseOf(rahu.rashi,asc):null;
 // 13.5: a dvandva benefic's yuti/drishti relation to the lord pair; if the
 // benefic IS one of the two lords, identity is not a relation and the row
 // stays unserved (disclosed in the detail - see NOTE_13_5).
 // 13.5: genuine two-graha yuti/drishti between a benefic and a lord.
 // Identity is not a relation - a benefic that IS the lord cannot relate
 // to itself (aspects fall on other signs, never reflexively).
 const relates=(ben,lord)=>ben!==lord&&(p[ben].rashi===p[lord].rashi||!!BP.drishti(p[ben].rashi,p[lord].rashi,ben));
 const rows=[];
 // c13-2a (favourable; 2nd lord in the 2nd or kendra/trikona)
 rows.push({id:'c13-2a',ref:'BPHS 13.2',polarity:'अनुकूल',topic:'धन-वृद्धि',
  served:bhOf(dhanesh)===2||KT.includes(bhOf(dhanesh)),
  condition:`धनेश (${G[dhanesh]}) 2रे भाव में या केन्द्र/त्रिकोण में`,
  detail:`धनेश ${G[dhanesh]} ${RASHI[p[dhanesh].rashi]} में (भाव ${bhOf(dhanesh)})`,
  text:'परंपरा-कथन: धन-वृद्धि बताई है।'});
 // c13-2b (adverse; 2nd lord in 6/8/12)
 rows.push({id:'c13-2b',ref:'BPHS 13.2',polarity:'प्रतिकूल',topic:'धन-हानि',
  served:DUSTHANA.includes(bhOf(dhanesh)),
  condition:`धनेश (${G[dhanesh]}) 6ठे/8वें/12वें भाव में`,
  detail:`धनेश ${G[dhanesh]} ${RASHI[p[dhanesh].rashi]} में (भाव ${bhOf(dhanesh)})`,
  text:'परंपरा-कथन: धन-हानि की चर्चा है।'});
 // c13-2c (both directions; benefic OR malefic in the 2nd; coexisting shown)
 {const b2=benIn(2),m2=malIn(2);
 rows.push({id:'c13-2c',ref:'BPHS 13.2',polarity:'अनुकूल/प्रतिकूल',topic:'धन-प्राप्ति / धन-क्षय',
  served:b2.length>0||m2.length>0,
  condition:'2रे भाव में शुभ-ग्रह (अनुकूल पक्ष) या पाप-ग्रह (प्रतिकूल पक्ष)',
  detail:`2रे भाव में शुभ: ${b2.length?b2.map(g=>G[g]).join(', '):'कोई नहीं'}; पाप: ${m2.length?m2.map(g=>G[g]).join(', '):'कोई नहीं'}`,
  text:'परंपरा-कथन: 2रे भाव के शुभ-ग्रह से धन-प्राप्ति और पाप-ग्रह से धन-क्षय की चर्चा है।',
  transparency:(b2.length&&m2.length)?'2रे भाव में शुभ और पाप दोनों वर्ग उपस्थित — दोनों तथ्य साथ दिखाए गए; कोई शुद्ध-फल निर्णय नहीं।':undefined});}
 // c13-3 (favourable; Jupiter as 2nd lord in the 2nd, or Mars-joined - unrestricted)
 rows.push({id:'c13-3',ref:'BPHS 13.3',polarity:'अनुकूल',topic:'धनवान',
  served:dhanesh==='Jupiter'&&(bhOf('Jupiter')===2||p.Mars.rashi===p.Jupiter.rashi),
  condition:'धनेश गुरु होकर 2रे भाव में, या धनेश गुरु मंगल-सहित (किसी भी भाव में)',
  detail:dhanesh==='Jupiter'?`धनेश गुरु ${RASHI[p.Jupiter.rashi]} में (भाव ${bhOf('Jupiter')})${p.Mars.rashi===p.Jupiter.rashi?'; मंगल-युति: हाँ':'; मंगल-युति नहीं'}`:`धनेश ${G[dhanesh]} है — यह शर्त इस लग्न पर लागू नहीं (धनेश गुरु नहीं)`,
  text:'परंपरा-कथन: धनवान होने की चर्चा है।',
  note:NOTE_13_3});
 // c13-4 (favourable; three independent alternatives - no yuti anywhere)
 {const a1=bhOf(dhanesh)===11,a2=bhOf(labhesh)===2,a3=KT.includes(bhOf(dhanesh))&&KT.includes(bhOf(labhesh));
 rows.push({id:'c13-4',ref:'BPHS 13.4',polarity:'अनुकूल',topic:'धन-प्राप्ति',
  served:a1||a2||a3,
  condition:`तीन स्वतंत्र विकल्पों में कोई एक: धनेश (${G[dhanesh]}) 11वें में; या लाभेश (${G[labhesh]}) 2रे में; या दोनों पृथक-पृथक केन्द्र/त्रिकोण में`,
  detail:`विकल्प1 (धनेश 11वें में): ${a1?'हाँ':'नहीं'} — धनेश ${G[dhanesh]} भाव ${bhOf(dhanesh)}; विकल्प2 (लाभेश 2रे में): ${a2?'हाँ':'नहीं'} — लाभेश ${G[labhesh]} भाव ${bhOf(labhesh)}; विकल्प3 (दोनों केन्द्र/त्रिकोण): ${a3?'हाँ':'नहीं'}`,
  text:'परंपरा-कथन: धन-प्राप्ति बताई है।',
  note:NOTE_13_4});}
 // c13-5 (favourable; kendra dhanesh + sign-trine labhesh + BOTH Guru and
 // Venus participating + BOTH lords covered by a genuine relation; any
 // benefic-lord identity leaves the row unserved - disclosed cover semantics)
 {const dKe=KENDRA.includes(bhOf(dhanesh));
  const lTri=trineOf(p[dhanesh].rashi).includes(p[labhesh].rashi);
  const dhanBy=['Jupiter','Venus'].filter(b=>relates(b,dhanesh));
  const labhBy=['Jupiter','Venus'].filter(b=>relates(b,labhesh));
  const jPart=dhanBy.includes('Jupiter')||labhBy.includes('Jupiter');
  const vPart=dhanBy.includes('Venus')||labhBy.includes('Venus');
  const ident=['Jupiter','Venus'].filter(b=>b===dhanesh||b===labhesh)
   .map(b=>G[b]+' स्वयं '+(b===dhanesh?(b===labhesh?'धनेश/लाभेश':'धनेश'):'लाभेश')+' है').join('; ');
 rows.push({id:'c13-5',ref:'BPHS 13.5',polarity:'अनुकूल',topic:'धन-लाभ',
  served:dKe&&lTri&&ident===''&&dhanBy.length>0&&labhBy.length>0&&jPart&&vPart,
  condition:`धनेश (${G[dhanesh]}) केन्द्र में; लाभेश (${G[labhesh]}) धनेश-राशि से त्रिकोण में; गुरु और शुक्र दोनों भागीदार — धनेश और लाभेश दोनों को इनमें से किसी से युति/दृष्टि-संबंध (आवरण-पठन)`,
  detail:`धनेश ${G[dhanesh]} भाव ${bhOf(dhanesh)} (${dKe?'केन्द्र':'केन्द्र नहीं'}); लाभेश ${G[labhesh]} ${RASHI[p[labhesh].rashi]} में (धनेश-राशि ${RASHI[p[dhanesh].rashi]} से ${lTri?'त्रिकोण':'त्रिकोण नहीं'}); धनेश-संबंध: ${dhanBy.length?dhanBy.map(g=>G[g]).join(', '):'कोई नहीं'}; लाभेश-संबंध: ${labhBy.length?labhBy.map(g=>G[g]).join(', '):'कोई नहीं'}${ident?'; '+ident+' — तात्विकता संबंध नहीं, पंक्ति असेवित':''}`,
  text:'परंपरा-कथन: धन-लाभ बताया है।',
  note:NOTE_13_5});}
 // c13-6 (adverse; both lords in the 6th, OR both malefic-joined/aspected)
 {const both6=bhOf(dhanesh)===6&&bhOf(labhesh)===6;
  const aD=afflict(dhanesh),aL=afflict(labhesh);
  const aff2=(aD.yuti.length>0||aD.drishti.length>0)&&(aL.yuti.length>0||aL.drishti.length>0);
 rows.push({id:'c13-6',ref:'BPHS 13.6',polarity:'प्रतिकूल',topic:'धन-अभाव',
  served:both6||aff2,
  condition:`धनेश (${G[dhanesh]}) और लाभेश (${G[labhesh]}) दोनों 6ठे में; या दोनों पाप-युक्त/पाप-दृष्ट`,
  detail:`धनेश भाव ${bhOf(dhanesh)}, लाभेश भाव ${bhOf(labhesh)}; धनेश-पीड़ा: ${affText(aD)}; लाभेश-पीड़ा: ${affText(aL)}`,
  text:'परंपरा-कथन: धन-अभाव की चर्चा है।',
  note:NOTE_13_6});}
 // c13-8 (adverse; both lords in dusthanas jointly or separately + Mars 11th + Rahu 2nd)
 {const bothDust=DUSTHANA.includes(bhOf(dhanesh))&&DUSTHANA.includes(bhOf(labhesh));
 rows.push({id:'c13-8',ref:'BPHS 13.8',polarity:'प्रतिकूल',topic:'धन-क्षय (बाह्य)',
  served:bothDust&&bhOf('Mars')===11&&rahuBh===2,
  condition:`धनेश (${G[dhanesh]}) और लाभेश (${G[labhesh]}) 6/8/12 में (संयुक्त या पृथक); मंगल 11वें में; राहु 2रे में (स्थिति-तथ्य)`,
  detail:`धनेश भाव ${bhOf(dhanesh)}; लाभेश भाव ${bhOf(labhesh)}; मंगल भाव ${bhOf('Mars')}; राहु ${rahu?('भाव '+rahuBh):'उपलब्ध नहीं'}`,
  text:'परंपरा-कथन: शासकीय दंड से धन-क्षय की चर्चा (ऐतिहासिक अभिप्राय) है।'});}
 // c13-9 (neutral-descriptive; Jupiter 11th, Venus 2nd, dhanesh benefic-joined, benefic OCCUPYING the 12th)
 {const b12=benIn(12),bD=benYuti(dhanesh);
 rows.push({id:'c13-9',ref:'BPHS 13.9',polarity:'तटस्थ-वर्णन',topic:'धर्म-कार्य व्यय',
  served:bhOf('Jupiter')===11&&bhOf('Venus')===2&&bD.length>0&&b12.length>0,
  condition:'गुरु 11वें में; शुक्र 2रे में; धनेश शुभ-युति; 12वें भाव में शुभ-ग्रह (स्थिति, स्वामित्व नहीं)',
  detail:`गुरु भाव ${bhOf('Jupiter')}; शुक्र भाव ${bhOf('Venus')}; धनेश ${G[dhanesh]}${bD.length?'; शुभ-युति: '+bD.map(g=>G[g]).join(', '):'; शुभ-युति नहीं'}; 12वें में शुभ: ${b12.length?b12.map(g=>G[g]).join(', '):'कोई नहीं'}`,
  text:'परंपरा-कथन: धर्म-कार्य में धन-व्यय की चर्चा (ऐतिहासिक क्रिया-वर्णन) है।',
  note:'यह क्रिया-वर्णन है, कोई क्रिया-निर्देश नहीं।'});}
 // c13-10 (favourable; dhanesh in own or exaltation sign)
 {const own=SIGN_LORD[p[dhanesh].rashi]===dhanesh,ex=p[dhanesh].rashi===EXALT[dhanesh];
 rows.push({id:'c13-10',ref:'BPHS 13.10',polarity:'अनुकूल',topic:'परोपकार-ख्याति',
  served:own||ex,
  condition:`धनेश (${G[dhanesh]}) स्व-राशि या उच्च-राशि में`,
  detail:`धनेश ${G[dhanesh]} ${RASHI[p[dhanesh].rashi]} में (${ex?'उच्च':own?'स्व-राशि':'न उच्च, न स्व-राशि'})`,
  text:'परंपरा-कथन: जन-पोषण, परोपकार और ख्याति बताए हैं (ऐतिहासिक आचरण-कथन)।'});}
 // c13-13a (adverse conduct; BOTH legs required - AND reading)
 {const leg1=malYuti(dhanesh),leg2=malIn(2);
 rows.push({id:'c13-13a',ref:'BPHS 13.13',polarity:'प्रतिकूल',topic:'आचरण',
  served:leg1.length>0&&leg2.length>0,
  condition:`दोनों अंग आवश्यक: धनेश (${G[dhanesh]}) पाप-युति और 2रा भाव पाप-युक्त`,
  detail:`अंग1 (धनेश पाप-युति): ${leg1.length?leg1.map(g=>G[g]).join(', '):'नहीं'}; अंग2 (2रे भाव में पाप): ${leg2.length?leg2.map(g=>G[g]).join(', '):'नहीं'}`,
  text:'परंपरा-कथन: पिशुनता और असत्य-वचन की चर्चा (ऐतिहासिक आचरण-कथन) है।',
  note:NOTE_13_13A});}
 return {source:'BPHS ch13 (vedicpupil Sanskrit + jyotishvidya/Santhanam)',
  header:HEADER,omitN:OMIT_N,omitNotice:OMIT_NOTICE,breadthNotice:BREADTH_NOTICE,
  unmodeledNotice:UNMODELED_NOTICE,nodesNote:NODES_NOTE,conductNote:CONDUCT_NOTE,
  rows,
  scope:'परंपरा-वर्णित शर्त-फल पंक्तियाँ; भविष्यकथन/निश्चय नहीं। राहु/केतु युति-दृष्टि अमॉडल (स्थिति-तथ्य दिखता है); सुरक्षा-लोप 2 (केवल गिनती); 13.1 का सम्बोधन-खंड विस्तार-निर्णय से और 3 पंक्तियाँ अमॉडल-शर्त से नहीं दिखाई गईं।'};}
const api={report,OMIT_N,OMIT_NOTICE,BREADTH_NOTICE,UNMODELED_NOTICE,HEADER,NODES_NOTE,CONDUCT_NOTE};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmDhanaPhal=api;
})(typeof window!=='undefined'?window:globalThis);
