---
title: Select 
description: Displays a list of options for the user to pick from—triggered by a button.
---

:::example
```html
<c-select class="w-full max-w-48!">
  <c-select.trigger>
    <c-select.value placeholder="Select a fruit"/>
  </c-select.trigger>
  <c-select.content>
    <c-select.group>
      <c-select.label>Fruits</c-select.label>
      {% for item in items %}
        <c-select.item value="{{ item.value }}">
          {{ item.label }}
        </c-select.item>
      {% endfor %}
    </c-select.group>
  </c-select.content>
</c-select>
```
```python
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

def index(request: HttpRequest) -> HttpResponse:
  template_name = 'docs/components/select/index.html'
  context = {
    'items': [
      { 'label': "Apple", 'value': "apple" },
      { 'label': "Banana", 'value': "banana" },
      { 'label': "Blueberry", 'value': "blueberry" },
      { 'label': "Grapes", 'value': "grapes" },
      { 'label': "Pineapple", 'value': "pineapple" },
    ]
  }
  return render(request, template_name, context)
```
:::