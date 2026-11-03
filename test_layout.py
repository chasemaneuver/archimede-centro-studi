"""Protect stable public URLs and exclude archived files from deployments."""
from pathlib import Path
import tempfile
import unittest
from layout import asset_files, asset_path
import build_site as site

class LayoutTests(unittest.TestCase):
    def test_public_assets_are_unique_and_archive_is_excluded(self):
        files=asset_files(site.ROOT)
        self.assertIn('logo.svg',files)
        self.assertIn('quaderno-home.svg',files)
        self.assertNotIn('google-reviews.js',files)
        self.assertNotIn('sponsor-citta-pescara.png',files)
        self.assertEqual(files['styles.css'].parent,site.ROOT/'assets'/'css')
        self.assertIsNone(asset_path(site.ROOT,'../AGENTS.md'))

    def test_duplicate_public_name_fails_instead_of_overwriting(self):
        with tempfile.TemporaryDirectory(dir=site.ROOT,prefix='_test_layout_') as folder:
            root=Path(folder).resolve()
            self.assertTrue(root.is_relative_to(site.ROOT.resolve()))
            (root/'assets'/'css').mkdir(parents=True)
            (root/'styles.css').write_text('old')
            (root/'assets'/'css'/'styles.css').write_text('new')
            with self.assertRaises(ValueError): asset_files(root)
            with self.assertRaises(ValueError): asset_path(root,'styles.css')

    def test_rendered_images_reserve_space_and_previews_keep_original_links(self):
        from html.parser import HTMLParser
        class Images(HTMLParser):
            def __init__(self, html):
                super().__init__(); self.images=[]; self.link=None; self.feed(html)
            def handle_starttag(self, tag, attrs):
                attrs=dict(attrs)
                if tag=='a': self.link=attrs.get('href')
                if tag=='img': self.images.append((attrs,self.link))
            def handle_endtag(self, tag):
                if tag=='a': self.link=None
        for name,html in site.generate().items():
            if not name.endswith('.html'): continue
            for image,link in Images(html).images:
                self.assertTrue(image.get('width') and image.get('height'), (name,image))
                src=image.get('src','')
                if src.endswith('-thumb.webp'):
                    self.assertIsNotNone(link,(name,src))
                    self.assertTrue(link.endswith('.jpg'),(name,src,link))
                    original=asset_path(site.ROOT,link.removeprefix('./'))
                    preview=asset_path(site.ROOT,src.removeprefix('./'))
                    self.assertLess(preview.stat().st_size,original.stat().st_size,(name,src))
