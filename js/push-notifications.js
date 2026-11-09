/* User-initiated opt-in only. No OneSignal request occurs before consent. */
(function () {
  'use strict';
  if (/admin/i.test(location.pathname)) return;
  var box = document.createElement('section');
  box.style.cssText='margin:24px auto;padding:22px;max-width:700px;border:1px solid #c99b4b;border-top:3px solid #c99b4b;border-radius:18px;background:#fff9ed;color:#481c18;font-family:inherit';
  box.innerHTML='<h2 style="font-size:1.25rem;margin:0 0 8px">फोन पर मंदिर की सूचनाएँ</h2><p>पूजा, त्योहार और आवश्यक सूचना के लिए अपनी इच्छा से जुड़ें। अनुमति देने पर आपके browser की subscription और delivery details OneSignal के पास रहेंगी। फोन नंबर नहीं माँगा जाता। कभी भी बंद कर सकते हैं।</p><button type="button" id="bt-push-enable">सूचनाएँ चालू करें</button> <button type="button" id="bt-push-disable" hidden>सूचनाएँ बंद करें</button><p id="bt-push-status" role="status" style="font-size:.9rem"></p><small>iPhone/iPad पर समर्थित Safari में साइट को Home Screen पर जोड़ना पड़ सकता है। Preview की अनुमति live site पर अपने-आप नहीं जाएगी।</small>';
  box.querySelectorAll('button').forEach(function(b){b.style.cssText='padding:11px 20px;margin:10px 6px 4px 0;border:1px solid #a76b19;border-radius:999px;background:#f5c54b;color:#421710;font:600 14px inherit;cursor:pointer;min-height:44px';});
  (document.querySelector('footer') || document.body).insertAdjacentElement('beforebegin',box);
  var enable=box.querySelector('#bt-push-enable'), disable=box.querySelector('#bt-push-disable'), status=box.querySelector('#bt-push-status'), sdk=null;
  function say(s){status.textContent=s;}
  function subscribed(){var id=sdk.User.PushSubscription.id || '';say('सूचनाएँ चालू हैं। Preview पर केवल नियंत्रित test होगा। परीक्षण पहचान: '+id.slice(-8));disable.hidden=false;}
  enable.addEventListener('click', async function () {
    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {say('इस browser में push उपलब्ध नहीं है। समर्थित browser इस्तेमाल करें।'); return;}
    if (Notification.permission==='denied') {say('Browser settings में इस साइट की अनुमति बंद है। आप चाहें तो वहीं बदल सकते हैं।'); return;}
    enable.disabled=true;
    try {
      if (!sdk) {
        var r=await fetch('api/push/config',{cache:'no-store'}), c=await r.json();
        if (!c.enabled) {say('इस preview पर notification setup की जाँच बाकी है। अभी कोई अनुमति नहीं माँगी गई।'); return;}
        window.OneSignalDeferred=window.OneSignalDeferred||[];
        var ready=new Promise(function(resolve,reject){
          var timer=setTimeout(function(){reject(new Error('timeout'));},15000);
          window.OneSignalDeferred.push(async function(OS){try{await OS.init({appId:c.appId,autoResubscribe:false,promptOptions:{slidedown:{prompts:[{type:'push',autoPrompt:false}]}},welcomeNotification:{disable:true},notifyButton:{enable:false}});clearTimeout(timer);resolve(OS);}catch(e){clearTimeout(timer);reject(e);}});
        });
        var script=document.createElement('script');script.src='https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';script.defer=true;document.head.appendChild(script);sdk=await ready;sdk.User.PushSubscription.addEventListener('change',function(e){disable.hidden=!e.current.optedIn;if(e.current.optedIn)subscribed();});enable.textContent='Browser की अनुमति दें';say('अब अनुमति वाले बटन को दबाएँ। Browser आपसे पूछेगा।');return;
      }
      await sdk.Notifications.requestPermission();if(Notification.permission==='granted')await sdk.User.PushSubscription.optIn();
      if(sdk.User.PushSubscription.optedIn){subscribed();}
      else say('अनुमति नहीं मिली। कोई बात नहीं, वेबसाइट बिना notifications के भी काम करेगी।');
    } catch(e){say('सूचनाएँ अभी चालू नहीं हो सकीं। थोड़ी देर बाद दोबारा कोशिश कर सकते हैं।');}
    finally{enable.disabled=false;}
  });
  disable.addEventListener('click',async function(){try{await sdk.User.PushSubscription.optOut();say('सूचनाएँ बंद हैं।');disable.hidden=true;}catch(e){say('बंद करने के लिए browser की site notification settings इस्तेमाल करें।');}});
})();
