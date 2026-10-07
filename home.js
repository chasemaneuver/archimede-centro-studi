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

  let waterFrame = 0;
  const animateWater = container => {
    const shape = container.querySelector('.water-shape');
    if (!shape || preference.matches) return;
    const original = shape.getAttribute('d');
    const final = [43,211,22,107,111,33,227,32,373,30,480,74,503,189,525,301,467,423,353,464,245,503,135,446,81,366,46,317,53,262,43,211];
    const ribbon = [400,-250,450,-280,480,-160,420,-100,340,-20,200,80,210,170,220,240,320,240,280,300,240,360,160,300,170,230,180,130,360,-200,400,-250];
    const start = performance.now();
    const restore = () => {
      shape.setAttribute('d', original);
      shape.removeAttribute('transform');
      shape.style.opacity = '';
    };
    const tick = now => {
      const p = Math.min((now - start) / 5500, 1);
      if (preference.matches || p === 1) { restore(); waterFrame = 0; return; }
      // Continuous easing, with no intermediate stops or changing bounding-box origin.
      const ease = p * p * (3 - 2 * p);
      const ripple = Math.sin(Math.PI * p) ** 2 * 19;
      const points = final.map((value, i) => {
        const point = Math.floor(i / 2) % 15;
        return ribbon[i] * (1 - ease) + value * ease + ripple * Math.sin(p * Math.PI * 4 + point * .65 + (i % 2) * 1.2);
      });
      let path = `M${points[0].toFixed(2)} ${points[1].toFixed(2)}`;
      for (let i = 2; i < points.length; i += 6) path += 'C' + points.slice(i, i + 6).map(n => n.toFixed(2)).join(' ');
      shape.setAttribute('d', path + 'Z');
      const x = 160 * (1 - ease) ** 2, y = -160 * (1 - ease) ** 2;
      const angle = -30 + 390 * ease;
      shape.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${angle.toFixed(2)} 270 250)`);
      shape.style.opacity = Math.min(1, p * 6);
      waterFrame = requestAnimationFrame(tick);
    };
    waterFrame = requestAnimationFrame(tick);
  };
  const illustration = document.querySelector('.hero-art, .review-connections');
  illustration?.classList.add('assembly-ready');
  const assemblyObserver = new IntersectionObserver(entries => {
    entries.forEach(({target,isIntersecting}) => {
      if (!isIntersecting) return;
      target.classList.remove('assembly-ready');
      target.classList.add('assembly-enter');
      animateWater(target);
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
  document.querySelectorAll('.hero-art, .review-connections, .story-note').forEach(element => orbitObserver.observe(element));
  document.addEventListener('visibilitychange', startOrbit);

  const art = document.querySelector('.hero-art, .review-connections');
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
    if (drawing) drawing.style.transform = '';
    updateLine();
  });
})();


// Pauseable photo strip; shared site.js handles the image enlargement dialog.
(() => {
  const gallery = document.querySelector('.mission-gallery');
  const button = gallery?.querySelector('.gallery-motion-toggle');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (!gallery || !button) return;
  const update = () => {
    gallery.classList.toggle('is-running', !preference.matches);
    button.hidden = preference.matches;
  };
  update();
  preference.addEventListener('change', update);
  button.addEventListener('click', () => {
    const paused = gallery.classList.toggle('is-paused');
    button.setAttribute('aria-pressed', String(paused));
    button.textContent = paused ? 'Riprendi scorrimento' : 'Pausa scorrimento';
  });
})();
