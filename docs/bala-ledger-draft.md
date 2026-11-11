# Bala (षड्बल/भावबल) increment — स्रोत-अभिलेख DRAFT v0.5 (11 Nov 2026 ~12:02 IST)

स्थिति: groundwork v0.1 (Bala-reviewer artifacts मिले 11:56). समीक्षा चक्र शेष: source-ledger → main → समीक्षक → कोड।
स्रोत: jyotishvidya.com BPHS ch27 "Shadbala" (एकल, अनाम अनामक ऑनलाइन अनुवाद;
मुद्रित-श्लोक सत्यापन बाकी — पूर्व increments जैसा ही caveat)। raw cache: /tmp/ch27.html (cp1252)।
पार्श्व-अध्याय: ch28 Ishta/Kashta (इस increment से बाहर, cache रखा)।

## सीमा (ledger D)
- केवल गणना + प्रदर्शन: षड्बल घटक, कुल, आवश्यक-न्यूनतम तुलना, भावबल।
- कोई नया phal-प्रोज़ नहीं; कोई उपाय/निर्णय/स्कोर-आधारित भविष्यवाणी नहीं।
- UI: मौजूदा pending bala पैनल में तालिका; प्रत्येक संख्या के साथ घटक-विभाजन।
- "बल के अनुसार फल" (47.2-4) अब भी लागू नहीं — bala संख्या केवल तथ्य-पंक्ति,
  फल-चर्चा से जोड़ने का दावा नहीं (जब तक अलग increment समीक्षा न करे)।

## घटक-सूची (ch27 श्लोक-सीमा → सूत्र)
1. Uchcha (1-2): |ग्रह - गहन-नीच बिंदु|, 180° पर मोड़, /3 → Virupa (अधिकतम 60)।
2. Saptavargaja (2-4): 7 वर्ग (राशि, होरा, द्रेक्काण, सप्तांश, नवांश, द्वादशांश,
   त्रिंशांश) × {MT45, स्व30, अति-मित्र20, मित्र15, सम10, शत्रु4, अति-शत्रु2}।
   निर्भरता हल: ch3.55 नैसर्गिक-मैत्री (MT से 4/2/12/5/9/8 + उच्च-स्वामी;
   मुद्रित तालिका उपलब्ध), ch3.56 तात्कालिक (2/3/4/10/11/12), ch3.57-58
   पंचधा-मिश्रित नियम — सभी ch3.htm से उद्धृत (cache /tmp/ch3.html)।
3. Ojha-yugma (4½): शुक्र/चन्द्र सम राशि/नवांश, अन्य विषम → 15+15।
4. Kendradi (5): केन्द्र 60, पण्फर 30, आपोक्लिम 15 (whole-sign भाव)।
5. Drekkana (6): पुरुष 1st / नपुंसक मध्य (2nd) / स्त्री अंतिम (3rd) → 15।
   ⚠ मत-भेद (समीक्षक-सिफ़ारिश 12:00, main-निर्देश से अपनाया): vedicpupil ch27.6 "male, neuter and
   female in order" 1st/middle/last + Raman-समर्थन; jyotishvidya "male, female,
   hermaphrodite → first, second, third" से सीधा टकराव — neuter-middle पठन
   अपनाया, टकराव यहाँ दर्ज। ग्रह-लिंग: ch3.19 (बुध/शनि नपुंसक; चन्द्र/शुक्र
   स्त्री; सूर्य/मंगल/गुरु पुरुष)।
6. Dig (7-7½): सूर्य/मंगल←4H, गुरु/बुध←7H, शुक्र/चन्द्र←10H, शनि←लग्न;
   180° मोड़, /3।
7. Nathonnatha (8-9) [रुलिंग]: संदर्भ = स्थानीय सापेक्ष मध्याह्न (true solar
   transit, equation-of-time सहित) से दूरी d घटी (0-30)। चन्द्र/मंगल/शनि = 2d
   (मध्यरात्रि पर 60); सूर्य/गुरु/शुक्र = 60-2d; बुध = 60। Raman-स्वतंत्र जाँच:
   जन्म 14:06:16 LMT, सूर्य 14min तेज़ → noon 11:46, d=5.84 → 11.68/48.32
   (printed से exact मेल)।
8. Paksha (10-11) [रुलिंग]: PB = fold(|चन्द्र-सूर्य|,180°)/3। चन्द्र/बुध/
   शुक्र/गुरु = PB; सूर्य/मंगल/शनि = 60-PB। बुध सदैव पहले समूह में (संयोग-
   सापेक्षता bala में लागू नहीं — श्लोक में नहीं)। "क्षीण-चन्द्र" सीमा
   अनावश्यक (सूत्र सतत)।
9. Tribhaga (12): दिन-त्रिभाग बुध/सूर्य/शनि; रात्रि-त्रिभाग चन्द्र/शुक्र/मंगल;
   गुरु सदैव 60। (सूर्योदय/सूर्यास्त से दिन/रात्रि-विभाजन।)
10. Varsha-maasa-dina-hora (13) [रुलिंग — "Raman/Sripati convention" लेबल,
    BPHS श्लोक विधि नहीं देता]: ahargana epoch 1827-05-01 (Raman Table I से
    व्युत्पन्न, आंतरिक-संगत); varsha-lord = ((3*⌊A/360⌋+1) mod 7), maasa-lord =
    ((2*⌊A/30⌋+1) mod 7), रविवार से; vara = weekday-lord; hora = sunrise से
    Chaldean क्रम, समान घंटे (Raman Rule 1)। मान: 15/30/45/60। Raman-उदाहरण
    पुनःउत्पादन (Saturn/Budha) — स्वतंत्र golden नहीं।
11. Naisargika (14): 60/7×(1..7) शनि,मंगल,बुध,गुरु,शुक्र,चन्द्र,सूर्य क्रम में।
12. Ayana (15-17) [रुलिंग — अनुवाद स्पष्टीकृत]: bhuja = सायन-द्रैघ्य की
    निकटतम विषुव से दूरी (0-90°); lavas = खंड 45/33/12 piecewise-linear
    (cumulative 0/45/78/90 @ 0°/30°/60°/90°); ayana = (90 ± lavas)/3। चिह्न:
    सूर्य/मंगल/गुरु/शुक्र सायन 0-180° में +, 180-360° में -; चन्द्र/शनि विपरीत;
    बुध सदैव +। Raman Ex33 cross-check 19.05 बनाम printed 19.06 (pre-double)।
    ⚠ declination-पद्धति (Raman, Kesava Daivagna) से अधिकतम ~1 virupa विचलन
    संभव — BPHS-khanda primary, यह अंतर UI-नोट में।
13. Cheshta सूर्य/चन्द्र (18) [रुलिंग]: सूर्य-cheshta = सूर्य-ayana;
    चन्द्र-cheshta = चन्द्र-paksha। प्रत्येक एक बार kala में + एक बार cheshta
    में — कोई doubling नहीं (Raman kala-तालिका में दोगुना समाया: Sun ayana
    19.06×2, Moon paksha 43.46×2)। PyJHora का 0 श्लोक-विचलन।
14. Drig (19): पाप-दृष्टि-पिंड का -1/4, शुभ का +1/4, बुध/गुरु पूर्ण-दृष्टि पूर्ण जोड़।
    निर्भरता: ch26 दृष्टि-पिंड/विशेष-दृष्टि (मंगल 4/8, गुरु 5/9, शनि 3/10)।
