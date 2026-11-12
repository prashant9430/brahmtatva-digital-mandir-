# Reviewer handoff — Brahmtatva kundli rules/source review (durable, 2026-11-12)

Reviewer agent chat: chat-01M7491Q4MEHE86X4FHRK9AHG0. Assignment closed 2026-11-12 ~08:34 IST (expiry). This document + 4 attachments are the continuity bundle for the next reviewer. Nothing here authorizes runtime/deploy/public changes; main routes everything.

## 1. How gates were run (method, proven across ~10 packages)

- Never trust green reports or manifest claims: read the actual module/tests, run them in a local tree copy, hand-verify oracle arithmetic per fixture, check negative controls and non-vacuity (every fixture must provably flip under mutation).
- Every rule needs named edition + verse or an explicit "customary/unverified/conflicting" label; blogs never suffice for absence claims. Two translations sharing a tradition is not independent corroboration — check printed/parallel Sanskrit.
- Distinguish textual support from labeled implementation conventions; conventions must be labeled in code AND UI, verbatim, and test-pinned.
- Omission boundary is semantic: judge the served sentence, not the category name. Verify implementer explanations against the actual prior tree — and re-verify the reviewer's own prior claims the same way (I once asserted a D9 "inverted !zone condition" that no tree ever contained; caught by re-grep, withdrawn cleanly).
- Both sandbox boxes were wiped mid-task once (~15:58 2026-11-11): /tmp, /downloads, local trees all lost. Recovery path = chat_events transcript (agent_message sends, write calls, cat outputs; long full-cat events may be captured truncated). Machine-generated artifacts should ship with their generator script so they regenerate byte-identically.

## 2. Committed state (repo preview/kundli-suite; main branch untouched at d7da476 as of 16:33 2026-11-11)

- E3 isolated: HEAD 083f3c2f (15:13). E4 + dasha corrections D1-D11: HEAD 0d0bebb (15:21). Pair layer (81 pairs, 217 omission items): HEAD f4d44f4, user-delivered 16:29 as PARTIAL milestone at https://brahmtatva-digital-mandir-hqti61ksq.vercel.app/kundli.html (Vercel login required; live site unchanged).
- Re-authored minimal regressions (honest replacements for lost local-only suites): tests/validate-kundli-core.js 255 checks (commit aa28417), tests/validate-outer-api.js 10 checks (351a88a). Lost originals: validate-kundli.js 246217 checks + 3 others, unrecoverable (never committed, wiped).
- Avastha increment (BPHS45.5-10, 6 files incl. tests/validate-avastha.js 71 checks): code gate GO 2026-11-11 16:52; commit per implementer plan (byte-verify + hosted 302/pixel check). Next reviewer should confirm the commit landed before building on it.
- Full committed suite inventory (implementer 16:33, all locally reproduced by me): antardasha 45, avastha 71, bala 173, bhava-terms 106, bhavaphal 77, cheshta 40, interpretation 172, kundli-core 255, lagnayoga 74, outer-api 10, siddhant 70 (see gap note), visheshyoga 814, wrapper 51, yutiphal 75, reviewer-harness-relations 77, reviewer-harness-states 88; UI context: bala-ui 12, bhava-ui 0 failures.
- SNAPSHOT GAP: validate-siddhant.js requires api/ask.js which has never been in the shared tree snapshot; its 70-green is implementer-side only. No interaction with any reviewed increment.

## 3. Accepted conventions (all labeled in code/UI, test-pinned)

