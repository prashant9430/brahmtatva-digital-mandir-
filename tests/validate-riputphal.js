// Bhavaphal ch17 (ripu bhava, 6th house) zero-served checks. Run: node tests/validate-riputphal.js
// The chapter serves NO rows at the current stage: assertions pin the zero-row
// shape, count-only notice accounting (13/12/1/1 = 27), abstract labels, and the
// distinct all-omitted intro. Hardened scans from day one: raw banned-literal
// scans on the module AND the panel slice, marker-injection mutation, and a
// workflow-token scan. Curation: docs/bhavaphal-ch17-ledger-draft.md.
'use strict';
const fs=require('fs');
const T=require('../kundli-riputphal.js');
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}

const SEVENG=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
function mk(r){return SEVENG.map(g=>({graha:g,rashi:(r||0),degreesInRashi:10}));}

// --- F1: zero-served report shape on arbitrary charts
{
 const rep=T.report(mk(0),0);
 ck('F1a rows is an empty array',Array.isArray(rep.rows)&&rep.rows.length===0,{n:rep.rows&&rep.rows.length});
 ck('F1b omitN = 27',rep.omitN===27,{n:rep.omitN});
 const rep2=T.report(mk(7),5);
 ck('F1c shape is chart-independent (no computation)',rep2.rows.length===0&&rep2.omitN===27,{});
 for(const k of ['header','omitNotice','breadthNotice','unmodeledNotice','nodesNote','scope','source'])
  ck('F1d field present: '+k,typeof rep[k]==='string'&&rep[k].length>0,{});
}

// --- F2: notice accounting and framing
{
 const rep=T.report(mk(0),0);
 ck('F2a distinct all-omitted intro',rep.header.includes('सभी शर्त-पंक्तियाँ सीमा-नीति से हटाई गई हैं')&&rep.header.includes('कोई शर्त-पंक्ति नहीं दिखाता'),{});
 ck('F2b count 13 bodily-state',rep.omitNotice.includes('13 शारीरिक-स्थिति-कथन'),{});
 ck('F2c count 12 time-specified',rep.omitNotice.includes('12 काल-निर्दिष्ट-कथन'),{});
 ck('F2d count 1 opposition-loss',rep.omitNotice.includes('1 शत्रु-धन-हानि-कथन'),{});
 ck('F2e count 1 family-opposition',rep.omitNotice.includes('1 पारिवारिक-शत्रुता-कथन'),{});
 ck('F2f verse spans disclosed',rep.omitNotice.includes('17.2 से 17.14')&&rep.omitNotice.includes('17.15 से 17.25')&&rep.omitNotice.includes('17.28')&&rep.omitNotice.includes('17.26')&&rep.omitNotice.includes('17.27'),{});
 ck('F2g both-valences + not-enduring framing',rep.omitNotice.includes('दोनों दिशाएँ समान')&&rep.omitNotice.includes('स्थायी निषेध नहीं'),{});
 ck('F2h preamble breadth note (17.1)',rep.breadthNotice.includes('17.1')&&rep.breadthNotice.includes('यह सीमा-लोप नहीं'),{});
 ck('F2i unmodeled inventory + full gap',rep.unmodeledNotice.includes('मंदि')&&rep.unmodeledNotice.includes('नवांश')&&rep.unmodeledNotice.includes('राहु-युति')&&rep.unmodeledNotice.includes('पूर्ण क्रियान्वयन-अंतर'),{});
 ck('F2j no-completeness-claim scope',rep.scope.includes('अध्याय-पूर्णता का दावा नहीं')&&rep.scope.includes('शून्य पंक्तियाँ'),{});
 ck('F2k no claim about any condition holding',!rep.header.includes('शर्त बनी')&&!rep.scope.includes('शर्त बनी'),{});
}

// --- F3: banned-literal raw scans on module AND panel slice
const BANNED=['रोग','व्याधि','कुष्ठ','व्रण','गण्ड','ज्वर','गुल्म','मेह','ग्रन्थि','स्फोटक','पित्त','वात','क्षय','अर्दित','मृत्यु','मरण','मारक','हन्ति','विनाश','आयु','दीर्घा','अल्पा','मूक','बधिर','अन्ध','पंगु','काणा','मंदि','मण्डी','अंग','शिरो','नेत्र','कण्ठ','नाभि','कुक्षि','पाद','हस्त','चर्म','रक्त','व्रण','उपाय','मंत्र','रत्न','यन्त्र','तन्त्र'];
{
 const mod=fs.readFileSync(__dirname+'/../kundli-riputphal.js','utf8');
 // मंदि appears exactly once in the unmodeled notice as the named tradition
 // element; allow that single occurrence, ban everything else outright.
 const allowed=/(^|\n)[^\n]*मंदि[^\n]*(\n|$)/g;
 const stripped=mod.replace(/मंदि/g,'');
 for(const tok of BANNED){if(tok==='मंदि')continue;
  ck('F3 module clean: '+tok,!stripped.includes(tok),{});}
 ck('F3 module: single मंदि occurrence in the unmodeled notice',(mod.match(/मंदि/g)||[]).length===1,{n:(mod.match(/मंदि/g)||[]).length});
 const ui=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
 const m=ui.match(/function riputphalPanel\(\)\{[\s\S]*?\n\}/);
 ck('F3 panel slice found',!!m,{});
 if(m){const seg=m[0];for(const tok of BANNED)ck('F3 panel clean: '+tok,!seg.includes(tok),{});}
}

// --- F4: marker-injection mutation - a banned token in a served text would surface
{
 const rep=T.report(mk(0),0);
 const fake=JSON.parse(JSON.stringify(rep));fake.omitNotice+=' रोग';
 ck('F4 marker injection is detectable in output',/रोग/.test(fake.omitNotice)&&!/रोग/.test(rep.omitNotice),{});
}

// --- F5: workflow tokens never leak into user-facing strings
{
 const rep=T.report(mk(0),0);
 const all=[rep.header,rep.omitNotice,rep.breadthNotice,rep.unmodeledNotice,rep.nodesNote,rep.scope,rep.source].join(' ');
 for(const tok of ['review','gate','fork','candidate','ledger','commit','preview/','TODO','FIXME'])
  ck('F5 no workflow token: '+tok,!all.includes(tok),{});
}

console.log('\nvalidate-riputphal: '+(fail===0?'ALL PASS':'FAILURES')+' ('+pass+' pass, '+fail+' fail)');
if(fail){console.log('failed:',bad.join(', '));process.exit(1);}
