# Archimede Centro Studi

Sito informativo in HTML, CSS e JavaScript, pubblicato su GitHub Pages.

- **Sito:** [chasemaneuver.github.io/archimede-centro-studi](https://archimedecentrostudi.com/)
- **Gestione dei contenuti:** [GUIDA-GESTIONE.md](./GUIDA-GESTIONE.md)
- **Titoli, grafiche, animazioni e link:** [STILE-E-COMPONENTI.md](./STILE-E-COMPONENTI.md)
- **Riferimento per Codex:** [AGENTS.md](./AGENTS.md)
- **Privacy e cookie:** [informativa](./privacy.html)
- **Cronologia:** [CHANGELOG.md](./CHANGELOG.md)

Per pubblicare articoli, laboratori, eventi, foto e recensioni, scrivere a Codex con i contenuti disponibili. La guida spiega cosa inviare, quali pagine aggiornare, gli automatismi presenti e le manutenzioni suggerite.

## Struttura attuale

- **Il centro:** Home, La nostra mission, Recensioni, Domande frequenti, Il tuo 5×1000.
- **Percorsi:** Tutti i servizi, Laboratori creativi, Materiale personalizzato.
- **Risorse:** Pescara Solidale, Lezioni Circolari, Risorse gratuite.
- **Archivio:** Album, Articoli, Eventi.

Al controllo del 9 ottobre 2026: 15 pagine HTML, 43 immagini di contenuto senza duplicati nell'Album, 35 schede recensione (8 WhatsApp e 27 Google) e il primo articolo della guida all'apprendimento. Questi numeri vanno aggiornati insieme ai contenuti.

## Funzionamento

- Layout responsive, menu a tendina, dettagli servizi, FAQ, gallerie e popup immagini con X.
- Recensioni in una raccolta unica: tre schede iniziali, altre tre con «Mostra altro», filtri, stelle e link Google. L'aggiornamento da Google Maps è manuale.
- Articoli con data, autore, minuti di lettura, tag, condivisione, metadati SEO e commenti senza login.
- Commenti collegati a Supabase: nickname univoco nell'intero sito, invii moderati, pubblicazione con `approved=true` nella tabella `article_comments`. Ogni nuovo articolo richiede la registrazione dello slug nel progetto.
- Eventi mostrati fra i conclusi dopo la data finale, usando il fuso italiano. Testi e iscrizioni richiedono un aggiornamento editoriale alla chiusura.
- Contatori e grafiche animate con supporto al movimento ridotto. I valori dei contatori sono impostati dal centro.
- Link WhatsApp, email, telefono e due moduli distinti per preventivi lezioni e materiale. Il sito non gestisce le risposte interne dei Google Forms.

La configurazione condivisa genera contatti, menu/footer e riepilogo Google tramite `build_site.py`; `articles-data.json` ed `events-data.json` generano pagine e archivi editoriali. Foto e recensioni seguono le procedure dedicate. I commenti vengono letti dal database senza ripubblicare il sito. Non è attivo un monitoraggio periodico automatico.

## Pubblicazione e dominio

GitHub Pages pubblica dal ramo `main`, cartella principale `/`. Non serve una compilazione locale. Verificare l'esito in Actions e il risultato pubblico dopo ogni aggiornamento.

Il collegamento GitHub Pages attualmente reindirizza a `archimedecentrostudi.com`; canonical e sitemap conservano la base URL precedente, centralizzata in `site-data.json`. La migrazione SEO del dominio va verificata separatamente. Collaborazioni rimanda al vecchio sito e va migrata prima di dismettere quell'hosting. Privacy e cookie policy è disponibile localmente in `privacy.html`.

## Identità visiva

Petrolio `#004A59`, arancione `#F07018`, crema `#FFF5CB`, verde acqua `#B6E3D4`, azzurro `#33A7B5`. Logo originale `logo.png`; illustrazioni in SVG e codice del sito.

Classe A: grafiche elaborate di home e Tutti i servizi. Classe B: pagine secondarie, con ingresso, ellisse e satelliti dove presenti. Mantenere coerenza fra PC e telefono.

## Fonti condivise e generazione statica (9 ottobre 2026)

- `site-data.json` è la fonte unica per contatti, link dei due preventivi, social, indirizzi, menu/footer e riepilogo Google (media, massimo, quantità, data verificata e URL). I form lezioni e materiale sono distinti. Il numero WhatsApp deriva dal telefono principale. Gli indirizzi pubblico e legale mantengono le formulazioni approvate.
- `header.html.in` e `footer.html.in` sono i componenti condivisi. I file `*.html.in` delle pagine contengono il testo, il markup e le grafiche originali con segnaposto `{{...}}`. Modificare queste fonti; non correggere soltanto l’HTML generato.
- `python build_site.py` rigenera le 15 pagine e sincronizza esclusivamente i metadati Google di `google-reviews.json` e `all-reviews.json`. I testi e i tag delle singole recensioni restano nelle fonti attuali e devono essere aggiornati separatamente.
- Prima del commit eseguire `python -m unittest test_build_site.py` e `python build_site.py --check`. Il controllo rileva pagine non sincronizzate, segnaposto irrisolti, collegamenti/ancore locali mancanti e valori Google non validi. Non sostituisce la verifica visiva PC/telefono o la verifica esterna dei dati.
- `python build_site.py --output-dir _site` crea i file da pubblicare in una cartella nuova o vuota, escludendo modelli, script Python, configurazione centrale e documenti interni. GitHub Actions esegue test e controllo di sincronizzazione prima di creare e pubblicare questa versione statica.
- Aggiungendo una pagina, creare il relativo `nome.html.in` con `{{header}}` e `{{footer}}`, inserirla dove pertinente in navigazione/footer, rigenerare e aggiornare sitemap e archivi. Gli URL pubblici, il JavaScript, i CSS e le animazioni rimangono quelli esistenti.
- Articoli ed eventi sono ora generati dalle fonti editoriali: vedere la fase 2 sotto. Nessun servizio esterno o cookie nuovo.

## Modelli editoriali e archivi automatici — fase 2 (9 ottobre 2026)

I contenuti restano statici e approvati da Archimede Regia. Articoli ed eventi ora vengono generati da fonti separate dall’impaginazione, senza nuovi servizi esterni.

### Pubblicare o aggiornare un articolo

1. Inserire il record in `articles-data.json`. L’articolo esistente documenta tutti i campi: slug/URL stabile, titolo visibile diviso in `titleFirst`/`titleEmphasis`, titolo SEO, descrizione e sintesi, sezione/capitolo, date ISO con fuso, autore, tag e immagine (file, alt, larghezza/altezza).
2. Scrivere il corpo in `slug.content.html`: paragrafi, elenchi, citazioni, fonti e immagini editoriali, senza header/footer, metadati, sidebar o modulo commenti. I file HTML di contenuto sono fonti revisionate, non importazioni automatiche da paper o pagine web. Il modello può usare segnaposto immagine `{{article.imageUrl}}`, `{{article.imageAlt}}`, `{{article.imageWidth}}` e `{{article.imageHeight}}`.
3. `article.html.in` è il layout comune; `article-comments.html.in` il modulo condiviso; `article-card.html.in` e `resource-card.html.in` generano le anteprime. Il vecchio `stili-di-apprendimento.html.in` è soltanto un segnaposto di compatibilità: modificare i dati e il corpo, non quel file. Un nuovo articolo non necessita di un nuovo modello di pagina.
4. La generazione aggiorna pagina, scheda Articoli, filtri e link dei tag (anche tag con spazi), minuti di lettura, canonical/anteprima social, dati `BlogPosting` e sitemap. `featuredInResources: true` aggiunge anche la scheda a Risorse gratuite; `resourceSummary` consente una sintesi dedicata. Il calcolo usa 200 parole/minuto, arrotondato per eccesso, minimo un minuto; esclude menu, commenti e sidebar.
5. `comments: true` mantiene il servizio Supabase e usa lo slug del record. Per nuovi slug resta necessario l’inserimento in `article_comment_pages` descritto nella sezione commenti: il generatore non scrive nel database. `comments: false` omette il modulo e i suoi script. Non cambiare lo slug di un articolo già commentato senza migrare i relativi collegamenti.

L’agente Autore consegna testo, proposta di titolo/sintesi, immagini/alt, tag, autore e fonti. Regia revisiona e converte questi contenuti nelle fonti sopra; l’utente può continuare a inviare bozze senza scrivere JSON o HTML. Le foto nuove richiedono ancora ottimizzazione e aggiornamento dell’Album: la generazione editoriale non deduplica automaticamente le immagini.

### Pubblicare o aggiornare un evento

1. Inserire il record in `events-data.json`: slug, URL, titolo, conclusione `end` in formato `YYYY-MM-DD`, locandina `image`, sintesi `desc` e file del corpo `contentFile`. Per una pagina nuova usare `layout: "standard"`: `event-page.html.in` genera titolo, locandina, testo, eventuale link iscrizioni, metadati e navigazione. Si possono fornire `titleFirst`, `titleEmphasis`, `eyebrow`, `intro`, `description` e `tags`.
2. `status` può essere `current`, `upcoming`, `past` o `cancelled`. I record conclusi/annullati sono inseriti nell’archivio storico; le iscrizioni della pagina standard non vengono mostrate per questi stati. Nel browser resta il passaggio automatico alle esperienze concluse dopo `end`, con data italiana. Questo non chiude autonomamente iscrizioni esterne né riscrive i testi delle pagine.
3. `featuredInLabs: true` genera una scheda nella pagina Laboratori creativi per iniziative non concluse/annullate. Impostando `status: "past"` il richiamo viene tolto dai laboratori, ma pagina e scheda storica restano accessibili. Alla chiusura controllare comunque testi, locandine e iscrizioni esterne.
4. Per pagine specifiche, come Pescara Solidale, `layout: "existing"` conserva il modello dedicato `pescara-solidale.html.in`; i testi delle sezioni sono in `pescara-solidale-2026.content.html`. Titolo SEO, sintesi archivio, immagine, data finale e dati della presentazione provengono dal record. Le altre scadenze e istruzioni del voucher restano contenuto da verificare con le fonti ufficiali.
5. `Event` viene generato solo quando sono fornite data iniziale `startDate` e `location` reali; `endDate` è opzionale, altrimenti viene usata `end`. Un programma noto soltanto per la data finale conserva dati `WebPage`. Non inventare date, luogo, prezzi o disponibilità per completare lo schema. Eventi annullati dichiarano `EventCancelled`. Riferimenti: https://schema.org/Event e https://schema.org/BlogPosting.

### Generazione e pubblicazione

- Eseguire `python build_site.py`, poi `python -m unittest test_build_site.py` e `python build_site.py --check`. Il workflow esistente esegue anche i nuovi test editoriali tramite la suite principale.
- La sitemap viene generata dalle pagine effettive; per gli articoli usa la data di modifica dichiarata. `publishing.baseUrl` in `site-data.json` centralizza il prefisso degli URL SEO/condivisione, mantenendo il valore già approvato.
- Nessuna scheda vuota viene pubblicata come esempio. I test dei nuovi articoli/eventi usano contenuti di prova soltanto in memoria.
- Fonti JSON editoriali, corpi `.content.html`, modelli e script Python non entrano nell’artefatto pubblico `_site`; il visitatore riceve le pagine complete.
- Questa fase completa i modelli articolo/evento. Gallerie fotografiche e testi delle recensioni mantengono le procedure di aggiornamento documentate.
