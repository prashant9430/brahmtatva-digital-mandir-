from playwright.sync_api import sync_playwright
import http.server,threading,functools,json,pathlib
root='/downloads/brahmtatva-kundli-suite';server=http.server.ThreadingHTTPServer(('127.0.0.1',8769),functools.partial(http.server.SimpleHTTPRequestHandler,directory=root));threading.Thread(target=server.serve_forever,daemon=True).start()
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/google-chrome',headless=True,args=['--no-sandbox']);page=b.new_page(viewport={'width':390,'height':844});errors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.goto('http://127.0.0.1:8769/kundli.html');page.wait_for_function('window.BrahmCalc!==undefined');page.fill('#birthName','Synthetic gallery');page.fill('#astroDate','2000-01-01');page.fill('#birthTime','12:00');page.select_option('#city','0');page.click('#calculateKundli');page.locator('#astroResult').wait_for(state='visible');page.click('#tab-kundli')
 checks=[]
 for width in [320,390,1280]:
  page.set_viewport_size({'width':width,'height':900});page.select_option('#relationFrom','Moon');assert page.locator('#relationValues article').count()==6;assert 'नैसर्गिक' in page.locator('#relationValues').inner_text();assert not page.evaluate('document.documentElement.scrollWidth>innerWidth');page.evaluate('window.scrollTo(0,0)');box=page.locator('#relationValues').bounding_box();page.screenshot(path='/downloads/friendship-full.png',full_page=True);from PIL import Image;im=Image.open('/downloads/friendship-full.png');im.crop((box['x'],box['y'],box['x']+box['width'],box['y']+box['height'])).save(f'/downloads/friendship-{width}.png')
 page.set_viewport_size({'width':1280,'height':900});page.evaluate('window.print=()=>{window.__printCalled=true}')
 for layout in ['north','south']:
  page.select_option('#chartLayout',layout);page.click('#printGallery');assert page.evaluate('window.__printCalled');assert page.locator('.gallery-sheet').count()==25;assert page.locator('.gallery-table').count()==9;assert page.locator('.gallery-chart').count()==16
  vals=page.evaluate('''() => {const g=document.querySelector('#kundliGallery'),ids=Array.from(g.querySelectorAll('[id]')).map(x=>x.id),outside=new Set(Array.from(document.querySelectorAll('#astroResult [id]')).filter(x=>!g.contains(x)).map(x=>x.id));return {duplicate:ids.length!==new Set(ids).size,cross:ids.filter(x=>outside.has(x)),tables:Array.from(g.querySelectorAll('table')).map(t=>({title:t.parentElement.querySelector('h3').textContent,total:Number(t.querySelector('tfoot td:last-child').textContent),rows:Array.from(t.querySelectorAll('tbody tr')).map(r=>Array.from(r.querySelectorAll('td')).map(c=>Number(c.textContent)))}))};}''');assert not vals['duplicate'];assert not vals['cross'];assert len(vals['tables'])==9
  for table in vals['tables']:
   assert len(table['rows'])==12
   for row in table['rows']:assert sum(row[:-1])==row[-1]
   assert sum(r[-1] for r in table['rows'])==table['total']
  assert vals['tables'][0]['total']==337
  page.emulate_media(media='print');page.pdf(path=f'/downloads/gallery-{layout}.pdf',format='A4',margin={'top':'10mm','bottom':'10mm','left':'10mm','right':'10mm'},print_background=True);page.emulate_media(media='screen');page.evaluate("window.dispatchEvent(new Event('afterprint'))");assert page.locator('#kundliGallery').count()==0;assert page.evaluate('document.body.dataset.kundliPrint===undefined');assert page.locator('#pane-kundli').is_visible();checks.append({'layout':layout,'sheets':25,'tables':9,'chartIdsUnique':True,'rowSums':True,'SAV':337,'cleanup':True})
 page.click('#printResult');assert page.locator('#kundliGallery').count()==0;page.emulate_media(media='print');page.pdf(path='/downloads/normal-after-gallery.pdf',format='A4',print_background=True);page.emulate_media(media='screen');page.evaluate("window.dispatchEvent(new Event('afterprint'))");assert page.locator('#pane-kundli').is_visible()
 assert not errors;print(json.dumps({'checks':checks,'errors':errors}));b.close()
server.shutdown()
