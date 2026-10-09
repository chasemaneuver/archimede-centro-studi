"""Generate checked-in static HTML from *.html.in and site-data.json (stdlib only)."""
from pathlib import Path
from datetime import date
from html import escape, unescape
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import argparse
import copy
import json
import re
import shutil
import editorial

ROOT = Path(__file__).resolve().parent
TOKEN = re.compile(r'\{\{([A-Za-z][A-Za-z0-9_.]*)\}\}')
MONTHS = ('gennaio febbraio marzo aprile maggio giugno luglio agosto settembre ottobre novembre dicembre').split()

def public_asset(path):
    return path.name not in {'site-data.json','articles-data.json','events-data.json'} and (path.suffix.lower() in {
        '.css','.js','.svg','.png','.jpg','.jpeg','.webp','.gif','.pdf','.json','.woff','.woff2','.ico','.xml'
    } or path.name in {'robots.txt','CNAME','.nojekyll'})

def load_config(root=ROOT):
    return json.loads((root / 'site-data.json').read_text(encoding='utf-8'))

def overall_rating(records, positive_value):
    """One vote per unique card; WhatsApp stars are decorative, not ratings."""
    if positive_value != 5:
        raise ValueError('Convenzione Facebook non approvata.')
    votes = []
    for record in records:
        if record['kind'] == 'google':
            vote = record['rating']
        elif record['kind'] == 'facebook' and record.get('recommended') is True:
            vote = positive_value
        elif record['kind'] == 'facebook':
            raise ValueError('Raccomandazione Facebook senza convenzione applicabile.')
        else:
            continue
        if not 0 <= vote <= 5:
            raise ValueError('Voto non valido nella raccolta.')
        votes.append(vote)
    if not votes:
        raise ValueError('Nessun voto per il riepilogo complessivo.')
    rating = sum(votes) / len(votes)
    return {'rating': rating, 'maximum': 5, 'count': len(votes),
            'ratingLabel': f'{rating:.1f}'.replace('.', ',')}

def values_for(config):
    data = copy.deepcopy(config)
    google = data['google']
    if google['maximum'] != 5 or not 0 <= google['rating'] <= 5:
        raise ValueError('La media Google deve essere tra 0 e 5, massimo 5.')
    if not isinstance(google['count'], int) or google['count'] < 0:
        raise ValueError('Il numero di recensioni deve essere un intero non negativo.')
    checked = date.fromisoformat(google['checkedAt'])
    google['ratingLabel'] = f"{google['rating']:.1f}".replace('.', ',')
    google['checkedLabel'] = f'{checked.day} {MONTHS[checked.month - 1]} {checked.year}'
    if 'facebook' in data:
        fb_checked = date.fromisoformat(data['facebook']['checkedAt'])
        data['facebook']['checkedLabel'] = f'{fb_checked.day} {MONTHS[fb_checked.month - 1]} {fb_checked.year}'
    data['contacts']['whatsapp'] = 'https://wa.me/' + data['contacts']['phone'].lstrip('+')
    for number_key, label_key in [('phone','phoneLabel'),('secondaryPhone','secondaryPhoneLabel')]:
        number = data['contacts'][number_key]
        if not re.fullmatch(r'\+[1-9][0-9]{6,14}',number):
            raise ValueError('Telefono non valido: ' + number_key)
        match = re.fullmatch(r'\+39([0-9]{3})([0-9]{3})([0-9]{4})',number)
        data['contacts'][label_key] = '+39 ' + ' '.join(match.groups()) if match else number
    values = {}
    for section in ('contacts', 'links', 'google', 'addresses', 'publishing', 'organization', 'facebook'):
        if section not in data:
            continue
        for key, value in data[section].items():
            values[section + '.' + key] = escape(str(value), quote=True)
    def link(item):
        url = item.get('url') or data['links'][item['linkKey']]
        if not (url.startswith('./') or url.startswith('https://')):
            raise ValueError('URL di navigazione non ammesso: ' + url)
        external = ' target="_blank" rel="noopener"' if item.get('external') else ''
        return f'<a href="{escape(url, quote=True)}"{external}>{escape(item["label"])}</a>'
    groups = []
    ids = set()
    for group in data['navigation']:
        gid = group['id']
        if not re.fullmatch(r'[a-z][a-z0-9-]*', gid) or gid in ids:
            raise ValueError('ID del menu non valido o duplicato: ' + gid)
        ids.add(gid)
        groups.append('<div class="nav-group"><button class="nav-trigger" aria-expanded="false" '
                      f'aria-controls="{gid}">{escape(group["label"])}'
                      '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3"/></svg>'
                      f'</button><div class="nav-submenu" id="{gid}" hidden>'
                      + ''.join(link(item) for item in group['links']) + '</div></div>')
    values['navigation'] = ''.join(groups)
    values['footerLinks'] = ''.join(link(item) for item in data['footer'])
    return values

