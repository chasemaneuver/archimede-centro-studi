const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navigation');
const triggers = [...document.querySelectorAll('.nav-trigger')];
function closeGroups(){triggers.forEach(button=>{button.setAttribute('aria-expanded','false');document.getElementById(button.getAttribute('aria-controls')).hidden=true;});}
function closeMenu(){closeGroups();nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Apri il menu');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';closeGroups();nav.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Chiudi il menu':'Apri il menu');});
triggers.forEach(button=>button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';closeGroups();button.setAttribute('aria-expanded',String(open));document.getElementById(button.getAttribute('aria-controls')).hidden=!open;}));
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;const open=triggers.find(b=>b.getAttribute('aria-expanded')==='true');if(open){closeGroups();open.focus();}else if(toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
nav.addEventListener('focusout',event=>{if(event.relatedTarget&&!nav.contains(event.relatedTarget))closeGroups();});
window.matchMedia('(max-width: 900px)').addEventListener('change',closeMenu);
document.getElementById('year').textContent=new Date().getFullYear();

// Highlight the current page consistently across the shared navigation.
const currentPage=location.pathname.split('/').pop()||'index.html';
nav.querySelectorAll('a').forEach(link=>{const target=new URL(link.href,location.href);if(target.origin===location.origin&&target.pathname.split('/').pop()===currentPage&&!target.hash){link.setAttribute('aria-current','page');link.closest('.nav-group')?.classList.add('current-group');}});

// One accessible image dialog for every image enlargement link on the site.
const imageLinks=[...document.querySelectorAll('a[href]')].filter(link=>link.querySelector('img')&&/\.(png|jpe?g|webp|gif|avif)$/i.test(new URL(link.href).pathname));
if(imageLinks.length){
  const viewer=document.createElement('dialog');
  viewer.className='image-viewer';
  viewer.setAttribute('aria-label','Immagine ingrandita');
  viewer.innerHTML='<button class="image-viewer-close" type="button" aria-label="Chiudi immagine" autofocus><span aria-hidden="true">×</span></button><figure><img alt=""><figcaption></figcaption></figure>';
  document.body.append(viewer);
  const picture=viewer.querySelector('img');
  const caption=viewer.querySelector('figcaption');
  let origin;
  const close=()=>viewer.close();
  viewer.querySelector('button').addEventListener('click',close);
  viewer.addEventListener('click',event=>{if(event.target===viewer)close();});
  viewer.addEventListener('close',()=>{document.body.classList.remove('image-viewer-open');picture.removeAttribute('src');origin?.focus({preventScroll:true});});
  imageLinks.forEach(link=>{
    link.removeAttribute('target');
    link.setAttribute('aria-haspopup','dialog');
    link.addEventListener('click',event=>{
      event.preventDefault();
      origin=link;
      const thumbnail=link.querySelector('img');
      picture.src=link.href;
      picture.alt=thumbnail.alt;
      caption.textContent=link.closest('figure')?.querySelector('figcaption')?.innerText.trim()||thumbnail.alt;
      caption.hidden=!caption.textContent;
      document.body.classList.add('image-viewer-open');
      viewer.showModal();
    });
  });
}
