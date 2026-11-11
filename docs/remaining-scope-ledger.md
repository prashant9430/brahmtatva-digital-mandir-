# Brahmtatva कुंडली — शेष कार्य-अभिलेख (handoff-ready)

स्थिति: 11 Nov 2026, ~11:55 IST. शाखा preview/kundli-suite, HEAD cd5c8122 (इस ledger-अद्यतन से पूर्व).
मुख्य शाखा (main) अपरिवर्तित: d7da476770348c6bf7fe98dc6f27e1ea25a0654c.
केवल संरक्षित preview; production merge की कोई स्वीकृति नहीं।

## पूर्ण और hosted-सत्यापित increments

### 1. Yoga-phal (Phaladeepika ch6) — delivery हुई (WhatsApp 10:39)
- commits: 96df96dd, 0a156121, e3432a87 (+ पूर्व yoga commits)
- deployment e3432a8 → brahmtatva-digital-mandir-mqjyl2fxu.vercel.app
- कवर: panchamahapurusha (लग्न/चन्द्र दोनों मूल, 6.4 distinct-count), sunapha/
  anapha/durudhura (सूर्य-अपवाद), kesari, sakata + रद्द-शर्त, kemadruma +
  नामित रद्द-शर्तें (सूर्य-गिनती व्याख्या-नोट सहित), moon-from-sun श्रेणी,
  durudhura subsumption; फल-दमन जब रद्द; स्रोत-उद्धरण प्रत्येक कार्ड।
- ledger: docs/yoga-phal-ledger-draft.md (deployed, protected)
- tests: tests/validate-interpretation.js (59 जाँचें उस चरण में)

### 2. Dasha stage-1 (BPHS ch47) — delivery हुई (WhatsApp 10:39)
- commits: 64832edc (rules), 416b4654 (ui), a81944fa (tests), f59b73cc (ledger)
- deployment: brahmtatva-digital-mandir-l0fahfzeu.vercel.app (hosted-verified,
  mobile+desktop screenshots main को भेजे गए; anonymous gate 4 paths protected)
- कवर: 9 ग्रह-महादशा अनुकूल/प्रतिकूल चर्चा (दोनों सदैव साथ), dashaContext =
  राशि-गरिमा (स्व/उच्च/नीच), लग्न से भाव + क्षेत्र, युति; कोई स्कोर नहीं;
  yogini पर explicit guard (planet-named fixture सहित); moolatrikona
  ईमानदारी से अमॉडल अंकित; whole-sign + स्रोत-caveat UI में।
- tests: 73/73; harness harness/test-dasha-phal.py 17/17।

## शेष scope (प्राथमिकता: phaladesh उपयोगिता)

### A. Dasha stage-2 — भाव-स्वामी परत (BPHS ch48) [✓ user-delivery 11:52, main-बैच में antardasha के साथ]
- commits bd5aa9b3/dd802704/3b426823/74a5597d; deployment 9ykk7r4q2
  hosted-verified (mobile+desktop proof main को); anonymous gate protected।
- user को अभी नहीं भेजा — main batching; user stage-1 (l0fahfzeu) पर है।
- कवर: भाव-स्वामित्व, 48.2-8 चर्चा, 48.9-17½ संबंध (5 reading-notes सहित),
  48.18-20 प्रतिकूल समूह + node अपवाद; मारक-पदावली पूर्ण लोप।
- tests 100/100; harness 23/23।
- स्रोत: jyotishvidya.com/ch48.htm; ledger: docs/dasha-stage2-ledger-draft.md।
- मारक-पदावली: पूर्ण लोप (स्वास्थ्य-जोखिम प्रतिस्थापन अस्वीकृत — केवल
  पारदर्शी तकनीकी लोप-टिप्पणी); व्यक्तिगत मृत्यु/स्वास्थ्य-अनुमान कभी नहीं।
- अमॉडल यथावत: दशा-आरम्भ गोचर (48.5-8 आवश्यक कहता है), दृष्टि, मूलत्रिकोण/
  स्वराशि "उच्चादि" विस्तार (B में चल रहा)।

### B. Moolatrikona/अंश-क्षेत्र परत (BPHS 3.49-54) [✓ user-delivery 11:52, main-बैच में]
- commits 5029928 (rules), ec7305e (ui), 9b49913 (tests), 82ea858 (ledger);
  deployment brahmtatva-digital-mandir-neivcbr3g.vercel.app hosted-verified
  (facts row, boundary note, d48x mobile+desktop proof main को; yogini guard
  hosted; anonymous gate 4 paths protected)।
- कवर: दो-परत गरिमा (राशि परत अपरिवर्तित + अंश-क्षेत्र अलग), उच्च-क्षेत्र
  (चन्द्र 0-3, बुध 0-15), MT क्षेत्र तालिका, ±0.01° सॉफ़्टवेयर-सहनशीलता
  (समीक्षक-अनुमोदित शब्दावली, मापी-त्रुटि दावा नहीं), 48.1 विस्तृत पठन
  (d48x अनुकूल / d48xm मौन-संयोजन), out-of-range/missing स्पष्ट लेबल।
