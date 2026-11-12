/* E1 bhava-phal fixtures: BPHS 26.2-5 drishti geometry, 3.11 classification
dynamics, 11.14-16 countable rows, omission-policy invariants, negative controls. */
'use strict';
const M=require('../kundli-bhavaphal.js'),S=require('../kundli-states.js');
let pass=0,fail=0;
const ok=(c,m)=>{if(c){pass++;}else{fail++;console.error('FAIL:',m);}};
const throws=(fn,m)=>{try{fn();fail++;console.error('FAIL (no throw):',m);}catch(e){pass++;}};
const mk=arr=>arr.map(([g,r,d])=>({graha:g,rashi:r,degreesInRashi:d}));
const BASE=[['Sun',0,10],['Moon',4,15],['Mars',3,5],['Mercury',1,12],['Jupiter',8,2],['Venus',11,20],['Saturn',9,25]];

// 1. Special drishti geometry (26.2-5), positive + negative controls
ok(M.drishti(0,6,'Sun')==='7वीं दृष्टि','7th general Sun');
ok(M.drishti(0,6,'Ketu'==='x'?'': 'Saturn')==='7वीं दृष्टि','7th general Saturn');
ok(M.drishti(0,3,'Mars')==='विशेष 4वीं दृष्टि','Mars 4th');
ok(M.drishti(0,7,'Mars')==='विशेष 8वीं दृष्टि','Mars 8th');
ok(M.drishti(0,4,'Mars')==='विशेष 5वीं दृष्टि'?false:M.drishti(0,4,'Mars')===null,'Mars NOT 5th');
ok(M.drishti(0,2,'Mars')===null,'Mars NOT 3rd');
ok(M.drishti(0,4,'Jupiter')==='विशेष 5वीं दृष्टि','Jupiter 5th');
ok(M.drishti(0,8,'Jupiter')==='विशेष 9वीं दृष्टि','Jupiter 9th');
ok(M.drishti(0,3,'Jupiter')===null,'Jupiter NOT 4th');
ok(M.drishti(0,2,'Saturn')==='विशेष 3वीं दृष्टि','Saturn 3rd');
ok(M.drishti(0,9,'Saturn')==='विशेष 10वीं दृष्टि','Saturn 10th');
ok(M.drishti(0,3,'Saturn')===null,'Saturn NOT 4th');
ok(M.drishti(0,1,'Venus')===null,'Venus NOT 2nd');

// 2. Paksha-dependent Moon class (3.11) with sandhi edge (1e-11 snap)
const withSunMoon=(se,me)=>mk([['Sun',0,se],['Moon',0,0],['Mars',3,5],['Mercury',1,12],['Jupiter',8,2],['Venus',11,20],['Saturn',9,25]].map(([g,r,d])=>g==='Moon'?[g,Math.floor(me/30),me%30]:[g,r,d]));
// elongation via explicit longitudes: Sun fixed at 10 deg Aries; Moon placed at sun+elong
const atElong=e=>{const sl=10,ml=sl+e;return mk([['Sun',0,sl],['Moon',Math.floor(ml/30)%12,ml%30],['Mars',5,5],['Mercury',7,12],['Jupiter',8,2],['Venus',9,20],['Saturn',11,25]]);};
ok(M.classes(atElong(90)).Moon.cls==='शुभ','waxing 90 benefic');
ok(M.classes(atElong(270)).Moon.cls==='पाप','waning 270 malefic');
ok(M.classes(atElong(0)).Moon.cls==='अनिर्णीत','exact 0 sandhi unresolved');
ok(M.classes(atElong(0)).Moon.note.includes('सन्धि'),'sandhi note present');
ok(M.classes(atElong(180)).Moon.cls==='अनिर्णीत','exact 180 sandhi unresolved');
ok(M.classes(atElong(0.000001)).Moon.cls==='शुभ','0+eps waxing');
ok(M.classes(atElong(180.000001)).Moon.cls==='पाप','180+eps waning');

