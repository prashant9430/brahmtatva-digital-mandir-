/* E2 yuti-phal fixtures: 21-pair detection, omission invariants, source/provenance
tags, framing rows, tri-graha ch16 note, negative controls. */
'use strict';
const M=require('../kundli-yutiphal.js');
let pass=0,fail=0;
const ok=(c,m)=>{if(c){pass++;}else{fail++;console.error('FAIL:',m);}};
const mk=arr=>arr.map(([g,r])=>({graha:g,rashi:r}));
const ALL7=[['Sun',0],['Moon',1],['Mars',2],['Mercury',3],['Jupiter',4],['Venus',5],['Saturn',6]];

// 1. All 21 pairs detected positively (pair-by-pair placements)
const expectSloka={'Sun|Moon':'15.2','Sun|Mars':'15.3','Sun|Mercury':'15.4','Sun|Jupiter':'15.5','Sun|Venus':'15.6','Sun|Saturn':'15.7','Moon|Mars':'15.8','Moon|Mercury':'15.9','Moon|Jupiter':'15.10','Moon|Venus':'15.11','Moon|Saturn':'15.12','Mars|Mercury':'15.13','Mars|Jupiter':'15.14','Mars|Venus':'15.15','Mars|Saturn':'15.16','Mercury|Jupiter':'15.17','Mercury|Venus':'15.18','Mercury|Saturn':'15.19','Jupiter|Venus':'15.20','Jupiter|Saturn':'15.21','Venus|Saturn':'15.22'};
let n=0;
for(const key in expectSloka){const[a,b]=key.split('|');
 const ps=ALL7.map(([g,r])=>[g,g===a||g===b?0:r+1]); // pair at sign 0, others spread
 const rep=M.report(mk(ps),0);const row=rep.rows.find(x=>x.sloka===expectSloka[key]);
 ok(!!row&&row.a===a&&row.b===b&&row.sign===0&&row.house===1,'pair '+key);n++;}
ok(n===21,'21 pairs exercised');

// 2. Negative controls: different signs => no row
const neg=M.report(mk(ALL7),0);
ok(neg.rows.length===0,'no same-sign => no rows');
ok(M.report(mk([['Sun',0],['Moon',1],['Mars',2],['Mercury',3],['Jupiter',4],['Venus',5],['Saturn',6],['Rahu',0],['Ketu',0]]),0).rows.length===0,'nodes-only conjunction => no row');
ok(M.report(mk([['Sun',11],['Moon',11],['Mars',5],['Mercury',6],['Jupiter',7],['Venus',8],['Saturn',9]]),3).rows[0].house===9,'house from lagna wrap');

// 3. Tri-graha colocation => 3 pair rows + ch16 note; no synthesis
const tri=M.report(mk([['Sun',4],['Moon',4],['Mars',4],['Mercury',1],['Jupiter',2],['Venus',3],['Saturn',5]]),0);
ok(tri.rows.length===3,'3 pairs from tri');
ok(tri.ch16Note&&tri.ch16Note.includes('ch16'),'ch16 unmodeled note');
ok(tri.triSigns.length===1&&tri.triSigns[0]==='सिंह','tri sign named');
const solo=M.report(mk(ALL7.map(([g,r],i)=>[g,i])),0);
ok(solo.ch16Note===null,'no ch16 note without tri');

// 4. Omission invariants (per-sentence audit): ruled-out wordings absent everywhere
const allText=M.PAIRS.map(p=>[p.text,p.omit||'',p.frame||'',p.illness||''].join(' ')).join(' ');
for(const bad of ['मृत्यु','(?<!स्)मरण','शोक-हानि','आयु','लघुायु','अपंग','अंधा','विकलांग','remedy','उपाय','रत्न','मंत्र(?!ित्व)'])
 ok(!new RegExp(bad,'i').test(allText),'absent: '+bad);
ok(!/lose his wife|weak-sighted|disposed to kill|troubled by weapons/i.test(allText),'English omitted clauses absent');
// ruled omissions present as transparent notes
const p3=M.PAIRS.find(p=>p.sloka==='15.3'),p6=M.PAIRS.find(p=>p.sloka==='15.6'),p7=M.PAIRS.find(p=>p.sloka==='15.7'),p16=M.PAIRS.find(p=>p.sloka==='15.16');
ok(p3.omit&&p3.omit.includes('हिंसा'),'15.3 omission noted');
ok(p6.omit&&p6.omit.includes('इन्द्रिय'),'15.6 omission noted');
ok(p7.omit&&p7.omit.includes('शोक'),'15.7 omission noted');
ok(p16.omit&&p16.omit.includes('क्षति'),'15.16 omission noted');
ok(!/पत्नी-पुत्र की हानि/.test(p7.text),'15.7 grief clause not in kept text');

