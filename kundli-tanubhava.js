/* Bhavaphal ch12 pilot (BPHS तनुभावफल, 1st house) - condition-matched tradition
rows. Curation frozen by reviewer rulings 2026-11-11 17:15/17:17 (docs/bhavaphal-ch12-ledger-draft.md):
KEEP 12.1 x2 (JOINT condition), 12.4 x3, 12.5 minus दीर्घायुः, 12.6, 12.7, 12.11 method;
OMIT 12.2, 12.3 (breadth), 12.5 दीर्घायुः, 12.8, 12.9, 12.10, 12.11 lead-in, 12.12-14, 12.15
(omitN = 10, count-only notice, ledger itemized).
Sources (fetched 2026-11-12, caches in sources/):
 jyotishvidya.com/ch12.htm (Santhanam), vedicpupil chapter-12 (Sanskrit per verse),
 siva.sh /brihat-parashara-hora-shastra/12/1 (Sanskrit 12.1 formula-check).
Machinery (reviewed, kundli-bhavaphal.js): BPHS 3.11 benefic/malefic classes
(dynamic Moon/Mercury), 26.2-5 whole-sign graha-drishti incl. special aspects.
Conventions (labeled, reviewer rulings):
 - 12.1 JOINT reading: Sanskrit has both adjectives on the same subject (देहपः),
   no वा/अथ; Santhanam/siva.sh English "or" split = recorded mat-bhed.
 - Drishti conditions BINARY participation only; no strength language
   (quantitative Drik-bala 26.12/27.19 is a separate unreviewed layer).
 - At-least-one-benefic convention (12.4/12.6 name no exclusivity); coexisting
   malefic aspects shown as factual transparency detail, never a blocker/verdict.
 - Nodes excluded from yuti/drishti participation (unmodeled, labeled).
 - Favourable and adverse rows both always listed (served or unserved);
   no verdicts, no scores; rows are tradition-labeled statements, not predictions.
 - Omission policy per omission boundary (main 2026-11-11 14:48 strong form):
   death/grief, longevity (दीर्घायुः), disease words (रोगकृत्/सर्वरोगहराः authentic),
   birth-circumstance claims (नाल-वेष्टित, twins, three mothers), wound/mark/
   decanate-limb table - omitted; comfort (देह-सुख) lines incl. adverse kept. */
