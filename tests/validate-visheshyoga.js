/* E4 vishesh-yoga fixtures: Phaladeepika 6.14 (rule-fact only), 6.19
vasumat/pushkala, 6.21-6.25 rules+phal. Ruling fixtures (docs/section-e4-
rules-draft.md §9.3): mahabhagya gender-rule no-row, pushkala अनिर्णीत-path +
"बल-शर्त अमॉडल" + per-condition negatives, vasumat BPHS 7.36 pin +
reference-Moon exclusion, subha/asubhamala exact-set + shared-6th,
lakshmi dignity ±, gauri 5/7/9 drishti controls, omission invariants
(6.15 never rendered; 80/अस्सी/दीर्घायु/रोग-मुक्त/अरोगी/वध absent),
docs asserts (6.21 anomaly, dhira/adhira, 7.36 pin), UI count-only scan. */
'use strict';
const fs=require('fs');
const M=require('../kundli-visheshyoga.js');
let pass=0,fail=0;
const ok=(c,m)=>{if(c){pass++;}else{fail++;console.error('FAIL:',m);}};
const mk=arr=>arr.map(([g,r,d])=>({graha:g,rashi:r,degreesInRashi:d}));
const row=(rep,k)=>rep.rows.find(r=>r.key===k);
const allReps=[];
const R=(planets,lagna)=>{const r=M.report(mk(planets),lagna);allReps.push(r);return r;};

// ---------- 1. Mahabhagya: gender rule — never बनी/नहीं, no phal ----------
ok(M.report.length===2,'mahabhagya: report() takes only (planets,lagnaSign) — no gender/day-night input exists');
let rep=R([['Sun',0,10],['Moon',3,15],['Mars',4,10],['Mercury',1,12],['Jupiter',8,2],['Venus',5,20],['Saturn',10,25]],0);
ok(row(rep,'mahabhagya').status==='अमॉडल','mahabhagya always अमॉडल');
ok(!row(rep,'mahabhagya').phal,'mahabhagya never carries phal (6.15 never rendered)');
ok(row(rep,'mahabhagya').reason.includes('लिंग-सशर्त'),'mahabhagya rule-fact names gender condition');
ok(row(rep,'mahabhagya').sloka==='6.14','mahabhagya sloka is 6.14 only');
rep=R([['Sun',0,10],['Moon',2,15],['Mars',4,10],['Mercury',1,12],['Jupiter',8,2],['Venus',5,20],['Saturn',10,25]],8);
ok(row(rep,'mahabhagya').status==='अमॉडल'&&!row(rep,'mahabhagya').phal,'mahabhagya gate holds on second chart (odd-sign Sun/Moon/lagna)');

// ---------- 2. Vasumat ----------
// lagna-based बनी: lagna Mesha; benefics Mercury Makara, Jupiter Mithuna, Venus Kanya; Moon waning (पाप, uncounted)
rep=R([['Sun',0,10],['Moon',7,15],['Mars',4,10],['Mercury',9,12],['Jupiter',2,2],['Venus',5,20],['Saturn',10,25]],0);
let v=row(rep,'vasumat');
ok(v.status==='बनी'&&v.variant==='वसुमत्'&&v.reason.includes('लग्न से उपचय'),'vasumat lagna-based बनी');
ok(v.phal===M.PHAL.vasumat.text&&v.sloka==='6.19 (नियम) + 6.20 (फल)','vasumat phal + sloka');
ok(v.source&&v.source.includes('BPHS 7.36'),'vasumat row carries BPHS 7.36 pin (ruling iii)');
// moon-based बनी: waxing Moon at Karka is a benefic but excluded as reference; Jupiter Vrischika fails lagna-reckoning
rep=R([['Sun',0,10],['Moon',3,15],['Mars',4,10],['Mercury',1,12],['Jupiter',8,2],['Venus',5,20],['Saturn',10,25]],0);
v=row(rep,'vasumat');
ok(v.status==='बनी'&&v.reason.includes('चन्द्र से उपचय'),'vasumat moon-based बनी');
ok(v.reason.includes('संदर्भ-चन्द्र'),'vasumat moon-reckoning names reference-exclusion decision');
ok(!v.reason.includes('(चन्द्र,'),'vasumat moon-based reason does not list reference Moon in reckoned set');
// नहीं: Venus Tula outside upachaya from both lagna(Mesha) and waning Moon(Vrischika)
rep=R([['Sun',0,10],['Moon',7,15],['Mars',4,10],['Mercury',9,12],['Jupiter',2,2],['Venus',6,20],['Saturn',10,25]],0);
v=row(rep,'vasumat');
ok(v.status==='नहीं बनी'&&v.reason.includes('उपचय-बाहर'),'vasumat नहीं when a benefic outside upachaya from both');
// अनिर्णीत-वर्ग: Mercury Rahu-yuti
rep=R([['Sun',0,10],['Moon',7,15],['Mars',4,10],['Mercury',9,12],['Jupiter',2,2],['Venus',5,20],['Saturn',10,25],['Rahu',9,3],['Ketu',3,3]],0);
v=row(rep,'vasumat');
ok(v.status==='अनिर्णीत'&&v.reason.includes('अनिश्चित')&&!v.phal,'vasumat अनिर्णीत on unresolved class, no phal');
ok(row(rep,'subhamala').status==='अनिर्णीत'&&row(rep,'asubhamala').status==='अनिर्णीत','subha/asubhamala अनिर्णीत on same unresolved class');
ok(!row(rep,'subhamala').phal&&!row(rep,'asubhamala').phal,'अनिर्णीत mala rows carry no phal');

