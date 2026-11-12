/* Bhavaphal ch23 (BPHS व्यय-भाव फल, 12th house) - condition-matched
tradition rows. Curation: docs/bhavaphal-ch23-ledger-draft.md (14 verses ->
12 row objects).
MODELED 7 rows: c23-1 (23.1+2a), c23-2 (23.2b-4), c23-3 (23.5-6a),
c23-9 (23.11), c23-10 (23.12), c23-11 (23.13), c23-12 (23.14).
SCOPE/SAFETY-OMIT (count-only, 5): 23.9 and 23.10 (otherworld-result
claims, both directions, same policy); 23.6b whole row and the
relationship-happiness segments of 23.4 and 23.5 (relationship-happiness
claims, favourable and adverse treated alike).
BREADTH-OMIT (not safety, 3): 23.1's address phrase (its condition clause
lives on in c23-1), 23.7 (method verse), 23.8 (general hemisphere
principle).
UNMODELED (2 independent OR-segments, labeled - never silently satisfied):
23.3's own/11th/9th/5th-lord NAVAMSHA options (c23-2 still checks its
rashi-based legs), 23.5's enemy/debilitation/ashtamsha options (c23-3
still checks the 6th/8th-placement leg).
Reading decisions (recorded mat-bhed, disclosed on the rows):
 23.2b-4 OR-structure adopted (Santhanam): Moon as 12th lord AND (bhava
 9/11/5 OR exalted OR own sign OR navamsha options). vedicpupil's
 AND-chain is vacuous (Moon lords the 12th only from Leo lagna, where
 bhavas 9/11/5 are Aries/Gemini/Sagittarius - never Cancer/Taurus) and is
 a documented divergence. vedicpupil's navamsha-only reading of
 लाभधर्मात्मजांशके vs Santhanam's rasi/navamsa also documented.
 23.11/23.12 THREE legs AND (Sanskrit list without वा + Santhanam "and";
 vedicpupil's English OR is a documented divergence) - every leg always
 shown separately in the detail.
 23.12 fruit direction Sanskrit-primary: स्वदेशात् = movement FROM/away
 from the homeland; Santhanam's "in his own country" is a documented
 divergence. शुभ-राशि = signs ruled by the natural benefics (Mercury,
 Jupiter, Venus, Moon) - a static NAMED convention, disclosed, not a
 source claim; the conditional (paksha) nature of Moon's beneficence does
 not alter this static sign list.
 23.13 BOTH Saturn and Mars in the 12th with zero benefic aspect
 (Sanskrit मन्दादिसंयुक्ते भूमिजेन समन्विते; Santhanam's "or" is a
 documented divergence). मन्दादि's "adi" spread is unmodeled - Saturn
 only, conservative and narrower, disclosed. शुभदृष्टेः न सम्प्राप्तिः =
 zero benefic ASPECT on the 12th sign (a literal negative check).
 23.14 Venus-yuti of the 12th lord is a two-graha relation: when Venus IS
 the 12th lord the leg cannot be satisfied (disclosed).
Sources: vedicpupil chapter-23 (Sanskrit per verse), jyotishvidya.com/
ch23.htm (Santhanam).
Machinery (kundli-bhavaphal.js): BPHS 3.11 benefic/malefic classes
(dynamic Moon/Mercury), 26.2-5 whole-sign graha-drishti incl. special
aspects (binary presence only). Dignity: EXALT map duplicated from
kundli-engine.js:18 (byte-stable snippet, same values; that file
untouched).
Conventions (labeled, ch12 module 1:1):
 - Whole-sign bhavas from Lagna. All yuti/drishti conditions use only the
   seven grahas; nodes' yuti/drishti participation is unmodeled
   (NODES_NOTE).
 - Favourable and adverse rows both always listed (served or unserved);
   no verdicts, no scores; rows are tradition-labeled statements, not
   predictions. Conduct-topic rows are historical/tradition conduct
   discussion only - never a verdict on a present person's moral
   character (CONDUCT_NOTE). */
