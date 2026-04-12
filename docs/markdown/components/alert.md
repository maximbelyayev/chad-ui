---
title: Alert
description: Displays a callout for user attention.
---

:::example
```html
<div class="grid gap-4 items-start w-full max-w-md">
  <c-alert>
    {% heroicon_outline 'check-circle' %}
    <c-alert.title>Payment successful</c-alert.title>
    <c-alert.description>
      Your payment of $29.99 has been processed. A receipt has been sent to
      your email address.
    </c-alert.description>
  </c-alert>
  <c-alert>
    {% heroicon_outline 'information-circle' %}
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