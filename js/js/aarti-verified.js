(function(){
  'use strict';
  const get=id=>document.getElementById(id), reader=get('verifiedReader');
  if(!reader)return;
  document.querySelectorAll('[data-aarti-text]').forEach(button=>button.addEventListener('click',()=>{
    const a=(window.verifiedAartis||[]).find(item=>item.id===button.dataset.aartiText);
    if(!a)return;
    reader.hidden=false;get('verifiedImages').classList.remove('zoomed');get('zoomVerified').setAttribute('aria-pressed','false');get('zoomVerified').textContent='पन्ना बड़ा करके पढ़ें';
    get('verifiedTitle').textContent=a.deity+' की आरती · '+a.title;
    get('verifiedNote').textContent=a.note;
    get('verifiedVerses').replaceChildren(...(a.verses||[]).map((text,i)=>{
      const p=document.createElement('p');p.textContent=text;if(!i)p.className='refrain';return p;
    }));
    get('verifiedBook').textContent=a.book+' · '+a.pages+'। '+a.edition+'।';
    get('verifiedBookLink').href=a.url;
    get('verifiedSources').open=false;get('zoomVerified').hidden=!a.images.length;
    get('verifiedImages').replaceChildren(...a.images.map((path,i)=>{
      const f=document.createElement('figure'),im=document.createElement('img'),cap=document.createElement('figcaption');
      im.src=path;im.alt=a.book+' में '+a.deity+' की आरती का मूल पन्ना '+(i+1);im.loading='lazy';im.decoding='async';
      cap.textContent='आरती का पुस्तक-अंश '+(i+1)+' / '+a.images.length+' · ';const full=document.createElement('a');full.href=a.fullImages[i];full.target='_blank';full.rel='noopener noreferrer';full.textContent='पूरा पन्ना खोलें ↗';cap.append(full);f.append(im,cap);return f;
    }));
    reader.scrollIntoView({behavior:'smooth',block:'start'});
  }));
  document.querySelectorAll('[data-source]').forEach(button=>button.addEventListener('click',()=>{reader.hidden=true;}));
  get('zoomVerified').addEventListener('click',()=>{const on=get('verifiedImages').classList.toggle('zoomed');get('zoomVerified').setAttribute('aria-pressed',String(on));get('zoomVerified').textContent=on?'पन्ना फिट करें':'पन्ना बड़ा करके पढ़ें';});
  get('closeVerified').addEventListener('click',()=>{reader.hidden=true;document.querySelector('.deity-grid').scrollIntoView({behavior:'smooth',block:'start'});});
})();
