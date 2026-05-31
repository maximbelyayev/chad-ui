import re

from django.conf import settings
from django.http import HttpRequest
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _

from docs.registry import COMPONENTS, MENU, SECTIONS


def get_title_from_slug(slug: str):
    substrings = []
    for text in re.split('_|-', slug):
        substrings.append(text.capitalize())
    return ' '.join(substrings)


def get_current_page_from_request(request: HttpRequest) -> str | None:
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
    if page is None or page not in (*SECTIONS, *COMPONENTS):
        return None

    registry_flattened = [page for page_group in [SECTIONS, sorted(COMPONENTS)] for page in page_group]

    i = registry_flattened.index(page)
    previous = registry_flattened[i - 1]
    try:
        next = registry_flattened[i + 1]
    except IndexError:
        next = registry_flattened[0]

    return {
        'previous': {'slug': previous, 'title': _(get_title_from_slug(previous)), 'url': get_url_from_page(previous)},
        'next': {'slug': next, 'title': _(get_title_from_slug(next)), 'url': get_url_from_page(next)},
    }


def global_context(request: HttpRequest) -> dict:

    ctx_menu = {item: {'name': _(get_title_from_slug(item)), 'url': get_url_from_page(item)} for item in MENU}
    ctx_sections = {
        section: {
            'name': _(get_title_from_slug(section)),
            'url': get_url_from_page(section),
            'url_is_active': request.path_info == get_url_from_page(section),
        }
        for section in SECTIONS
    }
    ctx_components = {
        component: {
            'name': _(get_title_from_slug(component)),
            'url': get_url_from_page(component),
            'url_is_active': request.path_info == get_url_from_page(component),
        }
        for component in COMPONENTS
    }
    page = get_current_page_from_request(request)
    zip = get_zip_from_current_page(page)

    return {
        'menu': ctx_menu,
        'sections': ctx_sections,
        'components': ctx_components,
        'zip': zip,
        'llm_prompt': _(
            f'I’m looking at this {settings.APP_NAME} documentation: {request.build_absolute_uri()}. '
            f'Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.'
        ),
    }
