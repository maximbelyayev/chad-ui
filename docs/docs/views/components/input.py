from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

from ...context import get_docs_template_and_context
from ...forms.input import InputForm


def index(request: HttpRequest):
    component = __name__.split('.')[-1]
    template_name, context = get_docs_template_and_context(component)
    return render(request, template_name, context)


def form(request: HttpRequest) -> HttpResponse:
    template_name = 'docs/components/input/form.html'
    context = {
        'countries': [
            {'label': 'United States', 'value': 'us'},
            {'label': 'United Kingdom', 'value': 'uk'},
            {'label': 'Canada', 'value': 'ca'},
        ],
        'form': InputForm,
    }
    return render(request, template_name, context)
