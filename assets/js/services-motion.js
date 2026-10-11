// All orbit positions are derived from the visible ellipse, for both graphic classes.
document.querySelectorAll('.services-illustration, .review-connections').forEach(art=>{
 const track=art.querySelector('.services-orbit-track');if(!track)return;
 const satellites=[...art.querySelectorAll('.services-satellite')];
 const cx=Number(track.getAttribute('cx')),cy=Number(track.getAttribute('cy'));
 const rx=Number(track.getAttribute('rx')),ry=Number(track.getAttribute('ry'));
 const alpha=-10*Math.PI/180,preference=matchMedia('(prefers-reduced-motion: reduce)');
 let visible=false,frame=0;
 const place=angle=>satellites.forEach(s=>{const a=angle+Number(s.dataset.phase),x=rx*Math.cos(a),y=ry*Math.sin(a);s.setAttribute('cx',cx+x*Math.cos(alpha)-y*Math.sin(alpha));s.setAttribute('cy',cy+x*Math.sin(alpha)+y*Math.cos(alpha));});
 place(0);
 const tick=now=>{frame=0;if(!visible||document.hidden||preference.matches)return;place(now/18000*Math.PI*2);frame=requestAnimationFrame(tick);};
 const start=()=>{if(!frame&&visible&&!document.hidden&&!preference.matches)frame=requestAnimationFrame(tick);};
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;start();}).observe(art);
 document.addEventListener('visibilitychange',start);
 preference.addEventListener('change',()=>{if(preference.matches){cancelAnimationFrame(frame);frame=0;place(0);}else start();});
});