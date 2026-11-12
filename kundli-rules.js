/* Source-named Avakhada classification and limited geometric yoga screens.
No predictions or ritual instructions. See docs/kundli-methods.md. */
(function(root){'use strict';
const yoni=['अश्व','गज','मेष','सर्प','सर्प','श्वान','मार्जार','मेष','मार्जार','मूषक','मूषक','गौ','महिष','व्याघ्र','महिष','व्याघ्र','मृग','मृग','श्वान','वानर','वृषभ (NP पाठ)','वानर','सिंह','अश्व','सिंह','गौ','गज'];
const syllables=['Chu Che Cho La','Lee Lu Le Lo','A I U E','O Va Vi Vu','Ve Vo Ka Ki','Ku Gha Ng Na','Ke Ko Ha Hi','Hu He Ho Da','Di Du De Do','Ma Mi Mu Me','Mo Ta Ti Tu','Te To Pa Pi','Pu Sha Na Tha','Pe Po Ra Ri','Ru Re Ro Ta','Ti Tu Te To','Na Ni Nu Ne','No Ya Yi Yu','Ye Yo Bha Bhi','Bhu Dha Pha Dha','Bhe Bho Ja Ji','Ju Je Jo Gha','Ga Gi Gu Ge','Go Sa Si Su','Se So Da Di','Du Tha Jha Jna','De Do Cha Chi'].map(x=>x.split(' '));
const human=[1,3,5,10,11,19,20,24,25],deva=[0,4,6,7,12,14,16,21,26];
function signCheck(n,label){if(typeof n!=='number'||!Number.isInteger(n)||n<0||n>11)throw Error(label+' must be an integer sign 0..11');}
function angleCheck(n,label){if(typeof n!=='number'||!Number.isFinite(n)||n<0||n>=360)throw Error(label+' must be in [0,360)');}
function planetsCheck(planets,required,label){if(!Array.isArray(planets))throw Error(label+' must be an array');const seen=new Set();for(const p of planets){if(!p)continue;if(seen.has(p.graha))throw Error('Duplicate '+label+' '+p.graha);seen.add(p.graha);if(!required.includes(p.graha))continue;signCheck(p.rashi,label+' '+p.graha);}for(const g of required)if(!seen.has(g))throw Error('Missing '+label+' '+g);}
function avakhada(moon){if(!moon)throw Error('Moon is required');signCheck(moon.rashi,'Moon');if(!Number.isInteger(moon.nakshatra)||moon.nakshatra<0||moon.nakshatra>26||!Number.isInteger(moon.pada)||moon.pada<1||moon.pada>4)throw Error('Nakshatra/pada out of range');if(typeof moon.degreesInRashi!=='number'||!Number.isFinite(moon.degreesInRashi)||moon.degreesInRashi<0||moon.degreesInRashi>=30)throw Error('Moon degrees must be in [0,30)');const s=moon.rashi,n=moon.nakshatra,part=moon.pada-1,element=['अग्नि','पृथ्वी','वायु','जल'][s%4],varna=['क्षत्रिय','वैश्य','शूद्र','ब्राह्मण'][s%4];let vashya;
if(s===8)vashya=moon.degreesInRashi<15?'मानव':'चतुष्पद';else if(s===9)vashya=moon.degreesInRashi<15?'चतुष्पद':'जलचर';else vashya=['चतुष्पद','चतुष्पद','मानव','जलचर','वनचर (विकल्प: चतुष्पद)','मानव','मानव','कीट',null,null,'मानव','जलचर'][s];
const row=Math.floor(n/3),column=n%3,col=row%2===0?column:2-column;return {element,varna,vashya,yoni:yoni[n],gana:human.includes(n)?'मनुष्य':deva.includes(n)?'देव':'राक्षस',nadi:['आदि','मध्य','अन्त्य'][col],syllable:syllables[n][part]};}
const norm=x=>((x%12)+12)%12,house=(s,a)=>norm(s-a)+1,kendra=n=>[1,4,7,10].includes(n);
const own={Mars:[0,7],Mercury:[2,5],Jupiter:[8,11],Venus:[1,6],Saturn:[9,10]},ex={Mars:9,Mercury:5,Jupiter:3,Venus:11,Saturn:6},names={Mars:'रुचक',Mercury:'भद्र',Jupiter:'हंस',Venus:'मालव्य',Saturn:'शश'};
function yogas(planets,asc){signCheck(asc,'Lagna');planetsCheck(planets,['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'],'natal planet');const p=Object.fromEntries(planets.map(p=>[p.graha,p])),moon=p.Moon.rashi,out=[];
for(const name of Object.keys(own)){const g=p[name],dignity=own[name].includes(g.rashi)||ex[name]===g.rashi;for(const [origin,a]of [['लग्न',asc],['चन्द्र',moon]]){const h=house(g.rashi,a);out.push({id:name+'-'+origin,name:names[name]+' (पंचमहापुरुष)',hit:dignity&&kendra(h),reason:name+' · '+origin+' से भाव '+h+' · '+(dignity?'स्व/उच्च राशि':'स्व/उच्च राशि नहीं'),source:'Phaladeepika 6.1, 6.4 · फल 6.2-6.4'});}}
const nonSun=['Mars','Mercury','Jupiter','Venus','Saturn'],right=nonSun.filter(g=>house(p[g].rashi,moon)===2),left=nonSun.filter(g=>house(p[g].rashi,moon)===12);
for(const [id,name,hit,phalRef]of [['sunapha','सुनफा',right.length>0,'फल 6.6'],['anapha','अनफा',left.length>0,'फल 6.6'],['durudhura','दुरुधरा',right.length>0&&left.length>0,'फल 6.7']])out.push({id,name,hit,reason:'चन्द्र से 2: '+(right.join(', ')||'कोई नहीं')+'; 12: '+(left.join(', ')||'कोई नहीं')+'। सूर्य और राहु/केतु इस चुने नियम में नहीं।',source:'Phaladeepika 6.5 · '+phalRef});
out.push({id:'kesari',name:'केसरी',hit:kendra(house(p.Jupiter.rashi,moon)),reason:'गुरु चन्द्र से भाव '+house(p.Jupiter.rashi,moon)+' में। केवल kendra-स्थिति जाँच; अन्य बल/दृष्टि की सम्पूर्ण व्याख्या नहीं।',source:'Phaladeepika 6.14 · फल 6.16'});{const mj=house(p.Moon.rashi,p.Jupiter.rashi),mk=kendra(house(p.Moon.rashi,asc)),seven=['Sun','Mars','Mercury','Jupiter','Venus','Saturn'],conj=seven.some(g=>p[g].rashi===p.Moon.rashi),kendraFromMoon=seven.some(g=>kendra(house(p[g].rashi,moon))),noAdjacent=right.length===0&&left.length===0;
out.push({id:'sakata',name:'शकट',hit:[6,8,12].includes(mj),cancelled:mk,reason:'चन्द्र गुरु से भाव '+mj+' में (6/8/12 पर स्थिति)। रद्द-शर्त 6.14: चन्द्र लग्न से '+(kendra(house(p.Moon.rashi,asc))?'केंद्र में है':'केंद्र में नहीं')+'।',source:'Phaladeepika 6.14 · फल 6.17'});
out.push({id:'kemadruma',name:'केमद्रुम',hit:noAdjacent,cancelled:mk||conj||kendraFromMoon,reason:'चन्द्र से 2/12 में सूर्य-भिन्न ग्रह नहीं (स्थिति-भाग में 6.5 का सूर्य-अपवाद)। 6.5 की \"कुछ लोग\" रद्द-शर्तें: चन्द्र लग्न से केंद्र '+(mk?'हाँ':'नहीं')+', चन्द्र-ग्रह युति '+(conj?'हाँ':'नहीं')+', चन्द्र से केंद्र में ग्रह '+(kendraFromMoon?'हाँ':'नहीं')+'। रद्द-शर्त वाक्य सूर्य-अपवाद नहीं दोहराता, इसलिए वहाँ सूर्य भी गिना है; पाठ-अस्पष्टता पर यह चुनी हुई व्याख्या है।',source:'Phaladeepika 6.5 · फल 6.7'});
const PHAL={Mars:'साहसिक कार्यों से धन-अर्जन, शत्रुओं पर विजय, प्रभाव और अगुवाई, कीर्ति की परंपरागत चर्चा; अहंकार की संभावना भी उसी श्लोक में है।',Mercury:'तीक्ष्ण बुद्धि, स्वच्छता, विद्वानों की प्रशंसा, सभा में वाक्पटुता और धन की चर्चा।',Jupiter:'सज्जनों द्वारा स्तुति, धार्मिक स्वभाव और सुख-वैभव की चर्चा; हाथ-पैर के शुभ चिह्नों का उल्लेख केवल पारंपरिक संकेत के रूप में।',Venus:'सुदृढ़ता, दृढ़ संकल्प, धन, पारिवारिक भाग्य, वाहन-सुख, यश और स्थिर इंद्रियों की चर्चा।',Saturn:'प्रशंसा, अच्छे सेवक, बल और मुखिया/राजा तक की पदवी की चर्चा; दुष्ट-स्वभाव, पर-स्त्री-संसर्ग और पर-धन-हरण की कठोर परंपरागत चर्चा भी उसी श्लोक में है (ऐतिहासिक भाषा — किसी वास्तविक व्यक्ति का मूल्यांकन नहीं)।',sunapha:'राजा या उसके समान, स्वयं अर्जित धन, बुद्धि और धन की ख्याति की चर्चा।',anapha:'बल, सुशीलता, ख्याति, विषय-सुख और संतोष की चर्चा।',durudhura:'धन-वाहन की प्रचुरता, दानशीलता और विश्वासी सेवकों की चर्चा।',kemadruma:'अप्रसिद्धि, दुःख और दरिद्रता जैसी कठोर परंपरागत चर्चा; राजवंश में जन्म पर भी यही वर्णन।',sakata:'भाग्य के उतार-चढ़ाव (खोया पुनः मिलना), सामान्य स्थिति और मानसिक दुःख की चर्चा।',kesari:'शत्रुओं पर सिंह-सदृश विजय, सभा में उच्च वाणी, यश और बुद्धि की चर्चा।'};
const PHAL_OMIT={Mercury:1,anapha:1,kesari:1}; // आयु/स्वास्थ्य-स्थिति पद नीति-लोप (ऑडिट: docs/yoga-phal-ledger-draft.md §सुधार); Saturn में लोप 0 — प्रतिकूल पद पुनःस्थापित
for(const y of out){const k=PHAL[y.id]?y.id:y.id.split('-')[0];if(PHAL[k]){y.phal=PHAL[k];if(PHAL_OMIT[k])y.omit=PHAL_OMIT[k];}}
const du=out.find(y=>y.id==='durudhura');if(du&&du.hit)for(const y of out)if(y.id==='sunapha'||y.id==='anapha'){y.subsumed='durudhura';}
const ms=house(p.Moon.rashi,p.Sun.rashi),level=kendra(ms)?'अधमा':[2,5,8,11].includes(ms)?'सम':'वरिष्ठ';
out.push({id:'moon-from-sun',name:'चन्द्र-सूर्य श्रेणी',hit:true,level,reason:'चन्द्र सूर्य से भाव '+ms+' में ⇒ '+level+' (केंद्र=अधमा, पण्फर=सम, आपोक्लिम=वरिष्ठ)।',source:'Phaladeepika 6.14, फल 6.18',phal:'धन, वाहन, यश, सुख, ज्ञान, विनय, विद्या और त्याग-भोग की चर्चा इस श्रेणी में '+(level==='अधमा'?'न्यूनतम':level==='सम'?'मध्यम':'उत्तम')+' कही गई है। यह हर कुंडली का सामान्य वर्गीकरण है; कोई एक श्रेणी सदैव बनती है, विशेष योग नहीं।'});}
return out;}
const DASHA_OWN={Sun:[4],Moon:[3],Mars:[0,7],Mercury:[2,5],Jupiter:[8,11],Venus:[1,6],Saturn:[9,10]},DASHA_EX={Sun:0,Moon:1,Mars:9,Mercury:5,Jupiter:3,Venus:11,Saturn:6};
const SIGN_LORD=['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
function bhavaLord(asc,h){signCheck(asc,'Lagna');if(!Number.isInteger(h)||h<1||h>12)throw Error('House must be 1-12');return SIGN_LORD[(asc+h-1)%12];}
const DASHA_MT={Sun:[4,0,20],Moon:[1,3,30],Mars:[0,0,12],Mercury:[5,15,20],Jupiter:[8,0,10],Venus:[6,0,15],Saturn:[10,0,20]},DASHA_UC_ZONE={Moon:[1,0,3],Mercury:[5,0,15]};
const ZONE_BOUNDARY_EPS=0.01;
function degreeZoneOf(lord,rashi,deg){if(lord==='Rahu'||lord==='Ketu')return {zone:null,boundary:false};if(typeof deg!=='number'||!Number.isFinite(deg))return {zone:null,boundary:false,missing:true};if(deg<0||deg>=30)return {zone:null,boundary:false,invalid:true};
 const spans=[];if(DASHA_UC_ZONE[lord])spans.push(DASHA_UC_ZONE[lord]);if(DASHA_MT[lord])spans.push(DASHA_MT[lord]);
 for(const sp of spans)if(rashi===sp[0]&&(Math.abs(deg-sp[1])<=ZONE_BOUNDARY_EPS||(sp[2]<30&&Math.abs(deg-sp[2])<=ZONE_BOUNDARY_EPS)))return {zone:null,boundary:true};
 if(DASHA_UC_ZONE[lord]&&rashi===DASHA_UC_ZONE[lord][0]&&deg>=DASHA_UC_ZONE[lord][1]&&deg<DASHA_UC_ZONE[lord][2])return {zone:'उच्च-क्षेत्र',boundary:false};
 if(DASHA_MT[lord]){const[sr,a,b]=DASHA_MT[lord];if(rashi===sr)return deg>=a&&deg<b?{zone:'मूलत्रिकोण क्षेत्र',boundary:false}:{zone:'स्वराशि अंश (मूलत्रिकोण राशि का शेष)',boundary:false};}
 return {zone:null,boundary:false};}
const DASHA_PHAL={
Sun:{ref:'BPHS 47.7-11 / 47.12-15',fav:'स्व/उच्च राशि, केंद्र या 11वें भाव, धर्म/कर्म-स्वामी संबंध और वर्ग-बल पर धन, सुख, सरकारी सम्मान और उच्च पद की चर्चा; 5वें/2वें/4वें स्वामी युति पर क्रमशः संतान/धन/वाहन-सुख।',adv:'नीच राशि, 6/8/12 में दुर्बलता, पाप-युति या 6/8/12-स्वामी युति पर चिंता, धन-हानि, सरकारी दंड, अपयश, पिता व कुटुम्ब के कष्ट की चर्चा; शुभ-दृष्टि पर कुछ शमन, पाप-दृष्टि पर वृद्धि कही गई है।'},
Moon:{ref:'BPHS 47.16-22 / 47.23-26',fav:'उच्च/स्व राशि, केंद्र/11/9/5, शुभ-युति/दृष्टि और पूर्ण-बल पर ऐश्वर्य, धन-लाभ, मांगलिक कार्य, पद, वाहन और संतान-सुख की चर्चा; 2वें भाव में बलवान चन्द्र पर विशेष धन-लाभ।',adv:'क्षीण या नीच चन्द्र पर धन-हानि; 3वें में मिश्रित; पाप-युति पर मानसिक तनाव, माता/सेवक-कष्ट; क्षीण होकर 6/8/12 में सरकार से वैर व धन-हानि; बलवान 6/8/12 में मिश्रित फल कहा गया है।'},
Mars:{ref:'BPHS 47.27-32 / 47.33',fav:'उच्च/मूलत्रिकोण/स्व राशि, केंद्र/11/2 में बल, शुभ नवांश और शुभ-युति पर उच्च पद, धन-भूमि लाभ, विदेश से धन, वाहन-आभूषण और भाई-सुख की चर्चा; केंद्र/3 में बल पर पराक्रम से लाभ; दशा-अंत में कुछ प्रतिकूलता भी कही गई है।',adv:'नीच, दुर्बल, अशुभ भाव या पाप-युति/दृष्टि पर धन-हानि और कष्ट की चर्चा।'},
Mercury:{ref:'BPHS 47.62-65 / 47.66-70',fav:'उच्च/स्व/मित्र राशि और 11/5/9 स्थिति पर धन, ख्याति, ज्ञान-वृद्धि, सरकारी कृपा, मांगलिक कार्य, पत्नी-संतान सुख और व्यापार-लाभ की चर्चा; शुभ-दृष्टि/9वां/कर्म-स्वामी होने पर पूर्ण शुभता।',adv:'पाप-युति पर दंड, कुटुम्ब-वैर, विदेश-यात्रा; 6/8/12 पर धन-हानि, चोरी-भय और सरकारी कष्ट की चर्चा; विषय-आसक्ति से धन-हानि की परंपरागत चर्चा भी है (ऐतिहासिक आचरण-वर्णन, इस जातक पर निश्चय नहीं); आरम्भ शुभ, मध्य मान, अंत कष्ट की क्रम-चर्चा भी है।'},
Jupiter:{ref:'BPHS 47.45-48 / 47.49-51',fav:'उच्च/स्व/मूलत्रिकोण, 10/5/9 भाव, स्व/उच्च नवांश पर उच्च पद, सुख, सरकारी मान, वाहन-वस्त्र, धार्मिक निष्ठा और पत्नी-संतान सुख की चर्चा।',adv:'नीच, अस्त, पाप-युति या 6/8 स्थिति पर गृह-हानि, चिंता और संतान-कष्ट की चर्चा; आरम्भ प्रतिकूल, उत्तरार्ध में सुधार कहा गया है।'},
Venus:{ref:'BPHS 47.79-82, 47.85-87 / 47.83-84½, 47.88-89',fav:'उच्च/स्व/केंद्र/त्रिकोण पर वस्त्र-आभूषण-वाहन-भूमि, सरकारी मान और उत्सव की चर्चा; मूलत्रिकोण पर राज्य-लाभ, गृह, संतान, विवाह-उत्सव और खोई संपत्ति की वापसी; 4वें भाव में धर्म/कर्म-स्वामी हो तो प्रधानता व धर्म-कार्य।',adv:'6/8/12 पर कुटुम्ब-वैर, पत्नी-कष्ट और व्यापार-हानि की चर्चा।'},
Saturn:{ref:'BPHS 47.53-56 / 47.57-60',fav:'उच्च/स्व/मूलत्रिकोण/मित्र राशि, स्व/उच्च नवांश और 3/11 स्थिति पर सरकारी मान, ऐश्वर्य, यश, विद्या, वाहन-आभूषण, धन, उच्च पद, संपत्ति और संतान की चर्चा।',adv:'6/8/12, नीच या अस्त पर पिता-वियोग, पत्नी-संतान कष्ट, सरकारी नाराज़गी और कारावास की परंपरागत चर्चा; उसी श्लोक-समूह में शुभ-दृष्टि/युति, केंद्र/त्रिकोण या धनु/मीन स्थिति पर शुभ प्रतिवाद भी है।'},
Rahu:{ref:'BPHS 47.34-39½ / 47.40-43',fav:'शुभ राशि, शुभ-युति/दृष्टि और 1/4/7/10/11/3 स्थिति पर सुख, धन, वाहन, नया गृह, संतान और विदेशी स्रोत से लाभ की चर्चा।',adv:'8/12 स्थिति पर सर्व-कष्ट; पाप/मारक-युति या नीच पर पद-हानि, गृह-क्षति और मानसिक पीड़ा की चर्चा; आरम्भ में धन-हानि, मध्य में राहत, अंत में चिंता की क्रम-चर्चा।'},
Ketu:{ref:'BPHS 47.72-77',fav:'केंद्र/त्रिकोण/11 और शुभ राशि पर शासक-मैत्री, प्रधानता, वाहन-सुख, संतान-सुख और विदेश-लाभ की चर्चा; 3/6/11 पर राज्य-लाभ व मित्र-सुख; आरम्भ राजयोग, मध्य भय, अंत दूर-यात्रा की क्रम-चर्चा।',adv:'2/8/12 स्थिति या पाप-दृष्टि पर कारावास, गृह-क्षति और चिंता की चर्चा।'}};
const DASHA_OMIT={Sun:[],Moon:['BPHS 47.23-26: 1 पद सुरक्षा-नीति से नहीं लिया गया'],Mars:[],Mercury:['BPHS 47.62-65: 1 पद सुरक्षा-नीति से नहीं लिया गया','BPHS 47.66-70: 1 पद सुरक्षा-नीति से नहीं लिया गया'],Jupiter:[],Venus:['BPHS 47.88-89: 1 श्लोक सुरक्षा-नीति से नहीं लिया गया (फल और उपाय-अंश दोनों)'],Saturn:['BPHS 47.57-60: 1 पद सुरक्षा-नीति से नहीं लिया गया'],Rahu:[],Ketu:['BPHS 47.72-77: 3 पद सुरक्षा-नीति से नहीं लिए गए']};
const GRAHA_PARA='परंपरा में ऐसा माना गया है; नियति या निश्चय नहीं।';
const GRAHA_HI={Sun:'सूर्य',Moon:'चन्द्र',Mars:'मंगल',Mercury:'बुध',Jupiter:'गुरु',Venus:'शुक्र',Saturn:'शनि',Rahu:'राहु',Ketu:'केतु'};
// BPHS 48.2-8 per house-lord dasha discussion; maraka/death clauses fully omitted (logged); condition-keyed disease limbs omitted (stronger D6 semantic test, 14:48) — generic notes only
const BHAVA48={1:'लग्नेश की दशा की चर्चा; स्रोत का मुख्य पद सुरक्षा-नीति से नहीं लिया गया (ऑडिट दर्ज)।',2:'धनेश की दशा में कष्ट की चर्चा; स्रोत के कुछ पद सुरक्षा-नीति से नहीं लिए गए (ऑडिट दर्ज)।',3:'सहजेश की दशा में प्रतिकूल फल की चर्चा।',4:'बंधुवेश की दशा में गृह-भूमि प्राप्ति की चर्चा।',5:'पुत्रेश की दशा में शिक्षा-प्रगति और संतान-सुख की चर्चा।',6:'षष्ठेश की दशा में शत्रु-खतरे की चर्चा; स्रोत के कुछ पद सुरक्षा-नीति से नहीं लिए गए (ऑडिट दर्ज)।',7:'युवतीेश की दशा में पत्नी-कष्ट की चर्चा; स्रोत के कुछ पद सुरक्षा-नीति से नहीं लिए गए (ऑडिट दर्ज)।',8:'रन्ध्रेश की दशा में धन-हानि की चर्चा; स्रोत के कुछ पद सुरक्षा-नीति से नहीं लिए गए (ऑडिट दर्ज)।',9:'धर्मेश की दशा में शिक्षा, धार्मिकता और अप्रत्याशित धन-लाभ की चर्चा।',10:'कर्मेश की दशा में सरकारी मान-सम्मान की चर्चा।',11:'लाभेश की दशा में धन-लाभ में बाधा की चर्चा; स्रोत के कुछ पद सुरक्षा-नीति से नहीं लिए गए (ऑडिट दर्ज)।',12:'व्ययेश की दशा में कष्ट की चर्चा; स्रोत के कुछ पद सुरक्षा-नीति से नहीं लिए गए (ऑडिट दर्ज)।'};
function dashaBhava(planets,asc,lord){const cx=dashaContext(planets,asc,lord),p=Object.fromEntries(planets.map(q=>[q.graha,q])),g=p[lord];
 const lordOf=cx.lordOf,KENDRA=[1,4,7,10],TRIKONA=[1,5,9],DUSTHANA=[6,8,12];
 const lordsOf=hs=>hs.map(h=>SIGN_LORD[(asc+h-1)%12]);
 const isLordOf=hs=>lordOf.some(h=>hs.includes(h));
 const conjSet=cx.conjunct;
 const placedIn=(gr,hs)=>hs.includes(house(p[gr].rashi,asc));
 const fav=[],adv=[],notes=[];
 // bhava-lordship discussion rows (48.2-8)
 const bhavaCharcha=lordOf.map(h=>({house:h,text:BHAVA48[h],ref:'BPHS 48.2-8'}));
 // 48.9: 9th or 10th lord conjunct 5th lord - read per lord, both not required
 const fifth=SIGN_LORD[(asc+4)%12];
 if(isLordOf([9,10])&&conjSet.includes(fifth)){const nl=[9,10].filter(h=>lordOf.includes(h)).map(h=>h+'वें').join('/');fav.push({ref:'BPHS 48.9',text:nl+'-स्वामी की 5वें-स्वामी ('+GRAHA_HI[fifth]+') से युति; प्रत्येक स्वामी अलग पढ़ा गया है, दोनों की युति एक साथ आवश्यक नहीं।'});}
 // 48.10: other planet associated with 5th lord - chosen pronoun reading: the other planet's dasha
 if(lord!==fifth&&conjSet.includes(fifth))fav.push({ref:'BPHS 48.10',text:'5वें-स्वामी ('+GRAHA_HI[fifth]+') से युति; "any other planet" का चुना पठन: युति पाने वाले अन्य ग्रह ('+GRAHA_HI[lord]+') की दशा — सर्वनाम-अस्पष्टता दर्ज।'});
 // 48.11: 10th/4th lord associated with 9th lord
 const ninth=SIGN_LORD[(asc+8)%12];
 if(isLordOf([10,4])&&conjSet.includes(ninth)&&ninth!==lord)fav.push({ref:'BPHS 48.11',text:(isLordOf([10])?'10वें':'4वें')+'-स्वामी का 9वें-स्वामी ('+GRAHA_HI[ninth]+') से संबंध।'});
 // 48.12-13: kendra lord in trikona or trikona lord in kendra (placement, computable)
 const inK=KENDRA.includes(cx.house),inT=TRIKONA.includes(cx.house);
 if((isLordOf(KENDRA)&&inT)||(isLordOf(TRIKONA)&&inK))fav.push({ref:'BPHS 48.12-13',text:(isLordOf(KENDRA)?'केंद्र-स्वामी त्रिकोण में':'त्रिकोण-स्वामी केंद्र में')+' स्थित — अत्यंत अनुकूल कहा गया।'});
 // 48.14: 6/8/12 lord associated with trikona lord
 const trikonaLords=lordsOf(TRIKONA);
 if(isLordOf(DUSTHANA)&&conjSet.some(c=>trikonaLords.includes(c)))fav.push({ref:'BPHS 48.14',text:'6/8/12-स्वामी का त्रिकोण-स्वामी से संबंध — अनुकूल कहा गया (48.18 की प्रतिकूल पंक्ति के साथ अतिव्यापन हो तो दोनों दिखाए जाते हैं, निर्णय-नेटिंग नहीं)।'});
 // 48.14-15: dasha of planet conjunct one who is kendra-lord-in-trikona or trikona-lord-in-kendra
 const special=conjSet.filter(c=>{const cl=[...Array(12)].map((_,i)=>i+1).filter(h=>SIGN_LORD[(asc+h-1)%12]===c);const ch=house(p[c].rashi,asc);return (cl.some(h=>KENDRA.includes(h))&&TRIKONA.includes(ch))||(cl.some(h=>TRIKONA.includes(h))&&KENDRA.includes(ch));});
 if(special.length)fav.push({ref:'BPHS 48.14-15',text:'युति ग्रह '+special.map(c=>GRAHA_HI[c]).join(', ')+' केंद्र/त्रिकोण-स्वामी होकर त्रिकोण/केंद्र में है — युति पाने वाले की दशा अनुकूल कही गई।'});
 // 48.16-17.5: mutual lagnesh-dharmesh and lagnesh-karmesh placements
 const lagnesh=SIGN_LORD[asc],karmesh=SIGN_LORD[(asc+9)%12];
 if(placedIn(ninth,[1])&&placedIn(lagnesh,[9])&&(lord===lagnesh||lord===ninth))fav.push({ref:'BPHS 48.16-17',text:'धर्मेश लग्न में और लग्नेश धर्म में — दोनों की दशा अत्यंत अनुकूल कही गई।'});
 if(placedIn(karmesh,[1])&&placedIn(lagnesh,[10])&&(lord===lagnesh||lord===karmesh))fav.push({ref:'BPHS 48.17-17½',text:'कर्मेश लग्न में और लग्नेश कर्म में — "राज्य-प्राप्ति" की परंपरागत ऐतिहासिक पदावली।'});
 // 48.18-20 adverse group
 if(isLordOf([3,6,11]))adv.push({ref:'BPHS 48.18',text:'3/6/11-भाव का स्वामी — प्रतिकूल चर्चा।'});
 if([3,6,11].includes(cx.house)){if(cx.node)notes.push('BPHS 48.20: राहु/केतु 3/6/11 में अनुकूल बताए गए हैं — प्रतिकूल स्थिति-पंक्ति इस अपवाद से नहीं लगाई गई।');else adv.push({ref:'BPHS 48.18',text:'3/6/11 भाव में स्थिति — प्रतिकूल चर्चा।'});}
 const adhLords=lordsOf([3,6,11]),placed3611=planets.filter(q=>!['Rahu','Ketu'].includes(q.graha)&&[3,6,11].includes(house(q.rashi,asc))).map(q=>q.graha);
 const adhPartners=conjSet.filter(c=>adhLords.includes(c)||placed3611.includes(c));
 if(adhPartners.length)adv.push({ref:'BPHS 48.18',text:'3/6/11-स्वामी या उन भावों में स्थित ग्रह ('+adhPartners.map(c=>GRAHA_HI[c]).join(', ')+') से युति — प्रतिकूल चर्चा।'});
 const nodePartner=conjSet.filter(c=>['Rahu','Ketu'].includes(c)&&[3,6,11].includes(house(p[c].rashi,asc)));
 if(nodePartner.length&&!cx.node)notes.push('BPHS 48.18/48.20: युति में '+nodePartner.map(c=>GRAHA_HI[c]).join(', ')+' 3/6/11 में है; राहु/केतु-अपवाद के कारण इस युति-पंक्ति की प्रतिकूलता अनिश्चित मानी गई, पंक्ति नहीं लगाई।');
 // 48.19 maraka group - technical term only, death inference fully omitted
 const marakaLords=lordsOf([2,7]);
 if(conjSet.some(c=>marakaLords.includes(c))||[2,7].includes(cx.house))adv.push({ref:'BPHS 48.19',text:'मारक-भाव (2/7) के स्वामी से युति या 2/7 में स्थिति — प्रतिकूल चर्चा; "मारक" तकनीकी शब्द है।'});
 if(cx.house===8)adv.push({ref:'BPHS 48.20',text:'8वें भाव में स्थिति — प्रतिकूल चर्चा।'});
 // 48.1 joint dignity+house: only the two addressed combinations; mixed = source silent
 let d48=null;
 const goodHouse=!DUSTHANA.includes(cx.house);
 if(cx.dignity==='उच्च राशि'&&goodHouse)d48={ref:'BPHS 48.1',kind:'fav',text:'उच्च राशि + शुभ भाव (6/8/12 के बाहर, 48.5-8 सूची से; "त्रिकोण आदि" खुला वाक्य) — संयुक्त रूप से अनुकूल कहा गया।'};
 else if(cx.dignity==='नीच राशि'&&!goodHouse)d48={ref:'BPHS 48.1',kind:'adv',text:'नीच राशि + 6/8/12 भाव — संयुक्त रूप से प्रतिकूल कहा गया।'};
 else if(['उच्च राशि','नीच राशि'].includes(cx.dignity))notes.push('BPHS 48.1: '+(cx.dignity==='उच्च राशि'?'उच्च राशि परंतु 6/8/12 भाव':'नीच राशि परंतु 6/8/12 के बाहर का भाव')+' — स्रोत इस मिश्रित संयोजन पर मौन है; अनुमान नहीं जोड़ा गया।');
  const d48x=(!d48&&cx.degreeZone&&cx.degreeZone.zone==='मूलत्रिकोण क्षेत्र'&&goodHouse)?{ref:'BPHS 48.1',kind:'fav-expanded',text:'"उच्चादि" का विस्तृत पठन (स्पष्ट व्याख्या-विकल्प, शाब्दिक पाठ नहीं): मूलत्रिकोण क्षेत्र + शुभ भाव — अनुकूल माना गया; शाब्दिक पंक्ति केवल उच्च राशि कहती है, स्वराशि सम्मिलित पठन अभी खुला है।'}:null;
  const d48xm=(!d48x&&cx.degreeZone&&cx.degreeZone.zone==='मूलत्रिकोण क्षेत्र'&&!goodHouse)?{ref:'BPHS 48.1',kind:'mixed-silent',text:'"उच्चादि" विस्तृत पठन के लिए भी मौन संयोजन (स्पष्ट अभिलेख, शाब्दिक पाठ नहीं): मूलत्रिकोण क्षेत्र + 6/8/12 भाव — स्रोत इस मिश्रित स्थिति पर मौन है; अनुकूल या प्रतिकूल अनुमान नहीं जोड़ा गया।'}:null;
 return {lord,cx,lordOf,bhavaCharcha,d48,d48x,d48xm,fav,adv,notes,unmodeled:['दशा-आरम्भ का गोचर (48.5-8 इसे आवश्यक कहता है)','दृष्टि-आधारित अनुकूलता (48.14-17½)','स्वराशि सम्मिलित "उच्चादि" पठन (खुला)']};}
function dashaContext(planets,asc,lord){signCheck(asc,'Lagna');planetsCheck(planets,['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'],'natal planet');if(!DASHA_PHAL[lord])throw Error('Unknown dasha lord '+lord);const p=Object.fromEntries(planets.map(q=>[q.graha,q])),g=p[lord];if(!g)throw Error('Missing planet '+lord);const node=lord==='Rahu'||lord==='Ketu',h=house(g.rashi,asc),zone=h===1?'केंद्र और त्रिकोण (लग्न भाव)':kendra(h)?'केंद्र':[5,9].includes(h)?'त्रिकोण':[6,8,12].includes(h)?'6/8/12':'अन्य',conj=planets.filter(q=>q.graha!==lord&&q.rashi===g.rashi).map(q=>q.graha);let dignity=null;
if(!node){dignity=DASHA_EX[lord]===g.rashi?'उच्च राशि':(DASHA_EX[lord]+6)%12===g.rashi?'नीच राशि':DASHA_OWN[lord].includes(g.rashi)?'स्वराशि':'अन्य राशि (मित्रता का निर्णय नहीं)';}
const lordOf=[];for(let bh=1;bh<=12;bh++)if(SIGN_LORD[(asc+bh-1)%12]===lord)lordOf.push(bh);
return {lord,node,house:h,zone,dignity,degreeZone:degreeZoneOf(lord,g.rashi,g.degreesInRashi),conjunct:conj,lordOf,phal:DASHA_PHAL[lord],para:GRAHA_PARA,omissions:DASHA_OMIT[lord].slice()};}
function panchaMaha(ys){const by={};for(const y of ys){if(!y.name.includes('पंचमहापुरुष')||!y.hit)continue;const[yoga,origin]=y.id.split('-');(by[yoga]=by[yoga]||{name:y.name,origins:[]}).origins.push(origin);}const entries=Object.values(by);return {count:entries.length,entries};}
function doshaGeometry(planets,asc,transit){signCheck(asc,'Lagna');planetsCheck(planets,['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'],'natal planet');planetsCheck(transit,['Saturn'],'transit planet');for(const p of planets)if(['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu'].includes(p.graha))angleCheck(p.longitude,p.graha+' longitude');const p=Object.fromEntries(planets.map(p=>[p.graha,p])),mars=house(p.Mars.rashi,asc),rahu=p.Rahu.longitude,dist=x=>((x-rahu)%360+360)%360,positions=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].map(k=>dist(p[k].longitude));const edge=positions.some(x=>Math.min(x,Math.abs(x-180),360-x)<.01),oneSide=positions.every(x=>x>0&&x<180)||positions.every(x=>x>180&&x<360),sat=house(transit.find(p=>p.graha==='Saturn').rashi,p.Moon.rashi);return {marsHouse:mars,marsPlacement:[1,4,7,8,12].includes(mars),axis:edge?'सीमा के निकट, अनिर्णीत':oneSide?'सातों ग्रह एक अर्धवृत्त में':'सातों ग्रह एक अर्धवृत्त में नहीं',saturnFromMoon:sat,sadeSati:{12:'पहला',1:'दूसरा',2:'तीसरा'}[sat]||null};}
// BPHS ch52-60 antardasha (pair) layer: pair-local conditions only, from the reviewed ledger (docs/antardasha-ledger-draft.md).
// Pair-local guard: conditions are never harmonized across pairs (e.g. ch60.55-57 counts Labh/11th adverse; ch55.1-4 counts Ari/6th favourable).
let PAIRS=null;
function dashaPairsData(){if(PAIRS)return PAIRS;const src=(typeof module!=='undefined'&&module.exports)?require('./kundli-dasha-pairs.js'):root.BrahmDashaPairs;if(!src||!src.DATA)throw Error('Antardasha pair data not loaded (kundli-dasha-pairs.js)');PAIRS=src.DATA;return PAIRS;}
function dashaPairContext(planets,asc,mahaLord,antarLord,paksha){
 signCheck(asc,'Lagna');
 planetsCheck(planets,['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'],'natal planet');
 const DATA=dashaPairsData(),rec=DATA.pairs[mahaLord]&&DATA.pairs[mahaLord][antarLord];
 if(!rec)throw Error('Unknown antardasha pair '+mahaLord+'-'+antarLord);
 if(paksha!==undefined&&paksha!=='shukla'&&paksha!=='krishna')throw Error('paksha must be shukla or krishna');
 const p=Object.fromEntries(planets.map(q=>[q.graha,q])),g=p[antarLord],m=p[mahaLord];
 const node=antarLord==='Rahu'||antarLord==='Ketu';
 const hL=house(g.rashi,asc),hM=mahaLord===antarLord?1:house(g.rashi,m.rashi);
 const favH=[],advH=[];
 if(rec.fl.includes(hL))favH.push({basis:'लग्न से '+hL+'वाँ भाव'});
 if(mahaLord!==antarLord&&rec.fm.includes(hM))favH.push({basis:'महादशा-स्वामी से '+hM+'वाँ भाव'});
 if(rec.al.includes(hL))advH.push({basis:'लग्न से '+hL+'वाँ भाव'});
 if(mahaLord!==antarLord&&rec.am.includes(hM))advH.push({basis:'महादशा-स्वामी से '+hM+'वाँ भाव'});
 // two-layer dignity, evaluated only where this pair's own text names the kind (digk); nodes stay unmodeled (mat-bhed)
 let dignity=null;
 if((rec.dig||rec.deb)&&!node)dignity=DASHA_EX[antarLord]===g.rashi?'उच्च राशि':(DASHA_EX[antarLord]+6)%12===g.rashi?'नीच राशि':DASHA_OWN[antarLord].includes(g.rashi)?'स्वराशि':'अन्य राशि (मित्रता का निर्णय नहीं)';
 const degreeZone=rec.dig?degreeZoneOf(antarLord,g.rashi,g.degreesInRashi):null;
 const dk=rec.digk||[];
 const digHit=!node&&((dk.includes('ex')&&dignity==='उच्च राशि')||(dk.includes('own')&&dignity==='स्वराशि')||(dk.includes('mt')&&degreeZone&&degreeZone.zone==='मूलत्रिकोण क्षेत्र'));
 const debHit=!!rec.deb&&!node&&dignity==='नीच राशि';
 if(digHit)favH.push({basis:'राशि-गरिमा की अनुकूल शर्त: '+(dignity==='उच्च राशि'?'उच्च राशि':dignity==='स्वराशि'?'स्वराशि':'मूलत्रिकोण क्षेत्र')+' बनी'});
 if(debHit)advH.push({basis:'नीच राशि की प्रतिकूल शर्त बनी'});
 const notes=[],omissions=[];
 if(rec.dig&&dk.includes('nav'))notes.push('इस युग्म के पाठ में नवांश-गरिमा भी शर्त है; नवांश इस परत में नहीं जाँची जाती — पूरी शर्त पाठ्य चर्चा में पढ़ें।');
 if(rec.dig&&dignity&&!digHit&&!debHit&&dignity!=='अन्य राशि (मित्रता का निर्णय नहीं)')notes.push('राशि-स्थिति '+dignity+' — इस युग्म के पाठ की नामित गरिमा-शर्त इससे नहीं बनती (शर्तें युग्म-विशेष हैं, पाठ्य चर्चा देखें)।');
 if(node)notes.push('राहु/केतु की राशि-गरिमा मत-भेद के कारण नहीं जाँची जाती; पाठ में कही गरिमा-बात केवल पाठ्य चर्चा है।');
 // paksha: only for pairs whose own text carries the waxing/waning modifier (all are Moon-antar pairs)
 let pakshaNote=null;
 if(rec.waxing||rec.waning){
  if(paksha==='shukla')pakshaNote=rec.waxing?'जन्म-चन्द्र शुक्ल-पक्ष (वर्धमान): स्रोत के अनुसार इस युग्म में पूर्ण फल की ओर।':'जन्म-चन्द्र शुक्ल-पक्ष (वर्धमान): इस युग्म की क्षीण-चन्द्र प्रतिकूल शर्त नहीं बनती।';
  else if(paksha==='krishna')pakshaNote=rec.waning?(rec.waxing?'जन्म-चन्द्र क्षीण (कृष्ण-पक्ष): स्रोत के अनुसार प्रभाव में कुछ कमी कही गई है।':'जन्म-चन्द्र क्षीण (कृष्ण-पक्ष): इस युग्म की क्षीण-चन्द्र प्रतिकूल शर्त बनती है।'):'जन्म-चन्द्र क्षीण (कृष्ण-पक्ष): स्रोत केवल वर्धमान पर पूर्ण फल कहता है, क्षीण पर पूर्णता की शर्त नहीं बनती।';
  else pakshaNote='चन्द्र-पक्ष उपलब्ध नहीं — इस युग्म की पक्ष-शर्त नहीं जाँची गई।';
 }
 if(rec.weak)notes.push('पाठ की "दुर्बल/बल-विहीन" चन्द्र-शर्त: बल-गणना (शड्बल) अनियंत्रित है, इसलिए यह शर्त कभी स्वतः नहीं लगाई जाती — केवल पाठ-चर्चा।');
 const sensCount=(rec.omitN||0)+(rec.maraka?1:0)+(rec.deathx?1:0);
 if(sensCount)omissions.push('इस युग्म के '+sensCount+' संवेदनशील अंश नीति से पूरी तरह हटाए गए (तकनीकी लोप, लोप-अभिलेख में दर्ज)।');
 if(rec.remedy)omissions.push('स्रोत का उपाय/दान/जप-अंश नीति से नहीं लिया गया (लोप-अभिलेख में दर्ज)।');
 if(rec.prov)omissions.push('स्वामित्व-टिप्पणी: इस युग्म के श्लोक-खंड की ऑनलाइन अध्याय-सूची में परिचय-पंक्ति नहीं है; स्वामित्व समीक्षक-सत्यापित स्थिति-मानचित्र (अध्याय 58) से लिया गया — मुद्रित पुष्टि बाकी।');
 if(rec.gap)omissions.push('स्रोत-अंतराल: ऑनलाइन पाठ में इसी अध्याय का श्लोक '+rec.gap+' अनुपलब्ध है; प्रपूरण नहीं किया गया।');
 return {mahaLord,antarLord,node,ch:rec.ch,rec:{ref:rec.ref,fav:rec.fav,adv:rec.adv,mid:rec.mid||null},houseFromLagna:hL,houseFromMaha:hM,dignity,degreeZone,favH,advH,paksha:paksha||null,pakshaNote,notes,omissions,
  unmodeled:['युति/दृष्टि-शर्तें','लग्नेश/योगकारक आदि स्वामित्व-संबंध शर्तें','नवांश-गरिमा','अस्तता','बल-गणना (शड्बल)','गोचर-शर्तें','दिशा/देवता-विशिष्ट पंक्तियाँ','काल-विभाजन की घड़ी-गणना (आरम्भ/मध्य/अंत की अवधियाँ)']};}
const METHODS={avakhada:{yoni:'Narada Purana 56 list, Uttara Ashadha = ox; modern nakula variant is not silently substituted',gana:'Customary 27-nakshatra table; Punarvasu deva differs from NP manushya',varna:'Element convention; Mithuna Brahmin in BPHS4 conflicts with air-Shudra',vashya:'Standard mapping; Karka jalachara and Simha vanachara have named variants',syllables:'Dekhopanchang 27-nakshatra table, classical attribution not independently verse-verified'},marsPlacement:'BPHS80.47 position limb only, no cancellation or final Manglik verdict',saturnRelationship:'Transit Saturn sign relative to natal Moon, customary 12/1/2 only',axis:'Modern numeric hemisphere diagnostic relative to Rahu axis only; 0.01 degree abstention tolerance is an engineering choice, not a classical rule'};const api={avakhada,yogas,panchaMaha,dashaContext,dashaBhava,dashaPairContext,bhavaLord,doshaGeometry,METHODS};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmRules=api;
})(typeof window!=='undefined'?window:globalThis);