- Sign math: lower-inclusive [a,b), snap 1e-11 sign-units; wrap ((x%360)+360)%360; whole-sign houses; mean nodes (Ketu = Rahu+180).
- Panchadha compound scale: adhimitra +2, mitra +1, sama 0, shatru -1, adhishatru -2 (BPHS 3.55-58, kundli-relations.js; temporal = 2,3,4,10,11,12 friend, else enemy; symmetric).
- Dignity: EXALT/OWN maps in kundli-engine.js; labels उच्च राशि/स्वराशि/नीच राशि; अधिशत्रु/मित्रता tiers NOT shown as bare rashi-garima (display says "अन्य राशि (मित्रता का निर्णय नहीं)").
- Ashtakavarga oracles: BAV row totals {Sun48, Moon49, Mars39, Mercury54, Jupiter56, Venus52, Saturn39, Lagna49} (position-invariant, real rule-set oracle); SAV = 7-graha column sums, lagna excluded, total 337.
- Dasha: VIM order/years Ketu7 Venus20 Sun6 Moon10 Mars7 Rahu18 Jupiter16 Saturn19 Mercury17 (120 total; BPHS 46-47); 27-nakshatra tiling Ashwini=Ketu; YEAR=365.25d; yogini 36y cycle x6=216y; activePath depth-4 nested.
- D9 (navamsa): movable starts from itself, fixed from 9th, dual from 5th (Aries0->Aries, Taurus0->Capricorn, Gemini0->Libra).
- Pair layer (BPHS dasha-antardasha pairs): omission machinery = omitN data field + generic count-only UI notice + ledger itemization (docs/antardasha-ledger-draft.md §12-13); never silent drops; full-field omission uses explicit neutral in-text label (Saturn-Mercury pattern); 75 corrected pairs, 217 omit items.
- Avastha (BPHS45.5-10): jagratadi own/exalt->jagrat, neecha->sushupti (textual override over friendly lord), else pañcadha tier >=0 svapna / <0 sushupti (45.5 is scheme-agnostic; pañcadha = labeled convention). Deeptadi: खलगृह = अधिशत्रु (siva reading; Santhanam enemy-reading defective — drops दुःखित and is redundant; vedicpupil 1-translation joint-leaning); nine Sanskrit states incl. दुःखित restored; first-match in sloka order (labeled convention) + vikala always as separate indicator line; vikala companions = 3.11 set {Sun,Mars,Saturn,Rahu,Ketu} + Krishna-paksha Moon (tithi 16-30, sandhi elong 0/180 -> अनिर्णीत, deeptadi then अनिर्णीत never silent खल); Mercury conditional maleficence documented VACUOUS under whole-sign yuti (never a sole trigger); kopa/combustion NEVER computed (no orb in 45.9) — permanent unmodeled note. Nodes: no avasthas assigned (module scope) but DO count as vikala companions per 3.11.
- Drishti: BPHS 26.2-5 whole-sign graha-drishti incl. special aspects (Mars 4/8, Jupiter 5/9, Saturn 3/10), binary participation only; quantitative Drik-bala (26.12/27.19) is a separate unreviewed layer — no strength language in served rows.
- ch12.1 condition: JOINT reading (lagnesh conjunct malefic AND in 6/8/12). Sanskrit has no disjunctive particle; OR reading makes the verse self-contradictory (malefic-conjunct lagnesh in kendra would fire both halves). Santhanam+siva.sh render OR; vedicpupil leans joint. Mat-bhed recorded.

## 4. Omission boundary (operative, strong form — main 2026-11-11 14:48)

