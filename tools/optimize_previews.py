"""Rebuild gallery WebP previews; requires Pillow only for this maintenance task.

The normal site build remains Python-standard-library only. JPEG originals and
existing public JPEG previews are retained for compatibility.
"""
from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def main():
    results = []
    for source in sorted((ROOT / 'assets/images').glob('*-thumb.jpg')):
        preview = source.with_suffix('.webp')
        with Image.open(source) as image:
            image.save(preview, 'WEBP', quality=82, method=6)
        before, after = source.stat().st_size, preview.stat().st_size
        if after >= before:
            preview.unlink()
            continue
        results.append(dict(source=source.name, preview=preview.name,
                            before=before, after=after))
    manifest = ROOT / 'docs/gallery-previews.json'
    manifest.write_text(json.dumps(results, indent=2) + '\n', encoding='utf-8')
    print(f'{len(results)} previews: {sum(x["before"] for x in results)} -> '
          f'{sum(x["after"] for x in results)} bytes')


if __name__ == '__main__':
    main()
