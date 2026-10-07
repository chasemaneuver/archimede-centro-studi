(() => {
 const art=document.querySelector('.services-illustration');
 if(!art)return;
 const satellites=[...art.querySelectorAll('.services-satellite')];
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const alpha=-10*Math.PI/180;
 let visible=false, frame=0;
 const place=angle=>satellites.forEach(s=>{
  const a=angle+Number(s.dataset.phase), x=267*Math.cos(a), y=199*Math.sin(a);
  s.setAttribute('cx',310+x*Math.cos(alpha)-y*Math.sin(alpha));
  s.setAttribute('cy',250+x*Math.sin(alpha)+y*Math.cos(alpha));
 });
 place(0);
 const tick=now=>{frame=0;if(!visible||document.hidden||preference.matches)return;place(now/18000*Math.PI*2);frame=requestAnimationFrame(tick);};
 const start=()=>{if(!frame&&visible&&!document.hidden&&!preference.matches)frame=requestAnimationFrame(tick);};
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;start();});observer.observe(art);
 document.addEventListener('visibilitychange',start);
 preference.addEventListener('change',()=>{if(preference.matches){cancelAnimationFrame(frame);frame=0;place(0);}else start();});
})();