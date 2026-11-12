/* BrahmTatva native kundli suite UI. Original presentation, no copied readings. */
(function(){'use strict';
window.BrahmSuite={render(ctx){
const {A,J,ps,lagna,birth,l,date,time,esc,R,N,G,T,Y,K,V,fmt,coords,item,chart,civilUTC}=ctx,$=id=>document.getElementById(id);
let layout='north',division=1,dashaSystem='vimshottari',path=[],currentTab='basic',d60Origin='natal';
const moon=ps.find(p=>p.graha==='Moon'),sun=ps.find(p=>p.graha==='Sun'),ls=Math.floor(lagna/30),name=$('birthName')?.value.trim()||'जन्मकुंडली';
const stamp=d=>new Intl.DateTimeFormat('hi-IN-u-nu-latn',{timeZone:l.timeZone,day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(d));
const signLord=s=>G[J.LORDS[s]],nkLord=n=>G[J.VIM[n%9][0]],deg=x=>`${Math.floor(J.mod(x,30))}°${String(Math.floor(J.mod(x,1)*60)).padStart(2,'0')}'${String(Math.floor(J.mod(x*60,1)*60)).padStart(2,'0')}"`;
const panel=(title,body)=>`<section class="astro-panel"><h3>${title}</h3>${body}</section>`;
const pending=(title,why)=>panel(title,`<p class="suite-pending">अधूरा · अभी परिणाम नहीं दिखाया जाता</p><p>${why}</p>`);
function bhavaphalPanel(){if(!window.BrahmBhavaPhal||!window.BrahmStates)return '';let rep;try{rep=BrahmBhavaPhal.report(ps.map(p=>({graha:p.graha,rashi:p.rashi,degreesInRashi:p.degreesInRashi})),ls,BrahmStates.baladi);}catch(e){return panel('भाव-विचार (E1)','<p class="astro-note">भाव-विचार इस चार्ट पर उपलब्ध नहीं: '+esc(e.message)+'</p>');}
const rows=b=>{const k=b.karakatva;return `<details><summary>भाव ${b.bhava} · ${b.signName} · स्वामी ${b.lordName}</summary>
<p><strong>करकत्व</strong> (BPHS ${k.sloka}): ${k.items.join(', ')}${k.omitted?`<br><small class="source-note">${rep.omissionNote}</small>`:''}</p>
<p><strong>भाव-कारक</strong> (32.34): ${b.karakaName}</p>
<p><strong>स्वामी की स्थिति</strong>: ${b.lordSignName} (${b.lordBhava}वाँ भाव) · बालादि-अवस्था: ${b.lordBaladi} <small>(BPHS 45.3 का अवस्था-शब्द; आयु/स्वास्थ्य नहीं)</small></p>
<p><strong>भाव में स्थित ग्रह</strong>: ${b.occupantNames.join(', ')||'सप्तग्रह में कोई नहीं (राहु/केतु अमॉडल)'}</p>
<p><strong>भाव पर दृष्टि</strong>: ${b.aspects.length?b.aspects.map(a=>`${a.name} की ${a.type} (${a.cls})`).join('; '):'सप्तग्रह से कोई नहीं (राहु/केतु-दृष्टि अमॉडल)'} <small>(26.2-5 whole-sign)</small></p>
<p><strong>स्वामी स्व-भाव में स्थित</strong>: ${b.lordOccupiesOwn?'हाँ':'नहीं'} · <strong>स्वामी की दृष्टि स्व-भाव पर</strong>: ${b.lordAspectsOwn?'हाँ':'नहीं'}</p>
<p><strong>स्वामी की युति</strong>: ${b.lordConjDetail.length?b.lordConjDetail.map(c=>`${c.name} (${c.cls})`).join(', '):'सप्तग्रह में कोई नहीं (राहु/केतु-युति अमॉडल)'}</p>
<p><strong>युति 3/6/8/11/12-भाव-स्वामियों से</strong> (11.15-16): ${b.lordWithEvilNames.join(', ')||'कोई नहीं'}</p>
<p><strong>स्वामी 10H में स्थित</strong> (11.14): ${b.lordIn10H?'हाँ':'नहीं'}</p></details>`;};
return panel('भाव-विचार: करकत्व और स्वामी-स्थिति (E1)',`<p>परंपरा में वर्णित तथ्य-पंक्तियाँ; भविष्यकथन या निश्चय नहीं। whole-sign भाव लग्न से; Sripati-madhya ज्यामिति अलग खंड में है। राहु/केतु की युति/दृष्टि इस चरण में अमॉडल है; नीचे की पंक्तियाँ सप्तग्रह तक सीमित हैं।</p>
<div class="suite-yogas">${rep.bhavas.map(rows).join('')}</div>
<h4>भाव-समृद्धि की ग्रंथ-चर्चा (11.14-16)</h4><p>${rep.discussion}</p><p class="astro-note">${rep.noSynthesis}</p>
<p class="source-note">इस कुंडली में वर्ग-गतिशीलता: चन्द्र — ${esc(rep.classes.Moon.note)} (${rep.classes.Moon.cls}); बुध — ${esc(rep.classes.Mercury.note)} (${rep.classes.Mercury.cls})। (BPHS 3.11)</p>
<p class="source-note">अमॉडल इस चरण में: ${rep.unmodeled.join('; ')}।</p>
<p class="source-note">करकत्व: ${rep.karakatvaSource} · कारक: ${rep.karakaSource} · ${rep.matbhedNote} · दृष्टि: ${rep.drishtiSource} · वर्ग: ${rep.classSource}। अनुवाद-शब्द अंग्रेजी सूचियों से संकलित; verbatim उद्धरण नहीं।</p>`);}

function yutiphalPanel(){if(!window.BrahmYutiPhal)return '';let rep;try{rep=BrahmYutiPhal.report(ps,ls);}catch(e){return panel('द्वि-ग्रह युति (E2)','<p class="astro-note">युति-विचार इस चार्ट पर उपलब्ध नहीं: '+esc(e.message)+'</p>');}
const row=r=>`<details><summary>${esc(r.pairName)} · ${r.signName} · लग्न से ${r.house}वाँ भाव</summary>
<p><strong>परंपरा में वर्णित</strong> (Saravali ${r.sloka}): ${esc(r.text)}</p>
${r.frame?`<p class="astro-note">${esc(r.frame)}</p>`:''}${r.illness?`<p class="astro-note">${esc(r.illness)}</p>`:''}${r.omit?`<p class="source-note">तकनीकी लोप: 1 वाक्य सुरक्षा-नीति से हटाया गया (ऑडिट दर्ज)</p>`:''}
<small class="source-note">${esc(r.source)}</small></details>`;
const body=rep.rows.length?rep.rows.map(row).join(''):'<p>सप्तग्रहों में कोई समान-राशि द्वि-ग्रह युति नहीं (राहु/केतु अमॉडल)।</p>';
return panel('द्वि-ग्रह युति: परंपरा-वर्णित पंक्तियाँ (E2)',`<p>${esc(rep.scope)} समान whole-sign राशि = युति; 21 अक्रमित युग्म (Saravali ch15)।</p>
<div class="suite-yogas">${body}</div>
${rep.ch16Note?`<p class="astro-note">${esc(rep.ch16Note)} (त्रि-ग्रह राशि: ${rep.triSigns.join(', ')})</p>`:''}
<p class="source-note">${esc(rep.vargaNote)} दृष्टि-फल-वाक्य अमॉडल (कोई नामित श्लोक-पिन नहीं)। रोग-शब्द केवल ऐतिहासिक वर्ग; निदान/भविष्यवाणी नहीं। पति/पत्नी-विषयक पुराने वाक्य ऐतिहासिक कलंकित भाषा के रूप में चिह्नित — किसी वास्तविक व्यक्ति का मूल्यांकन नहीं। स्रोत: ${esc(rep.source)}।</p>`);}


function e3YogaPanel(){if(!window.BrahmLagnaYoga)return '';let rep;try{rep=BrahmLagnaYoga.report(ps,ls);}catch(e){return panel('लग्न/सूर्य-आधारित योग (E3)','<p class="astro-note">योग-विचार इस चार्ट पर उपलब्ध नहीं: '+esc(e.message)+'</p>');}
const BASE={vesi:'वेशि',vasi:'वसि',ubhayachari:'उभयचरि',kartari:'कर्तरि',susubha:'सुशुभ',amala:'अमल'};
const row=r=>{const status=r.status==='बनी'?'बनी':r.status;
return `<details><summary>${esc(r.variant||BASE[r.key]||r.key)} · स्थिति: ${status}</summary>
<p><strong>जाँच</strong>: ${esc(r.reason)}</p>
${r.phal?`<p><strong>परंपरा में वर्णित</strong> (${esc(r.sloka)}): ${esc(r.phal)}</p>`:''}
${r.omit?`<p class="source-note">तकनीकी लोप: ${r.omit} वाक्य सुरक्षा-नीति से हटाए गए (ऑडिट दर्ज)</p>`:''}
${r.note?`<p class="astro-note">${esc(r.note)}</p>`:''}
<small class="source-note">${esc(r.amala?rep.amalaSource:rep.source)}</small></details>`;};
return panel('लग्न/सूर्य-आधारित योग: वेशि-वसि आदि (E3)',`<p>${esc(rep.scope)}</p>
<div class="suite-yogas">${rep.rows.map(row).join('')}</div>
<p class="astro-note">${esc(rep.matbhedNote)}</p>
<p class="source-note">${esc(rep.source)} · ${esc(rep.amalaSource)}</p>`);}


function e4YogaPanel(){if(!window.BrahmVisheshYoga)return '';let rep;try{rep=BrahmVisheshYoga.report(ps,ls);}catch(e){return panel('विशेष योग (E4)','<p class="astro-note">योग-विचार इस चार्ट पर उपलब्ध नहीं: '+esc(e.message)+'</p>');}
const BASE={mahabhagya:'महाभाग्य',vasumat:'वसुमत्',pushkala:'पुष्कल',subhamala:'शुभमाला',asubhamala:'अशुभमाला',lakshmi:'लक्ष्मी',gauri:'गौरी'};
const row=r=>{const status=r.status==='बनी'?'बनी':r.status;
return `<details><summary>${esc(r.variant||BASE[r.key]||r.key)} · स्थिति: ${status}</summary>
<p><strong>जाँच</strong>: ${esc(r.reason)}</p>
${r.phal?`<p><strong>परंपरा में वर्णित</strong> (${esc(r.sloka)}): ${esc(r.phal)}</p>`:''}
${r.omit?`<p class="source-note">तकनीकी लोप: ${r.omit} वाक्य/पद सुरक्षा-नीति से हटाए गए (ऑडिट दर्ज)</p>`:''}
${r.note?`<p class="astro-note">${esc(r.note)}</p>`:''}
${r.source?`<small class="source-note">${esc(r.source)}</small>`:''}</details>`;};
return panel('विशेष योग: महाभाग्य, वसुमत्, पुष्कल, शुभमाला-अशुभमाला, लक्ष्मी, गौरी (E4)',`<p>${esc(rep.scope)}</p>
<div class="suite-yogas">${rep.rows.map(row).join('')}</div>
<p class="astro-note">${esc(rep.anomalyNote)}</p>
<p class="astro-note">व्याख्या-निर्णय दर्ज: ${esc(rep.decisions)}</p>
<p class="source-note">${esc(rep.source)}</p>`);}

function balaPanel(){
 const B=window.BrahmBala;
 if(!B)return pending('षड्बल (आंशिक घटक)','गणना-मॉड्यूल नहीं मिला; बिना आधार के घटक अनुमान से नहीं दिखाए जाते।');
 try{
  const daily=A.dailyPanchanga(birth,l);
  const civilWeekday=Number(new Intl.DateTimeFormat('en-US',{timeZone:l.timeZone,weekday:'short'}).format(birth).replace(/.*/,x=>['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(x)));
  if(!daily.sunrise||!daily.sunset)return pending('षड्बल (आंशिक घटक)','इस अक्षांश/दिन पर सामान्य सूर्योदय या सूर्यास्त नहीं; बिना समय-आधार के घटक अनुमान से नहीं दिखाए जाते।');
  // ज्योतिष-दिन rollover: सूर्योदय से पहले का जन्म पिछले नागरिक दिन के सूर्योदय/वार/सूर्यास्त से चलता है
  let sr=+new Date(daily.sunrise),ss=+new Date(daily.sunset),weekday=civilWeekday,ns;
  if(+birth<sr){
   const prev=A.dailyPanchanga(civilUTC(B.previousLocalDateString(+birth,l.timeZone),'12:00',l.timeZone),l);
   if(!prev.sunrise||!prev.sunset)return pending('षड्बल (आंशिक घटक)','पिछले दिन का सूर्योदय/सूर्यास्त अनुपलब्ध (ध्रुवीय अवस्था); बिना समय-आधार के घटक अनुमान से नहीं दिखाए जाते।');
   sr=+new Date(prev.sunrise);ss=+new Date(prev.sunset);weekday=(civilWeekday+6)%7;ns=+new Date(daily.sunrise);
  }else{const next=A.riseSet('rise',A.nextLocalDayStartUTC(birth,l.timeZone),l);ns=next?+new Date(next):undefined;}
  const transit=B.solarTransitMs(sr,ss,l.longitude,t=>A.grahaPositions(new Date(t)).find(g=>g.graha==='Sun').longitude,t=>A.ayanamsha(new Date(t)));
  const cheshtaCtx=(typeof A.astroTt==='function'&&typeof A.meanAyanamsha==='function')?{jdTt:2451545+A.astroTt(birth),meanAyanamsha:A.meanAyanamsha(birth),birthMs:+birth}:undefined; // assembly contract: every field from the SAME birth instant
  const out=B.compute({positions:ps.filter(p=>B.PLANETS.includes(p.graha)),lagna,birthMs:+birth,weekday,sunriseMs:sr,sunsetMs:ss,nextSunriseMs:ns,transitMs:transit,ayanamsa:A.ayanamsha(birth),varga:(lon,n)=>J.varga(lon,n),cheshtaCtx});
  const f2=x=>x==null?'—':(Math.round(x*100)/100).toFixed(2);
  const VARGA_LABEL={1:'राशि',2:'होरा',3:'द्रेष्काण',7:'सप्तमांश',9:'नवमांश',12:'द्वादशांश',30:'त्रिंशांश'};
  const REL_LABEL={mt:'मूलत्रिकोण',own:'स्व',greatfriend:'अधिमित्र',friend:'मित्र',neutral:'सम',enemy:'शत्रु',greatenemy:'अधिशत्रु'};
  const vargTxt=s=>s.saptavargaja.total+' = '+s.saptavargaja.detail.map(d=>`${VARGA_LABEL[d.varga]||('D'+d.varga)} ${d.value} (${REL_LABEL[d.relation]||d.relation})`).join(', ');
  const comp=(p,s)=>`<table class="suite-bala"><tbody><tr><th>उच्च</th><td>${f2(s.sthana.uchcha)}</td></tr><tr><th>सप्तवर्गज</th><td>${vargTxt(s.sthana)}</td></tr><tr><th>ओझ-युग्म</th><td>${f2(s.sthana.ojhayugma)}</td></tr><tr><th>केन्द्रादि</th><td>${f2(s.sthana.kendradi)}</td></tr><tr><th>द्रेष्काण</th><td>${f2(s.sthana.drekkana)}</td></tr><tr><th>दिग्बल</th><td>${f2(s.dig)}</td></tr><tr><th>नाथोन्नथ</th><td>${f2(s.kala.nathonnatha)}</td></tr><tr><th>पक्ष</th><td>${f2(s.kala.paksha)}</td></tr><tr><th>त्रिभाग</th><td>${f2(s.kala.tribhaga)}</td></tr><tr><th>अब्द (रामन/श्रीपति)</th><td>${f2(s.kala.abda)}</td></tr><tr><th>मास (रामन/श्रीपति)</th><td>${f2(s.kala.masa)}</td></tr><tr><th>वार</th><td>${f2(s.kala.vara)}</td></tr><tr><th>होरा</th><td>${f2(s.kala.hora)}</td></tr><tr><th>अयन (खंड)</th><td>${f2(s.kala.ayana)}</td></tr><tr><th>चेष्टा ${(p==='Sun'||p==='Moon')?'(27.18)':'(27.24-25*)'}</th><td>${s.cheshta==null?'—':f2(s.cheshta)}</td></tr><tr><th>नैसर्गिक</th><td>${f2(s.naisargika)}</td></tr><tr><th>दृक्*</th><td>${f2(s.drik)}</td></tr></tbody></table>`;
  const byG={};out.planets.forEach(x=>{byG[x.graha]=x;});
  const rows=B.PLANETS.map(p=>{const s=byG[p];return `<tr><th>${G[p]}</th><td>${f2(s.sthana.total)}</td><td>${f2(s.dig)}</td><td>${f2(s.kala.total)}</td><td>${s.cheshta==null?'—':f2(s.cheshta)}</td><td>${f2(s.naisargika)}</td><td>${f2(s.drik)}</td><td><strong>${f2(s.partialSum)}</strong></td></tr><tr class="suite-bala-detail"><td colspan="8"><details><summary>${G[p]} — घटक-विभाजन</summary>${comp(p,s)}</details></td></tr>`;}).join('');
  return panel('षड्बल: घटक-विभाजन (आंशिक — पूर्ण बल नहीं)',`
   <p>नीचे के योग <strong>आंशिक</strong> हैं — ग्रह-युद्ध और भावबल अभी अगणित हैं, और <strong>दृक्बल प्रायोगिक है, आंशिक योग में नहीं जोड़ा गया</strong>; इसलिए कुल षड्बल या आवश्यक-अनुपात (required ratio) जानबूझकर नहीं दिखाया गया। दिग्बल अलग स्तम्भ है (स्थान-योग में नहीं)। जाँच का दायरा: <strong>सूत्र-परीक्षण</strong> सभी दिखाए घटकों को cover करते हैं; <strong>चुनी गई रामन-उदाहरण जाँचें</strong> नाथोन्नथ, पक्ष (बुध छोड़कर), त्रिभाग, वार और होरा तक सीमित हैं; अब्द/मास रामन की चुनी convention की reproduction है; दिग्बल की रामन-सारणी की 5 पंक्तियाँ स्रोत-चाप (arc) सूत्र से मिलती हैं (2 दोषपूर्ण पंक्तियाँ दर्ज कर हटाई गईं)। शेष घटकों की प्रकाशित-उदाहरण जाँच अधूरी है। दृक्बल अभी केवल चुने सूत्र के व्यक्तिगत आगामी-दृष्टि परीक्षणों तक सीमित है।</p>
   <p class="source-note suite-bala-hint">⇠ तालिका को बाईं-दाईं ओर खिसकाएँ ⇢</p>
   <div class="suite-bala-scroll"><table class="suite-bala"><thead><tr><th>ग्रह</th><th>स्थान-योग</th><th>दिग्</th><th>काल-योग</th><th>चेष्टा</th><th>नैसर्गिक</th><th>दृक्*</th><th>आंशिक योग</th></tr></thead><tbody>${rows}</tbody></table></div>
   <p class="source-note">* दृक्बल <strong>प्रायोगिक</strong>: BPHS26.6-12 स्फुट-दृष्टि वक्र (दृष्टि-लक्ष्य − दृष्टि-कर्ता, 26.6) + 27.19 भार; शुभ/पाप वर्गीकरण एक चुनी हुई convention है — बुध-दृष्टि शुभ होने पर पूर्ण, सूर्य/मंगल/शनि-संयोगी बुध पर दृष्टा-घटाव (3.11), गुरु सदा पूर्ण, शेष शुभ +चतुर्थांश/पाप −चतुर्थांश। सत्यापित वर्गीकरण-fixture आने तक आंशिक योग से बाहर। चेष्टा (27.18) में सूर्य/चन्द्र — सूर्य का चेष्टा उसका अयन-मान, चन्द्र का उसका पक्ष-मान (पाठ में ही यही समानता है; दोनों बकेट में जानबूझकर एक-एक बार)। * मंगल-शनि की चेष्टा (27.24-25) माध्य-देशान्तर के नामित आधुनिक convention से: Simon et al. 1994 sec5.9 mean elements (VSOP87/JASON84-आधारित, of-date mean equinox) — शास्त्रीय माध्य-स्रोत नहीं; frame: apparent-geocentric निरयण + माध्य अयनांश; TDB≈TT (IAU2006B3); केवल 1900-2100 में गणना, उसके बाहर — (शून्य नहीं)। जाँच: रामन 1918 के प्रकाशित गोल निवेश-मानों से (0.008334 विरूपा सीमा), आधुनिक स्वर्ण-नमूनों से नहीं। अब्द/मास के सूत्र BPHS-अनुवाद में नहीं हैं; रामन/श्रीपति-गणित लेबल के साथ, epoch 1827-05-01। अयन-बल खंड-सूत्र से; रामन की 15°-खंड interpolation-तालिका एक अलग पद्धति है, इसलिए उनके मुद्रित अयन-मान खंड-सूत्र की सटीकता-सीमा नहीं हैं। सप्तवर्गज में compound-मित्रता, BPHS-विरूपा मान और मूल त्रिकोण 45 केवल D1 में BPHS3.51-54 अंश-क्षेत्र तक (रामन का पूर्ण-राशि पठन अलग convention, दर्ज)। पक्ष: बुध BPHS27.11 के सीधे पठन से प्रथम वर्ग में; रामन सूर्य-संयोग/ast भंगुरता पर बुध को पाप मानते हैं — यह जानी-दर्ज convention-भिन्नता है, अनुमान नहीं। एकल ऑनलाइन अनुवाद का सूत्र-उपयोग; मुद्रित-श्लोक सत्यापन बाकी, मूल पाठ verbatim नहीं लिया गया।</p>`);
 }catch(e){return pending('षड्बल (आंशिक घटक)','गणना त्रुटि: '+e.message);}
}
function bhavaTermsPanel(){
 const BV=window.BrahmBhava;
 if(!BV)return pending('भावबल: घटक-शर्तें (27.26-31)','गणना-मॉड्यूल नहीं मिला; बिना आधार के घटक अनुमान से नहीं दिखाए जाते।');
 try{
  // Birth-moment day events from the CIVIL date plus NEIGHBOR windows (previous sunset /
  // next sunrise) - NOT the Kala jyotish-day context: a birth
  // before today's sunrise is today's MORNING twilight; an evening window can cross midnight.
  const ev=BV.civilBhavaEvents(A,birth,l);
  if(!ev)return pending('भावबल: घटक-शर्तें (27.26-31)','इस अक्षांश/दिन पर सामान्य सूर्योदय या सूर्यास्त नहीं; उदय-प्रकार शर्त अनुमान से नहीं दिखाई जाती।');
  const sr=ev.sunriseMs,ss=ev.sunsetMs;
  if(typeof A.gastHours!=='function')return pending('भावबल: घटक-शर्तें (27.26-31)','MC के लिए आवश्यक समय-सहायक उपलब्ध नहीं; भाव-मध्य अनुमान से नहीं दिखाए जाते।');
  const ramc=J.mod(15*A.gastHours(birth)+l.longitude);
  const r=ramc*Math.PI/180,e=A.trueObliquity(birth)*Math.PI/180;
  const mcTrop=J.mod(Math.atan2(Math.sin(r),Math.cos(r)*Math.cos(e))*180/Math.PI);
  const mc=J.mod(mcTrop-A.ayanamsha(birth,{nutation:true})); // चार्ट-लग्न के समान frame (apparent-of-date)
  const asc=lagna,desc=J.mod(lagna+180),ic=J.mod(mc+180);
  const out=BV.compute({positions:ps.filter(p=>BrahmBala.PLANETS.includes(p.graha)),asc,ic,desc,mc,birthMs:+birth,sunriseMs:sr,sunsetMs:ss,prevSunsetMs:ev.prevSunsetMs,nextSunriseMs:ev.nextSunriseMs});
  const RT={shirshodaya:'शीर्षोदय',prishthodaya:'पृष्ठोदय',ubhayodaya:'उभयोदय'},DP={day:'दिन',night:'रात्रि',twilight:'संध्या-वर्ग*'};
  const f2=x=>(Math.round(x*100)/100).toFixed(2);
  const rows=out.bhavas.map(b=>`<tr><th>${b.bhava}</th><td>${R[Math.floor(b.madhya/30)]} ${deg(b.madhya)}</td><td>${RT[b.risingType]}</td><td>${f2(b.arc)}</td><td>${f2(b.rising)}</td><td>${f2(b.occupant)}${b.occupantCollision?' ⇄':''}</td><td>${b.occupants.map(o=>G[o]).join(', ')||'—'}</td></tr>`).join('');
  return panel('भावबल: घटक-शर्तें (27.26-31) — कुल नहीं',`
   <p>भाव-मध्य <strong>श्रीपति-मध्य geometry</strong> से (लग्न, MC, सप्तम, चतुर्थ के चतुर्थांश-त्रिभाग) — ऊपर के whole-sign चार्ट-भावों से <strong>अलग, स्पष्ट नामित</strong> विधि; चार्ट नहीं बदला गया। MC खगोलीय सूत्र से (RAMC = 15·GAST + देशान्तर); कुंडली के methods-पृष्ठ की cross-model भिन्नता (~कला-स्तर, 2100 पर +1.64″ GAST-प्रधान) दर्ज है।</p>
   <p class="source-note suite-bala-hint">⇠ तालिका को बाईं-दाईं ओर खिसकाएँ ⇢</p>
   <div class="suite-bala-scroll"><table class="suite-bala"><thead><tr><th>भाव</th><th>भाव-मध्य</th><th>उदय-प्रकार</th><th>चाप-शर्त (27.26-28)</th><th>उदय-शर्त (27.31)</th><th>अधिवास-शर्त (27.30)</th><th>अधिवासी ग्रह</th></tr></thead><tbody>${rows}</tbody></table></div>
   <p class="source-note">प्रत्येक शर्त <strong>अलग-अलग, स्रोत-लेबल</strong> है — कोई भावबल-कुल, अनुपात या क्रम <strong>नहीं</strong> बनाया गया। भावाधिपति-बल अवरोधित: उसके लिए प्रत्येक स्वामी का <strong>पूर्ण</strong> षड्बल-पिण्ड चाहिए और ग्रह-बल अभी अपूर्ण/प्रायोगिक है — अनुमान या प्रतिस्थापन नहीं। भाव-दृष्टि शर्तें अवरोधित: 27.28-29 के पठन में संशय (अतिरिक्त-पूर्ण बनाम प्रतिस्थापन) और दृक् वर्गीकरण प्रायोगिक है। अधिवास-शर्त की once-per-class पढ़न <strong>अस्थायी</strong> है; ⇄ = शुभ और पाप दोनों वर्ग उपस्थित, दोनों एक-एक बार गिने गए (दर्ज टकराव)। उदय-शर्त: संध्या-वर्ग* की 72-मिनट खिड़कियाँ BPHS 9.14 से <strong>अस्थायी हस्तांतरण</strong> हैं (46.44 का 5-घटिका पठन विकल्प दर्ज); सूर्योदय/सूर्यास्त ऊपरी-किनारा मानकर, अर्ध-कला अन्तर दर्ज अनुमान है। उदय-प्रकार Saravali 3.24 के वर्गों से; उभयोदय केवल मीन (BPHS 4.23)। दिन/रात्रि/संध्या-वर्ग: ${DP[out.bhavas[0].dayPart]} (जन्म-क्षण की नागरिक तारीख के सूर्योदय/सूर्यास्त और पड़ोसी खिड़कियाँ — पिछला सूर्यास्त व अगला सूर्योदय — से; संध्या खिड़की आधी रात पार कर सकती है; काल-गणना का ज्योतिष-दिन संदर्भ यहाँ लागू नहीं)।</p>`);
 }catch(e){return pending('भावबल: घटक-शर्तें (27.26-31)','गणना त्रुटि: '+e.message);}
}
function chalitPanel(){
 const BV=window.BrahmBhava;
 if(!BV)return pending('भाव चलित','गणना-मॉड्यूल नहीं मिला; बिना आधार के चलित-भाव अनुमान से नहीं दिखाए जाते।');
 try{
  // MC anchor: same RAMC->MC formula as the reviewed bhava-terms panel (RAMC = 15*GAST +
  // deshantar; apparent-of-date frame, same as the chart lagna). Deliberate re-type, not
  // shared code, so the reviewed panel's body stays untouched (git diff on this file shows
  // no change inside bhavaTermsPanel).
  if(typeof A.gastHours!=='function')return pending('भाव चलित','MC के लिए आवश्यक समय-सहायक उपलब्ध नहीं; भाव-मध्य अनुमान से नहीं दिखाए जाते।');
  const ramc=J.mod(15*A.gastHours(birth)+l.longitude);
  const r=ramc*Math.PI/180,e=A.trueObliquity(birth)*Math.PI/180;
  const mcTrop=J.mod(Math.atan2(Math.sin(r),Math.cos(r)*Math.cos(e))*180/Math.PI);
  const mc=J.mod(mcTrop-A.ayanamsha(birth,{nutation:true}));
  const asc=lagna,desc=J.mod(lagna+180),ic=J.mod(mc+180);
  BV.validateAnchors(asc,ic,desc,mc); // bad geometry surfaces as pending, never guessed
  const mad=BV.madhyas(asc,ic,desc,mc),bound=BV.boundaries(mad);
  const seven=ps.filter(p=>BrahmBala.PLANETS.includes(p.graha));
  if(seven.length!==7)return pending('भाव चलित','सातों ग्रहों की स्थिति नहीं मिली; आंशिक चलित-तालिका नहीं दिखाई जाती।');
  const rows=seven.map(p=>{
   const ws=J.house(p.longitude,lagna),ch=BV.bhavaOf(p.longitude,bound); // occupancy errors surface, never suppressed
   return {p,ws,ch,shifted:ws!==ch};});
  const trs=rows.map(x=>`<tr><th>${G[x.p.graha]}</th><td>${R[x.p.rashi]} ${deg(x.p.longitude)}</td><td>${x.ws}</td><td>${x.ch}</td><td>${x.shifted?`चलित भाव: ${x.ch} (whole-sign: ${x.ws})`:'—'}</td></tr>`).join('');
  return panel('भाव चलित (श्रीपति-मध्य परंपरा)',`
   <p>यह भाव-चलित दृश्य Sripati-madhya परंपरा पर आधारित है; ऊपर का मुख्य चार्ट whole-sign (राशि-भाव) परंपरा में है और अपरिवर्तित रहता है।</p>
   <p class="source-note suite-bala-hint">⇠ तालिका को बाईं-दाईं ओर खिसकाएँ ⇢</p>
   <div class="suite-bala-scroll"><table class="suite-bala"><thead><tr><th>ग्रह</th><th>राशि / अंश</th><th>whole-sign भाव</th><th>चलित भाव</th><th>स्थानांतरण-टिप्पणी</th></tr></thead><tbody>${trs}</tbody></table></div>
   <p class="source-note">राहु-केतु की भाव-चलित भागीदारी इस संस्करण में अमॉडल है। भाव-संधि पर ठीक स्थित ग्रह अगले भाव में गिना जाता है (अर्ध-खुला सीमा-नियम)। स्थानांतरण-टिप्पणी केवल तथ्यात्मक है; इस दृश्य से कोई भाव-फल निष्कर्ष नहीं निकाला गया।</p>`);
 }catch(e){return pending('भाव चलित','गणना त्रुटि: '+e.message);}
}
function labhaPanel(){
 const T=window.BrahmLabhaPhal;
 if(!T)return pending('भाव-फल: एकादश भाव (BPHS ch22)','गणना-मॉड्यूल नहीं मिला; बिना आधार के फल-पंक्तियाँ अनुमान से नहीं दिखाई जातीं।');
 let rep;try{rep=T.report(ps.map(p=>({graha:p.graha,rashi:p.rashi,degreesInRashi:p.degreesInRashi})),ls);}catch(e){return pending('भाव-फल: एकादश भाव (BPHS ch22)','गणना त्रुटि: '+e.message);}
 const rowsHtml=rep.rows.map(r=>`<details><summary>${r.ref} · ${esc(r.topic)} · ${r.polarity} · ${r.served?'शर्त बनी':'शर्त नहीं बनी'}</summary>
 <p><strong>शर्त:</strong> ${esc(r.condition)}</p>
 ${r.detail?`<p><strong>इस कुंडली में:</strong> ${esc(r.detail)}</p>`:''}
 ${r.served?`<p>${esc(r.text)}</p>`:'<p class="source-note">यह शर्त इस कुंडली में पूरी नहीं बनी; परंपरा-कथन नहीं दिखाया गया।</p>'}
 ${r.served&&r.transparency?`<p class="source-note">${esc(r.transparency)}</p>`:''}
 ${r.unmodeled?`<p class="source-note">${esc(r.unmodeled)}</p>`:''}
 <small>${r.ref} · परंपरा-वर्णित शर्त-पंक्ति, भविष्यकथन नहीं।</small></details>`).join('');
 return panel('भाव-फल: एकादश भाव (BPHS ch22)',`
 <p>${rep.header}</p>
 <div class="suite-yogas">${rowsHtml}</div>
 <p class="source-note">${rep.omitNotice}</p>
 <p class="source-note">${rep.nodesNote}</p>
 <p class="source-note">${rep.scope} स्रोत: ${rep.source}।</p>`);
}
function tanuPanel(){
 const T=window.BrahmTanuPhal;
 if(!T)return pending('भाव-फल: प्रथम भाव (BPHS ch12 · pilot)','गणना-मॉड्यूल नहीं मिला; बिना आधार के फल-पंक्तियाँ अनुमान से नहीं दिखाई जातीं।');
 let rep;try{rep=T.report(ps.map(p=>({graha:p.graha,rashi:p.rashi,degreesInRashi:p.degreesInRashi})),ls);}catch(e){return pending('भाव-फल: प्रथम भाव (BPHS ch12 · pilot)','गणना त्रुटि: '+e.message);}
 const rowsHtml=rep.rows.map(r=>`<details><summary>${r.ref} · ${esc(r.topic)} · ${r.polarity} · ${r.served?'शर्त बनी':'शर्त नहीं बनी'}</summary>
 <p><strong>शर्त:</strong> ${esc(r.condition)}</p>
 ${r.detail?`<p><strong>इस कुंडली में:</strong> ${esc(r.detail)}</p>`:''}
 ${r.served?`<p>${esc(r.text)}</p>`:'<p class="source-note">यह शर्त इस कुंडली में पूरी नहीं बनी; परंपरा-कथन नहीं दिखाया गया।</p>'}
 ${r.served&&r.transparency?`<p class="source-note">${esc(r.transparency)}</p>`:''}
 ${r.matbhed?`<p class="source-note">${esc(r.matbhed)}</p>`:''}
 <small>${r.ref} · परंपरा-वर्णित शर्त-पंक्ति, भविष्यकथन नहीं।</small></details>`).join('');
 return panel('भाव-फल: प्रथम भाव (BPHS ch12 · pilot)',`
 <p>${rep.header}</p>
 <div class="suite-yogas">${rowsHtml}</div>
 <p class="source-note">${rep.omitNotice}</p>
 <p class="source-note">${rep.nodesNote} ${rep.drishtiNote}</p>
 <p class="source-note">${rep.scope} स्रोत: ${rep.source}।</p>`);
}
function karmaphalPanel(){
 const T=window.BrahmKarmaPhal;
 if(!T)return pending('भाव-फल: दशम भाव (BPHS ch21)','गणना-मॉड्यूल नहीं मिला; बिना आधार के फल-पंक्तियाँ अनुमान से नहीं दिखाई जातीं।');
 let rep;try{rep=T.report(ps.map(p=>({graha:p.graha,rashi:p.rashi,degreesInRashi:p.degreesInRashi})),ls);}catch(e){return pending('भाव-फल: दशम भाव (BPHS ch21)','गणना त्रुटि: '+e.message);}
 const rowsHtml=rep.rows.map(r=>`<details><summary>${r.ref} · ${esc(r.topic)} · ${r.polarity} · ${r.served?'शर्त बनी':'शर्त नहीं बनी'}</summary>
 <p><strong>शर्त:</strong> ${esc(r.condition)}</p>
 ${r.detail?`<p><strong>इस कुंडली में:</strong> ${esc(r.detail)}</p>`:''}
 ${r.served?`<p>${esc(r.text)}</p>`:'<p class="source-note">यह शर्त इस कुंडली में पूरी नहीं बनी; परंपरा-कथन नहीं दिखाया गया।</p>'}
 ${r.served&&r.transparency?`<p class="source-note">${esc(r.transparency)}</p>`:''}
 ${r.note?`<p class="source-note">${esc(r.note)}</p>`:''}
 <small>${r.ref} · परंपरा-वर्णित शर्त-पंक्ति, भविष्यकथन नहीं।</small></details>`).join('');
 return panel('भाव-फल: दशम भाव (BPHS ch21)',`
 <p>${rep.header}</p>
 <div class="suite-yogas">${rowsHtml}</div>
 <p class="source-note">${rep.safetyNotice}</p>
 <p class="source-note">${rep.breadthNotice}</p>
 <p class="source-note">${rep.unmodeledNotice}</p>
 <p class="source-note">${rep.nodesNote} ${rep.conductNote}</p>
 <p class="source-note">${rep.scope} स्रोत: ${rep.source}।</p>`);
}
function dhanaphalPanel(){
 const T=window.BrahmDhanaPhal;
 if(!T)return pending('भाव-फल: धन भाव (BPHS ch13)','गणना-मॉड्यूल नहीं मिला; बिना आधार के फल-पंक्तियाँ अनुमान से नहीं दिखाई जातीं।');
 let rep;try{rep=T.report(ps.map(p=>({graha:p.graha,rashi:p.rashi,degreesInRashi:p.degreesInRashi})),ls);}catch(e){return pending('भाव-फल: धन भाव (BPHS ch13)','गणना त्रुटि: '+e.message);}
 const rowsHtml=rep.rows.map(r=>`<details><summary>${r.ref} · ${esc(r.topic)} · ${r.polarity} · ${r.served?'शर्त बनी':'शर्त नहीं बनी'}</summary>
 <p><strong>शर्त:</strong> ${esc(r.condition)}</p>
 ${r.detail?`<p><strong>इस कुंडली में:</strong> ${esc(r.detail)}</p>`:''}
 ${r.served?`<p>${esc(r.text)}</p>`:'<p class="source-note">यह शर्त इस कुंडली में पूरी नहीं बनी; परंपरा-कथन नहीं दिखाया गया।</p>'}
 ${r.served&&r.transparency?`<p class="source-note">${esc(r.transparency)}</p>`:''}
 ${r.note?`<p class="source-note">${esc(r.note)}</p>`:''}
 <small>${r.ref} · परंपरा-वर्णित शर्त-पंक्ति, भविष्यकथन नहीं।</small></details>`).join('');
 return panel('भाव-फल: धन भाव (BPHS ch13)',`
 <p>${rep.header}</p>
 <div class="suite-yogas">${rowsHtml}</div>
 <p class="source-note">${rep.omitNotice}</p>
 <p class="source-note">${rep.breadthNotice}</p>
 <p class="source-note">${rep.unmodeledNotice}</p>
 <p class="source-note">${rep.nodesNote} ${rep.conductNote}</p>
 <p class="source-note">${rep.scope} स्रोत: ${rep.source}।</p>`);
}
const tabs=[['basic','जन्म विवरण'],['kundli','कुंडली'],['ashtak','अष्टकवर्ग'],['charts','वर्ग-चार्ट'],['dasha','दशा'],['report','रिपोर्ट']];
function sahajaphalPanel(){
 const T=window.BrahmSahajaPhal;
 if(!T)return pending('भाव-फल: सहज/विक्रम भाव (BPHS ch14)','गणना-मॉड्यूल नहीं मिला; बिना आधार के फल-पंक्तियाँ अनुमान से नहीं दिखाई जातीं।');
 let rep;try{rep=T.report(ps.map(p=>({graha:p.graha,rashi:p.rashi,degreesInRashi:p.degreesInRashi})),ls);}catch(e){return pending('भाव-फल: सहज/विक्रम भाव (BPHS ch14)','गणना त्रुटि: '+e.message);}
 const rowsHtml=rep.rows.map(r=>`<details><summary>${r.ref} · ${esc(r.topic)} · ${r.polarity} · ${r.served?'शर्त बनी':'शर्त नहीं बनी'}</summary>
 <p><strong>शर्त:</strong> ${esc(r.condition)}</p>
 ${r.detail?`<p><strong>इस कुंडली में:</strong> ${esc(r.detail)}</p>`:''}
 ${r.served?`<p>${esc(r.text)}</p>`:'<p class="source-note">यह शर्त इस कुंडली में पूरी नहीं बनी; परंपरा-कथन नहीं दिखाया गया।</p>'}
 ${r.served&&r.transparency?`<p class="source-note">${esc(r.transparency)}</p>`:''}
 ${r.note?`<p class="source-note">${esc(r.note)}</p>`:''}
 <small>${r.ref} · परंपरा-वर्णित शर्त-पंक्ति, भविष्यकथन नहीं।</small></details>`).join('');
 return panel('भाव-फल: सहज/विक्रम भाव (BPHS ch14)',`
 <p>${rep.header}</p>
 <div class="suite-yogas">${rowsHtml}</div>
 <p class="source-note">${rep.omitNotice}</p>
 <p class="source-note">${rep.breadthNotice}</p>
 <p class="source-note">${rep.unmodeledNotice}</p>
 <p class="source-note">${rep.nodesNote}</p>
 <p class="source-note">${rep.scope} स्रोत: ${rep.source}।</p>`);
}
function vyayaphalPanel(){
 const T=window.BrahmVyayaPhal;
 if(!T)return pending('भाव-फल: व्यय भाव (BPHS ch23)','गणना-मॉड्यूल नहीं मिला; बिना आधार के फल-पंक्तियाँ अनुमान से नहीं दिखाई जातीं।');
 let rep;try{rep=T.report(ps.map(p=>({graha:p.graha,rashi:p.rashi,degreesInRashi:p.degreesInRashi})),ls);}catch(e){return pending('भाव-फल: व्यय भाव (BPHS ch23)','गणना त्रुटि: '+e.message);}
 const rowsHtml=rep.rows.map(r=>`<details><summary>${r.ref} · ${esc(r.topic)} · ${r.polarity} · ${r.served?'शर्त बनी':'शर्त नहीं बनी'}</summary>
 <p><strong>शर्त:</strong> ${esc(r.condition)}</p>
 ${r.detail?`<p><strong>इस कुंडली में:</strong> ${esc(r.detail)}</p>`:''}
 ${r.served?`<p>${esc(r.text)}</p>`:'<p class="source-note">यह शर्त इस कुंडली में पूरी नहीं बनी; परंपरा-कथन नहीं दिखाया गया।</p>'}
 ${r.served&&r.transparency?`<p class="source-note">${esc(r.transparency)}</p>`:''}
 ${r.note?`<p class="source-note">${esc(r.note)}</p>`:''}
 <small>${r.ref} · परंपरा-वर्णित शर्त-पंक्ति, भविष्यकथन नहीं।</small></details>`).join('');
 return panel('भाव-फल: व्यय भाव (BPHS ch23)',`
 <p>${rep.header}</p>
 <div class="suite-yogas">${rowsHtml}</div>
 <p class="source-note">${rep.omitNotice}</p>
 <p class="source-note">${rep.breadthNotice}</p>
 <p class="source-note">${rep.unmodeledNotice}</p>
 <p class="source-note">${rep.nodesNote} ${rep.conductNote}</p>
 <p class="source-note">${rep.scope} स्रोत: ${rep.source}।</p>`);
}

$('astroResult').innerHTML=`<header class="suite-result-head"><span class="suite-kicker">BRAHMTATVA / जन्मपत्रिका</span><h2>${esc(name)}</h2><p>${esc(date)} · ${esc(time)} · ${esc(l.timeZone)}<br>${esc(coords(l))}</p><p class="source-note">UTC ${esc(birth.toISOString().slice(0,19).replace('T',' '))} · लाहिड़ी · whole-sign · mean nodes</p><div class="suite-actions"><button id="editBirth" type="button">जन्म विवरण बदलें</button><button id="printResult" type="button">चुनी रिपोर्ट / PDF</button><button id="printGallery" type="button">वर्ग/अष्टकवर्ग संग्रह PDF</button><button id="saveBirth" type="button">इस उपकरण पर सेव</button></div><p id="savedNotice" role="status" class="source-note">केवल सेव बटन दबाने पर इसी ब्राउज़र में विवरण रहेगा। खाता या cloud sync नहीं।</p></header><div class="astro-grid suite-summary">${item('लग्न',R[ls],deg(lagna))}${item('चन्द्र राशि',R[moon.rashi],deg(moon.longitude))}${item('नक्षत्र',N[moon.nakshatra],`पाद ${moon.pada}`)}</div><p class="astro-note">यह परीक्षण के लिए कार्यशील पूर्वावलोकन है, पूर्ण समानता का दावा नहीं। ज्योतिषीय वर्गीकरण पारम्परिक मान्यताएँ हैं, प्रमाणित भविष्यवाणी नहीं।</p><nav class="suite-tabs" role="tablist" aria-label="कुंडली के भाग">${tabs.map(([id,label],i)=>`<button type="button" id="tab-${id}" role="tab" aria-selected="${i===0}" aria-controls="pane-${id}" tabindex="${i===0?0:-1}">${label}</button>`).join('')}</nav>${tabs.map(([id,label],i)=>`<div id="pane-${id}" role="tabpanel" aria-labelledby="tab-${id}" ${i?'hidden':''}></div>`).join('')}<details class="suite-ledger"><summary>क्या बना है, क्या अभी अधूरा है</summary><p>बना: लग्न और सात ग्रहों का BAV/SAV (उल्लिखित convention), सीमित स्रोत-नामित योग/दोष-geometry, मूल जन्म-गणना, जन्म-पंचांग, उत्तर/दक्षिण चार्ट, सभी 16 चुने वर्ग, चार स्तर की विम्शोत्तरी/योगिनी समय-सारणी, षड्बल के गणित घटक (आंशिक, convention-लेबल सहित, कुल/अनुपात नहीं), तारीख-आधारित गोचर, ग्रह-तालिका (जाग्रतादि/दीप्तादि अवस्थाएँ BPHS45.5-10 सहित, परिपाटियाँ लेबल-सहित), अलग आधुनिक बाहरी ग्रहों की स्थिति, भाव-चलित दृश्य (श्रीपति-मध्य परंपरा; whole-sign मुख्य चार्ट अपरिवर्तित; राहु-केतु अमॉडल; स्थानांतरण केवल तथ्यात्मक), प्रथम-भाव शर्त-फल पंक्तियाँ (BPHS ch12 pilot; शर्त-मिलान परंपरा-कथन, 10 खंड नीति से हटे, कोई निर्णय नहीं), चुनी स्क्रीन-स्थितियों को PDF के लिए प्रिंट और इच्छानुसार उपकरण पर सेव। इन्हें भी नीचे दी परीक्षण-सीमाओं के साथ पढ़ें।</p><p>अधूरा: Avakhada में पाया/युंजा की शेष परम्पराएँ, भावबल के कुल मान (घटक-शर्तें अलग दिखती हैं), षड्बल के शेष घटक (ग्रह-युद्ध), शेष 11 भावों का भाव-फल (ch12 pilot बना), विस्तृत फलादेश/बाकी योग/पूर्ण दोष-निर्णय/उपाय, सभी भाषाओं का अनुवाद, cloud account saving और ग्रहों की शेष अवस्थाएँ (लज्जितादि, सयनादि, कोप/अस्तता)। अधूरे भाग संख्याएँ या तैयार फल नहीं दिखाते। KP जानबूझकर शामिल नहीं।</p><p>प्रिंट में छह भाग आते हैं, लेकिन वर्ग/अष्टकवर्ग/दशा के वही विकल्प आते हैं जो आपने चुने हैं। अलग संग्रह PDF में सभी 16 वर्ग और 9 अष्टकवर्ग तालिकाएँ हैं। इसमें सभी दशा-उपदशाएँ/फलादेश नहीं।</p></details>`;
const tithi=A.tithiBoundaries(birth),nak=A.nakshatraBoundaries(birth),yoga=A.yogaBoundaries(birth),karana=A.karanaBoundaries(birth),daily=A.dailyPanchanga(birth,l),tn=tithi.number===30?'अमावस्या':T[(tithi.number-1)%15],weekday=Number(new Intl.DateTimeFormat('en-US',{timeZone:l.timeZone,weekday:'short'}).format(birth).replace(/.*/,x=>['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(x)));
const atMinus=A.siderealLagna(new Date(+birth-900000),l),atPlus=A.siderealLagna(new Date(+birth+900000),l);
$('pane-basic').innerHTML=panel('जन्म का विवरण',`<div class="astro-grid">${item('स्थानीय जन्म-समय',stamp(birth))}${item('नागरिक वार',V[weekday])}${item('समयक्षेत्र',l.timeZone)}${item('अक्षांश',String(l.latitude))}${item('देशान्तर',String(l.longitude))}${item('अयनांश',A.ayanamsha(birth).toFixed(5)+'°')}</div>`)+panel('जन्म-क्षण का पंचांग',`<p>तिथि, नक्षत्र, योग और करण जन्म के क्षण पर; सूर्योदय/सूर्यास्त स्थानीय नागरिक तारीख के हैं। सूर्योदय से पहले का पारम्परिक वार अलग हो सकता है।</p><div class="astro-grid">${item('तिथि',(tithi.number<=15?'शुक्ल · ':'कृष्ण · ')+tn,`अन्त ${esc(stamp(tithi.end))}`)}${item('नक्षत्र',N[nak.index],`पाद ${moon.pada} · अन्त ${esc(stamp(nak.end))}`)}${item('योग',Y[yoga.index],`अन्त ${esc(stamp(yoga.end))}`)}${item('करण',K[karana.name]||karana.name,`अन्त ${esc(stamp(karana.end))}`)}${item('सूर्योदय',daily.sunrise?stamp(daily.sunrise):'इस दिन नहीं')}${item('सूर्यास्त',daily.sunset?stamp(daily.sunset):'इस दिन नहीं')}</div>`)+(()=>{const v=window.BrahmRules.avakhada(moon);return panel('Avakhada: नामित परम्परा',`<div class="astro-grid">${item('राशि स्वामी',signLord(moon.rashi))}${item('नक्षत्र स्वामी',nkLord(moon.nakshatra))}${item('लग्न स्वामी',signLord(ls))}${item('वर्ण (ज्योतिष वर्ग)',v.varna)}${item('वश्य',v.vashya)}${item('योनि (NP सूची)',v.yoni)}${item('गण',v.gana)}${item('नाड़ी',v.nadi)}${item('तत्त्व',v.element)}${item('नाम-अक्षर (प्रचलित)',v.syllable)}</div><p class="source-note">वर्ण/गण पुराने ज्योतिषीय वर्गों के नाम हैं, किसी व्यक्ति की जाति, गुण या मूल्य का निर्णय नहीं। वर्ण में प्रचलित तत्त्व-तालिका है; जाँचे BPHS4 पाठ में मिथुन का वर्ण अलग है। सिंह वश्य वनचर/चतुष्पद और कर्क जलचर/कीट में परम्परा-भेद है।</p><p class="source-note">योनि: Narada Purana56 की सूची; उत्तराषाढ़ा वहाँ वृषभ है, कई आधुनिक तालिकाओं में नकुल। गण में प्रचलित सूची ली है; पुनर्वसु उसमें देव, NP56 की सूची में मनुष्य है। नाड़ी: उसी पाठ की serpentine3-column विधि। नाम-अक्षर: dekhopanchang की 27-nakshatra तालिका, प्रचलित नामकरण संकेत; 108 अक्षरों का मूल श्लोक सत्यापित नहीं। पाया/युंजा अभी नहीं जोड़े।</p>`);})()+panel('समय और सीमा की संवेदनशीलता',`<p>जन्म से 15 मिनट पहले लग्न ${R[Math.floor(atMinus/30)]} ${deg(atMinus)}; 15 मिनट बाद ${R[Math.floor(atPlus/30)]} ${deg(atPlus)}। यह जन्म-समय की पुष्टि नहीं है। उच्च वर्गों में बहुत छोटा समय-अन्तर भी चार्ट बदल सकता है।</p>${ps.some(p=>p.rashiMarginArcmin<6||p.nakshatraMarginArcmin<6)||Math.min(J.mod(lagna,30),30-J.mod(lagna,30))<.1?'<p class="astro-note">कम से कम एक ग्रह राशि/नक्षत्र सीमा के 0.1° के भीतर है। सही समय और दूसरे सन्दर्भ से मिलान जरूरी है।</p>':''}`);
function south(planets,asc,title){const order=[11,0,1,2,10,null,null,3,9,null,null,4,8,7,6,5],as=Math.floor(asc/30);return `<div class="south-chart" role="img" aria-label="दक्षिण भारतीय ${esc(title)}">${order.map((s,i)=>s===null?(i===5?`<div class="south-center">ॐ<br>${esc(title)}<br><small>राशि स्थिर</small></div>`:''):`<div class="south-cell ${s===as?'is-lagna':''}" style="grid-column:${i%4+1};grid-row:${Math.floor(i/4)+1}"><small>${s+1} ${R[s]}</small>${s===as?'<b>लग्न</b>':''}${planets.filter(p=>p.rashi===s).map(p=>`<span>${G[p.graha]}${p.retrograde?'*':''}</span>`).join('')}</div>`).join('')}</div>`;}
function draw(planets,asc,title,unique=title){if(layout==='south')return south(planets,asc,title);return chart(planets,asc).replace(/D1/g,esc(title)).replace(title==='D1'?/$^/:/ [0-9]+°/g,'').replace(/id="(ncBg|ncLagna|ncFrame|northTitle|northDesc)"/g,(_,s)=>`id="${s}-${unique}"`).replace(/url\(#(ncBg|ncLagna|ncFrame)\)/g,(_,s)=>`url(#${s}-${unique})`).replace('aria-labelledby="northTitle northDesc"',`aria-labelledby="northTitle-${unique} northDesc-${unique}"`);}
function chartControls(){return `<div class="suite-controls"><label>चार्ट शैली<select id="chartLayout"><option value="north" ${layout==='north'?'selected':''}>उत्तर भारतीय</option><option value="south" ${layout==='south'?'selected':''}>दक्षिण भारतीय</option></select></label></div>`;}
function avasthaRows(p){if(!window.BrahmStates||!BrahmStates.avastha)return '';let a;try{a=BrahmStates.avastha(p.graha,Object.fromEntries(ps.map(x=>[x.graha,x.longitude])));}catch(e){return '';}if(!a||!a.available)return '';
 const ind=a.vikala.applies===true&&a.deeptadi.name!=='विकल'?`<div>पाप-युति संकेत<strong>विकल-शर्त लागू (${a.vikala.viaNames.join(', ')})</strong></div>`:a.vikala.applies===null?`<div>पाप-युति संकेत<strong>अनिर्णीत — चन्द्र सन्धि पर</strong></div>`:'';
 return `<div>जाग्रतादि<strong>${a.jagratadi.name} · फल ${a.jagratadi.phal}</strong></div><div>दीप्तादि<strong>${a.deeptadi.name}</strong></div>${ind}<details class="suite-avastha-basis"><summary>अवस्था-आधार (45.5-10)</summary><p>${esc(a.jagratadi.basis)} — ${esc(a.jagratadi.phalNote)}</p><p>${esc(a.deeptadi.basis)} · ${esc(a.deeptadi.precedenceNote)}</p><p>${esc(a.vikala.basis)}${a.vikala.applies===true?` — युति: ${a.vikala.viaNames.join(', ')}`:''}</p><p>${esc(a.kopa.note)}</p><p>${esc(a.phalNote)}</p></details>`;}
function planetTable(){return `<div class="suite-planets">${[{graha:'Ascendant',longitude:lagna,rashi:ls,nakshatra:Math.floor(lagna/(360/27)),pada:Math.floor(J.mod(lagna,360/27)/(10/3))+1},...ps].map(p=>`<article><h4>${G[p.graha]||'लग्न'} ${p.retrograde?'· वक्री':''}</h4><div class="suite-facts"><div>राशि / अंश<strong>${R[p.rashi]} ${deg(p.longitude)}</strong></div><div>भाव<strong>${J.house(p.longitude,lagna)}</strong></div><div>राशि स्वामी<strong>${signLord(p.rashi)}</strong></div><div>नक्षत्र / पाद<strong>${N[p.nakshatra]} · ${p.pada}</strong></div><div>नक्षत्र स्वामी<strong>${nkLord(p.nakshatra)}</strong></div><div>राशि-गरिमा<strong>${J.dignity(p)}</strong></div>${window.BrahmStates?.baladi(p.graha,p.longitude).available?`<div>बालादि: अंश-वर्ग<strong>${window.BrahmStates.baladi(p.graha,p.longitude).name}</strong></div>`:''}${avasthaRows(p)}</div></article>`).join('')}</div><p class="source-note">राशि-गरिमा केवल उच्च/नीच/स्वराशि का वर्गीकरण है। बालादि BPHS45.3 के छह-अंश वर्गों का नाम है, व्यक्ति की उम्र, सेहत या जीवन-अवधि नहीं। निचला किनारा शामिल है। सात दृश्य ग्रहों तक सीमित रखना इस संस्करण की सावधानी है। जाग्रतादि (45.5-6) और दीप्तादि (45.7-10) अवस्थाएँ siva.sh संस्कृत-आधारित हैं; मैत्री-मापदंड पांचधा, युति whole-sign, पूर्वता श्लोक-क्रम प्रथम-मेल — ये परिपाटियाँ हैं, स्रोत-कथन नहीं (विस्तार 'अवस्था-आधार' में)। jyotishvidya अनुवाद से नौवीं अवस्था 'दुःखित' गिरी है; संस्कृत निर्णायक (विसंगति दर्ज)। कोप/अस्तता अनिर्णीत — स्रोत में कक्षा-सीमा नहीं, अमॉडलित। लज्जितादि/सयनादि अवस्थाएँ, ग्रहयुद्ध और पूरे बल का आकलन नहीं। दीप्तादि के प्रति-अवस्था फल-परिच्छेद स्रोत में नहीं (45.10 सामान्य कथन; 45.6 पूर्ण/मध्यम/शून्य तीव्रता)। ग्रहों का भाव whole-sign है।</p>`;}
function outerPanel(){const labels={Uranus:'अरुण (Uranus)',Neptune:'वरुण (Neptune)',Pluto:'प्लूटो'};const outer=A.outerPositions(birth);return panel('आधुनिक बाहरी ग्रह: अलग सूची',`<p>ये आधुनिक खगोल-पिंड हैं, पारम्परिक नवग्रह की सूची नहीं। नीचे केवल आकाशीय स्थिति और whole-sign भाव दिए हैं। इन्हें BAV/SAV, शास्त्रीय योग, दशा, दोष या ऊपर के पारम्परिक वर्गों में नहीं जोड़ा गया है।</p><div class="suite-facts">${outer.map(p=>`<div>${labels[p.graha]}${p.motionUncertain?' · गति की दिशा अनिश्चित':p.retrograde?' · वक्री':''}<strong>${R[p.rashi]} ${deg(p.longitude)}</strong><small>लग्न से ${J.house(p.longitude,lagna)} भाव</small></div>`).join('')}</div><p class="source-note">Astronomy Engine की geocentric गणना पर वही Lahiri अयनांश। 1900-2100 के 420 नमूनों में Swiss Moshier से सबसे बड़ा अन्तर Uranus 0.202, Neptune 0.341, Pluto 0.164 कला रहा; यह परीक्षण-नमूना है, सार्वभौमिक सीमा नहीं। स्टेशन के पास गति बहुत छोटी हो तो दिशा अनिश्चित दिखाई जाती है; छोटे संख्यात्मक अन्तर से वक्री/मार्गी बदल सकता है। API में UTC वर्ष1900-2100 ही समर्थित हैं। इनकी व्यक्तिगत फल-व्याख्या नहीं जोड़ी गई।</p>`);}
function relationPanel(){return panel('ग्रह-मैत्री: नामित गणना',`<p>नैसर्गिक, तात्कालिक और पंचधा वर्ग। सात दृश्य पारम्परिक ग्रहों तक सीमित; राहु/केतु/लग्न/बाहरी ग्रह यहाँ नहीं।</p><label>किस ग्रह से सम्बन्ध पढ़ें<select id="relationFrom">${window.BrahmRelations.planets.map(p=>`<option value="${p}">${G[p]}</option>`).join('')}</select></label><div id="relationValues"></div><p class="source-note">BPHS3.49,51-58 के नामित नियम। नैसर्गिक सम्बन्ध एक-दिशा है, उलटी दिशा में बदल सकता है। तात्कालिक सम्बन्ध जन्म-राशियों की दूरी 2/3/4/10/11/12 से मित्र, अन्यथा शत्रु है; एक ही राशि के दो अलग ग्रह तात्कालिक शत्रु। राशि-सीमा पर छोटी समय/गणना त्रुटि से वर्ग बदल सकता है। 'मित्र/शत्रु' ग्रहों की पारम्परिक संज्ञाएँ हैं, लोगों की दोस्ती, विवाह-मेल, गुण, स्वास्थ्य या परिणाम का निष्कर्ष नहीं। न बल-अंक, न फल-प्रतिशत। ऑनलाइन पाठ की जाँच है, स्कैन-प्रमाणन नहीं।</p>`);}
function updateRelations(){const from=$('relationFrom').value,positions=Object.fromEntries(ps.filter(p=>window.BrahmRelations.planets.includes(p.graha)).map(p=>[p.graha,p.longitude]));$('relationValues').innerHTML=`<p>${G[from]} से दूसरे ग्रह की दिशा में पढ़ें।</p><div class="suite-planets">${window.BrahmRelations.row(from,positions).map(r=>`<article><h4>${G[r.to]}</h4><dl><div><dt>नैसर्गिक</dt><dd>${r.naturalLabel}</dd></div><div><dt>तात्कालिक</dt><dd>${r.temporaryLabel} · राशि-दूरी ${r.relativeSign}</dd></div><div><dt>पंचधा</dt><dd>${r.compoundLabel}</dd></div></dl></article>`).join('')}</div>`;}
function renderKundli(){const d9=J.divisional(ps,lagna,9);$('pane-kundli').innerHTML=panel('लग्न और नवांश',chartControls()+`<div class="suite-chart-grid"><div><h4>D1 · राशि</h4>${draw(ps,lagna,'D1')}</div><div><h4>D9 · नवांश</h4>${draw(d9.planets,d9.lagna,'D9')}</div></div><p class="source-note">D9 में अंक विभाजित राशि हैं, जन्म के ग्रह-अंश नहीं। नवांश में अलग परम्पराओं की विधियाँ हो सकती हैं; यहाँ चल/स्थिर/द्विस्वभाव शुरूआत 1/9/5 का नियम है।</p>`)+panel('ग्रह-स्थिति',planetTable())+outerPanel()+relationPanel()+panel('गोचर: चुने क्षण पर',`<div class="suite-controls"><label>गोचर की स्थानीय तारीख<input type="date" id="transitDate" min="1900-01-01" max="2100-12-31" value="${A.localDayString(new Date(),l.timeZone)}"></label><label>स्थानीय समय<input type="time" id="transitTime" value="12:00"></label><button type="button" id="calcTransit">गोचर निकालें</button></div><p>जन्म-लग्न और जन्म-चन्द्र राशि से वर्तमान ग्रहों के whole-sign भाव। स्थान वही जन्म-स्थान है; समयक्षेत्र ऊपर दिया है।</p><div id="transitResult" role="status"></div>`)+balaPanel()+bhavaTermsPanel()+pending('भावबल: कुल मान','भावबल के कुल मान (27.32-33), अनुपात और क्रम जानबूझकर नहीं बनाए गए; ऊपर की घटक-शर्तें अलग-अलग हैं।');$('relationFrom').onchange=updateRelations;updateRelations();$('chartLayout').onchange=e=>{layout=e.target.value;renderKundli();};$('calcTransit').onclick=()=>{try{const d=ctx.civilUTC($('transitDate').value,$('transitTime').value,l.timeZone),p=A.grahaPositions(d,{node:'mean'});$('transitResult').innerHTML=`<p>${esc(stamp(d))}</p><div class="suite-chart-grid">${draw(p,lagna,'गोचर-लग्न')}${draw(p,moon.rashi*30,'गोचर-चन्द्र')}</div><div class="suite-facts">${p.map(g=>`<div>${G[g.graha]}<strong>${R[g.rashi]} ${deg(g.longitude)}</strong><small>लग्न से ${J.house(g.longitude,lagna)} · चन्द्र से ${J.house(g.longitude,moon.longitude)}</small></div>`).join('')}</div>`;}catch(e){$('transitResult').textContent=e.message;}};}
function renderCharts(){$('pane-charts').innerHTML=panel('वर्गों की खोज',`<div class="suite-controls"><label>वर्ग चुनें<select id="division">${Object.entries(J.VARGAS).map(([n,label])=>`<option value="${n}" ${+n===division?'selected':''}>D${n} · ${label}</option>`).join('')}</select></label><label>शैली<select id="vargaLayout"><option value="north" ${layout==='north'?'selected':''}>उत्तर भारतीय</option><option value="south" ${layout==='south'?'selected':''}>दक्षिण भारतीय</option></select></label></div><p class="astro-note">D60 के लिए 30′ के बहुत छोटे जन्म-खंड हैं। सही जन्म-मिनट/स्थान न हो तो इसे विश्वसनीय व्यक्तिगत परिणाम न मानें। यहाँ नामित नियम उपयोग होते हैं, Astrotalk की अज्ञात सेटिंग्स की नकल नहीं।</p><label>D60 की गणना-परम्परा<select id="d60Origin"><option value="aries">अंश से मेष-आरम्भ (पुराने अंग्रेजी अनुवाद का विकल्प)</option><option value="natal">जन्म-राशि से आरम्भ (BPHS6.33 के tad-rasheh पाठ से)</option></select></label><p class="source-note">D60 पर स्रोतों में मतभेद मिला है। default जन्म-राशि से गिनना है: BPHS6.33 के tad-rasheh का नामित पठन। पुराने अंग्रेजी अनुवाद में जन्म-राशि से गिनने का वाक्य नहीं है, इसलिए मेष-आरम्भ का विकल्प तुलना के लिए रखा है। इसे Astrotalk की प्रमाणित पद्धति नहीं कहते।</p><div id="divisionChart"></div>`)+chalitPanel();const update=()=>{division=+$('division').value;layout=$('vargaLayout').value;const v=J.divisional(ps,lagna,division,{d60Origin});$('divisionChart').innerHTML=`<h4>D${division} · ${J.VARGAS[division]}</h4>${division===2?'<p class="source-note">D2: सूर्य/चन्द्र होरा की सिंह/कर्क विधि। अन्य सेवाओं में भिन्न hora पद्धति हो सकती है।</p>':''}${division===30?'<p class="source-note">D30 के असमान खंडों से केवल राशि दी है; पुनःमानित अंश अनुपलब्ध हैं, शून्य अंश का दावा नहीं।</p>':''}${v.planets.some(p=>p.boundary<.02)?'<p class="astro-note">एक या अधिक ग्रह विभाजन सीमा के 0.02° के भीतर हैं। छोटी जन्म-समय/गणना त्रुटि से यह वर्ग बदल सकता है।</p>':''}${draw(division===1?ps:v.planets,division===1?lagna:v.lagna,'D'+division)}<div class="suite-facts">${[{graha:'Ascendant',rashi:Math.floor(v.lagna/30)},...v.planets].map(p=>`<div>${G[p.graha]||'लग्न'}<strong>${R[p.rashi]}</strong></div>`).join('')}</div><p class="source-note">D${division} विभाजन: ${division===30?'पाँच असमान खंड, विषम/सम राशि नियम':'एक राशि के '+division+' बराबर खंड'}। वर्ग के भीतर दिखते अंश गणितीय पुनःमान हैं, आकाश में नए ग्रह-देशान्तर नहीं।</p>`;};$('d60Origin').value=d60Origin;$('d60Origin').onchange=e=>{d60Origin=e.target.value;update();};$('division').onchange=update;$('vargaLayout').onchange=update;update();}
function dashaPhalBlock(lord,scope){if(!window.BrahmRules||!BrahmRules.dashaContext||!lord)return '';let cx;try{cx=BrahmRules.dashaContext(ps.map(p=>({graha:p.graha,rashi:p.rashi,degreesInRashi:p.degreesInRashi})),Math.floor(lagna/30),lord);}catch(e){return '';}
 const facts=[cx.node?'राशि-गरिमा: नहीं जाँची (BPHS 47.34-39 पर मत-भेद)':'राशि-स्थिति: '+cx.dignity,'जन्म-लग्न से भाव: '+cx.house+' ('+cx.zone+')','युति ग्रह: '+(cx.conjunct.length?cx.conjunct.map(g=>G[g]||g).join(', '):'कोई नहीं')];if(cx.degreeZone){const dz=cx.degreeZone,zl=dz.invalid?'अंश-क्षेत्र: अमान्य अंश-मान (0° से 30° के बाहर) — क्षेत्र-जाँच लागू नहीं':dz.missing?'अंश-क्षेत्र: उपलब्ध नहीं':dz.boundary?'अंश-क्षेत्र: सीमा के ±0.01° के भीतर — सावधानीवश कोई क्षेत्र-लेबल नहीं; यह खिड़की सॉफ्टवेयर की चुनी हुई सीमा-सहनशीलता है, ज्योतिर्गणना की मापी त्रुटि नहीं।':dz.zone?'अंश-क्षेत्र: '+dz.zone:null;if(zl)facts.push(zl);}
 let bh=null;try{bh=BrahmRules.dashaBhava?BrahmRules.dashaBhava(ps.map(p=>({graha:p.graha,rashi:p.rashi,degreesInRashi:p.degreesInRashi})),Math.floor(lagna/30),lord):null;}catch(e){bh=null;}
 let bhHtml='';
 if(bh){
  const rows=[];
  rows.push(`<h5>भाव-स्वामित्व परत (BPHS अध्याय 48)</h5>`);
  rows.push(`<p><strong>भाव-स्वामित्व:</strong> ${bh.lordOf.length?bh.lordOf.map(h=>h+'वें').join(' और ')+' भाव का स्वामी':'पारंपरिक 7-ग्रह स्वामित्व में कोई भाव नहीं (राहु/केतु)'}।</p>`);
  for(const b of bh.bhavaCharcha)rows.push(`<p>${b.house}वें भाव-स्वामी दशा: ${esc(b.text)} <small>(${esc(b.ref)})</small></p>`);
  if(bh.d48)rows.push(`<p>${esc(bh.d48.text)} <small>(${esc(bh.d48.ref)})</small></p>`);if(bh.d48x)rows.push(`<p>${esc(bh.d48x.text)} <small>(${esc(bh.d48x.ref)}, विस्तृत पठन)</small></p>`);if(bh.d48xm)rows.push(`<p>${esc(bh.d48xm.text)} <small>(${esc(bh.d48xm.ref)}, विस्तृत पठन — मौन संयोजन)</small></p>`);
  rows.push(`<p><strong>अनुकूल संबंध-शर्तें जो बनीं:</strong></p>${bh.fav.length?bh.fav.map(f=>`<p>· ${esc(f.text)} <small>(${esc(f.ref)})</small></p>`).join(''):'<p>· कोई नामित अनुकूल शर्त नहीं बनी — इसका अर्थ प्रतिकूलता नहीं।</p>'}`);
  rows.push(`<p><strong>प्रतिकूल संबंध-शर्तें जो बनीं:</strong></p>${bh.adv.length?bh.adv.map(f=>`<p>· ${esc(f.text)} <small>(${esc(f.ref)})</small></p>`).join(''):'<p>· कोई नामित प्रतिकूल शर्त नहीं बनी — इसका अर्थ अनुकूलता नहीं।</p>'}`);
  if(bh.notes.length)rows.push(bh.notes.map(n=>`<p class="astro-note">${esc(n)}</p>`).join(''));
  rows.push(`<p class="source-note">अध्याय 48 में अभी अमॉडल: ${bh.unmodeled.map(esc).join('; ')}। अनुकूल और प्रतिकूल पंक्तियाँ साथ दिखाई जाती हैं; इन्हें मिलाकर कोई कुल निर्णय नहीं निकाला जाता।</p>`);
  bhHtml='<div class="dasha-bhava">'+rows.join('')+'</div>';
 }
 return `<div class="dasha-phal"><h4>${esc(scope)}: ${esc(G[cx.lord]||cx.lord)} · पाठ्य फल-चर्चा (${esc(cx.phal.ref)})</h4><div class="suite-facts">${facts.map(f=>`<div>${esc(f)}</div>`).join('')}</div><p><strong>अनुकूल परिस्थितियों की चर्चा:</strong> ${esc(cx.phal.fav)}</p><p><strong>प्रतिकूल परिस्थितियों की चर्चा:</strong> ${esc(cx.phal.adv)}</p>${cx.para?`<p class="astro-note">${esc(cx.para)}</p>`:''}${cx.omissions&&cx.omissions.length?`<p class="astro-note"><strong>लोप-सूचना:</strong> ${cx.omissions.map(esc).join(' ')}</p>`:''}<p class="astro-note">ये अलग-अलग शर्तें हैं, कुल अंक या निर्णय नहीं; अनुकूल और प्रतिकूल दोनों ओर की चर्चा हमेशा साथ दिखाई जाती है। ऊपर के तथ्य जन्म-कुंडली से स्वतः जाँचे गए हैं; दशा-आरम्भ के क्षण का गोचर एक अलग शर्त है और यहाँ नहीं जोड़ा गया।</p>${bhHtml}<p class="source-note">भाव-गिनती whole-sign (पूरी राशि = एक भाव) है; अन्य पद्धतियों में भाव बदल सकते हैं। स्रोत: jyotishvidya.com का ऑनलाइन BPHS अध्याय 47-48 अनुवाद (एकल, अनाम अनुवादक; मुद्रित श्लोक-पुष्टि अभी बाकी)। अभी न जाँची गई शर्तें: दृष्टि, नवांश-गरिमा, अस्तता, वर्ग-बल, दशा-आरम्भ गोचर, क्षीण/पूर्ण चन्द्र। BPHS 47.2-4 का "बल के अनुसार फल" ढाँचा अभी लागू नहीं है, इसलिए बल-गणना जुड़े बिना अंतिम फल नहीं कहा जा सकता।</p></div>`;}
function dashaPairBlock(mahaLord,antarLord,scope){if(!window.BrahmRules||!BrahmRules.dashaPairContext||!mahaLord||!antarLord)return '';let pc;try{pc=BrahmRules.dashaPairContext(ps.map(p=>({graha:p.graha,rashi:p.rashi,degreesInRashi:p.degreesInRashi})),Math.floor(lagna/30),mahaLord,antarLord,tithi.number<=15?'shukla':'krishna');}catch(e){return '';}
 const facts=['अंतर्दशा-स्वामी, जन्म-लग्न से भाव: '+pc.houseFromLagna];
 if(mahaLord!==antarLord)facts.push('अंतर्दशा-स्वामी, महादशा-स्वामी ('+(G[mahaLord]||mahaLord)+') से भाव: '+pc.houseFromMaha+' (राशि-सापेक्ष whole-sign पठन)');
 facts.push(pc.node?'राशि-गरिमा: नहीं जाँची (नोड-गरिमा पर मत-भेद)':(pc.dignity?'राशि-स्थिति: '+pc.dignity:'राशि-गरिमा की शर्त: इस युग्म के पाठ में नहीं'));
 if(pc.degreeZone){const dz=pc.degreeZone,zl=dz.invalid?'अंश-क्षेत्र: अमान्य अंश-मान (0° से 30° के बाहर) — क्षेत्र-जाँच लागू नहीं':dz.missing?'अंश-क्षेत्र: उपलब्ध नहीं':dz.boundary?'अंश-क्षेत्र: सीमा के ±0.01° के भीतर — सावधानीवश कोई क्षेत्र-लेबल नहीं; यह खिड़की सॉफ्टवेयर की चुनी हुई सीमा-सहनशीलता है':dz.zone?'अंश-क्षेत्र: '+dz.zone:null;if(zl)facts.push(zl);}
 if(pc.pakshaNote)facts.push('चन्द्र-पक्ष (जन्म-तिथि से): '+(pc.paksha==='shukla'?'शुक्ल':'कृष्ण'));
 return `<div class="dasha-phal dasha-pair"><h4>${esc(scope)}: ${esc(G[mahaLord]||mahaLord)} / ${esc(G[antarLord]||antarLord)} · पाठ्य अंतर्दशा फल-चर्चा (${esc(pc.rec.ref)})</h4><div class="suite-facts">${facts.map(f=>`<div>${esc(f)}</div>`).join('')}</div><p><strong>अनुकूल शर्तें जो बनीं:</strong></p>${pc.favH.length?pc.favH.map(f=>`<p>· ${esc(f.basis)}</p>`).join(''):'<p>· कोई नामित अनुकूल शर्त नहीं बनी — इसका अर्थ प्रतिकूलता नहीं।</p>'}<p><strong>प्रतिकूल शर्तें जो बनीं:</strong></p>${pc.advH.length?pc.advH.map(f=>`<p>· ${esc(f.basis)}</p>`).join(''):'<p>· कोई नामित प्रतिकूल शर्त नहीं बनी — इसका अर्थ अनुकूलता नहीं।</p>'}<p><strong>अनुकूल परिस्थितियों की चर्चा:</strong> ${esc(pc.rec.fav)}</p>${pc.rec.mid?`<p><strong>मिश्रित/काल-विभाजित चर्चा:</strong> ${esc(pc.rec.mid)}</p>`:''}<p><strong>प्रतिकूल परिस्थितियों की चर्चा:</strong> ${esc(pc.rec.adv)}</p>${pc.pakshaNote?`<p class="astro-note">${esc(pc.pakshaNote)}</p>`:''}${pc.notes.length?pc.notes.map(n=>`<p class="astro-note">${esc(n)}</p>`).join(''):''}${pc.omissions.length?`<p class="astro-note"><strong>लोप-सूचना:</strong> ${pc.omissions.map(esc).join(' ')}</p>`:''}<p class="astro-note">ये अलग-अलग शर्तें हैं, कुल अंक या निर्णय नहीं; अनुकूल और प्रतिकूल दोनों ओर की चर्चा हमेशा साथ दिखाई जाती है। शर्तें केवल इसी युग्म के पाठ से हैं; अन्य युग्मों से मिश्रित नहीं की गईं।</p><p class="source-note">अभी न जाँची गई शर्तें: ${pc.unmodeled.map(esc).join('; ')}। स्रोत: jyotishvidya.com का ऑनलाइन BPHS अध्याय ${esc(pc.ch)} अनुवाद (एकल, अनाम अनुवादक; मुद्रित श्लोक-पुष्टि अभी बाकी)।</p></div>`;}
function renderDasha(){const all=J.dasha(moon.longitude,birth,dashaSystem,dashaSystem==='yogini'?4:2),periods=path.length?J.children(path[path.length-1]):all,now=Date.now(),active=J.activePath(all,now),depth=path.length+1,phalLord=path.length?path[0].lord:(active[0]||{}).lord,phalBlock=dashaSystem==='vimshottari'?dashaPhalBlock(phalLord,path.length?'चुनी महादशा':'वर्तमान महादशा'):'';let pairBlock='',deferNote='';
 if(dashaSystem==='vimshottari'){let pm=null,pa=null,pscope='';
  if(path.length===0){if(active.length>=2){pm=active[0].lord;pa=active[1].lord;pscope='वर्तमान अंतर्दशा';}}
  else if(path.length===1){const kids=J.children(path[0]),cur=kids.find(q=>q.start<=now&&now<q.end);if(cur){pm=path[0].lord;pa=cur.lord;pscope='चुनी महादशा की वर्तमान अंतर्दशा';}}
  else if(path.length===2){pm=path[0].lord;pa=path[1].lord;pscope='चुनी अंतर्दशा';}
  else deferNote='<p class="astro-note">प्रत्यन्तर/सूक्ष्म स्तर की पाठ्य फल-चर्चा अभी स्थगित है (समीक्षा में)। अंतर्दशा स्तर तक की चर्चा ऊपर के स्तरों पर देखें।</p>';
  if(pm&&pa)pairBlock=dashaPairBlock(pm,pa,pscope);}$('pane-dasha').innerHTML=panel('समय-सारणी, भविष्यवाणी नहीं',`<div class="suite-controls"><label>दशा पद्धति<select id="dashaSystem"><option value="vimshottari" ${dashaSystem==='vimshottari'?'selected':''}>विम्शोत्तरी · 120 वर्ष</option><option value="yogini" ${dashaSystem==='yogini'?'selected':''}>योगिनी · 36 वर्ष</option></select></label></div><p>दशा-वर्ष ${365.25} दिन। जन्म-नक्षत्र के बचे अंश से पहली दशा का शेष; उपदशाएँ पूरी मूल दशा के आरम्भ से, न कि केवल जन्म के बाद के शेष से।</p><p class="astro-note">अभी (${esc(stamp(now))}): ${active.map(p=>esc(G[p.lord]||p.lord)).join(' / ')||'चुने काल के बाहर'}। यह पेज खोलने का क्षण है, अपने से ताजा नहीं होता।</p><div class="suite-breadcrumb">${path.length?'<button type="button" id="dashaUp">← ऊपर का स्तर</button>':''}<strong>${path.map(p=>G[p.lord]||p.lord).join(' / ')||'महादशा'} · स्तर ${depth}/4</strong></div><div class="suite-periods">${periods.filter(p=>p.end>+birth).map((p,i)=>`<button type="button" class="suite-period ${p.start<=now&&now<p.end?'is-active':''}" data-period="${i}" ${depth===4?'disabled':''}><strong>${G[p.lord]||p.lord}${p.start<=now&&now<p.end?' · वर्तमान':''}</strong><span>${stamp(p.start)} से<br>${stamp(p.end)} तक</span>${p.start<+birth?'<small>मूल आरम्भ जन्म से पहले; जन्म पर शेष अवधि लागू</small>':''}<small>${depth<4?'अगला स्तर खोलें →':'सूक्ष्म अवधि'}</small></button>`).join('')}</div>${phalBlock}${pairBlock}${deferNote}<p class="source-note">तारीख-सीमाएँ [आरम्भ, अन्त) हैं। दूसरी वर्ष-लम्बाई/नक्षत्र गणना वाली सेवा में तारीख बदल सकती है। ${dashaSystem==='vimshottari'?'ऊपर की फल-चर्चा नियम-समूह (BPHS अध्याय 47-48) का सार है, इस जातक का व्यक्तिगत निर्णय नहीं।':'योगिनी दशा के पाठ्य फल अभी नहीं जोड़े; चुनी पद्धति बदलने पर विम्शोत्तरी की चर्चा दिखेगी।'}</p>`);$('dashaSystem').onchange=e=>{dashaSystem=e.target.value;path=[];renderDasha();};if($('dashaUp'))$('dashaUp').onclick=()=>{path.pop();renderDasha();};const visible=periods.filter(p=>p.end>+birth);document.querySelectorAll('[data-period]').forEach(b=>b.onclick=()=>{path.push(visible[+b.dataset.period]);renderDasha();});}
function renderAshtak(){const a=window.BrahmAshtak.ashtakvarga(ps,lagna);$('pane-ashtak').innerHTML=panel('अष्टकवर्ग: राशि के अनुसार योगदान',`<p>ऊपर की उसी Lahiri/mean-node गणना से राशि लेकर यह तालिका बनती है। राशि-सीमा के बहुत पास ग्रह/लग्न होने पर BAV भी बदल सकता है। BPHS66 के ऑनलाइन पाठ, स्थान/रेखा सूचियों का आधुनिक BAV रूप। सात ग्रह और लग्न योगदान देते हैं। राहु/केतु योगदानकर्ता नहीं; SAV में केवल सात ग्रहों के BAV जोड़े हैं, लग्न BAV नहीं। स्रोत में कुछ पाठ-पाठन अनुमानित/सुधारित हैं; स्कैन-सत्यापित संस्करण नहीं।</p><label>तालिका<select id="ashtakTarget"><option value="SAV">सर्वाष्टकवर्ग (SAV)</option>${Object.keys(a.bav).map(k=>`<option value="${k}">${G[k]||'लग्न'} BAV</option>`).join('')}</select></label><div id="ashtakValues"></div><p class="source-note">कुल/सीमा जाँच और तीन स्वतंत्र fixed-sign परीक्षणों में हर कोशिका मिलाई गई है। यह सभी सम्भव जन्म-चार्टों या Astrotalk की गणना का प्रमाण नहीं। न शोधन न पिण्ड-आयु की गणना की गई है।</p>`);const update=()=>{const k=$('ashtakTarget').value,v=k==='SAV'?a.sav:a.bav[k];$('ashtakValues').innerHTML=`<p>कुल: <strong>${v.reduce((x,y)=>x+y,0)}</strong> · राशि 1 से 12</p><div class="suite-bindu">${v.map((n,i)=>`<article><span>${i+1} ${R[i]}</span><strong>${n}</strong>${k==='SAV'?'':`<details><summary>योगदान</summary><p>${a.detail[k][i].map(c=>{const [name,h]=c.split(' / ');return (G[name]||'लग्न')+' से '+h;}).join(', ')||'कोई योगदान नहीं'}</p></details>`}</article>`).join('')}</div>`;};$('ashtakTarget').onchange=update;update();}renderAshtak();
const ys=window.BrahmRules.yogas(ps,ls),todayPlanets=A.grahaPositions(new Date(),{node:'mean'}),dg=window.BrahmRules.doshaGeometry(ps,ls,todayPlanets);
function sukhaphalPanel(){
 const T=window.BrahmSukhaPhal;
 if(!T)return pending('भाव-फल: सुख भाव (BPHS ch15)','गणना-मॉड्यूल नहीं मिला; बिना आधार के फल-पंक्तियाँ अनुमान से नहीं दिखाई जातीं।');
 let rep;try{rep=T.report(ps.map(p=>({graha:p.graha,rashi:p.rashi,degreesInRashi:p.degreesInRashi})),ls);}catch(e){return pending('भाव-फल: सुख भाव (BPHS ch15)','गणना त्रुटि: '+e.message);}
 const rowsHtml=rep.rows.map(r=>`<details><summary>${r.ref} · ${esc(r.topic)} · ${r.polarity} · ${r.served?'शर्त बनी':'शर्त नहीं बनी'}</summary>
 <p><strong>शर्त:</strong> ${esc(r.condition)}</p>
 ${r.detail?`<p><strong>इस कुंडली में:</strong> ${esc(r.detail)}</p>`:''}
 ${r.served?`<p>${esc(r.text)}</p>`:'<p class="source-note">यह शर्त इस कुंडली में पूरी नहीं बनी; परंपरा-कथन नहीं दिखाया गया।</p>'}
 ${r.served&&r.transparency?`<p class="source-note">${esc(r.transparency)}</p>`:''}
 ${r.note?`<p class="source-note">${esc(r.note)}</p>`:''}
 <small>${r.ref} · परंपरा-वर्णित शर्त-पंक्ति, भविष्यकथन नहीं।</small></details>`).join('');
 return panel('भाव-फल: सुख भाव (BPHS ch15)',`
 <p>${rep.header}</p>
 <div class="suite-yogas">${rowsHtml}</div>
 <p class="source-note">${rep.omitNotice}</p>
 <p class="source-note">${rep.breadthNotice}</p>
 <p class="source-note">${rep.unmodeledNotice}</p>
 <p class="source-note">${rep.nodesNote}</p>
 <p class="source-note">${rep.scope} स्रोत: ${rep.source}।</p>`);
}
function riputphalPanel(){
 const T=window.BrahmRipuPhal;
 if(!T)return pending('भाव-फल: रिपु भाव (BPHS ch17)','गणना-मॉड्यूल नहीं मिला; बिना आधार के फल-पंक्तियाँ अनुमान से नहीं दिखाई जातीं।');
 let rep;try{rep=T.report(ps.map(p=>({graha:p.graha,rashi:p.rashi,degreesInRashi:p.degreesInRashi})),ls);}catch(e){return pending('भाव-फल: रिपु भाव (BPHS ch17)','गणना त्रुटि: '+e.message);}
 return panel('भाव-फल: रिपु भाव (BPHS ch17)',`
 <p>${rep.header}</p>
 <p class="source-note">${rep.omitNotice}</p>
 <p class="source-note">${rep.breadthNotice}</p>
 <p class="source-note">${rep.unmodeledNotice}</p>
 <p class="source-note">${rep.nodesNote}</p>
 <p class="source-note">${rep.scope} स्रोत: ${rep.source}।</p>`);
}
function bhagyaphalPanel(){
 const T=window.BrahmBhagyaPhal;
 if(!T)return pending('भाव-फल: भाग्य भाव (BPHS ch20)','गणना-मॉड्यूल नहीं मिला; बिना आधार के फल-पंक्तियाँ अनुमान से नहीं दिखाई जातीं।');
 let rep;try{rep=T.report(ps.map(p=>({graha:p.graha,rashi:p.rashi,degreesInRashi:p.degreesInRashi})),ls);}catch(e){return pending('भाव-फल: भाग्य भाव (BPHS ch20)','गणना त्रुटि: '+e.message);}
 const rowsHtml=rep.rows.map(r=>`<details><summary>${r.ref} · ${esc(r.topic)} · ${r.polarity} · ${r.served?'शर्त बनी':'शर्त नहीं बनी'}</summary>
 <p><strong>शर्त:</strong> ${esc(r.condition)}</p>
 ${r.detail?`<p><strong>इस कुंडली में:</strong> ${esc(r.detail)}</p>`:''}
 ${r.served?`<p>${esc(r.text)}</p>`:'<p class="source-note">यह शर्त इस कुंडली में पूरी नहीं बनी; परंपरा-कथन नहीं दिखाया गया।</p>'}
 ${r.served&&r.transparency?`<p class="source-note">${esc(r.transparency)}</p>`:''}
 ${r.note?`<p class="source-note">${esc(r.note)}</p>`:''}
 <small>${r.ref} · परंपरा-वर्णित शर्त-पंक्ति, भविष्यकथन नहीं।</small></details>`).join('');
 return panel('भाव-फल: भाग्य भाव (BPHS ch20)',`
 <p>${rep.header}</p>
 <div class="suite-yogas">${rowsHtml}</div>
 <p class="source-note">${rep.omitNotice}</p>
 <p class="source-note">${rep.breadthNotice}</p>
 <p class="source-note">${rep.unmodeledNotice}</p>
 <p class="source-note">${rep.nodesNote}</p>
 <p class="source-note">${rep.scope} स्रोत: ${rep.source}।</p>`);
}
function randhraphalPanel(){
 const T=window.BrahmRandhraPhal;
 if(!T)return pending('भाव-फल: रन्ध्र भाव (BPHS ch19)','गणना-मॉड्यूल नहीं मिला; बिना आधार के फल-पंक्तियाँ अनुमान से नहीं दिखाई जातीं।');
 let rep;try{rep=T.report(ps.map(p=>({graha:p.graha,rashi:p.rashi,degreesInRashi:p.degreesInRashi})),ls);}catch(e){return pending('भाव-फल: रन्ध्र भाव (BPHS ch19)','गणना त्रुटि: '+e.message);}
 return panel('भाव-फल: रन्ध्र भाव (BPHS ch19)',`
 <p>${rep.header}</p>
 <p class="source-note">${rep.omitNotice}</p>
 <p class="source-note">${rep.breadthNotice}</p>
 <p class="source-note">${rep.unmodeledNotice}</p>
 <p class="source-note">${rep.nodesNote}</p>
 <p class="source-note">${rep.scope} स्रोत: ${rep.source}।</p>`);
}
function phalMethodPanel(){
 return panel('भाव-फल पंक्तियाँ: पद्धति-सीमा',`
 <p>यह सीमा-सूचना इस रिपोर्ट की सभी भाव-फल (BPHS अध्याय 12-23) शर्त-फल पंक्तियों पर लागू है।</p>
 <p>युति/दृष्टि-शर्तें पूरे राशि-आधारित (whole-sign) हैं — दृष्टि केवल उपस्थित/अनुपस्थित मानी जाती है। BPHS अध्याय 26 की अंश-सटीक क्रमांकित दृष्टि-पद्धति फल-पंक्तियों के लिए यहाँ प्रयुक्त नहीं है; यह एक नामित, सुविवेचित सरलीकरण है — स्रोत-सटीक पद्धति का दावा नहीं।</p>
 <p>शर्तों में केवल सात ग्रह भाग लेते हैं; राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल है (उनकी भाव-स्थिति केवल तथ्य के रूप में दिखती है)। शुभ/पाप वर्गीकरण BPHS 3.11 के अनुसार पक्ष-सापेक्ष चन्द्र और युति-सापेक्ष बुध के साथ गणना से लिया जाता है।</p>
 <p class="source-note">ये पंक्तियाँ परंपरा-वर्णित शर्त-कथन हैं; भविष्यकथन, निश्चय या निर्णय नहीं।</p>`);
}
$('pane-report').innerHTML=bhavaphalPanel()+phalMethodPanel()+tanuPanel()+yutiphalPanel()+labhaPanel()+karmaphalPanel()+dhanaphalPanel()+vyayaphalPanel()+sahajaphalPanel()+sukhaphalPanel()+riputphalPanel()+bhagyaphalPanel()+randhraphalPanel()+e3YogaPanel()+e4YogaPanel()+panel('गणना-आधारित सार',`<p>${esc(name)} के दिए समय पर लग्न ${R[ls]}, चन्द्र ${R[moon.rashi]}, नक्षत्र ${N[moon.nakshatra]} पाद ${moon.pada} है। यह स्थिति का सार है, चरित्र या भविष्य का तथ्य नहीं। व्यक्तिगत सम्पूर्ण फलादेश अभी तैयार नहीं।</p>`)+panel('योग: चुने स्रोत के ज्यामितीय नियम',`<p>Phaladeepika6 के सीमित नियम। पूरे ग्रंथ या Astrotalk के हर योग की सूची नहीं। मंगल/बुध/गुरु/शुक्र/शनि के kendra + स्व/उच्च राशि, चन्द्र के 2/12, गुरु-चन्द्र kendra/6-8-12 और सूर्य-चन्द्र भाव-श्रेणी की जाँच है। राहु/केतु Sunapha समूह में नहीं। पंचमहापुरुष में लग्न और चन्द्र, दोनों मूल Phaladeepika6.4 की इस नामित व्याख्या में अलग जाँचे जाते हैं।</p><p>${mahaCountNote(ys)}</p><div class="suite-yogas">${ys.map(y=>`<details><summary>${y.name} · ${y.level?('स्थिति: '+y.level):(y.hit?(y.cancelled?'स्थिति बनी, नामित रद्द-शर्त भी बनी':'इस नियम की स्थिति बनी'):'इस नियम की स्थिति नहीं बनी')}</summary><p>${esc(y.reason)}</p>${phalLine(y)}<small>${y.source} · यह गठन की जाँच है, फल की गारंटी नहीं।</small></details>`).join('')}</div><p class="suite-pending">Kemadruma/शकट पर केवल उसी श्लोक की नामित रद्द-शर्त दिखाई है; BPHS की अन्य भंग-शर्तें, Neecha Bhanga के अर्थ-भेद, अन्य राजयोग और विस्तृत फल अभी अधूरे हैं। न दिखना, उस योग का न होना नहीं है।</p>`)+panel('दोष: स्थिति-जाँच, निर्णय नहीं',`<h4>मंगल की स्थिति</h4><p>मंगल लग्न से ${dg.marsHouse} भाव में। BPHS80.47 की सूची 1/4/7/8/12 का स्थिति वाला भाग ${dg.marsPlacement?'मिलता':'नहीं मिलता'} है। शुभ दृष्टि/युति, अपवाद और अन्य पद्धतियों की पूरी जाँच बाकी है। इसलिए इसे अंतिम Manglik हाँ/नहीं नहीं कहते।</p><h4>अर्धवृत्त: संख्यात्मक जाँच</h4><p>${dg.axis}। यह राहु-अक्ष से सात ग्रहों के स्थान की आधुनिक diagnostic जाँच है, Kalsarpa दोष का निर्णय नहीं। 0.01° के भीतर किनारे को अनिर्णीत रखना केवल software की सावधानी है, शास्त्रीय सीमा नहीं। इसका मूल शास्त्रीय स्रोत सत्यापित नहीं, इसलिए पूर्ण दोष में नहीं गिना गया।</p><h4>Sade Sati का वर्तमान राशि-संबंध</h4><p>${esc(stamp(Date.now()))} पर शनि जन्म-चन्द्र से ${dg.saturnFromMoon} भाव में। ${dg.sadeSati?'12/1/2 वाली प्रचलित Sade Sati गणना में '+dg.sadeSati+' चरण की राशि-स्थिति है।':'12/1/2 वाली Sade Sati की राशि-स्थिति नहीं है।'} पूर्ण प्रवेश/निकास तारीखें और व्याख्या अभी नहीं।</p><p class="source-note">गणना का क्षण लिखा है; अपने से live refresh नहीं। न स्वास्थ्य/विवाह/धन के नुकसान का दावा, न अनिवार्य उपाय या खरीद।</p>`)+pending('Rudraksha, रत्न, मंत्र और उपाय','प्रामाणिक, अनुमत सामग्री चाहिए। नया मंत्र, पहनने की विधि, पूजा-विधि या निश्चित लाभ गढ़कर नहीं लिखा जाएगा। इस पूर्वावलोकन में कोई रत्न खरीद/सलाह नहीं।');
function phalLine(y){if(y.level)return '<p class="yoga-phal"><strong>ग्रंथ का वर्णित वर्गीकरण (परंपरा):</strong> '+esc(y.phal)+'</p>';if(!y.hit)return '';if(y.cancelled)return '<p class="yoga-phal">रद्द-शर्त बनी है, इसलिए वर्णित फल लागू नहीं किया गया।</p>';if(y.subsumed)return '<p class="yoga-phal">यह स्थिति दुरुधरा में समाहित है; Phaladeepika6.5 की "क्रमशः" पढ़ने पर अलग फल-कार्ड नहीं।</p>';return y.phal?'<p class="yoga-phal"><strong>ग्रंथ का वर्णित फल (परंपरा):</strong> '+esc(y.phal)+'</p>'+(y.omit?'<p class="source-note">तकनीकी लोप: '+y.omit+' पद सुरक्षा-नीति से हटाए गए (ऑडिट दर्ज)</p>':''):'';}
function mahaCountNote(ys){const s=window.BrahmRules.panchaMaha(ys),detail=s.entries.map(e=>e.name.replace(' (पंचमहापुरुष)','')+' ('+e.origins.join('+')+')').join(', ');return 'इस कुंडली में पंचमहापुरुष-योग: '+s.count+(detail?' — '+detail:'')+'। एक ही योग लग्न और चन्द्र दोनों मूल से बने तो गिनती एक ही (6.4 के पञ्चक-वाक्य के अनुसार भिन्न योगों की गिनती); मूल-विवरण कोष्ठक में। Phaladeepika6.4 की परंपरागत श्रेणी: 1 भाग्यवान, 2 राजा-समान, 3 राजा, 4 सम्राट, 5 उससे अधिक — ग्रंथ की श्रेणी-चर्चा है, पद की गारंटी नहीं।';}
function setTab(id,focus=false){currentTab=id;tabs.forEach(([k])=>{$('pane-'+k).hidden=k!==id;$('tab-'+k).setAttribute('aria-selected',String(k===id));$('tab-'+k).tabIndex=k===id?0:-1;});if(focus)$('tab-'+id).focus();}
tabs.forEach(([id],i)=>{$('tab-'+id).onclick=()=>setTab(id);$('tab-'+id).onkeydown=e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();setTab(tabs[n][0],true);}};});
$('editBirth').onclick=()=>{$('astroForm').scrollIntoView({behavior:'smooth'});$('astroDate').focus();};
if(window.BrahmPrintCleanup)window.BrahmPrintCleanup();const beforePrint=()=>{document.querySelectorAll('#astroResult details:not([open])').forEach(d=>{d.dataset.printOpen='1';d.open=true;});};const afterPrint=()=>{delete document.body.dataset.kundliPrint;if($('kundliGallery'))$('kundliGallery').remove();document.querySelectorAll('#astroResult details[data-print-open]').forEach(d=>{d.open=false;delete d.dataset.printOpen;});};window.addEventListener('beforeprint',beforePrint);window.addEventListener('afterprint',afterPrint);window.BrahmPrintCleanup=()=>{window.removeEventListener('beforeprint',beforePrint);window.removeEventListener('afterprint',afterPrint);};
$('printResult').onclick=()=>{afterPrint();window.print();};
$('printGallery').onclick=()=>{afterPrint();const el=document.createElement('div');el.id='kundliGallery';el.innerHTML=window.BrahmGallery.build({J,ps,lagna,draw,G,R,d60Origin,esc,ashtak:window.BrahmAshtak.ashtakvarga(ps,lagna)});$('astroResult').appendChild(el);document.body.dataset.kundliPrint='gallery';window.print();};
$('saveBirth').onclick=()=>{const entry={schema:1,name,date,time,location:l,place:coords(l),savedAt:new Date().toISOString()};try{if(ctx.save){ctx.save(entry);$('savedNotice').textContent='सेव का अनुरोध इस उपकरण के लिए किया गया। नीचे storage status देखें।';}else{const prev=JSON.parse(localStorage.getItem('bt-kundli-v1')||'[]');if(!Array.isArray(prev))throw Error('Invalid saved data');localStorage.setItem('bt-kundli-v1',JSON.stringify([entry,...prev].slice(0,8)));$('savedNotice').textContent='इसी ब्राउज़र में सेव हुई। shared device पर निजी जन्म-विवरण सेव न करें। ऊपर Saved सूची से मिटा सकते हैं।';window.dispatchEvent(new Event('bt-kundli-saved'));}}catch(e){$('savedNotice').textContent='सेव नहीं हो सकी। ब्राउज़र storage बंद या भरा हो सकता है।';}};
renderKundli();renderCharts();renderDasha();
window.__BrahmLast={birth:birth.toISOString(),lagna,planets:ps};
}};
})();
