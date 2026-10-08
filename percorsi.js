const canHover=window.matchMedia('(hover: hover) and (pointer: fine)');
document.querySelectorAll('.flip-card').forEach(card=>{
  const front=card.querySelector('.flip-front');
  const back=card.querySelector('.flip-back');
  const button=card.querySelector('.flip-toggle');
  const label=button.querySelector('.flip-toggle-label');
  const title=front.querySelector('h3').textContent;
  let expanded=false;
  let pinned=false;
  function showDetails(open){
    expanded=open;
    card.classList.toggle('is-flipped',open);
    front.setAttribute('aria-hidden',String(open));
    front.inert=open;
    back.setAttribute('aria-hidden',String(!open));
    back.inert=!open;
    button.setAttribute('aria-expanded',String(open));
    const action=open?(pinned?'Torna alla descrizione':'Mantieni aperti i dettagli'):'Scopri i dettagli';
    button.setAttribute('aria-label',`${action}: ${title}`);
    label.textContent=action;
  }
  card.classList.add('is-enhanced');
  button.hidden=false;
  showDetails(false);
  card.addEventListener('pointerenter',event=>{if(canHover.matches&&event.pointerType==='mouse'&&!pinned)showDetails(true);});
  card.addEventListener('pointerleave',()=>{if(!pinned&&!card.contains(document.activeElement))showDetails(false);});
  button.addEventListener('click',()=>{if(pinned){pinned=false;showDetails(false);}else{pinned=true;showDetails(true);}});
  card.addEventListener('focusout',event=>{if(event.relatedTarget&&!card.contains(event.relatedTarget)&&!pinned)showDetails(false);});
  card.addEventListener('keydown',event=>{if(event.key==='Escape'&&expanded){event.preventDefault();pinned=false;showDetails(false);button.focus();}});
});