15. ग्रह-युद्ध (20) [रुलिंग — अमॉडल + नोट]: श्लोक युद्ध-परिभाषा नहीं देता;
    Raman-नियम (1° भीतर, नीचे-द्रैघ्य विजेता, बोनस ∝ (Sthana+Dig+Kala अंतर)/
    (व्यास-अंतर)) Sripati-आधारित, उसकी diameter-तालिका OCR-विकृत, कोई golden
    नहीं → युद्ध अमॉडल, स्पष्ट नोट।
16. Cheshta मंगल→शनि [रुलिंग]: primary = (b) 24-25 (चेष्टा-केन्द्र =
    सीघ्रोच्च - (mean+true)/2, 180° मोड़, /3) — Raman यही उपयोग करता है।
    परंतु mean-longitude स्रोत उपलब्ध नहीं → अमॉडल + स्पष्ट नोट, जब तक स्रोत
    न मिले (स्थायी हटाव नहीं)। (a) 21-23 गति-तालिका = अगणित विकल्प; ⚠ मेरा
    पूर्व-अंकन "mandatara 7.5" त्रुटिपूर्ण — समीक्षक-पठन (संस्कृत dala): vakra
    60, anuvakra 30, vikala 15, sama 30, manda 15, mandatara 30, chara 45,
    atichara 30; jyotishvidya-क्रम भिन्न — द्वितीय-संस्करण असत्यापित, दोनों
    दर्ज।
17. भावबल (26-29): भाव-राशि-समूह से 7H/4H/लग्न/10H घटाव → /3 (dig-जैसा);
    +1/4 शुभ-दृष्टि, -1/4 पाप-दृष्टि, +बुध/गुरु पूर्ण-दृष्टि, +भाव-स्वामी बल।
18. विशेष (30-31): गुरु/बुध-स्थित भाव +60; शनि/मंगल/सूर्य-स्थित -60;
    शीर्षोदय +15 दिन, द्विस्वभाव +15 संध्या, पृष्ठोदय +15 रात्रि।
19. आवश्यकताएँ (32-36): पिंड 390/360/300/420/390/330/300 (सूर्य→शनि);
    घटक-न्यूनतम सारणी 34-36। "बली/अति-बली" केवल तालुका-लेबल के रूप में।
20. 37-40: भाव-फल-सम्बन्ध + गणक-योग्यता — प्रोज़; UI में शामिल नहीं (या केवल
    विधि-नोट)।

## प्रमुख निर्भरताएँ/खुले प्रश्न (समीक्षक को)
- पंचधा-मैत्री + शुभ/पाप वर्गीकरण + ग्रह-लिंग: ch3 श्लोक-उद्धरण आवश्यक।
- ch26 दृष्टि-पिंड सूत्र — ch26.htm cache करें, श्लोक-सीमा उद्धृत करें।
- Ayana (15-17) वाक्यांश-अस्पष्टता; Cheshta (a) बनाम (b); युद्ध-परिभाषा;
  वर्ष/मास-अधिपति गणना-भार — प्रत्येक पर समीक्षक-निर्णय।
- Ephemeris-पर्याप्तता (जाँचा 11:57): astro-core.js grahaPositions प्रति-ग्रह
  sidereal longitude + retrograde (आंतरिक गति-चिह्न) देता है — 8-गति cheshta
  योजना (a) के लिए गति-सीमाएँ औसत-गति से व्युत्पन्न करनी होंगी (threshold-
  परिपाटी समीक्षक-निर्णय)। sunrise/sunset उपलब्ध — दिन/रात्रि, tribhaga,
  nathonnatha, hora-lord सभी साध्य। HelioVector बंडल में मौजूद — सीघ्रोच्च
  मार्ग (b) सैद्धांतिक रूप से साध्य, export-जाँच शेष। mean longitudes
  प्रत्यक्ष नहीं — (b) के लिए अलग परिपाटी चाहिए।
- ch26 (Planetary Aspects) cached + पठित: 2-5 सामान्य-दृष्टि slabs,
  6-8 drishti-kona मूल्यांकन, 9-10 शनि, 11 मंगल, 12 गुरु विशेष — spec
  drishti() पठन से मेल; drishti-पिंड = Σ दृष्टि-मान, drik-bala 27.19 नियम से।

## स्वतंत्र-फिक्स्चर नीति (main 11:55)
- एकल-अनुवाद सूत्र-सहमति स्वतंत्र-शुद्धता-प्रमाण नहीं।
- फिक्स्चर: बाहरी प्रकाशित षड्बल-तालिकाओं वाले ज्ञात चार्ट (Bala-reviewer
  agent-01M7491K0CFBJ4MTZ4QQ70PQK1 के पूर्व-शोध से, main के माध्यम से)।
- tolerance [रुलिंग]: केवल Dig ±0.06 (पुस्तक की अपनी rounding से व्युत्पन्न)।
  ±0.5/±0.1 प्रस्ताव समीक्षक-असमर्थित — हटाए गए। अन्य घटकों पर कोई derived
  tolerance नहीं; exact-match अथवा note।

## परीक्षण-योजना (रोupt)
- node tests/validate-bala.js: प्रत्येक घटक का fixture-चित्र, कुल-योग,
  न्यूनतम-तालुका लेबल, भावबल क्रम, अमॉडल-नोट उपस्थिति।
- harness/test-bala.py: स्वतंत्र-फिक्स्चर JSON से तुलना; refs-artifact
  harness/bala-refs.json।
- पूर्व सूट अक्षत (validate-interpretation, siddhant, antardasha आदि)।

## समीक्षक-अनुसंधान artifacts (main 11:56, reviewer agent-01M7491K0CFBJ4MTZ4QQ70PQK1)
फ़ाइलें (main को वापस भेजी गईं; branch-commit समीक्षा के बाद):
- spec-21aac9af.py — BPHS 27.7-8 dig + 26.6-12 drishti पठन-स्पेक; oracle-तुलना।
- shadbala_spec_checks-82810eb0.json — F1/F2/F3 (2000-01-01 Delhi, 1985-06-15
  London, 1975-11-02 Chennai): lahiri longitudes, asc, dig spec-बनाम-oracle,
  naisargika।
- raman_shadbala_fixture-81f05bc1.json — B.V. Raman Standard Horoscope
  (astrojyotish.info PDF, page-image-सत्यापित)।
- fixtures_shadbala_pyjhora-da612899.json — PyJHora oracle आउटपुट (AGPL:
  केवल oracle; कोड-आयात/सूत्र-स्रोत नहीं; black-box मिलान प्रमाण नहीं)।

### द्वि-अनुवाद पठन (formula-only, verbatim reuse निषिद्ध — copyright)
- BPHS27: jyotishvidya.com/ch27.htm + vedicpupil.in/.../chapter-27
- दृष्टि: BPHS 26.6-12 (vedicpupil chapter-26); ch26.htm cache करना शेष।

### सत्यापित/उपयोगी अंश
- Dig: powerless-cusp से folded angle /3, max 60; powerless: सूर्य/मंगल 4H,
  गुरु/बुध 7H, चन्द्र/शुक्र 10H, शनि लग्न। Raman p.32 powerless points से
  0.06 के भीतर (Su/Mo/Ma/Sa/Ve exact; Me/Ju print-विसंगति 0.06)।
- Naisargika: 60/7 ranks — दोनों स्रोत-पठन + Raman (Saturn 8.37 print-typo,
  total 8.57 से ही reproduce)।