// ---------- 3. Pushkala ----------
// अनिर्णीत via kendra path: lagna Makara; Moon Tula -> Venus; Venus+Saturn yuti Tula (kendra-10); Jupiter Karka aspects lagna
rep=R([['Sun',8,5],['Moon',6,15],['Mars',9,10],['Mercury',8,12],['Jupiter',3,2],['Venus',6,20],['Saturn',6,25]],9);
let p=row(rep,'pushkala');
ok(p.status==='अनिर्णीत'&&p.reason.includes('बल-शर्त अमॉडल'),'pushkala अनिर्णीत-path with बल-शर्त अमॉडल reason (ruling i)');
ok(!p.phal,'pushkala अनिर्णीत carries no phal (no-phal gate)');
ok(p.reason.includes('kendra'),'pushkala kendra path named');
// अनिर्णीत via adhimitra path: lagna Kumbha; Moon Kanya -> Mercury; Mercury+Saturn yuti Tula; host Venus at Dhanu = अधिमित्र of both
rep=R([['Sun',8,5],['Moon',5,15],['Mars',9,10],['Mercury',6,12],['Jupiter',4,2],['Venus',8,20],['Saturn',6,25]],10);
p=row(rep,'pushkala');
ok(p.status==='अनिर्णीत'&&p.reason.includes('अधिमित्र-राशि'),'pushkala अधिमित्र path (Q3 conservative: host adhimitra of both)');
// negative: no yuti
rep=R([['Sun',8,5],['Moon',6,15],['Mars',9,10],['Mercury',8,12],['Jupiter',3,2],['Venus',6,20],['Saturn',10,25]],9);
p=row(rep,'pushkala');
ok(p.status==='नहीं बनी'&&p.reason.includes('युति में नहीं'),'pushkala negative: no yuti');
// negative: same lord (Moon at Tula with Tula lagna)
rep=R([['Sun',8,5],['Moon',6,15],['Mars',9,10],['Mercury',8,12],['Jupiter',3,2],['Venus',6,20],['Saturn',1,25]],6);
p=row(rep,'pushkala');
ok(p.status==='नहीं बनी'&&p.reason.includes('एक ही ग्रह'),'pushkala negative: moon-lord = lagna-lord');
// negative: yuti but neither kendra nor adhimitra (host Venus at Mesha = 7th from yuti -> temporary enemy)
rep=R([['Sun',8,5],['Moon',5,15],['Mars',9,10],['Mercury',6,12],['Jupiter',4,2],['Venus',0,20],['Saturn',6,25]],10);
p=row(rep,'pushkala');
ok(p.status==='नहीं बनी'&&p.reason.includes('kendra नहीं')&&p.reason.includes('अधिमित्र भी नहीं'),'pushkala negative: kendra/adhimitra both absent');
// negative: yuti + kendra but no benefic lagna-aspect
rep=R([['Sun',8,5],['Moon',6,15],['Mars',9,10],['Mercury',5,12],['Jupiter',7,2],['Venus',6,20],['Saturn',6,25]],9);
p=row(rep,'pushkala');
ok(p.status==='नहीं बनी'&&p.reason.includes('शुभ-दृष्टि नहीं'),'pushkala negative: no benefic lagna-aspect');

