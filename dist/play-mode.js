/* Keep the complete 3D realm optional; the direct adventure needs no GPU. */
(()=>{'use strict';
 const full=new URLSearchParams(location.search).get('view')==='3d';
 const fallback=()=>{document.body.classList.remove('full-realm');document.body.classList.add('comfortable-realm');let s=document.createElement('script');s.src='comfortable-realm.js?v=city-1';s.onload=()=>{if(new URLSearchParams(location.search).get('view')==='direct')return;const tales=document.createElement('script');tales.src='owl-tales.js?v=city-1';const city=document.createElement('script');city.src='city-realm.js?v=city-1';city.onerror=()=>{document.getElementById('hint').textContent='The city view could not load. Refresh to try again; your progress is kept.';};tales.onload=()=>document.body.append(city);tales.onerror=()=>document.body.append(city);document.body.append(tales);};s.onerror=()=>{document.getElementById('hint').textContent='The adventure could not load. Please refresh this page.';};document.body.append(s);};
 if(!full){fallback();return;}
 document.body.classList.add('full-realm');
 const back=document.createElement('a');back.className='comfort-return';back.href=location.pathname;back.textContent='← Comfortable adventure';document.querySelector('header').append(back);
 const notice=document.createElement('div');notice.id='realmLoading';notice.innerHTML='<strong>Opening the full 3D kingdom…</strong><p>This detailed world can take longer on older devices.</p><a href="'+location.pathname+'">Play the lighter adventure instead</a>';document.querySelector('.scene-wrap').append(notice);
 import('./live-realm.js?v=playable-1').then(()=>{notice.remove();}).catch(()=>{notice.innerHTML='<strong>The 3D realm could not start on this device.</strong><p>Your saved progress is kept.</p><a href="'+location.pathname+'">Open the comfortable adventure</a>';});
})();