- Required totals 390/360/300/420/390/330/300 (Su..Sa) — पठन स्पष्ट।
- Raman उपयोगी: inputs, Dig, Naisargika, Drik-चिह्न, totals केवल Mo/Ve/Sa।
- [अद्यतन 12:00] Example-35 Kala-तालिका सभी 7 ग्रहों के लिए आंतरिक-संगत →
  Nathonnatha/Paksha/Ayana(declination)/Tribhaga/Hora के लिए golden। Mars
  "33.06" Example-56 typo था (सही 30.06; Mars total 298.14 सही) — पूर्व-flag
  हटाया। शेष print-विसंगति: Sun +0.70, Mercury rupa (537.02 बनाम 531.02),
  Jupiter +0.06।
- Raman print-विसंगतियाँ दर्ज: Sun/Mars/Jupiter total-अंतर, Mercury rupa,
  p3 cusp 36:30 बनाम example 36:36।

### NOT golden / अनिर्णित conventions (समीक्षक-निर्णय अपेक्षित)
- friendship: चरण-1 नैसर्गिक+तात्कालिक मिश्रित (ch3.55-58 पूर्ण) प्रस्ताव; केवल-नैसर्गिक सरलीकरण अस्वीकार्य (स्रोत मिश्रित मांगता है)।
- Sthana/Kala/Cheshta: Raman से certify नहीं — प्रति-घटक स्वतंत्र derivation
  या दूसरा उदाहरण चाहिए।
- PyJHora विचलन: Dig >60 संभव (cusps-योजना भिन्न, Sripati-प्रवण), Sun/Moon
  Cheshta=0, special aspects भिन्न — spec-equal-house मिलान केवल Me/Ju/Sa
  (F1-F3) में; अंतर cusp-परिपाटी से, सूत्र-त्रुटि नहीं मानें।
- natural/compound friendship; ayana (declination-पठन); cheshta mean-planet;
  sunrise/hora/day-lord — स्पष्ट unresolved, प्रत्येक का निर्णय-पंक्ति ledger में।
- Bhavabala: Raman-संरचना से आगे अनुसंधित नहीं — चरण-2।
- अपरीक्षित leads (vendor outputs, conventions अज्ञात): swarnsiddhi,
  saravali.github.io bala_sthana, epandit — संभावित fixture-स्रोत, सत्यापन पहले।

### Fixture-योजना अद्यतन
- F1-F3: केवल उन घटकों के लिए oracle-तुलना जहाँ परिपाटी ज्ञात (Dig max-60
  fold, Naisargika)। भिन्न-परिपाटी घटकों में oracle-मिलान प्रमाण नहीं।
- Raman: Dig/Naisargika/Drik-sign/Mo-Ve-Sa totals; ±0.06 (Dig), totals ±0.1
  प्रस्तावित — समीक्षक-शब्दावली अपेक्षित।
- प्रत्येक घटक के लिए hand-derivation example ledger में (independent proof)।

## Hand-derivation worked example (F1: 2000-01-01 12:00 Delhi; asc 343.1891)
गहन-नीच बिंदु: ch3.49-50 (उच्च-गहन अंश 10/3/28/15/5/27/20 Su..Sa, वही अंश
नीच-गहन भी; नीच-राशि = उच्च+6)। Uchcha = fold(ग्रह - गहन-नीच)/3।
Kendradi whole-sign: केन्द्र 60 / पण्फर 30 / आपोक्लिम 15।
Dig spec-आउटपुट से यथाक्रम सत्य (58.97/18.83/43.08/28.17/53.93/11.92/11.12)।

| ग्रह | uchcha | भाव | kendradi | dig | drekkana# | drekkanaBal | ojha-rasi |
|---|---|---|---|---|---|---|---|
| Su | 22.10 | 10 | 60 | 58.97 | 2 | 0 | 15 |
| Mo | 5.43 | 8 | 30 | 18.83 | 2 | 0 | 0 |
| Ma | 58.02 | 12 | 15 | 43.08 | 1 | 15 | 15 |
| Me | 32.44 | 10 | 60 | 28.17 | 1 | 0 | 15 |
| Ju | 28.80 | 2 | 30 | 53.93 | 1 | 15 | 15 |
| Ve | 13.48 | 9 | 15 | 11.92 | 1 | 0 | 15 |
| Sa | 1.15 | 2 | 30 | 11.12 | 2 | 15 | 15 |

शेष घटक (saptavargaja, ojha-navamsa, kala-श्रेणी, cheshta, drik, yuddha) हाथ-
derivation harness-चरण में; परिपाटी-निर्णयों पर निर्भर।

## ch3.55 नैसर्गिक-मैत्री तालिका (मुद्रित-तालिका से, machine-readable)
```json
{"Sun":{"friend":["Moon","Mars","Jupiter"],"enemy":["Venus","Saturn"],"neutral":["Mercury"]},
"Moon":{"friend":["Sun","Mercury"],"enemy":[],"neutral":["Mars","Jupiter","Venus","Saturn"]},
"Mars":{"friend":["Sun","Moon","Jupiter"],"enemy":["Mercury"],"neutral":["Venus","Saturn"]},
"Mercury":{"friend":["Sun","Venus"],"enemy":["Moon"],"neutral":["Mars","Jupiter","Saturn"]},
"Jupiter":{"friend":["Sun","Moon","Mars"],"enemy":["Mercury","Venus"],"neutral":["Saturn"]},
"Venus":{"friend":["Mercury","Saturn"],"enemy":["Moon","Sun"],"neutral":["Mars","Jupiter"]},
"Saturn":{"friend":["Mercury","Venus"],"enemy":["Sun","Moon","Mars"],"neutral":["Jupiter"]}}
```
तात्कालिक (ch3.56): दूसरे ग्रह से 2/3/4/10/11/12 भाव में → मित्र; अन्यथा शत्रु।
पंचधा (ch3.57-58): दोनों मित्र=अति-मित्र; एक मित्र+एक सम=मित्र; एक शत्रु+एक
मित्र=सम; एक शत्रु+एक सम=शत्रु; दोनों शत्रु=अति-शत्रु।

## समीक्षक-सिफ़ारिशें 12:00 (main-निर्देश 12:00/12:03/12:04 से कार्यान्वयन) — कार्यान्वयन-क्रम और अवशिष्ट निर्णय-पंजीकरण

> प्रमाणन-टिप्पणी (समीक्षक 12:02): ये पंक्तियाँ अनुसंधान-एजेंट की सिफ़ारिशें हैं,
> फ़ाइल में दर्ज; फ़ाइल स्वयं अनुमति प्रमाणित नहीं करती। build-scope अनुमति
> main/user के पास है; कार्यान्वयन main के 12:00/12:03/12:04 निर्देशों के अधीन।

### कार्यान्वयन-क्रम (समीक्षक confidence-क्रम)
1. Uchcha, Dig, Naisargika, Kendradi, Ojha, Drekkana (सुधारित मान: Mo 0, Sa 15)।
2. Paksha, Nathonnatha, Tribhaga, Hora, Vara — Raman Ex35 Kala golden से
   जाँच (convention-caveat: Raman kala में Sun-ayana/Moon-paksha दोगुने;
   true-noon संदर्भ; declination-ayana)।
3. Ayana (BPHS-khanda primary) + Sun/Moon Cheshta — convention-नोट सहित।