// 3. Mercury conjunction-dependent class (3.11)
const mercWith=others=>mk([['Sun',0,10],['Moon',4,15],['Mars',5,5],['Mercury',2,12],...others]);
ok(M.classes(mercWith([['Jupiter',8,2],['Venus',9,20],['Saturn',11,25]])).Mercury.cls==='शुभ','Mercury alone benefic');
ok(M.classes(mercWith([['Jupiter',8,2],['Venus',2,20],['Saturn',11,25]])).Mercury.cls==='शुभ','Mercury+Venus benefic');
ok(M.classes(mercWith([['Jupiter',8,2],['Venus',9,20],['Saturn',2,25]])).Mercury.cls==='पाप','Mercury+Saturn malefic');
ok(M.classes(mercWith([['Jupiter',8,2],['Venus',2,20],['Saturn',2,25]])).Mercury.cls==='पाप','Mercury+Venus+Saturn malefic (one malefic suffices)');
// Mercury with sandhi Moon only -> unresolved
{const ps=mk([['Sun',0,10],['Moon',0,10],['Mars',5,5],['Mercury',0,12],['Jupiter',8,2],['Venus',9,20],['Saturn',11,25]]);
 ok(M.classes(ps).Mercury.cls==='पाप','Mercury+Sun malefic even with sandhi Moon');}
{const ps=mk([['Sun',3,0],['Moon',3,0],['Mars',5,5],['Mercury',3,12],['Jupiter',8,2],['Venus',9,20],['Saturn',11,25]]); // Sun+Moon exact same longitude: Moon sandhi; but Sun is malefic and conjunct Mercury
 ok(M.classes(ps).Mercury.cls==='पाप','Mercury conjunct Sun malefic');}
{const e=180.0,sl=10,ml=sl+e,ps=mk([['Sun',0,sl],['Moon',Math.floor(ml/30)%12,ml%30],['Mars',5,5],['Mercury',Math.floor(ml/30)%12,15],['Jupiter',8,2],['Venus',3,20],['Saturn',4,25]]);
 ok(M.classes(ps).Mercury.cls==='अनिर्णीत','Mercury + only sandhi Moon -> unresolved');}

// 4. Lord-in-10H row (11.14 limb)
{const ps=mk([['Sun',0,10],['Moon',4,15],['Mars',9,5],['Mercury',1,12],['Jupiter',8,2],['Venus',11,20],['Saturn',7,25]]);
 const r=M.report(ps,0,S.baladi);ok(r.bhavas[0].lordIn10H===true,'1H lord Mars in 10H');}
{const r=M.report(mk(BASE),0,S.baladi);ok(r.bhavas[0].lordIn10H===false,'1H lord not in 10H (Mars in 4H)');}

// 5. Self-occupation vs self-aspect are separate facts
{const ps=mk([['Sun',0,10],['Moon',4,15],['Mars',0,5],['Mercury',1,12],['Jupiter',8,2],['Venus',11,20],['Saturn',9,25]]);
 const r=M.report(ps,0,S.baladi),b1=r.bhavas[0];
 ok(b1.lordOccupiesOwn===true&&b1.lordAspectsOwn===false,'Mars in Aries: occupies own, does not aspect own');}
{const ps=mk([['Sun',0,10],['Moon',4,15],['Mars',9,5],['Mercury',1,12],['Jupiter',8,2],['Venus',11,20],['Saturn',7,25]]);
 const r=M.report(ps,0,S.baladi),b1=r.bhavas[0];
 ok(b1.lordOccupiesOwn===false&&b1.lordAspectsOwn===true,'Mars in Capricorn: special 4th drishti on own Aries');}
{const ps=mk([['Sun',0,10],['Moon',4,15],['Mars',3,5],['Mercury',1,12],['Jupiter',8,2],['Venus',11,20],['Saturn',9,25]]);
 const r=M.report(ps,0,S.baladi),b1=r.bhavas[0];
 ok(b1.lordOccupiesOwn===false&&b1.lordAspectsOwn===false,'Mars in Cancer (10th from Aries): neither occupies nor aspects own');}
{const ps=mk([['Sun',0,10],['Moon',4,15],['Mars',5,5],['Mercury',1,12],['Jupiter',8,2],['Venus',11,20],['Saturn',9,25]]);
 const r=M.report(ps,0,S.baladi),b1=r.bhavas[0];
 ok(b1.lordOccupiesOwn===false&&b1.lordAspectsOwn===true,'Mars in Virgo aspects own Aries via special 8th (fixture corrected from wrong negative)');}

