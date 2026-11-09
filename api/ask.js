// Vaidik AI proxy - keeps the Gemini key server-side.
//
// STRUCTURAL availability rule (not just instructions): this endpoint stays
// unavailable until BOTH exist:
//   1. GEMINI_API_KEY (free tier, server-side env)
//   2. a vetted sources pack at json/vaidik-sources.json with at least one
//      entry. That file is built only from material the site owner supplies
//      and validates - without it there is nothing to answer from, so the
//      endpoint refuses rather than risk inventing religious content.
// The prompt is bounded to the pack's text and the model must cite the pack
// entry it used, or answer with the fixed "content awaited" sentence.
//
// Free-tier note: inputs sent on the free tier may be reviewed by Google.
// Rate limits are best-effort (per serverless instance) and sit UNDER the
// free tier's own limits so a spike cannot push the account into paid usage.
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const MAX_PER_MINUTE_PER_IP = 5;
const MAX_PER_DAY_GLOBAL = 200;
const MAX_PACK_CHARS = 8000;

const hits = new Map(); // ip -> {minute, count}
let day = new Date().toISOString().slice(0, 10);
let dayCount = 0;

let pack = null;
try {
  pack = require('../json/vaidik-sources.json');
} catch (e) {
  pack = null;
}

const AWAITED = 'इस विषय की प्रमाणित सामग्री आचार्य जी से मिलने की प्रतीक्षा है।';

function vettedMaterial() {
  if (!pack || !Array.isArray(pack.sources) || !pack.sources.length) return null;
  const entries = pack.sources
    .filter(s => s && s.title && s.text && s.vetted === true)
    .map(s => '### ' + s.title + '\n' + String(s.text))
    .join('\n\n')
    .slice(0, MAX_PACK_CHARS);
  return entries || null;
}

function buildSystem(material) {
  return [
    'आप ब्रह्मतत्त्व डिजिटल मंदिर की "वैदिक AI" सहायक हैं।',
    'कठोर नियम:',
    '1. केवल नीचे दी गई प्रमाणित सामग्री से उत्तर दें। सामग्री से बाहर कुछ न कहें।',
    '2. कोई भी पूजा विधि, मंत्र, आरती या धार्मिक विधि कभी अपने से न बनाएँ।',
    '3. यदि प्रश्न का उत्तर सामग्री में नहीं है, बिल्कुल यही उत्तर दें: "' + AWAITED + '"',
    '4. हर उत्तर के अंत में स्रोत का शीर्षक लिखें: "स्रोत: <शीर्षक>"।',
    '5. उत्तर संक्षिप्त, सम्मानजनक और हिन्दी में दें। फलादेश, भविष्यवाणी, चिकित्सा या कानूनी सलाह न दें।',
    '',
    'प्रमाणित सामग्री:',
    material,
  ].join('\n');
}

function rateLimited(ip) {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) { day = today; dayCount = 0; }
  if (dayCount >= MAX_PER_DAY_GLOBAL) return true;
  const minute = Math.floor(Date.now() / 60000);
  const h = hits.get(ip) || { minute, count: 0 };
  if (h.minute !== minute) { h.minute = minute; h.count = 0; }
  if (h.count >= MAX_PER_MINUTE_PER_IP) { hits.set(ip, h); return true; }
  h.count += 1; dayCount += 1; hits.set(ip, h);
  return false;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }
  const key = process.env.GEMINI_API_KEY;
  const material = vettedMaterial();
  if (!key || !material) {
    // Key missing OR no vetted material: the service stays unavailable.
    res.status(503).json({ ok: false, error: 'ai_not_configured' });
    return;
  }
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    res.status(429).json({ ok: false, error: 'rate_limited' });
    return;
  }
  const question = String((req.body && req.body.question) || '').slice(0, 500).trim();
  if (!question) {
    res.status(400).json({ ok: false, error: 'empty_question' });
    return;
  }
  try {
    const resp = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/' + MODEL + ':generateContent?key=' + key,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildSystem(material) }] },
          contents: [{ role: 'user', parts: [{ text: question }] }],
          generationConfig: { maxOutputTokens: 400, temperature: 0.2 },
        }),
      });
    if (!resp.ok) {
      res.status(502).json({ ok: false, error: 'gemini_error', status: resp.status });
      return;
    }
    const data = await resp.json();
    const text = (((data.candidates || [])[0] || {}).content || {}).parts || [];
    const answer = text.map(p => p.text || '').join('').trim();
    res.status(200).json({ ok: true, answer: answer || AWAITED });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'gemini_unreachable' });
  }
};
