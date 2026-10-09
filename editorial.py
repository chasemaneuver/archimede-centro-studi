"""Editorial sources -> approved article/event layouts and archive cards (stdlib only)."""
from datetime import date, datetime
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import quote, urlencode, urlsplit
import json
import math
import re
import xml.etree.ElementTree as ET

TEMPLATES = {'article.html.in','article-comments.html.in','article-card.html.in',
             'resource-card.html.in','event-page.html.in','event-card.html.in'}
MONTHS = 'gennaio febbraio marzo aprile maggio giugno luglio agosto settembre ottobre novembre dicembre'.split()
STATUSES = {'current':'In corso','past':'Concluso','upcoming':'In arrivo','cancelled':'Annullato'}

def read_records(root, name):
    data = json.loads((root/name).read_text(encoding='utf-8'))
    if not isinstance(data,list): raise ValueError(name + ': atteso un elenco.')
    return data

def date_label(value):
    parsed=date.fromisoformat(value[:10])
    return f'{parsed.day} {MONTHS[parsed.month-1]} {parsed.year}'

def safe_json(value):
    return json.dumps(value,ensure_ascii=False).replace('<','\\u003c').replace('&','\\u0026')

class Words(HTMLParser):
    def __init__(self, html):
        super().__init__();self.text=[];self.feed(html)
    def handle_data(self,text): self.text.append(text)

def word_count(html):
    return len(re.findall(r"\b\w+(?:[’'-]\w+)*\b",' '.join(Words(html).text)))

def body_source(root, record):
    filename=record['contentFile']
    if not re.fullmatch(r'[a-z0-9][a-z0-9-]*\.content\.html',filename):
        raise ValueError('Nome del file di contenuto non valido: '+filename)
    return (root/filename).read_text(encoding='utf-8')

def validate_records(articles, events, root):
    slugs=set();urls=set()
    for kind,records in [('articolo',articles),('evento',events)]:
        for record in records:
            slug=record['slug'];url=record['url']
            if not re.fullmatch(r'[a-z0-9][a-z0-9-]*',slug) or slug in slugs:
                raise ValueError('Slug non valido o duplicato: '+slug)
            if not re.fullmatch(r'[a-z0-9][a-z0-9-]*\.html',url) or url in urls:
                raise ValueError('URL non valido o duplicato: '+url)
            slugs.add(slug);urls.add(url)
            if kind=='articolo' and slug!=url[:-5]:
                raise ValueError('Slug commenti e URL articolo devono coincidere: '+slug)
            if kind=='articolo' and (root/(url+'.in')).exists() and (root/(url+'.in')).read_text(encoding='utf-8').strip()!='{{articlePage}}':
                raise ValueError('URL articolo già occupato da una pagina: '+url)
            body_source(root,record)
            image=record['image']['path'] if kind=='articolo' else record['image']
            if not re.fullmatch(r'[A-Za-z0-9_-]+\.(?:jpg|jpeg|png|webp|svg|gif)',image) or not (root/image).is_file():
                raise ValueError('Immagine editoriale mancante o non valida: '+image)
            if not record['title'].strip(): raise ValueError('Titolo vuoto: '+slug)
            if kind=='articolo':
                if any(not isinstance(record['image'][key],int) or record['image'][key]<=0 for key in ('width','height')):
                    raise ValueError('Dimensioni immagine non valide: '+slug)
                published=datetime.fromisoformat(record['datePublished']);modified=datetime.fromisoformat(record['dateModified'])
                if not published.tzinfo or not modified.tzinfo or modified<published:
                    raise ValueError('Date articolo non coerenti o prive di fuso: '+slug)
                if not isinstance(record['tags'],list) or any(not isinstance(t,str) or not t.strip() for t in record['tags']):
                    raise ValueError('Tag articolo non validi: '+slug)
                if len(record['tags'])!=len(set(record['tags'])): raise ValueError('Tag duplicati: '+slug)
            else:
                end=date.fromisoformat(record['end'])
                if record.get('layout','standard') not in {'standard','existing'}: raise ValueError('Layout evento non valido: '+slug)
                if record.get('status','current') not in STATUSES: raise ValueError('Stato evento non valido: '+slug)
                if record.get('startDate') and date.fromisoformat(record['startDate'][:10])>end:
                    raise ValueError('Evento termina prima di iniziare: '+slug)
                for key in ('startDate','endDate'):
                    if record.get(key): datetime.fromisoformat(record[key])
                if record.get('layout','standard')=='existing' and not (root/(url+'.in')).is_file():
                    raise ValueError('Modello dedicato mancante: '+url)
    return urls

