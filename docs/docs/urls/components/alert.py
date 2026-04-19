from django.urls import path, include

from docs.views.components import alert

app_name="alert"

urlpatterns = [
    path('', alert.alert, name='index'),
]