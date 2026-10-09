# Stile e componenti Archimede

Riferimento per creare nuove sezioni e aggiornare quelle esistenti. Revisione: **9 ottobre 2026**. Integra [GUIDA-GESTIONE.md](./GUIDA-GESTIONE.md); leggere entrambi prima di intervenire.

Le istruzioni esplicite più recenti di Archimede hanno precedenza. Le regole descrivono il sito attuale: non impongono di ridisegnare le pagine già approvate a ogni aggiornamento. Prima di riutilizzare un componente, confrontare codice e risultato della pagina pubblicata.

## 1. Identità visiva e impaginazione

| Uso | Colore |
| --- | --- |
| Petrolio, testo principale e dettagli | `#004A59` |
| Arancione, accenti | `#F07018` |
| Crema/giallo tenue, evidenziatori e riquadri | `#FFF5CB` |
| Verde acqua, superfici e illustrazioni | `#B6E3D4` |
| Azzurro, dettagli e orbite | `#33A7B5` |
| Fondo pagina | `#FAF9F5` |

- Riutilizzare variabili e componenti di `styles.css`, evitando una nuova palette o un framework estraneo.
- Testo corrente in Arial/Helvetica/sans-serif; parti editoriali in corsivo in Georgia/Times New Roman/serif.
- Spaziatura ariosa, bordi sottili, angoli arrotondati e ombre leggere. Mantenere contrasto leggibile, anche nei riquadri colorati: nessun pulsante con testo dello stesso colore del fondo.
- La larghezza comune è definita da `.wrap` (massimo 1180px); usare il layout condiviso, senza larghezze rigide che causino scorrimento orizzontale.
- Sulle pagine di presentazione la grafica affianca il titolo a destra su PC e passa sotto su telefono. Gli articoli mantengono invece il proprio modello editoriale: non occorre aggiungere un’illustrazione hero a ogni articolo.
- Larghezza del testo proporzionata alle immagini: vicino a locandine molto verticali evitare paragrafi lunghissimi su una riga. Conservare il testo più stretto del riquadro «Hai già un voucher?».

## 2. Titoli, testi e frecce

- Titoli originali e pertinenti, come «Il tuo centro studi, su misura.» o «Storie diverse, un’unica raccolta.». Evitare titoli principali composti soltanto da «Archimede Centro Studi» o «Archimede — Percorsi».
- Il breadcrumb a slash spiega già la posizione nel sito; non duplicarlo come titolo editoriale.
- Nei titoli principali composti, mantenere prima parte grande e seconda parte a capo in corsivo (`<em>`), con evidenziatore crema leggermente inclinato sotto. Usare gli stili globali di `h1 em` e `h2 em`: non disegnare un sottolineato diverso per ogni pagina.
- L’evidenziatore attuale è ruotato di circa `-2deg`, dietro al testo. Controllare che non sparisca per contrasto, clipping o ordine dei livelli. I titoli brevi delle schede e le etichette non richiedono tutti corsivo ed evidenziatore.
- Un solo `h1` per pagina; gerarchia `h2`/`h3` coerente. Mantenere eyebrow e breadcrumb distinti dal titolo.
- Non copiare testi di altri centri studi. Non inventare risultati, citazioni o promesse; chiedere i dati operativi mancanti.
- Evitare un eccesso di link nei paragrafi. I cinque punti della mission restano senza collegamenti ipertestuali.
- Frecce delle azioni come «Leggi le testimonianze» e «Parliamone insieme»: `↗`, verso l’alto a destra. `↓` indica «Mostra altro»; `←`/`→` sono per lo scorrimento delle gallerie; `↻` può indicare il cambio lato delle schede.

## 3. Due famiglie di grafiche

Le illustrazioni sono SVG e codice del sito, con elementi riconoscibili, curati e riferiti al contenuto della pagina. Evitare simboli generici, parti anatomiche ambigue, elementi superflui o testo che esce dal foglio. Il lettering deve restare leggibile sul telefono.

### Classe A — pagine principali

