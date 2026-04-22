from django.shortcuts import render
from django.urls import resolve
from django.conf import settings
from django.http import Http404, HttpResponseServerError, HttpRequest, HttpResponse
from django.utils.translation import gettext_lazy as _

from ..context import get_docs_template_and_context

import os
import json
import inspect

def home(request):
    template_name = 'home.html'
    return render(request, template_name)

def introduction(request):
    template_name, context = get_docs_template_and_context("introduction")
    return render(request, template_name, context)

def components(request):
    template_name, context = get_docs_template_and_context("components")
    return render(request, template_name, context)

def installation(request):
    template_name, context = get_docs_template_and_context("installation")
    return render(request, template_name, context)

def markdown(request: HttpRequest):
    related_path = request.path_info.replace('.md', '/')
    match = resolve(related_path)
    if not match:
        return Http404('Requested resource was not found.')
    
    page = match.namespaces[-1]
    group = 'components'
    if page == 'docs':
        page = match.url_name
        group = 'sections'

    file_path = os.path.join(settings.BASE_DIR, 'markdown', group, f'{page}.md')
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except OSError:
        return HttpResponseServerError(_('Server encountered an error. Please try again later.'))

    return render(request, 'base-markdown.html', context={'markdown': content})
    
