from playwright.sync_api import sync_playwright
import http.server,threading,functools,json,pathlib
from PIL import Image,ImageDraw
root='/downloads/brahmtatva-kundli-suite'
server=http.server.ThreadingHTTPServer(('127.0.0.1',8765),functools.partial(http.server.SimpleHTTPRequestHandler,directory=root));threading.Thread(target=server.serve_forever,daemon=True).start()
checks=[]
def ck(name,value):
 checks.append({'name':name,'pass':bool(value)})
 assert value,name
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/google-chrome',headless=True,args=['--no-sandbox']);page=b.new_page(viewport={'width':390,'height':844});errors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.goto('http://127.0.0.1:8765/kundli.html');page.wait_for_function('window.BrahmCalc !== undefined')
 # Pure civil converter rejects gaps/folds, supports historical fractional offset.
 vals=page.evaluate('''() => {const f=window.BrahmCalc.civilUTC;return [['gap',()=>f('2026-03-08','02:30','America/New_York')],['fold',()=>f('2026-11-01','01:30','America/New_York')],['invalid',()=>f('2026-02-30','12:00','UTC')],['range',()=>f('1899-01-01','12:00','UTC')],['Kolkata',()=>f('2008-01-26','02:05','Asia/Kolkata')]].map(([id,f])=>{try{return [id,f().toISOString()]}catch(e){return [id,'rejected']}})}''')
 for id,value in vals: ck('civil-'+id, value==('2008-01-25T20:35:00.000Z' if id=='Kolkata' else 'rejected'))
 page.locator('#calculateKundli').click();ck('missing-input-error',not page.locator('#astroError').get_attribute('hidden'))
 page.fill('#birthName','Layout test');page.fill('#astroDate','2008-01-26');page.fill('#birthTime','02:05');page.fill('#citySearch','Motipur');page.locator('#searchCityButton').click();page.locator('.city-pick').first.wait_for();page.locator('.city-pick').first.click();ck('lookup-coords-filled',page.input_value('#latitude')=='26.25267');page.locator('#calculateKundli').click();page.locator('#astroResult').wait_for(state='visible');ck('result-noerror',page.locator('#astroError').get_attribute('hidden') is not None)
 # Native opt-in save and reopen/delete workflow.
 ck('nothing-autosaved',page.evaluate("localStorage.getItem('bt-kundli-v1')===null"));page.locator('#saveBirth').click();ck('save-one',page.evaluate("JSON.parse(localStorage.getItem('bt-kundli-v1')).length===1"));page.locator('#savedCharts summary').click();page.locator('[data-load]').first.click();page.locator('#astroResult').wait_for(state='visible');ck('reopen-result',page.locator('#astroResult h2').text_content()=='Layout test');page.locator('[data-remove]').first.click();ck('delete-entry',page.evaluate("JSON.parse(localStorage.getItem('bt-kundli-v1')).length===0"))
 page.locator('#tab-kundli').click();page.select_option('#chartLayout','south');ck('south-2charts',page.locator('#pane-kundli .south-chart').count()==2);page.locator('#calcTransit').click();ck('transit-results',page.locator('#transitResult .suite-facts>div').count()==9);page.select_option('#chartLayout','north')
 page.locator('#tab-ashtak').click()
 for target,total in [('SAV',337),('Ascendant',49),('Sun',48),('Moon',49),('Mars',39),('Mercury',54),('Jupiter',56),('Venus',52),('Saturn',39)]:
  page.select_option('#ashtakTarget',target);ck('AV-'+target,page.locator('#ashtakValues>p strong').text_content()==str(total));ck('AV12-'+target,page.locator('.suite-bindu article').count()==12)
 page.select_option('#ashtakTarget','SAV');page.locator('#tab-charts').click()
 for n in [1,2,3,4,7,9,10,12,16,20,24,27,30,40,45,60]:
  page.select_option('#division',str(n));ck('D'+str(n),page.locator('#divisionChart h4').text_content().startswith('D'+str(n)+' '))
 page.select_option('#d60Origin','natal');ck('d60switch',page.input_value('#d60Origin')=='natal');page.select_option('#d60Origin','aries');page.select_option('#division','9')
 page.locator('#tab-dasha').click()
 for system in ['vimshottari','yogini']:
  page.select_option('#dashaSystem',system)
  for depth in range(1,5):
   ck(system+'-depth'+str(depth),'स्तर '+str(depth)+'/4' in page.locator('.suite-breadcrumb').inner_text())
   if depth<4: page.locator('[data-period]').first.click()
  ck(system+'-final-disabled',page.locator('[data-period]').first.is_disabled())
  for _ in range(3):page.locator('#dashaUp').click()
 page.select_option('#dashaSystem','vimshottari');page.locator('#tab-kundli').click();page.select_option('#chartLayout','north')
 # Fullpage and result-only screenshots for every panel and width.
 for width in [320,390,1280]:
  page.set_viewport_size({'width':width,'height':900})
  for tab in ['basic','kundli','ashtak','charts','dasha','report']:
   page.locator('#tab-'+tab).click();ck('no-overflow-'+tab+'-'+str(width),not page.evaluate('document.documentElement.scrollWidth>innerWidth'))
   
   if tab=='kundli':
    sun=page.locator('#pane-kundli .suite-planets article').nth(1);sun.screenshot(path='/downloads/baladi-sun-'+str(width)+'.png');ck('baladi-seven-'+str(width),page.locator('#pane-kundli .suite-planets').first.inner_text().count('बालादि: अंश-वर्ग')==7)
   path='/downloads/suite-'+tab+'-'+str(width)+'.png';pathlib.Path('/downloads/result-'+tab+'.html').write_text(page.locator('#astroResult').evaluate('(e)=>e.outerHTML'));page.locator('#astroResult').screenshot(path=path)
  # Readable horizontal contact sheet: every route, full vertical pixels retained at native size.
  imgs=[Image.open('/downloads/suite-'+t+'-'+str(width)+'.png').convert('RGB') for t in ['basic','kundli','ashtak','charts','dasha','report']];canvas=Image.new('RGB',(sum(i.width for i in imgs),max(i.height for i in imgs)+34),'#eee');x=0;dr=ImageDraw.Draw(canvas)
  for t,img in zip(['basic','kundli','ashtak','charts','dasha','report'],imgs): dr.text((x+8,8),t,fill='black');canvas.paste(img,(x,34));x+=img.width
  canvas.save('/downloads/suite-contact-'+str(width)+'.png')
 page.set_viewport_size({'width':1280,'height':900});page.locator('#tab-kundli').click();page.select_option('#chartLayout','north');page.locator('#calcTransit').click();page.emulate_media(media='print');page.pdf(path='/downloads/suite-test-report.pdf',format='A4',print_background=True);page.emulate_media(media='screen')
 page.fill('#astroDate','2099-01-01');page.locator('#calculateKundli').click();page.locator('#astroError').wait_for(state='visible');ck('future-rejected','भविष्य' in page.locator('#astroError').text_content());ck('no-JS-errors',not errors)
 b.close()
server.shutdown();pathlib.Path(root+'/tests/ui-result.json').write_text(json.dumps({'checks':checks,'errors':errors},ensure_ascii=False,indent=2));print(json.dumps({'total':len(checks),'pass':all(x['pass'] for x in checks),'errors':errors}))