- tests 138/138; harness 31/31; ledger: docs/moolatrikona-ledger-draft.md।
- user को अभी नहीं भेजा — main batching; stage-2 के साथ आयोजित।

### C. Antardasha फल (BPHS ch52-60) [✓ committed + hosted-सत्यापित; user-delivery 11:52 main-बैच में]
- समीक्षक अंतिम पुष्टि 11:40 (तीनों gate पास; deepdiff शून्य अंतर; 34 node
  जाँचें स्वतंत्र)। commits ae8e1975, 9e2edbb5, e68bba0a, 2ab4b823,
  98a1829b (tests/validate-antardasha.js; क्षणिक tests/tests/ गलत-पथ
  cfbee5be → 752ab602 में हटाया), 891f0863 (harness/antardasha-refs.json),
  045774fe (ledger), 972f89a1 (यह ledger)। deployment
  brahmtatva-digital-mandir-a7hgati2o.vercel.app hosted-सत्यापित (81 युग्म
  सेवित, युग्म-ब्लॉक 10/10 जाँच, anonymous gate 302/263)।
- कवर: 81/81 युग्म हिंदी चर्चा (अनुकूल+प्रतिकूल सदैव; एक-पक्षीय पर स्पष्ट
  नोट), pair-local भाव-शर्तें (लग्न से + महादशा-स्वामी से), digk-गेटेड
  गरिमा-जाँच (59 युग्म; केवल जहाँ युग्म का अपना पाठ प्रकार कहता है),
  पक्ष-नोट (क्षीण 3/वर्धमान 2), दुर्बल-चन्द्र अमूल्यांकित (4), मध्यम 5,
  प्रत्यंतर स्थगित; ch58.50/ch59.66 श्लोक-लोप टिप्पणी; बुध→केतु provenance।
- लोप: मारक-सूत्र 35 + सूत्रेतर 20 (संघ 43, पूर्ण-पाठ स्कैन से सत्यापित),
  उपाय 77; श्राद्ध-भोजन वाक्यांश भी लोप-सूची में।
- tests: node tests/validate-antardasha.js 34/34; harness
  harness/test-antardasha.py 21/21; पूर्व सूट अक्षत (138/138, 70/0 आदि)।
- नई फ़ाइलें: kundli-dasha-pairs.js, tests/validate-antardasha.js,
  harness/test-antardasha.py; संशोधित: kundli-rules.js (dashaPairContext),
  kundli-suite-ui.js (dashaPairBlock), kundli.html, harness/test-dasha-phal.py,
  docs/antardasha-ledger-draft.md।

### D. Bala (षड्बल/भावबल)
- UI में pending पैनल मौजूद; पूर्ण घटक + स्वतंत्र उदाहरण-जाँच बाकी।

### E. Drishti/युति फल-परत, शेष नामित योग, भाव-फल (करकत्व)
- भाव-फल phaladesh का मूल है पर स्रोत-ledger + समीक्षा पहले।

## स्थायी समीक्षक-शर्तें (हर increment पर लागू)
1. मत-भेद संरक्षित; OCR/प्रमाणीकरण caveat यथावत; वास्तविक व्यक्तियों पर दावा नहीं।
2. अनुकूल+प्रतिकूल सदैव साथ; कोई x/y स्कोर या सम्मिलित निर्णय नहीं।
3. universal वर्गीकरण को विशेष योग न कहें; अमॉडल शर्तें स्पष्ट सूची में।
4. नया phal-पाठ बिना समीक्षा deploy नहीं; स्रोत-ledger → main → समीक्षा → कोड।
5. केवल preview/kundli-suite पर normal web-editor commits; force-push नहीं;
   production/सार्वजनिक fallback अप्रोत्साहित।
6. raw.githubusercontent CDN stale हो सकता है — commit-सत्यापन contents API से।

## पुनःआरम्भ-संकेत (नया run/handoff)
- audit-स्थायित्व (main-निर्देश 11:52): harness/ की सभी स्क्रिप्ट अब branch पर —
  extract-antardasha.py, test-antardasha.py, test-dasha-phal.py,
  test-gallery-relations.py, test-suite-next.py, mt-visual-proof.py,
  sync-kundli-preview.py (byte-verified 11:54)।
- local tree: /downloads/brahmtatva-kundli-suite (branch से byte-verified)
- स्रोत cache: tools-box /tmp/jv-47-48.json (चली गई तो पुनः fetch)
- harness: python3 harness/test-dasha-phal.py; node tests/validate-interpretation.js
- Vercel: branch-alias hostname browser-proxy से विफल; per-deployment URL उपयोग करें।
