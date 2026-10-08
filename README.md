# Archimede Centro Studi

Sito informativo in HTML, CSS e JavaScript, pubblicato su GitHub Pages.

- **Sito:** [chasemaneuver.github.io/archimede-centro-studi](https://chasemaneuver.github.io/archimede-centro-studi/)
- **Gestione dei contenuti:** [GUIDA-GESTIONE.md](./GUIDA-GESTIONE.md)
- **Titoli, grafiche, animazioni e link:** [STILE-E-COMPONENTI.md](./STILE-E-COMPONENTI.md)
- **Riferimento per Codex:** [AGENTS.md](./AGENTS.md)
- **Privacy e cookie:** [informativa](./privacy.html)
- **Cronologia:** [CHANGELOG.md](./CHANGELOG.md)

Per pubblicare articoli, laboratori, eventi, foto e recensioni, scrivere a Codex con i contenuti disponibili. La guida spiega cosa inviare, quali pagine aggiornare, gli automatismi presenti e le manutenzioni suggerite.

## Struttura attuale

- **Il centro:** Home, La nostra mission, Recensioni, Domande frequenti.
- **Percorsi:** Tutti i servizi, Laboratori creativi, Materiale personalizzato.
- **Risorse:** Pescara Solidale, Lezioni Circolari, Risorse gratuite.
- **Archivio:** Album, Articoli, Eventi.

Al controllo del 8 ottobre 2026: 14 pagine HTML, 43 immagini di contenuto senza duplicati nell'Album, 35 schede recensione (8 WhatsApp e 27 Google) e il primo articolo della guida all'apprendimento. Questi numeri vanno aggiornati insieme ai contenuti.

## Funzionamento

- Layout responsive, menu a tendina, dettagli servizi, FAQ, gallerie e popup immagini con X.
- Recensioni in una raccolta unica: tre schede iniziali, altre tre con «Mostra altro», filtri, stelle e link Google. L'aggiornamento da Google Maps è manuale.
- Articoli con data, autore, minuti di lettura, tag, condivisione, metadati SEO e commenti senza login.
- Commenti collegati a Supabase: nickname univoco nell'intero sito, invii moderati, pubblicazione con `approved=true` nella tabella `article_comments`. Ogni nuovo articolo richiede la registrazione dello slug nel progetto.
- Eventi mostrati fra i conclusi dopo la data finale, usando il fuso italiano. Testi e iscrizioni richiedono un aggiornamento editoriale alla chiusura.
- Contatori e grafiche animate con supporto al movimento ridotto. I valori dei contatori sono impostati dal centro.
- Link WhatsApp, email, telefono e due moduli distinti per preventivi lezioni e materiale. Il sito non gestisce le risposte interne dei Google Forms.

La configurazione condivisa genera contatti, menu/footer e riepilogo Google tramite `build_site.py`; gli altri JSON e i file caricati non generano da soli il contenuto delle pagine. I commenti vengono invece letti dal database senza ripubblicare il sito. Non è attivo un monitoraggio periodico automatico.

## Pubblicazione e dominio

GitHub Pages pubblica dal ramo `main`, cartella principale `/`. Non serve una compilazione locale. Verificare l'esito in Actions e il risultato pubblico dopo ogni aggiornamento.

Il dominio `archimedecentrostudi.com` non è ancora collegato; canonical e sitemap usano GitHub Pages. Collaborazioni rimanda al vecchio sito e va migrata prima di dismettere quell'hosting. Privacy e cookie policy è disponibile localmente in `privacy.html`.

## Identità visiva

Petrolio `#004A59`, arancione `#F07018`, crema `#FFF5CB`, verde acqua `#B6E3D4`, azzurro `#33A7B5`. Logo originale `logo.png`; illustrazioni in SVG e codice del sito.

Classe A: grafiche elaborate di home e Tutti i servizi. Classe B: pagine secondarie, con ingresso, ellisse e satelliti dove presenti. Mantenere coerenza fra PC e telefono.

## Fonti condivise e generazione statica (9 ottobre 2026)

- `site-data.json` è la fonte unica per contatti, link dei due preventivi, social, indirizzi, menu/footer e riepilogo Google (media, massimo, quantità, data verificata e URL). I form lezioni e materiale sono distinti. Il numero WhatsApp deriva dal telefono principale. Gli indirizzi pubblico e legale mantengono le formulazioni approvate.
- `header.html.in` e `footer.html.in` sono i componenti condivisi. I file `*.html.in` delle pagine contengono il testo, il markup e le grafiche originali con segnaposto `{{...}}`. Modificare queste fonti; non correggere soltanto l’HTML generato.
- `python build_site.py` rigenera le 14 pagine e sincronizza esclusivamente i metadati Google di `google-reviews.json` e `all-reviews.json`. I testi e i tag delle singole recensioni restano nelle fonti attuali e devono essere aggiornati separatamente.
- Prima del commit eseguire `python -m unittest test_build_site.py` e `python build_site.py --check`. Il controllo rileva pagine non sincronizzate, segnaposto irrisolti, collegamenti/ancore locali mancanti e valori Google non validi. Non sostituisce la verifica visiva PC/telefono o la verifica esterna dei dati.
- `python build_site.py --output-dir _site` crea i file da pubblicare in una cartella nuova o vuota, escludendo modelli, script Python, configurazione centrale e documenti interni. GitHub Actions esegue test e controllo di sincronizzazione prima di creare e pubblicare questa versione statica.
- Aggiungendo una pagina, creare il relativo `nome.html.in` con `{{header}}` e `{{footer}}`, inserirla dove pertinente in navigazione/footer, rigenerare e aggiornare sitemap e archivi. Gli URL pubblici, il JavaScript, i CSS e le animazioni rimangono quelli esistenti.
- Articoli, eventi e relative raccolte non sono ancora migrati a un nuovo modello dati: questa è la prima fase della centralizzazione. Nessun servizio esterno o cookie nuovo.
