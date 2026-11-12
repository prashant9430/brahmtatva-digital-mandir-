# भाव-फल ch22 ledger (11वाँ भाव, लाभ) — curation प्रारूप (DRAFT)

दिनांक: 12 Nov 2026।
पैटर्न: docs/bhavaphal-ch12-ledger-draft.md (shipped pilot) 1:1।

**स्थिति: curation-निर्णय अंतिम; नीचे "संशोधन (लागू)" खंड के
सुधार लागू।** कोई नई गणना-परिपाटी या adverse-निर्णय milestone से स्थापित
नहीं।

## स्रोत (तीन, सभी cache में)
1. jyotishvidya.com/ch22.htm (Santhanam-परंपरा) — sources/src-capture-jv-bphs-ch12-ch19-ch22-ch23.txt
   (पूर्व capture; पूर्ण-सत्यापित, truncation नहीं)।
2. vedicpupil.in BPHS chapter-22 (Sanskrit + English, 11/11 श्लोक) —
   fresh fetch।
3. siva.sh/brihat-parashara-hora-shastra/22/{1,2,11} — cloud-browser fetch।
2+3 का संयुक्त cache: sources/vp-ss-bphs-ch22-fetch.txt।
Sanskrit (vp बनाम siva.sh 22.2) 1:1 मेल — पाठ-भिन्नता नहीं।

## श्लोक-दर-श्लोक curation प्रस्ताव

| id | श्लोक | शर्त (machine-checkable) | पाठ-दिशा | दिशा | प्रस्ताव |
|---|---|---|---|---|---|
| c22-1 | 22.1 | (कोई शर्त नहीं — भूमिका) | "शुभत्वे सदा सुखी" | तटस्थ | **OMIT-for-breadth**: सामान्य कल्याण-कथन, कोई जाँच-योग्य शर्त नहीं; ch12.3 precedent (विस्तृत सामान्यीकृत पंक्ति)। विकल्प: panel intro के रूप में, पर "सदा सुखी" अनिश्चित-आश्वासन बन जाता — इसलिए लोप ही प्रस्ताव; निर्णय नीचे। |
| c22-2a | 22.2a | labhesh भाव∈{11}∪{केंद्र(1,4,7,10),त्रिकोण(5,9)} | बहुलाभ | अनुकूल | KEEP (सभी शर्त-प्रकार मॉडल: placement) |
| c22-2b | 22.2b | labhesh उच्च-राशि | बहुलाभ | अनुकूल | KEEP (dignity मॉडल) |
| c22-2c | 22.2c | "सूर्यांशगोऽपि वा" | (वही फल) | — | **UNMODELED खंड** — mat-bhed नीचे; दोनों पठन अमॉडल (combustion / सूर्य-अंश), row के unmodeled-note में पारदर्शी सूची, शर्त से बाहर |
| c22-3 | 22.3 | labhesh भाव=2 AND dhanesh भाव∈केंद्र AND dhanesh युति गुरु | गुरुलाभ (बड़े लाभ) | अनुकूल | KEEP (placement + yuti मॉडल)। Sanskrit गुरुणा सहिते — गुरु-युति dhanesh पर; jv/vp एकमत |
| c22-4 | 22.4 | labhesh भाव=3 AND (शुभग्रहसमन्वित) | 36वें वर्ष 2000 निष्क | — | **OMIT**: निश्चित वर्ष + निश्चित मात्रा का धन-दावा; "निष्क" ऐतिहासिक सुवर्ण-माप होने पर भी specific fortune-timing+amount व्यक्तिगत भविष्यवाणी श्रेणी |
| c22-5 | 22.5 | labhesh केंद्र/त्रिकोण + शुभ-युति | 40वें वर्ष 500 निष्क | — | **OMIT** (वही श्रेणी) |
| c22-6 | 22.6 | गुरु भाव=11 AND चन्द्र भाव=2 AND शुक्र भाव=9 | 6000 निष्क | — | **OMIT** (वही श्रेणी — शर्त पूरी मॉडल होते हुए भी फल-वाक्य specific-मात्रा) |
| c22-7 | 22.7 | गुरु भाव=9 AND बुध भाव=9 AND चन्द्र भाव=9 (लाभ से 11वाँ = 9वाँ) | धन, धान्य और आभूषण की समृद्धि (ऐतिहासिक अभिप्राय) | अनुकूल | KEEP — सामान्य समृद्धि-सूची, कोई वर्ष/मात्रा नहीं; पाठ संशोधन-1 से सुधारा (रत्न→आभूषण, scan-collision) |
| c22-8 | 22.8 | labhesh भाव=1 AND lagnesh भाव=11 | 33वें वर्ष 1000 निष्क | — | **OMIT** (वही वर्ष+मात्रा श्रेणी) |
| c22-9 | 22.9 | dhanesh भाव=11 AND labhesh भाव=2 | विवाह के परम्पर बहु-भाग्य (ऐतिहासिक अभिप्राय) | अनुकूल | KEEP — "विवाहात्परतः" सामान्य क्रम-सूचक; विवाह-समय/घटना भविष्यवाणी नहीं |
| c22-10 | 22.10 | sahjesh (3rd lord) भाव=11 AND labhesh भाव=3 | भ्रातृ-मार्ग से धन + दिव्य आभरण (ऐतिहासिक अभिप्राय) | अनुकूल | KEEP |
| c22-11a | 22.11a | labhesh नीच-राशि | भूरि-प्रयत्न पर भी लाभ नहीं (कष्ट-श्रेणी, परंपरा-लेबल) | प्रतिकूल | KEEP (dignity मॉडल) |
| c22-11b | 22.11b | labhesh अस्त (combustion) | (वही फल) | — | **UNMODELED खंड** — अस्ते Sanskrit-प्रामाणिक (vp/siva.sh एकमत), परंतु combustion machinery अमॉडल (avastha-ledger यथावत); row के unmodeled-note में सूची, शर्त से बाहर |
| c22-11c | 22.11c | labhesh भाव∈{6,8,12} AND पाप-युति | (वही फल) | प्रतिकूल | KEEP (placement + पाप-वर्ग 3.11 + yuti मॉडल) |

