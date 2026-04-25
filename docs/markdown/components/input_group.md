---
title: Input Group
description: Add addons, buttons, and helper content to inputs.
---

:::example
```html
<c-input-group class="max-w-xs">
  <c-input-group.input placeholder="Search..." />
  <c-input-group.addon>
    {% heroicon_outline 'magnifying-glass' %}
  </c-input-group.addon>
  <c-input-group.addon align="inline-end">12 results</c-input-group.addon>
</c-input-group>
```
:::

## Installation

```bash
pipx run chad-ui add input-group
```

## Usage

```html
<c-input-group>
  <c-input-group.input placeholder="Search..." />
  <c-input-group.addon>
    {% heroicon_outline 'magnifying-glass' %}
  </c-input-group.addon>
</c-input-group>
```

## Composition

```text
c-input-group
├── c-input-group.input or c-input-group.textarea
├── c-input-group.addon
├── c-input-group.button
└── c-input-group.text
```

## Align

Use the `align` prop on `c-input-group.addon` to position the addon relative to the input.

<c-callout>
  For proper focus management, `InputGroupAddon`should always be placed after
  `InputGroupInput` or `InputGroupTextarea` in the DOM. Use the `align` prop to
  visually position the addon.
</c-callout>  

### inline-start

Use `align="inline-start"` to position the addon at the start of the input. This is the default.

:::example
```html
<c-field class="max-w-sm">
  <c-field.label for="inline-start-input">Input</c-field.label>
  <c-input-group>
    <c-input-group.input id="inline-start-input" placeholder="Search..." />
    <c-input-group.addon align="inline-start">
      {% heroicon_outline 'magnifying-glass' class="text-muted-foreground" %}
    </c-input-group.addon>
  </c-input-group>
  <c-field.description>
    Icon positioned at the start.
  </c-field.description>
</c-field>
```
:::

### inline-end

Use `align="inline-end"` to position the addon at the end of the input.

:::example
```html
<c-field class="max-w-sm">
  <c-field.label for="inline-end-input">Input</c-field.label>
  <c-input-group>
    <c-input-group.input
      id="inline-end-input"
      type="password"
      placeholder="Enter password"
    />
    <c-input-group.addon align="inline-end">
      {% heroicon_outline 'eye-slash' %}
    </c-input-group.addon>
  </c-input-group>
  <c-field.description>
    Icon positioned at the end.
  </c-field.description>
</c-field>
```
:::

### block-start

Use `align="block-start"` to position the addon above the input.

:::example
```html
<c-field.group class="max-w-sm">
  <c-field>
    <c-field.label for="block-start-input">Input</c-field.label>
    <c-input-group class="h-auto">
      <c-input-group.input
        id="block-start-input"
        placeholder="Enter your name"
      />
      <c-input-group.addon align="block-start">
        <c-input-group.text>Full Name</c-input-group.text>
      </c-input-group.addon>
    </c-input-group>
    <c-field.description>
      Header positioned above the input.
    </c-field.description>
  </c-field>
  <c-field>
    <c-field.label for="block-start-textarea">Textarea</c-field.label>
    <c-input-group>
      <c-input-group.textarea
        id="block-start-textarea"
        placeholder="console.log('Hello, world!');"
        class="font-mono text-sm!"
      />
      <c-input-group.addon align="block-start">
        {% heroicon_outline 'code-bracket-square' %}
        <c-input-group.text class="font-mono">script.js</c-input-group.text>
        <c-input-group.button size="icon-xs" class="ml-auto!">
          {% heroicon_outline 'clipboard' %}
          <span class="sr-only">Copy</span>
        </c-input-group.button>
      </c-input-group.addon>
    </c-input-group>
    <c-field.description>
      Header positioned above the textarea.
    </c-field.description>
  </c-field>
</c-field.group>
```
:::

### block-end

Use `align="block-end"` to position the addon below the input.

:::example
```html
<c-field.group class="max-w-sm">
  <c-field>
    <c-field.label for="block-end-input">Input</c-field.label>
    <c-input-group class="h-auto">
      <c-input-group.input
        id="block-end-input"
        placeholder="Enter amount"
      />
      <c-input-group.addon align="block-end">
        <c-input-group.text>USD</c-input-group.text>
      </c-input-group.addon>
    </c-input-group>
    <c-field.description>
      Footer positioned below the input.
    </c-field.description>
  </c-field>
  <c-field>
    <c-field.label for="block-end-textarea">Textarea</c-field.label>
    <c-input-group>
      <c-input-group.textarea
        id="block-end-textarea"
        placeholder="Write a comment..."
      />
      <c-input-group.addon align="block-end">
        <c-input-group.text>0/280</c-input-group.text>
        <c-input-group.button variant="default" size="sm" class="ml-auto">
          Post
        </c-input-group.button>
      </c-input-group.addon>
    </c-input-group>
    <c-field.description>
      Footer positioned below the textarea.
    </c-field.description>
  </c-field>
</c-field.group>
```
:::

## Examples

### Icon

:::example
```html
```
:::

### Text

:::example
```html
```
:::

### Button

:::example
```html
```
:::

### Kbd

:::example
```html
```
:::

### Dropdown

:::example
```html
```
:::

### Spinner

:::example
```html
```
:::

### Textarea

:::example
```html
```
:::

### Custom Input

:::example
```html
```
:::

## API Reference

### Root

### Addon

### Button

### Input

### Textarea