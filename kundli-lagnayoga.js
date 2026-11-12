/* E3 सूर्य/लग्न-केंद्रित योग: Phaladeepika 6.8-6.13 (vesi-परिवार, kartari,
susubha) + Amala (6.12 फल + 6.19 का amala-खंड परिभाषा — आंशिक-श्लोक उधार स्पष्ट)।
Source: wisdomlib doc1621578 (OCR not-proofread caveat pages 85-89) —
 https://www.wisdomlib.org/hinduism/book/phaladeepika-by-mantreswara-text-and-translation/d/doc1621578.html
Tulana (primary नहीं): Saravali ch14 (astrojyoti) — नाम/geometry/चन्द्र-निषेध समान,
 परंतु वर्गीकरण-फल प्रणाली भिन्न (mat-bhed नोट; docs/section-e3-rules-draft.md)।
Conventions:
 - whole-sign; सप्तग्रह; nodes अमॉडल। "हित्वेन्दुं" केवल vesi-परिवार पर —
   vesi/vasi/ubhayachari में चन्द्र yoga-निर्माण में नहीं (उपस्थिति-तथ्य दिखे);
   kartari/susubha/amala में चन्द्र-निषेध नहीं।
 - शुभ/पाप वर्ग: E1 का BPHS 3.11 module (BrahmBhavaPhal.classes)। mixed
   (शुभ+पाप) या अनिर्णीत-वर्ग occupant → योग-वर्ग अनिर्णीत, कभी silently
   favourable नहीं।
 - 6.13 केवल पद्धति-टिप्पणी (Sunapha-परिवार अनुरूपता) — कोई संश्लेषण नहीं;
   पंक्तियाँ 6.9-6.12 के नामित फल वहन करती हैं।
 - Omission policy (E1/E2 विस्तारित वर्ग):
   आयु-वाक्य, शोक-वाक्य, अपंगत्व, remedy, गंभीर क्षति/हिंसा-प्रवृत्ति, और
   व्यक्तिगत स्वास्थ्य-स्थिति आश्वासन/भविष्यकथन (रोग-मुक्त आदि) = लोप;
   रोग-वर्ग-शब्द (विषय के रूप में) = KEEP + ऐतिहासिक-वर्ग gloss।
   UI लोप-सूचना generic count-only; विस्तृत वर्ग-नाम केवल docs-ऑडिट में।
 - परंपरा-वर्णित वक्तव्य; दावे/भविष्यकथन/निश्चय नहीं।
*/
(function(root){'use strict';
const BP=typeof module!=='undefined'?require('./kundli-bhavaphal.js'):root.BrahmBhavaPhal;
const SEVEN=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const G={Sun:'सूर्य',Moon:'चन्द्र',Mars:'मंगल',Mercury:'बुध',Jupiter:'गुरु',Venus:'शुक्र',Saturn:'शनि'};
const RASHI=['मेष','वृषभ','मिथुन','कर्क','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुंभ','मीन'];
const SRC='Phaladeepika %S% (wisdomlib doc1621578; OCR not-proofread caveat)';
const AMALA_SRC='Phaladeepika 6.12 + 6.20 (फल; 6.20 के अतिरिक्त पद: क्षिति-शासन/पुत्र/नीतिमान/प्रसिद्ध — विलीन) + 6.19 का amala-खंड (परिभाषा) — उसी श्लोक के Vasumat/Pushkala खंड E4 में; आंशिक-श्लोक उधार स्पष्ट (wisdomlib doc1621578; OCR caveat)';
const NOTE613='पद्धति-टिप्पणी (6.13): सुशुभ/शुभकर्तरि/शुभवेशि आदि के फल-स्वरूप को ग्रंथ Sunapha-परिवार के अनुरूप कहता है — परंपरा-टिप्पणी; ऊपर की पंक्तियाँ 6.9-6.12 के नामित फल हैं। कोई संश्लेषण नहीं।';
const PHAL={
 subhavesi:{sloka:'6.9',name:'शुभ-वेशि',text:'सुरूप, सुखी, गुण-निधि, धीर, राजा, धार्मिक का वर्णन।'},
 subhavasi:{sloka:'6.9',name:'शुभ-वसि',text:'प्रसिद्ध, सबका प्रिय, अति-सौभाग्यशाली, दाता, राजा-प्रिय का वर्णन।'},
 subhobhayachari:{sloka:'6.9',name:'शुभोभयचरि',text:'सुंदर अंग, प्रियवादी, जगत-रंजक, वाग्मी, यशस्वी, धनी का वर्णन।'},
 papavesi:{sloka:'6.10',name:'पाप-वेशि',text:'अन्यायपूर्वक पर-निन्दा, तेज-ह्रास, नीच-संगत, दुर्जनता का वर्णन।'},
 papavasi:{sloka:'6.10',name:'पाप-वसि',text:'छल, पर-निन्दा, दुष्ट-मित्रता, अधर्म-आचरण परंतु शास्त्र-उद्धरण का वर्णन।'},
 papobhayachari:{sloka:'6.10',name:'पापोभयचरि',text:'लोक-अपमान से मानसिक पीड़ा, विद्या-धन-भाग्य-हीनता का वर्णन।'},
 subhakartari:{sloka:'6.11',name:'शुभ-कर्तरि',text:'निर्भय, शत्रु-रहित, सुखी, धनी का वर्णन।',omit:2},
 papakartari:{sloka:'6.11',name:'पाप-कर्तरि',text:'दरिद्रता, अशुचिता, अप्रसन्नता का वर्णन।',omit:3},
 amala:{sloka:'6.12 + 6.20',name:'अमल',text:'आचारवान, धर्म-मति, प्रसन्न, सौभाग्यवान, राजा-मान्य, मृदु-स्वभाव, स्मित-भाषी, धनी का वर्णन (6.12); क्षिति-शासन (ऐतिहासिक अतिशयोक्ति — पारंपरिक वर्णन), पुत्र-सुख, नीतिमान और प्रसिद्धि का वर्णन (6.20)।'}
};
function sideClass(occs,cls){if(!occs.length)return null;
 let saw=false;
 for(const g of occs){const c=cls[g].cls;if(c==='अनिर्णीत')return'अनिर्णीत';if(c==='पाप')saw=true;}
 for(const g of occs){const c=cls[g].cls;if(saw&&c==='शुभ')return'अनिर्णीत';}
 return saw?'पाप':'शुभ';}
function report(planets,lagnaSign){
 if(!Number.isInteger(lagnaSign)||lagnaSign<0||lagnaSign>11)throw new Error('Lagna must be an integer sign 0..11');
 BP.report(planets,lagnaSign,()=>({available:false,name:'अनुपलब्ध'})); // E1 input-validation reuse (throws on bad input)
 const cls=BP.classes(planets);
 const p=Object.fromEntries(planets.map(x=>[x.graha,x]));
 const sign=g=>p[g].rashi;
 const occ=(s,excl)=>SEVEN.filter(g=>g!==excl&&sign(g)===s);
 const mod12=x=>((x%12)+12)%12;
 const sunS=sign('Sun'),moonS=sign('Moon');
 const rows=[];
 const vesiO=occ(mod12(sunS+1),'Moon'),vasiO=occ(mod12(sunS-1),'Moon');
 const fam=(occs,subha,papa,base,fromDesc,moonHere)=>{
  const c=sideClass(occs,cls);
  const moonNote=moonHere?' · चन्द्र उपस्थित (हित्वेन्दुं — योग-निर्माण से बाहर)':'';
  if(c===null)return{key:base,status:'नहीं बनी',reason:fromDesc+(moonHere?' में चन्द्र के अतिरिक्त अन्य सप्तग्रह नहीं':' में चन्द्र-वर्जित सप्तग्रह नहीं')+' (हित्वेन्दुं)'+moonNote};
  if(c==='अनिर्णीत')return{key:base,status:'अनिर्णीत',reason:fromDesc+' में मिश्रित/अनिर्णीत वर्ग ('+occs.map(g=>G[g]+' '+cls[g].cls).join(', ')+') — ग्रंथ मौन, अनुकूल अनुमान नहीं'+moonNote};
  const v=c==='शुभ'?subha:papa;
  return{key:base,status:'बनी',variant:PHAL[v].name,reason:fromDesc+': '+occs.map(g=>G[g]+' ('+cls[g].cls+')').join(', ')+moonNote,phal:PHAL[v].text,sloka:PHAL[v].sloka,omit:PHAL[v].omit||0};};
 rows.push(fam(vesiO,'subhavesi','papavesi','vesi','सूर्य से 2वाँ भाव ('+RASHI[mod12(sunS+1)]+')',sign('Moon')===mod12(sunS+1)));
 rows.push(fam(vasiO,'subhavasi','papavasi','vasi','सूर्य से 12वाँ भाव ('+RASHI[mod12(sunS-1)]+')',sign('Moon')===mod12(sunS-1)));
 // ubhayachari: दोनों पक्ष भृत (चन्द्र-वर्जित)
 if(!vesiO.length||!vasiO.length)rows.push({key:'ubhayachari',status:'नहीं बनी',reason:'सूर्य के दोनों पार्श्व भाव भृत नहीं (चन्द्र-वर्जित)'});
 else rows.push(fam([...vesiO,...vasiO],'subhobhayachari','papobhayachari','ubhayachari','सूर्य के 12वाँ+2वाँ भाव',sign('Moon')===mod12(sunS+1)||sign('Moon')===mod12(sunS-1)));
 // kartari: लग्न के 12वाँ+2वाँ दोनों भृत (चन्द्र-निषेध नहीं)
 const k12=occ(mod12(lagnaSign-1),null),k2=occ(mod12(lagnaSign+1),null);
 if(!k12.length||!k2.length)rows.push({key:'kartari',status:'नहीं बनी',reason:'लग्न के दोनों पार्श्व भाव भृत नहीं'});
 else rows.push(fam([...k12,...k2],'subhakartari','papakartari','kartari','लग्न के 12वाँ+2वाँ भाव'));
 // susubha: लग्न से 2वाँ केवल-शुभ + पाप-दृष्टि रहित
 const s2=occ(mod12(lagnaSign+1),null);
 const s2cls=sideClass(s2,cls);
 let sus;
 if(!s2.length)sus={key:'susubha',status:'नहीं बनी',reason:'लग्न से 2वाँ भाव में सप्तग्रह नहीं'};
 else if(s2cls==='पाप')sus={key:'susubha',status:'नहीं बनी',reason:'लग्न से 2वाँ भाव में केवल पाप ('+s2.map(g=>G[g]).join(', ')+')'};
 else if(s2cls==='अनिर्णीत')sus={key:'susubha',status:'अनिर्णीत',reason:'लग्न से 2वाँ भाव में मिश्रित/अनिर्णीत वर्ग — अनुकूल अनुमान नहीं'};
 else{
  const l2s=mod12(lagnaSign+1);let maleficAsp=false,unresolvedAsp=false;
  for(const g of SEVEN){if(s2.includes(g))continue;
   const d=BP.drishti(sign(g),l2s,g);if(!d)continue;
   if(cls[g].cls==='पाप')maleficAsp=true;else if(cls[g].cls==='अनिर्णीत')unresolvedAsp=true;}
  if(maleficAsp)sus={key:'susubha',status:'नहीं बनी',reason:'लग्न से 2वाँ भाव पर पाप-दृष्टि (पापेक्षितैः-शर्त भंग)'};
  else if(unresolvedAsp)sus={key:'susubha',status:'अनिर्णीत',reason:'लग्न से 2वाँ भाव पर अनिर्णीत-वर्ग ग्रह की दृष्टि — पाप-दृष्टि-रहितता अनिश्चित'};
  else sus={key:'susubha',status:'बनी',variant:'सुशुभ',reason:'लग्न से 2वाँ भाव में केवल शुभ ('+s2.map(g=>G[g]).join(', ')+'), पाप-दृष्टि रहित',phal:null,sloka:'6.8',omit:0,note:'6.13: फल-स्वरूप Sunapha-परिवार अनुरूप (परंपरा-टिप्पणी; 6.8 में सुशुभ का अलग फल-श्लोक नहीं; कोई संश्लेषण नहीं)'};
 }
 rows.push(sus);
 // amala: लग्न से 10वाँ OR चन्द्र से 10वाँ में शुभ (6.19 amala-खंड + 6.12 फल)
 const a10l=occ(mod12(lagnaSign+9),null),a10m=occ(mod12(moonS+9),null);
 const aAll=[...a10l,...a10m];
 if(!aAll.length)rows.push({key:'amala',status:'नहीं बनी',reason:'लग्न से 10वें और चन्द्र से 10वें भाव में सप्तग्रह नहीं'});
 else{const c=sideClass(aAll,cls);
  if(c==='पाप')rows.push({key:'amala',status:'नहीं बनी',reason:'लग्न/चन्द्र के 10वें भाव में केवल पाप ('+aAll.map(g=>G[g]).join(', ')+')'});
  else if(c==='अनिर्णीत')rows.push({key:'amala',status:'अनिर्णीत',reason:'10वें भाव में मिश्रित/अनिर्णीत वर्ग ('+aAll.map(g=>G[g]+' '+cls[g].cls).join(', ')+') — अनुकूल अनुमान नहीं'});
  else rows.push({key:'amala',status:'बनी',variant:PHAL.amala.name,reason:'शुभ ('+aAll.map(g=>G[g]).join(', ')+') '+(a10l.length&&a10m.length?'लग्न और चन्द्र दोनों से 10वें भाव में':a10l.length?'लग्न से 10वें भाव में':'चन्द्र से 10वें भाव में'),phal:PHAL.amala.text,sloka:'6.12 + 6.20',omit:0,amala:true});}
 return {source:SRC.replace('%S%','6.8-6.13'),amalaSource:AMALA_SRC,note613:NOTE613,
  matbhedNote:'Saravali ch14 tulana: नाम/geometry/चन्द्र-निषेध समान, परंतु ch14 में शुभ/पाप विभाजन नहीं (per-planet फल) — भिन्न प्रणाली, केवल mat-bhed नोट (docs)।',
  classes:cls,rows,
  scope:'परंपरा में वर्णित वक्तव्य; दावे/भविष्यकथन/निश्चय नहीं। राहु/केतु अमॉडल।'};}
const api={report,PHAL,SRC,AMALA_SRC,NOTE613,G,RASHI};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmLagnaYoga=api;
})(typeof window!=='undefined'?window:globalThis);
