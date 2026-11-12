# Successor handoff — kundli worker (11 Nov 2026 evening draft)

सफलतापूर्वक बना: 11 Nov ~17:25 IST, worker agent-01M74DJWV28CTBFDVZN1FVNDQ8
(expires 12 Nov 09:54 IST)। यह दस्तावेज़ successor के लिए self-contained है।

## 1. रिपो-स्थिति (durable refs)

- Repo: prashant9430/brahmtatva-digital-mandir- (नाम में trailing dash!)
- Branch: preview/kundli-suite
- Pending HEAD: 1c0e34a60f54d6b05669f2cd7b2c5c05502cb8d5 — 6 avastha commits,
  सभी byte-verified (contents API), **hosted-verified नहीं**।
- main: d7da476770348c6bf7fe98dc6f27e1ea25a0654c (अपरिवर्तित)।
- Vercel: "Deployment rate limited — retry in 24 hours" (11 Nov 16:58:55 IST से)।
  Reset ~12 Nov 16:58 IST। उससे पहले कोई push नहीं (har push build attempt
  बनाता है)। अंतिम Ready preview deployment: FHPKuC3mw (commit 8ea0d0f,
  avastha UI के बिना; deployed preview कार्यात्मक रूप से पुरानी स्थिति जैसा)।
- अंतिम user-delivered: brahmtatva-digital-mandir-hqti61ksq.vercel.app
  (f4d44f4 pair milestone, 16:29, partial)।
- Production brahmtatva.vercel.app पर कुछ नहीं बदला गया; कोई authority नहीं।

## 2. Reset के बाद (12 Nov ~16:58 IST के बाद) — पहला कार्य

1. preview/kundli-suite पर एक ordinary web-editor commit (जैसे
   docs/recovery-ledger-2026-11-11.md को repo में डालना) → HEAD build होगा।
2. नया deployment URL प्राप्त करें (Vercel dashboard owner-session config-c, या
   GitHub commit status target_url)।
3. Cookieless 302-verify: /kundli.html + 6 changed paths (kundli-states.js,
   tests/validate-avastha.js, docs/avastha-ledger-draft.md, kundli-suite-ui.js,
   kundli-bhavaphal.js, kundli-suite.css)।
4. Owner-session hosted pixel proof: chart 1990-06-15 10:30 Patna, कुंडली tab,
   Sun card "अवस्था-आधार" details खुली, header occlusion नहीं (main के पास
   local reference screenshots 16:50/16:51 packages में)।
5. तभी avastha increment hosted-verified; user-delivery main का निर्णय।

## 3. खुले source-निर्णय (समीक्षक-बंद audit 11 Nov 17:11; bala समीक्षक का
अंतिम durable handoff 12 Nov 07:36 प्राप्त — नीचे संक्षेप)

- **Bala reviewer closure**: bounded assignment बंद। समीक्षित algorithms,
  conflicts, URLs, artifact refs उनके अंतिम handoff में (main के chat_events
  07:36:44 से पूर्ण पाठ)। Irreplaceable captures main मार्ग से प्राप्त,
  sources/ में सहेजे: reviewer-suryasiddhanta-ch7.txt (siva.sh SS ch7),
  reviewer-vp-bphs-ch26.txt (vedicpupil BPHS ch26)। उनके consolidated
  report + 2 comparator scripts main के पास 17:10:17 attachments में।
  Note: उनकी item-2/3 "rename + PROVISIONAL update" सिफारिशें stale हैं —
  17:12 में पहले से लागू; हमारे corrected versions ही मान्य।
- **Yuddha**: classical युद्ध + BPHS 27.20 bala-transfer अमॉडल रहेंगे।
  Longitude-only detection पर प्रतिबंध। Optional neutral longitude-proximity
  fact (शर्तें: 5 तारा-ग्रह, wrapped abs separation, 1° named screening cutoff,
  बाहर no-war अनुमान नहीं, कोई phal/transfer नहीं) — अभी कार्यान्वित नहीं।
  इंजन तथ्य: underlying 3D library latitude निकाल सकती है (Dn lat+lon), wrapper
  छिपाता है; native export संभव पर अलग समीक्षा; फिर भी victor-योजना अधूरी।
- **Drik**: experimental, partialSum से बाहर। दो unresolved source-conflicts:
  (a) 26.12 Jupiter 4/8 slab — Sanskrit 60−2x (dvigunais) बनाम English 60−x;
  code English पठन पर; fixture cells F1Mars/F3Sun/F3Mars बदलते हैं।
  (b) 27.19 — quarter-then-superadd बनाम replacement weighting (F1Saturn delta
  22.86508)। Mercury-पापता convention तीसरा खुला मुद्दा।
  भविष्य का implementation: explicit chosen-source convention + exact tests
  लेकर नए code gate पर।
- Fixtures (harness/drik-independent.py + 3 charts) केवल translation-model
  regression/research evidence के रूप में सहेजे गए (reviewer scoped GO);
  label "Mercury-unconditional-full, replacement model"।

## 4. Local tree divergence (uncommitted, /downloads/brahmtatva-kundli-suite)

Sandbox wipe संभव — durable copies main के पास attachments में:
- kundli-bala.js: PROVISIONAL notes में 2 doc-only additions (26.12 + 27.19
  conflicts)। Behavior अपरिवर्तित; bala 173/173 green।
