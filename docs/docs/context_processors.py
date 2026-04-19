from django.http import HttpRequest
from django.utils.translation import gettext_lazy as _
from django.urls import reverse, reverse_lazy

from docs.registry import MENU, SECTIONS, COMPONENTS


def get_current_page_from_request(request: HttpRequest) -> str:
  rm = request.resolver_match
  if 'docs' and 'components' in rm.namespaces:
    page = rm.namespaces[-1]
  else:
    page = rm.url_name
  return page

def get_url_from_page(page: str):
  MENU_URLS = {
    'home': reverse_lazy('home'),
    'docs': reverse_lazy('docs:installation'),
    'components': reverse_lazy('docs:components'),
    'blocks': reverse_lazy('blocks:blocks'),
  }
  if page in MENU:
    return MENU_URLS[page]
  if page in SECTIONS:
    return reverse_lazy(f'docs:{page}')
  elif page in COMPONENTS:
    return reverse_lazy(f'docs:components:{page}:index')

def get_zip_from_current_page(page: str) -> dict:
  if page in MENU and page not in SECTIONS:
    return None
  
  registry_flattened = [
    page
    for page_group in [SECTIONS, sorted(COMPONENTS)] 
    for page in page_group
  ]
  
  i = registry_flattened.index(page)
  previous = registry_flattened[i-1]
  try:
    next = registry_flattened[i+1]
  except IndexError:
    next = registry_flattened[0]

  return {
    'previous': {
      'slug': previous,
      'title': _(previous.capitalize()),
      'url': get_url_from_page(previous)
    },
    'next': {
      'slug': next,
      'title': _(next.capitalize()),
      'url': get_url_from_page(next)
    }
  }


def global_context(request: HttpRequest) -> dict:
  page = get_current_page_from_request(request)
  zip = get_zip_from_current_page(page)

  ctx_menu = {
    item: {
      'name': _(item.capitalize()),
      'url': get_url_from_page(item)
    }
    for item in MENU 
  }
  ctx_sections = {
    section: {
      'name': _(section.capitalize()),
      'url': get_url_from_page(section),
      'url_is_active': request.path_info == get_url_from_page(section),
    }
    for section in SECTIONS 
  }
  ctx_components = {
    component: {
      'name': _(component.capitalize()),
      'url': get_url_from_page(component),
      'url_is_active': request.path_info == get_url_from_page(component),
    }
    for component in COMPONENTS 
  }

  return {
    'zip': zip,
    'menu': ctx_menu,
    'sections': ctx_sections,
    'components': ctx_components
  }

