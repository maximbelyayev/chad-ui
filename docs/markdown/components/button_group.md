---
title: Button Group
description: A container that groups related buttons together with consistent styling.
---

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

## Installation

```bash
pipx run chad-ui add button-group
```

## Usage

```html
<c-button-group>
  <c-button>Button 1</c-button>
  <c-button>Button 2</c-button>
</c-button-group>
```

## Composition

```text
c-button-group
├── c-button or c-input or text
├── c-button-group.separator
└── c-button or c-input or text
```

## Accessibility

- The ButtonGroup component has the role attribute set to group.
- Use `Tab` to navigate between the buttons in the group.
- Use `aria-label` or `aria-labelledby` to label the button group.

```html
<c-button-group aria-label="Button group">
  <c-button>Button 1</c-button>
  <c-button>Button 2</c-button>
</c-button-group>
```

## Examples

### Orientation

Set the `orientation` prop to change the button group layout.

:::example
```html
<c-button-group 
    orientation="vertical" 
    aria-label="Media controls" 
    class="h-fit"
>
  <c-button variant="outline" size="icon">
    {% heroicon_outline 'plus' stroke_width=2 %}
  </c-button>
  <c-button variant="outline" size="icon">
    {% heroicon_outline 'minus' stroke_width=2 %}
  </c-button>
</c-button-group>
```
:::

### Size

Control the size of buttons using the size `prop` on individual buttons.

:::example
```html
<div class="flex flex-col items-start gap-8">
<c-button-group>
    <c-button variant="outline" size="xs">X-Small</c-button>
    <c-button variant="outline" size="xs">Button</c-button>
    <c-button variant="outline" size="xs">Group</c-button>
    <c-button variant="outline" size="icon-xs">
      {% heroicon_outline 'plus' stroke_width=2 %}
    </c-button>
  </c-button-group>

  <c-button-group>
    <c-button variant="outline" size="sm">Small</c-button>
    <c-button variant="outline" size="sm">Button</c-button>
    <c-button variant="outline" size="sm">Group</c-button>
    <c-button variant="outline" size="icon-sm">
      {% heroicon_outline 'plus' stroke_width=2 %}
    </c-button>
  </c-button-group>

  <c-button-group>
    <c-button variant="outline">Default</c-button>
    <c-button variant="outline">Button</c-button>
    <c-button variant="outline">Group</c-button>
    <c-button variant="outline" size="icon">
      {% heroicon_outline 'plus' stroke_width=2 %}
    </c-button>
  </c-button-group>

  <c-button-group>
    <c-button variant="outline" size="lg">Large</c-button>
    <c-button variant="outline" size="lg">Button</c-button>
    <c-button variant="outline" size="lg">Group</c-button>
    <c-button variant="outline" size="icon-lg">
      {% heroicon_outline 'plus' stroke_width=2 %}
    </c-button>
  </c-button-group>
</div>
```
:::

### Nested

Nest `<c-button-group>` components to create button groups with spacing.