def render(template, values):
    def substitute(match):
        if match[1] not in values:
            raise ValueError('Segnaposto sconosciuto: ' + match[1])
        return values[match[1]]
    result = TOKEN.sub(substitute, template)
    if '{{' in result:
        raise ValueError('Segnaposto irrisolto nel modello.')
    return result

def generate(root=ROOT, config=None, articles=None, events=None):
    config = load_config(root) if config is None else config
    values = values_for(config)
    if 'facebook' in config:
        records = json.loads((root / 'all-reviews.json').read_text(encoding='utf-8'))['reviews']
        overall = overall_rating(records, config['facebook']['positiveRatingConvention'])
        values.update({'overall.' + key: escape(str(value), quote=True) for key,value in overall.items()})
    for component in ('header', 'footer'):
        values[component] = render((root / (component + '.html.in')).read_text(encoding='utf-8'), values)
    articles = editorial.read_records(root,'articles-data.json') if articles is None else articles
    events = editorial.read_records(root,'events-data.json') if events is None else events
    output, page_values, archive_values = editorial.prepare(root,config,values,render,articles,events)
    values.update(archive_values)
    for source in sorted(root.glob('*.html.in')):
        if source.name in {'header.html.in', 'footer.html.in'} | editorial.TEMPLATES:
            continue
        name=source.name[:-3]
        output[name] = render(source.read_text(encoding='utf-8'), dict(values,**page_values.get(name,{})))
    if not output:
        raise ValueError('Nessuna pagina sorgente trovata.')
    for filename, fields in [('google-reviews.json', ('checkedAt', 'rating', 'count')),
                             ('all-reviews.json', ('googleCheckedAt', 'googleRating', 'googleCount'))]:
        original = (root / filename).read_text(encoding='utf-8')
        data = json.loads(original)
        for target, key in zip(fields, ('checkedAt', 'rating', 'count')):
            data[target] = config['google'][key]
        # Leave individual reviews untouched; avoid a formatting-only diff on first migration.
        output[filename] = original if json.loads(original) == data else json.dumps(data, ensure_ascii=False, indent=2) + '\n'
    output['sitemap.xml'] = editorial.sitemap(root,output,config,articles,events)
    validate(output, root)
    return output

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = set()
        self.urls = []
        self.h1 = 0
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'h1': self.h1 += 1
        for name in ('href', 'src'):
            if name in attrs: self.urls.append(attrs[name])

def validate(output, root):
    pages = {name: Page(text) for name, text in output.items() if name.endswith('.html')}
    for name, page in pages.items():
        if page.h1 != 1: raise ValueError(f'{name}: atteso un solo h1.')
        for url in page.urls:
            parts = urlsplit(url)
            if parts.scheme or parts.netloc: continue
            if parts.path.startswith('/'):
                raise ValueError(f'{name}: usare link relativi alla sottocartella GitHub Pages: {url}')
            target = unquote(parts.path).removeprefix('./') or name
            path = (root / target).resolve()
            if target not in output and not (path.parent == root.resolve() and path.is_file() and public_asset(path)):
                raise ValueError(f'{name}: collegamento locale inesistente o non pubblicabile: {url}')
            if parts.fragment and target in pages and unquote(parts.fragment) not in pages[target].ids:
                raise ValueError(f'{name}: ancora inesistente: {url}')

def equivalent(a, b):
    # Existing source pages used different indentation for the identical shared components.
    return re.sub(r'\s+', ' ', unescape(a)).strip() == re.sub(r'\s+', ' ', unescape(b)).strip()

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Fail if checked-in output is stale; writes nothing.')
    parser.add_argument('--output-dir', help='Build a deployment directory inside this repository, excluding sources and documentation.')
    args = parser.parse_args()
    if args.check and args.output_dir: parser.error('--check e --output-dir sono alternativi.')
    output = generate()
    if args.output_dir:
        destination = (ROOT / args.output_dir).resolve()
        if destination == ROOT or not destination.is_relative_to(ROOT):
            parser.error('La cartella di output deve essere interna al repository e diversa dalla radice.')
        if destination.exists() and any(destination.iterdir()):
            parser.error('La cartella di output deve essere vuota: scegliere una nuova cartella per evitare file residui.')
        destination.mkdir(parents=True, exist_ok=True)
        for path in ROOT.iterdir():
            if not path.is_file(): continue
            if public_asset(path):
                shutil.copyfile(path, destination / path.name)
        for name,text in output.items(): (destination/name).write_text(text,encoding='utf-8')
        print(f'OK: sito statico generato in {destination.name}, senza fonti e documenti interni.')
        return
    stale = []
    for name, text in output.items():
        path = ROOT / name
        existing = path.read_text(encoding='utf-8') if path.exists() else ''
        if existing == text: continue
        if args.check: stale.append(name)
        else: path.write_text(text, encoding='utf-8')
    if stale:
        parser.exit(1, 'Output non aggiornati: ' + ', '.join(stale) + '\nEseguire python build_site.py\n')
    print(f'OK: {sum(name.endswith(".html") for name in output)} pagine, dati editoriali, link e riepilogo Google verificati.')

if __name__ == '__main__':
    main()
