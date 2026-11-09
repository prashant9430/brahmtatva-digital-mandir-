/* Source-limited preview. Questions require clear provider-processing consent. */
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
        panel.style.maxHeight = 'min(640px, calc(100dvh - 110px))';
        panel.innerHTML =
            '<header class="vaidik-head"><h2>वैदिक AI</h2>' +
            '<button type="button" class="vaidik-close" aria-label="बंद करें">×</button></header>' +
            '<p class="vaidik-note">सीमित source-preview: अभी कर्मकाण्ड-भास्कर (2010) के लेखक/संस्करण और मंत्र-विराम से जुड़े 2 छोटे जाँचे अंश उपलब्ध हैं। पूरी पुस्तक अभी खोज में नहीं है।</p>' +
            '<div class="vaidik-log" aria-live="polite"></div>' +
            '<label style="display:block;font-size:.8rem;line-height:1.5;padding:0 16px 12px"><input type="checkbox" class="vaidik-consent"> मैं समझता/समझती हूँ कि प्रश्न और छोटा स्रोत अंश Google Gemini Free tier को भेजे जाएँगे। Google उन्हें सुधार और मानवीय समीक्षा में इस्तेमाल कर सकता है। निजी जानकारी न भेजें।</label>' +
            '<form class="vaidik-form"><input type="text" maxlength="500" ' +
            'placeholder="अपना प्रश्न लिखें…" aria-label="अपना प्रश्न लिखें" required>' +
            '<button type="submit">पूछें</button></form>';

        document.body.appendChild(btn);
        document.body.appendChild(panel);

        var log = panel.querySelector('.vaidik-log');
        var form = panel.querySelector('.vaidik-form');
        var input = form.querySelector('input');
        var send = form.querySelector('button');
        input.style.minWidth = '0';
        log.style.minHeight = '80px';
        log.style.whiteSpace = 'pre-wrap';

        function say(cls, text) {
            var p = document.createElement('p');
            p.className = 'vaidik-msg ' + cls;
            p.textContent = text;
            log.appendChild(p);
            log.scrollTop = log.scrollHeight;
            requestAnimationFrame(function(){log.scrollTop=log.scrollHeight;});
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
            if (!panel.querySelector('.vaidik-consent').checked) { say('vaidik-bot', 'प्रश्न भेजने से पहले ऊपर processing की सहमति चुनें।'); return; }
            var q = input.value.trim();
            if (!q) { return; }
            input.value = '';
            say('vaidik-user', q);
            var thinking = say('vaidik-bot', 'जाँचे अंश में खोज जारी है…');
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
                        thinking.textContent = res.j.answer;
                    } else {
                        thinking.textContent = 'उत्तर अभी उपलब्ध नहीं है। कृपया बाद में प्रयास करें।';
                    }
                })
                .catch(function () {
                    thinking.textContent = 'सेवा अभी उपलब्ध नहीं है। कृपया बाद में प्रयास करें।';
                }).finally(function () { send.disabled = false; requestAnimationFrame(function(){log.scrollTop=log.scrollHeight;}); });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else { init(); }
})();
