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
    template_name = 'docs/sections/introduction/index.html'
    return render(request, template_name)

def components(request):
    template_name = 'docs/sections/components/index.html'
    return render(request, template_name)

def installation(request):
    template_name = 'docs/sections/installation/index.html'
    return render(request, template_name)

def blocks(request):
    template_name = 'docs/blocks.html'
    return render(request, template_name)