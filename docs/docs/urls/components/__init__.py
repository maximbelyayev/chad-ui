from django.urls import path, include

app_name = 'components'

urlpatterns = [
    path('accordion/', include('docs.urls.components.accordion')),
    path('alert/', include('docs.urls.components.alert')),
]