### अमॉडल + स्पष्ट नोट (हटाया नहीं — main 12:00: "deferred gaps को स्थायी
हटाव न मानें")
- Cheshta मंगल→शनि: mean-longitude स्रोत अनुपलब्ध; स्रोत मिलने पर (b) लागू।
- ग्रह-युद्ध: परिभाषा स्रोत में नहीं; अमॉडल + नोट।
- Saptavargaja: compound (natural+temporary) परिपाटी चुनी — golden नहीं;
  MT-45 केवल-राशि पठन असत्यापित ⚠।
- Abda/Masa: Raman/Sripati schematic — reproduction-only, कोई golden नहीं।
- Drik: ch26 sphuta spec मौजूद; मान-derivation harness-चरण में।
- Bhava bala (26-31): "one"=60, "quarter"=15 पठन plausible, cross-check बाकी।
- Fixture-tolerance: केवल Dig ±0.06; अन्य कोई नहीं।

### आंशिक-समग्रता नियम (main 12:00)
अनुपलब्ध घटकों से कुल/अनुपात न बनाएँ; आंशिक को पूर्ण षड्बल/भावबल न कहें —
UI में प्रत्येक अमॉडल घटक स्पष्ट सूची में, कुल केवल तब जब सभी 6 स्रोत
गणित हों (अथवा "आंशिक योग" स्पष्ट लेबल)।

### अवशिष्ट निर्णय-पंक्तियाँ (अंतिम पुष्टि हेतु reviewer को)
1. Saptavargaja compound-परिपाटी बिना golden — स्वीकार्य?
2. Abda/Masa Raman-convention लेबल पर्याप्त?
3. Ayana BPHS-khanda primary + ~1 virupa विचलन-नोट — स्वीकार्य?
4. Yuddha अमॉडल (न कि flag-के-पीछे Raman-नियम) — स्वीकार्य?
5. MT-45 केवल-राशि पठन — जोखिम स्वीकार या अमॉडल-नोट?

## F1 kala-श्रेणी worked example (सन्निकट — सटीक मान implementation में engine से)
- Paksha: |196.7119-256.2879| = 59.576° → PB 19.86; Mo/Me/Ve/Ju 19.86,
  Su/Ma/Sa 40.14।
- Nathonnatha (सन्निकट): solar transit ≈ 12:24 IST (द्रैघ्य-संशोधन +21.16min,
  EoT ≈ -3.1min) → d ≈ 1.01 घटी → Mo/Ma/Sa 2.02, Su/Ju/Ve 57.98, Me 60।
- Tribhaga (सन्निकट): 12:00 दिन-द्वितीय-त्रिभाग में → Sun 60; गुरु सदैव 60।
- Vara: 2000-01-01 शनिवार → Saturn 45।
- Hora (सन्निकट): sunrise ≈7:14; 12:00 = 5वाँ hora; शनि से Chaldean → Venus 60।
सटीक sunrise/transit/hora-सीमाएँ implementation में ephemeris से; ये मान fixture-
गणना की संरचना दिखाते हैं, golden नहीं।

## Abda/Masa indexing — resolved 12:04 (main की शर्त पूर्ण)
- epoch 1827-05-01 दो स्वतंत्र Table-I मानों से सत्य: 1917-12-31 → A=33116,
  1918-10-16 → A=33405 (दोनों exact)।
- सूत्र: yv=3*⌊A/360⌋+1, mv=2*⌊A/30⌋+1; स्वामी = ((v-1) mod 7) गिनती
  बुधवार से (Sunday=0 आधार में index ((v-1)%7+3)%7)। Raman-उदाहरण: varsha
  Saturn, maasa Mercury — दोनों exact पुनःउत्पादन। एक-उदाहरण tuning नहीं:
  epoch दो बिंदुओं से, गुणक 3/2 Raman pp.43-47 पठन से।
- F1 (2000-01-01): abda-lord Mercury, masa-lord Sun।
- Drik-वर्गीकरण (waxing-Moon, Mercury-conjunction) PROVISIONAL — output में
  provisional[] सूची + note; समीक्षक sign-off + independent fixtures बाकी।

---

## v0.8 — समीक्षक consolidated verdict 12:34 (2026-11-11), सभी निर्णय लागू

स्रोत: reviewer consolidated verdict 12:34 (main मार्ग); BPHS26.6 / 3.51-54 vedicpupil
पाठ से reviewer-सत्यापित; Raman पुस्तक-पृष्ठ pixels (pp57/59/60) reviewer-निरीक्षित।

**Blocker-fixes (1-6)**
1. Drik कोण-दिशा: 26.6 = दृष्टि-लक्ष्य − दृष्टि-कर्ता (aspected minus aspecting)।
   module + python दोनों ठिक; asymmetric direction-fixtures (Saturn 3rd/10th,
   Jupiter 5th/9th, Mars 8th zones) tests में; सभी drik/partial पुनर्गणित।
2. MT-45 अंश-क्षेत्र (BPHS3.51-54): Su Leo0-20, Mo Taurus3-30, Ma Aries0-12,
   Me Virgo15-20, Ju Sag0-10, Ve Libra0-15, Sa Aqu0-20; केवल D1। boundary-tests
   दोनों ओर (Virgo 0-15 MT नहीं; Taurus 0-3 MT नहीं)। रामन पूर्ण-राशि पठन
   mat-bhed के रूप में दर्ज रहता है।
3. Pre-sunrise chronology: jyotish-दिन inputs — पिछले नागरिक दिन का
   सूर्योदय+वार (Hora/Vara), पिछला सूर्यास्त (Tribhaga); module misuse पर
   throw; fixtures: pre-sunrise, after-sunset, previous-day boundary।
4. UI सप्तवर्गज detail-schema ठिक ({total,detail[]} से render; undefined दूर)।
5. UI दावा संकुचित: कौन-से घटक प्रकाशित-उदाहरण जाँचे vs केवल सूत्र-स्तर —
   अलग-अलग लिखा; "सभी स्वतंत्र" दावा हटा।
6. Mobile 390px: .suite-bala-scroll (overflow-x:auto) wrapper + min-width;
   expanded-details भी scroll-region में।

**Q1 Mercury paksha (हल)**: रामन जानबूझकर बुध को पाप वर्ग में रखते हैं
(उदा.18 "Budha Papa"; उदा.54 footnote: सूर्य-संयोग/combustion) — प्रिंट-दोष नहीं।
BPHS27.11 सीधा पठन (Mo/Me/Ve/Ju unconditional) text-first convention बना रहता;
भिन्नता दर्ज। मुद्रित 16.54 प्रतिस्थापन केवल arithmetic-reconstruction है,
Mercury-paksha component validation नहीं।

**Q2 Drik (हल)**: Raman pp85-88 भिन्न model (general aspect + स्थिर विशेष
15/30/45, सभी quarter-weighted) — cross-convention golden नहीं; sign-tालिका
तुलना वापस। Module drik = चुनी convention, EXPERIMENTAL, partialSum से बाहर
(out.experimental=['drik']) जब तक verified incoming-aspect/classifier
fixtures न आएँ। व्यक्तिगत आगामी-दृष्टि परीक्षण चुने सूत्र पर जारी।

**Q3 Jupiter ayana (हल)**: मिश्रित ayanamsha + मुद्रित अंकगणित विसंगति।
Raman fixture अलग book-ayanamsha 21°16' से; वास्तविक चार्ट engine-Lahiri से;
दोनों न मिलाएँ। Jupiter decomposition (reviewer): printed 59.4 − book-expression
58.85764 = 0.54236 मुद्रित-अंकगणित; 58.85764 − khanda(book-ayan) 57.96263 =
0.89501 पद्धति-अन्तर; book-vs-engine ayanamsha 0.19416; कुल 1.63153।
Raman p57 Moon 312°17' vs input-तालिका 311°17' — मुद्रित-पंक्ति दोष दर्ज।