## Mat-bhed / पाठ-नोट (दोनों ledger-दर्ज, code में silent नहीं)
1. **22.2c सूर्यांशगोऽपि वा**: Sanskrit (vp = siva.sh, 1:1)। Santhanam +
   siva.sh English: "exalted, **though in combustion**"। vedicpupil English:
   "**in the Sun's division**"। दोनों पठन अमॉडल (combustion अमॉडल;
   "सूर्यांश" = कौन-सा अंश — होरा/नवांश/अन्य — अनिर्धारित) → UNMODELED खंड,
   row-note में दोनों पठन पारदर्शी। survey ने केवल Santhanam-पठन देखा
   था — संशोधित रिकॉर्ड यह।
2. **22.4 शुभग्रहसमन्विते**: jv "the 11th occupied by a benefic" (भाव-समन्वित)
   बनाम vp "joined by benefic planets" (लाभेश-समन्वित)। श्लोक OMIT है अतः
   machine-शर्त पर असर नहीं; रिकॉर्ड-मात्र।
3. 22.11 अस्ते = combustion तीनों स्रोत-सम्मत (अस्त प्रामाणिक) — v2 के विपरीत
   यहाँ अनुवाद-विभेद नहीं, केवल machinery-अभाव।

## लोप-खंड (omitN = 5, per-sentence scan)
1. 22.1 भूमिका-पंक्ति "सदा सुखी" (breadth; शब्द ऊपर सुरक्षित)
2. 22.4 36वें वर्ष 2000 निष्क (specific fortune-timing + मात्रा)
3. 22.5 40वें वर्ष 500 निष्क (वही)
4. 22.6 6000 निष्क (वही)
5. 22.8 33वें वर्ष 1000 निष्क (वही)

