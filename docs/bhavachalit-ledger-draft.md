# भाव-चलित दृश्य — कार्यान्वयन ledger (DRAFT)

दिनांक: 12 Nov 2026।
पूर्व-जाँच पूर्ण (dependence claim verified — validate-bhava-terms.js 106 checks,
Raman p21 fixture + boundary literals + Swiss MC oracle)। यह दस्तावेज़ अंतिम नहीं; verbatim
label-पाठ और code-जाँच बाकी।

## दायरा

- केवल प्रस्तुति-परत: सात ग्रहों की chalit-भाव स्थिति reviewed Sripati-madhya geometry से
  (kundli-bhava.js madhyas/boundaries/bhavaOf)। कोई नया ephemeris नहीं (asc/IC/desc/MC
  मौजूदा astro-core से; MC सूत्र reviewed bhava-terms panel के समान RAMC→MC formula —
  जानबूझकर दोबारा-टंकित snippet (inline टिप्पणी भिन्न), reviewed body untouched)।
- कोई नया phal-पाठ नहीं; chalit-आधारित कोई भाव-फल निष्कर्ष नहीं (UI में स्पष्ट वाक्य)।
- ruling यथावत: मुख्य whole-sign चार्ट अपरिवर्तित, कभी substitute नहीं।
- KP-संदेह नहीं: Sripati-madhya ≠ KP Placidus (दर्ज)।

## परिपाटियाँ (सभी UI में नामित)

1. Sandhi half-open: भाव-संधि पर ठीक स्थित ग्रह अगले भाव में (kundli-bhava.js से inherited,
   fixture A3/A4/A5)।
2. राहु-केतु भागीदारी अमॉडल (तालिका में नहीं; label)।
3. स्थानांतरण-टिप्पणी केवल तथ्यात्मक: "चलित भाव: N (whole-sign: M)" — कोई शुभाशुभ निष्कर्ष नहीं।
4. सातों ग्रह न मिलें तो आंशिक तालिका नहीं — honest pending।
5. खराब geometry (validateAnchors) अनुमान नहीं — pending में सतह।

## UI label-पाठ (verbatim)

- Header caveat: "यह भाव-चलित दृश्य Sripati-madhya परंपरा पर आधारित है; ऊपर का मुख्य चार्ट
  whole-sign (राशि-भाव) परंपरा में है और अपरिवर्तित रहता है।"
- तालिका-संकेत: "⇠ तालिका को बाईं-दाईं ओर खिसकाएँ ⇢" (bala-तालिका पैटर्न)
- Footnote: "राहु-केतु की भाव-चलित भागीदारी इस संस्करण में अमॉडल है। भाव-संधि पर ठीक स्थित
  ग्रह अगले भाव में गिना जाता है (अर्ध-खुला सीमा-नियम)। स्थानांतरण-टिप्पणी केवल तथ्यात्मक है;
  इस दृश्य से कोई भाव-फल निष्कर्ष नहीं निकाला गया।"
- Shifted row note: "चलित भाव: N (whole-sign: M)"
- Panel title: "भाव चलित (श्रीपति-मध्य परंपरा)"
- सूची-ledger (details): बना-सूची में "भाव-चलित दृश्य (श्रीपति-मध्य परंपरा; whole-sign मुख्य
  चार्ट अपरिवर्तित; राहु-केतु अमॉडल; स्थानांतरण केवल तथ्यात्मक)"; अधूरा-सूची से "Bhav Chalit" हटा।

## बदली फ़ाइलें

- kundli-suite-ui.js: नया chalitPanel(); renderCharts में पुराना pending('भाव चलित', KP-caveat)
  प्रतिस्थापित; details-ledger दो पंक्तियाँ। bhavaTermsPanel body unchanged (प्रमाण: git diff
  में उस body के भीतर कोई +/- नहीं; test D5e केवल ordering-guard है, byte-stability प्रमाण नहीं)।
- tests/validate-bhavachalit.js (नया): 29 checks।
- docs/bhavachalit-ledger-draft.md (नया): यह दस्तावेज़।

## परीक्षण-सार (node tests/validate-bhavachalit.js = 29/29)

- A1-A8: p21 anchors → hand-computed boundary literals + membership (wrap, exact-sandhi
  half-open दोनों ओर, 1e-4-arcmin नीचे)।
- B1/B2: shift fixture (0°: ws 4/chalit 3) + mutation (25°: दोनों 4) — non-vacuous।
- C1: 1990-06-15 10:30 Patna (pixel-proof chart) पर सातों ग्रह exactly-one-bhava।
- D0-D5: ACTUAL chalitPanel body source से slice कर — label verbatim, 7 rows, nodes-रहित,
  shifted-note verbatim (synthetic anchor-consistent आकाश: mc=l.longitude, lagna 120°;
  hand-computed "चलित भाव: 8 (whole-sign: 9)"), mutation से note लोप, 6-ग्रह pending,
  renderCharts integration, details-ledger दोनों संशोधन, bhavaTermsPanel अपरिवर्तित।
- पड़ोसी suites अपरिवर्तित green: bhava-terms 106, bala-ui 12, bhava-ui-context 0 fail,
  bala 173 (doc-note variant सहित)।

## Pixel-प्रमाण (local harness kundli-auto.html — commit/deploy नहीं)

- Real browser (google-chrome headless) DOM: panel मौजूद, 7 rows, सभी labels, इस chart पर
  कोई shift नहीं (अपेक्षित — boundaries चौड़ी)।
- 390px screenshot: header caveat, scroll-hint, 7-पंक्ति तालिका, footnote — occlusion नहीं,
  bala-पैटर्न के समान क्षैतिज scroll।

## खुले कार्य

- verbatim label-पाठ अंतिम करना (ऊपर सूची)।
- module/UI diff जाँच।
  (एक push में अधिकतम reviewed-ready परिवर्तन, कई build-ट्रिगर से बचना)।
