from django.urls import path, include

from docs.views.components import accordion

app_name="accordion"

urlpatterns = [
    path('', accordion.index, name='index'),
    path('multiple/', accordion.multiple, name='multiple'),
    path('borders/', accordion.borders, name='borders'),
    path('card/', accordion.card, name='card'),
]