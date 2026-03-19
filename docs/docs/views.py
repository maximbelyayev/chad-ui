from django.shortcuts import render

def home(request):
    template_name = 'home.html'
    return render(request, template_name)

def introduction(request):
    template_name = 'docs/introduction.html'
    return render(request, template_name)

def components(request):
    template_name = 'docs/components.html'
    return render(request, template_name)

def installation(request):
    template_name = 'docs/installation.html'
    return render(request, template_name)

def blocks(request):
    template_name = 'docs/blocks.html'
    return render(request, template_name)

def accordion(request):
    template_name = 'docs/components/accordion.html'
    return render(request, template_name)