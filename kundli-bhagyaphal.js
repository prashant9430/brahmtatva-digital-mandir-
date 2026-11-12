/* Bhavaphal ch20 (BPHS भाग्य/नवम-भाव फल, 9th house) - condition-matched
tradition rows. Curation: docs/bhavaphal-ch20-ledger-draft.md (32 verses ->
2 row objects; limited chapter scope, not complete-chapter phaladesh).
MODELED 2 rows: c20-9 (20.9) पितृभक्ति (ऐतिहासिक आचरण-कथन frame, not a
character assessment); c20-29 (20.29) धन-वाहन-लाभ।
SCOPE-OMIT (count-only, 29): 9 fortune-statement units (20.1, 20.2, 20.10,
20.12, 20.26, 20.27, 20.28, 20.30, 20.31); 5 father-state units (20.3,
20.4, 20.6, 20.7, 20.11); 14 father life-span timing units (20.5 and
20.13-20.25); 1 conduct unit (20.8). Age qualifiers are never stripped
into untimed servings - the whole yoga is omitted (ages 32/20/36 of
20.10/20.27/20.28 recorded in the ledger and notice). Both valences
treated alike; conservative scope for the current limited stage, not an
enduring prohibition; the source text's meaning is not altered.
BREADTH-OMIT (not safety, 1): 20.32 (closing method statement - judge
further from the STATE/position, स्थिति, of L1/9L; no result row of its
own).
UNMODELED (documented, never silently satisfied; none is a leg of the two
served rows): deep-exaltation DEGREE legs (परमोच्चांश/परमोच्चस्थे - 20.5,
20.8, 20.26, 20.28), navamsha legs (20.5, 20.15पूर्व, 20.20पूर्व),
strength legs (20.1, 20.2), combustion/fall legs (20.12 and others).
Reading decisions (ledger mat-bhed, disclosed):
 20.5 चतुष्टये = the kendra tetrad (1/4/7/10); both translations agree.
 20.9 trikona taken conservatively as the 5th/9th only; a lagna-inclusive
 trikona reading (1st/5th/9th) is explicitly excluded. The Jupiter
 contact leg requires Jupiter to be a graha other than the 9th lord
 itself (a lord's self-contact cannot satisfy a join/aspect leg).
 20.20 वेद 4 + अब्धि 4 = year 44 (numeral words); 20.22 अस्तमः read as
 Rahu per both translations; 8th-from-9th = the 4th house.
 20.13-20.25 is a staggered half-verse chain: each result half pairs
 with the prior verse's condition half (spans disclosed in the ledger);
 the navamsha legs of 20.15 and 20.20 sit in the उत्तरार्ध (b) halves.
 jv divergences recorded in the ledger: 20.7 drops the 10L-in-9th leg;
 20.12 both-lords-weak vs Sanskrit 3L-weak-joined-10L; 20.13 8L-in-9th
 vs vp 8L-joined-9L; 20.16 years 3/6 vs Sanskrit/vp 3/16; 20.20
 रन्ध्रसंयुते: jv in-8th vs vp joined-or-placed; 20.25 years 26/30 vs
 Sanskrit/vp 26/33.
 परमोच्चांश in 20.8/20.26/20.28 = deep-exaltation DEGREE per both
 translations (not a navamsha).
 vp verses 1-32 canonical; jv merged grouping (1-3,3,4,5,6,7,8-9,10,11,
 12,13-25,26,27-28,29,30,31,32) disclosed.
Sources: vedicpupil chapter-20 (Sanskrit per verse), jyotishvidya.com/
ch20.htm (Santhanam).
Machinery (kundli-bhavaphal.js): whole-sign graha-drishti incl. special
aspects (binary presence only - a deliberate simplification of the
graduated source method, disclosed; no exact-parity claim).
Conventions (labeled, ch12 module 1:1):
 - Whole-sign bhavas from Lagna. All yuti/drishti conditions use only the
   seven grahas; nodes' yuti/drishti participation is unmodeled
   (NODES_NOTE).
 - Favourable and adverse rows both always listed (served or unserved);
   no verdicts, no scores; rows are tradition-labeled statements, not
   predictions. */
