document.querySelectorAll('.guide-gallery').forEach(gallery => {
  const track = gallery.querySelector('.guide-track');
  const cards = [...track.querySelectorAll('.resource-card')];
  const controls = gallery.querySelector('.guide-controls');
  const previous = gallery.querySelector('.guide-prev');
  const next = gallery.querySelector('.guide-next');
  const position = gallery.querySelector('.guide-position');
  if (cards.length < 2) return;
  controls.hidden = false;
  gallery.classList.add('is-enhanced');
  let current = 0, scrollFrame = 0;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function update() {
    const left = track.getBoundingClientRect().left;
    let distance = Infinity;
    cards.forEach((card, index) => {
      const nextDistance = Math.abs(card.getBoundingClientRect().left - left);
      if (nextDistance < distance) { distance = nextDistance; current = index; }
    });
    previous.disabled = current === 0;
    next.disabled = current === cards.length - 1;
    const label = `Capitolo ${current + 1} di ${cards.length}`;
    if (position.textContent !== label) position.textContent = label;
  }
  function go(index) {
    const target = Math.max(0, Math.min(cards.length - 1, index));
    track.scrollTo({left: track.scrollLeft + cards[target].getBoundingClientRect().left - track.getBoundingClientRect().left, behavior: reduced.matches ? 'auto' : 'smooth'});
  }
  previous.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  const scheduleUpdate = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; update(); });
  };
  track.addEventListener('scroll', scheduleUpdate, {passive: true});
  track.addEventListener('keydown', event => {
    if (event.target !== track || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); go(current + (event.key === 'ArrowRight' ? 1 : -1));
  });
  new ResizeObserver(scheduleUpdate).observe(track);
  update();
});
