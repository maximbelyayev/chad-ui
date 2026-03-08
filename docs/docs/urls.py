from django.urls import path

from docs import views

app_name="docs"

urlpatterns = [
    path('', views.introduction, name='intro'),
    path('components/', views.components, name='components'),
    path('installation/', views.installation, name='installation'),
    path('blocks/', views.blocks, name='blocks'),
]