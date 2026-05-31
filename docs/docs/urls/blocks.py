from django.urls import path

from docs.views import blocks

app_name = 'blocks'

urlpatterns = [
    path('', blocks.blocks, name='blocks'),
]
