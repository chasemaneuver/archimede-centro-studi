# Archimede Centro Studi

Sito informativo in HTML, CSS e JavaScript, pubblicato su GitHub Pages.

- **Sito:** [chasemaneuver.github.io/archimede-centro-studi](https://chasemaneuver.github.io/archimede-centro-studi/)
- **Gestione dei contenuti:** [GUIDA-GESTIONE.md](./GUIDA-GESTIONE.md)
- **Riferimento per Codex:** [AGENTS.md](./AGENTS.md)
- **Cronologia:** [CHANGELOG.md](./CHANGELOG.md)

Per pubblicare articoli, laboratori, eventi, foto e recensioni, scrivere a Codex con i contenuti disponibili. La guida spiega cosa inviare, quali pagine aggiornare, gli automatismi presenti e le manutenzioni suggerite.

## Struttura attuale

- **Il centro:** Home, La nostra mission, Recensioni, Domande frequenti.
- **Percorsi:** Tutti i servizi, Laboratori creativi, Materiale personalizzato.
- **Risorse:** Pescara Solidale, Lezioni Circolari, Risorse gratuite.
- **Archivio:** Album, Articoli, Eventi.

Al controllo del 7 ottobre 2026: 13 pagine HTML, 43 immagini di contenuto senza duplicati nell'Album, 35 schede recensione (8 WhatsApp e 27 Google) e il primo articolo della guida all'apprendimento. Questi numeri vanno aggiornati insieme ai contenuti.

## Funzionamento

- Layout responsive, menu a tendina, dettagli servizi, FAQ, gallerie e popup immagini con X.
- Recensioni in una raccolta unica: tre schede iniziali, altre tre con «Mostra altro», filtri, stelle e link Google. L'aggiornamento da Google Maps è manuale.
- Articoli con data, autore, minuti di lettura, tag, condivisione, metadati SEO e commenti senza login.
- Commenti collegati a Supabase: nickname univoco nell'intero sito, invii moderati, pubblicazione con `approved=true` nella tabella `article_comments`. Ogni nuovo articolo richiede la registrazione dello slug nel progetto.
- Eventi mostrati fra i conclusi dopo la data finale, usando il fuso italiano. Testi e iscrizioni richiedono un aggiornamento editoriale alla chiusura.
- Contatori e grafiche animate con supporto al movimento ridotto. I valori dei contatori sono impostati dal centro.
- Link WhatsApp, email, telefono e due moduli distinti per preventivi lezioni e materiale. Il sito non gestisce le risposte interne dei Google Forms.

I JSON e i file caricati non generano da soli le pagine HTML. I commenti vengono invece letti dal database senza ripubblicare il sito. Non è attivo un monitoraggio periodico automatico.

## Pubblicazione e dominio

GitHub Pages pubblica dal ramo `main`, cartella principale `/`. Non serve una compilazione locale. Verificare l'esito in Actions e il risultato pubblico dopo ogni aggiornamento.

Il dominio `archimedecentrostudi.com` non è ancora collegato; canonical e sitemap usano GitHub Pages. Collaborazioni e Privacy e cookie policy rimandano al vecchio sito: vanno migrate prima di dismettere quell'hosting.

## Identità visiva

Petrolio `#004A59`, arancione `#F07018`, crema `#FFF5CB`, verde acqua `#B6E3D4`, azzurro `#33A7B5`. Logo originale `logo.png`; illustrazioni in SVG e codice del sito.

Classe A: grafiche elaborate di home e Tutti i servizi. Classe B: pagine secondarie, con ingresso, ellisse e satelliti dove presenti. Mantenere coerenza fra PC e telefono.
