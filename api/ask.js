// Vaidik AI proxy - keeps the Gemini key server-side.
// Env required:
//   GEMINI_API_KEY - from Google AI Studio (free tier)
//   GEMINI_MODEL   - optional, default below
//
// Free-tier note: inputs sent on the free tier may be reviewed by Google.
// The widget tells visitors not to share personal information.
// Rate limits are best-effort (per serverless instance) and sit UNDER the
// free tier's own limits so a spike cannot push the account into paid usage.
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const MAX_PER_MINUTE_PER_IP = 5;
const MAX_PER_DAY_GLOBAL = 200;

const hits = new Map(); // ip -> {minute: epochMin, count}
let day = new Date().toISOString().slice(0, 10);
let dayCount = 0;

const SYSTEM = [
  'आप ब्रह्मतत्त्व डिजिटल मंदिर की "वैदिक AI" सहायक हैं।',
  'नियम:',
  '1. केवल इस साइट पर मौजूद सामग्री के बारे में उत्तर दें - पंचांग, पूजा विधि, मंत्र संग्रह, आरती, ग्रंथ सूची, कुंडली सेवा, सूचनाएँ।',
  '2. कोई भी पूजा विधि, मंत्र, आरती या धार्मिक विधि कभी अपने से न बनाएँ। जो सामग्री साइट पर नहीं है, उसके लिए कहें: "इसकी प्रमाणित सामग्री आचार्य जी से मिलने की प्रतीक्षा है।"',
  '3. उत्तर संक्षिप्त, सम्मानजनक और हिन्दी में दें। साइट का संबंधित पेज बताएँ (जैसे पूजा विधि पेज)।',
  '4. फलादेश, भविष्यवाणी या चिकित्सा/कानूनी सलाह न दें।',
].join('\n');

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
  if (!key) {
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
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents: [{ role: 'user', parts: [{ text: question }] }],
          generationConfig: { maxOutputTokens: 400, temperature: 0.3 },
        }),
      });
    if (!resp.ok) {
      res.status(502).json({ ok: false, error: 'gemini_error', status: resp.status });
      return;
    }
    const data = await resp.json();
    const text = (((data.candidates || [])[0] || {}).content || {}).parts || [];
    const answer = text.map(p => p.text || '').join('').trim();
    res.status(200).json({ ok: true, answer: answer || 'उत्तर अभी उपलब्ध नहीं है।' });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'gemini_unreachable' });
  }
};
