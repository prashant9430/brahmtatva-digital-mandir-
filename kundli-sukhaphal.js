/* Bhavaphal ch15 (BPHS सुख/चतुर्थ-भाव फल, 4th house) - condition-matched
tradition rows. Curation: docs/bhavaphal-ch15-ledger-draft.md (14 verses ->
5 row objects; limited chapter scope, not complete-chapter phaladesh).
MODELED 5 rows: c15-2 (15.2) आवास-सुख; c15-3 (15.3) भूमि-यान-गृहादि सुख
(स्वांशक खंड अमॉडल); c15-4 (15.4) विचित्र-सौध; c15-5 (15.5) बन्धु-पूज्यता
(परंपरा-वर्णित शर्त-कथन के रूप में); c15-8 (15.8) पशु-संपदा लाभ।
SCOPE-OMIT (count-only, 7): one life-span statement unit (15.6); one
family-happiness unit (15.7); one bodily-state unit (15.9); four
time-specified conveyance yogas (15.10-15.14पूर्व: groups 10+11पूर्व,
11उत्तर+12पूर्व, 12उत्तर+13पूर्व, 13उत्तर+14पूर्व). Age qualifiers are
never stripped into untimed servings - the whole yoga is omitted. Both
valences treated alike; conservative scope for the initial partial
preview, not an enduring prohibition; the source text's meaning is not
altered.
BREADTH-OMIT (not safety, 2): 15.1 (chapter preamble) and 15.14उत्तर
(general benefic/malefic house-quality qualifier) - no independent
condition row of their own.
UNMODELED (documented, never silently satisfied): 15.3's own-navamsha
(स्वांशक) amsha leg - the row can only be served by the own-sign or
exaltation legs.
Reading decisions (ledger mat-bhed, disclosed):
 15.3 Sanskrit सुखस्थानाधिपो = 4th lord; Santhanam's "5th lord" is a
 documented translation slip.
 15.4 Sanskrit: (4th lord joined the 10th lord) AND (4th lord in an
 angle or a trine); Santhanam agrees; vedicpupil's translation OR-reading
 is a documented divergence.
 15.5 Sanskrit युतेक्षिते = joined OR aspected by a benefic (either, not
 aspect-only); the benefic must be a graha other than the 4th lord.
 15.8 Sanskrit: Sun in the 4th; Saturn in the 4th joined with Sun
 (सुखे रवियुते मन्दे); Moon alone in the 9th (चन्द्रे भाग्यगते); Mars in
 the 11th. Santhanam's "Moon and Saturn in the 9th" is a documented
 divergence; the Sanskrit reading governs.
 15.9 Sanskrit: movable 4th AND its sign-lord AND Mars in the 6th or
 12th (व्यय = 12th; no conjunction required); Santhanam's "together in
 the 6th or the 8th" is a documented double divergence. The row stays
 omitted on its claim category regardless.
 15.13उत्तर-14पूर्व exchange: placements computable (two sign-lord
 placements); graha-yuti vs parivartana readings both recorded; the
 omission ground is the time-specified claim, not uncomputability.
 vp verses 1-14 canonical; Santhanam's merged "10-14" grouping disclosed.
Sources: vedicpupil chapter-15 (Sanskrit per verse), jyotishvidya.com/
ch15.htm (Santhanam).
Machinery (kundli-bhavaphal.js): BPHS 3.11 benefic/malefic classes
(dynamic Moon/Mercury), whole-sign graha-drishti incl. special aspects
(binary presence only - a deliberate simplification of the graduated
source method, disclosed; no exact-parity claim). Dignity: EXALT map
duplicated from kundli-engine.js:18 (same values).
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
const EXALT={Sun:0,Moon:1,Mars:9,Mercury:5,Jupiter:3,Venus:11,Saturn:6}; // duplicated from kundli-engine.js:18 (same values)
const mod=(x,n)=>((x%n)+n)%n,houseOf=(sign,asc)=>mod(sign-asc,12)+1;
const OMIT_N=7;
const OMIT_NOTICE='BPHS अध्याय 15 की इस परंपरा-सूची के '+OMIT_N+' खंड सीमा-नीति से हटाए गए हैं (1 जीवन-अवधि कथन — 15.6; 1 पारिवारिक सुख-कथन — 15.7; 1 शारीरिक-स्थिति कथन — 15.9; 4 काल-निर्दिष्ट यान-योग — 15.10 से 15.14पूर्व तक; दोनों दिशाएँ समान, केवल गिनती दी गई है)। काल-योगों के वर्ष-खंड काटकर अलग से नहीं दिखाए जाते — पूरा योग लोपित है। यह प्रारंभिक आंशिक पूर्वावलोकन का संरक्षणशील दायरा है, स्थायी निषेध नहीं।';
const BREADTH_NOTICE='इस दृश्य में BPHS अध्याय 15 के दो खंड शामिल नहीं हैं: 15.1 (अध्याय-भूमिका) और 15.14उत्तर (भाव की शुभ/पाप-गुणता का सामान्य सूत्र) — इनमें इस दृश्य की स्वतंत्र शर्त-फल पंक्ति नहीं है। यह सीमा-लोप नहीं है।';
const UNMODELED_NOTICE='BPHS ch15 का एक शर्त-तत्व अमॉडल है: 15.3 का स्वांशक (स्व-नवमांश) अंश-खंड — c15-3 पंक्ति केवल स्व-राशि/उच्च खंडों से बन सकती है; अंश-खंड कभी स्वतः पूरा नहीं माना जाता।';
const HEADER='ये पंक्तियाँ BPHS अध्याय 15 (सुख/चतुर्थ-भाव फल) की परंपरा-वर्णित शर्त-फल सूची हैं — शर्त बने तो परंपरा-कथन दिखता है, न बने तो पंक्ति पारदर्शिता के लिए बिना फल-पाठ के रहती है। ये भविष्यकथन या निश्चय नहीं; कोई निर्णय/स्कोर नहीं। इस अध्याय का दायरा परिमित है — पाँच पंक्तियाँ; अध्याय-पूर्णता का दावा नहीं।';
const NODES_NOTE='राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल (परंपरा-भेद); शर्तों में केवल सात ग्रह। राहु/केतु की भाव-स्थिति केवल तथ्य के रूप में दिखती है।';
const NOTE_15_2='15.2 में "अपि वा": 4रे भाव में चतुर्थेश या लग्नेश — कोई एक; शुभ-दृष्टि खंड अनिवार्य सह-शर्त है (दोनों स्रोत सामग्री समान)।';
const NOTE_15_3='15.3 का स्वांशक (स्व-नवमांश) खंड अंश-परत अमॉडल होने से कभी पूरा नहीं माना जाता — यह पंक्ति केवल स्व-राशि/उच्च खंडों से बनती है। jv अनुवाद का "5वें भाव-स्वामी" पठन संस्कृत सुखस्थानाधिपो (चतुर्थेश) से भिन्न है — मत-भेद दर्ज, संस्कृत-प्रधान।';
const NOTE_15_4='15.4: (चतुर्थेश की दशमेश से युति) तथा (चतुर्थेश केंद्र या कोण में) — दोनों शर्तें; vedicpupil अनुवाद का "या" पठन संस्कृत समास से भिन्न — मत-भेद दर्ज, संस्कृत-प्रधान।';
const NOTE_15_5='यह पंक्ति परंपरा-वर्णित शर्त-कथन है — किसी व्यक्ति या प्रतिष्ठा का निर्णय नहीं। 15.5 में युतेक्षिते = शुभ-ग्रह की युति या दृष्टि (कोई एक; केवल दृष्टि नहीं), और वह शुभ-ग्रह चतुर्थेश से भिन्न हो।';
const NOTE_15_8='संस्कृत: सुखे रवियुते मन्दे = 4रे भाव में शनि, सूर्य-युक्त; चन्द्रे भाग्यगते = चन्द्र अकेला 9वें भाव में। jv अनुवाद का "चन्द्र-शनि 9वें" पठन संस्कृत से भिन्न — मत-भेद दर्ज, संस्कृत-प्रधान पठन लागू।';
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
 const bhOf=g=>houseOf(p[g].rashi,asc);
 const L1=SIGN_LORD[asc],L4=SIGN_LORD[bhavaSign(4)],L10=SIGN_LORD[bhavaSign(10)];
 const benDrishtiOn=sign=>SEVEN.filter(b=>cls[b].cls==='शुभ'&&p[b].rashi!==sign&&BP.drishti(p[b].rashi,sign,b));
 const benContactOn=sign=>SEVEN.filter(b=>b!==L4&&cls[b].cls==='शुभ'&&(p[b].rashi===sign||BP.drishti(p[b].rashi,sign,b)));
 const rows=[];
 // c15-2 (favourable; (4L in 4th OR 1L in 4th) AND benefic drishti on the 4th)
 {const k1=bhOf(L4)===4,k2=bhOf(L1)===4,k3=benDrishtiOn(bhavaSign(4));
 rows.push({id:'c15-2',ref:'BPHS 15.2',polarity:'अनुकूल',topic:'आवास-सुख',
  served:(k1||k2)&&k3.length>0,
  condition:'(चतुर्थेश 4रे भाव में या लग्नेश 4रे भाव में — कोई एक) तथा 4रे भाव पर शुभ-दृष्टि — दोनों',
  detail:`खंड1 (चतुर्थेश ${G[L4]} 4रे भाव में): ${k1?'हाँ':'नहीं'}; खंड2 (लग्नेश ${G[L1]} 4रे भाव में): ${k2?'हाँ':'नहीं'}; खंड3 (4रे भाव पर शुभ-दृष्टि): ${k3.length?k3.map(g=>G[g]).join(', '):'कोई नहीं'}`,
  text:'परंपरा-कथन: आवास-सुख की पूर्णता की चर्चा है।',
  note:NOTE_15_2});}
 // c15-3 (favourable; 4L in own sign OR exaltation; own-navamsha leg unmodeled)
 {const own=SIGN_LORD[p[L4].rashi]===L4,ex=p[L4].rashi===EXALT[L4];
 rows.push({id:'c15-3',ref:'BPHS 15.3',polarity:'अनुकूल',topic:'भूमि-यान-गृहादि सुख',
  served:own||ex,
  condition:'चतुर्थेश स्व-राशि या उच्च-राशि में — कोई एक (स्वांशक अंश-खंड अमॉडल)',
  detail:`चतुर्थेश ${G[L4]} ${RASHI[p[L4].rashi]} में (${ex?'उच्च':own?'स्व-राशि':'न उच्च, न स्व-राशि'}); स्वांशक खंड: अमॉडल`,
  text:'परंपरा-कथन: भूमि, यान, गृहादि और वाद्य-सुख की चर्चा है।',
  note:NOTE_15_3});}
 // c15-4 (favourable; (4L yuti 10L) AND (4L in kendra or trikona))
 {const k1=p[L4].rashi===p[L10].rashi,b4=bhOf(L4),k2=[1,4,5,7,9,10].includes(b4);
 rows.push({id:'c15-4',ref:'BPHS 15.4',polarity:'अनुकूल',topic:'विचित्र-सौध/भवन',
  served:k1&&k2,
  condition:'(चतुर्थेश की दशमेश से युति) तथा (चतुर्थेश केंद्र या कोण में) — दोनों',
  detail:`खंड1 (चतुर्थेश ${G[L4]} की दशमेश ${G[L10]} से युति): ${k1?'हाँ':'नहीं'}; खंड2 (चतुर्थेश की भाव-स्थिति): ${b4}वाँ भाव — केंद्र/कोण ${k2?'हाँ':'नहीं'}`,
  text:'परंपरा-कथन: विचित्र सौध और प्राकार से युक्त भवन की चर्चा है।',
  note:NOTE_15_4});}
 // c15-5 (favourable; 4L a natural benefic AND benefic (other graha) yuti/drishti on 4L AND Mercury in lagna)
 {const k1=cls[L4].cls==='शुभ',k2=benContactOn(p[L4].rashi),k3=bhOf('Mercury')===1;
 rows.push({id:'c15-5',ref:'BPHS 15.5',polarity:'अनुकूल',topic:'बन्धु-पूज्यता',
  served:k1&&k2.length>0&&k3,
  condition:'चतुर्थेश शुभ-ग्रह हो, अन्य शुभ-ग्रह की युति या दृष्टि चतुर्थेश पर हो (कोई एक), तथा बुध लग्न में — तीनों',
  detail:`खंड1 (चतुर्थेश ${G[L4]} शुभ): ${k1?'हाँ':'नहीं'}; खंड2 (चतुर्थेश पर अन्य शुभ-युति/दृष्टि): ${k2.length?k2.map(g=>G[g]).join(', '):'कोई नहीं'}; खंड3 (बुध लग्न में): ${k3?'हाँ':'नहीं'}`,
  text:'परंपरा-कथन: बन्धुओं से पूज्यता की चर्चा है।',
  note:NOTE_15_5});}
 // c15-8 (favourable; Sun in 4th AND Saturn in 4th (joined Sun) AND Moon in 9th AND Mars in 11th)
 {const k1=bhOf('Sun')===4,k2=bhOf('Saturn')===4,k3=bhOf('Moon')===9,k4=bhOf('Mars')===11;
 rows.push({id:'c15-8',ref:'BPHS 15.8',polarity:'अनुकूल',topic:'पशु-संपदा लाभ',
  served:k1&&k2&&k3&&k4,
  condition:'सूर्य 4रे भाव में, शनि भी 4रे भाव में (सूर्य-युक्त), चन्द्र 9वें भाव में, मंगल 11वें भाव में — चारों',
  detail:`खंड1 (सूर्य 4रे भाव में): ${k1?'हाँ':'नहीं'}; खंड2 (शनि 4रे भाव में, सूर्य-युक्त): ${k2?'हाँ':'नहीं'}; खंड3 (चन्द्र 9वें भाव में): ${k3?'हाँ':'नहीं'}; खंड4 (मंगल 11वें भाव में): ${k4?'हाँ':'नहीं'}`,
  text:'परंपरा-कथन: गो-महिष्यादि पशु-संपदा की प्राप्ति की चर्चा है।',
  note:NOTE_15_8});}
 return {source:'BPHS ch15 (vedicpupil Sanskrit + jyotishvidya/Santhanam)',
  header:HEADER,omitN:OMIT_N,omitNotice:OMIT_NOTICE,breadthNotice:BREADTH_NOTICE,
  unmodeledNotice:UNMODELED_NOTICE,nodesNote:NODES_NOTE,
  rows,
  scope:'परंपरा-वर्णित शर्त-फल पंक्ति; भविष्यकथन/निश्चय नहीं। परिमित अध्याय-दायरा: पाँच पंक्तियाँ — अध्याय-पूर्णता का दावा नहीं। राहु/केतु युति-दृष्टि अमॉडल; सीमा-लोप 7 (केवल गिनती); 2 सूत्र-खंड विस्तार से नहीं दिखाए गए; 1 अंश-तत्व अमॉडल।'};}
const api={report,OMIT_N,OMIT_NOTICE,BREADTH_NOTICE,UNMODELED_NOTICE,HEADER,NODES_NOTE,EXALT};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmSukhaPhal=api;
})(typeof window!=='undefined'?window:globalThis);