// ---------- 4. Subhamala / Asubhamala ----------
// subhamala बनी: benefics at houses 5/6/7 from Mesha lagna (Moon waning)
rep=R([['Sun',0,10],['Moon',7,15],['Mars',9,10],['Mercury',6,12],['Jupiter',4,2],['Venus',5,20],['Saturn',1,25]],0);
let s=row(rep,'subhamala'),a=row(rep,'asubhamala');
ok(s.status==='बनी'&&s.variant==='शुभमाला'&&s.phal===M.PHAL.subhamala.text,'subhamala exact-set बनी');
ok(s.note&&s.note.includes('धीर'),'subhamala carries 6.22 धीर patha-uncertainty note (finding 2)');
ok(a.status==='नहीं बनी','asubhamala नहीं in subhamala chart');
// asubhamala बनी: benefics at houses 6/8/12
rep=R([['Sun',0,10],['Moon',7,15],['Mars',9,10],['Mercury',11,12],['Jupiter',5,2],['Venus',7,20],['Saturn',1,25]],0);
s=row(rep,'subhamala');a=row(rep,'asubhamala');
ok(a.status==='बनी'&&a.variant==='अशुभमाला'&&a.phal===M.PHAL.asubhamala.text,'asubhamala exact-set बनी (detection on शुभ-वर्ग, Q4)');
ok(a.omit===1,'asubhamala omission count = 1 (6.23 vadh line)');
ok(a.reason.includes('शुभा')&&a.reason.includes('anomaly'),'asubhamala reason names 6.21 Sanskrit/anomaly');
ok(s.status==='नहीं बनी','subhamala नहीं in asubhamala chart');
// shared-6th mixed {5,6,12}: both नहीं
rep=R([['Sun',0,10],['Moon',7,15],['Mars',9,10],['Mercury',11,12],['Jupiter',4,2],['Venus',5,20],['Saturn',1,25]],0);
ok(row(rep,'subhamala').status==='नहीं बनी'&&row(rep,'asubhamala').status==='नहीं बनी','shared-6th split {5,6,12} -> both नहीं (set-membership)');
// off-by-one {5,6,8}: subhamala fails (8 not in 5/6/7), asubhamala fails (5-house 5th not in 6/8/12... 8 yes, but set must be subset)
rep=R([['Sun',0,10],['Moon',9,15],['Mars',9,10],['Mercury',7,12],['Jupiter',4,2],['Venus',5,20],['Saturn',1,25]],0);
ok(row(rep,'subhamala').status==='नहीं बनी','subhamala off-by-one negative (7th->8th)');
ok(row(rep,'asubhamala').status==='नहीं बनी','asubhamala off-by-one negative (5th present)');

// ---------- 5. Lakshmi ----------
// बनी: lagna Mesha -> 9L Jupiter at Dhanu (own, 9th trikona); Venus Tula (own, 7th kendra)
rep=R([['Sun',0,10],['Moon',7,15],['Mars',4,10],['Mercury',9,12],['Jupiter',8,2],['Venus',6,20],['Saturn',1,25]],0);
let l=row(rep,'lakshmi');
ok(l.status==='बनी'&&l.variant==='लक्ष्मी'&&l.phal===M.PHAL.lakshmi.text,'lakshmi बनी (9L + Venus dignified kendra/trikona)');
ok(l.omit===1,'lakshmi omission count = 1 (6.24 arogi sentence, ruling ii)');
// नहीं: Venus Kumbha (not own/exalted)
rep=R([['Sun',0,10],['Moon',7,15],['Mars',4,10],['Mercury',9,12],['Jupiter',8,2],['Venus',10,20],['Saturn',1,25]],0);
ok(row(rep,'lakshmi').status==='नहीं बनी','lakshmi नहीं when Venus undignified');
// 9L = Venus merge: lagna Kanya -> 9th Vrishabha -> Venus; Venus at Vrishabha (own, 9th trikona) -> बनी single-graha
rep=R([['Sun',0,10],['Moon',7,15],['Mars',4,10],['Mercury',9,12],['Jupiter',8,2],['Venus',1,20],['Saturn',2,25]],5);
l=row(rep,'lakshmi');
ok(l.status==='बनी'&&l.reason.includes('एक ही ग्रह'),'lakshmi 9L=Venus merge बनी with single-graha reason');
// merge नहीं: Venus Simha (undignified)
rep=R([['Sun',0,10],['Moon',7,15],['Mars',4,10],['Mercury',9,12],['Jupiter',8,2],['Venus',4,20],['Saturn',2,25]],5);
ok(row(rep,'lakshmi').status==='नहीं बनी','lakshmi 9L=Venus merge नहीं');

