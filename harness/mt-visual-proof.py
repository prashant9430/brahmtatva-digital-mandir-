from playwright.sync_api import sync_playwright
import http.server,threading,functools,json,datetime
root='/downloads/brahmtatva-kundli-suite'
server=http.server.ThreadingHTTPServer(('127.0.0.1',8767),functools.partial(http.server.SimpleHTTPRequestHandler,directory=root));threading.Thread(target=server.serve_forever,daemon=True).start()
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/google-chrome',headless=True,args=['--no-sandbox']);page=b.new_page(viewport={'width':390,'height':844});page.goto('http://127.0.0.1:8767/kundli.html');page.wait_for_function('window.BrahmCalc !== undefined')
 found=page.evaluate("""() => {
  const A=BrahmAstro,J=BrahmJyotish;
  const loc={latitude:28.6139,longitude:77.209,timeZone:'Asia/Kolkata'};
  const MT={Sun:[4,0,20],Mars:[0,0,12],Jupiter:[8,0,10],Venus:[6,0,15],Saturn:[10,0,20]};
  let chartA=null;
  for(let t=Date.UTC(1985,0,1);t<Date.UTC(2005,0,1)&&!chartA;t+=86400000){
   const d=new Date(t),ps=A.grahaPositions(d,{node:'mean'});
   const all=J.dasha(ps.find(p=>p.graha==='Moon').longitude,d,'vimshottari',2);
   const active=J.activePath(all,Date.now());if(!active||!active[0])continue;
   const lord=active[0].lord;if(!MT[lord])continue;
   const pl=ps.find(q=>q.graha===lord),[sr,a,bb]=MT[lord];
   if(pl.rashi!==sr||pl.degreesInRashi<a+0.02||pl.degreesInRashi>bb-0.02)continue;
   const lagna=A.siderealLagna(d,loc),asc=Math.floor(lagna/30),h=(pl.rashi-asc+12)%12+1;
   if([6,8,12].includes(h))continue;
   chartA={iso:d.toISOString(),lord,deg:pl.degreesInRashi,house:h};
  }
  let chartB=null;
  for(let t=Date.UTC(1999,0,1);t<Date.UTC(2000,0,1)&&!chartB;t+=7200000){
   const d=new Date(t),m=A.grahaPositions(d,{node:'mean'}).find(p=>p.graha==='Moon');
   if(m.rashi===1&&m.degreesInRashi>2.5&&m.degreesInRashi<3.5){
    let lo=t-7200000,hi=t+7200000;
    for(let i=0;i<40;i++){const mid=(lo+hi)/2,mm=A.grahaPositions(new Date(mid),{node:'mean'}).find(p=>p.graha==='Moon');
     if(mm.rashi===1&&mm.degreesInRashi>=3.0)hi=mid;else lo=mid;}
    const d2=new Date(hi+30000),m2=A.grahaPositions(d2,{node:'mean'}).find(p=>p.graha==='Moon');
    if(m2.rashi===1&&m2.degreesInRashi>3.0&&m2.degreesInRashi<3.01)chartB={iso:d2.toISOString(),deg:m2.degreesInRashi};
   }
  }
  return {chartA,chartB};}""")
 print('FOUND',json.dumps(found))
 assert found['chartA'] and found['chartB']
 def fill_and_calc(iso):
  ist=iso.astimezone(datetime.timezone(datetime.timedelta(hours=5,minutes=30)))
  page.fill('#birthName','MT visual proof');page.fill('#astroDate',ist.strftime('%Y-%m-%d'));page.fill('#birthTime',ist.strftime('%H:%M'))
  page.fill('#citySearch','Delhi');page.click('#searchCityButton');page.locator('.city-pick').first.wait_for();page.locator('.city-pick').first.click()
  page.click('#calculateKundli');page.locator('#astroResult').wait_for(state='visible',timeout=15000)
  page.click('#tab-dasha');page.locator('.dasha-phal').wait_for()
 def ist(iso):
  return datetime.datetime.fromisoformat(iso.replace('Z','+00:00'))
 # Chart A: current mahadasha lord in MT zone, good house -> facts row + d48x
 fill_and_calc(ist(found['chartA']['iso']))
 t=page.locator('.dasha-phal').inner_text()
 assert 'अंश-क्षेत्र: मूलत्रिकोण क्षेत्र' in t,t
 assert 'विस्तृत पठन' in t,t
 page.locator('.dasha-phal').scroll_into_view_if_needed();page.screenshot(path='/downloads/mt-facts-d48x-mobile.png')
 page.set_viewport_size({'width':1280,'height':1000});page.locator('.dasha-phal').scroll_into_view_if_needed();page.screenshot(path='/downloads/mt-facts-d48x-desktop.png')
 page.set_viewport_size({'width':390,'height':844})
 print('CHART-A-OK lord=',found['chartA']['lord'],'deg=',found['chartA']['deg'],'house=',found['chartA']['house'])
 # Chart B: Moon near Taurus 3.00 -> drill into Moon mahadasha -> boundary note
 fill_and_calc(ist(found['chartB']['iso']))
 page.locator('.suite-period',has_text='चन्द्र').first.click();page.locator('.dasha-phal').wait_for()
 t=page.locator('.dasha-phal').inner_text()
 assert 'सावधानीवश कोई क्षेत्र-लेबल नहीं' in t,t
 page.locator('.dasha-phal').scroll_into_view_if_needed();page.screenshot(path='/downloads/mt-boundary-note.png')
 print('CHART-B-OK deg=',found['chartB']['deg'])
 b.close()
server.shutdown()
