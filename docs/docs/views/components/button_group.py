from django.shortcuts import render
from django.conf import settings
from django.http import Http404, HttpRequest, HttpResponse

from ...context import get_docs_template_and_context

def index(request):
  component = __name__.split('.')[-1]
  template_name, context = get_docs_template_and_context(component)
  return render(request, template_name, context)

def select(request: HttpRequest) -> HttpResponse:
  template_name = 'docs/components/button_group/select.html'
  context = {
    'currencies': [
      { 'label': "US Dollar", 'value': "$" },
      { 'label': "Euro", 'value': "€" },
      { 'label': "British Pound", 'value': "£" },
    ]
  }
  return render(request, template_name, context)