Omit: death/bereavement, आयु-वाक्य (any longevity statement incl. "long-lived"), अपंगत्व, remedies/vidhi/mantra (user's standing rule: Instinct never authors ritual content; public-domain availability does NOT authorize), bodily-harm/accident/poison/wound/scar/mark-location forecasts, personal health-STATE predictions AND assurances (disease-freedom claims like सर्वरोगहर fail), birth/infancy-circumstance claims about the native (cord-wound birth, twins, three-mothers — main 2026-11-11: birth claims must not be relabeled into safe-sounding predictions). Disease terms keyed to a chart/dasha condition fail even with gloss. Keep: adverse non-sensitive with परंपरा-लेबल (कष्ट/चिंता/मानसिक पीड़ा emotional-distress, wellbeing/comfort lines incl. adverse "diminishes/no comfort" when the Sanskrit says सुख not रोग); separation (वियोग) ≠ bereavement; moral-conduct items with ऐतिहासिक आचरण frame; descriptive historical ritual-ACTIVITY items (दान/यज्ञ/हवन) per main 14:55. Panel-level source-history discussion detached from the person's condition/timing passes. Never invent positive content to fill omitted material.

## 5. ch12 pilot (BPHS तनुभावफल) — final rulings

Sources verified 1:1 across jyotishvidya (Santhanam) + vedicpupil Sanskrit (15 verse-groups). Rulings:
- KEEP: 12.1 x2 (joint condition; comfort lines), 12.4 x3 (appearance + comfort; binary drishti), 12.5 minus दीर्घायुः (wealth/intellect/royal-favor; historical frame), 12.6 (fame/prosperity/comfort), 12.7 (royal marks, historical frame), 12.11 method note (Moon as lagna) minus the wounds/marks lead-in phrase. 12.3: KEEP-eligible ONLY with Sanskrit-authentic wording (देहसुखं न हि = no bodily COMFORT — Santhanam's "bodily health" is an inflation; no रोग-word in the verse) or OMIT-for-breadth (condition fires very widely); implementer's ledger pick, breadth noted.
- OMIT: 12.2 (रोगकृत्/सर्वरोगहराः — authentic disease wording), 12.5's दीर्घायुः, 12.8 (नालवेष्टित birth + limb), 12.9 (twins), 12.10 (three mothers — also implies birth-mother absence), 12.12-14 (decanate-limb table; only in-chapter use is 12.15 harm-location), 12.15 (व्रण wound/marks).
- Yield: ~8-10 serveable rows; omitN ≈ 8-9 segments. Mixed-aspect convention (the only residual condition wording): "aspected by a benefic" = at-least-one-benefic (12.4/12.6 name no exclusivity; contrast 12.3's explicit शुभदृष्टिविहीने); malefic co-aspects shown as transparency detail, not blocker/verdict.
- Implementer pending at assignment close: ledger completion (mat-bhed entries as corrected), 12.3 pick, module+tests+UI, then code gate. Gates before freeze: (1) 12.1 JOINT (settled above), (2) binary-only drishti rows, (3) 12.3 wording.

## 6. Remaining exact gaps (original full non-KP scope)

- ch12 pilot build (above). Then bhavaphal sequence: ch22 (11th; v2/v11 carry combustion conditions — unmodeled, need partial-condition/unserved handling) -> ch21 (10th) -> ch13 (2nd) -> rest; ch18 (7th)/ch20 (9th) high omission-density last; ch19 (8th) ~0 yield (verified 100% longevity/death text — omission-dominant transparent card or last); ch23 v9 afterlife sentence = judgment call at its own ledger.
- Bhav Chalit view: prep-GO'd 2026-11-11 17:15 (presentation layer on reviewed Sripati geometry in kundli-bhava.js; sandhi half-open "next bhava" named convention; whole-sign main chart unchanged per 13:04 ruling; labels required). Build pending.
- Lajjitadi (45.11-18): deferred — needs drishti applied to avastha-style conditions (5th-house + aspect combinations); whole-sign drishti machinery EXISTS (bhavaphal, reviewed) — gap is integration + condition forms, not machinery. Sayanadi (45.30-37): excluded (needs native's name-syllable anka = personal data + tradition-variant numbering). Kopa: permanently unmodeled (no textual orb).
- Shadbala remainder: graha-yuddha; bhavabala totals (components shown, no totals). Avakhada paya/yunja remnants. Wider yog/dosh coverage. Quantitative Drik-bala review (was in flight under a sibling at close).
- 36-guna marriage compatibility: OUT OF SCOPE unless the user explicitly asks (single-kundli Avakhada only).

## 7. Artifacts

- Attachments with this handoff (4): src-capture-siva-bphs45-v5-9-and-jv-ch45.txt (siva.sh 45.5-9 Sanskrit+translation, jyotishvidya ch45 full — deeptadi/jagratadi + anomaly evidence); src-capture-siva-bphs45-v10-14-and-bphs3-v10-13.txt (45.10 generic-phal verse, 45.11 lajjitadi start, 3.11 malefic list); src-capture-jv-bphs-ch12-ch19-ch22-ch23.txt (the four bhavaphal chapters verbatim); pair-complete-audit.txt (my independent pair-omission analysis behind the omitN fix).
- Already with main (2026-11-11 15:59 message): gen_pair_table.js (regenerates the 194-row pair table byte-identically; argv-patched).
- In repo: all committed modules/tests/docs; implementer source caches (predecessor transfer names jv-12.txt, vp-12.txt, ss-12-1.txt; repo durable copies are the combined captures sources/src-capture-jv-bphs-ch12-ch19-ch22-ch23.txt and sources/ss-12-1-vp-12-fetch.txt).
- Key source URLs: siva.sh /brihat-parashara-hora-shastra/{45/5-9, 45/10-14, 3/10-13, 12/1}; jyotishvidya.com/ch{12,19,22,23,45,57}.htm; vedicpupil.in chapter-12 cache.

## 8. Traps the next reviewer should not re-fall-into

- "255/255 PASS" or any count is never evidence — run it; check exit codes outside pipes (pipeline masks node crashes; I caught a masked siddhant MODULE_NOT_FOUND this way).
- Vacuous assertions hide in self-referential expected-values (the D9 ternary case) — trace the actual/expected pair, don't pattern-match.
- A rule can be vacuous under the chosen convention (Mercury conditional maleficence under whole-sign yuti) — check whether a clause can ever independently fire before crediting it.
- Translation traditions: Santhanam inflates (12.3 "health" for देहसुख) and drops (45.7 दुःखित); siva.sh mostly reliable translation of the same Sanskrit; vedicpupil provides raw Sanskrit per verse. Sanskrit is decisive; record mat-bhed, never silently pick.
- Completeness claims ("tail checks establish endings") are not established until the reviewer re-fetches — ch19/22/23 verified complete only after independent fetch.
