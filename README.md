# Archimede Centro Studi

Prima proposta del nuovo sito di Archimede: landing informativa responsive, realizzata in HTML, CSS e JavaScript, senza framework o dipendenze di compilazione.

## Brand

Colori estratti dal sito originale: petrolio `#004A59`, arancione `#F07018`, crema `#FFF5CB`, verde acqua `#B6E3D4` e azzurro `#33A7B5`. Logo originale in `logo.png`. Illustrazione del quaderno realizzata in SVG.

## Funzioni presenti

- Menu comune con tre gruppi (Percorsi, Il centro, Risorse), sottomenu e versione mobile verticale.
- Pagina `recensioni.html`: raccolta unica di 35 recensioni (8 testimonianze originali e 27 valutazioni Google), con schede uniformi, tre colonne desktop e tre schede iniziali. Il pulsante “Mostra altro” aggiunge tre schede; filtri comuni per percorso. Le categorie Google vengono assegnate secondo le indicazioni di Archimede.
- Media Google 5,0 su 27 recensioni, consultata il 6 ottobre 2026. Stelle e link diretti per le 26 recensioni con testo; la valutazione senza testo rimanda alla scheda Google. Titoli ricavati dalle recensioni, estratti e nessun aggiornamento automatico.
- Homepage ridotta a presentazione, approccio e contatti. Nuove pagine `percorsi.html`, `risorse.html` e `domande-frequenti.html`, con menu e footer comuni.
- Percorsi in quattro flip card, in griglia 2×2 su desktop e una colonna su telefono. Descrizione e dettagli accorpati per servizio; apertura al passaggio del mouse o tramite pulsante, uso da tastiera e animazione ridotta secondo le preferenze del dispositivo.
- FAQ espandibili.
- Link reali a WhatsApp, email, telefono e al Google Form esistente per i preventivi.
- Testimonianze e informazioni tratte dal sito Archimede, senza nuove promesse di risultato.
- Nessun invio automatico di dati, nessun checkout, nessun tracker aggiunto.

Questa prima versione non sostituisce il sito attuale e non include un nuovo backend per i contatti, newsletter, commenti, pagamenti o un CMS. I servizi esterni possono utilizzare cookie una volta aperti.

## Pubblicazione

GitHub Pages: pubblicazione da branch `main`, cartella `/ (root)`. `.nojekyll` evita elaborazioni Jekyll. Il dominio esistente non è configurato in questa anteprima.

Prima di rendere questa landing il sito commerciale definitivo, verificare l'idoneità dell'hosting: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits . GitHub limita i siti dedicati principalmente a transazioni commerciali. Un hosting alternativo può usare lo stesso repository.

## Modifiche

Contenuti nelle cinque pagine HTML; stili comuni in `styles.css`; menu e anno in `site.js`; compatibilità dei vecchi link alla homepage in `home.js`; interazione delle schede dei percorsi in `percorsi.js`; filtri delle recensioni in `reviews.js`. Nessuna compilazione necessaria.

Homepage, percorsi, risorse introduttive, FAQ e recensioni sono migrate. Le sezioni non ancora migrate (archivio, materiale personalizzato, programmi speciali, collaborazioni e privacy) restano collegate al sito originale. Le testimonianze sono state trascritte integralmente dalle otto pagine pubbliche originali.

I numeri, le sedi, i programmi e le testimonianze vanno confermati da Archimede prima della migrazione definitiva. La privacy policy è collegata al sito attuale.

## Riferimenti consultati

- https://archimedecentrostudi.com/ — contenuti, brand, contatti e recensioni
- https://centrostudilambda.it/ — leggibilità dei percorsi e inviti al contatto
- https://www.bencicentrostudi.it/ — percorsi scuola, università e supporto all'apprendimento
- https://centrostudibrianza.it/ripetizioni/ — organizzazione dei servizi (risultato indicizzato)

I riferimenti sono stati usati per studiare l'organizzazione dei contenuti. Nessun testo, foto, marchio o garanzia dei concorrenti è stato copiato.
