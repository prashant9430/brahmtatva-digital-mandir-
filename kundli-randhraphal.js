/* Bhavaphal ch19 (BPHS अष्टम/रन्ध्र-भाव फल, 8th house) - zero-served limited-stage
panel: every condition row of this chapter is omitted at the current stage, so
this module serves NO tradition rows. Curation: docs/bhavaphal-ch19-ledger-draft.md
(15 verses -> 0 rows; the chapter is entirely lifespan-domain material, both
valences alike - favourable long-span yogas carry no carve-out).
SCOPE-OMIT (count-only, 13): 10 abstract lifespan-domain units (19.1, 19.2,
19.4, 19.5, 19.6, 19.8, 19.9, 19.12, 19.14, 19.15), 3 abstract
earliest-stage-loss units (19.10, 19.11, 19.13). Both valences treated alike;
conservative scope for the limited stage, not an enduring prohibition; the
source text's meaning is not altered.
METHOD-META (breadth, not scope-omit): 19.3 and 19.7 are method statements
(weighing instructions) with no condition row of their own; they are outside
this view's row set and are not counted as omissions.
UNMODELED (documented, all on omitted rows): strength legs (19.8, 19.9, 19.15;
19.7's strength-weighing instruction); navamsha (19.5). Plus the full
implementation gap: no condition of this chapter is computed at the current
stage. Reading decisions (ledger mat-bhed, disclosed): 19.2 AND-stack vs the
translation's OR-split; 19.4 leg options and unsettled third-leg subject; 19.5
text-critical reading and the translation's added lord; 19.8 definite-span vs
range reading; 19.14 ambiguous Moon leg. None changes the zero-served scope.
Sources: vedicpupil chapter-19 (Sanskrit per verse), jyotishvidya.com/
ch19.htm (Santhanam; verse grouping differs from the canonical numbering -
grouping divergence disclosed in the ledger; verse count is 15 either way).
Conventions (labeled, ch12 module 1:1):
 - Whole-sign bhavas from Lagna; conditions would use only the seven grahas
   (no condition row is computed at the current stage).
 - Rows are tradition-labeled statements, not predictions; this chapter
   currently displays none. */
(function(root){'use strict';
const OMIT_N=13;
const OMIT_NOTICE='BPHS अध्याय 19 की इस परंपरा-सूची के सभी '+OMIT_N+' शर्त-खंड सीमा-नीति से हटाए गए हैं (10 जीवन-काल-कथन — 19.1, 19.2, 19.4, 19.5, 19.6, 19.8, 19.9, 19.12, 19.14, 19.15; 3 शिशु-काल-हानि-कथन — 19.10, 19.11, 19.13; दोनों दिशाएँ समान, केवल गिनती दी गई है)। यह प्रारंभिक परिमित चरण का संरक्षणशील दायरा है, स्थायी निषेध नहीं।';
const BREADTH_NOTICE='इस दृश्य में BPHS अध्याय 19 के दो खंड (19.3 और 19.7) शामिल नहीं हैं — दोनों विधि-सूत्र हैं, इनमें इस दृश्य की स्वतंत्र शर्त-फल पंक्ति नहीं है। यह सीमा-लोप नहीं है।';
const UNMODELED_NOTICE='BPHS ch19 के कुछ शर्त-तत्व अमॉडल हैं (सभी लोपित पंक्तियों पर): 19.8, 19.9, 19.15 के बल-खंड (19.7 विधि-सूत्र की बल-तौल सहित), और 19.5 का नवांश-खंड। इसके साथ ही पूर्ण क्रियान्वयन-अंतर: इस अध्याय की कोई भी शर्त इस चरण में गणित नहीं होती।';
const HEADER='BPHS अध्याय 19 (अष्टम/रन्ध्र-भाव फल) की परंपरा-सूची के लिए यह पृष्ठ-भाग इस परिमित चरण में कोई शर्त-पंक्ति नहीं दिखाता — इस अध्याय की सभी शर्त-पंक्तियाँ सीमा-नीति से हटाई गई हैं। यह अध्याय-पूर्णता या किसी फल का दावा नहीं; किसी शर्त के बनने या न बनने का कथन भी नहीं।';
const NODES_NOTE='राहु/केतु की युति/दृष्टि-भागीदारी अमॉडल (परंपरा-भेद); शर्तों में केवल सात ग्रह — इस अध्याय में वर्तमान चरण पर कोई शर्त गणित नहीं होती, इसलिए यह सूचना केवल पद्धति-पूर्णता के लिए है।';
function report(planets,asc){
 return {source:'BPHS ch19 (vedicpupil Sanskrit + jyotishvidya/Santhanam)',
  header:HEADER,omitN:OMIT_N,omitNotice:OMIT_NOTICE,breadthNotice:BREADTH_NOTICE,
  unmodeledNotice:UNMODELED_NOTICE,nodesNote:NODES_NOTE,
  rows:[],
  scope:'परिमित अध्याय-दायरा: शून्य पंक्तियाँ — अध्याय-पूर्णता का दावा नहीं। सीमा-लोप 13 (केवल गिनती); 2 विधि-सूत्र खंड विस्तार से नहीं दिखाए गए; अमॉडल तत्व और पूर्ण क्रियान्वयन-अंतर सूचीबद्ध।'};}
const api={report,OMIT_N,OMIT_NOTICE,BREADTH_NOTICE,UNMODELED_NOTICE,HEADER,NODES_NOTE};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmRandhraPhal=api;
})(typeof window!=='undefined'?window:globalThis);
