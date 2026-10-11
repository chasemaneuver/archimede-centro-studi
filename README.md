# Archimede Centro Studi

Sito statico pubblicato su [archimedecentrostudi.com](https://archimedecentrostudi.com/).

## Dove lavorare

| Cartella o file | Contenuto |
| --- | --- |
| `templates/` | Modelli delle pagine, header/footer e componenti editoriali |
| `content/` | Testi degli articoli e degli eventi, senza impaginazione |
| `assets/images/` | Foto, miniature, loghi e illustrazioni SVG |
| `assets/css/` | Fogli di stile |
| `assets/js/` | Interazioni, animazioni e configurazione pubblica commenti |
| `docs/` | Note di produzione e provenienza delle immagini |
| `archivio/` | Materiali non più usati; esclusi dalla pubblicazione |
| `site-data.json` | Contatti, menu, footer, preventivi e riepiloghi piattaforme |
| `articles-data.json`, `events-data.json` | Dati editoriali |
| `*-reviews.json`, `reviews.json` | Fonti delle recensioni; i testi delle schede si aggiornano anche nel modello |
| `*.html`, `sitemap.xml` | Risultati generati e verificati, da non modificare direttamente |
| `build_site.py`, `editorial.py`, `layout.py` | Generazione, validazione e mappatura degli URL |
| `test_*.py` | Test eseguiti anche da GitHub Actions |
| `.github/workflows/pages.yml` | Compilazione e pubblicazione automatica |

Le istruzioni principali restano facilmente visibili in radice:
[AGENTS.md](./AGENTS.md), [GUIDA-GESTIONE.md](./GUIDA-GESTIONE.md),
[STILE-E-COMPONENTI.md](./STILE-E-COMPONENTI.md) e [CHANGELOG.md](./CHANGELOG.md).

## Aggiornamento e controlli

```sh
python build_site.py
python -m unittest test_build_site.py
python build_site.py --check
python build_site.py --output-dir _site
python -m http.server 8766 --directory _site
```

La directory di output deve essere nuova o vuota. Aprire l'anteprima su `http://localhost:8766/`.
Non servire la radice del repository: contiene le fonti e gli asset sono organizzati diversamente.

`layout.py` copia gli asset nel sito generato con gli stessi nomi pubblici precedenti.
Ad esempio `assets/css/styles.css` viene pubblicato come `/styles.css`:
non cambiare i riferimenti HTML/CSS/JS aggiungendo il prefisso `assets/`.
Nomi pubblici duplicati bloccano la compilazione. Gli HTML e la sitemap conservano gli URL esistenti.

GitHub Actions verifica i file generati e i test, crea `_site` e pubblica l'artefatto su GitHub Pages.
Modelli, Python, documentazione e archivio non entrano nell'artefatto. La cronologia Git conserva
le versioni precedenti: non aggiungere copie di backup o cartelle di prove al repository.

## Contenuti e servizi

Il sito comprende 16 pagine, articoli ed eventi con archivi, gallerie fotografiche, FAQ e una
raccolta unica di recensioni. I dati delle piattaforme vengono aggiornati manualmente e verificati:
la home include Google, Facebook e Trustpilot, senza duplicati; le stelle WhatsApp sono decorative.

I commenti usano il progetto Supabase esistente. La pubblicazione del sito non modifica il database:
per un nuovo articolo registrare lo slug come indicato nella guida. Non inserire segreti nei file.

Per nuove pagine, immagini, recensioni o articoli seguire le guide e controllare sempre
il risultato pubblico dopo il deploy. Il dominio pubblico e la base SEO sono centralizzati in
`site-data.json`. Il quaderno della vecchia home resta disponibile in `assets/images/quaderno-home.svg`.