**Tolerance-सुधार (reviewer के पूर्व परामर्श पर)**
- 0.98 केवल khanda-lavas/3 vs 30·sin(bhuja) shape-bound (समान input पर);
  मुद्रित Raman-ayana की accuracy-bound नहीं। "~1 virupa vs true-declination"
  जैसा broad दावा हटा; Raman पद्धति = 15°-खंड interpolation-तालिका।
- Dig ±0.06 वापस (mislabeled residual)। Dig golden = arc-सूत्र पर; 2dp
  representational 0.0051 केवल। Oracle-सेल named-exclusion सूची (वर्तमान: रिक्त)।
- Kala reconstruction bound adopted-inputs से व्युत्पन्न: nath-chain 0.052
  + paksha 0.005 (Mercury 0) + ayana 0.005 + total-2dp 0.005 = 0.067 (Me 0.062)।
  0.035 असंगत था (अपने ही input-bound से छोटा)।

**संरचना (पास)**: Sthana = uchcha/saptavargaja/ojha/kendradi/drekkana; Dig अलग,
partialSum में एक बार; drik sum से बाहर; कोई full-total/ratio नहीं; Su/Mo
cheshta की kala-घटक-पुनरावृत्ति पाठ-निर्दिष्ट (27.18), जानबूझकर।

---

## v0.9 — समीक्षक re-review gates 12:38:59 / 12:39:22 (2026-11-11), सभी लागू

स्रोत: reviewer re-review of v0.8 (main मार्ग, 12:38:59 chronology gates +
12:39:22 evidence-label/visual gates)।

**Chronology fixes (12:38:59)**
1. UI rollover: pre-sunrise branch अब birth−86400000 नहीं — पिछली LOCAL
   CALENDAR DATE चुनता है (B.previousLocalDateString, en-CA + UTC calendar
   math) और उस date के civil-noon पर dailyPanchanga। DST spring-forward
   (NY 2024-03-11 00:30 EDT → पिछली date 2024-03-10, न कि 03-09) और
   fall-back (2024-11-04 00:30 EST → 2024-11-03) दोनों exact fixtures;
   गलत 24h-subtraction अलग assert में सिद्ध।
2. horaBala: elapsed पूरे घंटे UNWRAPPED (n = floor((birth−sunrise)/1h)),
   कोई %24 reset नहीं — >24h solar-day का 25वाँ hora 7-lord चक्र जारी
   रखता है। birth < sunriseMs पर throw (silently miscompute कभी नहीं)।
   Fixtures: 25th-hora (n=24 → Mars, buggy wrap Moon देता — guard
   matters), next-sunrise boundary, throw-case।
3. Engine-side DST fixture (18e): Europe/London 2024-03-31 BST transition
   पर civil-vs-previous sunrise dates, Saturday vara rollover, hora वास्तविक
   Saturday-sunrise instant से, tribhaga engine-night thirds; अब
   B.previousLocalDateString helper के माध्यम से।

**Evidence-label fixes (12:39:22)**
4. UI जाँच-दायरा paragraph reviewer के scoped wording पर: सूत्र-परीक्षण
   सभी दिखाए घटक; चुनी रामन-उदाहरण जाँचें = नाथोन्नथ, पक्ष (बुध छोड़कर),
   त्रिभाग, वार, होरा; अब्द/मास = रामन की चुनी convention की reproduction;
   दिग्बल = रामन-सारणी की 5 पंक्तियाँ arc-सूत्र से, 2 दोषपूर्ण पंक्तियाँ
   (बुध 21.09 vs 21.03; गुरु 11.50 vs 11.48) दर्ज कर हटाईं; शेष
   प्रकाशित-उदाहरण जाँच अधूरी। कोई Raman-dig-golden दावा नहीं।
5. Kala reconstruction bound per-planet सुधार: स्रोत-entry दो बार प्रयुक्त
   होने पर coefficient doubled — Sun 0.072 (ayana दोबारा), Moon 0.072
   (paksha दोबारा), Mercury 0.062 (printed paksha substituted), अन्य 0.067।
   python harness derivation-comment इसी से match।
6. Stale comments हटाए: validate-bala header का "Dig 0.06" (18d arc-formula
   test + named exclusions से बदला); drik-in-partialSum की कोई टिप्पणी
   शेष नहीं (drik experimental, sum से बाहर — अपरिवर्तित)।

**Visual fixes (12:39:22)**
7. Mobile: "⇠ तालिका को बाईं-दाईं ओर खिसकाएँ ⇢" hint सारणी के ऊपर;
   nested horizontal scroll-region हटाया (expanded details अब wrapping
   text, अलग scroller नहीं — scroll-trap सम्भावना समाप्त); css का टूटा
   dangling rule (border-collapse बाहर गिरा था) ठिक।
8. Local INTEGRATED pixel proof (commit से पहले, bundled page): desktop
   expanded details (Sun पूर्ण घटक-विभाजन) + 390px mobile (hint सहित
   clipped table → scroll करने पर आंशिक-योग स्तम्भ 525.88 और expanded
   details दोनों पहुँचते हैं)। Screenshots review-package में संलग्न।

**Test state (v0.9, सभी green)**: node validate-bala 173/173 (17 नए:
18d×2, 18e+1, 18f×5, 18g×4 + aligned); python harness 79/79;
interpretation 138/138; siddhant 70/0; antardasha 34/34; dasha-phal,
gallery-relations, relations 717, states 455 — सब पास।

---

# v0.6 — शेष घटक: स्रोत-सत्यापन + कार्यान्वयन-योजना (11 Nov 2026 ~13:00 IST)

स्कोप: main 12:56 निर्देशानुसार शेष बला घटक — मंगल→शनि cheshta (27.21-25),
ग्रह-युद्ध (27.20), भावबल (27.26-31)। यह खंड स्रोत-अभिलेख है; कोई कोड नहीं।

## A. Ephemeris-पर्याप्तता (पूर्ण जाँच, 12:58; astro-core.js export-table पठित)
- BrahmAstro exports: ayanamsha, grahaPositions, outerPositions, riseSet,
  siderealLagna, dailyPanchanga, lagnaWindow, localDayString,
  startOfLocalDayUTC, nextLocalDayStartUTC, nakshatra/tithi/karana/yoga
  boundaries, name tables।
- HelioVector: bundle में मौजूद (internal) पर export नहीं → सीघ्रोच्च का
  heliocentric मार्ग बिना bundle-परिवर्तन के अनुपलब्ध। bundle-परिवर्तन एक
  अलग build-process निर्णय होगा, इस increment में नहीं माना।
- grahaPositions: प्रति-ग्रह sidereal longitude + retrograde flag;
  raw speed नहीं। outerPositions finite-difference पैटर्न (±30min ×24)
  दर्ज — speed व्युत्पन्न संभव, पर 8-गति परिपाटी की आवश्यकता यथावत।
- MC/IC (meridian/nadir): पूरे codebase में कहीं गणना नहीं (grep: midheaven/
  meridian/nadir/IC शून्य)। भावबल 27.26-27 के 4H/10H हेतु नया astronomy
  घटक (obliquity/RAMC) चाहिए या समीक्षक-परिपाटी।
