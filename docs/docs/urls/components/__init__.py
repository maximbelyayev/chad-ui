from django.urls import path, include

app_name = 'components'

urlpatterns = [
    path('accordion/', include('docs.urls.components.accordion')),
    path('alert/', include('docs.urls.components.alert')),
    path('badge/', include('docs.urls.components.badge')),
    path('button/', include('docs.urls.components.button')),
    path('button-group/', include('docs.urls.components.button_group')),
    path('field/', include('docs.urls.components.field')),
    path('input/', include('docs.urls.components.input')),
    path('input-group/', include('docs.urls.components.input_group')),
    path('select/', include('docs.urls.components.select')),
]