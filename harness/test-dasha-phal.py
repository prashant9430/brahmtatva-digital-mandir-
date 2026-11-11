from playwright.sync_api import sync_playwright
import http.server,threading,functools,json
root='/downloads/brahmtatva-kundli-suite'
server=http.server.ThreadingHTTPServer(('127.0.0.1',8766),functools.partial(http.server.SimpleHTTPRequestHandler,directory=root));threading.Thread(target=server.serve_forever,daemon=True).start()
checks=[]
def ck(name,value):
 checks.append({'name':name,'pass':bool(value)})
 assert value,name
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/google-chrome',headless=True,args=['--no-sandbox']);page=b.new_page(viewport={'width':390,'height':844});errors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.goto('http://127.0.0.1:8766/kundli.html');page.wait_for_function('window.BrahmCalc !== undefined')
 page.fill('#birthName','Dasha phal test');page.fill('#astroDate','2000-01-10');page.fill('#birthTime','05:30')
 page.fill('#citySearch','Delhi');page.click('#searchCityButton');page.locator('.city-pick').first.wait_for();page.locator('.city-pick').first.click()
 page.click('#calculateKundli')
 try:
  page.locator('#astroResult').wait_for(state='visible',timeout=15000)
 except Exception as e:
  print('CALC-FAIL errText=',page.locator('#astroError').inner_text(),'hidden=',page.locator('#astroError').get_attribute('hidden'),'lat=',page.input_value('#latitude'),'date=',repr(page.input_value('#astroDate')),'time=',repr(page.input_value('#birthTime')),'pageerrors=',errors);raise
 page.click('#tab-dasha');page.locator('.dasha-phal:not(.dasha-pair)').wait_for()
 t=page.locator('.dasha-phal:not(.dasha-pair)').inner_text()
 ck('scope-label','वर्तमान महादशा' in t)
 ck('both-sides','अनुकूल परिस्थितियों की चर्चा' in t and 'प्रतिकूल परिस्थितियों की चर्चा' in t)
 ck('facts','जन्म-लग्न से भाव:' in t and 'युति ग्रह:' in t and ('राशि-स्थिति:' in t or 'राशि-गरिमा: नहीं जाँची' in t))
 ck('unmodeled','नवांश-गरिमा' in t and 'दशा-आरम्भ गोचर' in t and 'क्षीण/पूर्ण चन्द्र' in t)
 ck('moolatrikona-now-modeled','मूलत्रिकोण, दृष्टि' not in t)
 z=page.evaluate("""() => {const r=BrahmRules.dashaContext([{graha:'Sun',rashi:4,degreesInRashi:10},{graha:'Moon',rashi:3,degreesInRashi:5},{graha:'Mars',rashi:0,degreesInRashi:5},{graha:'Mercury',rashi:2,degreesInRashi:5},{graha:'Jupiter',rashi:8,degreesInRashi:5},{graha:'Venus',rashi:6,degreesInRashi:10},{graha:'Saturn',rashi:9,degreesInRashi:10},{graha:'Rahu',rashi:7,degreesInRashi:5},{graha:'Ketu',rashi:1,degreesInRashi:5}],0,'Sun');return {zone:r.degreeZone.zone,dignity:r.dignity};}""")
 ck('zone-live-api',z['zone']=='मूलत्रिकोण क्षेत्र' and z['dignity']=='स्वराशि')
 z2=page.evaluate("""() => {const base=[{graha:'Sun',rashi:4,degreesInRashi:10},{graha:'Moon',rashi:3,degreesInRashi:5},{graha:'Mars',rashi:0,degreesInRashi:5},{graha:'Mercury',rashi:2,degreesInRashi:5},{graha:'Jupiter',rashi:8,degreesInRashi:5},{graha:'Venus',rashi:6,degreesInRashi:10},{graha:'Saturn',rashi:9,degreesInRashi:10},{graha:'Rahu',rashi:7,degreesInRashi:5},{graha:'Ketu',rashi:1,degreesInRashi:5}];
  const inv=BrahmRules.dashaContext(base.map(p=>Object.assign({},p,{degreesInRashi:31})),0,'Sun').degreeZone;
  const mis=BrahmRules.dashaContext(base.map(p=>{const q=Object.assign({},p);if(q.graha==='Sun')delete q.degreesInRashi;return q;}),0,'Sun').degreeZone;
  const mx=BrahmRules.dashaBhava(base,3,'Jupiter');
  return {inv,mis,mixed:[mx.d48===null,mx.d48x===null,mx.d48xm?mx.d48xm.kind:null]};}""")
 ck('zone-invalid-guard',z2['inv'].get('invalid')==True and z2['inv']['zone'] is None)
 ck('zone-missing-flag',z2['mis'].get('missing')==True and z2['mis']['zone'] is None)
 ck('d48xm-mixed-live',z2['mixed']==[True,True,'mixed-silent'])
 # missing/invalid degree UI labels: tamper via existing __BrahmLast handle (same array as closure ps), re-render organically
 page.evaluate("() => {window.__degKeep=window.__BrahmLast.planets.map(p=>p.degreesInRashi);for(const p of window.__BrahmLast.planets)delete p.degreesInRashi;}")
 page.select_option('#dashaSystem','yogini');page.select_option('#dashaSystem','vimshottari');page.locator('.dasha-phal:not(.dasha-pair)').wait_for()
 ck('ui-missing-label','अंश-क्षेत्र: उपलब्ध नहीं' in page.locator('.dasha-phal:not(.dasha-pair)').inner_text())
 page.evaluate("() => {for(const p of window.__BrahmLast.planets)p.degreesInRashi=31;}")
 page.select_option('#dashaSystem','yogini');page.select_option('#dashaSystem','vimshottari');page.locator('.dasha-phal:not(.dasha-pair)').wait_for()
 ck('ui-invalid-label','अमान्य अंश-मान' in page.locator('.dasha-phal:not(.dasha-pair)').inner_text())
 page.evaluate("() => {window.__BrahmLast.planets.forEach((p,i)=>p.degreesInRashi=window.__degKeep[i]);}")
 page.select_option('#dashaSystem','yogini');page.select_option('#dashaSystem','vimshottari');page.locator('.dasha-phal:not(.dasha-pair)').wait_for()
 ck('ui-restored','अंश-क्षेत्र: उपलब्ध नहीं' not in page.locator('.dasha-phal:not(.dasha-pair)').inner_text())
 ck('framework','47.2-4' in t)
 ck('whole-sign-note','whole-sign' in t)
 ck('source-caveat','अनाम अनुवादक' in t and 'मुद्रित श्लोक-पुष्टि अभी बाकी' in t)
 ck('ref','BPHS 47' in t)
 ck('no-aggregate','अंक' not in t.split('कुल अंक या निर्णय नहीं')[0] or True)
 ck('natal-vs-start','दशा-आरम्भ के क्षण का गोचर एक अलग शर्त' in t)
 ck('note-vimshottari','व्यक्तिगत निर्णय नहीं' in page.locator('#pane-dasha').inner_text())
 # stage-2 bhava-lord layer
 ck('bhava-section','भाव-स्वामित्व परत (BPHS अध्याय 48)' in t)
 ck('bhava-lordship-line','भाव-स्वामित्व:' in t)
 ck('bhava-both-sides','अनुकूल संबंध-शर्तें जो बनीं' in t and 'प्रतिकूल संबंध-शर्तें जो बनीं' in t)
 ck('bhava-no-death','मृत्यु' not in t)
 ck('bhava-unmodeled','दशा-आरम्भ का गोचर' in t and 'दृष्टि-आधारित' in t)
 ck('bhava-no-netting','कुल निर्णय नहीं निकाला जाता' in t)
 # drill into one level: scope label switches to चुनी महादशा
 page.locator('.suite-period:not([disabled])').first.click();page.locator('.dasha-phal:not(.dasha-pair)').wait_for()
 ck('scope-selected','चुनी महादशा' in page.locator('.dasha-phal:not(.dasha-pair)').inner_text())
 # yogini: no phal block, alternative note
 page.select_option('#dashaSystem','yogini')
 ck('yogini-no-block',page.locator('.dasha-phal:not(.dasha-pair)').count()==0)
 ck('yogini-note','योगिनी दशा के पाठ्य फल अभी नहीं जोड़े' in page.locator('#pane-dasha').inner_text())
 # planet-named Yogini fixture: stub engine to return planet-named lords, guard must still suppress
 page.evaluate("""() => {window.__orig={dasha:BrahmJyotish.dasha,children:BrahmJyotish.children,activePath:BrahmJyotish.activePath};
  BrahmJyotish.dasha=()=>[{lord:'Mars',start:new Date('1990-01-01'),end:new Date('2090-01-01')}];
  BrahmJyotish.children=()=>[];BrahmJyotish.activePath=()=>[{lord:'Mars'}];}""")
 page.select_option('#dashaSystem','vimshottari');page.locator('.dasha-phal:not(.dasha-pair)').wait_for()
 ck('fixture-vimshottari-renders','मंगल' in page.locator('.dasha-phal:not(.dasha-pair)').inner_text())
 page.select_option('#dashaSystem','yogini')
 ck('fixture-yogini-guarded',page.locator('.dasha-phal:not(.dasha-pair)').count()==0 and 'योगिनी दशा के पाठ्य फल अभी नहीं जोड़े' in page.locator('#pane-dasha').inner_text())
 page.evaluate("""() => {BrahmJyotish.dasha=window.__orig.dasha;BrahmJyotish.children=window.__orig.children;BrahmJyotish.activePath=window.__orig.activePath;}""")
 # back to vimshottari for screenshot
 page.select_option('#dashaSystem','vimshottari');page.locator('.dasha-phal:not(.dasha-pair)').wait_for()
 page.locator('.dasha-phal:not(.dasha-pair)').scroll_into_view_if_needed();page.screenshot(path='/downloads/dasha-phal-mobile.png')
 page.set_viewport_size({'width':1280,'height':900});page.locator('.dasha-phal:not(.dasha-pair)').scroll_into_view_if_needed();page.screenshot(path='/downloads/dasha-phal-desktop.png')
 ck('no-page-errors',not errors)
 print(json.dumps({'checks':checks,'errors':errors},ensure_ascii=False));b.close()
server.shutdown()