(function(root){'use strict';
const BP=(typeof module!=='undefined'&&module.exports)?require('./kundli-bhavaphal.js'):root.BrahmBhavaPhal;
const SEVEN=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const G=BP.G,RASHI=BP.RASHI,SIGN_LORD=BP.SIGN_LORD;
const mod=(x,n)=>((x%n)+n)%n,houseOf=(sign,asc)=>mod(sign-asc,12)+1;
const OMIT_N=29;
const OMIT_NOTICE='BPHS अध्याय 20 की इस परंपरा-सूची के '+OMIT_N+' खंड सीमा-नीति से हटाए गए हैं (9 भाग्य-कथन — 20.1, 20.2, 20.10, 20.12, 20.26, 20.27, 20.28, 20.30, 20.31; 5 पितृ-स्थिति-कथन — 20.3, 20.4, 20.6, 20.7, 20.11; 14 पितृ-जीवन-काल-कथन — 20.5 तथा 20.13 से 20.25 तक; 1 आचरण-कथन — 20.8; दोनों दिशाएँ समान, केवल गिनती दी गई है)। काल-निर्दिष्ट अनुकूल भाग्य-योग (20.10, 20.27, 20.28) पूरे लोपित हैं — वर्ष-खंड काटकर अलग से नहीं दिखाए जाते। यह प्रारंभिक परिमित चरण का संरक्षणशील दायरा है, स्थायी निषेध नहीं।';
const BREADTH_NOTICE='इस दृश्य में BPHS अध्याय 20 का एक खंड (20.32, समापन-सूत्र) शामिल नहीं है — इसमें इस दृश्य की स्वतंत्र शर्त-फल पंक्ति नहीं है (लग्नेश और भाग्येश की स्थिति से आगे निर्णय की विधि-सूचना; स्थिति = अवस्था/स्थान, बल-गणना नहीं)। यह सीमा-लोप नहीं है।';
const UNMODELED_NOTICE='BPHS ch20 के कुछ शर्त-तत्व अमॉडल हैं (सभी लोपित पंक्तियों पर; इस चरण की दोनों प्रदर्शित पंक्तियों की कोई शर्त इन पर नहीं टिकी): परमोच्च-अंश-परत खंड (20.5, 20.8, 20.26, 20.28), नवांश-खंड (20.5, 20.15उत्तर, 20.20उत्तर), बल-खंड (20.1, 20.2), मूढ/नीच-खंड (20.12 आदि)। अमॉडल खंड कभी स्वतः पूरा नहीं माना जाता; इस अध्याय की शेष शर्तें इस चरण में गणित नहीं होतीं।';
const HEADER='ये पंक्तियाँ BPHS अध्याय 20 (भाग्य/नवम-भाव फल) की परंपरा-वर्णित शर्त-फल सूची हैं — शर्त बने तो परंपरा-कथन दिखता है, न बने तो पंक्ति पारदर्शिता के लिए बिना फल-पाठ के रहती है। ये भविष्यकथन या निश्चय नहीं; कोई निर्णय/स्कोर नहीं। इस अध्याय का दायरा परिमित है — दो पंक्तियाँ; अध्याय-पूर्णता का दावा नहीं।';
const NODES_NOTE='राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल (परंपरा-भेद); शर्तों में केवल सात ग्रह। राहु/केतु की भाव-स्थिति केवल तथ्य के रूप में दिखती है।';
const NOTE_20_9='यह पंक्ति परंपरा-वर्णित ऐतिहासिक आचरण-कथन है — किसी वर्तमान व्यक्ति का चरित्र-मूल्यांकन या नैतिक निर्णय नहीं, और कुंडली भक्ति सिद्ध नहीं करती। 20.9 में कोण संरक्षणशील पठन से केवल 5वाँ/9वाँ भाव है — लग्न-सहित कोण-पठन (1/5/9) स्पष्ट रूप से बाहर। गुरु-स्पर्श खंड तभी बनता है जब गुरु स्वयं भाग्येश न हो (स्व-स्पर्श शर्त नहीं मानी जाती)।';
const NOTE_20_29='20.29: लग्नेश 9वें, भाग्येश लग्न में, गुरु 7वें (द्यूने) में — तीनों स्थितियाँ; धन-वाहन-लाभ परंपरा-कथन ch15 संपदा-लाभ पंक्तियों की श्रेणी का है।';
function checkPlanets(planets,asc){if(!Number.isInteger(asc)||asc<0||asc>11)throw Error('asc must be an integer sign 0..11');
 if(!Array.isArray(planets))throw Error('planets must be an array');const seen=new Set();
 for(const p of planets){if(!p||!SEVEN.includes(p.graha)){if(p&&(p.graha==='Rahu'||p.graha==='Ketu')){if(!Number.isInteger(p.rashi)||p.rashi<0||p.rashi>11)throw Error(p.graha+' rashi must be an integer sign 0..11');}continue;} // nodes tolerated; yuti/drishti participation excluded, placement usable as fact
  if(seen.has(p.graha))throw Error('duplicate graha '+p.graha);seen.add(p.graha);
  if(!Number.isInteger(p.rashi)||p.rashi<0||p.rashi>11)throw Error(p.graha+' rashi must be an integer sign 0..11');
  if(typeof p.degreesInRashi!=='number'||!Number.isFinite(p.degreesInRashi)||p.degreesInRashi<0||p.degreesInRashi>=30)throw Error(p.graha+' degreesInRashi must be finite in [0,30) - needed by the 3.11 dynamic-class machinery');}
 for(const g of SEVEN)if(!seen.has(g))throw Error('missing graha '+g);}
function report(planets,asc){checkPlanets(planets,asc);
 const p={};for(const x of planets)if(SEVEN.includes(x.graha))p[x.graha]=x;
 const bhavaSign=h=>mod(asc+h-1,12);
 const bhOf=g=>houseOf(p[g].rashi,asc);
 const L1=SIGN_LORD[asc],L9=SIGN_LORD[bhavaSign(9)];
 const rows=[];
 // c20-9 (favourable; Sun in 5th/9th AND 9L in 7th AND Jupiter contact (yuti/drishti) on 9L)
 {const k1=bhOf('Sun')===5||bhOf('Sun')===9,k2=bhOf(L9)===7;
 const k3=L9!=='Jupiter'&&!!(p.Jupiter.rashi===p[L9].rashi||BP.drishti(p.Jupiter.rashi,p[L9].rashi,'Jupiter'));
 rows.push({id:'c20-9',ref:'BPHS 20.9',polarity:'अनुकूल',topic:'पितृभक्ति (ऐतिहासिक आचरण-कथन)',
  served:k1&&k2&&k3,
  condition:'सूर्य लग्न से 5वें/9वें भाव में, भाग्येश 7वें भाव में, तथा भाग्येश पर गुरु-युति या गुरु-दृष्टि (कोई एक) — तीनों',
  detail:`खंड1 (सूर्य 5वें/9वें भाव में): ${k1?'हाँ':'नहीं'}; खंड2 (भाग्येश ${G[L9]} 7वें भाव में): ${k2?'हाँ':'नहीं'}; खंड3 (भाग्येश पर गुरु-स्पर्श): ${k3?'हाँ':'नहीं'}`,
  text:'परंपरा-वर्णित ऐतिहासिक आचरण-कथन: पितृभक्ति की चर्चा है — चरित्र-मूल्यांकन या नैतिक निर्णय नहीं।',
  note:NOTE_20_9});}
 // c20-29 (favourable; L1 in 9th AND 9L in lagna AND Jupiter in 7th)
 {const k1=bhOf(L1)===9,k2=bhOf(L9)===1,k3=bhOf('Jupiter')===7;
 rows.push({id:'c20-29',ref:'BPHS 20.29',polarity:'अनुकूल',topic:'धन-वाहन-लाभ',
  served:k1&&k2&&k3,
  condition:'लग्नेश 9वें भाव में, भाग्येश लग्न में, गुरु 7वें भाव में — तीनों',
  detail:`खंड1 (लग्नेश ${G[L1]} 9वें भाव में): ${k1?'हाँ':'नहीं'}; खंड2 (भाग्येश ${G[L9]} लग्न में): ${k2?'हाँ':'नहीं'}; खंड3 (गुरु 7वें भाव में): ${k3?'हाँ':'नहीं'}`,
  text:'परंपरा-कथन: धन और वाहन-लाभ की प्राप्ति की चर्चा है।',
  note:NOTE_20_29});}
 return {source:'BPHS ch20 (vedicpupil Sanskrit + jyotishvidya/Santhanam)',
  header:HEADER,omitN:OMIT_N,omitNotice:OMIT_NOTICE,breadthNotice:BREADTH_NOTICE,
  unmodeledNotice:UNMODELED_NOTICE,nodesNote:NODES_NOTE,
  rows,
  scope:'परंपरा-वर्णित शर्त-फल पंक्ति; भविष्यकथन/निश्चय नहीं। परिमित अध्याय-दायरा: दो पंक्तियाँ — अध्याय-पूर्णता का दावा नहीं। राहु/केतु युति-दृष्टि अमॉडल; सीमा-लोप 29 (केवल गिनती); 1 सूत्र-खंड विस्तार से नहीं दिखाया गया; अमॉडल तत्व सूचीबद्ध।'};}
const api={report,OMIT_N,OMIT_NOTICE,BREADTH_NOTICE,UNMODELED_NOTICE,HEADER,NODES_NOTE};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmBhagyaPhal=api;
})(typeof window!=='undefined'?window:globalThis);
