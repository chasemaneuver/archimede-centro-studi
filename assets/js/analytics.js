// Aggregate page views only; previews and localhost never send analytics.
(() => {
  if (!['archimedecentrostudi.com', 'www.archimedecentrostudi.com'].includes(location.hostname)) return;
  window.goatcounter = {
    path: location.pathname === '/index.html' ? '/' : location.pathname,
    referrer: (() => { try { return document.referrer ? new URL(document.referrer).origin : ''; } catch { return ''; } })()
  };
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = 'https://archimede-mv.goatcounter.com/count';
  document.head.appendChild(script);
})();