// ---------- 6. Gauri: 5/7/9 Jupiter-drishti positive controls + negative ----------
const gauriBase=jupSign=>[['Sun',0,10],['Moon',3,15],['Mars',4,10],['Mercury',9,12],['Jupiter',jupSign,2],['Venus',6,20],['Saturn',1,25]];
rep=R(gauriBase(11),3); // Jupiter Meena -> 5th aspect on Moon Karka
let g=row(rep,'gauri');
ok(g.status==='बनी'&&g.reason.includes('विशेष 5वीं'),'gauri बनी via Jupiter 5th aspect');
rep=R(gauriBase(9),3); // Jupiter Makara -> 7th
g=row(rep,'gauri');
ok(g.status==='बनी'&&g.reason.includes('7वीं'),'gauri बनी via Jupiter 7th aspect');
rep=R(gauriBase(7),3); // Jupiter Vrischika -> 9th
g=row(rep,'gauri');
ok(g.status==='बनी'&&g.reason.includes('विशेष 9वीं'),'gauri बनी via Jupiter 9th aspect');
rep=R(gauriBase(0),3); // Jupiter Mesha -> no aspect on Karka
ok(row(rep,'gauri').status==='नहीं बनी'&&row(rep,'gauri').reason.includes('गुरु-दृष्टि नहीं'),'gauri नहीं without Jupiter aspect');
rep=R(gauriBase(9),3); // Moon not own/exalted variant:
rep=R([['Sun',0,10],['Moon',6,15],['Mars',4,10],['Mercury',9,12],['Jupiter',9,2],['Venus',6,20],['Saturn',1,25]],3);
ok(row(rep,'gauri').status==='नहीं बनी'&&row(rep,'gauri').reason.includes('स्व/उच्च नहीं'),'gauri नहीं when Moon undignified');

// ---------- 7. Global invariants across every run ----------
for(const r of allReps){
 for(const x of r.rows){
  ok(x.status!=='बनी'||x.key!=='pushkala','pushkala never बनी ('+x.key+' in a run)');
  ok(!(x.status==='अनिर्णीत'&&x.phal),'अनिर्णीत row never carries phal: '+x.key);
  ok(!(x.status==='अमॉडल'&&x.phal),'अमॉडल row never carries phal: '+x.key);
  ok(!(x.sloka&&x.sloka.includes('6.15')),'6.15 never a sloka source: '+x.key);
  if(x.phal)ok(x.phal.endsWith('वर्णन।'),'phal framed as वर्णन (no certainty): '+x.key);
 }}
const blob=JSON.stringify(allReps)+JSON.stringify(M.PHAL);
for(const leak of ['अस्सी','80','दीर्घायु','रोग-मुक्त','अरोगी','वध','आयुस्मान','अवश्य'])
 ok(!blob.includes(leak),'E4 content free of: '+leak);
ok(!/(?<!अ)निश्चित/.test(blob),'E4 content free of certainty word निश्चित (अनिश्चित allowed)');
ok(M.SRC.includes('Sastri 1950')&&M.SRC.includes('OCR')&&M.SRC.includes('vedicpupil'),'source tag: Sastri primary + OCR caveat + vedicpupil corroboration');
ok(M.UPACHAYA_PIN.includes('BPHS 7.36'),'module upachaya pin exported');
ok(rep.anomalyNote&&rep.anomalyNote.includes('6.21')&&rep.anomalyNote.includes('शुभा'),'report carries 6.21 Sanskrit/anomaly note');
ok(rep.decisions.includes('संदर्भ-चन्द्र'),'report decisions record reference-Moon exclusion');

// ---------- 8. Docs asserts ----------
const docs=fs.readFileSync(__dirname+'/../docs/section-e4-rules-draft.md','utf8');
ok(docs.includes('BPHS 7.36'),'docs: BPHS 7.36 pin recorded');
ok(docs.includes('dhira/adhira'),'docs: 6.22 धीर patha-uncertainty recorded');
ok(docs.includes('translation-anomaly')||docs.includes('विरोधी'),'docs: 6.21 vedicpupil anomaly recorded');
ok(docs.includes('संदर्भ-चन्द्र'),'docs: reference-Moon exclusion decision recorded');

// ---------- 9. UI scan: e4 panel generic count-only notice, no sensitive leak ----------
const ui=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
const i=ui.indexOf('function e4YogaPanel');
ok(i>0,'e4YogaPanel present in kundli-suite-ui.js');
const e4p=i>0?ui.slice(i,i+4000):'';
ok(e4p.includes('तकनीकी लोप'),'e4 panel renders generic count-only omission notice');
for(const leak of ['दीर्घायु','लघुायु','रोग-मुक्त','अरोगी','अस्सी','वध','आयुस्मान','6.15'])
 ok(!e4p.includes(leak),'e4 UI free of: '+leak);
ok(!/esc\(r\.omit\)/.test(e4p),'e4 omit count interpolated as number, not prose');
const html=fs.readFileSync(__dirname+'/../kundli.html','utf8');
ok(html.includes('kundli-visheshyoga.js'),'kundli.html loads kundli-visheshyoga.js');

console.log(`visheshyoga: ${pass} pass, ${fail} fail`);
if(fail)process.exit(1);
