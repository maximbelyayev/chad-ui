from django.shortcuts import render


def blocks(request):
    template_name = 'blocks/blocks.html'
    return render(request, template_name)
