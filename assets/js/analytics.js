// Aggregate page views only; previews and localhost never send analytics.
(() => {
  if (!['archimedecentrostudi.com', 'www.archimedecentrostudi.com'].includes(location.hostname)) return;
  window.goatcounter = {
    no_onload: true,
    path: location.pathname === '/index.html' ? '/' : location.pathname,
    referrer: (() => { try { return document.referrer ? new URL(document.referrer).origin : ''; } catch { return ''; } })()
  };
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = 'https://archimede-mv.goatcounter.com/count';
  script.onload = () => {
    let sent = false;
    const count = () => {
      if (sent || document.visibilityState !== 'visible') return;
      sent = true;
      if (window.goatcounter.filter()) return;
      const url = new URL(window.goatcounter.url());
      url.searchParams.delete('q');
      const beacon = new Image();
      beacon.referrerPolicy = 'no-referrer';
      beacon.src = url.href;
    };
    count();
    document.addEventListener('visibilitychange', count);
  };
  script.referrerPolicy = 'no-referrer';
  document.head.appendChild(script);
})();