- Riferimenti approvati: quaderno della **home** e grafica di **Tutti i servizi**.
- Composizione elaborata, con più elementi ben organizzati, profondità, fogli/quaderno, strumenti e richiami allo studio. «Elaborata» non significa affollata.
- Tutti i servizi: non reintrodurre lo schermo con tutor, la matita o la scritta «Un passo alla volta», eliminati su richiesta.
- Il quaderno della home è un riferimento stilistico, non un disegno da copiare identico in ogni sezione.

### Classe B — pagine secondarie

- Riferimenti attuali: **Recensioni, Domande frequenti, Laboratori creativi, Materiale personalizzato e Lezioni Circolari**.
- Composizione più contenuta, ma rifinita; stessa palette, superfici tipo carta, grande ellisse tratteggiata e satelliti azzurro/arancione dove presenti. Ogni grafica deve richiamare il proprio tema.
- Recensioni: connessioni, passaparola, cura e dedizione. FAQ: curiosità, domande, studenti/insegnanti e comunità. Laboratori: arte, storia e cultura italiana. Materiale: libri, globo e strumenti per studiare. Lezioni Circolari: condivisione del sapere e solidarietà.
- Laboratori: mantenere il libro eliminato fuori dalla composizione; pennello con manico, ghiera e punta di setole chiaramente leggibili.
- Lezioni Circolari: figure senza le vecchie braccia, con frecce comprensibili e senza sovrapposizioni che ne nascondano la direzione.

## 4. Animazioni delle grafiche

**Ingresso e ricomposizione**

- Gli elementi partono separati, lontani dalla posizione finale, e si ricompongono dolcemente. Un ingresso per caricamento della pagina, quando la grafica entra in vista; non ripeterlo a ogni passaggio dello scroll. Ricaricare la pagina può avviarlo nuovamente.
- Riutilizzare `.assembly-piece`, classi di ingresso e `home-motion.css`/`home.js`, preservando i transform propri dello SVG. La ricomposizione condivisa attuale dura 2,4 secondi più i piccoli ritardi dei singoli elementi.
- Non nascondere permanentemente contenuto o grafica se JavaScript non funziona. L’aspetto statico deve essere completo e leggibile.

**Macchia d’acqua**

- Arriva dall’alto a destra come una scia fluida, si avvolge e termina nella forma approvata dietro la composizione.
- Riutilizzare il movimento continuo di `.water-shape`: nel codice attuale dura circa 5,5 secondi, con interpolazione dei punti, ondulazione e rotazione attorno a un’origine SVG stabile.
- Evitare sequenze a scatti o cambi bruschi di centro/scala. Al termine ripristinare esattamente il tracciato e la posizione finali; ingresso una sola volta.

**Stelline**

- Arancione e blu ruotano sul proprio baricentro, senza spostarsi attorno al quaderno.
- Una in senso orario e l’altra antiorario. La rotazione comincia già durante la ricomposizione, quando sono ancora lontane, e continua dopo l’ingresso.
- Riutilizzare `.notebook-star` e `.star-counterclockwise`, con rotazione lineare di 16 secondi. Separare il gruppo di ingresso dall’elemento che ruota, così i due movimenti non si annullano.

**Ellisse e satelliti**

- Il tracciato deve essere una vera ellisse tratteggiata; i due satelliti azzurro e arancione devono seguire esattamente quel tracciato, non un cerchio o un’orbita approssimata.
- Usare `services-motion.js`: calcolare le posizioni da centro e raggi dell’ellisse visibile, con inclinazione coerente. Il codice attuale usa `-10deg`, periodo 18 secondi e satelliti in fasi opposte (`0` e `π`), percorrendo la stessa orbita.
- Geometria di riferimento Classe B: viewBox `500 370`, centro `250 185`, raggi `220 157`. Tutti i servizi: viewBox `620 500`, centro `310 250`, raggi `267 199`. Se cambia la geometria, cambiare insieme tracciato e calcolo dell’orbita.
- L’orbita piccola della home e della testimonianza ha un proprio componente: non sostituirla automaticamente con l’ellisse grande. Non introdurre un satellite in una grafica che non lo prevede.

