/* BrahmTatva – Digital Mandir | Premium enhancements (presentation only) */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Shubh-prateek preloader (sacred symbols while the page loads) ---------- */
    /* Injected at defer time (document parsed, assets still loading); styles live in premium.css. */
    if (!/admin/i.test(window.location.pathname)) {
        var plSymbols = [
            '\u0950',                 /* ॐ */
            '\u0936\u094D\u0930\u0940', /* श्री */
            '\u5350\uFE0E',           /* 卐 (text presentation) */
            '\u2638\uFE0E',           /* ☸ (text presentation) */
            '\u0936\u0941\u092D',     /* शुभ */
            '\u0932\u093E\u092D'      /* लाभ */
        ];
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

        var plStart = Date.now();
        var symEl = pl.querySelector('.bt-loader-symbol');
        var symIndex = 0;
        var plTimer = null;
        if (!reduceMotion) {
            plTimer = setInterval(function () {
                symIndex = (symIndex + 1) % plSymbols.length;
                symEl.textContent = plSymbols[symIndex];
            }, 180);
        }
        var plDone = false;
        var hidePreloader = function () {
            if (plDone) { return; }
            plDone = true;
            var wait = Math.max(0, 650 - (Date.now() - plStart));
            setTimeout(function () {
                if (plTimer) { clearInterval(plTimer); }
                pl.classList.add('bt-hide');
                setTimeout(function () {
                    if (pl.parentNode) { pl.parentNode.removeChild(pl); }
                }, 700);
            }, wait);
        };
        if (document.readyState === 'complete') { hidePreloader(); }
        else { window.addEventListener('load', hidePreloader); }
        setTimeout(hidePreloader, 6000); /* failsafe: never trap the page */
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
