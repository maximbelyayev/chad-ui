---
title: Alert
description: Displays a callout for user attention.
---

:::example
```html
<div class="grid gap-4 items-start w-full max-w-md">
  <c-alert>
    {% heroicon_outline 'check-circle' stroke_width=2 %}
    <c-alert.title>Payment successful</c-alert.title>
    <c-alert.description>
      Your payment of $29.99 has been processed. A receipt has been sent to
      your email address.
    </c-alert.description>
  </c-alert>
  <c-alert>
    {% heroicon_outline 'information-circle' stroke_width=2 %}
    <c-alert.title>New feature available</c-alert.title>
    <c-alert.description>
      We've added dark mode support. You can enable it in your account
      settings.
    </c-alert.description>
  </c-alert>
</div>
```
:::

## Installation

```bash
pipx run chad-ui add alert
```

## Usage

```html
<c-alert>
  {% heroicon_outline 'information-circle' stroke_width=2 %}
  <c-alert.title>Heads up!</c-alert.title>
  <c-alert.description>
    You can add components and dependencies to your app using the cli.
  </c-alert.description>
  <c-alert.action>
    <c-button variant="outline">Enable</c-button>
  </c-alert.action>
</c-alert>
```

## Composition

Use the following composition to build an alert:

```text
c-alert
├── icon
├── c-alert.title
├── c-alert.description
└── c-alert.action
```

## Examples

### Basic

A basic alert with an icon, title and description.

:::example
```html
<c-alert class="max-w-md">
  {% heroicon_outline 'check-circle' stroke_width=2 %}
  <c-alert.title>Account updated successfully</c-alert.title>
  <c-alert.description>
    Your profile information has been saved. Changes will be reflected
    immediately.
  </c-alert.description>
</c-alert>
```
:::

### Destructive

Use `variant="destructive"` to create a destructive alert.

:::example
```html
<c-alert variant="destructive" class="max-w-md">
  {% heroicon_outline 'information-circle' stroke_width=2 %}
  <c-alert.title>Payment failed</c-alert.title>
  <c-alert.description>
    Your payment could not be processed. Please check your payment method
    and try again.
  </c-alert.description>
</c-alert>
```
:::

### Action

Use `c-alert.action` to add a button or other action element to the alert.

:::example
```html
<c-alert class="max-w-md">
  <c-alert.title>Dark mode is now available</c-alert.title>
  <c-alert.description>
    Enable it under your profile settings to get started.
  </c-alert.description>
  <c-alert.action>
    <c-button size="xs" variant="default">
      Enable
    </c-button>
  </c-alert.action>
</c-alert>
```
:::

### Custom Colors

You can customize the alert colors by adding custom classes such as `bg-amber-50 dark:bg-amber-950` to the `c-alert` component.

:::example
```html
<c-alert class="max-w-md border-amber-200! bg-amber-50! text-amber-900! dark:border-amber-900! dark:bg-amber-950! dark:text-amber-50!">
  {% heroicon_outline 'exclamation-triangle' stroke_width=2 %}
  <c-alert.title>Your subscription will expire in 3 days.</c-alert.title>
  <c-alert.description>
    Renew now to avoid service interruption or upgrade to a paid plan to
    continue using the service.
  </c-alert.description>
</c-alert>
```
:::

## API Reference

### c-alert

Displays a callout for user attention.

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "destructive"` | `"default"` | The styling variant applied to the component. |

### c-alert.title

Displays the title of the alert.

| Prop | Type | Default | Description |
|---|---|---|---|

### c-alert.description

Displays the description or content of the alert.

| Prop | Type | Default | Description |
|---|---|---|---|

### c-alert.action

Displays an action element (like a button) positioned absolutely in the top-right corner of the alert.

| Prop | Type | Default | Description |
|---|---|---|---|