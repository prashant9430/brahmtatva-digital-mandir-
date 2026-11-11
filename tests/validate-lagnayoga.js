/* E3 lagna/sun-yoga fixtures: Phaladeepika 6.8-6.13 detection, hitvendum scope,
class splits with अनिर्णीत propagation, kartari/susubha/amala rules, omission
invariants, source tags, negative controls. */
'use strict';
const M=require('../kundli-lagnayoga.js');
let pass=0,fail=0;
const ok=(c,m)=>{if(c){pass++;}else{fail++;console.error('FAIL:',m);}};
const throws=(fn,m)=>{try{fn();fail++;console.error('FAIL (no throw):',m);}catch(e){pass++;}};
const mk=arr=>arr.map(([g,r,d])=>({graha:g,rashi:r,degreesInRashi:d}));
const row=(rep,k)=>rep.rows.find(r=>r.key===k);

// base: Sun Aries 10°, others spread, no conjunctions with malefics for Mercury
const B=[['Sun',0,10],['Moon',4,15],['Mars',5,5],['Mercury',7,12],['Jupiter',8,2],['Venus',9,20],['Saturn',10,25]];

// 1. vesi/vasi/ubhayachari detection
let rep=M.report(mk([['Sun',0,10],['Moon',4,15],['Mars',5,5],['Mercury',7,12],['Jupiter',1,2],['Venus',8,20],['Saturn',10,25]]),3);
ok(row(rep,'vesi').status==='बनी'&&row(rep,'vesi').variant==='शुभ-वेशि','vesi benefic');
ok(row(rep,'vasi').status==='नहीं बनी','vasi empty');
ok(row(rep,'ubhayachari').status==='नहीं बनी','ubhayachari needs both sides');
rep=M.report(mk([['Sun',0,10],['Moon',4,15],['Mars',5,5],['Mercury',7,12],['Jupiter',8,2],['Venus',9,20],['Saturn',11,25]]),3);
ok(row(rep,'vasi').status==='बनी'&&row(rep,'vasi').variant==='पाप-वसि','vasi malefic');
rep=M.report(mk([['Sun',0,10],['Moon',4,15],['Mars',1,5],['Mercury',7,12],['Jupiter',8,2],['Venus',9,20],['Saturn',11,25]]),3);
ok(row(rep,'ubhayachari').status==='बनी'&&row(rep,'ubhayachari').variant==='पापोभयचरि','ubhayachari all-malefic');
rep=M.report(mk([['Sun',0,10],['Moon',4,15],['Mars',5,5],['Mercury',7,12],['Jupiter',1,2],['Venus',8,20],['Saturn',11,25]]),3);
ok(row(rep,'ubhayachari').status==='अनिर्णीत','ubhayachari opposite-side mixed -> अनिर्णीत (fixture 9)');

// 2. hitvendum: Moon alone in 2nd/12th from Sun => no yoga; nodes never count
rep=M.report(mk([['Sun',0,10],['Moon',1,15],['Mars',5,5],['Mercury',7,12],['Jupiter',8,2],['Venus',9,20],['Saturn',10,25]]),3);
ok(row(rep,'vesi').status==='नहीं बनी'&&row(rep,'vesi').reason.includes('हित्वेन्दुं'),'Moon excluded from vesi (hitvendum)');
rep=M.report(mk([...B,['Rahu',1,3],['Ketu',7,3]]),3);
ok(row(rep,'vesi').status==='नहीं बनी','node-only 2nd from Sun => no vesi');

// 3. class splits: mixed -> अनिर्णीत; अनिर्णीत-class occupant -> अनिर्णीत
rep=M.report(mk([['Sun',0,10],['Moon',4,15],['Mars',1,5],['Mercury',7,12],['Jupiter',1,2],['Venus',8,20],['Saturn',10,25]]),3);
ok(row(rep,'vesi').status==='अनिर्णीत','mixed benefic+malefic -> अनिर्णीत');
rep=M.report(mk([['Sun',0,10],['Moon',0,10],['Mars',5,5],['Mercury',7,12],['Jupiter',8,2],['Venus',9,20],['Saturn',10,25]]),3);
ok(rep.classes.Moon.cls==='अनिर्णीत','sandhi Moon अनिर्णीत (precondition)');
rep=M.report(mk([['Sun',3,10],['Moon',3,10],['Mars',5,5],['Mercury',7,12],['Jupiter',8,2],['Venus',9,20],['Saturn',10,25]]),6);
ok(row(rep,'amala').status==='अनिर्णीत'||row(rep,'amala').status==='नहीं बनी','sandhi-Moon-only amala not silently favourable');

