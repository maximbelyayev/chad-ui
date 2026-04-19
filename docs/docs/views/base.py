from django.shortcuts import render
from django.conf import settings
from django.http import Http404, HttpRequest

import os
import json
import inspect

def home(request):
    template_name = 'home.html'
    return render(request, template_name)

def introduction(request):
    name = inspect.currentframe().f_code.co_name
    template_name = f'docs/sections/{name}/index.html'
    
    file_path_md_data = os.path.join(settings.BASE_DIR, f'static/docs/sections/{name}.json')
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
    return render(request, template_name, context)

def components(request):
    template_name = 'docs/sections/components/index.html'
    return render(request, template_name)

def installation(request):
    template_name = 'docs/sections/installation/index.html'
    return render(request, template_name)