**Prestazioni e interazione**

- Fermare i cicli quando la grafica è fuori vista o la scheda del browser è nascosta. Usare le preferenze di movimento ridotto per mostrare la composizione statica, senza ingresso, acqua, stelle o orbite animate.
- Movimento leggero al puntatore solo con mouse/puntatore preciso; niente parallax obbligatorio su touch. Il componente condiviso attuale si muove al massimo di circa 4px per asse e torna al centro quando il puntatore esce.
- Riutilizzare le animazioni condivise: verificare i selettori sul nuovo contenitore. Alcune inizializzazioni di `home.js` scelgono la prima grafica compatibile; aggiungerne più di una sulla stessa pagina richiede una verifica o un adattamento esplicito.

## 5. Movimenti e componenti della home

- Contatori: crescono una volta alla comparsa, per circa 1,6 secondi, con valori finali leggibili e bordo sottile arrotondato. Media con virgola italiana e `/5`; animazione non equivale ad aggiornamento dei dati.
- Mission: riquadro verde acqua inclinato `-2deg`, speculare alla testimonianza di Francesco a `+2deg`. Preservare queste inclinazioni quando si aggiunge un movimento di ingresso.
- Testimonianza gialla: ingresso una volta, con lieve salita e assestamento della rotazione fino all’inclinazione finale; non renderla oscillante continuamente.
- I punti restano 01 ascolto, 02 percorso, 03 accompagnamento, 04 «Rimani aggiornato» con materiale personalizzato, 05 «Divertiti!» con laboratori. Nessun link nei singoli punti.
- Contatti verticali accanto alla mission: «Il primo passo è una conversazione» / «Parliamo del tuo percorso», senza riquadro giallo. WhatsApp ed email affiancati, spazio sotto per la striscia foto. Mantenere l’adattamento su schermi stretti.
- Striscia foto: scorrimento automatico continuo, comando pausa, pausa anche su hover/focus e quando il popup è aperto. Con movimento ridotto, scorrimento manuale senza animazione. Le immagini aprono il popup condiviso.
- Il richiamo completo «Le vostre storie» resta nella home dopo la mission. Nella pagina Recensioni non ricreare quel riquadro introduttivo.

## 6. Foto, schede e interazioni

- Gli ingrandimenti fotografici usano il dialog condiviso di `site.js`: foto sulla pagina corrente, X in alto a destra, chiusura con Escape/sfondo e ritorno del focus. Non aprire la foto in un’altra pagina costringendo a usare «Indietro».
- I loghi sponsor fanno eccezione: aprono le destinazioni esterne e non il popup. Comune di Pescara → pagina comunale del programma; BuoniSpesa → `https://buonispesa.lascaux.it/`.
- Ventaglio dei laboratori: tre card sovrapposte, inclinazione complessiva `+2deg`, angoli iniziali distanziati per rendere raggiungibili la seconda e la terza foto. Il componente attuale usa circa 0/11/22 gradi relativi, oltre all’inclinazione del gruppo. Su telefono il ventaglio ha larghezza massima 240px e proporzioni ridotte per contenere tutte le card nello schermo.
- Hover sulla seconda/terza: la scelta sale e le altre si aprono ai lati; mantenerla stabile finché il puntatore non esce dal ventaglio, poi ripristinare. Supportare focus da tastiera; su touch il clic continua ad aprire la foto senza richiedere hover.
- Card fotografica singola delle Lezioni Circolari: inclinata `+2deg`, bordo carta e ombra lieve.
- Gallerie laboratori: Studio, Laboratori e Locandine, tre riquadri sulla stessa riga PC e impilati su telefono; locandine/articolo interi e leggibili, senza ritaglio indiscriminato.
- Tutti i servizi: nove flip card, griglia 3×3 PC, due colonne tablet e una colonna telefono; gli adattamenti sono in `servizi-grid.css`. Dettagli temporanei su hover; il primo clic li mantiene aperti, il secondo li chiude. Tastiera ed Escape supportati. Su telefono la sola faccia visibile determina l’altezza, senza spazio riservato al retro. Non reintrodurre link ridondanti a una seconda sezione con gli stessi servizi.
- Recensioni: raccolta unica, tre colonne PC, tre schede iniziali e altre tre con «Mostra altro». Layout uniforme, testo completo, tag concordati, stelle e link Google, dicitura WhatsApp per le testimonianze manuali.
- FAQ: domande espandibili. Il riquadro finale «Il primo passo è una conversazione» deve restare uguale a quello finale delle Recensioni.

