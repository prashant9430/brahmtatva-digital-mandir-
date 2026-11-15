/* PREVIEW ONLY - design variant switcher for owner review.
   Selects the home-luxe layer via ?theme=a|b|c|d|e (default a).
   Remove this file and its script tags before production release. */
(function () {
  var m = location.search.match(/[?&]theme=([a-e])(?:&|$)/);
  if (!m) { return; }
  var t = m[1];
  var link = document.getElementById('luxe-theme');
  if (!link) { return; }
  link.href = (t === 'a') ? 'css/home-luxe.css' : 'css/home-luxe-' + t + '.css';
})();