- भाव-परिपाटी: app पहले से whole-sign (kundli-engine house(): राशि-अंतर;
  UI source-note में घोषित) — यह सुसंगत मौजूदा परिपाटी है।

## B. Cheshta मंगल→शनि (27.21-25)
मत-भेद अब दोनों अनुवादों के पठित पाठ से दर्ज (formula-check only):
- vedicpupil (27.22-23 श्लोक-पाठ): vakra 60, anuvakra 30 (दलम्), vikala 15
  (पाद), sama 30 (मध्यगतेर्दलम्), manda 15 (पादो मन्दगतेः), mandatara 30
  (दलं मन्दतरस्य), chara 45 (पादोन), atichara 30 (दलम्)।
- jyotishvidya (अनाम ऑनलाइन अनुवाद, क्रम Vakra→Atichara): 60, 30, 15, 30,
  15, 7.5, 45, 30।
- असंगति: Manda/Mandatara अदला-बदली + Sama 30 (vp) बनाम 7.5 (jv)।
  मुद्रित-श्लोक सत्यापन लंबित — दोनों दर्ज, कोई निर्णय नहीं (स्थायी
  समीक्षक-शर्त 1)।
- Primary (b) cheshta-kendra (27.24-25, Raman-सुसंगत): आवश्यक mean
  geocentric longitude + sheeghrochcha — दोनों BrahmAstro exports में
  नहीं।
- Mean-elements प्राथमिक स्रोत (समीक्षक-नामित, 13:01; section-स्तर सत्यापित
  13:02): Simon et al. 1994, A&A 282, 663-683, §5.9 pp.677-679
  ("Mean elements of the planets referred to the mean dynamical ecliptic
  and equinox of date"; VSOP87: Mercury/Venus/Earth/Mars/Uranus/Neptune;
  JASON84: Jupiter/Saturn; t = TDB सहस्र-वर्ष J2000 से) —
  https://articles.adsabs.harvard.edu/pdf/1994A&A...282..663S
  ⚠ JPL fitted elements (ssd.jpl.nasa.gov/planets/approx_pos.html)
  true-mean नहीं — उस स्रोत का उपयोग वर्जित। यह एक अलग दस्तावेज़ित
  MODERN mean-elements cheshta परिपाटी होगी; coefficients + जाँचे हुए
  Raman intermediates समीक्षक से आने शेष। implementation clearance अभी
  नहीं।
- Golden fixture उपलब्ध: Raman printed cheshta, **Standard Horoscope
  (1918-10-16 14:06:16 LMT, 13°N 77°35'E — अलग fixture-पहचान; 2000-Delhi
  नहीं)** = Ma 22.23, Me 2.30, Ju 35.26, Ve 5.95, Sa 21.14 virupa
  (published printed numbers; कुछ ग्रह-total असंगतियाँ fixture issues में
  पहले से दर्ज — component-level ही प्रमाण, totals नहीं)।
- Alternative (a) 8-गति: speed-threshold परिपाटी + अनसुलझा मत-भेद →
  अभी अमॉडल ही रखें; (b) के अनुपलब्ध होने पर fallback नहीं बल्कि अलग
  समीक्षा-इकाई।

## C. ग्रह-युद्ध (27.20) — अमॉडल यथावत
श्लोक युद्ध-परिभाषा नहीं देता; Raman-नियम Sripati-आधारित व OCR-विकृत
diameter-तालिका; कोई golden नहीं → अमॉडल + स्पष्ट नोट (रुलिंग 15 अपरिवर्तित)।

## D. भावबल (27.26-31) — सूत्र-शृंखला (दोनों अनुवाद मेल)
1. भाव-राशि-समूह से reference-बिन्दु घटाव: कन्या/मिथुन/तुला/कुम्भ/धनु-
   प्रथमार्ध → 7H; वृषभ/मेष/सिंह/मकर-प्रथमार्ध/धनु-द्वितीयार्ध → 4H;
   कर्क/वृश्चिक → लग्न; मकर-द्वितीयार्ध/मीन → 10H (27.26-27)।
2. शेष >6 राशि हो तो 12 से घटाव; अंश में बदलकर /3 (27.28; dig-जैसा)।
3. +1/4 शुभ-दृष्टि-पिंड, −1/4 पाप-दृष्टि-पिंड; बुध/गुरु दृष्टि पूर्ण जोड़
   (27.28-29) — ch26 drishti() पहले से cleared, पुन:उपयोग।
4. + भाव-स्वामी का बल (27.29) — कौन-सा बल (कुल/आंशिक) परिपाटी चाहिए;
   Raman-पद्धति में स्वामी का कुल षड्बल (सत्यापन शेष)।
5. विशेष 27.30: गुरु/बुध-स्थित भाव +1 rupa (=60 virupa); शनि/मंगल/सूर्य-
   स्थित −1 rupa। (jv "1 rupa" स्पष्ट; vp "one" संक्षिप्त — jv-स्पष्टीकरण
   अपनाया, दर्ज।)
6. 27.31: शीर्षोदय-भाव +15 virupa दिन में; उभयोदय +15 संध्या; पृष्ठोदय
   +15 रात्रि। (jv "15 Virupas"; vp "quarter" — quarter rupa = 15 virupa,
   jv-स्पष्टीकरण दर्ज।) दिन/रात्रि sunrise/sunset से उपलब्ध।
   ⚠ उभयोदय-परिभाषा (समीक्षक-सुधार 13:01, BPHS 4.23 से सत्यापित 13:02):
   उभयोदय = केवल मीन (Pisces) — 4.23 "सौम्यस्थो ह्युभयोदयी", "rises both
   ways"। jv ch27 का "dual (or common) Rasis" अनुवाद-विस्तार 4.23 से
   भिन्न — 4.23 नियंत्रक, jv-पठन असंगति के रूप में दर्ज।
   ⚠ संध्या (twilight) की परिभाषा: प्रतिस्पर्धी परिभाषाएँ अनसुलझी — कोई
   silent default नहीं (समीक्षक 13:01); परिपाटी समीक्षक-निर्णय मांगती है।

### खुले प्रश्न (समीक्षक को, कोड से पहले)
- D4: भाव-स्वामी बल की परिभाषा (कुल षड्बल बनाम आंशिक; yuddha-समायोजन
  अमॉडल होने से विचलन-मुक्त)।
- MC/IC: 4H/10H हेतु meridian/nadir गणना जोड़ें (नया astro घटक) या
  whole-sign 4H/10H परिपाटी? ⚠ anchor-संघर्ष दर्ज: Raman p.3 printed
  mc 216°30', ic 36°30' बनाम worked Example 59 मान 216°36'/36°36' —
  दोनों में असंगति; **कोई भी modern-astronomy golden नहीं**, केवल
  published-print संदर्भ (समीक्षक 13:00)। meridian-मार्ग चुने तो modern
  ephemeris से स्वतंत्र जाँच अलग से चाहिए।
- संध्या-सीमा (27.31 ubhayodaya-खिड़की) परिपाटी।
- D4 उत्तर (published source मिला, 12:59): Raman Graha and Bhava Balas
  art. 124-125 + Example 58 — Bhavadhipathi Bala = भाव-स्वामी का **कुल षड्बल**
  (Example 58 rupas में: Sa 6.49, Ju 7.23, Ma 4.97 ... = F1 totals/60;
  Example 59 virupas में: 389.21, 433.77, 298.14, 376.25)। समीक्षक-पुष्टि
  फिर भी आवश्यक, पर अब परिपाटी-प्रस्ताव स्रोत-सहित है।
