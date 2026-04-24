from django.urls import path, include

from docs.views.components import field

app_name="field"

urlpatterns = [
    path('', field.index, name='index'),
]