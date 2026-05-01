---
title: Input
description: A text input component for forms and user data entry with built-in styling and accessibility features.
---

:::example
```html
<c-field>
    <c-field.label for="input-demo-api-key">API Key</c-field.label>
    <c-input id="input-demo-api-key" type="password" placeholder="sk-..." />
    <c-field.description>
    Your API key is encrypted and stored securely.
    </c-field.description>
</c-field>
```
:::

## Installation

```bash
pipx run chad-ui add input
```

## Usage

```html
<c-input />
```

## Examples

### Basic

:::example
```html
<c-input placeholder="Enter text" />
```
:::

### Field

Use `c-field`, `c-field.label`, and `c-field.description` to create an input with a label and description. See the [Field](/docs/components/field) documentation for more details.

:::example
```html
<c-field>
  <c-field.label for="input-field-username">Username</c-field.label>
  <c-input
    id="input-field-username"
    type="text"
    placeholder="Enter your username"
  />
  <c-field.description>
    Choose a unique username for your account.
  </c-field.description>
</c-field>
```
:::

### Field Group

Use `c-field.group` to show multiple `c-field` blocks and to build forms. See the [Field](/docs/components/field) documentation for more details.

:::example
```html
<c-field.group>
  <c-field>
    <c-field.label for="fieldgroup-name">Name</c-field.label>
    <c-input id="fieldgroup-name" placeholder="Jordan Lee" />
  </c-field>
  <c-field>
    <c-field.label for="fieldgroup-email">Email</c-field.label>
    <c-input
      id="fieldgroup-email"
      type="email"
      placeholder="name@example.com"
    />
    <c-field.description>
      We'll send updates to this address.
    </c-field.description>
  </c-field>
  <c-field orientation="horizontal">
    <c-button type="reset" variant="outline">
      Reset
    </c-button>
    <c-button type="submit">Submit</c-button>
  </c-field>
</c-field.group>
```
:::


### Disabled

Use the `disabled` prop to disable the input. To style the disabled state, add the `disabled` prop to the `c-field` component.

:::example
```html
<c-field disabled>
  <c-field.label for="input-demo-disabled">Email</c-field.label>
  <c-input
    id="input-demo-disabled"
    type="email"
    placeholder="Email"
    disabled
  />
  <c-field.description>This field is currently disabled.</c-field.description>
</c-field>
```
:::

### Invalid

