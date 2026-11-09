/* BrahmTatva – Digital Mandir | Premium enhancements (presentation only) */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
