from django.urls import path

from docs.views.components import button_group

app_name = 'button_group'

urlpatterns = [path('', button_group.index, name='index'), path('select/', button_group.select, name='select')]