For automatic invalid styling using Django form field validation and/or HTMX, please see the [Field Validation](/docs/components/field/#validation) documentation.

For manual invalid styling, set `aria-invalid="true"` on `c-input` to mark it as invalid. To style the invalid state, set `data-invalid="true"` on the `c-field` component. 

:::example
```html
<c-field data-invalid="true">
  <c-field.label for="input-invalid">Invalid Input</c-field.label>
  <c-input id="input-invalid" placeholder="Error" aria-invalid="true" />
  <c-field.description>This field contains validation errors.</c-field.description>
</c-field>
```
:::

### File

Use the `type="file"` prop to create a file input.

:::example
```html
<c-field>
  <c-field.label for="picture">Picture</c-field.label>
  <c-input id="picture" type="file" />
  <c-field.description>Select a picture to upload</c-field.description>
</c-field>
```
:::

### Inline

Use `c-field` with `orientation="horizontal"` to create an inline input. Pair with `c-button` to create a search input with a button.

:::example
```html
<c-field orientation="horizontal">
  <c-input type="search" placeholder="Search..." />
  <c-button>Search</c-button>
</c-field>
```
:::

### Grid

Use a grid layout to place multiple inputs side by side.

:::example
```html
<c-field.group class="grid max-w-sm grid-cols-2">
  <c-field>
    <c-field.label for="first-name">First Name</c-field.label>
    <c-input id="first-name" placeholder="Jordan" />
  </c-field>
  <c-field>
    <c-field.label for="last-name">Last Name</c-field.label>
    <c-input id="last-name" placeholder="Lee" />
  </c-field>
</c-field.group>
```
:::

### Required

Use the `required` attribute to indicate required inputs.

:::example
```html
<c-field>
  <c-field.label for="input-required">
    Required Field <span class="text-destructive">*</span>
  </c-field.label>
  <c-input
    id="input-required"
    placeholder="This field is required"
    required
  />
  <c-field.description>
    This field must be filled out.
  </c-field.description>
</c-field>
```
:::

### Badge

Use `c-badge` in the label to highlight a recommended field.

:::example
```html
<c-field>
  <c-field.label for="input-badge">
    Webhook URL
    <c-badge variant="secondary" class="ml-auto">
      Beta
    </c-badge>
  </c-field.label>
  <c-input
    id="input-badge"
    type="url"
    placeholder="https://api.example.com/webhook"
  />
</c-field>
```
:::

### Input Group

To add icons, text, or buttons inside an input, use the `c-input-group` component. See the [Input Group](/docs/components/input-group/) component for more examples.

:::example
```html
<c-field>
  <c-field.label for="input-group-url">Website URL</c-field.label>
  <c-input-group>
    <c-input-group.input
      id="input-group-url"
      placeholder="example.com"
    />
    <c-input-group.addon>
      <c-input-group.text>https://</c-input-group.text>
    </c-input-group.addon>
    <c-input-group.addon align="inline-end">
      {% heroicon_outline 'information-circle' stroke_width=2 %}
    </c-input-group.addon>
  </c-input-group>
</c-field>
```
:::

### Button Group

To add buttons to an input, use the `c-button-group` component. See the [Button Group](/docs/components/button-group/) component for more examples.

:::example
```html
<c-field>
  <c-field.label for="input-button-group">Search</c-field.label>
  <c-button-group>
    <c-input id="input-button-group" placeholder="Type to search..." />
    <c-button variant="outline">Search</c-button>
  </c-button-group>
</c-field>
```
:::



### Form

A full form example with multiple inputs, a select, and a button.

Use the `:field` prop on `c-field` and `c-input` to automatically map attributes from a Django form field passed as a context variable.

:::example
```html
<form class="w-full max-w-md">
  <c-field.group>
    <c-field>
      <c-field.label for="form-name">Name</c-field.label>
      <c-input
        id="form-name"
        type="text"
        placeholder="Evil Rabbit"
        required
      />
    </c-field>
    <c-field :field="form.email">
        <c-field.label />
        <c-input :field="form.email" />
        <c-field.description />
    </c-field>
    <div class="grid grid-cols-2 gap-4">
      <c-field>
        <c-field.label for="form-phone">Phone</c-field.label>
        <c-input id="form-phone" type="tel" placeholder="+1 (555) 123-4567" />
      </c-field>
      <c-field>
        <c-field.label for="form-country">Country</c-field.label>
        <c-select items="{{ countries }}" defaultValue="us">
          <c-select.trigger id="form-country">
            <c-select.value />
          </c-select.trigger>
          <c-select.content>
            <c-select.group>
              {% for country in countries %}
                <c-select.item key="{{ country.value }}" value="{{ country.value }}">
                  {{ country.label }}
                </c-select.item>
              {% endfor %}
            </c-select.group>
          </c-select.content>
        </c-select>
      </c-field>
    </div>
    <c-field>
      <c-field.label for="form-address">Address</c-field.label>
      <c-input id="form-address" type="text" placeholder="123 Main St" />
    </c-field>
    <c-field orientation="horizontal">
      <c-button type="button" variant="outline">Cancel</c-button>
      <c-button type="submit">Submit</c-button>
    </c-field>
  </c-field.group>
</form>
```
```python
# forms.py
from django import forms
from django.utils.translation import gettext_lazy as _

class InputForm(forms.Form):
  email = forms.EmailField(
    max_length=254,
    required=True,
    label=_("Email"),
    help_text=_("We'll never share your email with anyone."),
    widget=forms.EmailInput(
      attrs={
        "placeholder": "john@example.com"
      }
    )
  )

# views.py
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

def form(request: HttpRequest) -> HttpResponse:
  template_name = 'docs/components/input/form.html'
  context = {
    'countries': [
      { 'label': "United States", 'value': "us" },
      { 'label': "United Kingdom", 'value': "uk" },
      { 'label': "Canada", 'value': "ca" },
    ],
    'form': InputForm,
  }
  return render(request, template_name, context)
```
:::