## 7. Menu e collegamenti ricorrenti

Ordine del menu: **Il centro → Percorsi → Risorse → Archivio**. Riutilizzare i sottomenu e la navigazione mobile; non trasformare ogni articolo o laboratorio in un nuovo tasto orizzontale.

- Percorsi: Tutti i servizi, Laboratori creativi, Materiale personalizzato.
- Risorse: Pescara Solidale, Lezioni Circolari, Risorse gratuite.
- Archivio: Album, Articoli, Eventi.
- Il centro: Home, La nostra mission, Recensioni, Domande frequenti.

Ordine footer attuale: La nostra mission, Le vostre storie, Domande frequenti, Tutti i servizi, Laboratori creativi, Materiale personalizzato, Lezioni Circolari, Pescara Solidale, Risorse gratuite, Album, Articoli, Eventi, Collaborazioni.

| Azione | Destinazione da riutilizzare |
| --- | --- |
| Contatti generali | `./index.html#contatti` |
| Mission | `./index.html#metodo` |
| Servizi | `./percorsi.html` |
| Recensioni | `./recensioni.html`; conservare gli ID dei collegamenti alle singole storie |
| Preventivo lezioni | `https://forms.gle/VLtMAeRPK9gQAc4CA` |
| Preventivo materiale | `https://docs.google.com/forms/d/e/1FAIpQLSezMR2AhGpUyTZm1FscXnVwlMP3F2pmwX_RkVskhLWrc27QBg/viewform` |
| WhatsApp | `https://wa.me/393283861422`; conservare i messaggi precompilati pertinenti quando presenti |
| Email | `mailto:segreteria@archimedecentrostudi.com`; oggetto coerente con consulenza/materiale se presente |
| Telefono | `tel:+393283861422` |
| Secondo telefono | `tel:+393292756109`; mostrarlo nei footer e nei riquadri contatti, senza usarlo per WhatsApp |
| BuoniSpesa | `https://buonispesa.lascaux.it/` |

- Non scambiare i due preventivi. Un invito a richiedere materiale va al suo modulo; i contatti restano un’alternativa. Non aggiungere un nuovo form locale che simuli un invio non configurato.
- Sede attuale: Strada comunale piana, 21 — 65129 Pescara. Social: Instagram `amcentrostudi`, Facebook `archimedecentrostudi`, TikTok `@archimedecentrostudi`. Verificare prima di modificarli.
- Link Google delle recensioni individuali e link comunali variano secondo recensione/edizione: riutilizzare la fonte corretta, non un URL generico inventato.
- Link interni relativi coerenti con GitHub Pages; link esterni con `rel="noopener"` se aperti in nuova scheda. File immagine usati nei popup non devono avere apertura in nuova scheda.
- Header/footer condivisi: modificare `site-data.json` e i componenti `.html.in`, poi rigenerare. Conservare breadcrumb, ancore storiche e logica di compatibilità dei vecchi link in `home.js`.

## 8. Verifiche prima della pubblicazione

- PC e telefono: titolo, testo e grafica senza tagli o sovrapposizioni, menu utilizzabile, griglie corrette, CTA leggibili.
- Controllare evidenziatori, focus da tastiera, popup, comportamento touch e preferenze di movimento ridotto.
- Animazioni: una sola ricomposizione, stelle indipendenti, acqua fluida, satelliti allineati al tracciato e pause fuori vista. Nessun elemento nascosto definitivamente per errore.
- Verificare entrambi i preventivi e tutti i link coinvolti; aggiornare archivi, conteggi, menu e metadati pertinenti.
- Gli SVG possono essere incorporati nell’HTML. Modificare la grafica effettivamente renderizzata e tenere coerente l’eventuale file SVG sorgente: un asset esterno non usato dalla pagina può essere una versione vecchia.
- Stili condivisi: `styles.css`, `home-motion.css`, `services-illustration.css`, `album.css`, `archive.css`. Script condivisi: `site.js`, `home.js`, `services-motion.js`, `album.js`, `percorsi.js`, `reviews.js`, `archive.js`.
- Dopo il deployment, verificare la pagina pubblica. Non dichiarare una verifica mobile o un controllo non effettuato; riferire eventuali limiti concreti.


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