// 6. Trishadaya+11-lord CONJUNCTION vs mere ownership (11.15-16 fix-1)
{const ps=mk([['Sun',0,10],['Moon',4,15],['Mars',3,5],['Mercury',1,12],['Jupiter',3,2],['Venus',11,20],['Saturn',9,25]]);
 const r=M.report(ps,0,S.baladi),b1=r.bhavas[0]; // Aries asc: Jupiter owns 12H; conjunct Mars
 ok(b1.lordWithEvil.length===1&&b1.lordWithEvil[0]==='Jupiter','Mars conjunct Jupiter (12H lord) flagged');}
{const r=M.report(mk(BASE),0,S.baladi),b1=r.bhavas[0]; // Mars owns 8H itself but conjunct nobody
 ok(b1.lordWithEvil.length===0,'mere ownership of 8H by Mars does NOT flag');}
{const ps=mk([['Sun',0,10],['Moon',3,15],['Mars',0,5],['Mercury',3,12],['Jupiter',8,2],['Venus',11,20],['Saturn',9,25]]);
 const r=M.report(ps,0,S.baladi),b4=r.bhavas[3]; // 4H Cancer lord Moon conjunct Mercury (3H+6H lord)
 ok(b4.lordWithEvil.length===1&&b4.lordWithEvil[0]==='Mercury','Moon conjunct Mercury (3H/6H lord) flagged for 4H');}

// 7. Negative controls (input validation)
throws(()=>M.report(mk([...BASE,['Sun',2,1]]),0,S.baladi),'duplicate graha throws');
throws(()=>M.report(mk(BASE.slice(1)),0,S.baladi),'missing Sun throws');
throws(()=>M.report(mk(BASE),12,S.baladi),'asc 12 throws');
throws(()=>M.report(mk(BASE),-1,S.baladi),'asc -1 throws');
throws(()=>M.report(mk([['Sun',12,10],...BASE.slice(1)]),0,S.baladi),'rashi 12 throws');
throws(()=>M.report(mk([['Sun',0,30],...BASE.slice(1)]),0,S.baladi),'degrees 30 throws');
throws(()=>M.report(mk([['Sun',0,NaN],...BASE.slice(1)]),0,S.baladi),'NaN degrees throws');
throws(()=>M.report(mk(BASE),0),'missing baladi fn throws');

// 8. Omission-policy invariants on static karakatva text
const all=M.KARAKATVA.map(k=>k.items.join(' ')).join(' ');
for(const bad of ['मृत्यु','आयु','death','longevity','नेत्रहीन','loss of sight'])
 ok(!all.includes(bad),'forbidden wording absent: '+bad);
ok(all.includes('मृतक-धन'),'मृतक-धन kept as traditional topic (recorded decision)');
const expOmit=[0,1,1,0,0,1,2,1,0,0,0,1];
ok(JSON.stringify(M.KARAKATVA.map(k=>k.omitted))===JSON.stringify(expOmit),'omission counts per bhava');
ok(M.KARAKATVA.length===12,'12 karakatva rows');
ok(M.KARAKATVA.every((k,i)=>k.sloka==='11.'+(i+2)),'sloka refs 11.2-11.13');

// 9. Karaka list (BPHS 32.34) exact order
ok(JSON.stringify(M.KARAKA)===JSON.stringify(['Sun','Jupiter','Mars','Moon','Jupiter','Mars','Venus','Saturn','Jupiter','Mercury','Jupiter','Saturn']),'32.34 karaka order');
ok(M.MATBHED_NOTE.includes('8.37')&&M.MATBHED_NOTE.includes('Jataka-Parijata'),'mat-bhed note names both variants');

// 10. Report-level invariants on BASE chart
{const r=M.report(mk(BASE),0,S.baladi);
 ok(r.noSynthesis.includes('कोई समृद्धि/क्षय निर्णय नहीं'),'no-synthesis note present');
 ok(r.discussion.includes('प्रबुद्ध (अमॉडल)'),'Prabuddha named with unmodeled tag (fix-4)');
 ok(!r.discussion.includes('स्वामित्व-युति'),'lordship-conjunction wording corrected (fix-1)');
 ok(r.unmodeled.length===7&&r.unmodeled.some(u=>u.includes('ग्रह-युद्ध')),'unmodeled list incl graha-yuddha');
 ok(r.bhavas.every(b=>b.karakatva&&b.karakaName&&b.lordName),'every bhava fully populated');
 const b8=r.bhavas[7];ok(b8.karakatva.items.length===5,'8H keeps 5 items (wealth-of-dead kept)');
 ok(b8.karatvaOmitted===undefined&&b8.karakatva.omitted===1,'8H omission count 1 (longevity only)');}

