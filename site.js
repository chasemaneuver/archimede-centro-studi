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
