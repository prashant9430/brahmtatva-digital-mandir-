// Only public configuration. Never exposes subscription IDs or API secrets.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ok:false});
  const origin = process.env.PUSH_SITE_ORIGIN;
  let enabled = false;
  try { enabled = new URL(origin).host === req.headers.host && !!process.env.ONESIGNAL_REST_API_KEY; } catch (_) {}
  res.status(200).json({enabled, appId: enabled ? '5ff6ffc2-a873-4d7b-9f20-7c910bb31bc9' : null});
};
