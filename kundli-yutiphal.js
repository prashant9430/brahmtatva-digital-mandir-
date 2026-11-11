/* E2 द्वि-ग्रह युति-फल: Saravali ch15 के 21 द्वि-ग्रह युग्मों की परंपरा-लेबल
पंक्तियाँ। Sources (दो digitization-paths, एक ही अंग्रेजी अनुवाद-परंपरा —
स्वतंत्र अनुवाद नहीं):
 https://www.astrojyoti.com/saravalipage3-2.htm + saravalipage3-3.htm (Santhanam)
 https://archive.org/download/KalyanaVarmasSaravali_201707 (Sastri scan, pp.42-43)
Conventions:
 - Detection: सप्तग्रहों में समान whole-sign राशि = युति; राहु/केतु अमॉडल (E1 संगत)।
   21 अक्रमित युग्म; श्लोक 23 वर्ग-परिवर्तक अमॉडल; त्रि-ग्रह सहस्थिति पर
   युग्म-पंक्तियाँ अलग-अलग तथ्य + ch16-अमॉडल नोट, कोई संश्लेषण नहीं।
 - Omission policy (E1 के विस्तारित वर्ग): मृत्यु/शोक (15.7), आयु, अपंगत्व/
   इन्द्रिय-दुर्बलता (15.6), remedy, जातक के शरीर पर गंभीर क्षति-भविष्यकथन
   (15.16), नर-हत्या/यातना-प्रवृत्ति कथन (15.3) — प्रति-वाक्य ऑडिट
   docs/section-e2-rules-draft.md में। लोप पारदर्शी सूचना सहित।
 - रोग-शब्द केवल ऐतिहासिक वर्ग के रूप में (15.8) — निदान/भविष्यवाणी नहीं।
 - पति/पत्नी-निन्दा वाक्य (15.12, 15.13) main के framing-निर्देश अनुसार KEEP,
   स्पष्ट ऐतिहासिक-कलंकित-भाषा सन्दर्भ सहित — जातक के जीवनसाथी के चरित्र या
   मूल्य का दावा नहीं। प्रतिकूल-मात्र होने से लोप नहीं (15.12 "गुण-हीनता"
   सहित कोई silent drop नहीं)।
 - ये परंपरा में वर्णित वक्तव्य हैं, इस व्यक्ति के बारे में दावे नहीं;
   भविष्यकथन या निश्चय नहीं।
*/
(function(root){'use strict';
const G={Sun:'सूर्य',Moon:'चन्द्र',Mars:'मंगल',Mercury:'बुध',Jupiter:'गुरु',Venus:'शुक्र',Saturn:'शनि'};
const RASHI=['मेष','वृषभ','मिथुन','कर्क','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुंभ','मीन'];
const SRC='Saravali %S% · Santhanam/Sastri पाठ-मिलान (एक ही अनुवाद-परंपरा के दो digitization-paths; स्वतंत्र अनुवाद नहीं)';
const FRAME_SPOUSE='ऐतिहासिक कलंकित भाषा — किसी वास्तविक व्यक्ति या जीवनसाथी के चरित्र/मूल्य का दावा नहीं।';
const PAIRS=[
 {sloka:'15.2',a:'Sun',b:'Moon',text:'पत्नी/स्त्री के प्रभाव में रहना, निर्लज्जता, धातु-कार्य (या छल-कुशलता — alternate अर्थ), पर्याप्त धन, मादक-पदार्थों के विक्रय-कौशल का वर्णन।'},
 {sloka:'15.3',a:'Sun',b:'Mars',text:'तेजस्विता, पराक्रम, मंदबुद्धिता, बल, असत्यवादिता, पाप-प्रवृत्ति, उग्रता का वर्णन।',omit:'हिंसा/यातना-प्रवृत्ति-वाक्य'},
 {sloka:'15.4',a:'Sun',b:'Mercury',text:'सेवा-वृत्ति, अस्थिर धन, मधुर वाणी, यश-धन, उदारता, राजा व सज्जन-प्रियता, बल-रूप-विद्या का वर्णन।'},
 {sloka:'15.5',a:'Sun',b:'Jupiter',text:'धार्मिकता, राज-मंत्रित्व, मित्र-लाभ, सुमनस्कता, गुरु-वृत्ति का वर्णन।'},
 {sloka:'15.6',a:'Sun',b:'Venus',text:'शस्त्र-कौशल, प्रभावशीलता, जन-मनोरंजन-सामर्थ्य, स्त्रियों द्वारा अर्जित धन का वर्णन।',omit:'इन्द्रिय-दुर्बलता/वृद्धावस्था-स्वास्थ्य-वाक्य'},
 {sloka:'15.7',a:'Sun',b:'Saturn',text:'धातु-कार्य, धार्मिकता, स्व-कर्तव्य-स्मरण, कुलानुरूप गुण, शुद्धता, सीधेपन में कमी का वर्णन।',omit:'पत्नी-पुत्र की हानि का शोक-वाक्य'},
 {sloka:'15.8',a:'Moon',b:'Mars',text:'शौर्य, युद्ध-धैर्य, मुक्केबाज़ी, मिट्टी/चमड़ा/खनिज-वस्तु निर्माण, शिल्प-धातु-कार्य का वर्णन।',illness:'"रक्त-विकार/रोग" केवल ऐतिहासिक रोग-वर्ग-शब्द — कोई निदान या स्वास्थ्य-भविष्यवाणी नहीं।'},
 {sloka:'15.9',a:'Moon',b:'Mercury',text:'कविता-कथा-कौशल, धन, पत्नी-प्रेम, रूप, स्मित-मुख, विशिष्ट गुणों का वर्णन।'},
 {sloka:'15.10',a:'Moon',b:'Jupiter',text:'मित्रता में दृढ़ता, विनम्रता, बंधु-आदर, धन, धार्मिकता, देव-विद्वान-आदर का वर्णन।'},
 {sloka:'15.11',a:'Moon',b:'Venus',text:'पुष्प-धूप-वस्त्र-सम्पत्ति, क्रिया-कर्तव्य-ज्ञान, कुल-प्रियता, आलस्य, क्रय-विक्रय-कौशल का वर्णन।'},
 {sloka:'15.12',a:'Moon',b:'Saturn',text:'जन-प्रियता, गज-अश्व-पालन, गुण-हीनता, पराधीनता, धन-हीनता, पराजय का वर्णन।',frame:'पत्नी के "जीर्ण" होने का वर्णन — '+FRAME_SPOUSE},
 {sloka:'15.13',a:'Mars',b:'Mercury',text:'स्वल्प-धन, स्वर्ण-लौह-कार्य, स्थापत्य-कौशल, औषधि-निर्माण-कौशल का वर्णन।',frame:'"दुर्भाग्यपूर्ण पत्नी" और "दुष्ट विधवा के साथ रहना" — '+FRAME_SPOUSE},
 {sloka:'15.14',a:'Mars',b:'Jupiter',text:'शिल्प-कौशल, वेद-विद्या, बुद्धिमत्ता, वाक्-कौशल, प्रज्ञा, शस्त्र-रुचि का वर्णन।'},
 {sloka:'15.15',a:'Mars',b:'Venus',text:'पूजनीयता, अपनों में प्रधानता, गणित/ज्योतिष-कौशल, जुआ व असत्य में रुचि का वर्णन।'},
 {sloka:'15.16',a:'Mars',b:'Saturn',text:'धातु-कार्य, इन्द्रजाल-कौशल, छल-प्रवृत्ति, चौर्य-कुशलता, कलह-प्रियता का वर्णन।',omit:'शस्त्र/विष से क्षति का वाक्य'},
 {sloka:'15.17',a:'Mercury',b:'Jupiter',text:'नृत्य-प्रसिद्धि, विद्वत्ता, गायन-वादन, प्रज्ञा, सुख का वर्णन।'},
 {sloka:'15.18',a:'Mercury',b:'Venus',text:'अति-धन, राजनीति-कौशल, शिल्प, वेद-अध्ययन, सुवाचकता, गायन, विनोद, सुगंध-पुष्प-रुचि का वर्णन।'},
 {sloka:'15.19',a:'Mercury',b:'Saturn',text:'ऋण-ग्रस्तता, अभिमान, छल, कविता-सामर्थ्य, चंचलता, कुशलता, शुभ-वाणी का वर्णन।'},
 {sloka:'15.20',a:'Jupiter',b:'Venus',text:'शिक्षा-तर्क से जीविका, उत्तम आचार-पथ, सटीक धारणा, उत्तम पत्नी का वर्णन।'},
 {sloka:'15.21',a:'Jupiter',b:'Saturn',text:'शौर्य, बहु-धन, नगर-प्रमुखता, यश, सभा/ग्राम/संघ-नेतृत्व का वर्णन।'},
 {sloka:'15.22',a:'Venus',b:'Saturn',text:'काष्ठ-भंजन-कौशल, नाई/चित्रकार/शिल्पी-वृत्ति, मुक्केबाज़ी, संचरण-रुचि, चतुष्पद-स्वामित्व का वर्णन।'}
];
const CH16_NOTE='त्रि-ग्रह सहस्थिति: Saravali ch16 का समग्र फल इस चरण में अमॉडल — ऊपर की युग्म-पंक्तियाँ अलग-अलग तथ्य हैं, इनका संश्लेषण नहीं।';
const VARGA_NOTE='Saravali 15.23 (शुभ/अशुभ वर्गों से फल-वृद्धि/ह्रास) अमॉडल।';
const SEVEN=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
function signCheck(n,label){if(!Number.isInteger(n)||n<0||n>11)throw new Error(label+' must be an integer sign 0..11');}
function checkPlanets(planets){if(!Array.isArray(planets))throw new Error('planets must be an array');const seen=new Set();
 for(const p of planets){if(!p||typeof p.graha!=='string')continue;
  if(SEVEN.includes(p.graha)){if(seen.has(p.graha))throw new Error('Duplicate planet '+p.graha);seen.add(p.graha);signCheck(p.rashi,p.graha);}
  else signCheck(p.rashi,p.graha); // nodes/अन्य: sign validate, counting में कभी नहीं (E1-delta पद्धति)
 }
 for(const g of SEVEN)if(!seen.has(g))throw new Error('Missing planet '+g);}
function report(planets,lagnaSign){
 signCheck(lagnaSign,'Lagna');checkPlanets(planets);
 const bySign={};
 for(const p of planets){if(G[p.graha]){(bySign[p.rashi]=bySign[p.rashi]||[]).push(p.graha);}}
 const rows=[];
 for(const q of PAIRS){
  for(const s in bySign){const list=bySign[s];
   if(list.includes(q.a)&&list.includes(q.b)){
    const sign=+s,house=(sign-lagnaSign+12)%12+1;
    rows.push({sloka:q.sloka,a:q.a,b:q.b,pairName:G[q.a]+'-'+G[q.b],sign,signName:RASHI[sign],house,
     text:q.text,omit:q.omit||null,frame:q.frame||null,illness:q.illness||null,
     source:SRC.replace('%S%',q.sloka)});
    break;}}}
 const triSigns=Object.keys(bySign).filter(s=>bySign[s].length>=3).map(s=>RASHI[+s]);
 return {geometry:'same whole-sign sign (E1 संगत; राहु/केतु अमॉडल)',
  source:'Saravali ch15: Santhanam (astrojyoti) + Sastri (archive.org scan) — एक ही अनुवाद-परंपरा के दो digitization-paths, स्वतंत्र अनुवाद नहीं',
  rows,triSigns,ch16Note:triSigns.length?CH16_NOTE:null,vargaNote:VARGA_NOTE,
  scope:'परंपरा में वर्णित वक्तव्य; इस व्यक्ति के बारे में दावे, भविष्यकथन या निश्चय नहीं।'};}
const api={report,PAIRS,G,RASHI,CH16_NOTE,VARGA_NOTE,FRAME_SPOUSE};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmYutiPhal=api;
})(typeof window!=='undefined'?window:globalThis);
