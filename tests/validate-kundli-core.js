/* Re-authored MINIMAL core regression (2026-11-11), replacing the lost local-only
   validate-kundli.js (246217 checks, wiped before ever being committed; original
   content unrecoverable). This is NOT that suite and does not claim its coverage:
   it is a small source-grounded core: vimshottari/yogini tiling invariants,
   classical rashi-lord and rekha-total oracles, range/shape guards.
   Oracles: BPHS dasha order/years (ch 46-47), rashi lords (ch 3-4),
   ashtakavarga rekha totals Sun48/Moon49/Mars39/Mercury54/Jupiter56/Venus52/
   Saturn39/Lagna49, SAV total 337 over the 7 grahas (BPHS ch 66-72 tradition).
   Semantics are pinned by this suite. */
'use strict';
const E = require('../kundli-engine.js');
const AV = require('../kundli-ashtak.js');

let pass = 0, fail = 0;
function ck(id, a, e) {
  const ok = JSON.stringify(a) === JSON.stringify(e);
  ok ? pass++ : fail++;
  if (!ok) console.log('FAIL ' + id + ' | actual=' + JSON.stringify(a) + ' expected=' + JSON.stringify(e));
}
function ckt(id, cond) { ck(id, !!cond, true); }

// --- mod ---
ck('mod -1', E.mod(-1, 360), 359);
ck('mod 360.5', E.mod(360.5, 360), 0.5);
ck('mod 719', E.mod(719, 360), 359);
ck('mod 0', E.mod(0, 360), 0);

// --- VIM / YOG shape (BPHS ch46-47 order and years) ---
ck('VIM order+years', E.VIM, [["Ketu",7],["Venus",20],["Sun",6],["Moon",10],["Mars",7],["Rahu",18],["Jupiter",16],["Saturn",19],["Mercury",17]]);
ck('VIM total 120', E.VIM.reduce((a, b) => a + b[1], 0), 120);
ck('YOG total 36', E.YOG.reduce((a, b) => a + b[1], 0), 36);
ck('YEAR ms', E.YEAR, 365.25 * 86400 * 1000);

// --- classical rashi lords (Aries..Pisces) ---
ck('LORDS classical', E.LORDS, ["Mars","Venus","Mercury","Moon","Sun","Mercury","Venus","Mars","Jupiter","Saturn","Saturn","Jupiter"]);

// --- vimshottari tiling for all 27 nakshatras ---
const NAKLORD = ["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"]; // Ashwini=Ketu cycle
const birth = new Date(Date.UTC(2000, 0, 1, 6, 30));
for (let n = 0; n < 27; n++) {
  const moon = (n + 0.5) * (360 / 27); // nakshatra midpoint
  const d = E.dasha(moon, birth);
  ckt('nak' + n + ' first MD lord', d[0].lord === NAKLORD[n % 9]);
  ckt('nak' + n + ' 2 cycles = 18 MD', d.length === 18);
  let contig = true;
  for (let i = 1; i < d.length; i++) if (Math.abs(d[i].start - d[i - 1].end) > 1) contig = false;
  ckt('nak' + n + ' MD contiguous', contig);
  ckt('nak' + n + ' span 240y', Math.abs((d[17].end - d[0].start) / E.YEAR - 240) < 1e-6);
  ckt('nak' + n + ' birth inside first MD', d[0].start <= +birth && +birth < d[0].end);
  const ch = E.children(d[0]);
  ckt('nak' + n + ' AD count 9', ch.length === 9);
  ckt('nak' + n + ' AD starts with MD lord', ch[0].lord === d[0].lord);
  let ctile = ch.length === 9 && Math.abs(ch[0].start - d[0].start) <= 1 && Math.abs(ch[8].end - d[0].end) <= 1;
  for (let i = 1; i < ch.length; i++) if (Math.abs(ch[i].start - ch[i - 1].end) > 1) ctile = false;
  ckt('nak' + n + ' AD tile MD', ctile);
}
// activePath: leaf interval contains the probe
{
  const d = E.dasha(213.5, birth);
  const probe = new Date(Date.UTC(2026, 10, 11));
  const ap = E.activePath(d, probe);
  ckt('activePath depth 4', ap.length === 4);
  const leaf = ap[ap.length - 1];
  ckt('activePath leaf holds probe', leaf.start <= +probe && +probe < leaf.end);
  ckt('activePath chain nested', ap.every((p, i) => i === 0 || (p.start >= ap[i - 1].start && p.end <= ap[i - 1].end)));
}
// yogini tiling
{
  const d = E.dasha(213.5, birth, 'yogini');
  ckt('yogini MD count 8x6cycles', d.length === 48);
  ckt('yogini span 216y', Math.abs((d[47].end - d[0].start) / E.YEAR - 216) < 1e-6);
  let contig = true;
  for (let i = 1; i < d.length; i++) if (Math.abs(d[i].start - d[i - 1].end) > 1) contig = false;
  ckt('yogini contiguous', contig);
}
// misuse throws
ckt('dasha throws non-finite moon', (() => { try { E.dasha(NaN, birth); return false; } catch (e) { return true; } })());
ckt('dasha throws bad system', (() => { try { E.dasha(100, birth, 'ashtottari'); return false; } catch (e) { return true; } })());
ckt('ashtakvarga throws bad lagna', (() => { try { AV.ashtakvarga([], 360); return false; } catch (e) { return true; } })());