## Dati associativi e footer (9 ottobre 2026)

- `organization` in `site-data.json` contiene denominazione, CF e dicitura RUNTS confermati dall’utente. Sede legale confermata: Strada Comunale Piana 21, 65129 Pescara (PE). Non inventare estremi del registro.
- Il footer mostra questi dati senza cifre delle entrate. Esplora Archimede è centrato sopra due colonne di link che mantengono l’ordine di lettura; su telefono i blocchi si impilano.
- L’iscrizione RUNTS non equivale da sola all’accreditamento al 5×1000: prima di pubblicare un invito verificare l’accreditamento pertinente. Gli eventuali adempimenti di trasparenza vanno valutati annualmente; questa modifica non li certifica.

## Recensioni Facebook — 9 ottobre 2026

Stesso layout delle altre schede; badge Consiglia al posto delle stelle per le raccomandazioni Facebook. Schede presenti su Google e Facebook: un solo testo e due collegamenti che vanno a capo quando necessario. Tre schede per riga PC, una su telefono, Mostra altro +3. Media unica home con convenzione positiva=5/5 approvata, calcolata dal generatore senza WhatsApp e senza duplicati; media Google originale nella pagina Recensioni.

## Sfondi fotografici — 9 ottobre 2026

`home-background.css` centralizza gli sfondi decorativi: `.hero-classroom` per la home e `.section-photo` con varianti tematiche. Opacità foto 20% PC, 15% fino a 780px; velo chiaro separato per leggibilità. Conservare le immagini ottimizzate WebP e scegliere il ritaglio in base al contenuto. Gli sfondi non entrano nell’Album documentario né aprono popup.

## Home fotografica — 9 ottobre 2026

La prima schermata mostra solo eyebrow e titolo originali sopra la foto dell’aula verde, con opacità 75% su PC e telefono e ombra nera intensa sul titolo, sottotitolo e freccia. La freccia porta a `#metodo`, dove sono collocati prima i quattro dati di Archimede, poi mission e conversazione. Tre azioni affiancate nella conversazione: WhatsApp, email e percorsi (`percorsi.html`, Tutti i servizi). Il quaderno rimosso dalla home è conservato in `quaderno-home.svg`; CSS/JS condivisi delle animazioni restano per le altre grafiche. `home-layout.css` contiene le nuove regole dedicate: gli altri sfondi conservano opacità 20% PC / 15% telefono.

## Trustpilot Review Collector — 9 ottobre 2026

Solo Recensioni carica il bootstrap TrustBox ufficiale HTTPS, asincrono, e il widget fornito dall’utente (template 56278e9abfbbba0bdcd568bc, businessunit 6ac9236aca514bb722fefa34). Il data-token è parte del codice pubblico del widget, non una chiave amministrativa. Tre riquadri su PC, impilati fino a 950px. Il Collector non mostra punteggio o conteggio: non inventarli né aggiungerli alla media della home. Il link nel widget è il fallback senza script. Per aggiungere un riepilogo Trustpilot usare un codice/valori verificati successivamente. Privacy aggiornata per richieste al fornitore e misurazioni del widget; FAQ ufficiali consultate dichiarano assenza di cookie e tecnologie analoghe nel TrustBox. Ricontrollare al cambio di widget.

Titolo hero aggiornato: sans serif peso 900, fino a 104px su PC, prima riga bianca e seconda arancione in corsivo grassetto; ombra nera 4px 4px 6px ispirata al riferimento CEPU. Regole limitate alla home.
