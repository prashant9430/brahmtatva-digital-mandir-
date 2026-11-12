/* Re-authored MINIMAL outer-planet API regression (2026-11-11), replacing the lost
   local-only validate-outer-api.js (10 checks, wiped before ever being committed;
   original content unrecoverable). This is NOT that suite: it pins the outer-API
   contract as documented in the UI's own source note - Uranus/Neptune/Pluto are a
   separate modern list, sidereal with the same Lahiri ayanamsha, UTC years
   1900-2100 only, and never enter navagraha computations.
   Semantics are pinned by this suite. */
'use strict';
const fs = require('fs');
const path = require('path');

// astro-core.js is a browser UMD bundle that binds `var BrahmAstro` without
// module.exports; evaluate it and lift the global it defines.
const src = fs.readFileSync(path.join(__dirname, '..', 'astro-core.js'), 'utf8') + '\n;globalThis.__BA = BrahmAstro;';
(0, eval)(src);
const A = globalThis.__BA;

let pass = 0, fail = 0;
function ck(id, a, e) {
  const ok = JSON.stringify(a) === JSON.stringify(e);
  ok ? pass++ : fail++;
  if (!ok) console.log('FAIL ' + id + ' | actual=' + JSON.stringify(a) + ' expected=' + JSON.stringify(e));
}
function ckt(id, cond) { ck(id, !!cond, true); }

const d = new Date(Date.UTC(2000, 0, 1, 6, 30)); // 2000-01-01 12:00 IST
const outer = A.outerPositions(d);

ck('outer list = exactly Uranus/Neptune/Pluto', outer.map(p => p.graha), ['Uranus', 'Neptune', 'Pluto']);
ckt('outer longitudes in [0,360)', outer.every(p => Number.isFinite(p.longitude) && p.longitude >= 0 && p.longitude < 360));
ckt('outer rashi = floor(lon/30)', outer.every(p => p.rashi === Math.floor(p.longitude / 30)));
ckt('outer degreesInRashi consistent', outer.every(p => Math.abs(p.degreesInRashi - (p.longitude - 30 * p.rashi)) < 1e-9));
ckt('outer retrograde/motionUncertain boolean', outer.every(p => typeof p.retrograde === 'boolean' && typeof p.motionUncertain === 'boolean'));

// year bounds: UTC years 1900-2100 only (per UI source note)
ckt('outer 1899 throws', (() => { try { A.outerPositions(new Date(Date.UTC(1899, 11, 31))); return false; } catch (e) { return true; } })());
ckt('outer 2101 throws', (() => { try { A.outerPositions(new Date(Date.UTC(2101, 0, 1))); return false; } catch (e) { return true; } })());
ckt('outer 1900 ok', (() => { try { A.outerPositions(new Date(Date.UTC(1900, 5, 1))); return true; } catch (e) { return false; } })());
ckt('outer 2100 ok', (() => { try { A.outerPositions(new Date(Date.UTC(2100, 5, 1))); return true; } catch (e) { return false; } })());

// separation: navagraha API carries no outer planets
const gp = A.grahaPositions(d);
ck('grahaPositions = navagraha only', gp.map(p => p.graha), ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu']);

console.log(pass + '/' + (pass + fail) + ' passed');
process.exit(fail ? 1 : 0);
