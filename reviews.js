const filters = [...document.querySelectorAll('.review-filter')];
const cards = [...document.querySelectorAll('.review-card')];
const count = document.querySelector('.review-count');
document.querySelector('.review-tools').hidden=false;
function filterReviews(category){
  filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===category)));
  let total=0;
  cards.forEach(card=>{card.hidden=category!=='tutte'&&card.dataset.category!==category;if(!card.hidden)total++;});
  count.textContent=total+' '+(total===1?'testimonianza':'testimonianze');
}
filters.forEach(button=>button.addEventListener('click',()=>filterReviews(button.dataset.filter)));
// Una storia raggiunta tramite link diretto resta visibile anche dopo un filtro.
window.addEventListener('hashchange',()=>{if(cards.some(card=>'#'+card.id===location.hash))filterReviews('tutte');});
