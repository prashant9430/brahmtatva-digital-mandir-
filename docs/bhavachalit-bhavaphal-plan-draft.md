# भाव-चलित + भाव-फल: दो increment योजनाएँ (योजना-दस्तावेज़, समीक्षा-अनुरोध नहीं)

स्थिति: 11 Nov 2026, ~17:15 IST. लेखक: kundli worker.
दोनों योजनाएँ अभी कार्यान्वयन-अनुरोध नहीं — केवल तैयारी; समीक्षक क्रम main तय करे।

## योजना 1: भाव-चलित दृश्य (हल्का, geometry पहले से reviewed)

- आधार: kundli-bhava.js में Sripati-madhya geometry पहले से reviewed और
  परीक्षित (madhyas/boundaries/bhavaOf; fixture Raman p21 geometry-check)।
  13:04 reviewer-nिर्णय: app का whole-sign chart अपरिवर्तित, कभी substitute नहीं।
- प्रस्ताव: अलग "भाव चलित" दृश्य/पंक्तियाँ — 7 ग्रहों (+nodes: भागीदारी अमॉडल
  label) की chalit-भाव स्थिति; whole-sign से shift हुए ग्रहों का स्पष्ट नोट;
  "Sripati-madhya परंपरा, whole-sign मुख्य चार्ट अपरिवर्तित" caveat।
- कोई नया phal-पाठ नहीं; कोई नया ephemeris नहीं (asc/IC/desc/MC मौजूदा
  astro-core से; MC oracle harness मौजूद)।
- परीक्षण: geometry fixture पुनःउपयोग + occupancy fixtures (sandhi half-open
  नियम: exact sandhi अगले भाव में — पहले से named convention)।
- जोखिम: कम — data-layer प्रस्तुति; समीक्षा मुख्यतः UI-शब्दावली/labeling की।
- समीक्षक GO-for-prep (17:15): dependence claim verified — validate-bhava-terms.js
  (106 checks, committed) Raman p21 fixture + boundary literals + Swiss MC
  oracle pins करता है। KP-संदेह नहीं (Sripati-madhya ≠ KP Placidus)।

### प्रस्तावित label-पाठ (verbatim समीक्षा हेतु)
1. Header caveat (चलित दृश्य के ऊपर): "यह भाव-चलित दृश्य Sripati-madhya
   परंपरा पर आधारित है; ऊपर का मुख्य चार्ट whole-sign (राशि-भाव) परंपरा में
   है और अपरिवर्तित रहता है।"
2. Nodes: "राहु-केतु की भाव-चलित भागीदारी इस संस्करण में अमॉडल है।"
3. Shifted planet note (प्रत्येक स्थानांतरित ग्रह पर, केवल तथ्यात्मक):
   "चलित भाव: N (whole-sign: M)" — कोई phal/शुभाशुभ निष्कर्ष नहीं।
4. Sandhi convention (footnote): "भाव-संधि पर ठीक स्थित ग्रह अगले भाव में
   गिना जाता है (अर्ध-खुला सीमा-नियम)।"
5. कोई chalit-आधारित भाव-फल निष्कर्ष इस increment में नहीं।
- Astrotalk-parity: "Bhav Chalit" उनके KP tab में था, परंतु भाव-चलित स्वयं
  Sripati परंपरा है, KP नहीं — scope-सीमा main पुष्टि करे (todo में BhavChalit
  खुली scope के रूप में सूचीबद्ध है)।

## योजना 2: भाव-फल पाठ-परत (BPHS ch12-23) — phaladesh का मूल, भारी curation

### सर्वेक्षण (jyotishvidya, सभी cached: sources/src-capture-jv-bphs-ch12-ch19-ch22-ch23.txt)
| अध्याय | भाव | पंक्तियाँ | लोप-keyword घनत्व |
|---|---|---|---|
| ch12 | 1st | 42 | 7 |
| ch13 | 2nd | 42 | 11 |
| ch14 | 3rd | 84 | 9 |
| ch15 | 4th | 98 | 10 |
| ch16 | 5th | 112 | 21 |
| ch17 | 6th | 116 | 20 |
| ch18 | 7th | 92 | 34 |
| ch19 | 8th | 28* | 6 |
| ch20 | 9th | 144 | 26 |
| ch21 | 10th | 102 | 17 |
| ch22 | 11th | 28* | 11 |
| ch23 | 12th | 26* | 9 |

*ch19/22/23 छोटे परंतु पूर्ण हैं (17:13 tail-जाँच: कोई truncation नहीं —
अंतिम श्लोक-समूह पूर्ण वाक्यों में समाप्त)। विशेष: ch19 (8th) लगभग पूरी तरह
longevity/death-पाठ है — नीति के तहत serveable yield न्यूनतम होगा; चरण-क्रम
में अंतिम या पारदर्शी लोप-प्रधान कार्ड के रूप में।

### संरचना-प्रतिमान (ch12 परीक्षण से)
प्रत्येक श्लोक-समूह: शर्त (लग्नेश/भावेश स्थिति, युति, दृष्टि, राशि-प्रकार)
→ फल-वाक्य। सभी शर्त-प्रकार पहले से मॉडल हैं (placement, occupancy, yuti,
graha-drishti whole-sign, dignity)।

### प्रस्तावित layer-नियम (pair-layer precedent से)
- favourable+adverse दोनों सदैव साथ; कोई verdict/score नहीं।
- per-sentence omission scan; count-only generic UI notice; omitN data field;
  कभी silent drop नहीं। लोप-श्रेणियाँ वर्तमान नीति अनुसार (death/grief,
  longevity — ch12 में "longlived" मौजूद, health-assurance, limb, remedy)।
- condition-match केवल; "शर्त पूरी नहीं" rows भी पारदर्शिता हेतु दिख सकती हैं
  (pair-layer की तरह served/unserved)।
- स्रोत: jyotishvidya प्राथमिक + siva.sh/vedicpupil formula-check; verbatim
  prose नहीं, मूल-पुनर्लेखन (अन्य परतों की तरह)।

### चरणबद्ध प्रस्ताव
- Pilot: ch12 (1st भाव; सबसे कम लोप-घनत्व 7, केंद्रीय भाव) — पूर्ण ledger +
  curation + per-sentence scan → समीक्षा → पैटर्न freeze।
- फिर क्रम: ch22 (11th), ch21 (10th), ch13 (2nd)... उच्च-घनत्व (ch18/ch20)
  अंत में।
- 12 भाव एक साथ नहीं — प्रत्येक भाव अलग review unit।

### अनुमानित समीक्षा-भार
उच्च (pair-layer अनुभव: 81 pairs/217 लोप-पद कई चक्र)। Pilot पहले पैटर्न
बाँध देगा, बाद के भाव तेज़ होंगे।

## क्रम-सुझाव (main के लिए)
1. Drik review पूर्ण होने दें (in flight)।
2. योजना 1 (भाव-चलित) हल्की समीक्षा — drik के बाद या साथ।
3. योजना 2 pilot (ch12) तैयारी मैं build-free कर सकता हूँ (ledger + curation
   draft), पर समीक्षा-बैच main तय करे — reviewer capacity की रक्षा।
