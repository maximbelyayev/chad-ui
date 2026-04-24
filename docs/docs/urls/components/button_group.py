from django.urls import path, include

from docs.views.components import button_group

app_name="button_group"

urlpatterns = [
    path('', button_group.index, name='index'),
]