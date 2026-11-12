/* Bhavaphal ch14 (BPHS सहज/विक्रम-भाव फल, 3rd house) - condition-matched
tradition rows. Curation: docs/bhavaphal-ch14-ledger-draft.md (15 verses ->
1 row object; limited chapter scope, not complete-chapter phaladesh).
MODELED 1 row: c14-1 (14.1) - VALOR segment only (3rd house benefic-joined
OR benefic-aspected -> पराक्रम).
SCOPE-OMIT (count-only, 11): five life-loss/longevity units (14.2+14.3 one
joint condition unit, 14.5-latter, 14.8, 14.9-11, 14.14); five
family-structure units (14.1's sibling-existence segment, 14.4, 14.7,
14.12, 14.13); one family-happiness unit (14.6). Both valences treated
alike; this is the chapter's limited-scope convention, not an enduring
prohibition, and the source text's meaning is not altered.
BREADTH-OMIT (not safety, 2): 14.5-first and 14.15 (method verses -
weighing strength/weakness of the yogas; graha strength unmodeled).
UNMODELED (documented, never silently satisfied): 14.8's Rahu-yuti leg
(node yuti/drishti unmodeled), 14.6's own/friendly VARGA leg
(amsha-based), graha strength in 14.5-first/14.15.
Reading decisions (recorded mat-bhed, disclosed):
 14.2+14.3 ONE condition unit: Sanskrit 14.2 carries no standalone
 favourable fruit (it is the condition preamble, naming only the topic
 house)
 and 14.3's "तौ" is the 3rd-lord+Mars pair; Santhanam's standalone
 favourable reading of 14.2 is a documented divergence.
 14.12 Sanskrit Mars joined with the 12th lord OR with Jupiter (अपि वा);
 Santhanam's AND-reading and his own "some texts read as the 11th lord"
 variant are documented divergences.
 14.4 female legs OR, male leg = male planet AND male sign; no Sanskrit
 birth-order (Santhanam's "born after him" is a documented addition).
 14.7 Sanskrit: one elder sister only; younger brothers are a Santhanam
 addition (documented). 14.9-11: vedicpupil's separate elder-three/
 absence reading vs Santhanam's merged twelve-group (documented).
 vp verses 1-15 canonical; Santhanam's verse grouping disclosed.
Sources: vedicpupil chapter-14 (Sanskrit per verse), jyotishvidya.com/
ch14.htm (Santhanam).
Machinery (kundli-bhavaphal.js): BPHS 3.11 benefic/malefic classes
(dynamic Moon/Mercury), whole-sign graha-drishti incl. special aspects
(binary presence only - a deliberate simplification of the graduated
source method, disclosed; no exact-parity claim).
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
const G=BP.G,RASHI=BP.RASHI;
const mod=(x,n)=>((x%n)+n)%n,houseOf=(sign,asc)=>mod(sign-asc,12)+1;
const OMIT_N=11;
const OMIT_NOTICE='BPHS अध्याय 14 की इस परंपरा-सूची के '+OMIT_N+' खंड सीमा-नीति से हटाए गए हैं (5 जीवन-क्षय वर्ग — 14.2+14.3, 14.5उत्तर, 14.8, 14.9-11, 14.14; 5 पारिवारिक संख्या/लिंग/जन्म-क्रम वर्ग — 14.1 का एक खंड, 14.4, 14.7, 14.12, 14.13; 1 पारिवारिक सुख-कथन — 14.6; दोनों दिशाएँ समान, केवल गिनती दी गई है)। यह इस अध्याय का परिमित दायरा है, स्थायी निषेध नहीं।';
const BREADTH_NOTICE='इस दृश्य में BPHS अध्याय 14 के दो खंड शामिल नहीं हैं: 14.5पूर्व और 14.15 (योगों के बलाबल-विचार के पद्धति-सूत्र) — इनमें इस दृश्य की स्वतंत्र शर्त-फल पंक्ति नहीं है; ग्रह-बल अमॉडल है। यह सीमा-लोप नहीं है।';
const UNMODELED_NOTICE='BPHS ch14 के 3 शर्त-तत्व अमॉडल हैं: 14.8 का राहु-युति खंड (नोड युति/दृष्टि अमॉडल), 14.6 का स्ववर्ग/मित्रवर्ग अंश-खंड, और 14.5पूर्व/14.15 का ग्रह-बल। कोई अमॉडल खंड कभी स्वतः पूरा नहीं माना जाता।';
const HEADER='ये पंक्तियाँ BPHS अध्याय 14 (सहज/विक्रम-भाव फल) की परंपरा-वर्णित शर्त-फल सूची हैं — शर्त बने तो परंपरा-कथन दिखता है, न बने तो पंक्ति पारदर्शिता के लिए बिना फल-पाठ के रहती है। ये भविष्यकथन या निश्चय नहीं; कोई निर्णय/स्कोर नहीं। इस अध्याय का दायरा परिमित है — केवल विक्रम-खंड की एक पंक्ति; अध्याय-पूर्णता का दावा नहीं।';
const NODES_NOTE='राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल (परंपरा-भेद); शर्तों में केवल सात ग्रह। राहु/केतु की भाव-स्थिति केवल तथ्य के रूप में दिखती है।';
const NOTE_14_1='14.1 में सौम्ययुग्दृष्टे = 3रा भाव शुभ-युक्त या शुभ-दृष्ट (कोई एक)। इस श्लोक का दूसरा खंड (पारिवारिक अस्तित्व-कथन) इस module के परिमित दायरे से बाहर है — केवल गिनती; यह पंक्ति केवल विक्रम-खंड दिखाती है।';
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
 const benIn=h=>SEVEN.filter(g=>bhOf(g)===h&&cls[g].cls==='शुभ');
 const benDrishtiOn=sign=>SEVEN.filter(b=>cls[b].cls==='शुभ'&&p[b].rashi!==sign&&BP.drishti(p[b].rashi,sign,b));
 const rows=[];
 // c14-1 (favourable; 3rd house benefic-joined OR benefic-aspected -> valor only)
 {const a1=benIn(3),a2=benDrishtiOn(bhavaSign(3));
 rows.push({id:'c14-1',ref:'BPHS 14.1',polarity:'अनुकूल',topic:'पराक्रम',
  served:a1.length>0||a2.length>0,
  condition:'3रा भाव शुभ-युक्त (शुभ-ग्रह स्थित) या शुभ-दृष्ट — कोई एक',
  detail:`खंड1 (3रे भाव में शुभ): ${a1.length?a1.map(g=>G[g]).join(', '):'कोई नहीं'}; खंड2 (3रे भाव पर शुभ-दृष्टि): ${a2.length?a2.map(g=>G[g]).join(', '):'कोई नहीं'}`,
  text:'परंपरा-कथन: पराक्रम की चर्चा है।',
  note:NOTE_14_1});}
 return {source:'BPHS ch14 (vedicpupil Sanskrit + jyotishvidya/Santhanam)',
  header:HEADER,omitN:OMIT_N,omitNotice:OMIT_NOTICE,breadthNotice:BREADTH_NOTICE,
  unmodeledNotice:UNMODELED_NOTICE,nodesNote:NODES_NOTE,
  rows,
  scope:'परंपरा-वर्णित शर्त-फल पंक्ति; भविष्यकथन/निश्चय नहीं। परिमित अध्याय-दायरा: केवल विक्रम-खंड — अध्याय-पूर्णता का दावा नहीं। राहु/केतु युति-दृष्टि अमॉडल; सीमा-लोप 11 (केवल गिनती); 2 पद्धति-सूत्र विस्तार से नहीं दिखाए गए; 3 तत्व अमॉडल।'};}
const api={report,OMIT_N,OMIT_NOTICE,BREADTH_NOTICE,UNMODELED_NOTICE,HEADER,NODES_NOTE};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmSahajaPhal=api;
})(typeof window!=='undefined'?window:globalThis);
