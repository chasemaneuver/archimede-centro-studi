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