// 4. kartari: both sides required
rep=M.report(mk([['Sun',0,10],['Moon',4,15],['Mars',5,5],['Mercury',7,12],['Jupiter',11,2],['Venus',9,20],['Saturn',10,25]]),0);
ok(row(rep,'kartari').status==='नहीं बनी','kartari one side only');
rep=M.report(mk([['Sun',0,10],['Moon',4,15],['Mars',5,5],['Mercury',7,12],['Jupiter',11,2],['Venus',1,20],['Saturn',10,25]]),0);
ok(row(rep,'kartari').status==='बनी'&&row(rep,'kartari').variant==='शुभ-कर्तरि','kartari both benefic');
ok(row(rep,'kartari').omit===2,'subhakartari 2 omissions counted');
rep=M.report(mk([['Sun',0,10],['Moon',4,15],['Mars',11,5],['Mercury',7,12],['Jupiter',8,2],['Venus',9,20],['Saturn',1,25]]),0);
ok(row(rep,'kartari').status==='बनी'&&row(rep,'kartari').variant==='पाप-कर्तरि','kartari both malefic');
ok(row(rep,'kartari').omit===3,'papakartari 3 omissions counted');

// 5. susubha: unaspected benefic 2nd -> बनी; malefic aspect -> नहीं; unresolved aspect -> अनिर्णीत
rep=M.report(mk([['Sun',3,10],['Moon',8,15],['Mars',5,5],['Mercury',2,12],['Jupiter',1,2],['Venus',1,20],['Saturn',6,25]]),0);
ok(row(rep,'susubha').status==='बनी'&&row(rep,'susubha').variant==='सुशुभ','susubha unaspected');
ok(row(rep,'susubha').note&&row(rep,'susubha').note.includes('6.13'),'susubha 6.13 note');
rep=M.report(mk([['Sun',3,10],['Moon',8,15],['Mars',10,5],['Mercury',2,12],['Jupiter',1,2],['Venus',1,20],['Saturn',6,25]]),0);
ok(row(rep,'susubha').status==='नहीं बनी'&&row(rep,'susubha').reason.includes('पाप-दृष्टि'),'susubha broken by malefic aspect');
rep=M.report(mk([['Sun',7,10],['Moon',7,10],['Mars',5,5],['Mercury',2,12],['Jupiter',1,2],['Venus',1,20],['Saturn',6,25]]),0);
ok(rep.classes.Moon.cls==='अनिर्णीत'&&row(rep,'susubha').status==='नहीं बनी'&&row(rep,'susubha').reason.includes('पाप-दृष्टि'),'susubha: malefic aspect takes precedence over unresolved (sandhi Moon+Sun co-aspect)');

