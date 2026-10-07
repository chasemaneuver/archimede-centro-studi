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