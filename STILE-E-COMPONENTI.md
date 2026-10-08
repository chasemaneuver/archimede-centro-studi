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
- Ventaglio dei laboratori: tre card sovrapposte, inclinazione complessiva `+2deg`, angoli iniziali distanziati per rendere raggiungibili la seconda e la terza foto. Il componente attuale usa circa 0/11/22 gradi relativi, oltre all’inclinazione del gruppo.
- Hover sulla seconda/terza: la scelta sale e le altre si aprono ai lati; mantenerla stabile finché il puntatore non esce dal ventaglio, poi ripristinare. Supportare focus da tastiera; su touch il clic continua ad aprire la foto senza richiedere hover.
- Card fotografica singola delle Lezioni Circolari: inclinata `+2deg`, bordo carta e ombra lieve.
- Gallerie laboratori: Studio, Laboratori e Locandine, tre riquadri sulla stessa riga PC e impilati su telefono; locandine/articolo interi e leggibili, senza ritaglio indiscriminato.
- Tutti i servizi: nove flip card, griglia 3×3 PC, due colonne tablet e una colonna telefono; gli adattamenti sono in `servizi-grid.css`. Dettagli su hover o con il pulsante; tastiera ed Escape supportati. Non reintrodurre link ridondanti a una seconda sezione con gli stessi servizi.
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
| BuoniSpesa | `https://buonispesa.lascaux.it/` |

- Non scambiare i due preventivi. Un invito a richiedere materiale va al suo modulo; i contatti restano un’alternativa. Non aggiungere un nuovo form locale che simuli un invio non configurato.
- Sede attuale: Strada comunale piana, 21 — 65129 Pescara. Social: Instagram `amcentrostudi`, Facebook `archimedecentrostudi`, TikTok `@archimedecentrostudi`. Verificare prima di modificarli.
- Link Google delle recensioni individuali e link comunali variano secondo recensione/edizione: riutilizzare la fonte corretta, non un URL generico inventato.
- Link interni relativi coerenti con GitHub Pages; link esterni con `rel="noopener"` se aperti in nuova scheda. File immagine usati nei popup non devono avere apertura in nuova scheda.
- Header/footer ripetuti: riportare le modifiche in tutte le pagine. Conservare breadcrumb, ancore storiche e logica di compatibilità dei vecchi link in `home.js`.

## 8. Verifiche prima della pubblicazione

- PC e telefono: titolo, testo e grafica senza tagli o sovrapposizioni, menu utilizzabile, griglie corrette, CTA leggibili.
- Controllare evidenziatori, focus da tastiera, popup, comportamento touch e preferenze di movimento ridotto.
- Animazioni: una sola ricomposizione, stelle indipendenti, acqua fluida, satelliti allineati al tracciato e pause fuori vista. Nessun elemento nascosto definitivamente per errore.
- Verificare entrambi i preventivi e tutti i link coinvolti; aggiornare archivi, conteggi, menu e metadati pertinenti.
- Gli SVG possono essere incorporati nell’HTML. Modificare la grafica effettivamente renderizzata e tenere coerente l’eventuale file SVG sorgente: un asset esterno non usato dalla pagina può essere una versione vecchia.
- Stili condivisi: `styles.css`, `home-motion.css`, `services-illustration.css`, `album.css`, `archive.css`. Script condivisi: `site.js`, `home.js`, `services-motion.js`, `album.js`, `percorsi.js`, `reviews.js`, `archive.js`.
- Dopo il deployment, verificare la pagina pubblica. Non dichiarare una verifica mobile o un controllo non effettuato; riferire eventuali limiti concreti.
