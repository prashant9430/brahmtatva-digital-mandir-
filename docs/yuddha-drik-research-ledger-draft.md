# युद्ध + दृक्-बल अनुसंधान अभिलेख (research ledger, draft for review)

स्थिति: 11 Nov 2026, ~17:10 IST. लेखक: kundli worker.
कोई कोड-परिवर्तन नहीं; केवल अनुसंधान (build-free, main-निर्देश 17:02 अनुसार)।
स्रोत-cache: sources/ (jv-26/27, bphs-26-6, bphs-27-20, ss-ch7,
ss-verses-17-21, ss-verses-22-23, vp-26 — पूर्व transfer-नाम; repo durable copies:
src-capture-jv-bphs-ch12-ch19-ch22-ch23.txt, reviewer-suryasiddhanta-ch7.txt,
reviewer-vp-bphs-ch26.txt) + drik-py-report.txt। drik-fixtures.json इस transfer में नहीं
आया — fixture-विवरण नीचे भाग 3 में inline, पूर्ण derivation drik-py-report.txt में।

## भाग 1: ग्रह-युद्ध — स्रोत निष्कर्ष

### BPHS 27.20 (shadbala अध्याय) — युद्ध का उल्लेख, परिभाषा नहीं
- siva.sh Sanskrit: "अथ तारग्रहाणां तु युद्ध्यतोश्च द्वयोर्मिथः । बलान्तरं
  विजेतुः स्वं निर्जितस्य बले त्वृणम् ॥ २०॥"
- अनुवाद (siva.sh/jyotishvidya सामान): दो तारा-ग्रहों (मंगल-शनि) के युद्ध में
  दोनों के षड्बल-अंतर को विजेता के बल में जोड़ें और पराजित के बल से घटाएँ।
- अर्थ: BPHS युद्ध-स्थिति और विजेता को पूर्व-ज्ञात मानता है; परिभाषा BPHS में
  नहीं मिली (ch26-27 परीक्षित)।

### Surya Siddhanta ch7 (ग्रहयुत्यधिकार) — परिभाषा उपलब्ध
स्रोत: siva.sh/surya-siddhanta/7/17-23 (Sanskrit + अंग्रेज़ी) और
swaveda.com/texts/surya-siddhanta/7/ (Burgess 1860 पूर्ण अध्याय, public domain)।

- 7.18: उल्लेख/भेद (संस्पर्श/भेदन) परिभाषाएँ।
- 7.19: "युद्धम् अम्शुविमर्दाख्यम् अम्शुयोगे परस्परम् । अम्शाद् ऊने
  +अपसव्याख्यम् युद्धम्..." — किरण-मेलन = अंशुविमर्द; अंतर एक अंश (1°) से कम
  = अपसव्य-युद्ध; अंतर 1° से अधिक और दोनों बलवान = समागम (युद्ध नहीं)।
- 7.20: अपसव्य-युद्ध में पराजित = पिहित/अणु/दीप्ति-रहित।
- 7.21: "रूक्षो विवर्णो विध्वस्तो विजितो दक्षिणाश्रितः । उदक्स्थो दीप्तिमान्
  स्थूलो जयी याम्ये +अपि यो बली॥" — दक्षिण-स्थित रूक्ष/विवर्ण/विध्वस्त =
  पूर्ण-पराजित; उत्तर-स्थित दीप्तिमान स्थूल = विजेता; दक्षिण में भी यदि बली।
- 7.22: दोनों दीप्त निकट = समागम; दोनों स्वल्प विध्वस्त = कूटविग्रह।
- 7.23: शुक्र सामान्यतः विजेता, उत्तर या दक्षिण कहीं भी।
- Burgess की स्वयं-टिप्पणी: ये श्लोक अंतर्वेषित (interpolation) हो सकते हैं और
  परिभाषाएँ अपूर्ण हैं ("disconnected fragment... not a complete statement") —
  ledger में caveat के रूप में दर्ज करना आवश्यक।

