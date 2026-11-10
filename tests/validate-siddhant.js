// Offline regression harness for the siddhant tier-1 path.
// Run: node tests/validate-siddhant.js   (from the repo root)
// Covers: pack integrity, keyword candidate gate across meaning/source/
// paraphrase phrasings for all 6 topics, negatives, tat-tvam-asi tradition
// framing order, and the selector instruction's meaning/source rule.
// The model-level NONE/select judgment is spot-checked live, not here.
'use strict';
const path = require('path');
const ask = require(path.join(__dirname, '..', 'api', 'ask.js'));
const PACK = require(path.join(__dirname, '..', 'api', '_siddhant-sources.js'));
const { validSource, tier1Candidates, SELECTOR_INSTRUCTION } = ask._test;

let pass = 0, fail = 0;
function check(name, cond) {
  if (cond) { pass++; }
  else { fail++; console.error('FAIL:', name); }
}

// 1. Pack integrity: every source passes the same validator ask.js applies.
const ids = new Set();
for (const s of PACK) check('validSource ' + s.id, validSource(s, ids) && !ids.has(s.id) && ids.add(s.id));

// 2. Candidate gate battery: meaning / source / paraphrase per topic.
const CASES = [
  ['siddhant-dharma', 'अवतार का अर्थ क्या है?'],
  ['siddhant-dharma', 'भगवान कब आते हैं?'],
  ['siddhant-dharma', 'यदा यदा हि धर्मस्य कहाँ आता है?'],
  ['siddhant-samsara', 'पुनर्जन्म का अर्थ क्या है?'],
  ['siddhant-samsara', 'मरने के बाद क्या होता है?'],
  ['siddhant-samsara', 'पुनर्जन्म में क्या होता है?'],
  ['siddhant-atma', 'आत्मा क्या है?'],
  ['siddhant-atma', 'आत्मा मरती है क्या?'],
  ['siddhant-atma', 'आत्मा कैसी होती है?'],
  ['siddhant-karma', 'कर्म का फल क्या है?'],
  ['siddhant-karma', 'कर्मयोग का अर्थ बताओ'],
  ['siddhant-karma', 'कर्म और फल का संबंध क्या है?'],
  ['siddhant-isha-vasya', 'ईशावास्यम् इदं सर्वम् का अर्थ क्या है?'],
  ['siddhant-isha-vasya', 'सब कुछ ईश्वर से व्याप्त है ऐसा कौन सा मंत्र कहता है?'],
  ['siddhant-isha-vasya', 'ईशावास्योपनिषद् का पहला मंत्र क्या है?'],
  ['siddhant-tat-tvam-asi', 'तत्त्वमसि का अर्थ क्या है?'],
  ['siddhant-tat-tvam-asi', 'तत्त्वमसि किस उपनिषद् में है?'],
  ['siddhant-tat-tvam-asi', 'महावाक्य कहाँ आता है?'],
  ['siddhant-tat-tvam-asi', 'श्वेतकेतु को क्या उपदेश मिला?']
];
for (const [id, q] of CASES) {
  const got = tier1Candidates(PACK, q).map(s => s.id);
  check('candidate ' + id + ' <= "' + q + '"', got.includes(id));
}

// 3. Negatives: no siddhant candidate may surface.
for (const q of ['2027 में ग्रहण कब है', 'शादी का मुहूर्त कब है', 'आज का पंचांग बताओ']) {
  const got = tier1Candidates(PACK, q).filter(s => s.id.startsWith('siddhant-'));
  check('no siddhant candidate <= "' + q + '"', got.length === 0);
}

// 4. Ambiguous bare question still reaches the selector (clarify path at runtime).
check('bare "धर्म क्या है?" reaches candidates', tier1Candidates(PACK, 'धर्म क्या है?').some(s => s.id === 'siddhant-dharma'));

// 5. tat-tvam-asi: tradition framing visible BEFORE the identity explanation.
const tat = PACK.find(s => s.id === 'siddhant-tat-tvam-asi');
check('tat framing before identity in basic', tat.basic.indexOf('परंपरा') !== -1 && tat.basic.indexOf('परंपरा') < tat.basic.indexOf('तुम वही हो'));
check('tat title neutral (no एकमेव doctrinal claim)', !/आत्मा ही ब्रह्म/.test(tat.title));

// 6. Selector instruction carries the meaning/source/location rule.
check('instruction covers अर्थ', /अर्थ/.test(SELECTOR_INSTRUCTION));
check('instruction covers source questions', /किस ग्रंथ/.test(SELECTOR_INSTRUCTION));
check('instruction stays extractive', /Return ONLY the exact passage id or NONE/.test(SELECTOR_INSTRUCTION));

// 7. No emdash in any user-visible pack string.
for (const s of PACK) {
  for (const f of ['title', 'text', 'basic', 'deep', 'edition', 'kind']) {
    if (s[f]) check('no emdash ' + s.id + '.' + f, !s[f].includes('—'));
  }
}

console.log(pass + ' PASS, ' + fail + ' FAIL');
process.exit(fail ? 1 : 0);
