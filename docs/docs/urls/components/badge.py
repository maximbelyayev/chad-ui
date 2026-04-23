from django.urls import path, include

from docs.views.components import badge

app_name="badge"

urlpatterns = [
    path('', badge.index, name='index'),
]