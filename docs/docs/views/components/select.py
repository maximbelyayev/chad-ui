from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.utils.translation import gettext_lazy as _

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

def align_item_with_trigger(request: HttpRequest) -> HttpResponse:
  template_name = 'docs/components/select/align-item-with-trigger.html'
  context = {
    'items': [
      { 'label': "Apple", 'value': "apple" },
      { 'label': "Banana", 'value': "banana" },
      { 'label': "Blueberry", 'value': "blueberry" },
      { 'label': "Grapes", 'value': "grapes" },
      { 'label': "Pineapple", 'value': "pineapple" }, 
    ],
    'placeholder': _("Select a fruit"),
    'default_value': _(request.GET.get('fruit') or "banana"),
    'align_item_with_trigger': 'align_item_with_trigger' in request.GET,
  }
  return render(request, template_name, context)

def multiple(request: HttpRequest) -> HttpResponse:
  template_name = 'docs/components/select/multiple.html'

  placeholder = _("Select a fruit")
  default_value = _("banana")
  fruit = request.GET.get('fruit')
  if fruit:
    default_value = _(f"{fruit}")
    placeholder = _(default_value.capitalize())
    
  align = False
  if request.GET.get('align_item_with_trigger'):
    align = True

  print(placeholder)
  
  context = {
    'items': [
      { 'label': "Apple", 'value': "apple" },
      { 'label': "Banana", 'value': "banana" },
      { 'label': "Blueberry", 'value': "blueberry" },
      { 'label': "Grapes", 'value': "grapes" },
      { 'label': "Pineapple", 'value': "pineapple" }, 
    ],
    'default_value': default_value,
    'placeholder': placeholder,
    'align_item_with_trigger': align,
    
  }
  return render(request, template_name, context)

def groups(request: HttpRequest) -> HttpResponse:
  template_name = 'docs/components/select/groups.html'

  placeholder = _("Select a fruit")
  default_value = _("banana")
  fruit = request.GET.get('fruit')
  if fruit:
    default_value = _(f"{fruit}")
    placeholder = _(default_value.capitalize())
    
  align = False
  if request.GET.get('align_item_with_trigger'):
    align = True

  fruits = [
    {"label": "Apple", "value": "apple"},
    {"label": "Banana", "value": "banana"},
    {"label": "Blueberry","value": "blueberry"},
  ]
  vegetables = [
    {"label": "Carrot", "value": "carrot"},
    {"label": "Broccoli", "value": "broccoli"},
    {"label": "Spinach","value": "spinach"},
  ]
  items = {
    "Fruits": fruits,
    "Vegetables": vegetables,
  }
  context = {
    'items': items,
    'default_value': default_value,
    'placeholder': placeholder,
    'align_item_with_trigger': align,
  }
  return render(request, template_name, context)

def disabled(request: HttpRequest) -> HttpResponse:
  template_name = 'docs/components/select/disabled.html'

  placeholder = _("Select a fruit")
  default_value = _("banana")
  fruit = request.GET.get('fruit')
  if fruit:
    default_value = _(f"{fruit}")
    placeholder = _(default_value.capitalize())

  context = {
    'items': [
      { 'label': "Apple", 'value': "apple" },
      { 'label': "Banana", 'value': "banana" },
      { 'label': "Blueberry", 'value': "blueberry" },
      { 'label': "Grapes", 'value': "grapes", 'disabled': True },
      { 'label': "Pineapple", 'value': "pineapple" }, 
    ],
    'default_value': default_value,
    'placeholder': placeholder,
    
  }
  return render(request, template_name, context)

def invalid(request: HttpRequest) -> HttpResponse:
  template_name = 'docs/components/select/invalid.html'

  placeholder = _("Select a fruit")
  default_value = _("banana")
  fruit = request.GET.get('fruit')
  if fruit:
    default_value = _(f"{fruit}")
    placeholder = _(default_value.capitalize())

  context = {
    'options': [
      { 'label': "Apple", 'value': "apple" },
      { 'label': "Banana", 'value': "banana" },
      { 'label': "Blueberry", 'value': "blueberry" },
      { 'label': "Grapes", 'value': "grapes" },
      { 'label': "Pineapple", 'value': "pineapple" }, 
    ],
    'default_value': default_value,
    'placeholder': placeholder,
    
  }
  return render(request, template_name, context)