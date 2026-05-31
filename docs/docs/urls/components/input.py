from django.urls import path

from docs.views.components import input

app_name = 'input'

urlpatterns = [path('', input.index, name='index'), path('form/', input.form, name='form')]
