from django.urls import path

from docs import views

app_name="docs"

urlpatterns = [
    path('', views.introduction, name='introduction'),
    path('components/', views.components, name='components'),
    path('installation/', views.installation, name='installation'),
    path('blocks/', views.blocks, name='blocks'),
]

component_urls = [
    path('components/accordion', views.accordion, name='accordion'),
]

urlpatterns += component_urls