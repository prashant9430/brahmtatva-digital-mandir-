// Suite-wide bhavaphal method-limitation note checks. Run: node tests/validate-phalmethod.js
// The note (phalMethodPanel in kundli-suite-ui.js) makes the binary whole-sign
// drishti simplification user-visible across all bhavaphal panels.
'use strict';
const fs=require('fs');
let pass=0,fail=0;const bad=[];
function ck(id,ok,detail){ok?pass++:fail++;if(!ok)bad.push(id);console.log((ok?'PASS ':'FAIL ')+id+(ok?'':' | '+JSON.stringify(detail)));}
const ui=fs.readFileSync(__dirname+'/../kundli-suite-ui.js','utf8');
const pStart=ui.indexOf('function phalMethodPanel(){');
ck('M1 phalMethodPanel defined',pStart>0);
ck('M2 defined exactly once',ui.indexOf('function phalMethodPanel(){',pStart+1)===-1);
ck('M3 wired in report chain exactly once',(ui.match(/phalMethodPanel\(\)\+/g)||[]).length===1);
ck('M4 chain position: right after bhavaphalPanel',ui.includes('bhavaphalPanel()+phalMethodPanel()+tanuPanel()'));
const body=ui.slice(pStart,ui.indexOf("$('pane-report').innerHTML=",pStart));
ck('M5 discloses whole-sign binary drishti',body.includes('पूरे राशि-आधारित (whole-sign)')&&body.includes('उपस्थित/अनुपस्थित'));
ck('M6 names graduated source method as not used',body.includes('अंश-सटीक क्रमांकित दृष्टि-पद्धति')&&body.includes('प्रयुक्त नहीं है'));
ck('M7 no exact-parity claim + named simplification',body.includes('स्रोत-सटीक पद्धति का दावा नहीं')&&body.includes('सुविवेचित सरलीकरण'));
ck('M8 seven-graha scope + nodes unmodeled',body.includes('केवल सात ग्रह')&&body.includes('राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल'));
ck('M9 3.11 classification disclosed',body.includes('BPHS 3.11')&&body.includes('पक्ष-सापेक्ष चन्द्र')&&body.includes('युति-सापेक्ष बुध'));
ck('M10 no-prediction framing',body.includes('भविष्यकथन, निश्चय या निर्णय नहीं'));
ck('M11 coverage claim spans all bhavaphal rows',body.includes('सभी भाव-फल (BPHS अध्याय 12-23) शर्त-फल पंक्तियों पर लागू'));
const banned=['उपाय','मंत्र','रत्न','मृत्यु','आयु','रोग','व्याधि','विनाश','सहोदर','भ्रातृ','नरक','मोक्ष','कान्ता','रमणो'];
const leaks=banned.filter(w=>body.includes(w));
ck('M12 no banned wording in note panel',leaks.length===0,leaks);
const workflow=['G1','G2','gate','GATE','reviewer','breadth','ledger','cache','स्कैन'];
const wf=workflow.filter(w=>body.includes(w));
ck('M13 no workflow tokens in note panel',wf.length===0,wf);
console.log(`\nphalmethod: ${pass} pass, ${fail} fail`);
if(bad.length)console.log('FAILED:',bad.join(', '));
process.exitCode=fail?1:0;
