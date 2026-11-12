from playwright.sync_api import sync_playwright
import http.server,threading,functools,json
root='/downloads/brahmtatva-kundli-suite'
server=http.server.ThreadingHTTPServer(('127.0.0.1',8767),functools.partial(http.server.SimpleHTTPRequestHandler,directory=root));threading.Thread(target=server.serve_forever,daemon=True).start()
checks=[]
def ck(name,value):
 checks.append({'name':name,'pass':bool(value)})
 assert value,name
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/google-chrome',headless=True,args=['--no-sandbox']);page=b.new_page(viewport={'width':390,'height':844});errors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.goto('http://127.0.0.1:8767/kundli.html');page.wait_for_function('window.BrahmCalc !== undefined')
 page.fill('#birthName','Antardasha test');page.fill('#astroDate','2000-01-10');page.fill('#birthTime','05:30')
 page.fill('#citySearch','Delhi');page.click('#searchCityButton');page.locator('.city-pick').first.wait_for();page.locator('.city-pick').first.click()
 page.click('#calculateKundli');page.locator('#astroResult').wait_for(state='visible',timeout=15000)
 page.click('#tab-dasha');page.locator('.dasha-pair').wait_for()
 t=page.locator('.dasha-pair').inner_text()
 ck('pair-scope-current','वर्तमान अंतर्दशा' in t)
 ck('pair-facts','अंतर्दशा-स्वामी, जन्म-लग्न से भाव:' in t and 'महादशा-स्वामी (' in t and 'राशि-सापेक्ष whole-sign पठन' in t)
 ck('pair-both-sides','अनुकूल शर्तें जो बनीं' in t and 'प्रतिकूल शर्तें जो बनीं' in t and 'अनुकूल परिस्थितियों की चर्चा' in t and 'प्रतिकूल परिस्थितियों की चर्चा' in t)
 ck('pair-pair-local-note','अन्य युग्मों से मिश्रित नहीं की गईं' in t)
 ck('pair-omission-note','लोप-सूचना' in t)
 ck('pair-no-remedy-text','मृत्युंजय' not in t and 'सहस्रनाम' not in t and 'सप्तशती' not in t and 'आकाल' not in t)
 ck('pair-no-aggregate','कुल अंक या निर्णय नहीं' in t)
 ck('pair-unmodeled','नवांश-गरिमा' in t and 'बल-गणना (शड्बल)' in t and 'गोचर-शर्तें' in t)
 ck('pair-source-caveat','अनाम अनुवादक' in t and 'मुद्रित श्लोक-पुष्टि अभी बाकी' in t)
 ck('pair-chapter-ref','BPHS 5' in t)
 # live API fixtures through the page
 z=page.evaluate("""() => {const base=[{graha:'Sun',rashi:4,degreesInRashi:10},{graha:'Moon',rashi:3,degreesInRashi:5},{graha:'Mars',rashi:0,degreesInRashi:5},{graha:'Mercury',rashi:2,degreesInRashi:5},{graha:'Jupiter',rashi:8,degreesInRashi:5},{graha:'Venus',rashi:6,degreesInRashi:10},{graha:'Saturn',rashi:0,degreesInRashi:10},{graha:'Rahu',rashi:7,degreesInRashi:5},{graha:'Ketu',rashi:1,degreesInRashi:5}];
  const mk=BrahmRules.dashaPairContext(base,0,'Mercury','Ketu','shukla');
  const mr=BrahmRules.dashaPairContext(base,0,'Mercury','Rahu','shukla');
  const wk=BrahmRules.dashaPairContext(base,0,'Jupiter','Moon','krishna');
  const ms=BrahmRules.dashaPairContext(base,0,'Mars','Saturn','shukla');
  const ex=base.map(p=>({...p}));ex.find(p=>p.graha==='Saturn').rashi=6;
  const msx=BrahmRules.dashaPairContext(ex,0,'Mars','Saturn','shukla');
  return {prov:mk.omissions.join(' '),gap:mr.omissions.join(' '),weak:wk.notes.join(' '),weakFavH:wk.favH.length,ms:ms.omissions.join(' '),msxFavH:msx.favH.map(x=>x.basis).join(' '),msxNotes:msx.notes.join(' ')};}""")
 ck('live-provenance-note','स्वामित्व-टिप्पणी' in z['prov'])
 ck('live-gap-note','58.50' in z['gap'])
 ck('live-weak-unevaluated','अनियंत्रित' in z['weak'])
 # Mars-Saturn carries the remedy-omission note (ch54.33-35 prescribed Mrityunjaya passage, content omitted)
 ck('live-remedy-omission-note','उपाय/दान/जप' in z['ms'])
 # Mars-Saturn digk nav-only - exalted rashi Saturn triggers NO rashi dignity hit, only the nav/text notes
 ck('live-mars-saturn-nav-only',('गरिमा की अनुकूल शर्त' not in z['msxFavH']) and 'नामित गरिमा-शर्त' in z['msxNotes'] and 'नवांश-गरिमा भी शर्त' in z['msxNotes'])
 # drill level 1: scope switches to chosen mahadasha's current antardasha
 page.locator('.suite-period.is-active').first.click();page.locator('.dasha-pair').wait_for()
 ck('pair-scope-level1','चुनी महादशा की वर्तमान अंतर्दशा' in page.locator('.dasha-pair').inner_text())
 # drill level 2: chosen pair
 page.locator('.suite-period.is-active').first.click();page.locator('.dasha-pair').wait_for()
 t2=page.locator('.dasha-pair').inner_text()
 ck('pair-scope-level2','चुनी अंतर्दशा' in t2 and ' / ' in page.locator('.dasha-pair h4').inner_text())
 ck('pair-level2-no-duplicate-scope',page.locator('.dasha-pair').count()==1)
 # drill level 3: deferral note, no pair block
 page.locator('.suite-period:not([disabled])').first.click()
 ck('pair-deferral-level3','प्रत्यन्तर/सूक्ष्म स्तर की पाठ्य फल-चर्चा अभी स्थगित' in page.locator('#pane-dasha').inner_text() and page.locator('.dasha-pair').count()==0)
 page.locator('#dashaUp').click();page.locator('#dashaUp').click();page.locator('#dashaUp').click()
 # yogini guard: pair block suppressed
 page.select_option('#dashaSystem','yogini')
 ck('pair-yogini-guarded',page.locator('.dasha-pair').count()==0 and 'योगिनी दशा के पाठ्य फल अभी नहीं जोड़े' in page.locator('#pane-dasha').inner_text())
 page.select_option('#dashaSystem','vimshottari');page.locator('.dasha-pair').wait_for()
 # screenshots (real-chart renders for review)
 page.locator('.dasha-pair').scroll_into_view_if_needed();page.screenshot(path='/downloads/antardasha-pair-mobile.png')
 page.set_viewport_size({'width':1280,'height':900});page.locator('.dasha-pair').scroll_into_view_if_needed();page.screenshot(path='/downloads/antardasha-pair-desktop.png')
 page.locator('.suite-period:not([disabled])').first.click();page.locator('.suite-period:not([disabled])').first.click();page.locator('.dasha-pair').scroll_into_view_if_needed();page.screenshot(path='/downloads/antardasha-pair-level2-desktop.png')
 ck('no-page-errors',not errors)
 print(json.dumps({'checks':checks,'errors':errors},ensure_ascii=False));b.close()
server.shutdown()
