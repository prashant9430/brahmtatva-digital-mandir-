/* ========================================
   Sanskar Section Page
   ======================================== */

let SANSKAR_DATA = null;

async function loadSanskars() {
    try {
        const data = await loadJSON('data/sanskar.json');
        if (data && data.sanskars) {
            SANSKAR_DATA = data;
            renderSection(data);
        } else {
            showError('sanskarList', 'संस्कार सामग्री लोड नहीं हो सकी।');
        }
    } catch (error) {
        console.error('Error loading sanskars:', error);
        showError('sanskarList', 'त्रुटि: ' + error.message);
    }
}

function esc(t) {
    const d = document.createElement('div');
    d.textContent = t == null ? '' : String(t);
    return d.innerHTML;
}

function escLinkify(t) {
    return esc(t).replace(/(https?:\/\/[^\s]+)/g, function(u){
        let label = u;
        if (u.indexOf('cdc.gov') > -1) label = 'CDC - शहद सुरक्षा';
        else if (u.indexOf('healthychildren') > -1) label = 'AAP - कर्ण-छेदन देखभाल';
        else if (u.indexOf('gretil') > -1) label = 'GRETIL - मूल पाठ (IAST)';
        else if (u.indexOf('wisdomlib') > -1) label = 'WisdomLib - SBE अनुवाद (Oldenberg)';
        else if (u.indexOf('archive.org') > -1 && u.indexOf('grihyasutras') > -1) label = 'SBE - गृह्यसूत्र (Oldenberg)';
        else if (u.indexOf('archive.org') > -1 && u.indexOf('upanishads') > -1) label = 'SBE 15 - उपनिषद् (Max Müller)';
        else if (u.indexOf('archive.org') > -1 && u.indexOf('rigveda') > -1) label = 'Griffith - ऋग्वेद अंग्रेजी अनुवाद';
        else if (u.indexOf('archive.org') > -1) label = 'archive.org - मूल ग्रंथ';
        return '<a href="' + u + '" target="_blank" rel="noopener noreferrer" style="color:#8a390d;font-weight:600">' + label + ' ↗</a>';
    });
}

function renderSection(data) {
    document.getElementById('secTitle').textContent = data.section.title || 'संस्कार';
    document.getElementById('secSubtitle').textContent = data.section.subtitle || '';
    document.getElementById('secIntro').innerHTML =
        esc(data.section.intro) + (data.section.attributionNote ? '<br><br>' + esc(data.section.attributionNote) : '');

    if (data.section.brandMotto) {
        document.getElementById('secSubtitle').textContent = data.section.subtitle || '';
        var mb = document.createElement('p');
        mb.style.cssText = 'text-align:center;font-family:var(--font-sanskrit);font-size:1.3rem;color:#7a3d08;margin:.6rem 0';
        mb.textContent = data.section.brandMotto.devanagari;
        var ml = document.createElement('p');
        ml.style.cssText = 'text-align:center;font-size:.85rem;color:#8a6a3a;margin-top:-.4rem';
        ml.textContent = data.section.brandMotto.label;
        var hdr = document.querySelector('.page-header');
        hdr.parentNode.insertBefore(mb, hdr.nextSibling);
        hdr.parentNode.insertBefore(ml, mb.nextSibling);
    }

    // Group sanskars by category, preserving order
    const groups = {};
    const order = [];
    data.sanskars.slice().sort(function(a,b){return a.order-b.order;}).forEach(function(s){
        if (!groups[s.categoryName]) { groups[s.categoryName] = []; order.push(s.categoryName); }
        groups[s.categoryName].push(s);
    });

    let html = '';
    order.forEach(function(cat){
        html += '<div class="sanskar-category"><h2>' + esc(cat) + '</h2><div class="sanskar-grid">';
        groups[cat].forEach(function(s){
            html += '<div class="sanskar-card" tabindex="0" role="button" onclick="openSanskarDetail(\'' + esc(s.id) + '\')" onkeydown="if(event.key===\'Enter\'){openSanskarDetail(\'' + esc(s.id) + '\')}">' +
                '<span class="order-tag">' + s.order + '</span>' +
                '<h3>' + esc(s.nameSa) + '</h3>' +
                '<div class="iast">' + esc(s.nameIast) + '</div>' +
                '<p>' + esc((s.summary || '').substring(0, 140)) + (s.summary && s.summary.length > 140 ? '...' : '') + '</p>' +
                '<button class="btn-read" onclick="openSanskarDetail(\'' + esc(s.id) + '\'); event.stopPropagation();">विस्तार से देखें</button>' +
                '</div>';
        });
        html += '</div></div>';
    });
    document.getElementById('sanskarList').innerHTML = html;

    // Mat-bhed (documented lists) block
    if (data.documentedLists && data.documentedLists.lists) {
        let mh = '<div class="sanskar-category"><h2>ग्रंथों में संस्कार-गिनती</h2>' +
            '<div class="list-note">' + esc(data.documentedLists.note) + '</div>';
        data.documentedLists.lists.forEach(function(l){
            mh += '<div class="list-note"><h3>' + esc(l.name) + '</h3>' + esc(l.detail) +
                (l.separateNote ? '<br><br>' + esc(l.separateNote) : '') +
                (l.sourceRef && data.section.sources && data.section.sources[l.sourceRef] ?
                    '<br><span style="font-size:.85rem;color:#6c553e">स्रोत: ' + esc(data.section.sources[l.sourceRef]) + '</span>' : '') +
                '</div>';
        });
        mh += '</div>';
        document.getElementById('matbhed').innerHTML = mh;
    }

    // Sources block
    if (data.section.sources) {
        let sh = '<div class="sanskar-category"><h2>स्रोत</h2>';
        Object.keys(data.section.sources).forEach(function(k){
            sh += '<div class="source-block">' + esc(data.section.sources[k]) + '</div>';
        });
        sh += '</div>';
        document.getElementById('srcs').innerHTML = sh;
    }
}