// 6. Amala: lagna-10H / moon-10H / both / mixed / papa-only / paksha-Moon (fixture 8)
rep=M.report(mk([['Sun',0,10],['Moon',4,15],['Mars',5,5],['Mercury',7,12],['Jupiter',9,2],['Venus',2,20],['Saturn',10,25]]),0);
ok(row(rep,'amala').status==='बनी'&&row(rep,'amala').reason.includes('लग्न से 10वें'),'amala lagna-10H only');
rep=M.report(mk([['Sun',0,10],['Moon',5,15],['Mars',6,5],['Mercury',7,12],['Jupiter',2,2],['Venus',3,20],['Saturn',10,25]]),0);
ok(row(rep,'amala').status==='बनी'&&row(rep,'amala').reason.includes('चन्द्र से 10वें'),'amala moon-10H only');
rep=M.report(mk([['Sun',0,10],['Moon',5,15],['Mars',6,5],['Mercury',7,12],['Jupiter',2,2],['Venus',9,20],['Saturn',10,25]]),0);
ok(row(rep,'amala').status==='बनी'&&row(rep,'amala').reason.includes('दोनों'),'amala both sides');
rep=M.report(mk([['Sun',0,10],['Moon',4,15],['Mars',9,5],['Mercury',7,12],['Jupiter',9,2],['Venus',2,20],['Saturn',10,25]]),0);
ok(row(rep,'amala').status==='अनिर्णीत','amala mixed -> अनिर्णीत');
rep=M.report(mk([['Sun',0,10],['Moon',4,15],['Mars',5,5],['Mercury',7,12],['Jupiter',8,2],['Venus',2,20],['Saturn',9,25]]),0);
ok(row(rep,'amala').status==='नहीं बनी','amala papa-only -> नहीं');
// Moon in lagna-10H: waxing -> शुभ बनी; waning -> पाप नहीं; sandhi -> अनिर्णीत
rep=M.report(mk([['Sun',11,10],['Moon',3,10],['Mars',5,5],['Mercury',7,12],['Jupiter',8,2],['Venus',9,20],['Saturn',10,25]]),6);
ok(rep.classes.Moon.cls==='शुभ'&&row(rep,'amala').status==='बनी','amala via waxing Moon in lagna-10H');
rep=M.report(mk([['Sun',0,10],['Moon',9,10],['Mars',5,5],['Mercury',7,12],['Jupiter',8,2],['Venus',3,20],['Saturn',10,25]]),0);
ok(rep.classes.Moon.cls==='पाप'&&row(rep,'amala').status==='नहीं बनी','amala via waning Moon (papa-only) -> नहीं');
rep=M.report(mk([['Sun',0,10],['Moon',0,10],['Mars',5,5],['Mercury',7,12],['Jupiter',8,2],['Venus',9,20],['Saturn',10,25]]),3);
ok(rep.classes.Moon.cls==='अनिर्णीत'&&row(rep,'amala').status==='अनिर्णीत','amala via sandhi Moon -> अनिर्णीत');

// 7. Omission invariants + consistency line
const allText=Object.values(M.PHAL).map(p=>p.text).join(' ');
for(const bad of ['दीर्घायु','लघुायु','आयु','रोग-मुक्त','निरोग','अंग-हीन','पत्नी-पुत्र','वियोग','अपंग','remedy','उपाय'])
 ok(!new RegExp(bad,'i').test(allText),'absent: '+bad);
ok(!/long-lived|short-lived|free from disease|bereft of wife|deprived of some limb/i.test(allText),'English omitted clauses absent');
// 6.11 kept items balance
ok(M.PHAL.subhakartari.text.includes('निर्भय')&&M.PHAL.subhakartari.text.includes('शत्रु-रहित')&&M.PHAL.subhakartari.text.includes('धनी'),'6.11 subhakartari kept items');
ok(M.PHAL.papakartari.text.includes('दरिद्रता')&&M.PHAL.papakartari.text.includes('अप्रसन्नता'),'6.11 papakartari kept items');

// 8. Source tags / labels / certainty
ok(M.AMALA_SRC.includes('6.19 का amala-खंड')&&M.AMALA_SRC.includes('आंशिक-श्लोक उधार स्पष्ट'),'amala partial-verse label');
ok(M.NOTE613.includes('Sunapha')&&M.NOTE613.includes('कोई संश्लेषण नहीं'),'6.13 methodology note');
rep=M.report(mk(B),3);
ok(rep.source.includes('6.8-6.13')&&rep.source.includes('OCR'),'source tag + OCR caveat');
ok(rep.scope.includes('निश्चय नहीं'),'scope disclaimer');
for(const bad of ['निश्चित','अवश्य होगा','गारंटी'])ok(!allText.includes(bad),'no certainty: '+bad);
ok(rep.matbhedNote.includes('Saravali ch14'),'mat-bhed note present');

// 9. Input validation (E1-reuse throws)
throws(()=>M.report(mk([...B,['Sun',5,1]]),0),'duplicate Sun throws');
throws(()=>M.report(mk([['Sun',0,10],['Moon',1,12],['Mars',12,5],['Mercury',3,12],['Jupiter',4,2],['Venus',5,20],['Saturn',6,25]]),0),'rashi=12 throws');
throws(()=>M.report([{graha:'Sun',rashi:NaN,degreesInRashi:5},...mk(B).slice(1)],0),'NaN throws');
throws(()=>M.report(mk(B),12),'lagna 12 throws');


