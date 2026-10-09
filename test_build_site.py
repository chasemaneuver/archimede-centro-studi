"""Regression checks for shared sources; no network calls or production mutations."""
import copy
import unittest
import build_site as site

class SharedSourcesTests(unittest.TestCase):
    def test_current_pages_match_sources(self):
        output = site.generate()
        self.assertIn('index.html', output)
        self.assertTrue(all(p.endswith('.html') for p in output if p != 'sitemap.xml' and p not in {'google-reviews.json','all-reviews.json'}))
        for name, text in output.items():
            with self.subTest(page=name):
                self.assertEqual((site.ROOT/name).read_text(encoding='utf-8'), text)

    def test_contact_and_menu_changes_reach_every_page(self):
        config = copy.deepcopy(site.load_config())
        config['contacts']['email'] = 'test@example.invalid'
        config['contacts']['phone'] = '+390000000000'
        config['navigation'][0]['links'][0]['label'] = 'Pagina iniziale di prova'
        config['footer'][0]['label'] = 'Mission di prova'
        for name,text in site.generate(config=config).items():
            if not name.endswith('.html'): continue
            with self.subTest(page=name):
                self.assertNotIn('segreteria@archimedecentrostudi.com', text)
                if 'https://wa.me/393283861422' in (site.ROOT/name).read_text(encoding='utf-8'):
                    self.assertIn('https://wa.me/390000000000', text)
                self.assertIn('tel:+390000000000', text)
                self.assertNotIn('+39 328 386 1422', text)
                self.assertIn('Pagina iniziale di prova', text)
                self.assertIn('Mission di prova', text)

    def test_google_summary_changes_in_html_and_json(self):
        import json
        config = copy.deepcopy(site.load_config())
        config['google'].update(rating=4.8, count=31, checkedAt='2026-11-02')
        output = site.generate(config=config)
        self.assertIn('4,8/5', output['index.html'])
        self.assertIn('data-count="4.8"', output['index.html'])
        self.assertIn('31 recensioni', output['recensioni.html'])
        self.assertIn('2 novembre 2026', output['recensioni.html'])
        self.assertEqual(json.loads(output['google-reviews.json'])['rating'],4.8)
        self.assertEqual(json.loads(output['all-reviews.json'])['googleCount'],31)
        for filename in ('google-reviews.json','all-reviews.json'):
            self.assertEqual(json.loads(output[filename])['reviews'],json.loads((site.ROOT/filename).read_text(encoding='utf-8'))['reviews'])

    def test_quotes_are_separate(self):
        config = copy.deepcopy(site.load_config())
        config['links']['lessonQuote'] = 'https://example.invalid/lezioni'
        config['links']['materialQuote'] = 'https://example.invalid/materiale'
        output = site.generate(config=config)
        self.assertTrue(any('https://example.invalid/lezioni' in text for text in output.values()))
        self.assertIn('https://example.invalid/materiale',output['materiale-personalizzato.html'])
        self.assertNotIn('https://example.invalid/lezioni',output['materiale-personalizzato.html'])

    def test_invalid_config_and_unknown_tokens_fail(self):
        with self.assertRaises(ValueError): site.render('{{missing.value}}',{})
        config=copy.deepcopy(site.load_config())
        config['google']['rating']=6
        with self.assertRaises(ValueError): site.generate(config=config)
        config=copy.deepcopy(site.load_config())
        config['navigation'][0]['links'][0]['url']='./AGENTS.md'
        with self.assertRaises(ValueError): site.generate(config=config)
        config['navigation'][0]['links'][0]['url']='/index.html'
        with self.assertRaises(ValueError): site.generate(config=config)
        config=copy.deepcopy(site.load_config())
        config['navigation'][0]['links'][0]['url']='./pagina-inesistente.html'
        with self.assertRaises(ValueError): site.generate(config=config)

from test_editorial import EditorialTests

if __name__=='__main__': unittest.main()
