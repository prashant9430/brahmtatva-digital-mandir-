// Bhavaphal ch19 (randhra bhava, 8th house) zero-served checks. Run: node tests/validate-randhraphal.js
// The chapter serves NO rows at the current stage: assertions pin the zero-row
// shape, count-only notice accounting (10/3 = 13), abstract labels, and the
// distinct all-omitted intro. Hardened scans from day one: raw banned-literal
// scans on the module AND the panel slice, marker-injection mutation, and a
// workflow-token scan. Curation: docs/bhavaphal-ch19-ledger-draft.md.
'use strict';
const fs=require('fs');
const T=require('../kundli-randhraphal.js');
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}

const SEVENG=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
function mk(r){return SEVENG.map(g=>({graha:g,rashi:(r||0),degreesInRashi:10}));}

// --- F1: zero-served report shape on arbitrary charts
{
 const rep=T.report(mk(0),0);
 ck('F1a rows is an empty array',Array.isArray(rep.rows)&&rep.rows.length===0,{n:rep.rows&&rep.rows.length});
 ck('F1b omitN = 13',rep.omitN===13,{n:rep.omitN});
 const rep2=T.report(mk(7),5);
 ck('F1c shape is chart-independent (no computation)',rep2.rows.length===0&&rep2.omitN===13,{});
 for(const k of ['header','omitNotice','breadthNotice','unmodeledNotice','nodesNote','scope','source'])
  ck('F1d field present: '+k,typeof rep[k]==='string'&&rep[k].length>0,{});
}

// --- F2: notice accounting and framing
{
 const rep=T.report(mk(0),0);
 ck('F2a distinct all-omitted intro',rep.header.includes('सभी शर्त-पंक्तियाँ सीमा-नीति से हटाई गई हैं')&&rep.header.includes('कोई शर्त-पंक्ति नहीं दिखाता'),{});
 ck('F2b count 10 lifespan-domain',rep.omitNotice.includes('10 जीवन-काल-कथन'),{});
 ck('F2c count 3 earliest-stage-loss',rep.omitNotice.includes('3 शिशु-काल-हानि-कथन'),{});
 ck('F2d verse spans disclosed',rep.omitNotice.includes('19.1')&&rep.omitNotice.includes('19.15')&&rep.omitNotice.includes('19.10')&&rep.omitNotice.includes('19.11')&&rep.omitNotice.includes('19.13')&&rep.omitNotice.includes('19.12')&&rep.omitNotice.includes('19.14'),{});
 ck('F2e both-valences + not-enduring framing',rep.omitNotice.includes('दोनों दिशाएँ समान')&&rep.omitNotice.includes('स्थायी निषेध नहीं'),{});
 ck('F2f method-meta breadth note (19.3, 19.7)',rep.breadthNotice.includes('19.3')&&rep.breadthNotice.includes('19.7')&&rep.breadthNotice.includes('विधि-सूत्र')&&rep.breadthNotice.includes('यह सीमा-लोप नहीं'),{});
 ck('F2g unmodeled inventory + full gap',rep.unmodeledNotice.includes('बल-खंड')&&rep.unmodeledNotice.includes('नवांश')&&rep.unmodeledNotice.includes('पूर्ण क्रियान्वयन-अंतर'),{});
 ck('F2h no-completeness-claim scope',rep.scope.includes('अध्याय-पूर्णता का दावा नहीं')&&rep.scope.includes('शून्य पंक्तियाँ'),{});
 ck('F2i no claim about any condition holding',!rep.header.includes('शर्त बनी')&&!rep.scope.includes('शर्त बनी'),{});
}

// --- F3: banned-literal raw scans on module AND panel slice
// Abstract category labels (जीवन-काल-कथन, शिशु-काल-हानि-कथन) are the approved
// curation labels; the lifespan/domain stems themselves must never appear.
const BANNED=['मृत्यु','मरण','मृत','मारक','हन्ति','विनाश','आयु','आयुष','दीर्घा','अल्पा','वध','रोग','व्याधि','बीमार','उपाय','मंत्र','रत्न','यन्त्र','तन्त्र','भिक्षा','शव','नरक'];
{
 const mod=fs.readFileSync(__dirname+'/../kundli-randhraphal.js','utf8');
 for(const tok of BANNED)ck('F3 module clean: '+tok,!mod.includes(tok),{});
 const ui=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
 const m=ui.match(/function randhraphalPanel\(\)\{[\s\S]*?\n\}/);
 ck('F3 panel slice found',!!m,{});
 if(m){const seg=m[0];for(const tok of BANNED)ck('F3 panel clean: '+tok,!seg.includes(tok),{});}
}

// --- F4: marker-injection mutation - a banned token in a served text would surface
{
 const rep=T.report(mk(0),0);
 const fake=JSON.parse(JSON.stringify(rep));fake.omitNotice+=' मारक';
 ck('F4 marker injection is detectable in output',/मारक/.test(fake.omitNotice)&&!/मारक/.test(rep.omitNotice),{});
}

// --- F5: workflow tokens never leak into user-facing strings
{
 const rep=T.report(mk(0),0);
 const all=[rep.header,rep.omitNotice,rep.breadthNotice,rep.unmodeledNotice,rep.nodesNote,rep.scope,rep.source].join(' ');
 for(const tok of ['review','gate','fork','candidate','ledger','commit','preview/','TODO','FIXME'])
  ck('F5 no workflow token: '+tok,!all.includes(tok),{});
}

console.log('\nvalidate-randhraphal: '+(fail===0?'ALL PASS':'FAILURES')+' ('+pass+' pass, '+fail+' fail)');
if(fail){console.log('failed:',bad.join(', '));process.exit(1);}
