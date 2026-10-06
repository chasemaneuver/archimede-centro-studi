// Preserve links shared before the homepage was shortened.
const movedSections={servizi:'./percorsi.html#servizi',percorsi:'./percorsi.html#percorsi',risorse:'./risorse.html#risorse',faq:'./domande-frequenti.html#faq',recensioni:'./recensioni.html#testimonianze'};
function followMovedSection(){const target=movedSections[location.hash.slice(1)];if(target)location.replace(target);}
followMovedSection();
window.addEventListener('hashchange',followMovedSection);
