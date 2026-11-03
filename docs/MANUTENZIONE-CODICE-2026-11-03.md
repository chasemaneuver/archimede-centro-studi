# Controllo e pulizia tecnica — 3 novembre 2026

Base verificata: commit 6c6fea168357a0d1048e5c686f2ce587a0eac38a.

## Esito e interventi

- Inventario di 224 file del repository prima dell’intervento; 21 pagine generate, CSS e JavaScript locali, generatori, test e pubblicazione statica esaminati. Non ci sono framework client o font web esterni da eliminare.
- 36 anteprime JPEG affiancate da WebP alle stesse dimensioni: 1,190,495 → 866,476 byte, risparmio 27.2%. Risparmio sulle anteprime, non percentuale di velocità dell’intero sito. Lazy loading mantenuto; popup collegati agli originali JPEG, che restano disponibili.
- Caroselli iniziative e guide: misure geometriche in una sola passata, aggiornamenti scroll raggruppati una volta per fotogramma. Il carosello iniziative aggiorna aria-hidden/inert solo al cambio effettivo della slide e non programma due volte il timer. Intervallo approvato di 2 secondi invariato.
- home.js: gli eventi scroll/resize della mappa del percorso vengono registrati solo dove esiste il componente. Le orbite visibili conservano pausa, movimento ridotto e comportamento approvato.
- site.js: riconoscimento coerente di / e /index.html nel menu; analytics caricato con defer.
- Schede servizi: chiudere i dettagli non provoca più una riapertura immediata da hover. La sospensione dura fino all’uscita del puntatore.
- Dimensioni esplicite per foto del carosello e locandine eventi; dimensioni reali 512×640 aggiunte alla locandina Pescara Solidale.
- Corretto il riferimento CSS non definito --brand-sapphire usando --brand-blue già presente nella palette.
- Chiavi cache aggiornate solo per risorse modificate. Nessuna nuova libreria runtime; i modelli restano la fonte delle pagine.

## Verifiche

- Suite Python e controllo sincronizzazione build; verifica sintattica Node su tutti gli script locali.
- Controlli DOM su tutte le 21 pagine a 1280×900 e 390×844: un h1, nessun overflow orizzontale o immagine caricata rotta nella verifica. Le immagini lazy fuori schermo sono controllate anche dai link/asset della build.
- Provati menu mobile e sottomenu, capitoli guida, carosello iniziative, filtri recensioni, apertura/chiusura scheda servizi e popup con originale JPEG.
- Nuovo test su dimensioni dichiarate delle immagini e collegamenti delle anteprime agli originali.
- L’audit non è un benchmark Lighthouse o una misura dei Core Web Vitals reali; non certifica un aumento percentuale della velocità e non esercita invii a moduli esterni o database.

## Materiali conservati e manutenzione

Le miniature JPEG precedenti restano disponibili per compatibilità; le pagine usano WebP. Le grafiche SVG riutilizzabili e il quaderno restano conservati intenzionalmente. Non sono state eliminate regole CSS sulla sola base di una ricerca testuale: menu, filtri, popup e animazioni usano stati dinamici.

Il CSS comune conserva la cascata approvata. Una sua riscrittura completa aggiungerebbe rischio visivo senza un beneficio misurato in questo intervento. Non sono state aggiunte le pagine dei servizi o le altre modifiche strutturali rinviate a fine febbraio 2027.

Per rigenerare le anteprime: python tools/optimize_previews.py (Pillow richiesto soltanto a questa manutenzione). Il normale python build_site.py resta senza dipendenze aggiuntive. docs/gallery-previews.json conserva dimensioni in byte prima/dopo. Le prove browser complete sono nel rapporto locale browser-audit.json.
