from pathlib import Path
import re,json,shutil
native=Path('/downloads/brahmtatva-kundli-suite');project=Path('/downloads/kundli-suite-preview/src');assets=project/'native';assets.mkdir(exist_ok=True)
h=(native/'kundli.html').read_text();main=re.search(r'<main class="container">(.*?)</main>',h,re.S).group(1)
# External source links remain genuine links, all hosted opening into separate tabs.
main=re.sub(r'href="(https?[^\"]+)"',r'href="\1" target="_blank" rel="noopener"',main)
main=main.replace('href="astro-licenses.txt"','href="https://brahmtatva.vercel.app/astro-licenses.txt" target="_blank" rel="noopener"')
(project/'template.ts').write_text('export default '+json.dumps(main,ensure_ascii=False)+';')
code="// @ts-nocheck\nexport async function mount(options){\n"+(native/'astro-core.js').read_text()+"\nwindow.BrahmAstro=BrahmAstro;\n"
for f in ['kundli-engine.js','kundli-ashtak.js','kundli-rules.js','kundli-states.js','kundli-relations.js','kundli-print-gallery.js','kundli-suite-ui.js','kundli-ui.js']:
 s=(native/f).read_text();s=s.replace("if(document.getElementById('astroForm'))window.BrahmKundliInit();",'');code+=s+'\n'
code+='await window.BrahmKundliInit(options);\n}\n';(assets/'mount.ts').write_text(code)
for f in ['astro-cities.json','astro-cities-search.json','astro.css','kundli.css','kundli-suite.css']:
 shutil.copy2(native/f,assets/f)
# Only selected CSS from existing design, avoid nav/global scripts.
css=''' .suite-preview{font-family:"Noto Sans Devanagari",sans-serif;color:#56351f;background:#fff8e6;padding:16px;border-radius:14px;--primary-saffron:#a74a0c;--p-maroon:#742b1c;--p-gold:#c69b48;--soft-shadow:0 5px 15px #6c3c0c12;--p-shadow-soft:0 5px 15px #6c3c0c12;--p-shadow-lift:0 10px 24px #6c3c0c12;} .suite-preview *{box-sizing:border-box}.suite-preview h1,.suite-preview h2,.suite-preview h3,.suite-preview h4{font-family:inherit;font-weight:600;line-height:1.5;color:#7b331b}.suite-preview .page-header{padding:20px 0}.suite-preview .page-header h1{font-size:26px}.suite-preview .structure-section{padding:22px;border:1px solid #d8b57c;border-top:3px solid #b97a29;border-radius:14px;margin:20px 0;background:#fffaf0;text-align:left}.suite-preview .preview-status{font-size:12px;border-left:3px solid #a74a0c;padding:12px;background:#f5e6c8}.suite-preview label{display:grid;gap:8px;line-height:1.7}.suite-preview p{font-size:14px;line-height:1.9}.suite-preview .source-note{font-size:12px;line-height:1.8}.suite-preview input,.suite-preview select{font:inherit;min-width:0;max-width:100%}.suite-preview .field-wide{min-width:0}.suite-preview .astro-form-section{max-width:740px}.suite-preview .birth-datetime{grid-template-columns:1fr 1fr}.suite-preview .astro-panel{border:1px solid #dfc08e;border-top:3px solid #c28d3c}.suite-preview #cityLookup{display:block}.suite-preview .suite-tabs button{font-size:13px}.suite-preview .suite-periods span{font-size:12px}@media(max-width:600px){.suite-preview{padding:10px}.suite-preview .structure-section{padding:14px}.suite-preview .birth-datetime{grid-template-columns:1fr}.suite-preview .astro-panel{padding:14px}.suite-preview .suite-result-head h2{font-size:24px!important}}'''
(project/'native.css').write_text(css)
