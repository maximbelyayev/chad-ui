from django.urls import path, include

from docs.views.components import button

app_name="button"

urlpatterns = [
    path('', button.index, name='index'),
    path('htmx/', button.htmx, name='htmx'),
]