## UNMODELED-condition खंड (लोप नहीं — पारदर्शी सूची, शर्त-गणना से बाहर)
- 22.2c सूर्यांशग (mat-bhed #1)
- 22.11b अस्तता (combustion machinery अमॉडल)
खंड-गिनती: omitN में नहीं; ch12-pattern के "अमॉडल सूची" notes में (banned-word
scan पर combustion-शब्द served पाठ में नहीं आता — केवल नामित unmodeled-label)।

## Machinery उपलब्धता (सभी reviewed/tree में मौजूद)
- भाव-स्वामी: labhesh/dhanesh/sahjesh/lagnesh (whole-sign भाव; dasha stage-2
  layer में प्रयुक्त)। placement conditions: तrivial।
- Dignity: EXALT/OWN maps (kundli-engine.js) — उच्च/नीच।
- युति: whole-sign (E1 convention)। पाप-वर्ग: BPHS 3.11 (conditional Mercury +
  paksha Moon, सशर्त)।
- कोई नई ephemeris/गणना नहीं; कोई combustion/yuddha/drik निर्भरता नहीं।

## अंतिम Hindi पाठ (प्रस्ताव; "परंपरा-कथन:" उपसर्ग, कोई निर्णय/स्कोर नहीं)
- c22-2a: शर्त: लाभेश 11वें, केन्द्र या त्रिकोण में। कथन: बहुत लाभ की परंपरा-चर्चा।
- c22-2b: शर्त: लाभेश उच्च-राशि में। कथन: बहुत लाभ की परंपरा-चर्चा।
  (unmodeled-note: "सूर्यांशग" खंड — अनुवाद-मतभेद (combustion/सूर्य-अंश); दोनों पठन अभी अमॉडल, जाँचा नहीं गया।)
- c22-3: शर्त: लाभेश 2रे भाव में; धनेश केन्द्र में गुरु-सहित। कथन: बड़े लाभ की परंपरा-चर्चा।
- c22-7: शर्त: गुरु, बुध और चन्द्र तीनों 9वें भाव (लाभ से 11वाँ) में। कथन: धन, धान्य और आभूषण की समृद्धि (ऐतिहासिक अभिप्राय)। *(संशोधन-1: "रत्न-आभरण"→"आभूषण" — 'रत्न' project banned-scan token (remedy-वर्ग, ch12 F8a सूची); यह केवल scan-token collision है, content-उल्लंघन नहीं। Sanskrit रत्नाद्याभरण के प्रति निष्ठावान, Santhanam के "diamonds" से भी दूर।)*
- c22-9: शर्त: धनेश 11वें और लाभेश 2रे भाव में। कथन: विवाह के बाद बढ़ती समृद्धि की परंपरा-चर्चा (ऐतिहासिक अभिप्राय)।
- c22-10: शर्त: सहजेश 11वें और लाभेश 3रे भाव में। कथन: सहोदर-मार्ग से धन और उत्तम आभरण (ऐतिहासिक अभिप्राय)।
- c22-11a/c: शर्त: लाभेश नीच-राशि में, या 6/8/12 भाव में पाप-युति। कथन: बहुत चेष्टा के बावजूद लाभ न मिलने की परंपरा-चर्चा।
  (unmodeled-note: "अस्त" (combustion) खंड Sanskrit-प्रामाणिक पर अभी अमॉडल, जाँचा नहीं गया।)
- omitN notice (count-only): "BPHS अध्याय 22 की इस परंपरा-सूची के 5 खंड सुरक्षा-नीति से हटाए गए हैं।"
- Panel: "भाव-फल: एकादश भाव (BPHS ch22)" — ch12 pilot card के नीचे/c्रम में।

## served/unserved पैटर्न (ch12 pilot 1:1)
- सभी 7 rows सूचीबद्ध ("शर्त बनी/नहीं बनी"); unserved card में शर्त+तथ्य-विवरण,
  परंपरा-कथन छिपा। अनुकूल+प्रतिकूल दोनों साथ (c22-2/3/7/9/10 अनुकूल,
  c22-11 प्रतिकूल) — कोई verdict नहीं।

## निर्णय — परिणाम
- c22-1 OMIT-for-breadth।
- वर्ष+निष्क श्रेणी OMIT।
- अंतिम Hindi पाठ संशोधन-1 सहित।
- served/unserved पैटर्न।

## संशोधन (लागू)
1. **MUST-FIX (लागू)**: c22-7 "रत्न-आभरण" → "आभूषण" — 'रत्न' banned-scan
   token (remedy-वर्ग); संशोधन-रिकॉर्ड पाठ-पंक्ति में। स्पष्टीकरण:
   यह scan-collision है, historical jewelry संदर्भ स्वयं असुरक्षित नहीं।
2. **SHOULD-FIX (लागू — यहाँ पुनःकथित)**: राहु/केतु की युति/दृष्टि-भागीदारी
   **अमॉडल** (परंपरा-भेद) — ch12 convention। 22.11c की पापसमन्विते और हर
   युति-शर्त में केवल 7 ग्रह (सूर्य…शनि) गिने जाते हैं; राहु/केतु की उपस्थिति
   किसी शर्त को न बनाती न तोड़ती, न अनुकूल-पढ़ने देती। यह नोट module में
   ship होगा (UNMODELED सूची में), केवल inherit नहीं।
3. **SHOULD-FIX (test-योजना में लागू)**: नए module के tests में tanubhava
   recheck की hardened scans पहले दिन से — served text+detail+transparency
   scan, source-literal scan — और source-literal scan को **backtick template
   literals** तक विस्तारित (tanubhava में residual gap flag हुआ था)।
4. **स्पष्टीकरण (लागू)**: अज्ञात आवश्यक शर्तें अज्ञात ही रहें — किसी
   unmodeled पद को छोड़कर पंक्ति संतुष्ट न दिखे (22.2c/22.11b खंड-स्तर पर
   हल क्योंकि फल-वाक्य शेष शर्तों पर स्वतंत्र; यदि संयोजन आवश्यक होता तो
   पूरी पंक्ति unserveable होती)।

## अगले कदम
1. पाठ-निर्णय (ऊपर) पूर्ण।
2. नया module (ch12 तनुभाव module pattern पर
   नई फ़ाइल + tests + UI panel), pixel, फिर commit।
3. क्रम यथावत: ch21 (10th) → ch13 (2nd) → शेष; ch23 v9 afterlife judgment
   अपने ledger में; ch19 (8th) ~0 yield, अंत में।
