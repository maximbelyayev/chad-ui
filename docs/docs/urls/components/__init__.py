from django.urls import path, include

app_name = 'components'

urlpatterns = [
    path('accordion/', include('docs.urls.components.accordion')),
    path('alert/', include('docs.urls.components.alert')),
    path('badge/', include('docs.urls.components.badge')),
    path('button/', include('docs.urls.components.button')),
    path('button-group/', include('docs.urls.components.button_group')),
]