### इंजन-तथ्य (सुधारित, 17:11 bundle-निरीक्षण से)
- public wrapper (grahaPositions/Ce/pe) केवल .elon expose करता है — interface
  सीमा। अंतर्निहित library पूर्ण 3D है: Dn() ecliptic lat+lon दोनों लौटाती है,
  Moon पथ geo_eclip_lat प्रयोग करता है, VSOP-style सारणियाँ मौजूद।
- अर्थ: native latitude export संभव, पर astro-core.js की engine-surface में
  बदलाव चाहिए — अपनी अलग समीक्षा + independent angle/frame tests; और reviewer
  के अनुसार सटीक latitude भी brightness/size/south-if-powerful अपवाद नहीं
  सुलझाती। युद्ध अमॉडल यथावत।

### समीक्षक-निर्णय (bala reviewer, 17:09, main-relay 17:09): विकल्प A अस्वीकृत
- Reviewer ने owning chapter पढ़ा: Burgess 7.12 conjunction पर अक्षांश निकालकर
  अक्षांश-अंतर/योग को ही "interval of the planets" मानता है; 7.19 का 1°-अंतर
  केवल देशांतर नहीं। अतः केवल-देशांतर <1° classical युद्ध-detect नहीं करता।
- केवल अक्षांश जोड़ना भी पूर्ण brightness/size/exception योजना नहीं देता।
- निर्णय: "war detected" या BPHS-युद्ध-proxy label पर प्रतिबंध। Classical युद्ध
  और 27.20 bala-समायोजन पर्याप्त प्रमाण तक अमॉडल रहेंगे।
- अनुमत सुरक्षित वैकल्पिक (यदि कभी दिखाना हो): तटस्थ तथ्य-पंक्ति — "देशांतर
  निकटता: अंतर x°; कौणीय पृथक्करण, युद्ध/विजेता अनिर्धारित"। शर्तें (reviewer):
  युग्म-सूची केवल Mars/Mercury/Jupiter/Venus/Saturn; wrapped absolute
  separation; 1° केवल named screening cutoff (श्लोक-नियम नहीं); filter के बाहर
  "युद्ध नहीं" का अनुमान नहीं; कोई phal/strength-transfer नहीं। मेरा प्रस्तावित
  ±0.05° सन्धि-band अस्रोतीय था — हटाया गया; कोई numerical guard केवल वास्तविक
  derivation सहित, कभी श्लोक-नियम कहकर नहीं।
- सुधार (reviewer): public wrapper का longitude-only होना interface-सीमा है,
  यह प्रमाण नहीं कि अंतर्निहित library अक्षांश नहीं निकाल सकती; latitude चाहिए
  तो पहले native library क्षमता जाँचें, दूसरा VSOP model न जोड़ें। सटीक latitude
  भी brightness/size/south-if-powerful अपवाद और 27.20 के लिए आवश्यक पूर्ण
  Shadbala नहीं देती। Missing terms missing रहें, कभी zero नहीं।
- उपभोक्ता-सूची: bala 27.20 (अमॉडल यथावत), bhavaphal 11.14-16 synthesis-अवरोध
  ("ग्रह-युद्ध अमॉडल" यथावत), avastha deeptadi (युद्ध-मुक्त यथावत)।

## भाग 2: दृक्-बल — 26.6 दिशा-संकट सुलझा (कोड सही)

- जिज्ञासा: 26.6 में d की दिशा। jyotishvidya + siva.sh अंग्रेज़ी: "Deduct the
  longitude of the aspected from that of the aspecting" (= aspecting − aspected)।
- vedicpupil Sanskrit (decisive): "दृश्याद् विशोध्य द्रष्टारं षड्राशिभ्यो
  ऽधिकान्तरम् । दिगभ्यः संशोध्य तद्भागा द्विभक्ता दृक् स्फुटा भवेत्" —
  दृश्यात् (aspected, पञ्चमी) से द्रष्टारम् (aspecter) विशोध्य =
  **aspected − aspecting**। vedicpupil अंग्रेज़ी भी यही।
