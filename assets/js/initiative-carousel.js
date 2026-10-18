document.querySelectorAll('.home-initiatives').forEach(carousel => {
  const track = carousel.querySelector('.initiative-track');
  const slides = [...track.querySelectorAll('.initiative-banner')];
  const controls = carousel.querySelector('.initiative-controls');
  if (slides.length < 2) return;
  const previous = controls.querySelector('.initiative-prev');
  const next = controls.querySelector('.initiative-next');
  const pause = controls.querySelector('.initiative-pause');
  const position = controls.querySelector('.initiative-position');
  const announcement = carousel.querySelector('.initiative-announcement');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, timer, userPaused = false, hovered = false, inView = false, resumeWithFocus = false;
  controls.hidden = false;
  carousel.classList.add('is-enhanced');
  function stop() { clearTimeout(timer); }
  function schedule() {
    stop();
    if (userPaused || reduced.matches || hovered || document.hidden || !inView || (carousel.contains(document.activeElement) && !resumeWithFocus)) return;
    timer = setTimeout(() => { go(current + 1, false); schedule(); }, 4000);
  }
  function buttonState() {
    pause.hidden = reduced.matches;
    pause.textContent = userPaused ? 'Riprendi' : 'Pausa';
    pause.setAttribute('aria-pressed', String(userPaused));
    pause.setAttribute('aria-label', userPaused ? 'Riprendi lo scorrimento automatico' : 'Metti in pausa lo scorrimento automatico');
  }
  function update() {
    const left = track.getBoundingClientRect().left;
    current = slides.reduce((best, slide, index) => Math.abs(slide.getBoundingClientRect().left - left) < Math.abs(slides[best].getBoundingClientRect().left - left) ? index : best, 0);
    slides.forEach((slide, index) => { slide.inert = index !== current; slide.setAttribute('aria-hidden', String(index !== current)); });
    position.textContent = `${current + 1} / ${slides.length}`;
  }
  function go(index, manual = true, smooth = true) {
    const target = (index + slides.length) % slides.length;
    if (manual) { userPaused = true; resumeWithFocus = false; buttonState(); }
    track.scrollTo({left: track.scrollLeft + slides[target].getBoundingClientRect().left - track.getBoundingClientRect().left, behavior: smooth && !reduced.matches ? 'smooth' : 'auto'});
    if (manual) announcement.textContent = `${target + 1} di ${slides.length}: ${slides[target].querySelector('h2').textContent}`;
    schedule();
  }
  previous.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  pause.addEventListener('click', () => { userPaused = !userPaused; resumeWithFocus = !userPaused; buttonState(); schedule(); });
  track.addEventListener('scroll', update, {passive: true});
  track.addEventListener('pointerdown', event => { if (event.pointerType !== 'mouse') { userPaused = true; buttonState(); stop(); } });
  track.addEventListener('keydown', event => {
    if (event.target !== track || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); go(current + (event.key === 'ArrowRight' ? 1 : -1));
  });
  carousel.addEventListener('mouseenter', () => { hovered = true; stop(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', () => { resumeWithFocus = false; stop(); });
  carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) { resumeWithFocus = false; schedule(); } });
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', () => { buttonState(); schedule(); });
  new IntersectionObserver(entries => { inView = entries[0].isIntersecting; schedule(); }, {threshold: 0.2}).observe(carousel);
  new ResizeObserver(() => go(current, false, false)).observe(track);
  update(); buttonState();
});
