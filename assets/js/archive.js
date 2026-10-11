// Static archive content stays readable without JavaScript.
document.querySelectorAll('.archive-filters').forEach(group=>{
 const buttons=[...group.querySelectorAll('button')];
 const key=buttons[0].hasAttribute('data-tag')?'tag':'kind';
 const cards=[...document.querySelectorAll(key==='tag'?'.archive-card[data-tags]':'.archive-photo')];
 const tagsFor=card=>{try{const tags=JSON.parse(card.dataset.tags);if(Array.isArray(tags))return tags;}catch{}return card.dataset.tags.split(' ');};
 const select=value=>{buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[key]===value)));cards.forEach(c=>c.hidden=Boolean(value)&&!(key==='tag'?tagsFor(c).includes(value):c.dataset.kind===value));};
 buttons.forEach(b=>b.addEventListener('click',()=>select(b.dataset[key])));
 const requested=new URLSearchParams(location.search).get(key);if(requested&&buttons.some(b=>b.dataset[key]===requested))select(requested);
});
const current=document.getElementById('events-current'),past=document.getElementById('events-past');
if(current&&past){const today=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Rome'}).format(new Date());document.querySelectorAll('.event-card').forEach(card=>{if(card.dataset.end<today){past.append(card);if(card.dataset.status!=='cancelled')card.querySelector('.event-status').textContent='Concluso';}});document.getElementById('events-empty').hidden=past.children.length>0;if(!current.children.length){const text=document.createElement('p');text.textContent='Al momento non ci sono iniziative in corso.';current.append(text);}}