- कोड kundli-bala.js drishtiValue(me.longitude − o.longitude, o.graha) =
  aspected − aspecting = Sanskrit-संगत। बदलाव आवश्यक नहीं।
- mat-bhed दर्ज: jyotishvidya/siva.sh अंग्रेज़ी-अनुवाद उल्टा; संस्कृत निर्णायक।
- Mars/Saturn/Jupiter विशेष-श्लोक (26.9-12) की अंग्रेज़ी ("Deduct Mars from the
  aspected") कोड-दिशा से ही सुसंगत है — अध्याय-आंतरिक संगति भी कोड के साथ।

## भाग 3: दृक् — promotion NO-GO (bala reviewer 17:09, main-relay)

### खगोलीय fixture-कार्य (स्वतंत्र पुनःव्युत्पत्ति) — किया गया, पर अपर्याप्त सिद्ध हुआ
- harness/drik-independent.py + 3 fixtures (21/21 JS==Python, 4-दशमलव) —
  विवरण नीचे "fixture-पैक विवरण" में।
- REVIEWER निष्कर्ष: दोनों कार्यान्वयन एक ही अंग्रेज़ी-अनुवाद-लोप को दोहराते हैं;
  "two implementations of one mistranslation are not source fidelity"।

### स्रोत-टकराव 1: 26.12 (गुरु विशेष-दृष्टि) — संस्कृत में द्विगुण
- siva.sh Sanskrit (स्वयं सत्यापित 17:10): "त्रिसप्तभे तु जीवस्य भागार्धं
  शरवेदयुक् । द्विगुणैस्तु लवैश्चोनाः खरसाश्चतुरष्टभे ॥ १२॥"
  = 3/7-अंतराल: भाग/2 + 45 (शरवेद); 4/8-अंतराल: 60 − **2×** लव/भाग।
- vedicpupil (Sanskrit+English): 60 − double degrees (संस्कृत-संगत)।
- jyotishvidya English: 60 − x (doubling लुप्त), +45 सही।
- siva.sh English: 60 − x (doubling लुप्त) और +**15** (संस्कृत 45 से भिन्न —
  दूसरी विसंगति)।
- कोड drishtiValue: sg3/7 → x/2+45 (संस्कृत-संगत), sg4/8 → 60−x (अंग्रेज़ी-लोप
  का पालन; संस्कृत 60−2x से भिन्न)।
- प्रभाव (reviewer-गणना, सटीक): F1Mars -4.53965 (रिपोर्ट 20.4654), F3Sun
  18.74199 (42.2084), F3Mars 9.22248 (37.7660) — 21 में 3 cells; material
  model अंतर, floating-point नहीं।

### स्रोत-टकराव 2: 27.19 भार-पद्धति — superadd बनाम replacement
- 27.19 पाठ: पाप -1/4, शुभ +1/4, और बुध/गुरु की पूर्ण दृष्टि **superadd**
  (अतिरिक्त जोड़)। कोड की current weighting replacement है (गुरु +v full, बुध
  ±)। reviewer-उदाहरण: F1Saturn replacement 84.93548 बनाम quarter-plus-full
  107.80056 (delta 22.86508)। बुध-पापता प्रश्न इससे अलग खुला।

### निर्णय-स्थिति (अंतिम bounded audit, 17:11)
- Drik EXPERIMENTAL यथावत, partialSum से बाहर; promotion NO-GO। कोई silent
  numeric patch नहीं; दोनों पठन preserved।
- Reviewer ने actual module + Python दोनों चलाए: परस्पर 21/21 4dp मेल (max
  rounding residual 0.0000481) — report integrity सिद्ध, Sanskrit fidelity नहीं।
- Boundary diagnostic (reviewer): 60−x पठन में 150/270 से ठीक पहले मान 30 तक
  पहुँचकर 0/15 पर कूदता है; 60−2x में 0 तक जाता है — उपयोगी diagnostic,
  standalone proof नहीं।
- SCOPED GO केवल इतना: fixtures + report को translation-model regression/
  research evidence के रूप में सहेजना — renamed label "Mercury-unconditional-
  full, replacement model" (पुराना 'literal-Mercury' भ्रामक था)। Labels लागू।
- PROVISIONAL documentation (local kundli-bala.js) में अब तीनो खुले मुद्दे दर्ज:
  classification convention + 26.12 coefficient conflict + 27.19 superadd-vs-
  replacement। Local-only बदलाव; commit भविष्य के gate के बाद।
- भविष्य का implementation: explicit chosen-source convention + exact tests लेकर
  नए code gate पर लौटे।

### fixture-पैक विवरण (इतिहास)

- समीक्षक-खुला मुद्दा: drik experimental है क्योंकि verified incoming-aspect/
  classifier fixtures नहीं थे (Raman pp85-88 भिन्न model — golden नहीं)।
- क्या किया: harness/drik-independent.py — अंग्रेज़ी slab-पाठ से सीधे लिखा
  स्वतंत्र कार्यान्वयन (JS से port नहीं)। 3 fixture charts (longitudes इंजन से;
  मूल sources/drik-fixtures.json इस transfer में नहीं आया — विवरण यहीं inline,
  derivation drik-py-report.txt):
  - F1 1990-06-15 10:30 IST: क्षीण-चन्द्र (elong 257.6°) पाप; बुध एकल शुभ।
  - F2 1985-01-01 11:30 IST: वर्धमान (111.9°) शुभ; बुध+शनि समराशि → बुध पाप।
  - F3 1985-07-01 11:30 IST: वर्धमान (163.3°) शुभ; बुध एकल शुभ।
  classification प्रत्येक में सन्धि से दूर, असंदिग्ध।
- परिणाम: 3 charts × 7 ग्रह = 21 drik-मान, JS module बनाम स्वतंत्र Python —
  सभी 4-दशमलव तक समान (sources/drik-py-report.txt में per-aspect derivation)।
- 27.19 पठन-भेद: literal पाठ बुध को सदैव पूर्ण-योग देता है; कोड-convention
  पाप-युति बुध को −1/4 (ch3.11 के साथ) — दोनों रिपोर्ट में; अंतर केवल F2 में।
  यह convention-चयन bala-ledger में पहले से दर्ज; अब स्पष्ट fixture-साक्ष्य सहित।
- खुला प्रश्न समीक्षक के लिए: क्या स्वतंत्र पुनःव्युत्पत्ति + sloka-pinned
  derivation पर्याप्त है drik को experimental से partial-sum में उन्नत करने के
  लिए, या बाहरी golden अनिवार्य? (BPHS-convention का प्रकाशित golden नहीं मिला;
  Raman model भिन्न है।)

## भाग 4: ch26 cache — बंद

bala-ledger की खुली क्रिया "ch26.htm cache करें, श्लोक-सीमा उद्धृत करें" आंशिक:
vedicpupil chapter-26 (Sanskrit सहित) cache उपलब्ध = sources/reviewer-vp-bphs-ch26.txt;
jyotishvidya ch26 cache (पूर्व नाम jv-26.txt) इस transfer में नहीं आया — अनुपलब्ध, दावा ठीक किया।

## अगले कदम (main/समीक्षक)
1. युद्ध विकल्प A/B/C पर समीक्षक निर्णय (cross-treatise उपयोग — BPHS मौन,
   Surya Siddhanta से परिभाषा — स्पष्ट अनुमति आवश्यक; "different treatises never
   presumed to agree" नियम)।
2. Drik promotion प्रश्न (ऊपर)।
3. निर्णयों के बाद कार्यान्वयन स्थानीय रहेगा; commit केवल reset (12 Nov ~16:58
   IST) के बाद।
