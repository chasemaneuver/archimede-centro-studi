"""Meaningful propagation and future-publication tests; fixtures never go online."""
import copy
import json
import re
import unittest
from unittest.mock import patch
import build_site as site
import editorial

def schema(page):
    return json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>',page,re.S)[1])

class EditorialTests(unittest.TestCase):
    def setUp(self):
        self.articles=editorial.read_records(site.ROOT,'articles-data.json')
        self.events=editorial.read_records(site.ROOT,'events-data.json')

    def test_existing_content_and_comment_identity_are_preserved(self):
        output=site.generate()
        original=(site.ROOT/'stili-di-apprendimento.content.html').read_text(encoding='utf-8')
        self.assertIn('Lo stile di apprendimento può essere definito',output['stili-di-apprendimento.html'])
        self.assertIn('data-article="stili-di-apprendimento"',output['stili-di-apprendimento.html'])
        self.assertIn('2024-03-23T23:06:57+01:00',output['stili-di-apprendimento.html'])
        self.assertEqual(schema(output['stili-di-apprendimento.html'])['wordCount'],336)
        self.assertIn('2 minuti di lettura',output['articoli.html'])
        self.assertIn('31 dicembre 2026',output['pescara-solidale.html'])
        self.assertEqual(schema(output['pescara-solidale.html'])['@type'],'WebPage')

    def test_new_article_reaches_page_archive_resources_and_sitemap(self):
        article=copy.deepcopy(self.articles[0]);article.update(slug='articolo-di-prova',url='articolo-di-prova.html',
            title='Un titolo di prova',titleFirst='Un titolo',titleEmphasis='di prova.',tags=['Metodo di studio'],comments=False)
        original=editorial.body_source
        def content(root,record):
            return '<p>'+'parola '*450+'</p>' if record['slug']=='articolo-di-prova' else original(root,record)
        with patch.object(editorial,'body_source',side_effect=content):
            output=site.generate(articles=self.articles+[article])
        page=output['articolo-di-prova.html']
        self.assertNotIn('id="comment-form"',page)
        self.assertIn('3 minuti di lettura',page)
        self.assertIn('3 minuti di lettura',output['articoli.html'])
        self.assertEqual(schema(page)['timeRequired'],'PT3M')
        self.assertEqual(schema(page)['wordCount'],450)
        self.assertIn('data-tag="Metodo di studio"',output['articoli.html'])
        self.assertIn('Metodo+di+studio',output['articoli.html'])
        self.assertIn('Un titolo di prova',output['risorse.html'])
        self.assertIn('articolo-di-prova.html',output['sitemap.xml'])

    def test_new_event_generates_detail_archive_and_sitemap(self):
        event=copy.deepcopy(self.events[0]);event.update(slug='evento-di-prova',url='evento-di-prova.html',
            title='Evento di prova',titleFirst='Evento',titleEmphasis='di prova.',layout='standard',status='past',
            end='2026-06-02',startDate='2026-06-01T15:00:00+02:00',endDate='2026-06-02T18:00:00+02:00',
            location={'@type':'Place','name':'Luogo di prova'},registrationUrl='https://example.invalid/iscrizioni')
        output=site.generate(events=self.events+[event])
        self.assertEqual(schema(output['evento-di-prova.html'])['@type'],'Event')
        self.assertNotIn('https://example.invalid/iscrizioni',output['evento-di-prova.html'])
        self.assertIn('Evento di prova',output['eventi.html'].split('id="events-past">')[1])
        self.assertIn('data-status="past"',output['eventi.html'])
        self.assertIn('evento-di-prova.html',output['sitemap.xml'])

    def test_dates_and_title_propagate_from_existing_event(self):
        events=copy.deepcopy(self.events);events[0].update(title='Titolo verificato di prova',end='2026-12-30')
        output=site.generate(events=events)
        self.assertIn('Titolo verificato di prova',output['eventi.html'])
        self.assertIn('Titolo verificato di prova',output['pescara-solidale.html'])
        self.assertIn('30 dicembre 2026',output['pescara-solidale.html'])
        self.assertIn('datetime="2026-12-30"',output['eventi.html'])

    def test_invalid_editorial_sources_block_build(self):
        variants=[]
        duplicate=copy.deepcopy(self.articles);duplicate.append(copy.deepcopy(duplicate[0]));variants.append(duplicate)
        missing=copy.deepcopy(self.articles);missing[0]['image']['path']='non-presente.jpg';variants.append(missing)
        traversal=copy.deepcopy(self.articles);traversal[0]['contentFile']='../riservato.content.html';variants.append(traversal)
        collision=copy.deepcopy(self.articles);collision[0].update(slug='privacy',url='privacy.html');variants.append(collision)
        for articles in variants:
            with self.subTest(articles=articles),self.assertRaises(ValueError): site.generate(articles=articles)
        events=copy.deepcopy(self.events);events[0]['startDate']='2027-01-01'
        with self.assertRaises(ValueError): site.generate(events=events)

    def test_lab_event_teaser_is_generated_and_removed_when_archived(self):
        event=copy.deepcopy(self.events[0]);event.update(slug='laboratorio-di-prova',url='laboratorio-di-prova.html',
            title='Laboratorio di prova',layout='standard',featuredInLabs=True,tags=['Arte e cultura'])
        output=site.generate(events=self.events+[event])
        self.assertIn('Laboratorio di prova',output['laboratori-creativi.html'])
        self.assertIn('Arte e cultura',output['eventi.html'])
        event['status']='past'
        output=site.generate(events=self.events+[event])
        self.assertNotIn('Laboratorio di prova',output['laboratori-creativi.html'])
        self.assertIn('Laboratorio di prova',output['eventi.html'])

    def test_json_ld_is_safe_for_authored_punctuation(self):
        articles=copy.deepcopy(self.articles);articles[0]['seoTitle']='Un titolo </script> & "virgolette"'
        page=site.generate(articles=articles)['stili-di-apprendimento.html']
        self.assertEqual(schema(page)['headline'],articles[0]['seoTitle'])
        self.assertIn('\\u003c/script>',page)

if __name__=='__main__': unittest.main()
