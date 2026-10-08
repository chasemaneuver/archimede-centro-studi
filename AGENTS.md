# Lavorare sul sito Archimede

Prima di modificare il sito, leggere [GUIDA-GESTIONE.md](./GUIDA-GESTIONE.md) e [STILE-E-COMPONENTI.md](./STILE-E-COMPONENTI.md).

La guida documenta articoli, eventi, foto, recensioni e manutenzione. Il riferimento di stile descrive titoli, grafica Classe A/B, animazioni, componenti, menu e link ricorrenti. Verificare il repository corrente prima di usare una copia locale precedente. Le istruzioni esplicite dell’utente hanno precedenza.

Aggiornare insieme pagine, archivi, dati di supporto, collegamenti e metadati pertinenti. Per contatti, preventivi, menu/footer e riepilogo Google leggere la sezione Fonti condivise della guida: modificare `site-data.json` e i modelli `*.html.in`, poi rigenerare con `python build_site.py`. Gli altri JSON non generano automaticamente il contenuto delle pagine. Conservare gli URL delle iniziative concluse.

Prima di dichiarare completata una pubblicazione, verificare deployment e risultato pubblico. Annotare in `CHANGELOG.md`; aggiornare guida e README se cambia struttura o funzionamento.

Non pubblicare segreti Supabase. Riutilizzare il progetto esistente e registrare gli slug dei nuovi articoli come descritto nella guida. Non inventare dati, recensioni, prezzi o date; chiedere soltanto le informazioni mancanti indispensabili.

Prima del commit: `python -m unittest test_build_site.py` e `python build_site.py --check`. Non modificare soltanto gli HTML generati. La pubblicazione usa il workflow GitHub Pages con output `_site`.