// 9a2. E4-Q7: amala फल = 6.12 + 6.20 विलीन (अतिरिक्त पद user-visible)
ok(M.PHAL.amala.text.includes('क्षिति-शासन')&&M.PHAL.amala.text.includes('पुत्र')&&M.PHAL.amala.text.includes('नीतिमान')&&M.PHAL.amala.text.includes('प्रसिद्ध'),'6.20 additions merged');
ok(M.PHAL.amala.text.includes('ऐतिहासिक अतिशयोक्ति'),'क्षिति-शासन hyperbole labeled');
ok(M.PHAL.amala.sloka==='6.12 + 6.20','amala sloka label 6.12 + 6.20');
ok(M.AMALA_SRC.includes('6.20')&&M.AMALA_SRC.includes('विलीन'),'AMALA_SRC records 6.20 merge');

// 9b. Gate-B1: चन्द्र-उपस्थिति तथ्य vesi-परिवार पंक्तियों में (transparency)
rep=M.report(mk([['Sun',0,10],['Moon',1,15],['Mars',5,5],['Mercury',7,12],['Jupiter',8,2],['Venus',9,20],['Saturn',10,25]]),3);
ok(row(rep,'vesi').status==='नहीं बनी'&&row(rep,'vesi').reason.includes('चन्द्र उपस्थित')&&row(rep,'vesi').reason.includes('योग-निर्माण से बाहर')&&row(rep,'vesi').reason.includes('चन्द्र के अतिरिक्त'),'Moon-only: presence stated, not implied empty');
rep=M.report(mk([['Sun',0,10],['Moon',1,15],['Mars',5,5],['Mercury',7,12],['Jupiter',1,2],['Venus',9,20],['Saturn',10,25]]),3);
ok(row(rep,'vesi').status==='बनी'&&row(rep,'vesi').reason.includes('गुरु')&&row(rep,'vesi').reason.includes('चन्द्र उपस्थित (हित्वेन्दुं'),'Moon+benefic: बनी via benefic, Moon fact shown');
rep=M.report(mk([['Sun',0,10],['Moon',11,15],['Mars',5,5],['Mercury',7,12],['Jupiter',1,2],['Venus',9,20],['Saturn',11,25]]),3);
ok(row(rep,'vasi').reason.includes('चन्द्र उपस्थित')&&row(rep,'ubhayachari').reason.includes('चन्द्र उपस्थित'),'vasi+ubhayachari Moon fact');
rep=M.report(mk(B),3);
ok(!row(rep,'vesi').reason.includes('चन्द्र उपस्थित'),'no Moon note when Moon absent');
// 9c. Gate-B2: 6.9 verse fidelity — "a King" (nrpo), no softening
ok(M.PHAL.subhavesi.text.includes('राजा')&&!M.PHAL.subhavesi.text.includes('राजा-तुल्य'),'6.9 शुभ-वेशि: राजा (nrpo) verbatim-faithful');

// 10. B1-शैली UI scan: E3 panel generic count-only notice, no sensitive categories
const fs=require('fs');
const uiSrc=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
const e3s=uiSrc.indexOf('function e3YogaPanel');
ok(e3s>0,'e3YogaPanel present in UI');
const e3e=uiSrc.indexOf('\nfunction ',e3s+1);
const e3p=uiSrc.slice(e3s,e3e>0?e3e:undefined);
ok(e3p.includes('तकनीकी लोप'),'generic omission notice in E3 UI');
for(const leak of ['दीर्घायु','लघुायु','रोग-मुक्त','पत्नी-पुत्र','अंग-हीन','वियोग','अपंग'])
 ok(!e3p.includes(leak),'E3 UI free of category: '+leak);
ok(!/esc\(r\.omit\)/.test(e3p),'count interpolated only as number, not escaped prose');
ok(e3p.includes('amalaSource')&&e3p.includes('matbhedNote'),'amala label + mat-bhed note rendered');

console.log(`lagnayoga: ${pass} pass, ${fail} fail`);
if(fail)process.exit(1);

