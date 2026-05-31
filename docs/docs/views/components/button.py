import random
import time

from django.shortcuts import render

from ...context import get_docs_template_and_context


def index(request):
    component = __name__.split('.')[-1]
    template_name, context = get_docs_template_and_context(component)
    return render(request, template_name, context)


def htmx(request):
    template_name = 'docs/components/button/htmx.html'

    variants = ['default', 'outline', 'ghost', 'destructive', 'secondary', 'link']
    variant = random.choice(variants)

    sleep = 0
    if request.headers.get('Hx-Source') == 'button':
        sleep = 2
    time.sleep(sleep)

    return render(request, template_name, {'variant': variant})
