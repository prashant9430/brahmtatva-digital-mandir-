/* BrahmTatva – Digital Mandir | Premium enhancements (presentation only) */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Shubh-prateek loader (page load + click-triggered) ---------- */
    /* Injected at defer time (document parsed, assets still loading); styles live in premium.css.
       The same overlay re-appears instantly on clicks that start real work:
       internal navigation links and the kundli compute button. It never traps
       the page: navigation unloads it, bfcache return removes it, failsafes hide it. */
    if (!/admin/i.test(window.location.pathname)) {
        var plSymbols = [
            '\u0950',                 /* ॐ */
            '\u0936\u094D\u0930\u0940', /* श्री */
            '\u5350\uFE0E',           /* 卐 (text presentation) */
            '\u2638\uFE0E',           /* ☸ (text presentation) */
            '\u0936\u0941\u092D',     /* शुभ */
            '\u0932\u093E\u092D'      /* लाभ */
        ];
        var plOverlay = null;
        var plTimer = null;
        var plSymEl = null;
        var plSymIndex = 0;

        var ensureOverlay = function () {
            if (plOverlay && plOverlay.parentNode) { return plOverlay; }
            var pl = document.createElement('div');
            pl.id = 'bt-preloader';
            pl.setAttribute('role', 'status');
            pl.setAttribute('aria-label', 'पृष्ठ लोड हो रहा है');
            pl.innerHTML =
                '<div class="bt-loader-mandala" aria-hidden="true">' +
                    '<div class="bt-loader-ring"></div>' +
                    '<div class="bt-loader-ring2"></div>' +
                    '<div class="bt-loader-symbol">\u0950</div>' +
                '</div>' +
                '<div class="bt-loader-name">BrahmTatva</div>';
            document.body.appendChild(pl);
            plOverlay = pl;
            plSymEl = pl.querySelector('.bt-loader-symbol');
            plSymIndex = 0;
            if (!reduceMotion) {
                plTimer = setInterval(function () {
                    plSymIndex = (plSymIndex + 1) % plSymbols.length;
                    if (plSymEl) { plSymEl.textContent = plSymbols[plSymIndex]; }
                }, 180);
            }
            return pl;
        };
        var removeOverlay = function () {
            if (plTimer) { clearInterval(plTimer); plTimer = null; }
            if (plOverlay && plOverlay.parentNode) {
                var el = plOverlay;
                el.classList.add('bt-hide');
                setTimeout(function () {
                    if (el.parentNode) { el.parentNode.removeChild(el); }
                }, 700);
            }
            plOverlay = null;
            plSymEl = null;
        };

        /* Page-load instance: visible until the page finishes loading. */
        var plStart = Date.now();
        ensureOverlay();
        var loadHidden = false;
        var hideOnLoad = function () {
            if (loadHidden) { return; }
            loadHidden = true;
            var wait = Math.max(0, 650 - (Date.now() - plStart));
            setTimeout(removeOverlay, wait);
        };
        if (document.readyState === 'complete') { hideOnLoad(); }
        else { window.addEventListener('load', hideOnLoad); }
        setTimeout(hideOnLoad, 6000); /* failsafe: never trap the page */

        /* Click-triggered instance: internal navigations and real async actions. */
        document.addEventListener('click', function (ev) {
            var t = ev.target;
            if (!t || !t.closest) { return; }
            /* 1) Internal navigation links: show instantly, the next page replaces it. */
            var a = t.closest('a[href]');
            if (a) {
                var href = a.getAttribute('href') || '';
                if (a.target === '_blank' || a.hasAttribute('download')) { return; }
                if (!href || href.charAt(0) === '#' || href.indexOf('javascript:') === 0) { return; }
                if (/^(https?:)?\/\//i.test(href)) {
                    try {
                        if (new URL(href, window.location.href).host !== window.location.host) { return; }
                    } catch (e) { return; }
                }
                ensureOverlay();
                setTimeout(removeOverlay, 15000); /* failsafe if navigation is cancelled */
                return;
            }
            /* 2) Kundli compute: hide when the result (or error) renders. */
            if (t.closest('#astroForm .astro-button')) {
                ensureOverlay();
                var watched = [document.getElementById('astroResult'), document.getElementById('astroError')];
                if ('MutationObserver' in window) {
                    var mo = new MutationObserver(function () {
                        var shown = watched.some(function (el) { return el && !el.hidden; });
                        if (shown) { removeOverlay(); mo.disconnect(); }
                    });
                    watched.forEach(function (el) {
                        if (el) { mo.observe(el, { attributes: true, attributeFilter: ['hidden'] }); }
                    });
                }
                setTimeout(removeOverlay, 12000); /* failsafe */
            }
        }, true);

        /* Back/forward cache: a restored page must never show a stuck loader. */
        window.addEventListener('pageshow', function (ev) {
            if (ev.persisted) { removeOverlay(); }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        /* Navbar shadow state */
        var navbar = document.querySelector('.navbar');
        if (navbar) {
            var onScroll = function () {
                if (window.scrollY > 12) { navbar.classList.add('nav-scrolled'); }
                else { navbar.classList.remove('nav-scrolled'); }
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        /* Diyas in the home hero */
        var hero = document.querySelector('.hero');
        if (hero) {
            ['diya-left', 'diya-right'].forEach(function (pos) {
                var d = document.createElement('div');
                d.className = 'diya ' + pos;
                d.setAttribute('aria-hidden', 'true');
                d.innerHTML = '<div class="diya-flame"></div><div class="diya-bowl"></div>';
                hero.appendChild(d);
            });
        }

        /* Reveal on scroll */
        if (!reduceMotion && 'IntersectionObserver' in window) {
            var targets = document.querySelectorAll(
                '.card, .structure-section, .jyotish-sub, .pooja-card, .aarti-card, ' +
                '.granth-card, .mantra-item, .panchang-item, .gau-content, ' +
                '.acharya-container, .about-intro, .about-content, .source-topic'
            );
            targets.forEach(function (el) { el.classList.add('premium-reveal'); });
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('premium-in');
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
            targets.forEach(function (el) { io.observe(el); });
        }
        /* Announcements banner + Vaidik AI widget (load on every public page) */
        ['js/suchna-banner.js', 'js/vaidik-ai.js'].forEach(function (src) {
            var s = document.createElement('script');
            s.src = src;
            s.defer = true;
            document.body.appendChild(s);
        });
    });
})();
