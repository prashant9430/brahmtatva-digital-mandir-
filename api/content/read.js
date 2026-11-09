// Read site content - public read of a whitelisted JSON data file, proxied
// from the GitHub repo so visitor pages reflect admin saves immediately,
// without waiting for a redeploy. Fails closed: 503 when not configured,
// 404 for unknown files. The GitHub token never reaches the browser and
// responses are no-store. Read-only: this endpoint writes nothing.
//
// Env required (server-side only): GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH
//
// GET /api/content/read?file=announcements|mantra|aarti|granth|about
const FILES = {
  announcements: 'json/announcements.json',
  mantra: 'json/mantra.json',
  aarti: 'json/aarti.json',
  granth: 'json/granth.json',
  about: 'about.json',
};

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  if (!token || !repo) {
    res.status(503).json({ ok: false, error: 'read_not_configured' });
    return;
  }
  const name = (req.query && req.query.file) || '';
  const path = FILES[name];
  if (!path) {
    res.status(404).json({ ok: false, error: 'unknown_file' });
    return;
  }
  try {
    const gh = await fetch(
      'https://api.github.com/repos/' + repo + '/contents/' + path +
        '?ref=' + encodeURIComponent(branch),
      {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'brahmtatva-content-read',
        },
      }
    );
    if (gh.status === 404) {
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).json({ ok: true, file: name, data: null });
      return;
    }
    if (!gh.ok) {
      res.status(502).json({ ok: false, error: 'github_read_failed', status: gh.status });
      return;
    }
    const j = await gh.json();
    let data = null;
    try {
      data = JSON.parse(Buffer.from(j.content || '', 'base64').toString('utf8'));
    } catch (e) { data = null; }
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ ok: true, file: name, data });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'github_unreachable' });
  }
};
