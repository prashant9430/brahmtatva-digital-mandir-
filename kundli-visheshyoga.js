/* E4: Phaladeepika 6.14 (नियम-तथ्य केवल), 6.19 vasumat/pushkala खंड, 6.20, 6.21-6.25
महाभाग्य = लिंग-सशर्त नियम, detection अमॉडल (कोई लिंग-इनपुट नहीं) — कभी बनी/नहीं पंक्ति नहीं।
Pushkala = बल-शर्त अमॉडल → अधिकतम अनिर्णीत। स्रोत: wisdomlib doc1621578 (Sastri 1950, OCR caveat) primary;
corroboration vedicpupil Phaladipika ch6 (स्वतंत्र annotated अनुवाद; 6.21-English-anomaly + softening caveats docs)। */
(function(root){'use strict';
const BP=(typeof module!=='undefined'&&module.exports)?require('./kundli-bhavaphal.js'):root.BrahmBhavaPhal;
const J=(typeof module!=='undefined'&&module.exports)?require('./kundli-engine.js'):root.BrahmJyotish;
const REL=(typeof module!=='undefined'&&module.exports)?require('./kundli-relations.js'):root.BrahmRelations;
const SEVEN=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const G={Sun:'सूर्य',Moon:'चन्द्र',Mars:'मंगल',Mercury:'बुध',Jupiter:'गुरु',Venus:'शुक्र',Saturn:'शनि'};
const RASHI=['मेष','वृषभ','मिथुन','कर्क','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुंभ','मीन'];
const SRC='Phaladeepika 6.14/6.19-6.25 (wisdomlib doc1621578 = V.S. Sastri 1950, OCR not-proofread caveat; corroboration: vedicpupil Phaladipika ch6 — स्वतंत्र annotated अनुवाद; 6.21-English-anomaly + softening caveats docs में)';
const UPACHAYA_PIN='upachaya = 3/6/10/11, BPHS 7.36 (vedicpupil) पिन';
const PHAL={
 vasumat:{sloka:'6.19 (नियम) + 6.20 (फल)',name:'वसुमत्',text:'सदैव गृह-स्थिति रखने वाला और प्रचुर धन वाला होने का वर्णन।'},
 pushkala:{sloka:'6.19 (नियम) + 6.20 (फल)',name:'पुष्कल',text:'धनी, राजाओं द्वारा सम्मानित, प्रसिद्ध, सुंदर आभूषण-वस्त्र-विभूषित, मधुर-भाषी, सर्वोत्तम-गुणी, स्वामी का वर्णन।'},
 subhamala:{sloka:'6.21 (नियम) + 6.22 (फल)',name:'शुभमाला',text:'शासक/निदेशक, राजाओं द्वारा स्तुत, भोग-रत, दान-शील, परोपकारी, बंधु-प्रिय, सत्पत्नी-पुत्र-युक्त, धीर का वर्णन।',note:'6.22 "धीर" पाठ-अनिश्चितता दर्ज (vedicpupil text-damaged flag, dhira/adhira; wisdomlib "courageous" पठन अपनाया)।'},
 asubhamala:{sloka:'6.21 (नियम) + 6.23 (फल)',name:'अशुभमाला',text:'कु-मार्ग-प्रवृत्त, दुःखी, कृतघ्न, कतर, ब्राह्मण-भक्ति-रहित, लोक-अभिशप्त, कलह-प्रिय का वर्णन।',omit:1},
 lakshmi:{sloka:'6.21 (नियम) + 6.24 (फल)',name:'लक्ष्मी',text:'सुशील वनिता-संग (ऐतिहासिक साहित्यिक पंक्ति), धनी, तेजस्वी, स्वजन-रक्षक, महालक्ष्मी-प्रसाद-प्राप्त, पालकी/अश्व/गज-यान, प्रजा-रंजक श्रेष्ठ नृप, दाता का वर्णन।',omit:1},
 gauri:{sloka:'6.21 (नियम) + 6.25 (फल)',name:'गौरी',text:'सुंदर गात्र, श्लाघित गोत्र, नृप-मित्र, सुगुणी पुत्र, पंकज-वदन, सर्वत्र-स्तुति-विजय का वर्णन।'}};
const mod12=x=>((x%12)+12)%12;
const off=(sign,from)=>mod12(sign-from); // 0-based house offset
function report(planets,lagnaSign){
 if(!Number.isInteger(lagnaSign)||lagnaSign<0||lagnaSign>11)throw new Error('Lagna must be an integer sign 0..11');
 BP.report(planets,lagnaSign,()=>({available:false,name:'अनुपलब्ध'})); // E1 input-validation reuse (throws on bad input)
 const cls=BP.classes(planets);
 const p=Object.fromEntries(planets.map(x=>[x.graha,x]));
 const sign=g=>p[g].rashi;
 const lon=g=>p[g].rashi*30+p[g].degreesInRashi;
 const benefics=SEVEN.filter(g=>cls[g].cls==='शुभ');
 const unresolved=SEVEN.filter(g=>cls[g].cls==='अनिर्णीत');
 const rows=[];
 // 1. Mahabhagya — लिंग-सशर्त नियम; detection अमॉडल (कठोर नियम: कभी बनी/नहीं नहीं)
 rows.push({key:'mahabhagya',name:'महाभाग्य',status:'अमॉडल',reason:'परंपरा-नियम (लिंग-सशर्त): पुरुष के दिवा-जन्म में सूर्य, चन्द्र और लग्न तीनों विषम राशियों में; स्त्री के रात्रि-जन्म में तीनों सम राशियों में (6.14)। इस प्रिव्यू में लिंग-इनपुट नहीं है — जाँच अमॉडल; फल-पंक्ति (6.15) नहीं दिखाई जाती।',sloka:'6.14'});
 // 2. Vasumat — सभी शुभ-वर्ग upachaya (लग्न से OR चन्द्र से)
 const UP=[2,5,9,10]; // houses 3,6,10,11 as 0-offsets (BPHS 7.36)
 const allUp=(from,refG)=>{const bs=refG?benefics.filter(g=>g!==refG):benefics;return bs.length>0&&bs.every(g=>UP.includes(off(sign(g),from)));};
 let vas;
 if(unresolved.length)vas={key:'vasumat',status:'अनिर्णीत',reason:'शुभ-वर्ग-सदस्यता अनिश्चित ('+unresolved.map(g=>G[g]).join(', ')+' अनिर्णीत वर्ग) — अनुकूल अनुमान नहीं'};
 else if(allUp(lagnaSign))vas={key:'vasumat',status:'बनी',variant:'वसुमत्',reason:'सभी शुभ-वर्ग ('+benefics.map(g=>G[g]).join(', ')+') लग्न से उपचय (3/6/10/11) में',phal:PHAL.vasumat.text,sloka:PHAL.vasumat.sloka,omit:0};
 else if(allUp(sign('Moon'),'Moon'))vas={key:'vasumat',status:'बनी',variant:'वसुमत्',reason:'शुभ-वर्ग ('+benefics.filter(g=>g!=='Moon').map(g=>G[g]).join(', ')+') चन्द्र से उपचय (3/6/10/11) में (संदर्भ-चन्द्र स्वयं गिनती से बाहर — interpretation decision, docs)',phal:PHAL.vasumat.text,sloka:PHAL.vasumat.sloka,omit:0};
 else vas={key:'vasumat',status:'नहीं बनी',reason:benefics.length?('शुभ-वर्ग ('+benefics.map(g=>G[g]).join(', ')+') में से कुछ लग्न और चन्द्र दोनों से उपचय-बाहर'):'शुभ-वर्ग ग्रह नहीं (वर्ग-निर्णय पर)'};
 vas.source=UPACHAYA_PIN;vas.vasumatPin=UPACHAYA_PIN;rows.push(vas);
 // 3. Pushkala — (a) चन्द्र-राशि-स्वामी + लग्न-स्वामी युति; (b) kendra OR अधिमित्र-राशि (दोनों ग्रहों का); (c) शुभ-दृष्टि लग्न पर; बल-शर्त अमॉडल
 const moonLord=J.LORDS[sign('Moon')],lagnaLord=J.LORDS[lagnaSign];
 let pus;
 if(moonLord===lagnaLord)pus={key:'pushkala',status:'नहीं बनी',reason:'चन्द्र-राशि-स्वामी और लग्न-स्वामी एक ही ग्रह ('+G[moonLord]+') — युति-शर्त अनुपलब्ध (interpretation decision, docs)'};
 else if(sign(moonLord)!==sign(lagnaLord))pus={key:'pushkala',status:'नहीं बनी',reason:'चन्द्र-राशि-स्वामी ('+G[moonLord]+', '+RASHI[sign(moonLord)]+') और लग्न-स्वामी ('+G[lagnaLord]+', '+RASHI[sign(lagnaLord)]+') युति में नहीं'};
 else{
  const cs=sign(moonLord),host=J.LORDS[cs];
  const kendra=[0,3,6,9].includes(off(cs,lagnaSign));
  let adh=false;
  if(!kendra){
   const r1=REL.relation(host,moonLord,lon(host),lon(moonLord)),r2=REL.relation(host,lagnaLord,lon(host),lon(lagnaLord));
   adh=r1.available&&r2.available&&r1.compound===2&&r2.compound===2;}
  if(!kendra&&!adh)pus={key:'pushkala',status:'नहीं बनी',reason:'युति-राशि ('+RASHI[cs]+') लग्न से kendra नहीं; राशि-स्वामी ('+G[host]+') दोनों ग्रहों का अधिमित्र भी नहीं'};
  else{
   const asp=SEVEN.filter(g=>BP.drishti(sign(g),lagnaSign,g));
   const benAsp=asp.filter(g=>cls[g].cls==='शुभ'),unAsp=asp.filter(g=>cls[g].cls==='अनिर्णीत');
   const sthan=kendra?'kendra':'अधिमित्र-राशि (दोनों ग्रहों का; interpretation decision, docs)';
   if(benAsp.length)pus={key:'pushkala',status:'अनिर्णीत',reason:'युति + '+sthan+' + शुभ ('+benAsp.map(g=>G[g]).join(', ')+') की लग्न-दृष्टि पूर्ण — परंतु बल-शर्त अमॉडल (balavan अपरिभाषित); कभी बनी नहीं जब बल अनिर्णित; फल-पंक्ति नहीं दिखाई जाती'};
   else if(unAsp.length)pus={key:'pushkala',status:'अनिर्णीत',reason:'युति + '+sthan+' पूर्ण; लग्न-दृष्टि करने वाले ग्रह ('+unAsp.map(g=>G[g]).join(', ')+') का वर्ग अनिर्णीत — शुभ-दृष्टि-शर्त अनिश्चित; बल-शर्त अमॉडल'};
   else pus={key:'pushkala',status:'नहीं बनी',reason:'युति + '+sthan+' पूर्ण, परंतु लग्न पर शुभ-दृष्टि नहीं'};
  }
 }
 rows.push(pus);
 // 4. Subhamala / Asubhamala — set-membership (sarve), कोई क्रम-शर्त नहीं (panktya not-operationalized, docs)
 const inSet=set=>benefics.length>0&&benefics.every(g=>set.includes(off(sign(g),lagnaSign)));
 let sub,asub;
 if(unresolved.length){const r='शुभ-वर्ग-सदस्यता अनिश्चित ('+unresolved.map(g=>G[g]).join(', ')+' अनिर्णीत वर्ग) — अनुकूल/प्रतिकूल अनुमान नहीं';
  sub={key:'subhamala',status:'अनिर्णीत',reason:r};asub={key:'asubhamala',status:'अनिर्णीत',reason:r};}
 else{
  sub=inSet([4,5,6])?{key:'subhamala',status:'बनी',variant:'शुभमाला',reason:'सभी शुभ-वर्ग ('+benefics.map(g=>G[g]).join(', ')+') लग्न से 5/6/7 भाव में',phal:PHAL.subhamala.text,sloka:PHAL.subhamala.sloka,omit:0,note:PHAL.subhamala.note}
   :{key:'subhamala',status:'नहीं बनी',reason:'सभी शुभ-वर्ग लग्न से 5/6/7 भाव-समूह में नहीं'};
  asub=inSet([5,7,11])?{key:'asubhamala',status:'बनी',variant:'अशुभमाला',reason:'सभी शुभ-वर्ग ('+benefics.map(g=>G[g]).join(', ')+') लग्न से 6/8/12 भाव में (6.21 Sanskrit "शुभा" दोनों भागों में; vedicpupil English-anomaly docs)',phal:PHAL.asubhamala.text,sloka:PHAL.asubhamala.sloka,omit:PHAL.asubhamala.omit}
   :{key:'asubhamala',status:'नहीं बनी',reason:'सभी शुभ-वर्ग लग्न से 6/8/12 भाव-समूह में नहीं'};
 }
 rows.push(sub,asub);
 // 5. Lakshmi — 9वें-स्वामी AND शुक्र: स्व/उच्च राशि जो लग्न से kendra/trikona
 const ninthLord=J.LORDS[mod12(lagnaSign+8)];
 const ownEx=g=>{const d=J.dignity({graha:g,rashi:sign(g)});return d==='उच्च राशि'||d==='स्वराशि';};
 const kt=g=>[0,3,6,9,4,8].includes(off(sign(g),lagnaSign));
 const cond=g=>ownEx(g)&&kt(g);
 const describe=g=>G[g]+' ('+RASHI[sign(g)]+(ownEx(g)?', स्व/उच्च':', स्व/उच्च नहीं')+(kt(g)?', kendra/trikona':', kendra/trikona नहीं')+')';
 let lak;
 if(ninthLord==='Venus')lak=cond('Venus')?{key:'lakshmi',status:'बनी',variant:'लक्ष्मी',reason:'9वें-स्वामी और शुक्र एक ही ग्रह; '+describe('Venus')+' — दोनों भूमिका एक ही ग्रह में (interpretation decision, docs)',phal:PHAL.lakshmi.text,sloka:PHAL.lakshmi.sloka,omit:PHAL.lakshmi.omit}
  :{key:'lakshmi',status:'नहीं बनी',reason:'9वें-स्वामी/शुक्र (एक ही ग्रह): '+describe('Venus')};
 else lak=(cond(ninthLord)&&cond('Venus'))?{key:'lakshmi',status:'बनी',variant:'लक्ष्मी',reason:'9वाँ-स्वामी — '+describe(ninthLord)+'; शुक्र — '+describe('Venus').replace(G['Venus']+' ',''),phal:PHAL.lakshmi.text,sloka:PHAL.lakshmi.sloka,omit:PHAL.lakshmi.omit}
  :{key:'lakshmi',status:'नहीं बनी',reason:'9वाँ-स्वामी — '+describe(ninthLord)+'; शुक्र — '+describe('Venus').replace(G['Venus']+' ','')};
 rows.push(lak);
 // 6. Gauri — चन्द्र स्व/उच्च + kendra/trikona + गुरु-दृष्टि
 const mCond=ownEx('Moon')&&kt('Moon');
 const jAsp=BP.drishti(sign('Jupiter'),sign('Moon'),'Jupiter');
 rows.push(mCond&&jAsp?{key:'gauri',status:'बनी',variant:'गौरी',reason:'चन्द्र '+RASHI[sign('Moon')]+' (स्व/उच्च, kendra/trikona); गुरु की '+jAsp,phal:PHAL.gauri.text,sloka:PHAL.gauri.sloka,omit:0}
  :{key:'gauri',status:'नहीं बनी',reason:'चन्द्र '+RASHI[sign('Moon')]+(ownEx('Moon')?' (स्व/उच्च':' (स्व/उच्च नहीं')+(kt('Moon')?', kendra/trikona)':', kendra/trikona नहीं)')+'; गुरु-दृष्टि '+(jAsp||'नहीं')});
 return {source:SRC,classes:cls,rows,
  scope:'परंपरा में वर्णित वक्तव्य; दावे/भविष्यकथन/निश्चय नहीं। राहु/केतु अमॉडल।',
  anomalyNote:'6.21: दोनों editions की Sanskrit दोनों भागों में "शुभा" subject; vedicpupil English दूसरे भाग में "malefics" पढ़ती है — अपने Sanskrit से विरोधी translation-anomaly (detection शुभ-वर्ग पर ही; mat-bhed नहीं)।',
  decisions:'vasumat चन्द्र-गणना में संदर्भ-चन्द्र बाहर (reference-graha exclusion); adhimitra-दोनों-ग्रहों-पर (Q3); panktya not-operationalized (Q4); 9L=शुक्र एक-ग्रह-दो-भूमिका; same-lord pushkala नहीं; balavan अमॉडल (Q2); mahabhagya detection अमॉडल (Q1)'};}
const api={report,PHAL,SRC,UPACHAYA_PIN,G,RASHI};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmVisheshYoga=api;
})(typeof window!=='undefined'?window:globalThis);