// --- whole-sign house ---
ck('house same sign', E.house(350, 350), 1);
ck('house next sign', E.house(10, 350), 2);
ck('house opposite', E.house(200, 20), 7);
ck('house 12th', E.house(320, 350), 12);

// --- varga D-9 classical convention spot cases (BPHS 6: movable/fixed/dual) ---
const v9 = l => E.varga(l, 9).rashi;
ck('D9 Aries 0deg -> Aries(0)', v9(0), 0);
ck('D9 Taurus 0deg -> Capricorn(9)', v9(30), 9);
ck('D9 Gemini 0deg -> Libra(6)', v9(60), 6);

// --- dignity spot cases ---
ck('Sun exalted Aries', E.dignity({ graha: 'Sun', rashi: 0 }), 'उच्च राशि');
ck('Sun debilitated Libra', E.dignity({ graha: 'Sun', rashi: 6 }), 'नीच राशि');
ck('Sun own Leo', E.dignity({ graha: 'Sun', rashi: 4 }), 'स्वराशि');

// --- ashtakavarga classical rekha totals + SAV invariant ---
{
  const planets = [{graha:'Sun',rashi:8},{graha:'Moon',rashi:6},{graha:'Mars',rashi:0},{graha:'Mercury',rashi:9},{graha:'Jupiter',rashi:1},{graha:'Venus',rashi:9},{graha:'Saturn',rashi:9}];
  const av = AV.ashtakvarga(planets, 350);
  const REKHA = { Sun: 48, Moon: 49, Mars: 39, Mercury: 54, Jupiter: 56, Venus: 52, Saturn: 39, Ascendant: 49 };
  for (const k of Object.keys(REKHA)) ck('rekha ' + k, av.bav[k].reduce((a, b) => a + b, 0), REKHA[k]);
  let range = true;
  for (const k of Object.keys(av.bav)) for (const b of av.bav[k]) if (!(b >= 0 && b <= 8)) range = false;
  ckt('bav bindus 0-8', range);
  let savOk = true;
  for (let i = 0; i < 12; i++) {
    const s = ['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].reduce((a, p) => a + av.bav[p][i], 0);
    if (av.sav[i] !== s) savOk = false;
  }
  ckt('sav = 7-graha column sums (lagna excluded)', savOk);
  ck('sav total 337', av.sav.reduce((a, b) => a + b, 0), 337);
}

console.log(pass + '/' + (pass + fail) + ' passed');
process.exit(fail ? 1 : 0);
