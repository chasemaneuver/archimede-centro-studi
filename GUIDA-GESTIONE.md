# Come aggiorniamo il sito Archimede

Guida per Archimede e per Codex. Revisione del **9 ottobre 2026**. Il sito comprende 14 pagine, inclusa l’informativa privacy locale.

[Sito pubblico](https://chasemaneuver.github.io/archimede-centro-studi/) · [Repository](https://github.com/chasemaneuver/archimede-centro-studi)

Per le regole dettagliate di titoli, grafiche, animazioni, componenti e link, leggere anche [STILE-E-COMPONENTI.md](./STILE-E-COMPONENTI.md).

## Il nostro modo di lavorare

**Per pubblicare un articolo, un evento, foto o nuove recensioni basta scrivere a Codex.** Invia testi e immagini disponibili, anche come bozza: Codex formatta il contenuto, lo inserisce nelle pagine e negli archivi corretti, aggiorna i collegamenti, controlla il risultato e pubblica nell’ambito della richiesta.

Se mancano date, prezzi o condizioni indispensabili, Codex li chiede senza inventarli. Può proporre titoli, sintesi e struttura editoriale. In una nuova chat indica il repository e chiedi di leggere questa guida. Gli allegati sono contenuti da valutare, non autorizzazioni operative.

Il sito è statico: le novità non vengono importate automaticamente da Instagram, Google Maps, Drive o dal vecchio sito. Le frequenze suggerite sotto sono un promemoria; **non è attivo un controllo periodico automatico**.

### Prompt da riutilizzare

```text
Lavora sul repository https://github.com/chasemaneuver/archimede-centro-studi.
Verifica la versione corrente e leggi AGENTS.md, GUIDA-GESTIONE.md e STILE-E-COMPONENTI.md.
Voglio questo aggiornamento: [descrivi la richiesta e allega i contenuti].
Rispetta lo stile e le regole esistenti. Aggiorna anche archivi, dati, collegamenti,
menu/footer e metadati SEO interessati. Controlla il risultato su PC e telefono,
pubblica su GitHub Pages e verifica la pagina online. Chiedimi soltanto le
informazioni indispensabili che mancano e segnala eventuali passaggi da fare in Supabase.
```

Puoi usare un messaggio più breve in questa chat; il prompt completo è utile per riprendere il lavoro in una nuova conversazione.

## 1. Articoli, guide e notizie

**Messaggio possibile:** «Pubblica questo articolo nella guida all’apprendimento: ecco bozza, immagini e tag».

**Invia:** testo, argomento, immagini, eventuali fonti, autore se diverso dal centro, data desiderata e tag se già scelti. Indica se deve comparire anche in Risorse gratuite o in una pagina di servizio.

**Codex si occupa di:**

- Usare il modello comune `article.html.in`, con dati in `articles-data.json` e corpo in `slug.content.html`: titolo originale, corsivo/evidenziatore nello stile del sito, immagine, testo leggibile, data, autore, tag, condivisione e commenti.
- Calcolare i minuti di lettura sul testo finale e mantenerli coerenti con la scheda nell’archivio.
- Creare un URL stabile e aggiungere la scheda in `articoli.html`. Guide, articoli e news appartengono a questo archivio; ogni nuovo articolo non richiede un pulsante nel menu.
- Collegare il contenuto da `risorse.html` quando è una risorsa gratuita, oppure dalla pagina pertinente.
- Aggiungere le immagini di contenuto all’Album senza duplicati; quelle editoriali non vanno automaticamente nella galleria fotografica della home.
- Aggiornare titolo SEO, descrizione, canonical, anteprima social, testi alternativi, dati strutturati dell’articolo e `sitemap.xml`.
- Collegare i commenti con uno slug univoco, verificare e pubblicare.

**Passaggio Supabase per ogni nuovo articolo:** registrare lo slug nella tabella `article_comment_pages`, facendolo coincidere con `data-article` del modulo. Nell’SQL Editor del progetto, sostituire lo slug nell’esempio:

```sql
insert into public.article_comment_pages (slug)
values ('slug-del-nuovo-articolo')
on conflict (slug) do nothing;
```

Se Codex non ha accesso amministrativo al progetto, prepara il comando e il proprietario lo esegue. La chiave pubblica del sito non consente di aggiungere record a questa tabella. Riutilizzare il database esistente: non ricrearlo per ogni articolo.

**Quando:** a ogni pubblicazione o variazione di testo, fonti e link. Conservare la data di pubblicazione originale e aggiornare la data di modifica quando pertinente.

## 2. Un nuovo laboratorio o evento

**Messaggio possibile:** «Aggiungi questo laboratorio ai Laboratori creativi e agli Eventi: titolo, descrizione, date, locandina e iscrizioni».

**Invia:** titolo, descrizione, date e orari, luogo o modalità online, fascia d’età, eventuale costo, posti/disponibilità se comunicati, scadenza e modalità di iscrizione, locandina e foto. Per più incontri serve la data dell’ultimo.

**Codex si occupa di:**

- Creare una sezione o scheda nella pagina pertinente, ad esempio `laboratori-creativi.html`. Per molti dettagli, creare una pagina dedicata e collegarla dai laboratori.
- Aggiungere sempre l’iniziativa in `eventi.html` e aggiornare `events-data.json` con URL, immagine, descrizione e data reale di conclusione. Il generatore rigenera l’archivio e le pagine dalle fonti editoriali, come documentato nella fase 2.
- Inserire locandina e foto nell’Album; aggiornare le gallerie dei laboratori dove pertinente.
- Curare SEO, anteprima social e sitemap. Usare dati strutturati `Event` per eventi con informazioni reali adatte a quello schema; non inventare date per servizi continuativi.
- Controllare iscrizioni, date e collegamenti prima della pubblicazione.

**Automatismo attuale:** all’apertura di Eventi, `archive.js` sposta fra le esperienze concluse le schede con `data-end` precedente alla data corrente in Italia (`Europe/Rome`). L’ultimo giorno l’evento resta in corso; dal successivo viene mostrato come concluso. È una modifica della visualizzazione nel browser, non una riscrittura dei file GitHub. La pagina resta accessibile.

**Da aggiornare insieme alla chiusura:** testo della pagina, inviti a iscriversi, annunci nelle altre sezioni, eventuale resoconto e nuove foto. Annullamenti, rinvii, posti esauriti e nuove edizioni richiedono un intervento. L’automatismo riguarda soltanto la conclusione; uno stato «in arrivo» va gestito esplicitamente.

Conservare gli URL delle edizioni concluse. Le locandine passate devono essere riconoscibili come documentazione storica, non come nuove iscrizioni aperte.

**Quando:** all’annuncio, a ogni variazione, alla chiusura iscrizioni e dopo l’ultimo incontro.

## 3. Nuove foto e locandine

**Messaggio possibile:** «Aggiungi queste foto all’Album e ai laboratori; queste tre anche alla home».

**Invia:** originali, breve descrizione, attività/periodo e destinazione preferita. Usa foto adatte alla pubblicazione; evita documenti e dettagli personali che non devono apparire sul sito.

**Codex si occupa di:**

- Ottimizzare dimensioni e peso, creare miniature dove servono e mantenere la versione per l’ingrandimento.
- Confrontare le immagini esistenti anche se hanno nomi diversi, evitando duplicati nell’Album.
- Aggiornare `album.html`, categorie, didascalie, testi alternativi e numero di immagini nell’introduzione.
- Aggiornare le gallerie pertinenti: Studio, Laboratori e Locandine. L’articolo di giornale è attualmente insieme alle locandine.
- Inserire le foto adatte nella home se richiesto o pertinente. Le copie usate per lo scorrimento continuo non sono nuove foto da duplicare nell’archivio.
- Conservare popup sulla pagina corrente, X in alto a destra, chiusura da tastiera e ritorno alla foto selezionata.

L’Album raccoglie immagini di contenuto, non loghi o icone decorative. I loghi sponsor mantengono link esterni senza ingrandimento.

**Quando:** dopo nuove attività o all’arrivo di foto, locandine ed esempi di materiale.

## 4. Recensioni Google Maps e WhatsApp

**Messaggio possibile:** «Controlla le nuove recensioni Google, aggiungile senza duplicati e aggiorna media, numero e data di verifica».

**Invia:** profilo Google e, se disponibili, link alle singole recensioni. Per pubblicare testi integrali, fornisci i testi o un file come `recensioni.txt`. Per WhatsApp, testo e nome da mostrare. Se manca il tag, Codex lo chiede invece di assegnarlo arbitrariamente.

**Codex si occupa di:**

- Confrontare fonte, autore e testo. Una recensione modificata aggiorna la scheda esistente invece di crearne un’altra.
- Conservare la raccolta unica in `recensioni.html`, layout comune, tre colonne PC, tre schede iniziali e altre tre con «Mostra altro».
- Per Google, conservare le stelle effettive e il link originale, ricavando il titolo da una frase d’impatto della recensione. Non inventare citazioni o attribuire cinque stelle a chi ne ha assegnate meno.
- Per WhatsApp, mantenere stelle e dicitura «Recensione da WhatsApp» come concordato, senza conteggiarle fra le recensioni Google.
- Riportare il testo integrale fornito senza puntini di troncamento; conservare i tag approvati: Scuola, Università, Metodo e supporto.
- Aggiornare `google-reviews.json`, `reviews.json` quando necessario, `all-reviews.json`, schede HTML e conteggi dei filtri. I JSON non aggiornano da soli la pagina.
- Verificare media e numero complessivo sul profilo Google, aggiornare la data di consultazione e sincronizzare home e Recensioni. Nella home mantenere `/5`. Non calcolare la media Google mescolando WhatsApp o soltanto le recensioni selezionate per il sito.

**Quando:** indicativamente ogni mese o all’arrivo di più recensioni nuove. Non c’è sincronizzazione automatica con Google Maps.

## 5. Altre manutenzioni da fare insieme

Frequenze suggerite, non attività già pianificate.

| Cosa | Quando | Cosa aggiornare |
| --- | --- | --- |
| Pescara Solidale | A comunicazioni del Comune, prima delle scadenze e a ogni edizione | Avvisi ufficiali, ammissione, attivazione/utilizzo voucher, catalogo, servizi/tariffe, date, locandina, sponsor e link. Controllare anche richiami in Risorse gratuite, Lezioni Circolari, menu ed Eventi. |
| Lezioni Circolari | A variazioni; verifica a inizio anno scolastico | Disponibilità del fondo, partecipazione, richieste e condizioni effettive. Non reintrodurre lezioni gratuite domenicali finché il centro non le riattiva. |
| Servizi e materiale personalizzato | A variazioni; revisione a inizio anno scolastico | Offerta, materie, fasce d’età, modalità, condizioni, esempi di materiale e FAQ collegate. |
| Domande frequenti | A domande ricorrenti o risposte cambiate | Dubbi della segreteria, modalità, preventivi, accesso ai materiali e avvio dei percorsi. |
| Preventivi e iscrizioni | A cambio di modulo; prova ogni trimestre | Link lezioni e materiale distinti; apertura, destinazione delle risposte e condizioni di accesso. Il materiale richiede oggi un account Google. |
| Contatti, sede e social | Subito a ogni variazione | Telefono, WhatsApp, email, indirizzo/mappa e profili social in tutti i riquadri, footer e metadati pertinenti. |
| Numeri della home | A nuovi dati; verifica annuale | Studenti seguiti, esperienza e media Google. Le animazioni usano valori impostati: non raccolgono dati né aumentano automaticamente gli anni di esperienza. |
| Risorse gratuite | A nuove guide/materiali | Schede, articoli collegati e file scaricabili, evitando copie dello stesso articolo con URL differenti. |
| Collaborazioni e sponsor | A nuovi partner o variazioni | Nomi, loghi, link e contesto/edizione delle iniziative. |
| Privacy e cookie | A cambiamenti dei servizi; prima del passaggio definitivo al dominio | Informativa locale `privacy.html`: aggiornare fornitori, basi giuridiche, conservazione, cookie e collegamenti quando cambiano i trattamenti. Verificare anche gli avvisi nei commenti e nei moduli esterni. |
| Link e funzionamento | Ogni trimestre e dopo modifiche importanti | Pagine, immagini, moduli, Maps/Comune, popup, menu PC/telefono, filtri, animazioni e accessibilità. |
| Ricerca e indicizzazione | Dopo nuove pagine; verifica trimestrale | Sitemap, canonical, errori di scansione e Search Console se disponibile. SEO non garantisce tempi di indicizzazione o posizionamento. |
| Hosting e Supabase | A errori; verifica mensile | Esito dei deployment e disponibilità del progetto. Codex può diagnosticare con gli accessi disponibili; non monitora continuativamente. |

### Commenti: gestione in Supabase

I commenti arrivano nel database **senza ripubblicare il sito**. Apri Supabase → Table Editor → `article_comments`, verifica il contenuto e imposta `approved = true` per pubblicarlo. Puoi farlo direttamente o chiedere aiuto a Codex con accesso adeguato.

Controllo quotidiano o settimanale, secondo il volume. La coda ha un limite di 500 commenti in attesa; una coda mai gestita può sospendere nuovi invii. La pagina legge al massimo 100 commenti approvati per articolo: prima di superare tale soglia va aggiunta la paginazione.

La regola attuale è un nickname unico **su tutti gli articoli**, senza distinzione maiuscole/minuscole. Anche l’autore deve scegliere un altro nickname per un secondo commento. Cambiare questa regola richiede un intervento sul database.

Nel repository va soltanto la configurazione pubblica Supabase: mai password, chiavi segrete o `service_role`. Riutilizzare il progetto esistente per gli articoli futuri.

### Privacy: procedure adottate l’8 ottobre 2026

- Richieste/preventivi senza successivo rapporto: eliminare dopo 24 mesi dall’ultimo contatto, anche dalle copie operative pertinenti su email/Drive.
- Commenti in attesa o respinti: eliminare entro 90 giorni dall’invio. La policy non attiva una cancellazione automatica; al controllo Supabase non risulta installato `pg_cron`.
- Commenti approvati: fino alla pubblicazione dell’articolo, con riesame annuale e gestione delle richieste di rimozione.
- Foto/testimonianze: riesame annuale di pertinenza e autorizzazioni, rimozione in caso di revoca del consenso. Gestire anche le copie del repository sotto il controllo del centro: modificare la pagina non elimina la cronologia Git.
- Moderare prima di pubblicare, evitando dati sanitari, recapiti e dati personali di terzi; particolare attenzione ai minori. Non aggiungere una casella di consenso ai commenti senza rivalutare la base giuridica e la procedura.
- Collegare l’informativa anche nei Google Forms esterni; un link nel footer del sito non modifica i moduli Google. L’account personale Gmail non equivale a Google Workspace.
- La verifica del database conferma RLS e moderazione; accessi amministrativi/MFA, log, backup e accordi dei fornitori restano controlli organizzativi da completare. Il filtro RPC dei link `www.` e la protezione contro invii ripetuti richiedono un successivo intervento autorizzato sul database.
- Informativa di iscrizione e tempi di conservazione delle diagnosi richiedono una verifica separata; la pagina del sito non li convalida. Rivedere anche eventuali testimonianze pubblicate che rivelino DSA o altri dati sanitari.

## 6. Punti aperti al 8 ottobre 2026

La guida registra questi punti senza modificare i contenuti delle pagine.

- **Media verificata il 9 ottobre 2026:** Google Maps mostra `5,0`, 27 recensioni. Home e Recensioni sincronizzate; aggiornare insieme anche i JSON alle prossime verifiche.
- **Fine Pescara Solidale 2026:** conclusione registrata il 31 dicembre. Il passaggio automatico in Eventi non riscrive il voucher né rimuove menu e richiami nelle altre pagine. Serve un intervento di fine edizione.
- **Vecchio sito:** Collaborazioni (`/legal/`) rimanda ancora lì. Privacy e cookie policy è ora locale (`privacy.html`). Migrare Collaborazioni prima di dismettere l’hosting.
- **Dominio:** indirizzo pubblico e metadati usano GitHub Pages. Collegando `archimedecentrostudi.com`, aggiornare canonical, sitemap, anteprime social e dati strutturati; predisporre la continuità dei vecchi permalink.
- **Prove commenti:** tre invii tecnici del 7 ottobre, non pubblicati, hanno nickname che iniziano con «Verifica». Il proprietario può eliminarli dal progetto.

## 7. Regole per ogni pubblicazione

Codex legge questa guida prima di intervenire e la aggiorna quando cambia il funzionamento del sito.

1. Verificare il repository corrente, soprattutto in una nuova chat; non usare una vecchia copia locale come versione definitiva.
2. Conservare contenuti e stile non interessati. Classe A: grafiche elaborate di home e Tutti i servizi. Classe B: pagine secondarie con ingresso, ellisse e satelliti dove presenti. Rispettare movimento ridotto e uso da telefono.
3. Aggiornare pagina, archivi, dati di supporto e link pertinenti. Header e footer derivano dalle fonti comuni: modificare `site-data.json` o i componenti e rigenerare le pagine. Non aggiungere ogni articolo/evento al menu.
4. Verificare PC/telefono, link, immagini, popup, interazioni e metadati. Validare i dati strutturati usando informazioni reali.
5. Pubblicare nel ramo `main`, cartella principale; verificare GitHub Pages e risultato pubblico. Versionare gli script modificati quando necessario per evitare codice vecchio in cache.
6. Annotare in `CHANGELOG.md`; aggiornare guida e README se cambiano struttura/procedure. Riferire modifiche, verifiche e passaggi ancora necessari.

## Mappa dei file

| File | Ruolo |
| --- | --- |
| `index.html` | Home, numeri, mission, contatti, foto e storie |
| `percorsi.html`, `percorsi.js`, `servizi-grid.css` | Tutti i servizi: nove schede flip, griglia 3×3 PC, due colonne tablet, una su telefono |
| `laboratori-creativi.html`, `album.js` | Laboratori e tre gallerie |
| `materiale-personalizzato.html` | Strumenti, esempi e preventivo materiale |
| `pescara-solidale.html`, `lezioni-circolari.html` | Programmi solidali |
| `risorse.html`, `domande-frequenti.html` | Risorse gratuite e FAQ |
| `recensioni.html`, `reviews.js` | Schede, filtri e «Mostra altro» |
| `reviews.json`, `google-reviews.json`, `all-reviews.json` | Dati recensioni da tenere coerenti con l’HTML |
| `stili-di-apprendimento.html` | Primo articolo e modello di riferimento |
| `articoli.html`, `album.html`, `eventi.html`, `archive.js` | Archivi, filtri e conclusione eventi |
| `events-data.json` | Registro eventi da aggiornare insieme all’HTML |
| `article-comments.js`, `comments-config.js` | Commenti e configurazione pubblica Supabase |
| `styles.css`, `archive.css` | Stile comune e impaginazione archivi |
| `site.js`, `home.js`, `services-motion.js`, `percorsi.js` | Menu, popup, anno footer, animazioni e schede servizi |
| `privacy.html`, `privacy.css` | Informativa privacy e cookie, indice e impaginazione leggibile |
| `sitemap.xml`, `robots.txt` | Pagine e scansione |
| `README.md`, `GUIDA-GESTIONE.md`, `CHANGELOG.md`, `AGENTS.md` | Presentazione, gestione, cronologia e riferimento Codex |

Il solo caricamento di una foto o la sola modifica di un JSON non aggiorna tutte le pagine: elenchi, miniature e conteggi statici devono essere mantenuti insieme.


## Fonti condivise e generazione statica (9 ottobre 2026)

- `site-data.json` è la fonte unica per contatti, link dei due preventivi, social, indirizzi, menu/footer e riepilogo Google (media, massimo, quantità, data verificata e URL). I form lezioni e materiale sono distinti. Il numero WhatsApp deriva dal telefono principale. Gli indirizzi pubblico e legale mantengono le formulazioni approvate.
- `header.html.in` e `footer.html.in` sono i componenti condivisi. I file `*.html.in` delle pagine contengono il testo, il markup e le grafiche originali con segnaposto `{{...}}`. Modificare queste fonti; non correggere soltanto l’HTML generato.
- `python build_site.py` rigenera le 14 pagine e sincronizza esclusivamente i metadati Google di `google-reviews.json` e `all-reviews.json`. I testi e i tag delle singole recensioni restano nelle fonti attuali e devono essere aggiornati separatamente.
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
