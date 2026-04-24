from django.urls import path, include

from docs.views.components import input_group

app_name="input_group"

urlpatterns = [
    path('', input_group.index, name='index'),
]