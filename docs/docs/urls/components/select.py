from django.urls import path

from docs.views.components import select

app_name="select"

urlpatterns = [
    path('', select.index, name='index'),
]