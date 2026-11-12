# Brahmtatva कुंडली — पुनःप्राप्ति अभिलेख (recovery ledger)

स्थिति: 11 Nov 2026, ~17:05 IST. लेखक: kundli worker agent (expires 12 Nov 09:54 IST).
यह दस्तावेज़ sandbox-अस्थायी स्क्रिप्टों से स्वतंत्र, durable पुनःआरम्भ-आधार है।

## शाखा-स्थिति (durable references)

- Branch: preview/kundli-suite
- Pending HEAD (committed, byte-verified, NOT hosted-verified):
  1c0e34a60f54d6b05669f2cd7b2c5c05502cb8d5
- main अपरिवर्तित: d7da476770348c6bf7fe98dc6f27e1ea25a0654c (17:00 IST पर सत्यापित)
- अंतिम user-delivered deployment: brahmtatva-digital-mandir-hqti61ksq.vercel.app
  (commit f4d44f4, pair milestone, WhatsApp delivery 16:29, partial के रूप में)
- वर्तमान live preview deployment: FHPKuC3mw (commit 8ea0d0f) — avastha
  module+tests शामिल पर UI अद्यतन नहीं; module inert, इसलिए deployed preview
  कार्यात्मक रूप से user-delivered स्थिति के समान है। कोई टूटा/अधूरा UI नहीं दिख रहा।

## अवरोध: Vercel build rate limit

- HEAD 1c0e34a60 पर Vercel commit status (16:58:55 IST):
  "Deployment rate limited — retry in 24 hours."
- Commits 76e397b64 + 8ea0d0ff4 built (Ready); commits a41eafc13, 385b8e29d,
  4af2ae335, 1c0e34a60 के लिए कोई deployment नहीं बना।
- Reset: ~16:58 IST 12 Nov 2026 (status creation से 24 घंटे)।
- main का निर्देश (17:02): reset तक कोई deployment attempt नहीं; कोई खर्च/
  hosting-परिवर्तन/limit-परिवर्तन/production push नहीं।
- Reset के बाद पुनःआरम्भ: preview/kundli-suite पर कोई भी नया ordinary
  web-editor commit HEAD build करवा देगा (यह ledger commit ही retrigger बन सकता
  है), या dashboard से नया deployment।

## अंतिम increment: Avastha (BPHS 45.5-10) — committed, hosted-verification बाकी

समीक्षक gates: source GO (3 conditions) 16:38, code GO 16:52 (दोनों main के
पास पूर्ण पाठ)। 6 commits, सभी contents-API से byte-verified:

| commit | message | path |
|---|---|---|
| 76e397b64 | Add BPHS 45.5-10 jagratadi/deeptadi avastha layer | kundli-states.js |
| 8ea0d0ff4 | Add avastha validation harness (71 checks) | tests/validate-avastha.js (नई) |
| a41eafc13 | Add avastha source ledger draft | docs/avastha-ledger-draft.md (नई) |
| 385b8e29d | Show avastha rows in planet table | kundli-suite-ui.js |
| 4af2ae335 | Note avastha as unmodeled in bhavaphal layer | kundli-bhavaphal.js |
| 1c0e34a60 | Style avastha basis details in planet cards | kundli-suite.css |

- सभी commit messages plain; Copilot prefill हर बार read-back के बाद बदला गया
  (दो बार गलत prefill पकड़ा गया, उसमें "Update print statement..." भी)।
- Local regression green: 16 suites (antardasha 45, avastha 71, bala 173,
  bhava-terms 106, bhavaphal 77, cheshta 40, interpretation 172, kundli-core
  255, lagnayoga 74, outer-api 10, siddhant 70 [worker full-tree only],
  visheshyoga 814, wrapper 51, yutiphal 75, reviewer-harness-relations 77,
  reviewer-harness-states 88) + UI context checks।
- Non-blocking reviewer flags: node-participation wording (ledger §10 में
  clarification appended, calculations अपरिवर्तित); siddhant70 snapshot
  limitation (reports में preserved)।

## Reset के बाद hosted-verification चेकलिस्ट

1. HEAD build/deploy होने दें; नया deployment URL प्राप्त करें।
2. Cookieless 302-verify: /kundli.html + 6 changed paths (ऊपर तालिका)।
3. Owner-session hosted pixel proof: chart 1990-06-15 10:30 Patna,
   कुंडली tab, Sun card में "अवस्था-आधार" details खुली, header occlusion नहीं।
   Local reference screenshots main के पास (16:50/16:51 packages)।
4. तभी यह increment hosted-verified मानें; user-delivery main का निर्णय।

## पूर्ण-तथा-सत्यापित increments (संक्षिप्त)

E1-E4, bala unit, E3 (083f3c2), E4+dasha D1-D11 (0d0bebb), pair milestone
(f4d44f4, user-delivered 16:29), test milestone (aa28417 + 351a88a
re-authored suites), avastha (ऊपर)। विस्तृत इतिहास: docs/remaining-scope-ledger.md
(11:55 तक stale — bala/bhava/pair/avastha उसके बाद के हैं)।

## शेष scope (मूल non-KP अनुबंध से, phaladesh-उपयोगिता प्राथमिकता)

- Bala: full totals नहीं (नियम), Yuddha, Drik (experimental excluded),
  Bhava-lord full Pinda, Bhava aspects — unresolved घटक।
- BhavChalit chakra।
- Drishti/yuti phal परत; शेष नामित योग; भाव-फल (करकत्व) — phaladesh का मूल,
  source-ledger + समीक्षा पहले।
- Paya/Yunja; dosha branches; remedies (लोप-नीति लागू); language/translations;
  full PDF (hosted print-dialog uncertified standing caveat); cloud save
  (approval नहीं)।
- KP पूर्णतः बाहर।

## स्थायी समीक्षक-शर्तें (अपरिवर्तित)

मत-भेद संरक्षित; OCR caveat यथावत; अनुकूल+प्रतिकूल साथ; कोई
totals/ratios/ranks नहीं; अमॉडल स्पष्ट; नया phal-पाठ बिना समीक्षा deploy
नहीं; केवल preview/kundli-suite पर normal web-editor commits; force-push
नहीं; commit-सत्यापन contents API से (raw.githubusercontent stale रह सकता है);
kundli-auto.html कभी commit/deploy नहीं (केवल local harness)।

## Omissions नीति (सार)

remedy, death/grief, longevity, limb/disability, serious bodily-harm,
killing/torture-disposition, personal health-state assurance = लोप;
UI notice generic count-only, TRUE per-pair counts (omitN), कभी silent drop
नहीं; emotional-distress शब्द रहते हैं; per-sentence scan अनिवार्य;
pair layer: accident/wound/poison strip, ritual-activity descriptive रखें,
moral conduct historical frame।
