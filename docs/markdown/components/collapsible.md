---
title: Collapsible
description: Displays a badge or a component that looks like a badge.
---

:::example
```html
<c-collapsible class="flex flex-col gap-2 w-[350px]">
  <div class="flex gap-4 justify-between items-center px-4">
    <h4 class="text-sm font-semibold">Order #4189</h4>
    <c-collapsible.trigger nativeButton="false" asChild>
      <c-button variant="ghost" size="icon-sm">
        {% heroicon_outline 'chevron-up-down' class="size-5" %}
        <span class="sr-only">Toggle details</span>
      </c-button>
    </c-collapsible.trigger>
  </div>
  <div class="flex justify-between items-center py-2 px-4 text-sm rounded-md border">
    <span class="text-muted-foreground">Status</span>
    <span class="font-medium">Shipped</span>
  </div>
  <c-collapsible.content class="flex flex-col gap-2">
    <div class="py-2 px-4 text-sm rounded-md border">
      <p class="font-medium">Shipping address</p>
      <p class="text-muted-foreground">100 Market St, San Francisco</p>
    </div>
    <div class="py-2 px-4 text-sm rounded-md border">
      <p class="font-medium">Items</p>
      <p class="text-muted-foreground">2x Studio Headphones</p>
    </div>
  </c-collapsible.content>
</c-collapsible>
```
:::