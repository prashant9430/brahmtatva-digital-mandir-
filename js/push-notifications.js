/* User-initiated opt-in only. No OneSignal request occurs before consent. */
(function () {
  'use strict';
  if (/admin/i.test(location.pathname)) return;
  var box=document.createElement('section');
  box.style.cssText='margin:24px auto;padding:22px;max-width:700px;border:1px solid #c99b4b;border-top:3px solid #c99b4b;border-radius:18px;background:#fff9ed;color:#481c18;font-family:inherit';
  box.innerHTML='<h2 style="font-size:1.25rem;margin:0 0 8px">फोन पर मंदिर की सूचनाएँ</h2><p>पूजा, त्योहार और आवश्यक सूचना के लिए अपनी इच्छा से जुड़ें। अनुमति देने पर आपके browser की subscription और delivery details OneSignal के पास रहेंगी। फोन नंबर नहीं माँगा जाता। कभी भी बंद कर सकते हैं।</p><button type="button" id="bt-push-enable">सूचनाएँ चालू करें</button> <button type="button" id="bt-push-disable" hidden>सूचनाएँ बंद करें</button><p id="bt-push-status" role="status" style="font-size:.9rem"></p><small>iPhone/iPad पर समर्थित Safari में साइट को Home Screen पर जोड़ना पड़ सकता है। Preview की अनुमति live site पर अपने-आप नहीं जाएगी।</small>';
  box.querySelectorAll('button').forEach(function(b){b.style.cssText='padding:11px 20px;margin:10px 6px 4px 0;border:1px solid #a76b19;border-radius:999px;background:#f5c54b;color:#421710;cursor:pointer;min-height:44px';});
  (document.querySelector('footer')||document.body).insertAdjacentElement('beforebegin',box);
  var diagnostic=new URLSearchParams(location.search).get('push-diagnostic')==='1';
  var enable=box.querySelector('#bt-push-enable'),disable=box.querySelector('#bt-push-disable'),status=box.querySelector('#bt-push-status');
  var sdk=null,ready=null,started=0;
  function say(s){status.textContent=s;}
  function stage(s){window.__btPushDiagnostic={stage:s,elapsedMs:started?Date.now()-started:0};}
  function subscribed(){say('सूचनाएँ चालू हैं। Preview पर केवल नियंत्रित test होगा। परीक्षण पहचान: '+String(sdk.User.PushSubscription.id||'').slice(-8));disable.hidden=false;}
  async function initialize(){
    stage('config');
    var controller=new AbortController(),configTimer=setTimeout(function(){controller.abort();},15000);
    var r;try{r=await fetch('api/push/config',{cache:'no-store',signal:controller.signal});}finally{clearTimeout(configTimer);}
    if(!r.ok) throw new Error('config-response');
    var c=await r.json();
    if(!c.enabled) throw new Error('config-disabled');
    stage('sdk-load');
    window.OneSignalDeferred=window.OneSignalDeferred||[];
    return await new Promise(function(resolve,reject){
      // Official SDK config JSONP allows 60 seconds. A 15-second wrapper
      // incorrectly failed on slow networks while init was still running.
      var settled=false;
      var timer=setTimeout(function(){if(!settled){settled=true;reject(new Error('sdk-timeout'));}},70000);
      function fail(e){if(!settled){settled=true;clearTimeout(timer);reject(e);}}
      window.OneSignalDeferred.push(async function(OS){
        try{
          stage('sdk-init');
          await OS.init({appId:c.appId,autoResubscribe:false,promptOptions:{slidedown:{prompts:[{type:'push',autoPrompt:false}]}},welcomeNotification:{disable:true},notifyButton:{enable:false}});
          sdk=OS;stage('ready');
          sdk.User.PushSubscription.addEventListener('change',function(e){disable.hidden=!e.current.optedIn;if(e.current.optedIn)subscribed();});
          if(!settled){settled=true;clearTimeout(timer);resolve(OS);}
          else {enable.disabled=false;enable.textContent='Browser की अनुमति दें';say('Setup अब तैयार है। केवल इच्छा हो तो Browser की अनुमति दें दबाएँ।');}
        }catch(e){fail(e);}
      });
      var script=document.createElement('script');
      script.src='https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';script.defer=true;
      script.onerror=function(){fail(new Error('sdk-network'));};
      document.head.appendChild(script);
    });
  }
  enable.addEventListener('click',async function(){
    if(!('serviceWorker' in navigator)||!('PushManager' in window)||!('Notification' in window)){say('इस browser में push उपलब्ध नहीं है। समर्थित Chrome या Safari इस्तेमाल करें।');return;}
    if(!diagnostic&&Notification.permission==='denied'){say('Browser settings में इस साइट की अनुमति बंद है। आप चाहें तो वहीं बदल सकते हैं।');return;}
    if(/FBAN|FBAV|Instagram|; wv\)/i.test(navigator.userAgent)){say('यह in-app browser हो सकता है। इसी preview link को phone के Chrome में खोलें।');return;}
    enable.disabled=true;
    try{
      if(!sdk){
        if(ready){say('पिछला setup प्रयास पूरा नहीं हुआ। अभी बार-बार न दबाएँ। जाँच code: '+(window.__btPushDiagnostic||{}).stage);return;}
        started=Date.now();say('सुरक्षित notification setup जुड़ रहा है। धीमे network पर एक मिनट लग सकता है। अभी Allow नहीं माँगा गया है।');
        ready=initialize();await ready;
        if(diagnostic){say('Setup diagnostic: SDK ready. कोई permission या push send नहीं हुआ।');return;}
        if(sdk.User.PushSubscription.optedIn){subscribed();return;}
        enable.textContent='Browser की अनुमति दें';say('Setup तैयार है। अब अनुमति वाले बटन को दबाएँ। Browser आपसे पूछेगा।');return;
      }
      if(diagnostic){say('Setup diagnostic: SDK ready. कोई permission या push send नहीं हुआ।');return;}
      stage('permission');await sdk.Notifications.requestPermission();
      if(Notification.permission==='granted')await sdk.User.PushSubscription.optIn();
      if(sdk.User.PushSubscription.optedIn){stage('subscribed');subscribed();}
      else say('अनुमति नहीं मिली। कोई बात नहीं, वेबसाइट बिना notifications के भी काम करेगी।');
    }catch(e){
      var s=(window.__btPushDiagnostic||{}).stage||'unknown';
      var msg=String(e.message||e);var code=/^(sdk-network|sdk-timeout|config-response|config-disabled)$/.test(msg)?msg:s+'-error';
      window.__btPushDiagnostic={stage:s,code:code,name:String(e.name||'Error'),message:msg.slice(0,500),elapsedMs:Date.now()-started};
      say('सूचनाओं का setup पूरा नहीं हुआ। जाँच code: '+code+'. अभी दोबारा Allow न दबाएँ।');
    }finally{enable.disabled=false;}
  });
  disable.addEventListener('click',async function(){try{await sdk.User.PushSubscription.optOut();say('सूचनाएँ बंद हैं।');disable.hidden=true;}catch(e){say('बंद करने के लिए browser की site notification settings इस्तेमाल करें।');}});
})();