// 5. 15.12 required fix: गुण-हीनता present (no silent adverse drop)
const p12=M.PAIRS.find(p=>p.sloka==='15.12');
ok(p12.text.includes('गुण-हीनता'),'15.12 गुण-हीनता kept');
ok(p12.text.includes('पराधीनता')&&p12.text.includes('धन-हीनता')&&p12.text.includes('पराजय'),'15.12 adverse items kept');

// 6. Spouse framing (main constraint): historical stigmatizing-language context, no personal claim
ok(p12.frame&&p12.frame.includes('ऐतिहासिक कलंकित भाषा'),'15.12 frame');
const p13=M.PAIRS.find(p=>p.sloka==='15.13');
ok(p13.frame&&p13.frame.includes('ऐतिहासिक कलंकित भाषा'),'15.13 frame');
ok(/चरित्र\/मूल्य का दावा नहीं/.test(M.FRAME_SPOUSE),'frame disclaims person-worth claim');
// illness category never diagnosis
const p8=M.PAIRS.find(p=>p.sloka==='15.8');
ok(p8.illness&&p8.illness.includes('ऐतिहासिक रोग-वर्ग')&&p8.illness.includes('निदान'),'15.8 illness category wording');

// 7. Source tags: sloka pin + provenance qualification on every row
const rep2=M.report(mk([['Sun',2],['Moon',2],['Mars',2],['Mercury',2],['Jupiter',2],['Venus',2],['Saturn',2]]),0);
ok(rep2.rows.length===21,'all 21 with all colocated');
ok(rep2.rows.every(r=>r.source.includes('Saravali '+r.sloka)),'sloka in source tag');
ok(rep2.rows.every(r=>r.source.includes('digitization-paths')&&r.source.includes('स्वतंत्र अनुवाद नहीं')),'provenance qualification in tag');
ok(rep2.vargaNote.includes('15.23'),'varga modifier unmodeled note');
ok(rep2.scope.includes('निश्चय नहीं'),'scope disclaims certainty');
for(const bad of ['निश्चित','अवश्य होगा','गारंटी'])ok(!allText.includes(bad),'no certainty word: '+bad);


// 8. B2 input validation (E1-consistent): throw on bad input, never silent-drop
const throws=(fn,m)=>{try{fn();fail++;console.error('FAIL (no throw):',m);}catch(e){pass++;}};
const base7=()=>mk(ALL7);
throws(()=>M.report([...base7(),['Sun',5]].map(([g,r])=>({graha:g,rashi:r})),0),'duplicate Sun throws');
throws(()=>M.report(mk([['Sun',0],['Moon',1],['Mars',12],['Mercury',3],['Jupiter',4],['Venus',5],['Saturn',6]]),0),'rashi=12 throws');
throws(()=>M.report([{graha:'Sun',rashi:NaN},...base7().slice(1)],0),'NaN rashi throws');
throws(()=>M.report([...base7(),{graha:'Rahu',rashi:12}],0),'node invalid sign throws');
throws(()=>M.report(base7().slice(1),0),'missing Saturn throws');
throws(()=>M.report('not-array',0),'non-array throws');
ok(M.report([...base7(),{graha:'Rahu',rashi:0},{graha:'Ketu',rashi:6}],0).rows.length===0,'valid-sign nodes accepted, never counted');
throws(()=>M.report(base7(),12),'lagna 12 throws');

// 9. B1: UI template must not render sensitive omission categories (generic count-only notice)
const fs=require('fs');
const uiSrc=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
const yp=uiSrc.slice(uiSrc.indexOf('function yutiphalPanel'));
ok(!yp.includes('esc(r.omit)')&&!yp.includes('${r.omit}'),'UI does not interpolate r.omit');
ok(yp.includes('1 वाक्य सुरक्षा-नीति से हटाया गया'),'generic count-only omission notice in UI');
for(const leak of ['पत्नी-पुत्र की हानि','हिंसा/यातना','इन्द्रिय-दुर्बलता/वृद्धावस्था','शस्त्र/विष से क्षति'])
 ok(!yp.includes(leak),'UI free of category label: '+leak);

console.log(`yutiphal: ${pass} pass, ${fail} fail`);
if(fail)process.exit(1);
