---
title: Select
description: Displays a list of options for the user to pick from—triggered by a button.
---

:::example
```html
<c-select class="w-full max-w-48!" :required="None">
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

## Installation

```bash
pipx run chad-ui add select
```

## Usage

```python
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

def usage(request: HttpRequest) -> HttpResponse:
  template_name = 'docs/components/select/usage.html'
  context = {
    'items': [
      { 'label': "Light", 'value': "light" },
      { 'label': "Dark", 'value': "dark" },
      { 'label': "System", 'value': "system" },
    ]
  }
  return render(request, template_name, context)
```
 
```html
<c-select class="w-[180px]">
  <c-select.trigger>
    <c-select.value placeholder="Theme"/>
  </c-select.trigger>
  <c-select.content>
    <c-select.group>
      {% for item in items %}
        <c-select.item value="{{ item.value }}">
          {{ item.label }}
        </c-select.item>
      {% endfor %}
    </c-select.group>
  </c-select.content>
</c-select>
```

## Composition

Use the following composition to build a select:

```text
c-select
├── c-select.trigger
│   └── c-select.value
└── c-select.content
    ├── c-select.group
    │   ├── c-select.label
    │   ├── c-select.item
    │   └── c-select.item
    ├── c-select.separator
    └── c-select.group
        ├── c-select.label
        ├── c-select.item
        └── c-select.item
```

## Examples

### Align Item With Trigger

Use `alignItemWithTrigger` on `c-select.content` to control whether the selected item aligns with the trigger. When `true` (default), the popup positions so the selected item appears over the trigger. When `false`, the popup aligns to the trigger edge.

:::example
```html
<div class="w-full max-w-xs">
  <c-field.group x-data="{ config: { alignItemWithTrigger: false }, }">
    <c-field orientation="horizontal">
      <c-field.content>
        <c-field.label for="align-item">Align Item</c-field.label>
        <c-field.description x-text="config.alignItemWithTrigger">
        </c-field.description>
      </c-field.content>
      <c-switch id="align-item" x-modelable="checked" x-model="config.alignItemWithTrigger" />
    </c-field>
    <c-field>
      <c-select name="fruit" defaultValue="banana">
        <c-select.trigger>
          <c-select.value placeholder="Select a fruit" />
        </c-select.trigger>
        <c-select.content x-modelable="alignItemWithTrigger" x-model="config.alignItemWithTrigger">
          <c-select.group>
            {% for item in items %}
              <c-select.item value="{{ item.value }}">
                {{ item.label }}
              </c-select.item>
            {% endfor %}
          </c-select.group>
        </c-select.content>
      </c-select>
    </c-field>
  </c-field.group>
</div>
```
:::

:::example
```html
<c-field.group class="w-full max-w-xs">
  <c-field orientation="horizontal">
    <c-field.content>
      <c-field.label for="align-item">Align Item</c-field.label>
      <c-field.description>
        Toggle to align the item with the trigger.
      </c-field.description>
    </c-field.content>
    <c-switch id="align-item" name="align_item_with_trigger"
      hx-get="{% url 'docs:components:select:align-item-with-trigger' %}" 
      hx-trigger="change" 
      hx-include="input[type=checkbox], select[name=fruit]"
      hx-swap="outerHTML"
      hx-target="#align-item-with-trigger-backend div[data-slot='select']"
      hx-select="div[data-slot='select']"
    />
  </c-field>
  <c-field id="align-item-with-trigger-backend">
    <c-select name="fruit" defaultValue="{{ default_value }}">
      <c-select.trigger>
        <c-select.value placeholder="{{ placeholder }}" />
      </c-select.trigger>
      <c-select.content :alignItemWithTrigger="{{ align_item_with_trigger }}">
        <c-select.group>
          {% for item in items %}
            <c-select.item value="{{ item.value }}">
              {{ item.label }}
            </c-select.item>
          {% endfor %}
        </c-select.group>
      </c-select.content>
    </c-select>
  </c-field>
</c-field.group>
```
```python
``` 
:::

### Multiple 

Use the `multiple` prop on `c-select` to enable multi-select.

:::example
```html
<c-select defaultValue="{{ default_value }}" multiple class="w-full max-w-48!">
  <c-select.trigger>
    <c-select.value placeholder="{% trans 'Select a fruit' %}" />
  </c-select.trigger>
  <c-select.content>
    <c-select.group>
      {% for item in items %}
        <c-select.item value="{{ item.value }}">
          {{ item.label }}
        </c-select.item>
      {% endfor %}
    </c-select.group>
  </c-select.content>
</c-select>
```
:::

### Groups

Use `c-select.group`, `c-select.label`, and `c-select.separator` to organize items.

:::example
```html
<c-select multiple class="w-full max-w-48!">
  <c-select.trigger class="w-full max-w-48">
    <c-select.value placeholder="Select a fruit" />
  </c-select.trigger>
  <c-select.content>
    {% for group, options in items.items %}
    <c-select.group>
        <c-select.label>{{ group }}</c-select.label>
        {% for item in options %}
            <c-select.item value="{{ item.value }}">{{ item.label }}</c-select.item>
        {% endfor %}
    </c-select.group>
    {% if not forloop.last %}
        <c-select.separator />
    {% endif %}
{% endfor %}
  </c-select.content>
</c-select>
```
```python
```
:::

### Scrollable

A select with many items that scrolls.

### Disabled

:::example
```html
<c-select disabled class="w-full max-w-48!">
  <c-select.trigger>
    <c-select.value placeholder="{{ placeholder }}" />
  </c-select.trigger>
  <c-select.content>
    <c-select.group>
      {% for item in items %}
        <c-select.item 
          value="{{ item.value }}"
          :disabled="{{ item.disabled }}"
        >
          {{ item.label }}
        </c-select.item>
      {% endfor %}
    </c-select.group>
  </c-select.content>
</c-select>
```
```python
```
:::

### Invalid

For automatic invalid styling using Django form field validation and/or HTMX, please see the [Field Validation](/docs/components/field/#validation) documentation.

For manual invalid styling, `data-invalid="true"` on the `c-field` component and `aria-invalid="true"` on the `c-select.trigger` component to show an error state.

```html
<c-field data-invald="true">
  <c-field.label>Fruit</c-field.label>
  <c-select.trigger aria-invalid="true">
    <c-select.value />
  </c-select.trigger>
</c-field>
```

:::example
```html
<c-field data-invalid="true" class="w-full max-w-48">
  <c-field.label>Fruit</c-field.label>
  <c-select class="w-full max-w-48!">
    <c-select.trigger aria-invalid="true">
      <c-select.value placeholder="{{ placeholder }}" />
    </c-select.trigger>
    <c-select.content>
      <c-select.group>
        {% for item in options %}
          <c-select.item value="{{ item.value }}">
            {{ item.label }}
          </c-select.item>
        {% endfor %}
      </c-select.group>
    </c-select.content>
  </c-select>
  <c-field.errors list>
    Please select a fruit.
  </c-field.errors>
</c-field>
```
```python
```
:::

## API Reference

### c-select