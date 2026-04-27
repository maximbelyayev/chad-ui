---
title: Badge
description: Displays a badge or a component that looks like a badge.
---

:::example
```html
<div class="flex w-full flex-wrap justify-center gap-2">
  <c-badge>Badge</c-badge>
  <c-badge variant="secondary">Secondary</c-badge>
  <c-badge variant="destructive">Destructive</c-badge>
  <c-badge variant="outline">Outline</c-badge>
</div>
```
:::

## Installation

```bash
pipx run chad-ui add badge
```

## Usage

```html
<c-badge variant="default | outline | secondary | destructive">Badge</c-badge>
```

## Examples

### Variants

Use the `variant` prop to change the variant of the badge.

:::example
```html
<div class="flex flex-wrap gap-2">
  <c-badge>Default</c-badge>
  <c-badge variant="secondary">Secondary</c-badge>
  <c-badge variant="destructive">Destructive</c-badge>
  <c-badge variant="outline">Outline</c-badge>
  <c-badge variant="ghost">Ghost</c-badge>
</div>
```
:::

### With Icon

You can render an icon inside the badge. Use `data-icon="inline-start"` to render the icon on the left and `data-icon="inline-end"` to render the icon on the right.

:::example
```html
<div class="flex flex-wrap gap-2">
  <c-badge variant="secondary">
    {% heroicon_outline 'check-badge' data_icon="inline-start" %}
    Verified
  </c-badge>
  <c-badge variant="outline">
    Bookmark
    {% heroicon_outline 'bookmark' data_icon="inline-end" %}
  </c-badge>
</div>
```
:::

### With Spinner

You can render a spinner inside the badge. Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` prop to the spinner.

:::example
```html
<div class="flex flex-wrap gap-2">
  <c-badge variant="destructive">
    <c-spinner data-icon="inline-start" />
    Deleting
  </c-badge>
  <c-badge variant="secondary">
    Generating
    <c-spinner data-icon="inline-end" />
  </c-badge>
</div>
```
:::

### Link

Use the `asChild` prop to render a link as a badge.

:::example
```html
<c-badge asChild>
  <a href="#link">
    Open Link {% heroicon_outline 'arrow-up-right' data_icon="inline-end" %}
  </a>
</c-badge>
```
:::

### Custom Colors

You can customize the colors of a badge by adding custom classes such as `bg-green-50 dark:bg-green-800` to the `c-badge` component.

:::example
```html
<div class="flex flex-wrap gap-2">
  <c-badge class="bg-blue-50! text-blue-700! dark:bg-blue-950! dark:text-blue-300!">
    Blue
  </c-badge>
  <c-badge class="bg-green-50! text-green-700! dark:bg-green-950! dark:text-green-300!">
    Green
  </c-badge>
  <c-badge class="bg-sky-50! text-sky-700! dark:bg-sky-950! dark:text-sky-300!">
    Sky
  </c-badge>
  <c-badge class="bg-purple-50! text-purple-700! dark:bg-purple-950! dark:text-purple-300!">
    Purple
  </c-badge>
  <c-badge class="bg-red-50! text-red-700! dark:bg-red-950! dark:text-red-300!">
    Red
  </c-badge>
</div>
```
:::

## API Reference

### c-badge

Displays a badge or a component that looks like a badge.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default"` | The styling variant applied to the component. |