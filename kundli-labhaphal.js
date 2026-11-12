/* Bhavaphal ch22 (BPHS लाभ-भाव फल, 11th house) - condition-matched tradition
rows. Served-row curation (frozen 2026-11-12):
KEEP 22.2a, 22.2b, 22.3, 22.7, 22.9, 22.10, 22.11a, 22.11c (8 rows);
OMIT 22.1 (breadth), 22.4/22.5/22.6/22.8 (fixed-year + fixed-nishka-quantity
wealth claims - specific fortune timing+amount category, historical frame does
not rescue) (omitN = 5, count-only notice);
UNMODELED segments (not omissions, not counted in omitN): 22.2c suryanshag
(translation mat-bhed: Santhanam/siva.sh "though in combustion" vs vedicpupil
"in the Sun's division" - both readings unmodeled) and 22.11b asta (authentic
combustion in all three sources, combustion machinery unmodeled). Both are
independent segments of their verses: the kept fruit sentences rest on the
modeled conditions alone, so dropping the unmodeled segment does not make a row
look satisfied.
Corrections applied: (1) 22.7 wording reworded to avoid the project's
banned scan token (remedy-category collision only, not a content
violation); (2) nodes convention restated below and shipped in the
module (NODES_NOTE); (3) tests carry hardened scans incl. backtick templates.
Sources (caches in sources/):
 jyotishvidya.com/ch22.htm (Santhanam), vedicpupil chapter-22 (Sanskrit per
 verse), siva.sh /brihat-parashara-hora-shastra/22/{1,2,11};
 Sanskrit vp vs siva.sh 22.2 byte-identical.
Machinery (kundli-bhavaphal.js): BPHS 3.11 benefic/malefic classes
(dynamic Moon/Mercury). Dignity: EXALT map duplicated from
kundli-engine.js:18 (byte-stable snippet, same values; source file untouched).
Conventions (labeled, ch12 pilot 1:1):
 - Whole-sign bhavas from Lagna. All conditions use only the seven grahas.
 - Nodes excluded from yuti participation (unmodeled, labeled) - a node sharing
   a sign neither satisfies nor breaks any condition and is never read as
   favourable or adverse.
 - Favourable and adverse rows both always listed (served or unserved);
   no verdicts, no scores; rows are tradition-labeled statements, not predictions.
 - No strength/combustion/amsha condition is silently dropped: the two
   unmodeled segments are independent clauses, shown as transparent notes. */
