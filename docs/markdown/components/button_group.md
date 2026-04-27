---
title: Button Group
description: A container that groups related buttons together with consistent styling.
---

:::example
```html
<c-button-group>
  <c-button-group class="hidden sm:flex">
    <c-button variant="outline" size="icon" aria-label="Go Back">
      {% heroicon_outline 'arrow-left' stroke_width=2 %}
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
          {% heroicon_outline 'ellipsis-horizontal' stroke_width=2 %}
        </c-button>
      </c-dropdown-menu.trigger>
      <c-dropdown-menu.content align="end" class="w-40">
        <c-dropdown-menu.group>
          <c-dropdown-menu.item>
            {% heroicon_outline 'envelope-open' stroke_width=2 %}
            Mark as Read
          </c-dropdown-menu.item>
          <c-dropdown-menu.item>
            {% heroicon_outline 'archive-box' stroke_width=2 %}
            Archive
          </c-dropdown-menu.item>
        </c-dropdown-menu.group>
        <c-dropdown-menu.separator />
        <c-dropdown-menu.group>
          <c-dropdown-menu.item>
            {% heroicon_outline 'clock' stroke_width=2 %}
            Snooze
          </c-dropdown-menu.item>
          <c-dropdown-menu.item>
            {% heroicon_outline 'calendar' stroke_width=2 %}
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
            {% heroicon_outline 'trash' stroke_width=2 %}
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

- The `c-button-group` component has the role attribute set to group.
- Use <c-kbd>Tab</c-kbd> to navigate between the buttons in the group.
- Use `aria-label` or `aria-labelledby` to label the button group.

```html
<c-button-group aria-label="Button group">
  <c-button>Button 1</c-button>
  <c-button>Button 2</c-button>
</c-button-group>
```

## Button Group vs Toggle Group
- Use the `c-button-group` component when you want to group buttons that perform an action.
- Use the `c-toggle-group` component when you want to group buttons that toggle a state.

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

:::example
```html
<c-button-group>
  <c-button-group>
    <c-button variant="outline" size="icon">
      {% heroicon_outline 'plus' stroke_width=2 %}
    </c-button>
  </c-button-group>
  <c-button-group>
    <c-input-group>
      <c-input-group.input placeholder="Send a message..." />
      <c-tooltip>
        <c-tooltip.trigger> 
          <c-input-group.addon align='inline-end'>
            <c-icons.audio-lines />
          </c-input-group.addon>
        </c-tooltip.trigger>
        <c-tooltip.content alignOffset="-8">
          Voice Mode
        </c-tooltip.content>
      </c-tooltip>
    </c-input-group>
  </c-button-group>
</c-button-group>
```
:::

### Separator

The `c-button-group.separator` component visually divides buttons within a group.

Buttons with variant `outline` do not need a separator since they have a border. For other variants, a separator is recommended to improve the visual hierarchy.

:::example
```html
<c-button-group>
  <c-button variant="secondary" size="sm">
    Copy
  </c-button>
  <c-button-group.separator />
  <c-button variant="secondary" size="sm">
    Paste
  </c-button>
</c-button-group>
```
:::

### Split

Create a split button group by adding two buttons separated by a `c-button-group.separator`.

:::example
```html
<c-button-group>
  <c-button variant="secondary">Button</c-button>
  <c-button-group.separator />
  <c-button size="icon" variant="secondary">
    {% heroicon_outline 'plus' stroke_width=2 %}
  </c-button>
</c-button-group>
```
:::

### Input

Wrap a `c-input` component with buttons.

:::example
```html
<c-button-group>
  <c-input placeholder="Search..." />
  <c-button variant="outline" aria-label="Search">
    {% heroicon_outline 'magnifying-glass' stroke_width=2 %}
  </c-button>
</c-button-group>
```
:::

### Input Group

Wrap a `c-input-group` component to create complex input layouts.

:::example
```html
<c-button-group class="[--radius:9999rem]">
  <c-button-group>
    <c-button variant="outline" size="icon">
      {% heroicon_outline 'plus' stroke_width=2 %}
    </c-button>
  </c-button-group>
  <c-button-group>
    <c-input-group 
      x-data="{
        voiceEnabled: false,
        toggleVoiceEnabled() {
          this.voiceEnabled = !this.voiceEnabled;
        }
      }"
    >
      <c-input-group.input
        ::placeholder="voiceEnabled ? 'Record and send audio...' : 'Send a message...'"
        ::disabled="voiceEnabled"
      />
      <c-input-group.addon align="inline-end">
        <c-tooltip>
          <c-tooltip.trigger asChild>
            <c-input-group.button size="icon-xs" @click="toggleVoiceEnabled()"
              ::data-active="voiceEnabled"
              ::aria-pressed="voiceEnabled"
              class='data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100'
            >
              <c-icons.audio-lines class="size-4" />
            </c-input-group.button>
          </c-tooltip.trigger>
          <c-tooltip.content alignOffset="-4">
            Voice Mode
          </c-tooltip.content>
        </c-tooltip>
      </c-input-group.addon>
    </c-input-group>
  </c-button-group>
