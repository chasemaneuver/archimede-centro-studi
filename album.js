document.querySelectorAll('.album-gallery').forEach(gallery=>{
 const slides=[...gallery.querySelectorAll('.album-item')];
 const controls=gallery.querySelector('.album-controls');
 let index=0;controls.hidden=false;
 controls.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
  slides[index].hidden=true;
  index=(index+Number(button.dataset.step)+slides.length)%slides.length;
  slides[index].hidden=false;
  controls.querySelector('.album-position').textContent=`${index+1} / ${slides.length}`;
 }));
});
// Keep the selected photo steady while the fan opens beneath the pointer.
document.querySelectorAll('.lab-photo-fan').forEach(fan=>{
 const select=card=>{fan.dataset.active=card.classList.contains('fan-back')?'back':'middle';};
 fan.querySelectorAll('.fan-back,.fan-middle').forEach(card=>{
  card.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')select(card);});
  card.addEventListener('focusin',()=>select(card));
 });
 fan.addEventListener('pointerleave',()=>delete fan.dataset.active);
 fan.addEventListener('focusout',event=>{if(!fan.contains(event.relatedTarget))delete fan.dataset.active;});
});