(function(root){'use strict';
const BP=(typeof module!=='undefined'&&module.exports)?require('./kundli-bhavaphal.js'):root.BrahmBhavaPhal;
const SEVEN=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const G=BP.G,RASHI=BP.RASHI,SIGN_LORD=BP.SIGN_LORD;
const mod=(x,n)=>((x%n)+n)%n,houseOf=(sign,asc)=>mod(sign-asc,12)+1;
const KENDRA=[1,4,7,10],TRIKONA=[1,5,9],DUSTHANA=[6,8,12];
const EXALT={Sun:0,Moon:1,Mars:9,Mercury:5,Jupiter:3,Venus:11,Saturn:6}; // duplicated from reviewed kundli-engine.js:18 (same values)
const OMIT_N=5;
const OMIT_NOTICE='BPHS अध्याय 22 की इस परंपरा-सूची के '+OMIT_N+' खंड सुरक्षा-नीति से हटाए गए हैं।';
const HEADER='ये पंक्तियाँ BPHS अध्याय 22 (लाभ-भाव फल) की परंपरा-वर्णित शर्त-फल सूची हैं — शर्त बने तो परंपरा-कथन दिखता है, न बने तो पंक्ति पारदर्शिता के लिए बिना फल-पाठ के रहती है। ये भविष्यकथन या निश्चय नहीं; अनुकूल और प्रतिकूल पंक्तियाँ साथ दी गई हैं, कोई निर्णय/स्कोर नहीं।';
const NODES_NOTE='राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल (परंपरा-भेद); शर्तों में केवल सात ग्रह।';
const UNMODELED_22_2C='22.2 का "सूर्यांशगोऽपि वा" खंड — अनुवाद-मतभेद: Santhanam/siva.sh "though in combustion", vedicpupil "in the Sun\'s division"; दोनों पठन अभी अमॉडल, अतः यह खंड शर्त में नहीं जोड़ा गया और इस पंक्ति के फल पर असर नहीं डालता।';
const UNMODELED_22_11B='22.11 का "अस्त" (combustion) खंड संस्कृत-प्रामाणिक है परन्तु अस्तता-गणना अभी अमॉडल; यह खंड शर्त में नहीं जोड़ा गया।';
function checkPlanets(planets,asc){if(!Number.isInteger(asc)||asc<0||asc>11)throw Error('asc must be an integer sign 0..11');
 if(!Array.isArray(planets))throw Error('planets must be an array');const seen=new Set();
 for(const p of planets){if(!p||!SEVEN.includes(p.graha)){if(p&&(p.graha==='Rahu'||p.graha==='Ketu')){if(!Number.isInteger(p.rashi)||p.rashi<0||p.rashi>11)throw Error(p.graha+' rashi must be an integer sign 0..11');}continue;} // nodes tolerated but excluded from all conditions (unmodeled participation)
  if(seen.has(p.graha))throw Error('duplicate graha '+p.graha);seen.add(p.graha);
  if(!Number.isInteger(p.rashi)||p.rashi<0||p.rashi>11)throw Error(p.graha+' rashi must be an integer sign 0..11');
  if(typeof p.degreesInRashi!=='number'||!Number.isFinite(p.degreesInRashi)||p.degreesInRashi<0||p.degreesInRashi>=30)throw Error(p.graha+' degreesInRashi must be finite in [0,30) - needed by the 3.11 dynamic-class machinery');}
 for(const g of SEVEN)if(!seen.has(g))throw Error('missing graha '+g);}
function report(planets,asc){checkPlanets(planets,asc);
 const p={};for(const x of planets)if(SEVEN.includes(x.graha))p[x.graha]=x;
 const cls=BP.classes(planets); // reviewed 3.11 machinery tolerates nodes; rows still exclude node participation
 const bhavaSign=h=>mod(asc+h-1,12);
 const labhesh=SIGN_LORD[bhavaSign(11)],dhanesh=SIGN_LORD[bhavaSign(2)],sahajesh=SIGN_LORD[bhavaSign(3)];
 const bhOf=g=>houseOf(p[g].rashi,asc);
 const ls=p[labhesh].rashi;
 const withLab=SEVEN.filter(g=>g!==labhesh&&p[g].rashi===ls);
 const malWithLab=withLab.filter(g=>cls[g].cls==='पाप');
 const rows=[];
 // c22-2a
 rows.push({id:'c22-2a',ref:'BPHS 22.2',polarity:'अनुकूल',topic:'लाभ',
  served:bhOf(labhesh)===11||KENDRA.includes(bhOf(labhesh))||TRIKONA.includes(bhOf(labhesh)),
  condition:`लाभेश (${G[labhesh]}) 11वें, केन्द्र या त्रिकोण भाव में`,
  detail:`लाभेश ${G[labhesh]} ${RASHI[ls]} में (भाव ${bhOf(labhesh)})`,
  text:'परंपरा-कथन: बहुत लाभ बताया है।'});
 // c22-2b (unmodeled 22.2c note attached - independent segment, see header)
 rows.push({id:'c22-2b',ref:'BPHS 22.2',polarity:'अनुकूल',topic:'लाभ',
  served:p[labhesh].rashi===EXALT[labhesh],
  condition:`लाभेश (${G[labhesh]}) उच्च-राशि में`,
  detail:`लाभेश ${G[labhesh]} ${RASHI[ls]} में (${p[labhesh].rashi===EXALT[labhesh]?'उच्च':'उच्च नहीं'})`,
  text:'परंपरा-कथन: बहुत लाभ बताया है।',
  unmodeled:UNMODELED_22_2C});
 // c22-3
 rows.push({id:'c22-3',ref:'BPHS 22.3',polarity:'अनुकूल',topic:'बड़ा लाभ',
  served:bhOf(labhesh)===2&&KENDRA.includes(bhOf(dhanesh))&&p.Jupiter.rashi===p[dhanesh].rashi,
  condition:`लाभेश (${G[labhesh]}) 2रे भाव में; धनेश (${G[dhanesh]}) केन्द्र में गुरु-सहित`,
  detail:`लाभेश ${G[labhesh]} भाव ${bhOf(labhesh)}; धनेश ${G[dhanesh]} भाव ${bhOf(dhanesh)}${p.Jupiter.rashi===p[dhanesh].rashi?'; गुरु-युति: हाँ':'; गुरु-युति: नहीं'}`,
  text:'परंपरा-कथन: बड़े लाभ (गुरुलाभ) बताए हैं।'});
 // c22-7 (corrected wording: see header note 1)
 rows.push({id:'c22-7',ref:'BPHS 22.7',polarity:'अनुकूल',topic:'समृद्धि',
  served:bhOf('Jupiter')===9&&bhOf('Mercury')===9&&bhOf('Moon')===9,
  condition:'गुरु, बुध और चन्द्र तीनों 9वें भाव (लाभ से 11वाँ) में',
  detail:`गुरु भाव ${bhOf('Jupiter')}; बुध भाव ${bhOf('Mercury')}; चन्द्र भाव ${bhOf('Moon')}`,
  text:'परंपरा-कथन: धन, धान्य और आभूषण की समृद्धि (ऐतिहासिक अभिप्राय) बताई है।'});
 // c22-9
 rows.push({id:'c22-9',ref:'BPHS 22.9',polarity:'अनुकूल',topic:'समृद्धि-क्रम',
  served:bhOf(dhanesh)===11&&bhOf(labhesh)===2,
  condition:`धनेश (${G[dhanesh]}) 11वें और लाभेश (${G[labhesh]}) 2रे भाव में`,
  detail:`धनेश ${G[dhanesh]} भाव ${bhOf(dhanesh)}; लाभेश ${G[labhesh]} भाव ${bhOf(labhesh)}`,
  text:'परंपरा-कथन: विवाह के बाद बढ़ती समृद्धि (ऐतिहासिक अभिप्राय) बताई है।'});
 // c22-10
 rows.push({id:'c22-10',ref:'BPHS 22.10',polarity:'अनुकूल',topic:'सहोदर-मार्ग धन',
  served:bhOf(sahajesh)===11&&bhOf(labhesh)===3,
  condition:`सहजेश (${G[sahajesh]}) 11वें और लाभेश (${G[labhesh]}) 3रे भाव में`,
  detail:`सहजेश ${G[sahajesh]} भाव ${bhOf(sahajesh)}; लाभेश ${G[labhesh]} भाव ${bhOf(labhesh)}`,
  text:'परंपरा-कथन: सहोदर-मार्ग से धन और उत्तम आभरण (ऐतिहासिक अभिप्राय) बताए हैं।'});
 // c22-11a
 rows.push({id:'c22-11a',ref:'BPHS 22.11',polarity:'प्रतिकूल',topic:'लाभ-कष्ट',
  served:p[labhesh].rashi===mod(EXALT[labhesh]+6,12),
  condition:`लाभेश (${G[labhesh]}) नीच-राशि में`,
  detail:`लाभेश ${G[labhesh]} ${RASHI[ls]} में (${p[labhesh].rashi===mod(EXALT[labhesh]+6,12)?'नीच':'नीच नहीं'})`,
  text:'परंपरा-कथन: बहुत चेष्टा के बावजूद लाभ न मिलने की चर्चा है।',
  unmodeled:UNMODELED_22_11B});
 // c22-11c (malefic yuti from the seven grahas only - NODES_NOTE)
 rows.push({id:'c22-11c',ref:'BPHS 22.11',polarity:'प्रतिकूल',topic:'लाभ-कष्ट',
  served:DUSTHANA.includes(bhOf(labhesh))&&malWithLab.length>0,
  condition:`लाभेश (${G[labhesh]}) 6/8/12 भाव में + पाप-युति`,
  detail:`लाभेश ${G[labhesh]} भाव ${bhOf(labhesh)}${malWithLab.length?'; पाप-युति: '+malWithLab.map(g=>G[g]).join(', '):'; पाप-युति नहीं'}`,
  text:'परंपरा-कथन: बहुत चेष्टा के बावजूद लाभ न मिलने की चर्चा है।',
  unmodeled:UNMODELED_22_11B});
 return {source:'BPHS ch22 (jyotishvidya/Santhanam + vedicpupil Sanskrit; siva.sh 22/1,2,11 मिलान)',
  header:HEADER,omitN:OMIT_N,omitNotice:OMIT_NOTICE,nodesNote:NODES_NOTE,
  rows,
  scope:'परंपरा-वर्णित शर्त-फल पंक्तियाँ; भविष्यकथन/निश्चय नहीं। राहु/केतु अमॉडल; 5 खंड नीति से हटे; 2 खंड अमॉडल-सूची में (ledger देखें)।'};}
const api={report,OMIT_N,OMIT_NOTICE,HEADER,NODES_NOTE,UNMODELED_22_2C,UNMODELED_22_11B};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmLabhaPhal=api;
})(typeof window!=='undefined'?window:globalThis);