</c-button-group>
```
:::

### Dropdown Menu

Create a split button group with a `c-dropdown-menu` component.

:::example
```html
<c-button-group>
  <c-button variant="outline">Follow</c-button>
  <c-dropdown-menu>
    <c-dropdown-menu.trigger asChild>
      <c-button variant="outline" class="pl-2!">
        {% heroicon_outline 'chevron-down' stroke_width=2 %}
      </c-button>
    </c-dropdown-menu.trigger>
    <c-dropdown-menu.content align="end" class="w-48">
      <c-dropdown-menu.group>
        <c-dropdown-menu.item>
          <c-icons.volume-off />
          Mute Conversation
        </c-dropdown-menu.item>
        <c-dropdown-menu.item>
          {% heroicon_outline 'check' stroke_width=2 %}
          Mark as Read
        </c-dropdown-menu.item>
        <c-dropdown-menu.item>
          {% heroicon_outline 'exclamation-triangle' stroke_width=2 %}
          Report Conversation
        </c-dropdown-menu.item>
        <c-dropdown-menu.item>
          <c-icons.user-round-x />
          Block User
        </c-dropdown-menu.item>
        <c-dropdown-menu.item>
          {% heroicon_outline 'arrow-up-tray' stroke_width=2 %}
          Share Conversation
        </c-dropdown-menu.item>
        <c-dropdown-menu.item>
          {% heroicon_outline 'square-2-stack' stroke_width=2 %}
          Copy Conversation
        </c-dropdown-menu.item>
      </c-dropdown-menu.group>
      <c-dropdown-menu.separator />
      <c-dropdown-menu.group>
        <c-dropdown-menu.item variant="destructive">
          {% heroicon_outline 'trash' stroke_width=2 %}
          Delete Conversation
        </c-dropdown-menu.item>
      </c-dropdown-menu.group>
    </c-dropdown-menu.content>
  </c-dropdown-menu>
</c-button-group>
```
:::

### Select

Pair with a `c-select` component.

:::example
```html
<c-button-group>
  <c-button-group>
    <c-select items="{{ currencies }}" defaultValue="$">
      <c-select.trigger class="font-mono">
        <c-select.value x-text="Object.keys(selected)"/>
      </c-select.trigger>
      <c-select.content align="start">
        <c-select.group>
          {% for item in currencies %}
            <c-select.item key="{{ item.value }}" value="{{ item.value }}">
              {{ item.value }}
              <span class="text-muted-foreground">{{ item.label }}</span>
            </c-select.item>
          {% endfor %}
        </c-select.group>
      </c-select.content>
    </c-select>
    <c-input placeholder="10.00" pattern="[0-9]*" />
  </c-button-group>
  <c-button-group>
    <c-button aria-label="Send" size="icon" variant="outline">
      {% heroicon_outline 'arrow-right' %}
    </c-button>
  </c-button-group>
</c-button-group>
```
```python
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

def select(request: HttpRequest) -> HttpResponse:
  template_name = 'docs/components/button_group/select.html'
  context = {
    'currencies': [
      { 'label': "US Dollar", 'value': "$" },
      { 'label': "Euro", 'value': "€" },
      { 'label': "British Pound", 'value': "£" },
    ]
  }
  return render(request, template_name, context)
```
:::

### Popover

Use with a `c-popover` component.

:::example
```html
<c-button-group>
  <c-button variant="outline">
    {% heroicon_outline 'sparkles' stroke_width=2 %}
    Copilot
  </c-button>
  <c-popover>
    <c-popover.trigger asChild>
      <c-button variant='outline' size='icon' aria-label='Open Popover'>
        {% heroicon_outline 'chevron-down' stroke_width=2 %}
      </c-button>
    </c-popover.trigger>
    <c-popover.content align="end" class="rounded-xl text-sm w-80">
      <c-popover.header>
        <c-popover.title>
          Start a new task with Copilot
        </c-popover.title>
        <c-popover.description>
          Describe your task in natural language.
        </c-popover.description>
      </c-popover.header>
      <c-field>
        <c-field.label for="task" class="sr-only">
          Task Description
        </c-field.label>
        <c-textarea id="task" placeholder="I need to..." class="resize-none" />
        <c-field.description>
          Copilot will open a pull request for review.
        </c-field.description>
      </c-field>
    </c-popover.content>
  </c-popover>
</c-button-group>
```
:::

## API Reference

### c-button-group

The `c-button-group` component is a container that groups related buttons together with consistent styling.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | The visual orientation of the component. |

```html
<c-button-group>
  <c-button>Button 1</c-button>
  <c-button>Button 2</c-button>
</c-button-group>
```

Nest multiple button groups to create complex layouts with spacing. See the [nested](#nested) example for more details.

```html
<c-button-group>
  <c-button-group />
  <c-button-group />
</c-button-group>
```

### c-button-group.separator

Visually divides buttons within a group.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | The visual orientation of the component. |

```html
<c-button-group>
  <c-button>Button 1</c-button>
  <c-button-group.separator />
  <c-button>Button 2</c-button>
</c-button-group>
```

### c-button-group.text

Use this component to display text within a button group.

| Prop      | Type      | Default |
| --------- | --------- | ------- |
| `asChild` | `boolean` | `false` |

```html
<c-button-group>
  <c-button-group.text>Text</c-button-group.text>
  <c-button>Button</c-button>
</c-button-group>
```

Use the `asChild` prop to render a custom component as the text, for example a label.

```html
<c-button-group>
  <c-button-group.text asChild>
    <c-label for="name">Text</c-label>
  </c-button-group.text>
  <c-input placeholder="Type something here..." id="name" />
</c-button-group>
```