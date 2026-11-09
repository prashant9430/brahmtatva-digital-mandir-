// Preview is restricted to explicitly configured, controlled test subscribers.
// No public list endpoint, subscription storage, or automatic broadcasts.
const auth = require('../auth/check.js');
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ok:false,error:'method_not_allowed'});
  let sameOrigin = false;
  try {sameOrigin = new URL(req.headers.origin).origin === 'https://' + req.headers.host;} catch (_) {}
  if (!sameOrigin) return res.status(403).json({ok:false,error:'bad_origin'});
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !auth.validSession(req, secret)) return res.status(401).json({ok:false,error:'not_authenticated'});
  const key = process.env.ONESIGNAL_REST_API_KEY;
  const allowed = String(process.env.PUSH_TEST_SUBSCRIPTION_IDS || '').split(',').map(s=>s.trim()).filter(Boolean);
  if (!key || !allowed.length) return res.status(503).json({ok:false,error:'controlled_test_not_configured'});
  const b = req.body || {};
  const title = String(b.title || '').trim(), message = String(b.message || '').trim(), id = String(b.subscriptionId || '').trim();
  if (!title || title.length > 80 || !message || message.length > 300 || !allowed.includes(id) || b.confirm !== true) return res.status(400).json({ok:false,error:'invalid_message_or_audience'});
  // Every attempt has a unique ID supplied by the review form. Reuse is safe
  // after a network failure because OneSignal deduplicates the same key.
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(b.requestId || '')) return res.status(400).json({ok:false,error:'invalid_request_id'});
  try {
    const r = await fetch('https://api.onesignal.com/notifications', {
      method:'POST', headers:{Authorization:'Key ' + key,'Content-Type':'application/json'},
      body:JSON.stringify({app_id:'5ff6ffc2-a873-4d7b-9f20-7c910bb31bc9',include_subscription_ids:[id],target_channel:'push',headings:{en:title},contents:{en:message},idempotency_key:b.requestId})
    });
    const j = await r.json();
    if (!r.ok || !j.id) return res.status(502).json({ok:false,error:'provider_rejected'});
    // Queued does not mean delivered. Delivery is verified separately.
    return res.status(200).json({ok:true,status:'queued',messageId:j.id});
  } catch (_) {return res.status(502).json({ok:false,error:'provider_unavailable'});}
};
