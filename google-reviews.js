const googleCards = [...document.querySelectorAll('.google-card')];
const googleMore = document.querySelector('.google-more');
const googleMoreButton = document.getElementById('google-more');
const googleCount = document.querySelector('.google-count');
let visibleGoogleReviews = 6;
function updateGoogleReviews() {
  googleCards.forEach((card,index) => {card.hidden = index >= visibleGoogleReviews;});
  googleCount.textContent = `${Math.min(visibleGoogleReviews,googleCards.length)} di ${googleCards.length} recensioni`;
  googleMoreButton.hidden = visibleGoogleReviews >= googleCards.length;
}
googleMore.hidden = false;
updateGoogleReviews();
googleMoreButton.addEventListener('click',()=>{
  const next = googleCards[visibleGoogleReviews];
  visibleGoogleReviews += 6;
  updateGoogleReviews();
  if(next){next.querySelector('a').focus({preventScroll:true});}
});
