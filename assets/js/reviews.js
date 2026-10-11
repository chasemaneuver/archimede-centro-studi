const filters = [...document.querySelectorAll('.review-filter')];
const cards = [...document.querySelectorAll('.review-card')];
const count = document.querySelector('.review-count');
const reviewMore = document.querySelector('.review-more');
const reviewMoreButton = document.getElementById('review-more');
let category = 'tutte';
let visibleReviews = 3;
document.querySelector('.review-tools').hidden = false;
reviewMore.hidden = false;
function matchingReviews() {
  return cards.filter(card => category === 'tutte' || card.dataset.category === category);
}
function renderReviews() {
  const matching = matchingReviews();
  const shown = new Set(matching.slice(0, visibleReviews));
  cards.forEach(card => {card.hidden = !shown.has(card);});
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  count.textContent = shown.size + ' di ' + matching.length + ' recensioni';
  reviewMoreButton.hidden = visibleReviews >= matching.length;
}
filters.forEach(button => button.addEventListener('click', () => {
  category = button.dataset.filter;
  visibleReviews = 3;
  renderReviews();
}));
reviewMoreButton.addEventListener('click', () => {
  const next = matchingReviews()[visibleReviews];
  visibleReviews += 3;
  renderReviews();
  if (next) {
    next.tabIndex = -1;
    next.focus({preventScroll: true});
  }
});
// Reveal a review reached by a direct link outside the first three.
function revealLinkedReview() {
  const index = cards.findIndex(card => '#' + card.id === location.hash);
  if (index < 0) return;
  category = 'tutte';
  visibleReviews = Math.ceil((index + 1) / 3) * 3;
  renderReviews();
  cards[index].scrollIntoView({block: 'start'});
}
renderReviews();
revealLinkedReview();
window.addEventListener('hashchange', revealLinkedReview);