function openSanskarDetail(id) {
    if (!SANSKAR_DATA) return;
    const s = SANSKAR_DATA.sanskars.find(function(x){ return x.id === id; });
    if (!s) return;

    document.getElementById('sanskarModalTitle').textContent = s.nameSa + ' (' + s.nameIast + ')';

    let html = '';

    if (s.photo && s.photo.file) {
        var creditLine = s.photo.credit ? esc(s.photo.credit) : '';
        if (s.photo.licenseUrl && creditLine) creditLine += ' <a href="' + esc(s.photo.licenseUrl) + '" target="_blank" rel="noopener noreferrer" style="color:#8a390d;font-weight:600">लाइसेंस ↗</a>';
        html += '<figure style="margin:1rem 0;text-align:center">' +
            '<img src="' + esc(s.photo.file) + '" alt="' + esc(s.photo.caption || s.nameSa) + '" style="max-width:100%;max-height:340px;border-radius:12px;box-shadow:var(--soft-shadow)">' +
            '<figcaption style="font-size:.9rem;color:#6c553e;margin-top:.4rem">' + esc(s.photo.caption || '') +
            (creditLine ? '<br>' + creditLine : '') +
            (s.photo.sourceUrl ? ' <a href="' + esc(s.photo.sourceUrl) + '" target="_blank" rel="noopener noreferrer" style="color:#8a390d;font-weight:600">स्रोत: Wikimedia Commons ↗</a>' : '') +
            (s.photo.changesNote ? '<br><span style="font-size:.85rem">' + esc(s.photo.changesNote) + '</span>' : '') +
            '</figcaption></figure>';
    } else {
        html += '<div class="list-note" style="font-size:.9rem">' + 'अधिकार-स्पष्ट, स्रोत-सत्यापित चित्र उपलब्ध न होने से इस संस्कार में कोई चित्र नहीं जोड़ा गया है।' + '</div>';
    }

    if (s.vidhiStatus === 'outline') {
        html += '<div class="list-note" style="font-size:.9rem">' + 'कवरेज-टिप्पणी: यह विवरण ग्रंथ-संदर्भ सहित एक रूपरेखा है - किसी घर या कुल की पूरी परंपरागत विधि-पुस्तिका नहीं; स्थानीय और पारिवारिक आचार भिन्न हो सकते हैं।' + '</div>';
    } else if (s.vidhiStatus === 'deferred') {
        html += '<div class="list-note" style="font-size:.9rem">' + 'कवरेज-टिप्पणी: इस संस्कार की गृह्यसूत्र-विशिष्ट विधि अभी सत्यापित नहीं की गई है; नीचे निबन्ध-ग्रंथों और परवर्ती स्रोतों का सार स्रोत-उल्लेख सहित दिया गया है।' + '</div>';
    }

    if (s.timing) html += '<div class="detail-block"><h4>कब और क्यों</h4>' + esc(s.timing) + '</div>';
    if (s.summary) html += '<div class="detail-block"><h4>संस्कार का सार</h4>' + esc(s.summary) + '</div>';

    if (s.vidhiSafetyNote) html += '<div class="list-note" style="border-left:4px solid #b3541e">' + escLinkify(s.vidhiSafetyNote) + '</div>';
    if (s.vidhiSteps && s.vidhiSteps.length) {
        html += '<div class="detail-block"><h4>विधि का सार (ग्रंथ-संदर्भ सहित)</h4><ol style="line-height:2">';
        s.vidhiSteps.forEach(function(st){ html += '<li>' + esc(st.step) + (st.anchor ? ' <span style="font-size:.85rem;color:#6c553e">[' + esc(st.anchor) + ']</span>' : '') + '</li>'; });
        html += '</ol></div>';
    }

    if (s.anchorPendingNote) html += '<div class="list-note">' + esc(s.anchorPendingNote) + '</div>';
    if (s.relatedContextNote) html += '<div class="list-note" style="border-left:4px solid #6c553e">' + esc(s.relatedContextNote) + '</div>';
    if (s.keyVerses && s.keyVerses.length) {
        html += '<div class="detail-block"><h4>प्रमुख श्लोक / मन्त्र (मूल पाठ सहित)</h4>';
        s.keyVerses.forEach(function(v){
            html += '<div class="verse">' +
                (v.devanagari ? '<div class="deva">' + esc(v.devanagari) + '</div>' : '') +
                (v.iast ? '<div class="iast-line">' + esc(v.iast) + '</div>' : '') +
                (v.hindi ? '<div class="eng">' + esc(v.hindi) + '</div>' : '') +
                (v.english ? '<div class="eng">' + esc(v.english) + '</div>' : '') +
                (v.citation ? '<div class="cite">' + esc(v.citation) + '</div>' : '');
            if (v.sourceUrls && v.sourceUrls.length) {
                v.sourceUrls.forEach(function(u){
                    const url = u.split(' ')[0];
                    const note = u.substring(url.length).trim();
                    let label = 'स्रोत लिंक';
                    if (url.indexOf('wikisource') > -1) label = 'Wikisource - Griffith अंग्रेजी अनुवाद';
                    else if (url.indexOf('gretil') > -1) label = 'GRETIL - मूल पाठ (IAST)';
                    else if (url.indexOf('wisdomlib') > -1) label = 'WisdomLib - SBE अनुवाद (Oldenberg)';
                    else if (url.indexOf('cdc.gov') > -1) label = 'CDC - शहद सुरक्षा';
                    else if (url.indexOf('healthychildren') > -1) label = 'AAP - कर्ण-छेदन देखभाल';
                    else if (url.indexOf('archive.org') > -1 && url.indexOf('grihyasutras') > -1) label = 'SBE 29 - गृह्यसूत्र (Oldenberg)';
                    else if (url.indexOf('archive.org') > -1 && url.indexOf('upanishads') > -1) label = 'SBE 15 - उपनिषद् (Max Müller)';
                    else if (url.indexOf('archive.org') > -1 && url.indexOf('hymns-of-the-rigveda') > -1) label = 'Griffith - ऋग्वेद अंग्रेजी अनुवाद';
                    else if (url.indexOf('archive.org') > -1 && url.indexOf('apokryphen') > -1) label = 'Scheftelowitz - खिल संस्करण (archive.org)';
                    else if (url.indexOf('archive.org') > -1) label = 'archive.org - मूल ग्रंथ';
                    html += '<div class="cite"><a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + ' ↗</a>' +
                        (note ? ' <span style="color:#6c553e">' + esc(note) + '</span>' : '') + '</div>';
                });
            }
            html += '</div>';
        });
        html += '</div>';
    }
    if (s.verseNote) html += '<div class="list-note">' + esc(s.verseNote) + '</div>';
    if (s.grihyaAnchors) html += '<div class="detail-block"><h4>गृह्यसूत्र-संदर्भ</h4>' + escLinkify(s.grihyaAnchors) + '</div>';
    if (s.sourceUrls && s.sourceUrls.length) {
        s.sourceUrls.forEach(function(u){
            const url = u.split(' ')[0];
            const note = u.substring(url.length).trim();
            let label = 'स्रोत लिंक';
            if (url.indexOf('gretil') > -1) label = 'GRETIL - मूल पाठ (IAST)';
            else if (url.indexOf('wisdomlib') > -1) label = 'WisdomLib - SBE अनुवाद (Oldenberg)';
            html += '<div class="cite" style="margin:.3rem 0"><a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + ' ↗</a>' +
                (note ? ' <span style="color:#6c553e">' + esc(note) + '</span>' : '') + '</div>';
        });
    }
    if (s.safetyNote) html += '<div class="list-note">' + esc(s.safetyNote) + '</div>';

    document.getElementById('sanskarDetail').innerHTML = html;
    openModal('sanskarModal');
}

document.addEventListener('DOMContentLoaded', loadSanskars);
