from django.urls import path, include

from docs.views import base as views

app_name="docs"

urlpatterns = [
    path('', views.introduction, name='introduction'),
    path('components/', views.components, name='components'),
    path('installation/', views.installation, name='installation'),
    path('blocks/', views.blocks, name='blocks'),
    path('components/', include('docs.urls.components'), name='components')
]

