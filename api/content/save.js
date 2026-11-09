// Save site content - session-guarded write that commits a JSON data file
// to the GitHub repo (which triggers a fresh Vercel deploy of main or the
// branch configured in the project). No GitHub token ever reaches the browser.
//
// Env required (server-side only):
//   ADMIN_SESSION_SECRET - must match the login function
//   GITHUB_TOKEN         - fine-grained PAT, Contents: Read&Write, this repo only
//   GITHUB_REPO          - e.g. prashant9430/brahmtatva-digital-mandir-
//   GITHUB_BRANCH        - e.g. main
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

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
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
  if (!check.validSession(req, secret)) {
    res.status(401).json({ ok: false, error: 'not_authenticated' });
    return;
  }
  const body = req.body || {};
  const path = FILES[body.file];
  if (!path || body.data === undefined) {
    res.status(400).json({ ok: false, error: 'unknown_file' });
    return;
  }
  const content = Buffer.from(JSON.stringify(body.data, null, 2) + '\n', 'utf8').toString('base64');
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
