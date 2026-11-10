/* ============================================================
   सिद्धांत-ज्ञान (browsable learning section)
   Homepage only. Rendered by js/main.js loader.
   Every card is scan-verified source material; interpretation is
   labeled separately from the mool line. No coverage promise.
   ============================================================ */
(function () {
  'use strict';

  if (window.__siddhantGyanLoaded) { return; }
  window.__siddhantGyanLoaded = true;

  var CONCEPTS = [
    {
      title: 'अवतार-सिद्धांत',
      granth: 'श्रीमद्भगवद्गीता 4.7-4.8',
      mool: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥७॥ परित्राणाय साधूनां विनाशाय च दुष्कृताम् । धर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥८॥',
      simple: 'जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब ईश्वर साधुओं की रक्षा, दुष्टों के विनाश और धर्म की पुनःस्थापना के लिए स्वयं प्रकट होते हैं।',
      deep: 'गीता-व्याख्या परंपरा में यह प्रसंग इस सूत्र से जुड़ा है: जो पुरुष ईश्वर को सृष्टि का आदि-कारण और अविनाशी समझता है, वह संसार में अमोहित होकर पापों से मुक्त हो जाता है। काल के नियंत्रक होते हुए भी ईश्वर अपनी माया के वशीभूत होकर अवतार लेते हैं, ऐसा पहले भाग में कहा गया है।\nदूसरे भाग में बताया गया है कि धर्म की ग्लानि और अधर्म का अभ्युत्थान ही प्रादुर्भाव की युक्ति है, और साधु-परित्राण, दुष्ट-विनाश तथा धर्म-स्थापना यह त्रिविध प्रयोजन है। श्लोक 4.6 से 4.9 तक की अविच्छिन्न व्याख्या-परंपरा इसी क्रम को आगे बढ़ाती है।',
      source: 'भगवद्गीता (मूल पाठ; आनिबेसेण्ट-भगवान्दास संस्करण के स्कैन से जाँच, भाष्य उपयोग में नहीं)',
      detail: 'स्कैन पृ. 125-126, मुद्रित पृ. 79-80। स्कैन sa.wikisource.org के पृष्ठम् नामस्थान से, गुणवत्ता-3; मूल पंक्तियाँ स्कैन से मिलाई गई हैं।',
      ask: 'अवतार क्यों होते हैं?'
    },
    {
      title: 'संसार और पुनर्जन्म',
      granth: 'श्रीमद्भगवद्गीता 2.22',
      mool: 'वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि । तथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही ॥२२॥',
      simple: 'जैसे मनुष्य पुराने वस्त्र उतारकर नए पहनता है, वैसे ही आत्मा पुराना शरीर छोड़कर नया शरीर धारण करता है। शरीर बदलता है, आत्मा नहीं।',
      deep: 'शरीर-वस्त्र की उपमा के साथ ही श्रुति-परंपरा में बृहदारण्यकोपनिषद् 4.4.5-6 का प्रसंग जोड़ा जाता है: आत्मा धर्माधर्म और कामना-कर्म से युक्त देह को त्यागकर नई देह धारण करता है, और कामना के अनुसार संकल्प, संकल्प के अनुसार कर्म, कर्म के अनुसार नया जन्म होता है।\nइसी कारण कर्म का वैधानिक संचय निर्विघ्न है: देह बदलने पर भी कर्म-संस्कार आत्मा के साथ रहते हैं। (उपनिषद् का यह अंश यहाँ भाव-सार के रूप में है, मूल उद्धरण नहीं।)',
      source: 'भगवद्गीता (मूल पाठ; आनिबेसेण्ट-भगवान्दास संस्करण के स्कैन से जाँच, भाष्य उपयोग में नहीं); सहायक: बृहदारण्यकोपनिषद् 4.4',
      detail: 'स्कैन पृ. 79, मुद्रित पृ. 33। स्कैन sa.wikisource.org के पृष्ठम् नामस्थान से, गुणवत्ता-3; मूल पंक्ति स्कैन से मिलाई गई है। बृहदारण्यक भाव-सार की जाँच sa.wikisource.org के टंकित पाठ से हुई।',
      ask: 'पुनर्जन्म में क्या होता है?'
    },
    {
      title: 'अमर आत्मा',
      granth: 'श्रीमद्भगवद्गीता 2.20',
      mool: 'न जायते म्रियते वा कदाचि-न्नायं भूत्वा भविता वा न भूयः । अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥२०॥',
      simple: 'आत्मा न कभी जन्मता है, न मरता है। यह अजन्मा, नित्य, शाश्वत और पुरातन है; शरीर के नष्ट होने पर भी इसका नाश नहीं होता।',
      deep: null,
      source: 'भगवद्गीता (मूल पाठ; आनिबेसेण्ट-भगवान्दास संस्करण के स्कैन से जाँच, भाष्य उपयोग में नहीं)',
      detail: 'स्कैन पृ. 78, मुद्रित पृ. 32। स्कैन sa.wikisource.org के पृष्ठम् नामस्थान से, गुणवत्ता-3; मूल पंक्ति स्कैन से मिलाई गई है (स्कैन में "पुराणो" ही छपा है)।',
      ask: 'आत्मा कैसी होती है?'
    },
    {
      title: 'कर्म-सिद्धांत',
      granth: 'श्रीमद्भगवद्गीता 2.47',
      mool: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥४७॥',
      simple: 'कर्म करना हमारे अधिकार में है, फल हमारे अधिकार में नहीं। फल को हेतु मानकर कर्म न करें, और कर्म न करने से भी आसक्त न हों।',
      deep: 'व्याख्या-परंपरा में यह श्लोक निष्काम कर्मयोग का मूल सूत्र माना गया है: फल की कामना छोड़कर किया गया कर्म बंधन नहीं बनाता, क्योंकि बंधन का कारण फल के प्रति आसक्ति है, कर्म स्वयं नहीं।\n"मा ते सङ्गोऽस्त्वकर्मणि" की चेतावनी इसलिए भी महत्वपूर्ण है: फल-त्याग का अर्थ कर्म-त्याग नहीं है। जो फल न मिलने के भय से कर्म ही छोड़ देता है, वह भी गीता की दृष्टि में सही मार्ग पर नहीं है।',
      source: 'भगवद्गीता (मूल पाठ; आनिबेसेण्ट-भगवान्दास संस्करण के स्कैन से जाँच, भाष्य उपयोग में नहीं)',
      detail: 'स्कैन पृ. 91, मुद्रित पृ. 45। स्कैन sa.wikisource.org के पृष्ठम् नामस्थान से, गुणवत्ता-3; मूल पंक्ति स्कैन से मिलाई गई है।',
      ask: 'कर्म और फल का संबंध क्या है?'
    },
    {
      title: 'ईशावास्य (सब कुछ ईश्वर में)',
      granth: 'ईशावास्योपनिषद्, मंत्र १',
      mool: 'ईशा वास्यमिदं सर्वं यत्किंच जगत्यां जगत् । तेन त्यक्तेन भुञ्जीथा मा गृधः कस्य स्विद्धनम् ॥१॥',
      simple: 'यह समस्त जगत् ईश्वर से व्याप्त है। त्याग की भावना से इसका उपभोग करो; किसी के धन पर लालच मत करो।',
      deep: 'ईशावास्योपनिषद् के इस उद्घाटन मंत्र में जगत् और ईश्वर की अविभाज्यता बताई गई है: जो कुछ भी चलायमान है, वह सब ईश्वर से आवृत है।\n"तेन त्यक्तेन भुञ्जीथा" का निर्देश त्याग-भावना से उपभोग का है, संसार-त्याग का नहीं; कर्म और संन्यास के प्रश्न का उत्तर यहीं से खुलता है।',
      source: 'ईशावास्योपनिषद्, मंत्र १ (मूल पाठ; 1912 स्कैन संस्करण से जाँच, भाष्य उपयोग में नहीं)',
      detail: 'स्कैन पृ. 15-16, मुद्रित पृ. 3-4 (1912, सं. आनंद भट्ट, हरि नारायण आप्टे, मुंबई)। सार्वजनिक अधिक्षेत्र (PD-US, PD-INDIA)। केवल मूल मंत्र; संस्करण का शांकरभाष्य उपयोग में नहीं। मंत्र-पाठ स्कैन के अनुरूप ही दिया गया है, जैसे "यत्किंच" और "कस्य स्विद्धनम्" स्कैन की वर्तनी में।',
      ask: 'ईशावास्योपनिषद् का पहला मंत्र क्या है?'
    },
    {
      title: 'तत्त्वमसि (महावाक्य)',
      granth: 'छान्दोग्योपनिषद् 6.8.7',
      mool: 'स य एषोऽणिमैतदात्म्यमिदं सर्वं तत्सत्यं स आत्मा तत्त्वमसि श्वेतकेतो इति भूय एव मा भगवान्विज्ञापयत्विति तथा सोम्येति होवाच ॥७॥',
      simple: 'पहले परंपरा-संदर्भ: यह ऋषि उद्दालक का पुत्र श्वेतकेतु को उपदेश है, और इसका अर्थ परंपरा पर निर्भर है - अद्वैत में जीव-ब्रह्म का पूर्ण अभेद, विशिष्टाद्वैत आदि में शरीर-शरीरी-भाव का अभेद। पंक्ति का सरल भाव: जो सूक्ष्म सत्य समस्त विश्व का आत्मा है, वही परम सत्य है, वही आत्मा है; और इसी संदर्भ में - तत्त्वमसि, तुम वही हो।',
      deep: 'छान्दोग्योपनिषद् के षष्ठ प्रपाठक में ऋषि उद्दालक यही उपदेश नौ बार दोहराते हैं; 6.8.7 उस शृंखला का सातवाँ प्रसंग है। पाठ सब परंपराओं के लिए एक ही है; अर्थ की दिशा परंपरा से बदलती है। किसी एक सम्प्रदाय की व्याख्या को यहाँ सार्वभौमिक माना नहीं गया।',
      source: 'छान्दोग्योपनिषद् 6.8.7 (मूल पाठ; 1913 स्कैन संस्करण से जाँच, भाष्य उपयोग में नहीं)',
      detail: 'स्कैन पृ. 374, मुद्रित पृ. 365 (1913, आनंदाश्रम)। सार्वजनिक अधिक्षेत्र (PD-US, PD-INDIA)। केवल मूल वाक्य; संस्करण का शांकरभाष्य उपयोग में नहीं। पंक्ति स्कैन के अनुरूप दी गई है (स्कैन में "मा भगवान्विज्ञापयत्विति" इसी रूप में छपा है)।',
      ask: 'तत्त्वमसि महावाक्य बताओ'
    }
  ];

  var CSS = [
    '.sg-section{max-width:1100px;margin:56px auto 8px;padding:0 20px;font-family:inherit}',
    '.sg-head{text-align:center;margin-bottom:8px}',
    '.sg-head h2{font-size:2rem;color:#7b241c;margin:0 0 6px}',
    '.sg-sub{color:#5d4037;max-width:640px;margin:0 auto;line-height:1.6}',
    '.sg-scope{max-width:680px;margin:14px auto 26px;padding:10px 14px;border-left:3px solid #c9a227;background:#fdf6e3;color:#6d4c41;font-size:.92rem;line-height:1.55;border-radius:6px}',
    '.sg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px}',
    '.sg-card{background:#fffdf6;border:1px solid #e8dcc0;border-top:3px solid #c9a227;border-radius:12px;padding:18px 18px 14px;display:flex;flex-direction:column;box-shadow:0 2px 10px rgba(90,60,20,.06)}',
    '.sg-card h3{margin:0 0 2px;color:#7b241c;font-size:1.22rem}',
    '.sg-granth{display:inline-block;font-size:.8rem;color:#8d6e63;background:#f5ecd7;border-radius:10px;padding:2px 10px;margin:6px 0 10px;align-self:flex-start}',
    '.sg-mool{background:#f9f1dc;border-left:3px solid #c9a227;border-radius:6px;padding:10px 12px;font-size:1.02rem;line-height:1.8;color:#4e342e;margin:0 0 10px}',
    '.sg-label{font-size:.75rem;letter-spacing:.04em;color:#a1887f;text-transform:none;margin:0 0 4px}',
    '.sg-simple{color:#3e2723;line-height:1.65;margin:0 0 10px}',
    '.sg-deep{border:1px dashed #d7ccc8;border-radius:8px;padding:8px 12px;margin:0 0 10px}',
    '.sg-deep summary{cursor:pointer;color:#6d4c41;font-size:.92rem}',
    '.sg-deep p{color:#4e342e;line-height:1.7;font-size:.95rem}',
    '.sg-src{font-size:.88rem;color:#5d4037;margin:auto 0 6px}',
    '.sg-src b{color:#7b241c}',
    '.sg-detail summary{cursor:pointer;font-size:.82rem;color:#8d6e63}',
    '.sg-detail p{font-size:.82rem;color:#6d4c41;line-height:1.6;margin:6px 0 0}',
    '.sg-ask{margin-top:10px;align-self:flex-start;border:1px solid #c9a227;background:#fff;color:#7b241c;border-radius:16px;padding:6px 14px;font-size:.88rem;cursor:pointer}',
    '.sg-ask:hover{background:#c9a227;color:#fff}',
    '@media (max-width:600px){.sg-head h2{font-size:1.55rem}.sg-grid{grid-template-columns:1fr}}'
  ].join('\n');

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) { e.className = cls; }
    if (html != null) { e.innerHTML = html; }
    return e;
  }

  function cardHtml(c) {
    var h = '';
    h += '<h3>' + c.title + '</h3>';
    h += '<span class="sg-granth">' + c.granth + '</span>';
    h += '<p class="sg-label">मूल पंक्ति (ग्रंथ से, यथास्कैन)</p>';
    h += '<div class="sg-mool">' + c.mool + '</div>';
    h += '<p class="sg-label">आसान भाषा में</p>';
    h += '<p class="sg-simple">' + c.simple + '</p>';
    if (c.deep) {
      var paras = c.deep.split('\n').map(function (p) { return '<p>' + p + '</p>'; }).join('');
      h += '<details class="sg-deep"><summary>व्याख्या (परंपरा से, हमारे शब्दों में)</summary>' + paras + '</details>';
    }
    h += '<p class="sg-src"><b>स्रोत:</b> ' + c.source + '</p>';
    h += '<details class="sg-detail"><summary>स्रोत-विवरण और जाँच</summary><p>' + c.detail + '</p></details>';
    h += '<button type="button" class="sg-ask" data-q="' + c.ask + '">वैदिक AI से इसी पर पूछें</button>';
    return h;
  }

  function render() {
    if (document.getElementById('siddhant-gyan')) { return; }
    var anchor = document.getElementById('sections');
    if (!anchor || !anchor.parentNode) { return; }

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var sec = el('section', 'sg-section');
    sec.id = 'siddhant-gyan';

    var head = el('div', 'sg-head');
    head.appendChild(el('h2', null, 'ॐ सिद्धांत-ज्ञान'));
    head.appendChild(el('p', 'sg-sub', 'मूल सिद्धांत सीधे ग्रंथ-स्रोतों से, जाँचे हुए पृष्ठ-संदर्भ और स्पष्ट व्याख्या सहित।'));
    sec.appendChild(head);
    sec.appendChild(el('p', 'sg-scope', 'यह खंड अभी छह सिद्धांतों तक सीमित है और धीरे-धीरे विस्तारित होगा; यह सम्पूर्ण ग्रंथ-ज्ञान का दावा नहीं है। मूल पंक्तियाँ स्कैन से जाँची गई हैं, और व्याख्या अलग से चिह्नित है।'));

    var grid = el('div', 'sg-grid');
    CONCEPTS.forEach(function (c) { grid.appendChild(el('article', 'sg-card', cardHtml(c))); });
    sec.appendChild(grid);

    anchor.parentNode.insertBefore(sec, anchor);

    var menu = document.getElementById('navMenu');
    if (menu && !menu.querySelector('a[href="#siddhant-gyan"]')) {
      var link = el('a', 'nav-link', 'सिद्धांत-ज्ञान');
      link.href = '#siddhant-gyan';
      var first = menu.querySelector('a');
      if (first && first.nextSibling) { menu.insertBefore(link, first.nextSibling); }
      else { menu.appendChild(link); }
    }

    sec.addEventListener('click', function (ev) {
      var btn = ev.target && ev.target.closest ? ev.target.closest('.sg-ask') : null;
      if (!btn) { return; }
      var q = btn.getAttribute('data-q') || '';
      try {
        var panel = document.querySelector('.vaidik-bot .vaidik-panel, .vaidik-panel');
        var fab = document.querySelector('.vaidik-fab');
        if (panel && panel.hasAttribute('hidden') && fab) { fab.click(); }
        var input = document.querySelector('.vaidik-form input');
        if (input) { input.value = q; input.focus(); }
      } catch (e) { /* widget unavailable; card content stands alone */ }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
