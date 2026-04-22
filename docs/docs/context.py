from django.http import Http404
from django.conf import settings

from .registry import SECTIONS, COMPONENTS

import os
import json

def get_docs_template_and_context(name: str):
    if name in SECTIONS:
        group = 'sections'
    elif name in COMPONENTS:
        group = 'components'
    else:
        raise Http404('Requested resource was not found.')
    
    template_name = f'docs/{group}/{name}/index.html'
    file_path_md_data = os.path.join(settings.BASE_DIR, f'static/docs/{group}/{name}.json')
    try:
        with open(file_path_md_data, 'r') as file:
            md_data = json.load(file)
    except FileNotFoundError:
        raise Http404('Requested resource was not found.')
    
    md_frontmatter = md_data.get('frontmatter', {})
    md_context = md_data.get('context', {})
    context = {
        'title': md_frontmatter.get('title'),
        'description': md_frontmatter.get('description'),
        'headings': md_context.get('headings')
    }

    return template_name, context