- नया मत-भेद/परिपाटी-प्रश्न (महत्वपूर्ण): BPHS 27.26-27 "भाव जिस राशि में
  हो" — Raman इसे **भाव-मध्य (mid-point/cusp)** से operationalize करता है
  (art. 126-131; Standard Horoscope भाव-मध्य: I = 298°27' = asc, II =
  311°10', IV = 36°30' = IC, X = MC — cusp-आधारित, whole-sign नहीं)।
  App की मौजूदा परिपाटी whole-sign है → समीक्षक-निर्णय: (i) whole-sign
  operationalization + स्पष्ट मत-भेद नोट, या (ii) Sripati cusps जोड़ना
  (नया astro घटक, अलग इकाई)।
- Raman-विस्तार (BPHS 27.26-31 से बाहर): "Bhava Digbala" राशि-वर्ग घटक
  (Nara/Jalachara/Chathushpada/Keeta, ±rupa, art. 126-131) — BPHS श्लोक
  नहीं; यदि जोड़ा जाए तो "Raman-extension" लेबल से, अलग समीक्षा।
- स्वतंत्र-जाँच स्थिति: source PDF से Example 59 (printed Total Bhavabala,
  F1; जैसे भाव I = 473.39 virupa = 7.89 rupas, III = 510.21 = 8.51)
  पठित, पर pdftotext OCR स्तम्भ-संरेखण बुरी तरह विकृत → golden fixture
  हेतु page-image transcription + verified_by_page_image अनुशासन चाहिए
  (अलग उप-कार्य)। Example 60-61 (Sun/Moon cheshta = ayana/paksha)
  रुलिंग 13 की पुष्टि करते हैं।

## E. प्रस्तावित क्रम
1. समीक्षक: B (cheshta-b परिपाटी), D4/D-MC/संध्या निर्णय।
2. तभी कोड + fixtures: Raman printed cheshta (5 ग्रह), F1 MC/IC anchor,
   भावबल printed/hand-derived (labeled)।
3. पाइपलाइन अपरिवर्तित: ledger → main → समीक्षा → कोड → harness →
   protected commit → hosted verify।

---

# v0.7 — Cheshta MODERN mean-elements: समीक्षक-पैकेज + द्वितीय-प्रतिलेखन + prep (11 Nov ~13:04 IST)

स्थिति: implementation PREP समर्थित, shipping clearance नहीं (main 13:02)।
कोई commit नहीं; harness केवल local।

## A. समीक्षक-परिपाटी (13:02, दर्ज)
- स्रोत: Simon et al. 1994 §5.9.1-5.9.6 λ (heliocentric mean longitude,
  mean dynamical ecliptic/equinox OF DATE); t=(JD_TDB−2451545)/365250;
  constant degrees, t¹..t⁶ coefficients ARCSECONDS (÷3600)।
- Mapping (Raman pp75-78 से स्वतंत्र समर्थन): meanSun = Earthλ + 180;
  Ma/Ju/Sa: midpoint में own mean, sheeghrochcha = meanSun;
  Me/Ve: midpoint में meanSun, sheeghrochcha = own λ।
- सूत्र: midpoint = mean + wrap180(true−mean)/2; kendra =
  |wrap180(apogee−midpoint)|; bala = kendra/3। angle-lifting averaging
  से पहले; frame-rotation अपरिवर्तनता आवश्यक।
- JPL approx_pos fitted elements वर्जित (true-mean नहीं)।

## B. द्वितीय-प्रतिलेखन (मेरा, paper-pixels से, उच्च-zoom crops)
परिणाम: Venus/Earth/Mars/Jupiter = reviewer-JSON से पूर्ण मेल।
तीन सुधार (paper pixel = नियंत्रक):
- Mercury t³: paper +0″06522; reviewer-JSON 0.065222 (अतिरिक्त अंक)।
- Saturn t⁴: paper −0″35004; reviewer-JSON −0.335।
- Saturn t⁶: paper +0″00103; reviewer-JSON +0.000103 (दस गुना)।
संख्यात्मक प्रभाव 1900-2100 में <2e-6° (नगण्य), परंतु transcription
exact होना आवश्यक — सुधारित सेट harness में स्थिर।

## C. Prep harness (harness/cheshta-modern-prep.py, local-only) — 22/22 PASS
- 12 polynomial reproductions (दो JD; लेबल: NOT independent goldens)।
- 5 Raman-1918 published-input rows, bound 0.008334 (Ma 22.2308,
  Me 2.2946, Ju 35.2558, Ve 5.9479, Sa 21.1392 — सभी printed 2dp से
  भीतर; fixture computed से 1e-10 तक मेल)। Saturn p77 sheeghrochcha
  151.23 typo → p75/p78 के 181.2275, named exclusion।
- 2 wrap regressions (359/1/0→0; 1/359/0→0) exact।
- 1000 frame-rotation invariance checks (200 triples × 5 rotations)।

## D. Implementation से पहले सुलझाने शेष (main 13:02; कोई silent default नहीं)
- Frame: app apparent-of-date sidereal + mean ayanamsha ↔ Simon mean
  equinox-of-date — nutation सुधार या स्पष्ट small-approximation budget,
  स्पष्ट लिखित निर्णय; "strict frame identity" दावा वर्जित।
- TT≈TDB timing-error सीमा लिखित; UTC silent feeding वर्जित (civilUTC
  wiring अलग hosted-regression मद यथावत)।
- 1900-2100 product guard लागू।
- Full totals/yuddha/bhava uncleared; reviewer bhava report forthcoming।

---

# v0.8 — भावबल समीक्षक-निर्णय (13:04) + चतुर्थ सुधार (13:05) + terms prep

## A. चतुर्थ transcription सुधार (13:05)
Jupiter t⁶: paper −0″00014; प्रथम JSON −0.000014। मेरा सेट पहले से सही,
परंतु मेरा correction-log इसे चिह्नित करना चूक गया — दर्ज। समीक्षक के
superseding artifacts (simon-mean-elements-8c3e507b.json,
cheshta-research-fixture-c582db41.json) मेरे paper-verified सेट से
identical; regenerated reproductions 1e-9 पर पुनः मेल; Raman inputs
अपरिवर्तित। shipping clearance अभी भी नहीं।

## B. भावबल निर्णय (bhava-decisions-ba3ba3c6.md, दर्ज)
1. Geometry: अलग, स्पष्ट-नामित **Sripati madhya** — I=Asc, IV=IC,
   VII=Desc, X=MC; प्रत्येक forward quadrant का त्रिभाजन। App की
   whole-sign houses अपरिवर्तित; कोई silent whole-sign प्रतिस्थापन नहीं।
2. MC helper: RAMC (LAST degrees) → tropical MC = atan2(sin RAMC,
   cos RAMC·cos(true obliquity)); IC=MC+180, Desc=Asc+180; समान sidereal
   frame में रूपांतरण; GMST/true-obliquity mixing बिना label के वर्जित।
   independent astronomical fixture अभी शेष (synthetic checks ही हुए)।
3. Typos: Ex59 II 311°10' → 331°10' (p21 + Jupiter D.K. 247°09' =
   331°10'−84°01' पुष्टि), named exclusion; p3 216°30'/36°30' excluded
   (worked 216°36'/36°36' नियंत्रक, averaging वर्जित)। XI: subha 45.18 −
   asubha 12.05 = 33.13 बनाम printed nett 33.12 (0.01 source-विचलन)।
   IV 0.20 / X 0.10 / XII 100.00 विचलन यथावत।
