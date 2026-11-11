# Bala increment — consolidated review package (v0.9)

Date: 2026-11-11 ~12:45 IST. Author: bala task agent (chat-01M74DJWTEDKZT8XW4VHF0GKJC).
Status: NOTHING COMMITTED. Gate held (main 12:04). This revision applies the reviewer
re-review gates of 12:38:59 (chronology) and 12:39:22 (evidence labels + visual) in
full, on top of v0.8 (12:34 verdict). Awaiting re-review.

## 1. Files in this package

- kundli-bala.js — module. NEW in v0.9: horaBala unwrapped elapsed-hour count
  (25th hora continues the 7-lord cycle; no %24), throws when birth < sunriseMs;
  localDateString / previousLocalDateString helpers (Intl en-CA + UTC calendar math),
  exported. Carried from v0.8: drik direction (26.6 aspected−aspecting), drik EXCLUDED
  from partialSum (experimental), MT D1 degree-zones (3.51-54), jyotish-day input
  convention + misuse guards.
- kundli-suite-ui.js — balaPanel. NEW in v0.9: pre-sunrise rollover selects the
  previous LOCAL CALENDAR DATE via B.previousLocalDateString (never birth−86400000
  across DST); scoped evidence-scope paragraph per reviewer wording (formula tests
  cover all shown components; selected Raman-example checks limited to Nathonnatha,
  Paksha except Mercury, Tribhaga, Vara, Hora; Abda/Masa = reproduction of Raman's
  chosen convention; dig = 5 Raman rows matching the source arc formula with 2 named
  excluded erroneous rows; remaining published-example checks incomplete); mobile
  swipe hint "⇠ तालिका को बाईं-दाईं ओर खिसकाएँ ⇢"; nested horizontal scroller
  REMOVED from expanded details (no scroll trap; detail text wraps).
- kundli-suite.css — fixed the broken dangling rule (border-collapse had fallen
  outside the selector); .suite-bala-detail cells wrap; single scroll region only.
- tests/validate-bala.js — 173 checks, all green. NEW in v0.9:
  - 18d: Raman printed dig rows (Su/Mo/Ma/Ve/Sa) vs the book's own arc formula on p32
    powerless points, derived bound 0.008 (minute-rounding 0.00278 + 2dp print 0.005);
    Mercury (21.09 vs 21.03) and Jupiter (11.50 vs 11.48) NAMED EXCLUDED as
    print-inconsistent, with a confirming check that they are >0.008 off.
    Convention note: Raman uses meridian powerless points, module equal-house.
  - 18e: DST engine fixture, Europe/London 2024-03-31 BST start — civil vs previous
    sunrise dates distinct, Saturday vara rollover, hora from the ACTUAL Saturday
    sunrise instant, guard-matters difference, tribhaga engine night thirds; now
    routed through B.previousLocalDateString.
  - 18f: exact UI-context fixtures — NY spring-forward 2024-03-11 00:30 EDT →
    previous local date 2024-03-10 (86400000-subtract would wrongly give 03-09,
    asserted); NY fall-back 2024-11-04 00:30 EST → 2024-11-03; weekday pairing
    (both Sundays, vara lord Sun).
  - 18g: hora unwrapped — 25th hora on a 25h solar day (n=24 → Mars; the buggy %24
    wrap would give Moon, asserted); next-sunrise boundary restarts on the new day
    lord; birth-before-sunrise throws.
  - Stale header comment "Dig 0.06" replaced with the derived-bound record.
- harness/test-bala.py — 79 checks, all green. NEW in v0.9: per-planet kala
  reconstruction bound doubles the coefficient where the source entry is used twice —
  Sun 0.072 (ayana), Moon 0.072 (paksha), Mercury 0.062 (printed paksha substituted),
  others 0.067; derivation comment matches. Dig oracle cells remain labelled
  PyJHora-computed-oracle ONLY (no published-example claim).
- harness/dump-bala.js, harness/bala-refs.json — unchanged since v0.8.
- docs/bala-ledger-draft.md — v0.9 section appended (verbatim gate list + fixes).
- docs/bala-review-notes.md — this file.
- Pixel proof (local INTEGRATED bundle, pre-commit, captured 12:42-12:43 IST):
  - integrated-desktop-expanded.png — desktop, Sun घटक-विभाजन expanded: full
    component rows incl. wrapping saptavargaja detail, scoped evidence paragraph
    visible, all 8 summary columns incl. आंशिक योग 525.88 (F1).
  - integrated-mobile-hint.png — 390px: swipe hint rendered above the table, table
    clipped to ~4.5 columns inside the single scroll region.
  - integrated-mobile-scrolled.png — 390px scrolled right: चेष्टा/नैसर्गिक/दृक्*/
    आंशिक योग (525.88) reachable; expanded-detail text wraps; verified zero nested
    scroll regions (no trap).

## 2. Gate application record (12:38:59 / 12:39:22)

- DST UI bug (dailyPanchanga(birth−86400000)) → previous LOCAL calendar date helper,
  used in the UI pre-sunrise branch and the engine fixture; exact spring-forward AND
  fall-back UI-context fixtures added (the reviewer's own NY example reproduced:
  00:30 −04 → previous date 2024-03-10, not 03-09).
- horaBala %24 wrap → unwrapped count; 25th-hora fixture proves the guard matters
  (Mars vs Moon); misuse throws.
- Evidence labels → reviewer scoped wording applied verbatim in substance; fixtures
  named separately; no uniform independent-validation implication; no Raman-dig-golden
  claim (arc-formula test + named excluded rows only).
- Reconstruction bounds → Sun/Moon 0.072, Mercury 0.062, others 0.067, doubling the
  coefficient for twice-used source entries, derivation stated at the assertion.
- Stale "Dig 0.06" header comment removed; no drik-in-partialSum comment remains.
- Mobile → swipe hint + single scroll region; integrated pixel proof attached
  (desktop expanded + 390px scrolled to partial-sum), captured locally pre-commit as
  directed ("no need wait commit to render local integrated page").

## 3. Test results (all green at 12:43 IST)

node validate-bala 173/173; python harness 79/79; interpretation 138/138;
siddhant 70/0; antardasha 34/34; dasha-phal all pass; gallery-relations pass;
relations 717; states 455; kundli engine/oracle suites pass.

## 4. Remaining after clearance

- Protected web-editor commits on preview/kundli-suite + hosted verify (FRESH hosted
  pixels after commit; hosted print/PDF dialog remains not certifiable in the cloud
  browser — standing caveat).
- Later (not now): a separately labelled Raman-convention drik/paksha variant, only if
  explicitly requested through review.
