from django.urls import include, path

from docs.views import base as views

app_name = 'docs'

urlpatterns = [
    path('', views.introduction, name='introduction'),
    path('components/', views.components, name='components'),
    path('installation/', views.installation, name='installation'),
    path('usage-patterns/', views.usage_patterns, name='usage_patterns'),
    path('components/', include('docs.urls.components'), name='components'),
]