4. भाव-स्वामी = madhya-राशि का स्वामी; बल = **पूर्ण Shadbala Pinda**
   (Raman art.125 pp.92-93 pixels)। partial substitution वर्जित;
   missing = zero नहीं; पूर्ण भाव total/rank तब तक blocked जब तक
   ग्रह-बल अपूर्ण/experimental।
5. Raman Ex59 BPHS arc/aspect model का golden नहीं (art.131 integer
   bhava-distance ×10; Cancer-वर्गीकरण भिन्न; fixed-special-aspect +
   Mercury सदा पूर्ण शुभ p99 footnote)। 27.29 बुध/गुरु-दृष्टि पाठ-
   अस्पष्टता (additional-full बनाम replacement) स्पष्ट दर्ज; मौजूदा
   replacement-weight experimental Drik को source-settled न कहें।
6. 27.30: once-per-class provisional (+60 Me/Ju, −60 Su/Ma/Sa);
   collisions स्पष्ट; cusp-भाव occupancy boundaries = आसन्न madhya के
   मध्य-बिन्दु, half-open [start,end), exact-sandhi → अगला भाव (नामित)।
7. 27.31: उभयोदय = केवल मीन (4.23); rising-groups Saravali 3.24 cite
   (BPHS4 web-अनुवाद Sc/Sg पर भिन्न): shirshodaya Ge Le Vi Li Sc Aq;
   prishthodaya Ar Ta Ca Sg Cp; ubhayodaya Pi; वर्गीकरण madhya-राशि से।
   Twilight: provisional = BPHS 9.14 का 72min BEFORE half-disc sunrise /
   72min AFTER half-disc sunset (cross-chapter transfer, स्पष्ट-labeled);
   twilight > night priority, कोई double bonus नहीं; half-disc बनाम
   upper-limb approximation बजट/रिपोर्ट आवश्यक; BPHS 46.44 (5 ghatis
   प्रत्येक ओर) documented alternative; civil-twilight(−6°) को BPHS-नियम
   कहना असमर्थित।

## C. Prep harness harness/bhava-terms-prep.py (local-only) — 45/45 PASS
- p21 geometry fixture: 4 angles → 12 madhyas, 1/3 arcmin tolerance
  (minute-printed intermediates) — सभी 12 सटीक (geometry operation की
  जाँच, 1918 जन्म-समय से modern-astronomy golden नहीं)।
- uniform-quadrant, 300 rotation-invariance, forward-order।
- boundaries: 1000 random longitudes partition, 12 exact-sandhi →
  next-bhava, madhya स्व-भाव में।
- rising-table 6 checks; occupant once-per-class 5 checks (collision
  सहित)।
- MC helper synthetic: RAMC 0/90/180/270 identity, 360 quadrant-
  preservation, 360-periodicity। independent MC fixture शेष।

---

# v0.9 — Frame/time resolution + harness-सुधार (13:07)
- Reviewer-पकड़ा vacuous-test दोष सुधारा: boundary-जाँच अब वास्तविक
  invariants (सभी widths > 0; Σ=360; 2000-लंबाई unique membership count=1;
  p21-बंधे 12 hand-literal boundaries; स्वतंत्र lifted-mid code-path) +
  3 negative controls जो provably fail होते हैं (duplicate→width 0;
  swapped→overlap; whole-sign substitution→literal विफल)। पुनःरन: 63/63।
  (पहला सुधार-प्रयास स्वयं दोषपूर्ण था — गलत fixture-binding + हस्त-
  गणना त्रुटि; द्वितीय पुनरावृत्ति में ठीक, दर्ज।)
- Frame/time: bundle internals सत्यापित (w/AstroTime.tt, Q nutation+
  tobl, wn GAST — chart के ascendant का वही sidereal-time path)।
  o0-बीजगणित code में VERIFIED: sidereal + mean ayanamsha = apparent
  tropical − dpsi (mean-equinoctial convention); दूसरा dpsi वर्जित।
  JD_TT=2451545+AstroTime.tt; TDB≈TT (IAU2006B3 <2ms, <1e-7°) नामित;
  UTC कभी TT नहीं। MC: RAMC=15·GAST+longE, tropical MC atan2, समान
  ayanamsha-frame जैसा Asc; independent Swiss-isolated MC/IC oracle
  fixtures reviewer बना रहा है — shipping से पहले आवश्यक।
  विवरण: docs/frame-time-resolution-draft.md।
- Minimal native wrapper exports proposed (astroTt, gastHours,
  trueObliquity, nutationDpsi, meanAyanamsha) + API regression tests;
  bala-module में DeltaT/nutation पुनःकार्यान्वयन नहीं।

---

## वर्तमान स्थिति (11 Nov 2026 ~13:36 IST, main-स्वीकृत आंतरिक रिकॉर्ड)

**इकाई D+E(आंशिक): षड्बल घटक + चेष्टा (मंगल-शनि) + भावबल व्यक्तिगत शर्तें (27.26-31)**
- कोड स्थिति: preview/kundli-suite पर committed, HEAD 7609726fa1f2eac81715e4ec651baff26363f22b।
  main branch अपरिवर्तित (d7da476770348c6bf7fe98dc6f27e1ea25a0654c)। force-push नहीं।
- होस्टेड जाँच: Vercel preview deployment https://brahmtatva-digital-mandir-g1ev19k9t.vercel.app
  (कुंडली पेज: /kundli.html — owner-session में observed load)। पूर्व deployment
  ...-3igrg1629 (0491a96) सुरक्षित।
- गुमनाम सुरक्षा जाँच (13:35): root, /kundli.html, /kundli-bhava.js, /kundli-bala.js,
  /kundli-suite-ui.js, /astro-core.js — सभी 302 → Vercel SSO (Standard Protection सक्रिय)।
- परीक्षण: cheshta 40/40, bhava-terms 106/106, wrapper 51/51, bala 173/173,
  bala-ui-context-check 12/12, reviewer bhava harness 0 failures (3/3 twilight)।
- मोबाइल native-scroll प्रमाण (390px, बिना CSS-injection): बाला तालिका दाहिना छोर
  (दृक्*/आंशिक योग) और भाव तालिका दाहिना छोर (अधिवासी ग्रह + ⇄ टकराव चिह्न) पठनीय।
- main निर्णय 13:35: आंतरिक स्वीकृति। **उपयोगकर्ता-डिलीवरी नहीं** — अपराह्न batch में
  main द्वारा नियोजित। सार्वजनिक release अनधिकृत।
- लेबल अखंड: आंशिक-only, दृक् प्रायोगिक, कुल/अनुपात/क्रम जानबूझकर अनुपस्थित (pending ब्लॉक)।
- ज्ञात अधूरा (आगे की इकाइयाँ): ग्रह-युद्ध, भावबल कुल मान (27.32-33), षड्बल कुल/आवश्यक-अनुपात,
  दृष्टि/युति फल-स्तर, नामित योग विस्तार, भाव-फल कारकत्व — ledger section E।

### wrapper-patch स्थिति
impl-draft/wrapper-patch.txt (TT/GAST/obliquity/nutation/mean-ayanamsha exports) अब
astro-core.js में applied + committed (7609726fa1f2)। पहले लागू नहीं था — होस्टेड भाव-पैनल ने
स्पष्ट pending दिखाया ("MC के लिए आवश्यक समय-सहायक उपलब्ध नहीं"), जिससे खुलासा हुआ;
यही pending-व्यवहार designed safe-state है।
