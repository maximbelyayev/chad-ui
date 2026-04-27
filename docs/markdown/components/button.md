---
title: Button
description: Displays a button or a component that looks like a button.
---

:::example
```html
<div class="flex flex-wrap items-center gap-2 md:flex-row">
  <c-button variant="outline">Button</c-button>
  <c-button variant="outline" size="icon" aria-label="Submit">
    {% heroicon_outline 'arrow-up' %}
  </c-button>
</div>
```
:::

## Installation

```bash
pipx run chad-ui add button
```

## Usage

```html
<c-button variant="outline">Button</c-button>
```

## Cursor

Tailwind v4 [switched](https://tailwindcss.com/docs/upgrade-guide#buttons-use-the-default-cursor) from `cursor: pointer` to `cursor: default` for the button component.

If you want to keep the `cursor: pointer` behavior, add the following code to your CSS file:

```css
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

## Examples

### Size

Use the `size` prop to change the size of the button.

:::example
```html
<div class="flex flex-col items-start gap-8 sm:flex-row">
  <div class="flex items-start gap-2">
    <c-button size="xs" variant="outline">
      Extra Small
    </c-button>
    <c-button size="icon-xs" aria-label="Submit" variant="outline">
      {% heroicon_outline 'arrow-up-right' stroke_width=2 %}
    </c-button>
  </div>
  <div class="flex items-start gap-2">
    <c-button size="sm" variant="outline">
      Small
    </c-button>
    <c-button size="icon-sm" aria-label="Submit" variant="outline">
      {% heroicon_outline 'arrow-up-right' stroke_width=2 %}
    </c-button>
  </div>
  <div class="flex items-start gap-2">
    <c-button variant="outline">Default</c-button>
    <c-button size="icon" aria-label="Submit" variant="outline">
      {% heroicon_outline 'arrow-up-right' stroke_width=2 %}
    </c-button>
  </div>
  <div class="flex items-start gap-2">
    <c-button variant="outline" size="lg">
      Large
    </c-button>
    <c-button size="icon-lg" aria-label="Submit" variant="outline">
      {% heroicon_outline 'arrow-up-right' stroke_width=2 %}
    </c-button>
  </div>
</div>
```
:::

### Default

:::example
```html
<c-button>Button</c-button>
```
:::

### Outline

:::example
```html
<c-button variant="outline">Button</c-button>
```
:::

### Secondary

:::example
```html
<c-button variant="secondary">Button</c-button>
```
:::

### Ghost

:::example
```html
<c-button variant="ghost">Button</c-button>
```
:::

### Destructive

:::example
```html
<c-button variant="destructive">Button</c-button>
```
:::

### Link

:::example
```html
<c-button variant="link">Button</c-button>
```
:::

### Icon

:::example
```html
<c-button variant="outline" size="icon">
  {% heroicon_outline 'arrow-up-circle' %}
</c-button>
```
:::

### With Icon

Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` attribute to the icon for the correct spacing.

:::example
```html
<div class="flex gap-2">
  <c-button variant="outline">
    <c-icons.git-branch data-icon="inline-start" /> New Branch
  </c-button>
  <c-button variant="outline">
    Fork
    <c-icons.git-fork data-icon="inline-end" />
  </c-button>
</div>
```
:::

### Rounded

Use the `rounded-full` class to make the button rounded.

:::example
```html
<div class="flex gap-2">
  <c-button class="rounded-full!">Get Started</c-button>
  <c-button variant="outline" size="icon" class="rounded-full!">
    {% heroicon_outline 'arrow-up' %}
  </c-button>
</div>
```
:::

### Spinner

Render a `<c-spinner />` component inside the button to show a loading state. Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` attribute to the spinner for the correct spacing.

:::example
```html
<div class="flex gap-2">
  <c-button variant="outline" disabled>
    <c-spinner data-icon="inline-start" />
    Generating
  </c-button>
  <c-button variant="secondary" disabled>
    Downloading
    <c-spinner data-icon="inline-start" />
  </c-button>
</div>
```
:::

### Button Group

To create a button group, use the `<c-button-group>` component. See the [Button Group](/docs/components/button-group) documentation for more details.

:::example
```html
<c-button-group>
  <c-button-group class="hidden sm:flex">
    <c-button variant="outline" size="icon" aria-label="Go Back">
      {% heroicon_outline 'arrow-left' %}
    </c-button>
  </c-button-group>
  <c-button-group>
    <c-button variant="outline">Archive</c-button>
    <c-button variant="outline">Report</c-button>
  </c-button-group>
  <c-button-group>
    <c-button variant="outline">Snooze</c-button>
    <c-dropdown-menu>
      <c-dropdown-menu.trigger asChild>
        <c-button variant="outline" size="icon" aria-label="More Options">
          {% heroicon_outline 'ellipsis-horizontal' %}
        </c-button>
      </c-dropdown-menu.trigger>
      <c-dropdown-menu.content align="end" class="w-40">
        <c-dropdown-menu.group>
          <c-dropdown-menu.item>
            {% heroicon_outline 'envelope-open' %}
            Mark as Read
          </c-dropdown-menu.item>
          <c-dropdown-menu.item>
            {% heroicon_outline 'archive-box' %}
            Archive
          </c-dropdown-menu.item>
        </c-dropdown-menu.group>
        <c-dropdown-menu.separator />
        <c-dropdown-menu.group>
          <c-dropdown-menu.item>
            {% heroicon_outline 'clock' %}
            Snooze
          </c-dropdown-menu.item>
          <c-dropdown-menu.item>
            {% heroicon_outline 'calendar' %}
            Add to Calendar
          </c-dropdown-menu.item>
          <c-dropdown-menu.item>
            <c-icons.list-filter />
            Add to List
          </c-dropdown-menu.item>
        </c-dropdown-menu.group>
        <c-dropdown-menu.separator />
        <c-dropdown-menu.group>
          <c-dropdown-menu.item variant="destructive">
            {% heroicon_outline 'trash' %}
            Trash
          </c-dropdown-menu.item>
        </c-dropdown-menu.group>
      </c-dropdown-menu.content>
    </c-dropdown-menu>
  </c-button-group>
</c-button-group>
```
:::

### As Child

You can use the `asChild` prop on `<c-button>` to make another component look like a button. Here's an example of a link that looks like a button.

:::example
```html
<c-button variant="secondary" size="sm" asChild>
  <a href="#as-child">
    Login
  </a>
</c-button>
```
:::

### HTMX

Use the `htmx` prop with [HTMX attributes](https://htmx.org/reference/#attributes) on `c-button` to render a spinner in-place when an htmx request is in-flight.

:::example
```html
<c-button variant="{{ variant }}" size="sm"
  htmx
  hx-get="{% url 'docs:components:button:htmx' %}"
  hx-target="#htmx-partial div[data-slot='preview']"
  hx-select="div[data-slot='preview']" 
>
  Click to swap
</c-button>
```
```python
from django.shortcuts import render
import random
import time

def htmx(request: HttpRequest) -> HttpResponse:
  template_name = 'docs/components/button/htmx.html'
  variants = ["default", "outline", "ghost", "destructive", "secondary", "link"]
  variant = random.choice(variants)
  time.sleep(2)
  return render(request, template_name, {'variant': variant})
```
:::

## API Reference

### c-button

The `c-button` component is a wrapper around `<button>` that adds a variety of styles and functionality.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | `"default"` | The size of the button |
| `variant` | `"default" \| "outline" \| "ghost" \| "destructive" \| "secondary" \| "link"` | `"ghost"` | The styling variant applied to the button |
| `htmx` | `boolean` | `false` | Adds a visual indicator (default: `<c-spinner>`) and disables the button during an HTMX request |