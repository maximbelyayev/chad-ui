from django.urls import path

from docs.views.components import field

app_name = 'field'

urlpatterns = [
    path('', field.index, name='index'),
]
