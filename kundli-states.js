/* Original degree-band implementation. BPHS45.3, not a health/age reading.
Sources: https://www.siva.sh/brihat-parashara-hora-shastra/45/1-5
http://jyotishvidya.com/ch45.htm
Boundary convention [lower,upper), with floating-point snap within1e-11.
Conservative scope: seven classical visible planets; no ascendant or nodes.

Avastha layer (BPHS45.5-10): jagratadi (45.5-6) + deeptadi (45.7-10), same
seven visible planets. siva.sh Sanskrit is decisive (jyotishvidya ch45 v7-10
drops the 9th deeptadi state Duhkhita and conflates Khala - recorded anomaly,
docs/avastha-ledger-draft.md §3). Labeled implementation conventions (not
source claims): uniform panchadha (compound) friendship yardstick for
jagratadi; first-match precedence in sloka order 45.8-9; whole-sign yuti;
kshina-chandra = Krishna paksha (tithi 16-30 by Sun-Moon elongation, sandhi
-> anirnit, same convention as kundli-bhavaphal.js classes()); khalagriha =
adhishatru sign (siva reading). Kopa (arka-samyuta/combustion) is NEVER
computed: 45.9 names no orb and combustion is project-wide unmodeled - no
invented threshold. Mercury's conditional maleficence (BPHS3.11) is kept on
record but is result-neutral under whole-sign yuti: Mercury is malefic only
when sharing a sign with a base malefic, and any subject conjunct Mercury
then shares that sign with the base malefic directly, so Mercury can never
be a sole vikala trigger. No per-state phal paragraphs exist in 45.7-10
(v10 generic only; v6 full/medium/nil intensity for jagratadi) - no phal
text is invented here. */
(function(root){'use strict';
const grahas=new Set(['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn']);
function baladi(graha,longitude){
 if(!grahas.has(graha))return {available:false,reason:'Not assigned to this body in this implementation'};
 if(typeof longitude!=='number'||!Number.isFinite(longitude))throw Error('Finite numeric longitude required');
 const lon=((longitude%360)+360)%360,sign=Math.floor(lon/30),degrees=lon%30,raw=degrees/6,near=Math.round(raw),snapped=Math.abs(raw-near)<1e-11?near:raw,band=Math.min(4,Math.floor(snapped)),index=sign%2===0?band:4-band;
 return {available:true,name:['बाल','कुमार','युवा','वृद्ध','मृत'][index],index,sign,band,source:'BPHS45.3',boundaryConvention:'lower-inclusive, upper-exclusive',distanceToBoundary:Math.min(degrees%6,6-degrees%6),scope:'Traditional degree-band name only; not the person\'s age, health or lifespan'};
}

// ---- BPHS45.5-10 avastha layer ----
const SEVEN=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const NODES=['Rahu','Ketu'];
const NAMES={Sun:'सूर्य',Moon:'चन्द्र',Mars:'मंगल',Mercury:'बुध',Jupiter:'गुरु',Venus:'शुक्र',Saturn:'शनि',Rahu:'राहु',Ketu:'केतु'};
const JAGRATADI=['जाग्रत्','स्वप्न','सुषुप्ति'];
const JAG_PHAL=['पूर्ण','मध्यम','शून्य']; // 45.6 intensity statement of the text
const DEEPTADI=['दीप्त','स्वस्थ','प्रमुदित','शान्त','दीन','दुःखित','विकल','खल','कोप']; // 45.7 (Sanskrit, nine names)
const CONVENTIONS=[
 'जाग्रतादि मैत्री-मापदंड: पांचधा (compound) मैत्री — कार्यान्वयन-परिपाटी; 45.5 स्वयं मैत्री-योजना निर्दिष्ट नहीं करता',
 'दीप्तादि पूर्वता: 45.8-9 के श्लोक-क्रम में प्रथम-मेल — परिपाटी; स्रोत पूर्वता नहीं कहता; विकल-शर्त अलग संकेत-पंक्ति में भी दिखती है',
 'युति: whole-sign (समान राशि) परिपाटी',
 'क्षीण-चन्द्र: कृष्ण-पक्ष (तिथि 16-30, सूर्य-चन्द्र देशान्तरान्तर से; सन्धि पर अनिर्णीत) — परिपाटी, kundli-bhavaphal.js के समान',
 'बुध की सप्तैत पापता (BPHS3.11): whole-sign युति में परिणाम-तटस्थ — बुध पापी तभी जब समान राशि में आधार-पापी हो, और तब विषय-ग्रह उसी आधार-पापी से युति-शुद्ध होता है; अतः बुध कभी एकमात्र विकल-कारण नहीं बन सकता',
 'खलगृह = अधिशत्रु राशि — siva.sh पठन; jyotishvidya की दुःखित-लोप/खल-विलय विसंगति docs/avastha-ledger-draft.md §3 में दर्ज'];
function deps(){
 const isNode=typeof module!=='undefined'&&module.exports;
 const J=isNode?require('./kundli-engine.js'):root.BrahmJyotish;
 const Rel=isNode?require('./kundli-relations.js'):root.BrahmRelations;
 const B=isNode?require('./kundli-bhavaphal.js'):root.BrahmBhavaPhal;
 if(!J||!Rel||!B)throw Error('avastha requires BrahmJyotish, BrahmRelations and BrahmBhavaPhal');
 return {J,Rel,B};
}
function signOf(lon){ // identical convention to kundli-relations.js: lower-inclusive, snap 1e-11 sign units
 let q=(((lon%360)+360)%360)/30;const near=Math.round(q);if(Math.abs(q-near)<=1e-11)q=near;return Math.floor(q)%12;
}
function avastha(graha,positions){
 if(!grahas.has(graha))return {available:false,reason:'सात दृश्य ग्रहों तक सीमित; लग्न/राहु/केतु को अवस्था नहीं दी जाती (इस कार्यान्वयन का दायरा)'};
 if(!positions||typeof positions!=='object'||Array.isArray(positions))throw Error('Planet longitude map required');
 for(const g of [...SEVEN,...NODES]){
  const v=positions[g];if(typeof v!=='number'||!Number.isFinite(v))throw Error('Finite numeric longitude required for '+g);}
 const {J,Rel,B}=deps();
 const lon=((positions[graha]%360)+360)%360,sign=signOf(lon),lord=J.LORDS[sign];
 const dig=J.dignity({graha,rashi:sign});
 const exalted=dig==='उच्च राशि',own=dig==='स्वराशि',debil=dig==='नीच राशि';
 // panchadha compound relation to the sign lord (not needed for own sign; self-relationship undefined)
 const rel=own?null:Rel.relation(graha,lord,lon,((positions[lord]%360)+360)%360); // panchadha compound to the sign lord (not needed for own sign; self-relationship undefined)
 const compound=rel?rel.compound:null,compoundLabel=rel?rel.compoundLabel:null;
 // vikala condition (45.9 papasamyuta): companions in the same whole sign from the 3.11 papa set.
 // Base malefics Sun/Mars/Saturn/Rahu/Ketu are always papa; Moon via paksha (bhavaphal classes,
 // sandhi -> unresolved); Mercury's conditional clause is result-neutral here (see header).
 const planetArray=[...SEVEN,...NODES].map(g=>({graha:g,rashi:signOf(positions[g]),degreesInRashi:(((positions[g]%360)+360)%360)%30}));
 const moonCls=B.classes(planetArray).Moon.cls; // 'पाप' | 'शुभ' | 'अनिर्णीत'
 const via=[],unresolved=[];
 for(const c of ['Sun','Moon','Mars','Saturn','Rahu','Ketu']){
  if(c===graha||signOf(positions[c])!==sign)continue;
  if(c==='Moon'){if(moonCls==='पाप')via.push(c);else if(moonCls==='अनिर्णीत')unresolved.push(c);}
  else via.push(c);
 }
 const vikalaApplies=via.length?true:(unresolved.length?null:false);
 const vikala={applies:vikalaApplies,via,viaNames:via.map(g=>NAMES[g]),unresolved,unresolvedNames:unresolved.map(g=>NAMES[g]),
  basis:'45.9 पापसंयुत; पाप-वर्ग BPHS3.11 (सूर्य/मंगल/शनि/राहु/केतु + क्षीण-चन्द्र); whole-sign युति परिपाटी; बुध-सप्तैत-पापता परिणाम-तटस्थ (शीर्षक-टिप्पणी देखें)'};
 // jagratadi (45.5): own/exalt -> jagrat; debilitation -> sushupti; else panchadha tier
 let j,jBasis;
 if(exalted){j=0;jBasis='45.5: उच्च राशि → जाग्रत्';}
 else if(own){j=0;jBasis='45.5: स्वराशि → जाग्रत्';}
 else if(debil){j=2;jBasis='45.5: नीच राशि → सुषुप्ति';}
 else if(compound>=0){j=1;jBasis=`45.5: राशि-स्वामी ${NAMES[lord]} ${compoundLabel} (पांचधा-परिपाटी) → स्वप्न`;}
 else{j=2;jBasis=`45.5: राशि-स्वामी ${NAMES[lord]} ${compoundLabel} (पांचधा-परिपाटी) → सुषुप्ति`;}
 const jagratadi={name:JAGRATADI[j],index:j,basis:jBasis,
  phal:JAG_PHAL[j],phalNote:'45.6 का फल-तीव्रता कथन (जाग्रत्/स्वप्न/सुषुप्ति पर पूर्ण/मध्यम/शून्य) — मूल का कथन, हमारी व्याख्या नहीं',source:'BPHS45.5-6'};
 // deeptadi (45.7-10): first match in sloka order; vikala precedes khala; kopa unmodeled
 let dName,dBasis;
 if(exalted){dName='दीप्त';dBasis='45.8: स्वोच्चस्थ (उच्च राशि)';}
 else if(own){dName='स्वस्थ';dBasis='45.8: स्वर्क्षे (स्वराशि)';}
 else if(compound===2){dName='प्रमुदित';dBasis=`45.8: अधिमित्रभे — राशि-स्वामी ${NAMES[lord]} अधिमित्र (पांचधा)`;}
 else if(compound===1){dName='शान्त';dBasis=`45.8: मित्रभे — राशि-स्वामी ${NAMES[lord]} मित्र (पांचधा)`;}
 else if(compound===0){dName='दीन';dBasis=`45.8: समभे — राशि-स्वामी ${NAMES[lord]} सम (पांचधा)`;}
 else if(compound===-1){dName='दुःखित';dBasis=`45.9: शत्रुभे — राशि-स्वामी ${NAMES[lord]} शत्रु (पांचधा)`;}
 else if(vikalaApplies===true){dName='विकल';dBasis=`45.9: पापसंयुत — ${vikala.viaNames.join(', ')} से युति (पाप-वर्ग BPHS3.11)`;}
 else if(vikalaApplies===null){dName='अनिर्णीत';dBasis='45.9: विकल/खल के बीच निर्णय अनिर्णीत — सहयोगी चन्द्र का पक्ष सन्धि पर (पूर्णिमा/अमावस्या)';}
 else{dName='खल';dBasis=`45.9: खलगृहे — राशि-स्वामी ${NAMES[lord]} अधिशत्रु (siva पठन; खलगृह = अधिशत्रु राशि)`;}
 const deeptadi={name:dName,basis:dBasis,source:'BPHS45.7-10',
  precedenceNote:'श्लोक-क्रम (45.8-9) में प्रथम-मेल — परिपाटी-निर्णय, स्रोत-कथन नहीं; विकल-शर्त लागू होने पर अलग संकेत-पंक्ति भी दिखती है'};
 const kopa={available:false,note:'कोप (अर्कसंयुत/अस्त): अनिर्णीत — 45.9 में अस्तता की कक्षा-सीमा नहीं; अस्तता इस परियोजना में अमॉडलित; कोई काल्पनिक सीमा नहीं'};
 return {available:true,graha,sign,signLord:lord,signLordName:NAMES[lord],
  jagratadi,deeptadi,vikala,kopa,compound,compoundLabel,
  conventions:CONVENTIONS,
  anomalyNote:'अनुवाद-विसंगति दर्ज: jyotishvidya ch45 v7-10 से नौवीं अवस्था दुःखित गिरी है और खल का अर्थ बदला है; siva.sh संस्कृत निर्णायक (docs/avastha-ledger-draft.md §3)',
  phalNote:'दीप्तादि के प्रति-अवस्था फल-परिच्छेद स्रोत (45.7-10) में नहीं; 45.10 केवल सामान्य कथन (अवस्था-अनुरूप भाव-फल)। जाग्रतादि हेतु 45.6 का पूर्ण/मध्यम/शून्य तीव्रता-कथन। कोई काल्पनिक फल-पाठ नहीं।',
  source:'BPHS45.5-10 (siva.sh संस्कृत-आधारित; jyotishvidya मिलान; पाप-वर्ग BPHS3.11)'};
}
const api={baladi,avastha,JAGRATADI,DEEPTADI,NAMES,CONVENTIONS};root.BrahmStates=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
