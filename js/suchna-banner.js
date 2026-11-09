/* BrahmTatva – Digital Mandir | Visitor announcements (puja / tyohar / awashyak suchna)
   Reads json/announcements.json and shows the newest active notice as a
   dismissible premium banner. No visitors are contacted - website only. */
(function () {
    'use strict';

    if (/(^|\/)admin(-panel)?\.html$/.test(location.pathname)) { return; }

    var TYPE_LABEL = { puja: 'पूजा सूचना', tyohar: 'त्योहार', suchna: 'आवश्यक सूचना' };

    function init() {
        fetch('json/announcements.json', { cache: 'no-store' })
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (data) {
                var list = data && Array.isArray(data.announcements) ? data.announcements : [];
                var active = list.filter(function (a) { return a && a.active && a.text; });
                if (!active.length) { return; }
                var a = active[active.length - 1];
                var id = String(a.id || a.text).slice(0, 80);
                try {
                    if (sessionStorage.getItem('bt_suchna_closed') === id) { return; }
                } catch (e) { /* private mode - show banner */ }

                var bar = document.createElement('div');
                bar.className = 'suchna-banner suchna-' + (TYPE_LABEL[a.type] ? a.type : 'suchna');
                bar.setAttribute('role', 'status');
                var label = TYPE_LABEL[a.type] || TYPE_LABEL.suchna;
                bar.innerHTML =
                    '<span class="suchna-om" aria-hidden="true">ॐ</span>' +
                    '<span class="suchna-body"><strong>' + label + '</strong>' +
                    '<span class="suchna-text"></span></span>' +
                    (a.link ? '<a class="suchna-link"></a>' : '') +
                    '<button type="button" class="suchna-close" aria-label="सूचना बंद करें">×</button>';
                bar.querySelector('.suchna-text').textContent = a.text;
                if (a.link) {
                    var link = bar.querySelector('.suchna-link');
                    link.href = a.link;
                    link.textContent = a.linkLabel || 'और जानें';
                }
                bar.querySelector('.suchna-close').addEventListener('click', function () {
                    bar.remove();
                    try { sessionStorage.setItem('bt_suchna_closed', id); } catch (e) { /* ignore */ }
                });

                var nav = document.querySelector('.navbar');
                if (nav && nav.parentNode) { nav.parentNode.insertBefore(bar, nav.nextSibling); }
                else { document.body.insertBefore(bar, document.body.firstChild); }
            })
            .catch(function () { /* no announcements file yet - stay quiet */ });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else { init(); }
})();
