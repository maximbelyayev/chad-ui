from django.utils.translation import gettext_lazy as _
from django.urls import reverse_lazy

def global_context(request):
    return {
        'sections': {
            'introduction': {
                'name': _('Introduction'),
                'url': reverse_lazy('docs:introduction'),
                'url_is_active': request.path == reverse_lazy('docs:introduction'),
            },
            'components': {
                'name': _('Components'),
                'url': reverse_lazy('docs:components'),
                'url_is_active': request.path == reverse_lazy('docs:components'),
            },
            'installation': {
                'name': _('Installation'),
                'url': reverse_lazy('docs:installation'),
                'url_is_active': request.path == reverse_lazy('docs:installation'),
            },
        },
        'components': {
            'accordion': {
                'name': _('Accordion'),
                'url': reverse_lazy('docs:accordion'),
                'url_is_active': request.path == reverse_lazy('docs:accordion'),
            }
        }
    }