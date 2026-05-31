from django.urls import path

from docs.views.components import select

app_name = 'select'

urlpatterns = [
    path('', select.index, name='index'),
    path('align-item-with-trigger/', select.align_item_with_trigger, name='align-item-with-trigger'),
    path('multiple/', select.multiple, name='multiple'),
    path('groups/', select.groups, name='groups'),
    path('disabled/', select.disabled, name='disabled'),
    path('invalid/', select.invalid, name='invalid'),
]