def prepare(root,config,common,render,articles=None,events=None):
    articles=read_records(root,'articles-data.json') if articles is None else articles
    events=read_records(root,'events-data.json') if events is None else events
    validate_records(articles,events,root)
    base=config['publishing']['baseUrl']
    if not base.startswith('https://') or not base.endswith('/') or urlsplit(base).query or urlsplit(base).fragment:
        raise ValueError('L’URL pubblico deve essere HTTPS e terminare con /.')
    global_values={};pages={};page_values={};cards=[];resource_cards=[];tags=set()
    def template(name,values): return render((root/name).read_text(encoding='utf-8'),values)
    for article in articles:
        image=article['image'];values=dict(common)
        scalars={'slug':article['slug'],'title':article['title'],'titleFirst':article['titleFirst'],
                 'titleEmphasis':article['titleEmphasis'],'seoTitle':article['seoTitle'],
                 'description':article['description'],'summary':article['summary'],
                 'section':article['section'],'url':'./'+article['url'],
                 'date':article['datePublished'][:10],'dateLabel':date_label(article['datePublished']),
                 'author':article['author']['name'],'imageUrl':'./'+image['path'],
                 'imageAbsolute':base+image['path'],'imageAlt':image['alt'],
                 'cardAlt':image.get('cardAlt',image['alt']),'imageWidth':image['width'],'imageHeight':image['height'],
                 'canonical':base+article['url'],'resourceSummary':article.get('resourceSummary',article['summary']),
                 'sidebarDescription':article.get('sidebarDescription','Spunti per continuare a imparare.'),
                 'shareSubject':quote(article['title'],safe='')}
        chapter=f"Capitolo {article['chapter']}" if article.get('chapter') else ''
        scalars['eyebrow']=article['section']+(' · '+chapter if chapter else '')
        scalars['tagsData']=json.dumps(article['tags'],ensure_ascii=False)
        values.update({'article.'+key:escape(str(value),quote=True) for key,value in scalars.items()})
        values['article.tags']=''.join(f'<a href="./articoli.html?{escape(urlencode({"tag":tag}),quote=True)}">{escape(tag)}</a>' for tag in article['tags'])
        values['article.body']=render(body_source(root,article),values)
        count=word_count(values['article.body']);minutes=max(1,math.ceil(count/200))
        reading=f'{minutes} '+('minuto' if minutes==1 else 'minuti')+' di lettura'
        values['article.readingLabel']=reading
        values['article.cardMeta']=escape(' · '.join(filter(None,[chapter,scalars['dateLabel'],reading])))
        author={'@type':article['author'].get('type','Organization'),'name':article['author']['name']}
        if article['author'].get('url'): author['url']=article['author']['url']
        elif author['@type']=='Organization' and author['name']=='Archimede Centro Studi': author['url']=base
        schema={'@context':'https://schema.org','@type':'BlogPosting','headline':article['seoTitle'],
                'datePublished':article['datePublished'],'dateModified':article['dateModified'],
                'author':author,'publisher':{'@type':'Organization','name':'Archimede Centro Studi',
                'logo':{'@type':'ImageObject','url':base+'logo.png'}},'image':scalars['imageAbsolute'],
                'mainEntityOfPage':scalars['canonical'],'keywords':article['tags'],
                'articleSection':article['section'],'inLanguage':'it-IT','wordCount':count,'timeRequired':f'PT{minutes}M'}
        values['article.schema']=safe_json(schema)
        values['article.comments']=template('article-comments.html.in',values) if article.get('comments',False) else ''
        values['article.commentScripts']='<script src="./comments-config.js?v=20261007b" defer></script><script src="./article-comments.js?v=20261008privacy" defer></script>' if article.get('comments',False) else ''
        page=template('article.html.in',values);pages[article['url']]=page
        page_values[article['url']]={'articlePage':page}
        cards.append(template('article-card.html.in',values));tags.update(article['tags'])
        if article.get('featuredInResources'): resource_cards.append(template('resource-card.html.in',values))
    global_values['archive.articleCards']=''.join(cards)
    global_values['archive.resourceCards']=''.join(resource_cards)
    global_values['archive.articleFilters']='<button data-tag="" aria-pressed="true">Tutti</button>'+''.join(f'<button data-tag="{escape(tag,quote=True)}" aria-pressed="false">{escape(tag)}</button>' for tag in sorted(tags))
    current=[];past=[];lab_cards=[];event_tags=set()
    for event in events:
        values=dict(common);status=event.get('status','current')
        scalars=dict(event,url='./'+event['url'],imageUrl='./'+event['image'],imageAbsolute=base+event['image'],
                     canonical=base+event['url'],endLabel=date_label(event['end']),status=status,statusLabel=STATUSES[status])
        scalars.setdefault('description',event['desc']);scalars.setdefault('intro',event['desc'])
        scalars.setdefault('eyebrow','Un’occasione per crescere');scalars.setdefault('titleFirst',event['title']);scalars.setdefault('titleEmphasis','Insieme.')
        values.update({'event.'+key:escape(str(value),quote=True) for key,value in scalars.items() if isinstance(value,(str,int,float))})
        tags=event.get('tags',[])
        if not isinstance(tags,list) or any(not isinstance(tag,str) or not tag.strip() for tag in tags): raise ValueError('Tag evento non validi.')
        event_tags.update(tags)
        values['event.tagsData']=escape(json.dumps(tags,ensure_ascii=False),quote=True)
        values['event.tags']=''.join(f'<a href="./eventi.html?{escape(urlencode({"tag":tag}),quote=True)}">{escape(tag)}</a>' for tag in tags)
        values['event.body']=render(body_source(root,event),values)
        schema={'@context':'https://schema.org','@type':'WebPage','name':event.get('structuredName',event['title']),
                'url':scalars['canonical'],'description':event.get('structuredDescription',scalars['description']),'inLanguage':'it-IT'}
        # An end date alone (e.g. a voucher programme) does not establish a dated Event.
        if event.get('startDate') and event.get('location'):
            schema={'@context':'https://schema.org','@type':'Event','name':event['title'],'url':scalars['canonical'],
                    'description':scalars['description'],'image':scalars['imageAbsolute'],'startDate':event['startDate'],
                    'endDate':event.get('endDate',event['end']),'location':event['location'],
                    'eventStatus':'https://schema.org/EventCancelled' if status=='cancelled' else 'https://schema.org/EventScheduled',
                    'organizer':{'@type':'Organization','name':'Archimede Centro Studi','url':base}}
        values['event.schema']=safe_json(schema)
        registration=event.get('registrationUrl')
        if registration and not registration.startswith(('https://','mailto:')): raise ValueError('Link iscrizioni non ammesso.')
        values['event.registration']=f'<a class="button primary" href="{escape(registration,quote=True)}">Iscriviti o chiedi informazioni ↗</a>' if registration and status not in ('past','cancelled') else ''
        if event.get('layout','standard')=='existing': page_values[event['url']]=values
        else:
            if (root/(event['url']+'.in')).exists(): raise ValueError('URL evento standard già occupato: '+event['url'])
            pages[event['url']]=template('event-page.html.in',values)
        card=template('event-card.html.in',values)
        (past if status in ('past','cancelled') else current).append(card)
        if event.get('featuredInLabs') and status not in ('past','cancelled'):
            lab_cards.append('<article class="program-card"><span class="eyebrow">'+values['event.statusLabel']+
                '</span><h3>'+values['event.title']+'</h3><p>'+values['event.desc']+
                '</p><p class="program-note">Conclusione: '+values['event.endLabel']+
                '</p><a class="text-link" href="'+values['event.url']+'">Scopri il laboratorio ↗</a></article>')
    global_values.update({'archive.currentEvents':''.join(current),'archive.pastEvents':''.join(past),
                          'archive.pastEmptyHidden':' hidden' if past else '',
                          'archive.labEvents':'<section class="section"><div class="wrap"><span class="eyebrow">Ci vediamo in laboratorio</span><h2>Nuove idee,<br><em>da vivere insieme.</em></h2><div class="program-grid">'+''.join(lab_cards)+'</div></div></section>' if lab_cards else '',
                          'archive.eventFilters':'<div class="archive-filters" aria-label="Filtra gli eventi per tag"><button data-tag="" aria-pressed="true">Tutti</button>'+''.join(f'<button data-tag="{escape(tag,quote=True)}" aria-pressed="false">{escape(tag)}</button>' for tag in sorted(event_tags))+'</div>' if event_tags else ''})
    return pages,page_values,global_values

def sitemap(root,output,config,articles,events):
    namespace='http://www.sitemaps.org/schemas/sitemap/0.9';ET.register_namespace('',namespace)
    previous=ET.fromstring((root/'sitemap.xml').read_text(encoding='utf-8'))
    dates={Path(node.find('{'+namespace+'}loc').text).name:node.find('{'+namespace+'}lastmod').text
           for node in previous if node.find('{'+namespace+'}lastmod') is not None}
    dates.update({a['url']:a['dateModified'][:10] for a in articles})
    dates.update({e['url']:e['dateModified'][:10] for e in events if e.get('dateModified')})
    xml=ET.Element('{'+namespace+'}urlset')
    for name in sorted(n for n in output if n.endswith('.html')):
        url=ET.SubElement(xml,'{'+namespace+'}url');ET.SubElement(url,'{'+namespace+'}loc').text=config['publishing']['baseUrl']+name
        if name in dates: ET.SubElement(url,'{'+namespace+'}lastmod').text=dates[name]
    return '<?xml version="1.0" encoding="UTF-8"?>'+ET.tostring(xml,encoding='unicode')+'\n'
