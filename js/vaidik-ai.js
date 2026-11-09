/* BrahmTatva – Digital Mandir | Vaidik AI widget (frontend only)
   Talks to /api/ask - the Gemini key never reaches the browser.
   Until the backend key is configured the widget says the service
   is coming soon instead of failing. */
(function () {
    'use strict';

    if (/(^|\/)admin(-panel)?\.html$/.test(location.pathname)) { return; }

    function init() {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'vaidik-fab';
        btn.setAttribute('aria-label', 'वैदिक AI से पूछें');
        btn.innerHTML = '<span aria-hidden="true">ॐ</span><span class="vaidik-fab-label">वैदिक AI</span>';

        var panel = document.createElement('section');
        panel.className = 'vaidik-panel';
        panel.setAttribute('hidden', '');
        panel.innerHTML =
            '<header class="vaidik-head"><h2>वैदिक AI</h2>' +
            '<button type="button" class="vaidik-close" aria-label="बंद करें">×</button></header>' +
            '<p class="vaidik-note">साइट की सामग्री से जुड़े प्रश्न पूछें। कृपया व्यक्तिगत जानकारी साझा न करें।</p>' +
            '<div class="vaidik-log" aria-live="polite"></div>' +
            '<form class="vaidik-form"><input type="text" maxlength="500" ' +
            'placeholder="अपना प्रश्न लिखें…" aria-label="अपना प्रश्न लिखें" required>' +
            '<button type="submit">पूछें</button></form>';

        document.body.appendChild(btn);
        document.body.appendChild(panel);

        var log = panel.querySelector('.vaidik-log');
        var form = panel.querySelector('.vaidik-form');
        var input = form.querySelector('input');

        function say(cls, text) {
            var p = document.createElement('p');
            p.className = 'vaidik-msg ' + cls;
            p.textContent = text;
            log.appendChild(p);
            log.scrollTop = log.scrollHeight;
            return p;
        }

        btn.addEventListener('click', function () {
            var open = !panel.hasAttribute('hidden');
            if (open) { panel.setAttribute('hidden', ''); }
            else { panel.removeAttribute('hidden'); input.focus(); }
        });
        panel.querySelector('.vaidik-close').addEventListener('click', function () {
            panel.setAttribute('hidden', '');
        });

        form.addEventListener('submit', function (ev) {
            ev.preventDefault();
            var q = input.value.trim();
            if (!q) { return; }
            input.value = '';
            say('vaidik-user', q);
            var thinking = say('vaidik-bot', '…');
            fetch('api/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: q }),
            })
                .then(function (r) { return r.json().then(function (j) { return { status: r.status, j: j }; }); })
                .then(function (res) {
                    if (res.status === 503) {
                        thinking.textContent = 'यह सेवा जल्द ही सक्रिय होगी। कृपया थोड़ी देर बाद प्रयास करें।';
                    } else if (res.status === 429) {
                        thinking.textContent = 'बहुत अधिक प्रश्न एक साथ आए हैं। कृपया कुछ देर बाद पूछें।';
                    } else if (res.j && res.j.ok && res.j.answer) {
                        thinking.textContent = res.j.answer;
                    } else {
                        thinking.textContent = 'उत्तर अभी उपलब्ध नहीं है। कृपया बाद में प्रयास करें।';
                    }
                })
                .catch(function () {
                    thinking.textContent = 'सेवा अभी उपलब्ध नहीं है। कृपया बाद में प्रयास करें।';
                });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else { init(); }
})();
