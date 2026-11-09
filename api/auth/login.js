// Admin login - real server-side auth. Fails closed: without server
// configuration there is NO admin access (no client-side fallback exists).
//
// Env required (Vercel project env vars, server-side only, never in frontend):
//   ADMIN_PASSWORD       - the admin's chosen password (server-only secret)
//   ADMIN_SESSION_SECRET - random 32+ byte hex secret signing session tokens
const crypto = require('crypto');

const COOKIE = 'bt_admin';
const TTL_SECONDS = 12 * 60 * 60; // 12h
const MAX_FAILS_PER_MINUTE_PER_IP = 5;

const fails = new Map(); // ip -> {minute, count}

function throttled(ip) {
  const minute = Math.floor(Date.now() / 60000);
  const f = fails.get(ip) || { minute, count: 0 };
  if (f.minute !== minute) { f.minute = minute; f.count = 0; }
  if (f.count >= MAX_FAILS_PER_MINUTE_PER_IP) { fails.set(ip, f); return true; }
  f.count += 1;
  fails.set(ip, f);
  return false;
}

function sign(payloadB64, secret) {
  return crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
}

function passwordMatches(supplied, expected) {
  const a = Buffer.from(String(supplied));
  const b = Buffer.from(String(expected));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }
  // Origin check when the browser supplies one (CSRF hygiene).
  const origin = req.headers.origin;
  if (origin) {
    try {
      if (new URL(origin).host !== req.headers.host) {
        res.status(403).json({ ok: false, error: 'bad_origin' });
        return;
      }
    } catch (e) {
      res.status(403).json({ ok: false, error: 'bad_origin' });
      return;
    }
  }
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) {
    res.status(503).json({ ok: false, error: 'auth_not_configured' });
    return;
  }
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (throttled(ip)) {
    res.status(429).json({ ok: false, error: 'rate_limited' });
    return;
  }
  const supplied = req.body && req.body.password;
  if (!supplied || !passwordMatches(supplied, password)) {
    res.status(401).json({ ok: false, error: 'invalid_password' });
    return;
  }
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + TTL_SECONDS })).toString('base64url');
  const token = payload + '.' + sign(payload, secret);
  res.setHeader('Set-Cookie',
    COOKIE + '=' + token + '; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=' + TTL_SECONDS);
  res.status(200).json({ ok: true });
};
