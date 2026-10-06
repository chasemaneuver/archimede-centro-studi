// Preserve links shared before the homepage was shortened.
const movedSections={servizi:'./percorsi.html#servizi',percorsi:'./percorsi.html#percorsi',risorse:'./risorse.html#risorse',faq:'./domande-frequenti.html#faq',recensioni:'./recensioni.html#testimonianze'};
function followMovedSection(){const target=movedSections[location.hash.slice(1)];if(target)location.replace(target);}
followMovedSection();
window.addEventListener('hashchange',followMovedSection);

// Animate each figure once when the statistics enter the viewport.
(() => {
  const figures = [...document.querySelectorAll('[data-count]')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!figures.length || motion.matches || !('IntersectionObserver' in window)) return;
  const formatter = new Intl.NumberFormat('it-IT');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const element = entry.target;
      const output = element.querySelector('span');
      const target = Number(element.dataset.count);
      const decimals = Number(element.dataset.decimals || 0);
      const numberFormat = decimals ? new Intl.NumberFormat('it-IT', {minimumFractionDigits: decimals, maximumFractionDigits: decimals}) : formatter;
      const suffix = element.dataset.suffix || '';
      const start = performance.now();
      const tick = now => {
        const progress = motion.matches ? 1 : Math.min((now - start) / 1600, 1);
        const value = Math.round(target * (1 - Math.pow(1 - progress, 3)) * 10 ** decimals) / 10 ** decimals;
        output.textContent = numberFormat.format(value) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      output.textContent = '0' + suffix;
      requestAnimationFrame(tick);
    });
  }, {threshold: 0.6});
  figures.forEach(element => observer.observe(element));
})();


// Home motion: progressively enhance visible content, preserving static fallbacks.
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  document.body.classList.add('motion-enabled');
  const reveals = [...document.querySelectorAll('.method-visual, .mission-contact, .path-row, .home-stories .review-hero-grid > div')];
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(({target, isIntersecting}) => {
      if (!isIntersecting) return;
      target.classList.remove('motion-pending');
      revealObserver.unobserve(target);
    });
  }, {threshold: .12});
  reveals.forEach(element => {
    element.classList.add('motion-reveal', 'motion-pending');
    revealObserver.observe(element);
  });

  const illustration = document.querySelector('.hero-art');
  illustration?.classList.add('assembly-ready');
  const assemblyObserver = new IntersectionObserver(entries => {
    entries.forEach(({target,isIntersecting}) => {
      if (!isIntersecting) return;
      target.classList.remove('assembly-ready');
      target.classList.add('assembly-enter');
      assemblyObserver.unobserve(target);
    });
  }, {threshold:.15});
  if (illustration) assemblyObserver.observe(illustration);

  const map = document.querySelector('.path-map');
  let scrollFrame = 0;
  const updateLine = () => {
    scrollFrame = 0;
    if (!map) return;
    const bounds = map.getBoundingClientRect();
    const progress = preference.matches ? 1 : Math.max(0, Math.min(1, (innerHeight * .8 - bounds.top) / bounds.height));
    map.style.setProperty('--mission-progress', progress);
  };
  const onScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateLine); };
  addEventListener('scroll', onScroll, {passive:true});
  addEventListener('resize', onScroll);
  updateLine();

  const satellites = [...document.querySelectorAll('.orbit-satellite')];
  const visible = new Set();
  let orbitFrame = 0;
  const alpha = -25 * Math.PI / 180;
  const animate = now => {
    orbitFrame = 0;
    if (preference.matches || document.hidden || !visible.size) return;
    const angle = now / 18000 * Math.PI * 2;
    visible.forEach(satellite => {
      const x = 67 * Math.cos(angle), y = 24 * Math.sin(angle);
      satellite.setAttribute('cx', 70 + x * Math.cos(alpha) - y * Math.sin(alpha));
      satellite.setAttribute('cy', 70 + x * Math.sin(alpha) + y * Math.cos(alpha));
    });
    orbitFrame = requestAnimationFrame(animate);
  };
  const startOrbit = () => { if (!orbitFrame && !document.hidden && !preference.matches && visible.size) orbitFrame = requestAnimationFrame(animate); };
  const orbitObserver = new IntersectionObserver(entries => {
    entries.forEach(({target,isIntersecting}) => {
      target.classList.toggle('orbit-visible', isIntersecting);
      target.querySelectorAll('.orbit-satellite').forEach(satellite => isIntersecting ? visible.add(satellite) : visible.delete(satellite));
    });
    startOrbit();
  });
  document.querySelectorAll('.hero-art, .story-note').forEach(element => orbitObserver.observe(element));
  document.addEventListener('visibilitychange', startOrbit);

  const art = document.querySelector('.hero-art');
  const drawing = art?.querySelector('svg');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  art?.addEventListener('pointermove', event => {
    if (preference.matches || !finePointer.matches || event.pointerType === 'touch') return;
    const bounds = art.getBoundingClientRect();
    drawing.style.transform = `translate(${((event.clientX - bounds.left) / bounds.width - .5) * 8}px,${((event.clientY - bounds.top) / bounds.height - .5) * 8}px)`;
  });
  art?.addEventListener('pointerleave', () => { drawing.style.transform = ''; });
  preference.addEventListener('change', () => {
    if (!preference.matches) { startOrbit(); return; }
    revealObserver.disconnect();
    assemblyObserver.disconnect();
    illustration?.classList.remove('assembly-ready', 'assembly-enter');
    reveals.forEach(element => element.classList.remove('motion-pending'));
    satellites.forEach(satellite => { satellite.setAttribute('cx',124); satellite.setAttribute('cy',46); });
    if (orbitFrame) cancelAnimationFrame(orbitFrame);
    orbitFrame = 0;
    drawing.style.transform = '';
    updateLine();
  });
})();
