/* Bhavaphal ch21 (BPHS कर्म-भाव फल, 10th house) - condition-matched tradition
rows. Curation frozen by reviewer gate 2026-11-12 ~19:10 IST (PASS WITH
CORRECTIONS; docs/bhavaphal-ch21-ledger-draft.md):
KEEP 14 rows: 21.3b, 21.4, 21.5, 21.7, 21.8, 21.9, 21.11, 21.13, 21.14,
21.15, 21.17, 21.18, 21.19, 21.21 (22 verses -> 23 row objects via the
21.3a/3b split; 3a unserved, 3b kept).
BREADTH-OMIT (not safety): 21.1 intro, 21.22 closing method (gate G1).
SAFETY-OMIT: none (omitN = 0 - no death/disease/birth/remedy class rows in
this chapter; per-sentence scan in the ledger).
UNSERVED + count-only (gate G5/G6/G7; main 18:38 rule - a required unmodeled
term never silently drops out of a conjunction): 21.2, 21.3a, 21.10, 21.12,
21.20 (required graha-bala: Shadbala totals deliberately uncertified;
reviewer noted v2 lists strength AND dignity separately, so a dignity proxy
would contradict the source), 21.6 (required Rahu-yuti; node participation
unmodeled), 21.16 (karmamsha = 10th from the D9 lagna; D9-bhava machinery
not established, no proxy).
Gate corrections applied: M1 21.10 meena is the SIGN Pisces (not the 12th
bhava); M2 21.12 मीने जीवे likewise; M3 21.20 Jupiter's aspect targets the
10th LORD (देवेन्द्रगुरुणा दृष्टे with कर्मेशे), not the 10th bhava - all
three rows unserved anyway, corrections recorded in the ledger.
Gate should-fixes: SF1 21.4 Sanskrit "तथा" is AND; Santhanam's gloss reads
OR - Sanskrit-primary AND selected (row note). SF2 21.13 literal fruit is
"ratnavaan" (gem-endowed); display text reworded to aabhuShan-samriddhi
under the project scan-token policy - scan-collision only, not a content
prohibition; the literal shloka word lives in the source caches and ledger,
and this rewording is documented in the row note without reintroducing the
scan token. SF3 vp cache carries 21.22 in English only; the closing Sanskrit
was verified live on siva.sh (sources/ss-bphs-ch21-fetch.txt).
Mat-bhed (ledger, code notes on rows): 21.13 केन्द्रेश Sanskrit-primary
(vp Sanskrit = siva.sh live; Santhanam "10th lord in the 12th" is
text-inconsistent); 21.19 तदीशे = karmesh in a trine from the 10th (source
majority + prior-pada reading; vp's Moon-dispositor reading is the outlier);
21.9 तावुभौ केन्द्रगौ वापि carries no yuti requirement (Santhanam adds
"conjunct" as a gloss).
Sources (caches in sources/): vedicpupil chapter-21 (Sanskrit per verse,
12 Nov 18:36 fresh), jyotishvidya.com/ch21.htm (Santhanam), siva.sh
/brihat-parashara-hora-shastra/21/{7,13,19,22} (12 Nov 19:01-19:11).
Machinery (reviewed, kundli-bhavaphal.js): BPHS 3.11 benefic/malefic classes
(dynamic Moon/Mercury), 26.2-5 whole-sign graha-drishti incl. special
aspects (binary presence only). Dignity: EXALT map duplicated from reviewed
kundli-engine.js:18 (byte-stable snippet, same values; reviewed file
untouched). Sign placement (e.g. meena) is a modeled, lagna-independent
condition type - distinct from bhava placement (M1/M2 context).
Conventions (labeled, ch12 pilot 1:1):
 - Whole-sign bhavas from Lagna. All yuti/drishti conditions use only the
   seven grahas; nodes' yuti/drishti participation is unmodeled (NODES_NOTE).
   Node PLACEMENT is a plain fact (21.3b, 21.11) - the chart shows it.
 - 10th-from-10th = 7th bhava; trine-from-10th = 2nd/6th (whole-sign offset).
 - Favourable and adverse rows both always listed (served or unserved);
   no verdicts, no scores; rows are tradition-labeled statements, not
   predictions. Conduct-topic rows are historical/tradition conduct
   discussion only - never a verdict on a present person's moral or
   sexual character (gate G6, CONDUCT_NOTE).
 - The 7 unserved rows are never shown as "शर्त बनी/नहीं बनी" - they were
   not checked at all; only a count-only category note is shipped. */
