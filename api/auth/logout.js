// Admin logout - clears the session cookie.
const COOKIE = 'bt_admin';

module.exports = async (req, res) => {
  res.setHeader('Set-Cookie', COOKIE + '=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0');
  res.status(200).json({ ok: true });
};
