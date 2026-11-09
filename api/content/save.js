// Save site content - session-guarded write that commits a JSON data file
// to the GitHub repo. Fails closed on every axis:
//   - valid server session required (no client-side bypass exists)
//   - strict same-origin check on the Origin header (CSRF)
//   - only whitelisted data files, never arbitrary repo paths
//   - never writes the production branch from a non-production deployment
//   - no GitHub token ever reaches the browser
//
// Env required (server-side only):
//   ADMIN_SESSION_SECRET - must match the login function
//   GITHUB_TOKEN         - fine-grained PAT, Contents: Read&Write, this repo only
//   GITHUB_REPO          - e.g. prashant9430/brahmtatva-digital-mandir-
//   GITHUB_BRANCH        - target branch (production deploys only: "main")
//
// POST {file: "announcements"|"mantra"|"aarti"|"granth"|"about", data: <json>}
const check = require('../auth/check.js');

const FILES = {
  announcements: 'json/announcements.json',
  mantra: 'json/mantra.json',
  aarti: 'json/aarti.json',
  granth: 'json/granth.json',
  about: 'about.json',
};

const MAX_BODY_CHARS = 200000;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }
  // Strict same-origin requirement for mutations.
  const origin = req.headers.origin;
  let originOk = false;
  try {
    originOk = !!origin && new URL(origin).host === req.headers.host;
  } catch (e) { originOk = false; }
  if (!originOk) {
    res.status(403).json({ ok: false, error: 'bad_origin' });
    return;
  }
  const secret = process.env.ADMIN_SESSION_SECRET;
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  if (!secret || !token || !repo) {
    res.status(503).json({ ok: false, error: 'save_not_configured' });
    return;
  }
  // A preview/dev deployment must never publish to production.
  if (process.env.VERCEL_ENV !== 'production' && branch === 'main') {
    res.status(403).json({ ok: false, error: 'prod_write_blocked' });
    return;
  }
  if (!check.validSession(req, secret)) {
    res.status(401).json({ ok: false, error: 'not_authenticated' });
    return;
  }
  const body = req.body || {};
  const path = FILES[body.file];
  if (!path || body.data === undefined || typeof body.data !== 'object') {
    res.status(400).json({ ok: false, error: 'unknown_file' });
    return;
  }
  const serialized = JSON.stringify(body.data, null, 2) + '\n';
  if (serialized.length > MAX_BODY_CHARS) {
    res.status(413).json({ ok: false, error: 'too_large' });
    return;
  }
  const content = Buffer.from(serialized, 'utf8').toString('base64');
  const api = 'https://api.github.com/repos/' + repo + '/contents/' + path;
  const headers = {
    Authorization: 'Bearer ' + token,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'brahmtatva-admin',
  };
  try {
    const getResp = await fetch(api + '?ref=' + encodeURIComponent(branch), { headers });
    let sha;
    if (getResp.ok) {
      sha = (await getResp.json()).sha;
    } else if (getResp.status !== 404) {
      res.status(502).json({ ok: false, error: 'github_read_failed', status: getResp.status });
      return;
    }
    const putResp = await fetch(api, {
      method: 'PUT',
      headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
      body: JSON.stringify({
        message: 'Admin update: ' + path,
        content,
        branch,
        ...(sha ? { sha } : {}),
      }),
    });
    if (!putResp.ok) {
      res.status(502).json({ ok: false, error: 'github_write_failed', status: putResp.status });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'github_unreachable' });
  }
};
