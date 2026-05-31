from django.urls import path

from docs.views.components import badge

app_name = 'badge'

urlpatterns = [
    path('', badge.index, name='index'),
]
