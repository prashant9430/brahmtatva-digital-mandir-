/* E1 bhava-phal layer: karakatva topics (BPHS ch11.2-13), bhava karaka (BPHS
32.34), whole-sign this-chart fact rows and BPHS ch11.14-16 discussion.
Sources:
 https://jyotishvidya.com/ch11.htm (second text vedicpupil ch11, matching)
 https://vedicpupil.in/library/books/brihat-parashara-hora-shastra/chapter-32 (32.34)
 https://jyotishvidya.com/ch26.htm (26.2-5 ordinary whole-sign graha drishti)
 https://jyotishvidya.com/ch3.htm (3.11 benefic/malefic classification)
Conventions:
 - Whole-sign bhavas counted from Lagna; Sripati-madhya geometry lives in
   kundli-bhava.js and is NOT used here. Graha-drishti only; rashi-drishti
   (chara/sthira method) is not applied. Drishti-value math (26.6-12) unmodeled.
 - Omission policy: death/grief wordings about the native or relatives,
   longevity wordings, disability wordings and remedies are omitted, with a
   per-bhava note; "wealth of the dead" kept as a traditional topic label
   (inheritance context); illness words only as historical category labels.
   Per-word scan recorded in docs/section-e1-rules-draft.md.
 - No synthesized prosperity/annihilation verdict ever: Prabuddha/Supta
   (jagrit/supta state-qualifiers, outside all four ch45 avastha groups) and
   graha-yuddha are unmodeled, so full 11.14-16 evaluation is impossible;
   only individual countable fact rows are shown.
 - BPHS 3.11 dynamics: waning Moon is malefic, waxing benefic (paksha from
   Sun-Moon elongation; exact 0/180 within 1e-11 deg snap = sandhi, class
   unresolved, labeled interpretation-decision). Mercury is malefic if it
   shares a sign with any planet whose resolved class is malefic.
 - Rahu/Ketu: listed malefic by 3.11, but node yuti/drishti participation is
   tradition-dependent and NOT modeled in this stage.
 - Fact rows are tradition-labeled statements, not predictions or certainty.
*/
(function(root){'use strict';
const SEVEN=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const G={Sun:'सूर्य',Moon:'चन्द्र',Mars:'मंगल',Mercury:'बुध',Jupiter:'गुरु',Venus:'शुक्र',Saturn:'शनि'};
const RASHI=['मेष','वृषभ','मिथुन','कर्क','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुंभ','मीन'];
const SIGN_LORD=['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
const KARAKA=['Sun','Jupiter','Mars','Moon','Jupiter','Mars','Venus','Saturn','Jupiter','Mercury','Jupiter','Saturn']; // BPHS 32.34
const KARAKATVA=[
 {sloka:'11.2',items:['देह-आकृति','रूप','बुद्धि','देह-वर्ण','सामर्थ्य','दुर्बलता','सुख','दुख','स्वभाव'],omitted:0},
 {sloka:'11.3',items:['धन','अन्न','कुटुम्ब','शत्रु','धातु','रत्न'],omitted:1},
 {sloka:'11.4',items:['पराक्रम','सेवक','भाई-बहिन','दीक्षा-उपदेश','यात्रा'],omitted:1},
 {sloka:'11.5',items:['वाहन','संबंधी','माता','सुख','निधि','भूमि','गृह'],omitted:0},
 {sloka:'11.6',items:['ताबीज़','मंत्र','विद्या','ज्ञान','पुत्र','राज्य-प्रतिष्ठा','पद-च्युति'],omitted:0},
 {sloka:'11.7',items:['मामा','शत्रु','व्रण (ऐतिहासिक रोग-वर्ग)','सौतेली माता'],omitted:1},
 {sloka:'11.8',items:['भार्या','यात्रा','वाणिज्य'],omitted:2},
 {sloka:'11.9',items:['युद्ध','शत्रु','दुर्ग','मृतक-धन (उत्तराधिकार-प्रसंग का पारंपरिक विषय-शब्द)','भूत-भविष्य (पूर्व/भावी जन्म) विषयक जानकारी'],omitted:1},
 {sloka:'11.10',items:['भाग्य','साला','धर्म','भाई की भार्या','तीर्थ-यात्रा'],omitted:0},
 {sloka:'11.11',items:['राज्य-प्रतिष्ठा','स्थान','जीविका','सम्मान','पिता','विदेश-वास','ऋण'],omitted:0},
 {sloka:'11.12',items:['सर्व प्रकार की वस्तुएँ','पुत्रवधू','आय','समृद्धि','चतुष्पद'],omitted:0},
 {sloka:'11.13',items:['व्यय','शत्रु-इतिहास'],omitted:1}];
const OMISSION_NOTE='इस भाव की पारंपरिक सूची के कुछ पद सुरक्षा-नीति से हटाए गए हैं।';
const MATBHED_NOTE='कुछ संस्करणों में यह सूत्र 8.37 के रूप में उद्धृत; Jataka-Parijata परंपरा में कुछ भावों के बहु-कारक भी मिलते हैं — यहाँ BPHS 32.34 की एकल-कारक सूची अपनाई गई है।';
const DISCUSSION='BPHS ch11.14-16 में भाव की समृद्धि के कारक बताए हैं — भाव पर शुभ युति/दृष्टि; स्वामी की युवा/प्रबुद्ध (अमॉडल)/कुमार-अवस्था या दशम-स्थिति; और क्षय के कारक — स्वामी द्वारा भाव अदृष्ट, स्वामी की पाप-युति, 3/6/8/11/12 भावों के स्वामियों से युति, ग्रह-युद्ध, वृद्ध/मृत/सुप्त-अवस्था।';
const NO_SYNTHESIS='पूर्ण मूल्यांकन असंभव: प्रबुद्ध/सुप्त-अवस्था और ग्रह-युद्ध इस कार्यान्वयन में अमॉडल हैं; अतः केवल उपलब्ध तथ्य-पंक्तियाँ दिखाई जाती हैं, कोई समृद्धि/क्षय निर्णय नहीं।';
const UNMODELED=['प्रबुद्ध/सुप्त ("जागृत/सुप्त" शक्ति-स्थिति-विशेषक) — चारों ch45 अवस्था-समूहों से बाहर; स्रोतों में गणना परिभाषित नहीं → अमॉडल',
 'ग्रह-युद्ध — अमॉडल','दृष्टि-मान (26.6-12 अंश-गणित) — अमॉडल; केवल whole-sign उपस्थिति','राशि-दृष्टि (चर/स्थिर पद्धति) — अप्रयुक्त; केवल ग्रह-दृष्टि',
 'लज्जितादि/सयनादि अवस्था-समूह और कोप (अस्तता) — अमॉडल (बालादि/जाग्रतादि/दीप्तादि मॉडल, ग्रह-तालिका में)','दृष्टि-फल-वाक्य — नामित श्लोक-पिन के बिना केवल तथ्य-पंक्ति','राहु/केतु की युति/दृष्टि-भागीदारी — परंपरा-भेद; इस चरण में अमॉडल (3.11 में पाप-वर्ग सूचीबद्ध)'];
const SNAP=1e-11,mod=(x,n)=>((x%n)+n)%n,houseOf=(sign,asc)=>mod(sign-asc,12)+1;
function signCheck(n,label){if(!Number.isInteger(n)||n<0||n>11)throw Error(label+' must be an integer sign 0..11');}
function checkPlanets(planets){if(!Array.isArray(planets))throw Error('planets must be an array');const seen=new Set();
 for(const p of planets){if(!p||!SEVEN.includes(p.graha))continue;if(seen.has(p.graha))throw Error('Duplicate planet '+p.graha);seen.add(p.graha);signCheck(p.rashi,p.graha);if(typeof p.degreesInRashi!=='number'||!Number.isFinite(p.degreesInRashi)||p.degreesInRashi<0||p.degreesInRashi>=30)throw Error(p.graha+' degreesInRashi must be finite in [0,30)');}
 for(const g of SEVEN)if(!seen.has(g))throw Error('Missing planet '+g);}
function baseClass(g){return ['Sun','Mars','Saturn'].includes(g)?'पाप':'शुभ';} // BPHS 3.11, Moon/Mercury dynamic
function moonClass(sun,moon){const e=mod((moon.rashi*30+moon.degreesInRashi)-(sun.rashi*30+sun.degreesInRashi),360);
 if(Math.abs(e)<=SNAP||Math.abs(e-180)<=SNAP||Math.abs(e-360)<=SNAP)return {cls:'अनिर्णीत',note:'निर्णय नहीं (पूर्णिमा/अमावस्या-सन्धि) — interpretation-decision'};
 return e<180?{cls:'शुभ',note:'बढ़ता चन्द्र (शुक्ल-पक्ष की ओर)'}:{cls:'पाप',note:'क्षीण-चन्द्र (कृष्ण-पक्ष की ओर)'};}
function classes(planets){const p=Object.fromEntries(planets.map(x=>[x.graha,x])),out={};
 const nodes=planets.filter(x=>x&&(x.graha==='Rahu'||x.graha==='Ketu'));
 for(const n of nodes)signCheck(n.rashi,n.graha); // node signs validated when present; rows still exclude nodes (unmodeled)
 for(const g of SEVEN){if(g==='Moon'){const m=moonClass(p.Sun,p.Moon);out[g]={cls:m.cls,note:m.note};}
  else if(g==='Mercury'){const partners=SEVEN.filter(o=>o!=='Mercury'&&p[o].rashi===p.Mercury.rashi);
   const cls=partners.map(o=>o==='Moon'?moonClass(p.Sun,p.Moon).cls:baseClass(o));
   out.Mercury=cls.includes('पाप')?{cls:'पाप',note:'पाप-युति (BPHS 3.11)'}:cls.includes('अनिर्णीत')?{cls:'अनिर्णीत',note:'युति-ग्रह का वर्ग अनिर्णीत (सन्धि)'}:nodes.some(n=>n.rashi===p.Mercury.rashi)?{cls:'अनिर्णीत',note:'राहु/केतु-युति — वर्ग अमॉडल (परंपरा-भेद)'}:{cls:'शुभ',note:partners.length?'शुभ-युति/सामान्य':'सामान्य'};}
  else out[g]={cls:baseClass(g),note:'BPHS 3.11'};}
 return out;}
function drishti(fromSign,toSign,graha){const h=houseOf(toSign,fromSign); // 26.2-5 ordinary whole-sign
 if(h===7)return '7वीं दृष्टि';if(graha==='Mars'&&(h===4||h===8))return 'विशेष '+h+'वीं दृष्टि';
 if(graha==='Jupiter'&&(h===5||h===9))return 'विशेष '+h+'वीं दृष्टि';if(graha==='Saturn'&&(h===3||h===10))return 'विशेष '+h+'वीं दृष्टि';return null;}
function report(planets,asc,baladiFn){signCheck(asc,'Lagna');checkPlanets(planets);
 if(typeof baladiFn!=='function')throw Error('baladi function (BrahmStates.baladi) required');
 const p=Object.fromEntries(planets.map(x=>[x.graha,x])),cls=classes(planets),bhavas=[];
 for(let h=1;h<=12;h++){const sign=mod(asc+h-1,12),lord=SIGN_LORD[sign],ls=p[lord].rashi,lordBhava=houseOf(ls,asc),
  occupants=SEVEN.filter(g=>p[g].rashi===sign),
  aspects=SEVEN.filter(g=>p[g].rashi!==sign).map(g=>({graha:g,type:drishti(p[g].rashi,sign,g)})).filter(a=>a.type),
  lordConj=SEVEN.filter(g=>g!==lord&&p[g].rashi===ls),
  evilLords=[3,6,8,11,12].map(x=>SIGN_LORD[mod(asc+x-1,12)]),
  lordWithEvil=lordConj.filter(g=>evilLords.includes(g)),
  bal=baladiFn(lord,ls*30+p[lord].degreesInRashi);
  bhavas.push({bhava:h,sign,signName:RASHI[sign],karakatva:KARAKATVA[h-1],karaka:KARAKA[h-1],karakaName:G[KARAKA[h-1]],
   lord,lordName:G[lord],lordSignName:RASHI[ls],lordBhava,
   lordBaladi:bal.available?bal.name:'अनुपलब्ध',
   occupants,occupantNames:occupants.map(g=>G[g]),
   aspects:aspects.map(a=>({graha:a.graha,name:G[a.graha],type:a.type,cls:cls[a.graha].cls})),
   lordOccupiesOwn:ls===sign,
   lordAspectsOwn:drishti(ls,sign,lord)!==null,
   lordConj,lordConjDetail:lordConj.map(g=>({graha:g,name:G[g],cls:cls[g].cls})),
   lordWithEvil,lordWithEvilNames:lordWithEvil.map(g=>G[g]),
   lordIn10H:lordBhava===10,
   lordClass:cls[lord].cls});}
 return {geometry:'whole-sign from Lagna (separate from Sripati-madhya module)',
  karakatvaSource:'BPHS ch11.2-13 (jyotishvidya; vedicpupil मिलान)',karakaSource:'BPHS 32.34 (vedicpupil); मत-भेद नोट देखें',
  drishtiSource:'BPHS 26.2-5 (ordinary whole-sign)',classSource:'BPHS 3.11',
  omissionNote:OMISSION_NOTE,matbhedNote:MATBHED_NOTE,discussion:DISCUSSION,noSynthesis:NO_SYNTHESIS,
  unmodeled:UNMODELED,classes:cls,bhavas,
  scope:'परंपरा में वर्णित तथ्य-पंक्तियाँ; भविष्यकथन या निश्चय नहीं। राहु/केतु युति/दृष्टि इस चरण में अमॉडल।'};}
const api={report,drishti,classes,KARAKATVA,KARAKA,UNMODELED,OMISSION_NOTE,MATBHED_NOTE,DISCUSSION,NO_SYNTHESIS,G,RASHI,SIGN_LORD};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmBhavaPhal=api;
})(typeof window!=='undefined'?window:globalThis);
