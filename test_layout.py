"""Protect stable public URLs and exclude archived files from deployments."""
from pathlib import Path
import tempfile
import unittest
from layout import asset_files, asset_path
import build_site as site

class LayoutTests(unittest.TestCase):
    def test_public_assets_are_unique_and_archive_is_excluded(self):
        files=asset_files(site.ROOT)
        self.assertIn('logo.png',files)
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
