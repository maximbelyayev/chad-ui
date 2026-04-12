---
title: Sheet
description: Displays a badge or a component that looks like a badge.
---

:::example
```html
<c-sheet>
  <c-sheet.trigger asChild>
    <c-button variant="outline">Open</c-button>
  </c-sheet.trigger>
  <c-sheet.content showCloseButton="true">
    <c-sheet.header>
      <c-sheet.title class="text-base">Edit profile</c-sheet.title>
      <c-sheet.description>
        Make changes to your profile here. Click save when you're done.
      </c-sheet.description>
    </c-sheet.header>
    <div class="grid flex-1 auto-rows-min gap-6 px-4">
      <div class="grid gap-3">
        <c-label for="sheet-demo-name">Name</c-label>
        <c-input id="sheet-demo-name" defaultValue="Pedro Duarte" />
      </div>
      <div class="grid gap-3">
        <c-label for="sheet-demo-username">Username</c-label>
        <c-input id="sheet-demo-username" defaultValue="@peduarte" />
      </div>
    </div>
    <c-sheet.footer>
      <c-button type="submit">Save changes</c-button>
      <c-sheet.close asChild>
        <c-button variant="outline" class="w-full">Close</c-button>
      </c-sheet.close>
    </c-sheet.footer>
  </c-sheet.content>
</c-sheet>
```
:::