- harness/drik-independent.py (नया), sources/ (संयुक्त captures: src-capture-jv-bphs-ch12-ch19-ch22-ch23,
  reviewer-vp-bphs-ch26, reviewer-suryasiddhanta-ch7, ss-12-1-vp-12-fetch + drik-py-report),
  docs/yuddha-drik-research-ledger-draft.md,
  docs/recovery-ledger-2026-11-11.md,
  docs/bhavachalit-bhavaphal-plan-draft.md (label-पाठ सहित),
  docs/bhavaphal-ch12-pilot-draft.md (समीक्षक-सुधारित),
  docs/bhavaphal-ch12-ledger-draft.md (skeleton, gates G1-G4)।
- कोई भी commit केवल reset के बाद और समीक्षा के साथ।

## 5. अगले increments (main क्रम तय करे; interpretation समीक्षा 17:15 IST आई)

- **भाव-चलित दृश्य**: समीक्षक GO-for-prep। Dependence claim verified
  (kundli-bhava.js madhyas/boundaries/bhavaOf + validate-bhava-terms.js
  106 checks; Raman p21 fixture; sandhi half-open convention)। Build-समय
  आवश्यक labels: whole-sign मुख्य chart अपरिवर्तित (13:04 ruling),
  "Sripati-madhya परंपरा" caveat, nodes-participation अमॉडल label,
  shifted-planet notes केवल तथ्यात्मक, sandhi convention named। KP-संदेह
  नहीं (Sripati-madhya KP Placidus से भिन्न)।
- **भाव-फल ch12 pilot**: curation समीक्षक-निश्चित (17:15 + 17:17 rulings):
  12.1 JOINT (coherence-तर्क; मत-भेद दर्ज), 12.3 OMIT-for-breadth (implementer
  अंतिम चयन), 12.9/12.10 OMIT, decanate तालिका OMIT, drishti binary (quantitative
  Drik-bala से निर्भरता नहीं — over-broad freeze समीक्षक ने वापस ली),
  at-least-one-benefic + coexisting-malefic transparency convention।
  Yield ~8-9 rows, omitN=10। खुले gates केवल: G3 अंतिम Hindi पाठ, G4
  served/unserved pattern। Ledger skeleton = docs/bhavaphal-ch12-ledger-draft.md,
  pilot = docs/bhavaphal-ch12-pilot-draft.md।
- सर्वेक्षण verified (समीक्षक ने स्वयं re-fetch कर पुष्टि): ch19/22/23
  truncation नहीं; ch19 ~0 yield (100% आयुष्य-वाक्य, अंतिम/transparent-
  omission card); ch22 उच्च-yield परंतु v2/v11 combustion-शर्तें (अमॉडल →
  partial/unserved handling उसके ledger में); ch23 अधिकांश serveable, v9
  afterlife judgment call। क्रम: ch12 → ch22 → ch21 → ch13 → शेष; ch18/ch20
  अंत में।
- शेष मूल scope: dosha branches, Avakhada paya/yunja remnants,
  language/translations, full PDF (hosted print-dialog uncertified),
  cloud save (approval नहीं), Lajjitadi/Sayanadi (नीचे)। KP पूर्णतः बाहर।
- **Interpretation reviewer closure** (12 Nov 07:38, bundle docs/reviewer-handoff-2026-11-12.md
  + 4 source captures in sources/): accepted conventions की पूरी सूची,
  operative omission-boundary strong form (main 14:48), ch12 final rulings,
  traps-for-next-reviewer, और remaining gaps: Lajjitadi 45.11-18 deferred
  (machinery मौजूद, gap = integration/condition forms), Sayanadi 45.30-37
  excluded (name-syllable anka = personal data), Avakhada paya/yunja remnants,
  36-guna compatibility OUT OF SCOPE जब तक user स्पष्ट न मांगे।
  **SNAPSHOT GAP**: validate-siddhant.js को api/ask.js चाहिए जो shared tree
  में कभी नहीं रहा — उसका 70-green implementer-side only; किसी reviewed
  increment से interaction नहीं। उनके handoff में 12.3 "pending" है — 17:18
  में निपटा: OMIT-for-breadth, omitN=10 (हमारा ledger मान्य)।

## 6. स्थायी नियम (अपरिवर्तित)

मत-भेद संरक्षित; Sanskrit निर्णायक; अनुकूल+प्रतिकूल साथ; कोई totals/ratios/
ranks नहीं; अमॉडल स्पष्ट; नया phal-पाठ बिना समीक्षा deploy नहीं; केवल
preview/kundli-suite पर normal web-editor commits; force-push नहीं;
kundli-auto.html कभी deploy नहीं; omissions नीति (death/grief/longevity/limb/
harm/remedy OMIT, count-only notice, per-sentence scan); commit-सत्यापन
contents API से; Copilot commit-message prefill हमेशा read-back कर बदलें
("Update print statement..." anomaly दो बार आई)। Reviewer संपर्क केवल main
के माध्यम से, actual attachments सहित। User delivery केवल main।

## 7. संपर्क/कर्तव्य

- todo-01M6Z6S3YCZSPAQHMQ3EZEZS68 (master project todo)।
- Aarti worker preview/aarti-suite पर — overlap नहीं।
- इस handoff के बाद worker expire; main post-reset continuation carry करेगा।