(function(root){'use strict';
const BP=(typeof module!=='undefined'&&module.exports)?require('./kundli-bhavaphal.js'):root.BrahmBhavaPhal;
const SEVEN=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const G=BP.G,RASHI=BP.RASHI,SIGN_LORD=BP.SIGN_LORD;
const mod=(x,n)=>((x%n)+n)%n,houseOf=(sign,asc)=>mod(sign-asc,12)+1;
const KENDRA=[1,4,7,10],KT=[1,4,5,7,9,10]; // kendra+trikona
const EXALT={Sun:0,Moon:1,Mars:9,Mercury:5,Jupiter:3,Venus:11,Saturn:6}; // duplicated from reviewed kundli-engine.js:18 (same values)
const OMIT_N=0;
const SAFETY_NOTICE='इस अध्याय से सुरक्षा-नीति का कोई खंड नहीं हटाया गया (सुरक्षा-लोप 0)।';
const BREADTH_NOTICE='इस दृश्य में BPHS अध्याय 21 की भूमिका (21.1) और समापन-विधि (21.22) की पंक्तियाँ शामिल नहीं हैं — उनमें जाँच-योग्य शर्त-फल नहीं है। यह सुरक्षा-लोप नहीं है।';
const UNMODELED_NOTICE='BPHS ch21 की 7 पंक्तियाँ अभी नहीं दिखाई गईं (ये जाँची ही नहीं गईं): 5 में ग्रह-बल (सबल/बलहीन) की अपेक्षा है जो अमॉडल है (21.2, 21.3a, 21.10, 21.12, 21.20); 1 में राहु-युति-शर्त अमॉडल है (21.6); 1 में नवांश-भाव (कर्मांश) गणना अमॉडल है (21.16)।';
const HEADER='ये पंक्तियाँ BPHS अध्याय 21 (कर्म-भाव फल) की परंपरा-वर्णित शर्त-फल सूची हैं — शर्त बने तो परंपरा-कथन दिखता है, न बने तो पंक्ति पारदर्शिता के लिए बिना फल-पाठ के रहती है। ये भविष्यकथन या निश्चय नहीं; अनुकूल और प्रतिकूल पंक्तियाँ साथ दी गई हैं, कोई निर्णय/स्कोर नहीं।';
const NODES_NOTE='राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल (परंपरा-भेद); शर्तों में केवल सात ग्रह। राहु/केतु की भाव-स्थिति केवल तथ्य के रूप में दिखती है।';
const CONDUCT_NOTE='आचरण-विषयक पंक्तियाँ ऐतिहासिक/परंपरा आचरण-चर्चा हैं — किसी वर्तमान व्यक्ति पर नैतिक या चरित्र-निर्णय या शिक्षा नहीं।';
const NOTE_21_4='21.4 में Sanskrit "तथा" AND-संयोजन है; Santhanam-अनुवाद OR पढ़ता है — Sanskrit-primary AND चुना गया। "शुभस्थान" के लिए केन्द्र/त्रिकोण एक नामित परिपाटी के रूप में ली गई है, स्रोत का शब्द-सूत्र नहीं। "अन्यथा विपरीत" खंड की अलग पंक्ति नहीं बनाई गई — निषेध-संयोजन कोई नई सूचना नहीं देता।';
const NOTE_21_9='21.9 "तावुभौ केन्द्रगौ वापि" में युति-शर्त नहीं; Santhanam-अनुवाद "conjunct" जोड़ता है — Sanskrit-primary पठन लिया गया।';
const NOTE_21_13='21.13 के शाब्दिक फल-शब्द के स्थान पर यहाँ अर्थ-संकेत के लिए "बहुमूल्य आभूषण-समृद्धि" लिखा गया है। शाब्दिक श्लोक-शब्द स्रोत-अभिलेख में दर्ज है।';
const NOTE_21_19='21.19 "तदीशे तत्त्रिकोणगे" = कर्मेश 10वें-से-त्रिकोण (भाव 2 या 6) — स्रोत-बहुमत और Sanskrit-पूर्वपद (कर्मस्थान) यही पढ़ते हैं; vedicpupil का चन्द्र-नाथ पठन विमत है।';
function checkPlanets(planets,asc){if(!Number.isInteger(asc)||asc<0||asc>11)throw Error('asc must be an integer sign 0..11');
 if(!Array.isArray(planets))throw Error('planets must be an array');const seen=new Set();
 for(const p of planets){if(!p||!SEVEN.includes(p.graha)){if(p&&(p.graha==='Rahu'||p.graha==='Ketu')){if(!Number.isInteger(p.rashi)||p.rashi<0||p.rashi>11)throw Error(p.graha+' rashi must be an integer sign 0..11');}continue;} // nodes tolerated; yuti/drishti participation excluded, placement usable as fact
  if(seen.has(p.graha))throw Error('duplicate graha '+p.graha);seen.add(p.graha);
  if(!Number.isInteger(p.rashi)||p.rashi<0||p.rashi>11)throw Error(p.graha+' rashi must be an integer sign 0..11');
  if(typeof p.degreesInRashi!=='number'||!Number.isFinite(p.degreesInRashi)||p.degreesInRashi<0||p.degreesInRashi>=30)throw Error(p.graha+' degreesInRashi must be finite in [0,30) - needed by the 3.11 dynamic-class machinery');}
 for(const g of SEVEN)if(!seen.has(g))throw Error('missing graha '+g);}
function report(planets,asc){checkPlanets(planets,asc);
 const p={};for(const x of planets)if(SEVEN.includes(x.graha))p[x.graha]=x;
 const cls=BP.classes(planets); // reviewed 3.11 machinery tolerates nodes; rows still exclude node participation
 const bhavaSign=h=>mod(asc+h-1,12);
 const karmesh=SIGN_LORD[bhavaSign(10)],labhesh=SIGN_LORD[bhavaSign(11)],lagnesh=SIGN_LORD[asc],
  bhagyesh=SIGN_LORD[bhavaSign(9)],randhresh=SIGN_LORD[bhavaSign(8)],saptamesh=SIGN_LORD[bhavaSign(7)];
 const kendrashesh=[...new Set([1,4,7,10].map(h=>SIGN_LORD[bhavaSign(h)]))];
 const bhOf=g=>houseOf(p[g].rashi,asc);
 const yutiWith=g=>SEVEN.filter(o=>o!==g&&p[o].rashi===p[g].rashi);
 const benYuti=g=>yutiWith(g).filter(o=>cls[o].cls==='शुभ');
 const malYuti=g=>yutiWith(g).filter(o=>cls[o].cls==='पाप');
 const malIn=h=>SEVEN.filter(g=>bhOf(g)===h&&cls[g].cls==='पाप');
 const rahu=planets.find(x=>x&&x.graha==='Rahu');
 const rahuBh=rahu?houseOf(rahu.rashi,asc):null;
 const jupAspOnKarmesh=BP.drishti(p.Jupiter.rashi,p[karmesh].rashi,'Jupiter');
 const jupYutiKarmesh=karmesh!=='Jupiter'&&p.Jupiter.rashi===p[karmesh].rashi;
 const rows=[];
 // c21-3b (neutral; Rahu PLACEMENT is a fact - NODES_NOTE covers yuti/drishti only)
 rows.push({id:'c21-3b',ref:'BPHS 21.3',polarity:'तटस्थ-वर्णन',topic:'यज्ञ-कर्म',
  served:rahuBh!==null&&KT.includes(rahuBh),
  condition:'राहु केन्द्र या त्रिकोण भाव में (स्थिति-तथ्य)',
  detail:rahu?`राहु ${RASHI[rahu.rashi]} में (भाव ${rahuBh})`:'राहु-स्थिति इनपुट में उपलब्ध नहीं',
  text:'परंपरा-कथन: ज्योतिष्टोम आदि यज्ञ-कर्म करने की चर्चा (ऐतिहासिक क्रिया-वर्णन) है।',
  note:'यह क्रिया-वर्णन है, कोई क्रिया-निर्देश नहीं। राहु की भाव-स्थिति तथ्य है; राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल (नीचे नोट)।'});
 // c21-4 (favourable; AND-conjunction SF1; shubhasthana proxy named - G8)
 rows.push({id:'c21-4',ref:'BPHS 21.4',polarity:'अनुकूल',topic:'लाभ',
  served:benYuti(karmesh).length>0&&KT.includes(bhOf(karmesh)),
  condition:`कर्मेश (${G[karmesh]}) शुभ-ग्रह-सहित और केन्द्र/त्रिकोण भाव में`,
  detail:`कर्मेश ${G[karmesh]} ${RASHI[p[karmesh].rashi]} में (भाव ${bhOf(karmesh)})${benYuti(karmesh).length?'; शुभ-युति: '+benYuti(karmesh).map(g=>G[g]).join(', '):'; शुभ-युति नहीं'}`,
  text:'परंपरा-कथन: राज-सरोकार और वाणिज्य से लाभ (ऐतिहासिक अभिप्राय) बताया है।',
  note:NOTE_21_4});
 // c21-5 (adverse; malefics in the 10th AND 11th bhavas - seven grahas only)
 rows.push({id:'c21-5',ref:'BPHS 21.5',polarity:'प्रतिकूल',topic:'आचरण',
  served:malIn(10).length>0&&malIn(11).length>0,
  condition:'10वें और 11वें दोनों भाव में पाप-ग्रह (सातों में से)',
  detail:`10वें भाव में पाप: ${malIn(10).length?malIn(10).map(g=>G[g]).join(', '):'कोई नहीं'}; 11वें भाव में पाप: ${malIn(11).length?malIn(11).map(g=>G[g]).join(', '):'कोई नहीं'}`,
  text:'परंपरा-कथन: दुष्कृत आचरण और अपनों का अपमान करने की चर्चा (ऐतिहासिक आचरण-कथन) है।'});
 // c21-7 (adverse; gate G6 softened conduct framing - CONDUCT_NOTE)
 rows.push({id:'c21-7',ref:'BPHS 21.7',polarity:'प्रतिकूल',topic:'आचरण',
  served:bhOf(karmesh)===7&&bhOf('Mars')===7&&bhOf('Saturn')===7&&malYuti(saptamesh).length>0,
  condition:`कर्मेश (${G[karmesh]}) 7वें में शनि-मंगल-सहित; सप्तमेश (${G[saptamesh]}) पाप-युति`,
  detail:`कर्मेश ${G[karmesh]} भाव ${bhOf(karmesh)}; मंगल भाव ${bhOf('Mars')}; शनि भाव ${bhOf('Saturn')}; सप्तमेश ${G[saptamesh]} भाव ${bhOf(saptamesh)}${malYuti(saptamesh).length?'; पाप-युति: '+malYuti(saptamesh).map(g=>G[g]).join(', '):'; पाप-युति नहीं'}`,
  text:'परंपरा-कथन: भोग-परायण आचरण की चर्चा (ऐतिहासिक आचरण-कथन) है।'});
 // c21-8 (favourable; exaltation + Jupiter yuti + bhagyesh in 10th)
 rows.push({id:'c21-8',ref:'BPHS 21.8',polarity:'अनुकूल',topic:'मान-ऐश्वर्य',
  served:p[karmesh].rashi===EXALT[karmesh]&&jupYutiKarmesh&&bhOf(bhagyesh)===10,
  condition:`कर्मेश (${G[karmesh]}) उच्च-राशि में गुरु-सहित; भाग्येश (${G[bhagyesh]}) 10वें भाव में`,
  detail:`कर्मेश ${G[karmesh]} ${RASHI[p[karmesh].rashi]} में (${p[karmesh].rashi===EXALT[karmesh]?'उच्च':'उच्च नहीं'})${karmesh==='Jupiter'?'; कर्मेश स्वयं गुरु — गुरु-युति संभव नहीं':(jupYutiKarmesh?'; गुरु-युति: हाँ':'; गुरु-युति: नहीं')}; भाग्येश ${G[bhagyesh]} भाव ${bhOf(bhagyesh)}`,
  text:'परंपरा-कथन: मान, ऐश्वर्य और प्रताप बताए हैं।'});
 // c21-9 (favourable; exchange OR both-in-kendra; no yuti required - G9)
 rows.push({id:'c21-9',ref:'BPHS 21.9',polarity:'अनुकूल',topic:'सुख-जीवन',
  served:(bhOf(labhesh)===10&&bhOf(karmesh)===1)||(KENDRA.includes(bhOf(karmesh))&&KENDRA.includes(bhOf(labhesh))),
  condition:`लाभेश (${G[labhesh]}) 10वें में और कर्मेश (${G[karmesh]}) लग्न में, या दोनों केन्द्र में`,
  detail:`लाभेश ${G[labhesh]} भाव ${bhOf(labhesh)}; कर्मेश ${G[karmesh]} भाव ${bhOf(karmesh)}`,
  text:'परंपरा-कथन: सुखपूर्वक जीवन-यापन बताया है।',
  note:NOTE_21_9});
 // c21-11 (adverse; Sun+Rahu+Mars+Saturn all in the 11th - Rahu placement is a fact)
 rows.push({id:'c21-11',ref:'BPHS 21.11',polarity:'प्रतिकूल',topic:'कर्म-व्यवधान',
  served:bhOf('Sun')===11&&rahuBh===11&&bhOf('Mars')===11&&bhOf('Saturn')===11,
  condition:'सूर्य, राहु, मंगल और शनि चारों 11वें भाव में',
  detail:`सूर्य भाव ${bhOf('Sun')}; राहु ${rahu?('भाव '+rahuBh):'उपलब्ध नहीं'}; मंगल भाव ${bhOf('Mars')}; शनि भाव ${bhOf('Saturn')}`,
  text:'परंपरा-कथन: कर्म में व्यवधान आने की चर्चा है।'});
 // c21-13 (favourable; kendresh Sanskrit-primary - G9; SF2 reworded fruit, note)
 rows.push({id:'c21-13',ref:'BPHS 21.13',polarity:'अनुकूल',topic:'समृद्धि',
  served:kendrashesh.some(k=>bhOf(k)===11)&&bhOf(labhesh)===1&&bhOf('Venus')===10,
  condition:`कोई केन्द्रेश (${kendrashesh.map(k=>G[k]).join('/')}) 11वें में; लाभेश (${G[labhesh]}) लग्न में; शुक्र 10वें में`,
  detail:`11वें में केन्द्रेश: ${kendrashesh.filter(k=>bhOf(k)===11).map(k=>G[k]).join(', ')||'कोई नहीं'}; लाभेश ${G[labhesh]} भाव ${bhOf(labhesh)}; शुक्र भाव ${bhOf('Venus')}`,
  text:'परंपरा-कथन: बहुमूल्य आभूषण-समृद्धि (ऐतिहासिक अभिप्राय) बताई है।',
  note:NOTE_21_13});
 // c21-14 (favourable; exalted karmesh in kendra/trikona + Jupiter yuti OR drishti)
 rows.push({id:'c21-14',ref:'BPHS 21.14',polarity:'अनुकूल',topic:'कर्म-संलग्नता',
  served:p[karmesh].rashi===EXALT[karmesh]&&KT.includes(bhOf(karmesh))&&(jupYutiKarmesh||!!jupAspOnKarmesh),
  condition:`कर्मेश (${G[karmesh]}) उच्च-राशि में केन्द्र/त्रिकोण स्थित; गुरु-युति या गुरु-दृष्टि`,
  detail:`कर्मेश ${G[karmesh]} ${RASHI[p[karmesh].rashi]} में (भाव ${bhOf(karmesh)}, ${p[karmesh].rashi===EXALT[karmesh]?'उच्च':'उच्च नहीं'})${karmesh==='Jupiter'?'; कर्मेश स्वयं गुरु — गुरु-युति संभव नहीं':(jupYutiKarmesh?'; गुरु-युति: हाँ':'')}${jupAspOnKarmesh?'; गुरु-दृष्टि: '+jupAspOnKarmesh:(jupYutiKarmesh?'':'; गुरु-दृष्टि नहीं')}`,
  text:'परंपरा-कथन: कर्म में संलग्नता बताई है।'});
 // c21-15 (favourable; karmesh in lagna joined lagnesh + Moon in kendra/trikona)
 rows.push({id:'c21-15',ref:'BPHS 21.15',polarity:'अनुकूल',topic:'सत्कर्म-रुचि',
  served:bhOf(karmesh)===1&&karmesh!==lagnesh&&p[lagnesh].rashi===p[karmesh].rashi&&KT.includes(bhOf('Moon')),
  condition:`कर्मेश (${G[karmesh]}) लग्न में लग्नेश (${G[lagnesh]}) सहित; चन्द्र केन्द्र/त्रिकोण में`,
  detail:`कर्मेश ${G[karmesh]} भाव ${bhOf(karmesh)}; लग्नेश ${G[lagnesh]} भाव ${bhOf(lagnesh)}${karmesh===lagnesh?' (कर्मेश = लग्नेश — युति स्वयं से संभव नहीं)':''}; चन्द्र भाव ${bhOf('Moon')}`,
  text:'परंपरा-कथन: सत्कर्म में रुचि की चर्चा (ऐतिहासिक आचरण-कथन) है।'});
 // c21-17 (adverse; karmesh 8th, randhresh 10th with malefic yuti)
 rows.push({id:'c21-17',ref:'BPHS 21.17',polarity:'प्रतिकूल',topic:'आचरण',
  served:bhOf(karmesh)===8&&bhOf(randhresh)===10&&malYuti(randhresh).length>0,
  condition:`कर्मेश (${G[karmesh]}) 8वें में; रन्ध्रेश (${G[randhresh]}) 10वें में पाप-युति`,
  detail:`कर्मेश ${G[karmesh]} भाव ${bhOf(karmesh)}; रन्ध्रेश ${G[randhresh]} भाव ${bhOf(randhresh)}${malYuti(randhresh).length?'; पाप-युति: '+malYuti(randhresh).map(g=>G[g]).join(', '):'; पाप-युति नहीं'}`,
  text:'परंपरा-कथन: दुष्कर्म-प्रवृत्ति की चर्चा (ऐतिहासिक आचरण-कथन) है।'});
 // c21-18 (adverse; debilitated karmesh, malefics in 10th and 10th-from-10th=7th)
 rows.push({id:'c21-18',ref:'BPHS 21.18',polarity:'प्रतिकूल',topic:'कर्म-बाधा',
  served:p[karmesh].rashi===mod(EXALT[karmesh]+6,12)&&malIn(10).length>0&&malIn(7).length>0,
  condition:`कर्मेश (${G[karmesh]}) नीच-राशि में; 10वें और 7वें (10वें से 10वाँ) भाव में पाप-ग्रह`,
  detail:`कर्मेश ${G[karmesh]} ${RASHI[p[karmesh].rashi]} में (${p[karmesh].rashi===mod(EXALT[karmesh]+6,12)?'नीच':'नीच नहीं'}); 10वें में पाप: ${malIn(10).length?malIn(10).map(g=>G[g]).join(', '):'कोई नहीं'}; 7वें में पाप: ${malIn(7).length?malIn(7).map(g=>G[g]).join(', '):'कोई नहीं'}`,
  text:'परंपरा-कथन: कर्म-बाधा की चर्चा है।'});
 // c21-19 (favourable; Moon 10th, karmesh trine-from-10th, lagnesh kendra - G9)
 rows.push({id:'c21-19',ref:'BPHS 21.19',polarity:'अनुकूल',topic:'सत्कीर्ति',
  served:bhOf('Moon')===10&&(bhOf(karmesh)===2||bhOf(karmesh)===6)&&KENDRA.includes(bhOf(lagnesh)),
  condition:`चन्द्र 10वें में; कर्मेश (${G[karmesh]}) 2रे/6ठे (10वें से त्रिकोण) में; लग्नेश (${G[lagnesh]}) केन्द्र में`,
  detail:`चन्द्र भाव ${bhOf('Moon')}; कर्मेश ${G[karmesh]} भाव ${bhOf(karmesh)}; लग्नेश ${G[lagnesh]} भाव ${bhOf(lagnesh)}`,
  text:'परंपरा-कथन: सत्कीर्ति बताई है।',
  note:NOTE_21_19});
 // c21-21 (favourable; karmesh 9th, lagnesh 10th, Moon 5th)
 rows.push({id:'c21-21',ref:'BPHS 21.21',polarity:'अनुकूल',topic:'ख्याति',
  served:bhOf(karmesh)===9&&bhOf(lagnesh)===10&&bhOf('Moon')===5,
  condition:`कर्मेश (${G[karmesh]}) 9वें में; लग्नेश (${G[lagnesh]}) 10वें में; चन्द्र 5वें में`,
  detail:`कर्मेश ${G[karmesh]} भाव ${bhOf(karmesh)}; लग्नेश ${G[lagnesh]} भाव ${bhOf(lagnesh)}; चन्द्र भाव ${bhOf('Moon')}`,
  text:'परंपरा-कथन: ख्याति बताई है।'});
 return {source:'BPHS ch21 (vedicpupil Sanskrit + jyotishvidya/Santhanam; siva.sh 21/7,13,19,22 मिलान)',
  header:HEADER,omitN:OMIT_N,safetyNotice:SAFETY_NOTICE,breadthNotice:BREADTH_NOTICE,
  unmodeledNotice:UNMODELED_NOTICE,nodesNote:NODES_NOTE,conductNote:CONDUCT_NOTE,
  rows,
  scope:'परंपरा-वर्णित शर्त-फल पंक्तियाँ; भविष्यकथन/निश्चय नहीं। राहु/केतु युति-दृष्टि अमॉडल (स्थिति-तथ्य दिखता है); सुरक्षा-लोप 0; 2 खंड विस्तार-निर्णय से और 7 पंक्तियाँ अमॉडल-शर्त से नहीं दिखाई गईं।'};}
const api={report,OMIT_N,SAFETY_NOTICE,BREADTH_NOTICE,UNMODELED_NOTICE,HEADER,NODES_NOTE,CONDUCT_NOTE};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmKarmaPhal=api;
})(typeof window!=='undefined'?window:globalThis);
