/* Bhavaphal ch17 (BPHS षष्ठ/रिपु-भाव फल, 6th house) - zero-served limited-stage
panel: every condition row of this chapter is omitted at the current stage, so
this module serves NO tradition rows. Curation: docs/bhavaphal-ch17-ledger-draft.md
(28 verses -> 0 rows; the chapter is entirely bodily-state and timed-event
material, both valences alike).
SCOPE-OMIT (count-only, 27): 13 abstract bodily-state units (17.2-17.14),
12 abstract time-specified units (17.15-17.25, 17.28), 1 abstract
opposition-linked loss unit (17.26), 1 abstract family-opposition unit
(17.27). One chapter announcement (17.1) carries no condition row of its own.
Both valences treated alike - the chapter's single favourable leg (17.10's
absence-of-condition leg) is a state-domain statement and is omitted with the
rest; conservative scope for the limited stage, not an enduring prohibition;
the source text's meaning is not altered.
UNMODELED (documented, all on omitted rows): Mandi (17.16); navamsha (17.25);
node yuti (17.7, 17.14, 17.25). Plus the full implementation gap: no condition
of this chapter is computed at the current stage.
Reading decisions (recorded mat-bhed, disclosed): 17.4-5 limb-mapping divergence
(the Sanskrit and the translation assign the planet-to-limb correspondence
differently); 17.8 "without the lagna lord" rendered as a sign exception in the
translation - a plausible ellipsis resolution, recorded as a simplification;
17.15-16 condition spans both verses (the Moon leg carried in full);
17.28 both-lords-in-6th vs the translation's exchange reading. None changes
the zero-served scope.
Sources: vedicpupil chapter-17 (Sanskrit per verse), jyotishvidya.com/
ch17.htm (Santhanam).
Conventions (labeled, ch12 module 1:1):
 - Whole-sign bhavas from Lagna; conditions would use only the seven grahas
   (no condition row is computed at the current stage).
 - Rows are tradition-labeled statements, not predictions; this chapter
   currently displays none. */
(function(root){'use strict';
const OMIT_N=27;
const OMIT_NOTICE='BPHS अध्याय 17 की इस परंपरा-सूची के सभी '+OMIT_N+' शर्त-खंड सीमा-नीति से हटाए गए हैं (13 शारीरिक-स्थिति-कथन — 17.2 से 17.14 तक; 12 काल-निर्दिष्ट-कथन — 17.15 से 17.25 तक और 17.28; 1 शत्रु-धन-हानि-कथन — 17.26; 1 पारिवारिक-शत्रुता-कथन — 17.27; दोनों दिशाएँ समान, केवल गिनती दी गई है)। यह प्रारंभिक परिमित चरण का संरक्षणशील दायरा है, स्थायी निषेध नहीं।';
const BREADTH_NOTICE='इस दृश्य में BPHS अध्याय 17 का एक खंड (17.1, अध्याय-भूमिका) शामिल नहीं है — उसमें इस दृश्य की स्वतंत्र शर्त-फल पंक्ति नहीं है। यह सीमा-लोप नहीं है।';
const UNMODELED_NOTICE='BPHS ch17 के कुछ शर्त-तत्व अमॉडल हैं (सभी लोपित पंक्तियों पर): 17.16 का मंदि, 17.25 का नवांश-खंड, और 17.7, 17.14, 17.25 में राहु-युति। इसके साथ ही पूर्ण क्रियान्वयन-अंतर: इस अध्याय की कोई भी शर्त इस चरण में गणित नहीं होती।';
const HEADER='BPHS अध्याय 17 (षष्ठ/रिपु-भाव फल) की परंपरा-सूची के लिए यह पृष्ठ-भाग इस परिमित चरण में कोई शर्त-पंक्ति नहीं दिखाता — इस अध्याय की सभी शर्त-पंक्तियाँ सीमा-नीति से हटाई गई हैं। यह अध्याय-पूर्णता या किसी फल का दावा नहीं; किसी शर्त के बनने या न बनने का कथन भी नहीं।';
const NODES_NOTE='राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल (परंपरा-भेद); शर्तों में केवल सात ग्रह — इस अध्याय में वर्तमान चरण पर कोई शर्त गणित नहीं होती, इसलिए यह सूचना केवल पद्धति-पूर्णता के लिए है।';
function report(planets,asc){
 return {source:'BPHS ch17 (vedicpupil Sanskrit + jyotishvidya/Santhanam)',
  header:HEADER,omitN:OMIT_N,omitNotice:OMIT_NOTICE,breadthNotice:BREADTH_NOTICE,
  unmodeledNotice:UNMODELED_NOTICE,nodesNote:NODES_NOTE,
  rows:[],
  scope:'परिमित अध्याय-दायरा: शून्य पंक्तियाँ — अध्याय-पूर्णता का दावा नहीं। सीमा-लोप 27 (केवल गिनती); 1 भूमिका-खंड विस्तार से नहीं दिखाया गया; अमॉडल तत्व और पूर्ण क्रियान्वयन-अंतर सूचीबद्ध।'};}
const api={report,OMIT_N,OMIT_NOTICE,BREADTH_NOTICE,UNMODELED_NOTICE,HEADER,NODES_NOTE};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmRipuPhal=api;
})(typeof window!=='undefined'?window:globalThis);
