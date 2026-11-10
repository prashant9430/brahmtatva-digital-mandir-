/* Source-bounded assistant with a clearly labelled general-information tier.
   Questions require clear provider-processing consent. */
(function () {
    'use strict';

    if (/(^|\/)admin(-panel)?\.html$/.test(location.pathname)) { return; }

    var SUGGESTIONS = [
        'संध्या उपासना का महत्व क्या है?',
        'एकादशी व्रत क्यों रखा जाता है?',
        'दीपदान का क्या अर्थ है?'
    ];

    function init() {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'vaidik-fab';
        btn.setAttribute('aria-label', 'वैदिक AI से पूछें');
        btn.innerHTML = '<span aria-hidden="true">ॐ</span><span class="vaidik-fab-label">वैदिक AI</span>';

        var panel = document.createElement('section');
        panel.className = 'vaidik-panel';
        panel.setAttribute('hidden', '');
        panel.style.maxHeight = 'min(660px, calc(100dvh - 110px))';

        var head = document.createElement('header');
        head.className = 'vaidik-head';
        head.innerHTML =
            '<div class="vaidik-title"><span class="vaidik-om" aria-hidden="true">ॐ</span>' +
            '<div><h2>वैदिक AI</h2><p class="vaidik-sub">सनातन धर्म सहायक</p></div></div>' +
            '<button type="button" class="vaidik-close" aria-label="बंद करें">×</button>';

        var note = document.createElement('p');
        note.className = 'vaidik-note';
        note.textContent = 'उत्तर केवल जाँची हुई सामग्री से मिलते हैं: (1) जाँचे हुए ग्रंथ-अंश से, स्रोत सहित; (2) साइट के अपने संग्रह (मंत्र, पूजा विधि, ग्रंथ, आरती) के अंशों से, स्रोत सहित। जहाँ स्रोत उपलब्ध नहीं है, वहाँ अनुमानित उत्तर नहीं दिया जाता — स्पष्ट सूचना मिलती है।';

        var log = document.createElement('div');
        log.className = 'vaidik-log';
        log.setAttribute('aria-live', 'polite');

        var chips = document.createElement('div');
        chips.className = 'vaidik-chips';
        SUGGESTIONS.forEach(function (s) {
            var c = document.createElement('button');
            c.type = 'button';
            c.className = 'vaidik-chip';
            c.textContent = s;
            c.addEventListener('click', function () {
                input.value = s;
                input.focus();
            });
            chips.appendChild(c);
        });

        var consent = document.createElement('label');
        consent.className = 'vaidik-consent-row';
        consent.innerHTML = '<input type="checkbox" class="vaidik-consent"> मैं समझता/समझती हूँ कि प्रश्न और छोटा स्रोत अंश Google Gemini Free tier को भेजे जाएँगे। Google उन्हें सुधार और मानवीय समीक्षा में इस्तेमाल कर सकता है। निजी जानकारी न भेजें।';

        var form = document.createElement('form');
        form.className = 'vaidik-form';
        form.innerHTML =
            '<input type="text" maxlength="500" placeholder="अपना प्रश्न लिखें…" aria-label="अपना प्रश्न लिखें" required>' +
            '<button type="submit">पूछें</button>';

        panel.appendChild(head);
        panel.appendChild(note);
        panel.appendChild(log);
        panel.appendChild(chips);
        panel.appendChild(consent);
        panel.appendChild(form);
        document.body.appendChild(btn);
        document.body.appendChild(panel);

        var input = form.querySelector('input');
        var send = form.querySelector('button');

        function scrollLog() {
            log.scrollTop = log.scrollHeight;
            requestAnimationFrame(function () { log.scrollTop = log.scrollHeight; });
        }

        function say(cls, text, badge) {
            var wrap = document.createElement('div');
            wrap.className = 'vaidik-msg-wrap ' + (cls === 'vaidik-user' ? 'wrap-user' : 'wrap-bot');
            if (badge) {
                var b = document.createElement('span');
                b.className = 'vaidik-badge ' + badge.cls;
                b.textContent = badge.text;
                wrap.appendChild(b);
            }
            var p = document.createElement('p');
            p.className = 'vaidik-msg ' + cls;
            p.textContent = text;
            wrap.appendChild(p);
            log.appendChild(wrap);
            scrollLog();
            return p;
        }

        btn.addEventListener('click', function () {
            var open = !panel.hasAttribute('hidden');
            if (open) { panel.setAttribute('hidden', ''); }
            else { panel.removeAttribute('hidden'); input.focus(); }
        });
        head.querySelector('.vaidik-close').addEventListener('click', function () {
            panel.setAttribute('hidden', '');
        });

        form.addEventListener('submit', function (ev) {
            ev.preventDefault();
            if (!panel.querySelector('.vaidik-consent').checked) { say('vaidik-bot', 'प्रश्न भेजने से पहले नीचे processing की सहमति चुनें।'); return; }
            var q = input.value.trim();
            if (!q) { return; }
            input.value = '';
            say('vaidik-user', q);
            var thinking = say('vaidik-bot', 'उत्तर तैयार हो रहा है…');
            send.disabled = true;
            fetch('api/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: q, processingConsent: true }),
            })
                .then(function (r) { return r.json().then(function (j) { return { status: r.status, j: j }; }); })
                .then(function (res) {
                    if (res.status === 503) {
                        thinking.textContent = 'जाँचे हुए स्रोत का setup अभी पूरा नहीं है। कोई अनुमानित उत्तर नहीं दिया जाएगा।';
                    } else if (res.status === 429) {
                        thinking.textContent = 'बहुत अधिक प्रश्न एक साथ आए हैं। कृपया कुछ देर बाद पूछें।';
                    } else if (res.j && res.j.ok && res.j.answer) {
                        var badge = null;
                        if (res.j.matched && res.j.answerType === 'source') {
                            badge = { cls: 'vaidik-badge-source', text: 'ग्रंथ-स्रोत से जाँचा अंश' };
                        } else if (res.j.answerType === 'corpus') {
                            badge = { cls: 'vaidik-badge-corpus', text: 'साइट संग्रह से · स्रोत सहित' };
                        }
                        if (badge) {
                            var b = document.createElement('span');
                            b.className = 'vaidik-badge ' + badge.cls;
                            b.textContent = badge.text;
                            thinking.parentNode.insertBefore(b, thinking);
                        }
                        thinking.textContent = res.j.answer;
                    } else {
                        thinking.textContent = 'उत्तर अभी उपलब्ध नहीं है। कृपया बाद में प्रयास करें।';
                    }
                })
                .catch(function () {
                    thinking.textContent = 'सेवा अभी उपलब्ध नहीं है। कृपया बाद में प्रयास करें।';
                }).finally(function () { send.disabled = false; scrollLog(); });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else { init(); }
})();
