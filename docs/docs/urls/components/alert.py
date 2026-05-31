from django.urls import path

from docs.views.components import alert

app_name = 'alert'

urlpatterns = [
    path('', alert.index, name='index'),
]