(function(root){'use strict';
const BP=(typeof module!=='undefined'&&module.exports)?require('./kundli-bhavaphal.js'):root.BrahmBhavaPhal;
const SEVEN=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const G=BP.G,RASHI=BP.RASHI,SIGN_LORD=BP.SIGN_LORD;
const mod=(x,n)=>((x%n)+n)%n,houseOf=(sign,asc)=>mod(sign-asc,12)+1;
const KENDRA=[1,4,7,10],TRIKONA=[1,5,9],DUSTHANA=[6,8,12],MOVABLE=[0,3,6,9];
const KT=new Set(KENDRA.concat(TRIKONA));
const OMIT_N=10;
const OMIT_NOTICE='BPHS अध्याय 12 की इस परंपरा-सूची के '+OMIT_N+' खंड सुरक्षा-नीति से हटाए गए हैं।';
const HEADER='ये पंक्तियाँ BPHS अध्याय 12 (तनुभावफल) की परंपरा-वर्णित शर्त-फल सूची हैं — शर्त बने तो परंपरा-कथन दिखता है, न बने तो पंक्ति पारदर्शिता के लिए बिना फल-पाठ के रहती है। ये भविष्यकथन या निश्चय नहीं; अनुकूल और प्रतिकूल पंक्तियाँ साथ दी गई हैं, कोई निर्णय/स्कोर नहीं।';
const MATBHED_121='12.1 पठन-भेद दर्ज: संस्कृत में दोनों विशेषण एक ही कर्ता (देहपः) के हैं, कोई वा/अथ नहीं — अतः संयुक्त (JOINT) शर्त अपनाई; Santhanam/siva.sh अंग्रेजी "or" पठन भिन्न है। OR पठन में पाप-युक्त केन्द्रस्थ लग्नेश पर दोनों अर्धांश साथ लागू हो परस्पर विरोध करते।';
const NODES_NOTE='राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल (परंपरा-भेद); शर्तों में केवल सात ग्रह।';
const DRISHTI_NOTE='दृष्टि-शर्तें केवल उपस्थिति (binary) देखती हैं — बल/तीव्रता की भाषा नहीं; मात्रात्मक दृक्-बल अलग असमीक्षित परत है। शुभ-दृष्टि के साथ पाप-दृष्टि भी हो तो वह तथ्य पारदर्शिता में दिखता है, रोक या निर्णय नहीं।';
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
 const lagnesh=SIGN_LORD[asc],ls=p[lagnesh].rashi,lordBhava=houseOf(ls,asc);
 const sameSign=g=>p[g].rashi===ls&&g!==lagnesh;
 const maleficWith=SEVEN.filter(g=>sameSign(g)&&cls[g].cls==='पाप');
 const aspectsOn=sign=>SEVEN.filter(g=>p[g].rashi!==sign&&BP.drishti(p[g].rashi,sign,g))
  .map(g=>({graha:g,cls:cls[g].cls,type:BP.drishti(p[g].rashi,sign,g)}));
 const benOn=sign=>aspectsOn(sign).filter(a=>a.cls==='शुभ');
 const malOn=sign=>aspectsOn(sign).filter(a=>a.cls==='पाप');
 const lagnaOcc=SEVEN.filter(g=>p[g].rashi===asc);
 const benInLagna=lagnaOcc.filter(g=>cls[g].cls==='शुभ'),malInLagna=lagnaOcc.filter(g=>cls[g].cls==='पाप');
 const aspLagna=aspectsOn(asc),benAspLagna=aspLagna.filter(a=>a.cls==='शुभ'),malAspLagna=aspLagna.filter(a=>a.cls==='पाप');
 const lsAsp=aspectsOn(ls),benAspLs=lsAsp.filter(a=>a.cls==='शुभ'),malAspLs=lsAsp.filter(a=>a.cls==='पाप');
 const kt55=[lagnesh,'Mercury','Jupiter','Venus'].filter(g=>KT.has(houseOf(p[g].rashi,asc)));
 const k7=['Mercury','Jupiter','Venus'].filter(g=>(p[g].rashi===asc&&p.Moon.rashi===asc)||KENDRA.includes(houseOf(p[g].rashi,asc)));
 const rows=[];
 // c12-1a (JOINT, reviewer ruling 17:17)
 rows.push({id:'c12-1a',ref:'BPHS 12.1',polarity:'प्रतिकूल',topic:'देह-सुख',
  served:maleficWith.length>0&&DUSTHANA.includes(lordBhava),
  condition:`लग्नेश (${G[lagnesh]}) पाप-युति + 6/8/12 भाव (संयुक्त शर्त)`,
  detail:`लग्नेश ${G[lagnesh]} ${RASHI[ls]} में (भाव ${lordBhava})${maleficWith.length?'; युति: '+maleficWith.map(g=>G[g]).join(', '):'; पाप-युति नहीं'}`,
  text:'परंपरा-कथन: ऐसी संयुक्त स्थिति में देह-सुख में कमी बताई है।',
  matbhed:MATBHED_121});
 // c12-1b
 rows.push({id:'c12-1b',ref:'BPHS 12.1',polarity:'अनुकूल',topic:'देह-सुख',
  served:KT.has(lordBhava),
  condition:`लग्नेश (${G[lagnesh]}) केन्द्र/त्रिकोण में`,
  detail:`लग्नेश ${G[lagnesh]} ${RASHI[ls]} में (भाव ${lordBhava})`,
  text:'परंपरा-कथन: सदा देह-सुख बताया है।',
  matbhed:MATBHED_121});
 // c12-4a
 rows.push({id:'c12-4a',ref:'BPHS 12.4',polarity:'अनुकूल',topic:'रूप',
  served:benInLagna.length>0,
  condition:'लग्न में शुभ ग्रह',
  detail:benInLagna.length?`लग्न में: ${benInLagna.map(g=>G[g]).join(', ')}`:'लग्न में शुभ ग्रह नहीं',
  text:'परंपरा-कथन: मनोहर रूप बताया है।'});
 // c12-4b
 rows.push({id:'c12-4b',ref:'BPHS 12.4',polarity:'प्रतिकूल',topic:'रूप',
  served:malInLagna.length>0,
  condition:'लग्न में पाप ग्रह',
  detail:malInLagna.length?`लग्न में: ${malInLagna.map(g=>G[g]).join(', ')}`:'लग्न में पाप ग्रह नहीं',
  text:'परंपरा-कथन: सुंदर रूप से वंचित बताया है।'});
 // c12-4c (at-least-one-benefic; coexisting malefic = transparency)
 rows.push({id:'c12-4c',ref:'BPHS 12.4',polarity:'अनुकूल',topic:'देह-सुख',
  served:benInLagna.length>0||benAspLagna.length>0,
  condition:'लग्न शुभ-युति या शुभ-दृष्ट',
  detail:[benInLagna.length?`शुभ-युति: ${benInLagna.map(g=>G[g]).join(', ')}`:null,
   benAspLagna.length?`शुभ-दृष्टि: ${benAspLagna.map(a=>G[a.graha]+' ('+a.type+')').join(', ')}`:null]
   .filter(Boolean).join('; ')||'लग्न पर शुभ-युति/दृष्टि नहीं',
  transparency:malAspLagna.length||malInLagna.length?('साथ में पाप '+(malInLagna.length?`युति: ${malInLagna.map(g=>G[g]).join(', ')} `:'')+(malAspLagna.length?`दृष्टि: ${malAspLagna.map(a=>G[a.graha]).join(', ')}`:'')+' — तथ्य मात्र, रोक नहीं'):null,
  text:'परंपरा-कथन: देह-सुख बताया है।'});
 // c12-5 (दीर्घायुः खंड omitted - omitN में गिना)
 rows.push({id:'c12-5',ref:'BPHS 12.5',polarity:'अनुकूल',topic:'धन/बुद्धि/राज-प्रसाद',
  served:kt55.length>0,
  condition:'लग्नेश/बुध/गुरु/शुक्र केन्द्र या त्रिकोण में',
  detail:kt55.length?kt55.map(g=>`${G[g]} भाव ${houseOf(p[g].rashi,asc)}`).join('; '):'कोई केन्द्र/त्रिकोण में नहीं',
  text:'परंपरा-कथन: धनवान, बुद्धिमान और राज-प्रिय (ऐतिहासिक अभिप्राय) बताया है।'});
 // c12-6 (binary benefic aspect on the lagnesh sign)
 rows.push({id:'c12-6',ref:'BPHS 12.6',polarity:'अनुकूल',topic:'यश/धन/सुख',
  served:MOVABLE.includes(ls)&&benAspLs.length>0,
  condition:'लग्नेश चर राशि में + शुभ-दृष्ट',
  detail:`लग्नेश ${RASHI[ls]} (${MOVABLE.includes(ls)?'चर':'चर नहीं'})${benAspLs.length?'; शुभ-दृष्टि: '+benAspLs.map(a=>G[a.graha]+' ('+a.type+')').join(', '):'; शुभ-दृष्टि नहीं'}`,
  transparency:malAspLs.length?('साथ में पाप-दृष्टि: '+malAspLs.map(a=>G[a.graha]).join(', ')+' — तथ्य मात्र, रोक नहीं'):null,
  text:'परंपरा-कथन: यश, धन और सुख बताए हैं।'});
 // c12-7
 rows.push({id:'c12-7',ref:'BPHS 12.7',polarity:'अनुकूल',topic:'राज-लक्षण',
  served:k7.length>0,
  condition:'बुध/गुरु/शुक्र चन्द्र-सहित लग्न में, या लग्न से केन्द्र में',
  detail:k7.length?k7.map(g=>`${G[g]} भाव ${houseOf(p[g].rashi,asc)}${p[g].rashi===asc&&p.Moon.rashi===asc?' (चन्द्र-सहित लग्न)':''}`).join('; '):'शर्त पूरी नहीं',
  text:'परंपरा-कथन: राज-लक्षण (ऐतिहासिक अभिप्राय) बताए हैं।'});
 // c12-11 (method note, no condition)
 rows.push({id:'c12-11',ref:'BPHS 12.11',polarity:'तटस्थ',topic:'विधि',
  served:true,condition:'कोई शर्त नहीं — विधि-टिप्पणी',
  detail:'',
  text:'विधि-टिप्पणी: जो फल लग्न से कहे हैं, वे चन्द्र से भी विचारने कहे हैं।'});
 return {source:'BPHS ch12 (jyotishvidya/Santhanam + vedicpupil Sanskrit; 12.1 siva.sh formula-check)',
  header:HEADER,omitN:OMIT_N,omitNotice:OMIT_NOTICE,nodesNote:NODES_NOTE,drishtiNote:DRISHTI_NOTE,
  rows,
  scope:'परंपरा-वर्णित शर्त-फल पंक्तियाँ; भविष्यकथन/निश्चय नहीं। दृष्टि binary; राहु/केतु अमॉडल; 10 खंड नीति से हटे (ledger देखें)।'};}
const api={report,OMIT_N,OMIT_NOTICE,HEADER,MATBHED_121,NODES_NOTE,DRISHTI_NOTE};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmTanuPhal=api;
})(typeof window!=='undefined'?window:globalThis);
