// Admin login - real server-side auth.
// Env required (Vercel project env vars, server-side only, never in frontend):
//   ADMIN_PASSWORD_HASH  - scrypt hash, format: scrypt$N$r$p$saltHex$hashHex
//   ADMIN_SESSION_SECRET - random 32+ byte hex secret signing session tokens
// Generate the hash offline with: node scripts/make-admin-hash.mjs "<password>"
const crypto = require('crypto');

const COOKIE = 'bt_admin';
const TTL_SECONDS = 12 * 60 * 60; // 12h

function sign(payloadB64, secret) {
  return crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
}

function verifyPassword(password, stored) {
  try {
    const [scheme, N, r, p, saltHex, hashHex] = String(stored).split('$');
    if (scheme !== 'scrypt') return false;
    const salt = Buffer.from(saltHex, 'hex');
    const expected = Buffer.from(hashHex, 'hex');
    const actual = crypto.scryptSync(String(password), salt, expected.length, {
      N: parseInt(N, 10), r: parseInt(r, 10), p: parseInt(p, 10),
    });
    return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
  } catch (e) {
    return false;
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!hash || !secret) {
    // Backend not configured yet - frontend keeps its local preview mode.
    res.status(503).json({ ok: false, error: 'auth_not_configured' });
    return;
  }
  const password = req.body && req.body.password;
  if (!password || !verifyPassword(password, hash)) {
    res.status(401).json({ ok: false, error: 'invalid_password' });
    return;
  }
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + TTL_SECONDS })).toString('base64url');
  const token = payload + '.' + sign(payload, secret);
  res.setHeader('Set-Cookie',
    COOKIE + '=' + token + '; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=' + TTL_SECONDS);
  res.status(200).json({ ok: true });
};
