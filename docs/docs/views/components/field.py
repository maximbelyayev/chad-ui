from django.shortcuts import render

from ...context import get_docs_template_and_context


def index(request):
    component = __name__.split('.')[-1]
    template_name, context = get_docs_template_and_context(component)
    return render(request, template_name, context)