// 11. UI wiring (file-content assertions)
const fs=require('fs'),html=fs.readFileSync('kundli.html','utf8'),ui=fs.readFileSync('kundli-suite-ui.js','utf8');
ok(html.includes('kundli-bhavaphal.js'),'kundli.html loads kundli-bhavaphal.js');
ok(ui.includes('BrahmBhavaPhal.report'),'suite-ui calls BrahmBhavaPhal.report');
ok(ui.includes('bhavaphalPanel'),'suite-ui defines bhavaphalPanel');


// 12. B1: Mercury + nodes (unmodeled node-yuti must never read as favourable)
const mercNodes=others=>mk([['Sun',0,10],['Moon',4,15],['Mars',5,5],['Mercury',2,12],...others]);
{const c=M.classes(mercNodes([['Jupiter',8,2],['Venus',9,20],['Saturn',11,25],['Rahu',2,18]]));
 ok(c.Mercury.cls==='अनिर्णीत'&&c.Mercury.note.includes('राहु/केतु-युति'),'B1: Mercury + only Rahu -> unresolved, unmodeled note');}
{const c=M.classes(mercNodes([['Jupiter',8,2],['Venus',2,20],['Saturn',11,25],['Rahu',2,18]]));
 ok(c.Mercury.cls==='अनिर्णीत','B1: Mercury + Rahu + Venus -> still unresolved');}
{const c=M.classes(mercNodes([['Jupiter',8,2],['Venus',9,20],['Saturn',2,25],['Rahu',2,18]]));
 ok(c.Mercury.cls==='पाप','B1: Mercury + Rahu + Saturn -> malefic (seven-planet malefic wins)');}
{const c=M.classes(mercNodes([['Jupiter',8,2],['Venus',9,20],['Saturn',11,25],['Ketu',2,3]]));
 ok(c.Mercury.cls==='अनिर्णीत'&&c.Mercury.note.includes('परंपरा-भेद'),'B1: Mercury + only Ketu -> unresolved');}
{const c=M.classes(mercNodes([['Jupiter',8,2],['Venus',9,20],['Saturn',11,25],['Rahu',7,18]]));
 ok(c.Mercury.cls==='शुभ','B1: Rahu elsewhere (not conjunct) -> Mercury benefic, no false unresolved');}
throws(()=>M.classes(mercNodes([['Jupiter',8,2],['Venus',9,20],['Saturn',11,25],['Rahu',12,18]])),'B1: invalid node rashi throws');

// 13. B2: naked negatives carry the node caveat; only-Rahu bhava fixture
{const ps=mk([['Sun',0,10],['Moon',4,15],['Mars',5,5],['Mercury',1,12],['Jupiter',8,2],['Venus',11,20],['Saturn',9,25],['Rahu',3,18],['Ketu',9,3]]);
 const r=M.report(ps,0,S.baladi),b4=r.bhavas[3]; // 4H Cancer holds only Rahu
 ok(b4.occupants.length===0,'B2 fixture: bhava with only Rahu -> seven-planet occupant list empty (UI shows conditional negative)');}
ok(ui.includes("सप्तग्रह में कोई नहीं (राहु/केतु अमॉडल)"),'B2: occupants negative carries node caveat');
ok(ui.includes("सप्तग्रह से कोई नहीं (राहु/केतु-दृष्टि अमॉडल)"),'B2: aspects negative carries node caveat');
ok(ui.includes("सप्तग्रह में कोई नहीं (राहु/केतु-युति अमॉडल)"),'B2: lord-yuti negative carries node caveat');
ok(ui.includes('राहु/केतु की युति/दृष्टि इस चरण में अमॉडल है'),'header caveat present before bhava cards');

console.log(`bhavaphal: ${pass} pass, ${fail} fail`);
process.exit(fail?1:0);