(function(root){'use strict';
const BP=(typeof module!=='undefined'&&module.exports)?require('./kundli-bhavaphal.js'):root.BrahmBhavaPhal;
const SEVEN=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const G=BP.G,RASHI=BP.RASHI,SIGN_LORD=BP.SIGN_LORD;
const mod=(x,n)=>((x%n)+n)%n,houseOf=(sign,asc)=>mod(sign-asc,12)+1;
const EXALT={Sun:0,Moon:1,Mars:9,Mercury:5,Jupiter:3,Venus:11,Saturn:6}; // duplicated from kundli-engine.js:18 (same values)
// शुभ-राशि named convention: signs ruled by the natural benefics
// (Mercury 2/5, Jupiter 8/11, Venus 1/6, Moon 3) - static list, disclosed
// in NOTE_23_12; independent of the dynamic 3.11 classes.
const SHUBHA_RASHI=[1,2,3,5,6,8,11];
const OMIT_N=5;
const OMIT_NOTICE='BPHS अध्याय 23 की इस परंपरा-सूची के '+OMIT_N+' खंड सीमा-नीति से हटाए गए हैं (2 परलोक-फल दावे — 23.9 और 23.10; 3 संबंध-सुख कथन — 23.4 का एक खंड, 23.5 का एक खंड, 23.6b पूर्ण पंक्ति; केवल गिनती दी गई है)।';
const BREADTH_NOTICE='इस दृश्य में BPHS अध्याय 23 के तीन खंड शामिल नहीं हैं: प्रारम्भ-श्लोक (23.1) का सम्बोधन-वाक्यांश (उसी श्लोक की शर्त इस सूची की पहली पंक्ति में जाँची गई है), 23.7 (अन्य भावों पर पद्धति-अनुप्रयोग) और 23.8 (दृश्य/अदृश्य अर्ध का सामान्य सिद्धांत) — इनमें इस दृश्य की स्वतंत्र शर्त-फल पंक्ति नहीं है। यह सीमा-लोप नहीं है।';
const UNMODELED_NOTICE='BPHS ch23 के 2 शर्त-खंड अमॉडल हैं (दोनों नवांश-आधारित): 23.3 का निजांश/लाभ-धर्म-पुत्रांश विकल्प और 23.5 का शत्रु/नीच/अष्टम-अंश विकल्प। दोनों स्वतंत्र OR-खंड हैं — उनकी पंक्तियाँ राशि-आधारित खंडों से जाँची जाती रहती हैं, और अंश-खंड कभी स्वतः पूरा नहीं माना जाता।';
const HEADER='ये पंक्तियाँ BPHS अध्याय 23 (व्यय-भाव फल) की परंपरा-वर्णित शर्त-फल सूची हैं — शर्त बने तो परंपरा-कथन दिखता है, न बने तो पंक्ति पारदर्शिता के लिए बिना फल-पाठ के रहती है। ये भविष्यकथन या निश्चय नहीं; अनुकूल और प्रतिकूल पंक्तियाँ साथ दी गई हैं, कोई निर्णय/स्कोर नहीं।';
const NODES_NOTE='राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल (परंपरा-भेद); शर्तों में केवल सात ग्रह। राहु/केतु की भाव-स्थिति केवल तथ्य के रूप में दिखती है।';
const CONDUCT_NOTE='आचरण-विषयक पंक्तियाँ ऐतिहासिक/परंपरा आचरण-चर्चा हैं — किसी वर्तमान व्यक्ति पर नैतिक या चरित्र-निर्णय या शिक्षा नहीं।';
const NOTE_23_2='23.2b-4 में OR-संरचना अपनाई गई है (Santhanam): चन्द्र-व्ययेश के साथ भाव 9/11/5, उच्च, स्व-राशि में कोई एक। vedicpupil-अंग्रेजी की AND-शृंखला इस लग्न-गणित में कभी बन ही नहीं सकती (चन्द्र केवल सिंह लग्न का व्ययेश है; तब 9/11/5 भाव मेष/मिथुन/धनु होते हैं — कभी कर्क/वृषभ नहीं) — विमत के रूप में दर्ज। निजांश/लाभ-धर्म-पुत्रांश के नवांश-विकल्प अमॉडल हैं (vp केवल-नवांश, Santhanam राशि/नवांश — दोनों पठन दर्ज); पंक्ति केवल राशि-आधारित खंडों से बनती है। इस श्लोक-समूह का संबंध-सुख खंड सीमा-नीति से हटा है (केवल गिनती)।';
const NOTE_23_5='23.5 के शत्रु/नीच/अष्टम-अंश विकल्प अमॉडल हैं — पंक्ति केवल 6ठे/8वें स्थिति-खंड से बनती है; अंश-खंड स्वतः पूरा नहीं माना गया। इस श्लोक-समूह का संबंध-सुख खंड सीमा-नीति से हटा है (केवल गिनती)।';
const NOTE_23_11='23.11 में Sanskrit सूची बिना वा की है और Santhanam AND पढ़ता है — तीनों अंग एक साथ आवश्यक: व्ययेश पाप-युति, 12वाँ भाव पाप-युक्त, 12वाँ भाव पाप-दृष्ट। vedicpupil-अंग्रेजी OR विमत के रूप में दर्ज है।';
const NOTE_23_12='23.12 में AND-पठन (Sanskrit + Santhanam; vedicpupil-अंग्रेजी OR विमत दर्ज)। फल-दिशा Sanskrit-primary: स्वदेशात् = स्वदेश से बाहर; Santhanam का "in his own country" विमत के रूप में दर्ज है। शुभ-राशि = प्राकृतिक-शुभ (बुध/गुरु/शुक्र/चन्द्र)-स्वामी राशियों की स्थिर सूची — नामित परिपाटी, स्रोत-कथन नहीं; चन्द्र की शुभता पक्ष-सापेक्ष मानी जाती है, फिर भी कर्क इस सूची में स्थिर है।';
const NOTE_23_13='23.13 में Sanskrit मन्दादिसंयुक्ते भूमिजेन समन्विते — शनि और मंगल दोनों 12वें में; Santhanam का "Saturn or Mars" विमत के रूप में दर्ज है। "मन्दादि" का आदि-विस्तार अमॉडल — केवल शनि गिना गया (conservative, अधिक संकरा); यह संकीर्णता यहीं प्रकट है। शुभ-दृष्टि-रहित = 12वें भाव पर शुभ-दृष्टियों की संख्या शून्य (negative-check)।';
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
 const vyayesh=SIGN_LORD[bhavaSign(12)],lagnesh=SIGN_LORD[asc];
 const bhOf=g=>houseOf(p[g].rashi,asc);
 const yutiWith=g=>SEVEN.filter(o=>o!==g&&p[o].rashi===p[g].rashi);
 const benYuti=g=>yutiWith(g).filter(o=>cls[o].cls==='शुभ');
 const malYuti=g=>yutiWith(g).filter(o=>cls[o].cls==='पाप');
 const benIn=h=>SEVEN.filter(g=>bhOf(g)===h&&cls[g].cls==='शुभ');
 const malIn=h=>SEVEN.filter(g=>bhOf(g)===h&&cls[g].cls==='पाप');
 const malDrishtiOn=sign=>SEVEN.filter(m=>cls[m].cls==='पाप'&&p[m].rashi!==sign&&BP.drishti(p[m].rashi,sign,m));
 const benDrishtiOn=sign=>SEVEN.filter(b=>cls[b].cls==='शुभ'&&p[b].rashi!==sign&&BP.drishti(p[b].rashi,sign,b));
 const rows=[];
 // c23-1 (neutral-descriptive; 12th lord benefic-joined/own/exalted, or benefic in the 12th -> expense on good works)
 {const a1=benYuti(vyayesh),own=SIGN_LORD[p[vyayesh].rashi]===vyayesh,ex=p[vyayesh].rashi===EXALT[vyayesh],a4=benIn(12);
 rows.push({id:'c23-1',ref:'BPHS 23.1-2a',polarity:'तटस्थ-वर्णन',topic:'शुभ-कार्य व्यय',
  served:a1.length>0||own||ex||a4.length>0,
  condition:`चार स्वतंत्र विकल्पों में कोई एक: व्ययेश (${G[vyayesh]}) शुभ-युति; या स्व-राशि में; या उच्च-राशि में; या 12वें भाव में शुभ-ग्रह`,
  detail:`विकल्प1 (व्ययेश शुभ-युति): ${a1.length?a1.map(g=>G[g]).join(', '):'नहीं'}; विकल्प2 (स्व-राशि): ${own?'हाँ':'नहीं'}; विकल्प3 (उच्च-राशि): ${ex?'हाँ':'नहीं'}; विकल्प4 (12वें में शुभ): ${a4.length?a4.map(g=>G[g]).join(', '):'नहीं'} — व्ययेश ${G[vyayesh]} ${RASHI[p[vyayesh].rashi]} में (भाव ${bhOf(vyayesh)})`,
  text:'परंपरा-कथन: शुभ-कार्यों में व्यय की चर्चा (ऐतिहासिक क्रिया-वर्णन) है।',
  note:'यह क्रिया-वर्णन है, कोई क्रिया-निर्देश नहीं।'});}
 // c23-2 (favourable; Moon as 12th lord AND any ONE rashi-based leg - OR structure)
 {const isMoon=vyayesh==='Moon';
  const legB=[9,11,5].includes(bhOf('Moon')),legEx=p.Moon.rashi===EXALT.Moon,legOwn=SIGN_LORD[p.Moon.rashi]==='Moon';
 rows.push({id:'c23-2',ref:'BPHS 23.2b-4',polarity:'अनुकूल',topic:'आवास-सुख व धन',
  served:isMoon&&(legB||legEx||legOwn),
  condition:'व्ययेश चन्द्र होकर 9वें/11वें/5वें भाव में, या उच्च (वृषभ) में, या स्व-राशि (कर्क) में — कोई एक खंड',
  detail:isMoon?`चन्द्र ${RASHI[p.Moon.rashi]} में (भाव ${bhOf('Moon')}) — भाव 9/11/5: ${legB?'हाँ':'नहीं'}; उच्च: ${legEx?'हाँ':'नहीं'}; स्व-राशि: ${legOwn?'हाँ':'नहीं'}`:`व्ययेश ${G[vyayesh]} है — यह शर्त इस लग्न पर लागू नहीं (व्ययेश चन्द्र नहीं)`,
  text:'परंपरा-कथन: उत्तम आवास-शय्या, सुगंध, वस्त्र-भूषण, बहुमूल्य धन और विज्ञ/प्रभु-सदृश जीवन की चर्चा (ऐतिहासिक सुख-वर्णन) है।',
  note:NOTE_23_2});}
 // c23-3 (adverse; 12th lord in the 6th/8th -> worn by excess expense, denied fine enjoyments)
 rows.push({id:'c23-3',ref:'BPHS 23.5-6a',polarity:'प्रतिकूल',topic:'व्यय-क्लांति',
  served:bhOf(vyayesh)===6||bhOf(vyayesh)===8,
  condition:`व्ययेश (${G[vyayesh]}) 6ठे/8वें भाव में`,
  detail:`व्ययेश ${G[vyayesh]} ${RASHI[p[vyayesh].rashi]} में (भाव ${bhOf(vyayesh)})`,
  text:'परंपरा-कथन: अधिक व्यय से क्लांति और उत्तम भोगों से वंचना की चर्चा है।',
  note:NOTE_23_5});
 // c23-9 (neutral-travel; ALL THREE malefic legs AND -> wandering from country to country)
 {const leg1=malYuti(vyayesh),leg2=malIn(12),leg3=malDrishtiOn(bhavaSign(12));
 rows.push({id:'c23-9',ref:'BPHS 23.11',polarity:'तटस्थ-वर्णन',topic:'देशांतर-भ्रमण',
  served:leg1.length>0&&leg2.length>0&&leg3.length>0,
  condition:`तीनों अंग आवश्यक: व्ययेश (${G[vyayesh]}) पाप-युति; 12वाँ भाव पाप-युक्त; 12वाँ भाव पाप-दृष्ट`,
  detail:`अंग1 (व्ययेश पाप-युति): ${leg1.length?leg1.map(g=>G[g]).join(', '):'नहीं'}; अंग2 (12वें भाव में पाप): ${leg2.length?leg2.map(g=>G[g]).join(', '):'नहीं'}; अंग3 (12वें भाव पर पाप-दृष्टि): ${leg3.length?leg3.map(g=>G[g]).join(', '):'नहीं'}`,
  text:'परंपरा-कथन: देश-देशांतर भ्रमण की चर्चा है।',
  note:NOTE_23_11});}
 // c23-10 (neutral-travel; ALL THREE benefic legs AND -> movement away from the homeland)
 {const leg1=SHUBHA_RASHI.includes(p[vyayesh].rashi),leg2=benIn(12),leg3=benDrishtiOn(bhavaSign(12));
 rows.push({id:'c23-10',ref:'BPHS 23.12',polarity:'तटस्थ-वर्णन',topic:'स्वदेश से बाहर संचार',
  served:leg1&&leg2.length>0&&leg3.length>0,
  condition:`तीनों अंग आवश्यक: व्ययेश (${G[vyayesh]}) शुभ-राशि में; 12वाँ भाव शुभ-युक्त; 12वाँ भाव शुभ-दृष्ट`,
  detail:`अंग1 (व्ययेश शुभ-राशि में): ${leg1?'हाँ':'नहीं'} — व्ययेश ${G[vyayesh]} ${RASHI[p[vyayesh].rashi]} में; अंग2 (12वें भाव में शुभ): ${leg2.length?leg2.map(g=>G[g]).join(', '):'नहीं'}; अंग3 (12वें भाव पर शुभ-दृष्टि): ${leg3.length?leg3.map(g=>G[g]).join(', '):'नहीं'}`,
  text:'परंपरा-कथन: स्वदेश से बाहर संचार की चर्चा है।',
  note:NOTE_23_12});}
 // c23-11 (adverse conduct; Saturn AND Mars in the 12th with ZERO benefic aspect)
 {const sa=bhOf('Saturn')===12,ma=bhOf('Mars')===12,bd=benDrishtiOn(bhavaSign(12));
 rows.push({id:'c23-11',ref:'BPHS 23.13',polarity:'प्रतिकूल',topic:'आचरण',
  served:sa&&ma&&bd.length===0,
  condition:'12वें भाव में शनि और मंगल दोनों; 12वें भाव पर कोई शुभ-दृष्टि नहीं',
  detail:`शनि भाव ${bhOf('Saturn')} (${sa?'12वाँ':'12वाँ नहीं'}); मंगल भाव ${bhOf('Mars')} (${ma?'12वाँ':'12वाँ नहीं'}); 12वें भाव पर शुभ-दृष्टि: ${bd.length?bd.map(g=>G[g]).join(', '):'कोई नहीं'}`,
  text:'परंपरा-कथन: अनुचित मार्ग से धनार्जन की चर्चा (ऐतिहासिक आचरण-कथन) है।',
  note:NOTE_23_13});}
 // c23-12 (neutral-descriptive; lagnesh in the 12th AND 12th lord in the lagna AND 12th lord Venus-joined)
 {const leg1=bhOf(lagnesh)===12,leg2=bhOf(vyayesh)===1,ven=yutiWith(vyayesh).includes('Venus');
  const venText=vyayesh==='Venus'?'व्ययेश स्वयं शुक्र है — शुक्र-युति दो-ग्रह संबंध है, स्वतः नहीं मानी गई':(ven?'हाँ':'नहीं');
 rows.push({id:'c23-12',ref:'BPHS 23.14',polarity:'तटस्थ-वर्णन',topic:'धर्म-मूल व्यय',
  served:leg1&&leg2&&ven,
  condition:`लग्नेश (${G[lagnesh]}) 12वें भाव में; व्ययेश (${G[vyayesh]}) लग्न में; व्ययेश शुक्र-युति`,
  detail:`अंग1 (लग्नेश 12वें में): ${leg1?'हाँ':'नहीं'} — लग्नेश ${G[lagnesh]} भाव ${bhOf(lagnesh)}; अंग2 (व्ययेश लग्न में): ${leg2?'हाँ':'नहीं'} — व्ययेश ${G[vyayesh]} भाव ${bhOf(vyayesh)}; अंग3 (व्ययेश शुक्र-युति): ${venText}`,
  text:'परंपरा-कथन: धर्म-कार्य में धन-व्यय की चर्चा (ऐतिहासिक क्रिया-वर्णन) है।',
  note:'यह क्रिया-वर्णन है, कोई क्रिया-निर्देश नहीं।'});}
 return {source:'BPHS ch23 (vedicpupil Sanskrit + jyotishvidya/Santhanam)',
  header:HEADER,omitN:OMIT_N,omitNotice:OMIT_NOTICE,breadthNotice:BREADTH_NOTICE,
  unmodeledNotice:UNMODELED_NOTICE,nodesNote:NODES_NOTE,conductNote:CONDUCT_NOTE,
  rows,
  scope:'परंपरा-वर्णित शर्त-फल पंक्तियाँ; भविष्यकथन/निश्चय नहीं। राहु/केतु युति-दृष्टि अमॉडल; सीमा-लोप 5 (केवल गिनती); 3 खंड विस्तार-निर्णय से नहीं दिखाए गए; 2 नवांश-खंड अमॉडल (पंक्तियाँ राशि-खंडों से जाँची जाती हैं)।'};}
const api={report,OMIT_N,OMIT_NOTICE,BREADTH_NOTICE,UNMODELED_NOTICE,HEADER,NODES_NOTE,CONDUCT_NOTE};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmVyayaPhal=api;
})(typeof window!=='undefined'?window:globalThis);
