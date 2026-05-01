from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

from ...context import get_docs_template_and_context

def index(request: HttpRequest) -> HttpResponse:
  component = __name__.split('.')[-1]
  template_name, context = get_docs_template_and_context(component)

  context.update({
    'items': [
      { 'label': "Apple", 'value': "apple" },
      { 'label': "Banana", 'value': "banana" },
      { 'label': "Blueberry", 'value': "blueberry" },
      { 'label': "Grapes", 'value': "grapes" },
      { 'label': "Pineapple", 'value': "pineapple" },
    ]
  })

  return render(request, template_name, context)