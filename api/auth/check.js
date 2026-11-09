// Session check - GET returns {ok:true} when the admin cookie is valid.
const crypto = require('crypto');

const COOKIE = 'bt_admin';

function validSession(req, secret) {
  const header = req.headers.cookie || '';
  const pair = header.split(';').map(s => s.trim()).find(s => s.startsWith(COOKIE + '='));
  if (!pair) return false;
  const token = pair.slice(COOKIE.length + 1);
  const dot = token.lastIndexOf('.');
  if (dot < 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof data.exp === 'number' && data.exp > Math.floor(Date.now() / 1000);
  } catch (e) {
    return false;
  }
}

module.exports = async (req, res) => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    res.status(503).json({ ok: false, error: 'auth_not_configured' });
    return;
  }
  res.status(200).json({ ok: validSession(req, secret) });
};

module.exports.validSession = validSession;
