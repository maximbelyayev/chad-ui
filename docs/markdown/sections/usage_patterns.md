---
title: Usage Patterns
description: A set of guidelines for how to most effecitvely use this library.
---

## Component Attributes/Props

When defining [django-cotton](https://django-cotton.com/) components, developers can manipulate component attributes in three ways: **adding**, **overriding**, or **extending** values. The behavior depends on both the attribute type and the placement of the `{{ attrs }}` template variable within the component definition.

> **Note:** The extension pattern described below is **not the default behavior** in the `chad-ui` framework. It is an advanced technique left to the discretion of the developer. Choose this design pattern on a component-by-component basis depending on whether you need to merge logic or simply override defaults.

### Instrumental Attributes

Attributes such as AlpineJS directives (`x-show`, `x-data`, `@click`) and certain HTMX attributes typically control component behavior and logic. These require careful handling to ensure proper functionality.

### Non-Instrumental Attributes

HTML attributes such as `id`, `class`, `style`, and `data-*` typically serve presentation or styling purposes rather than core component functionality. These can be specified during component definition and rendered via the `{{ attrs }}` template variable.

```html
<c-component class="text-lg" style="padding: 1rem">
  <!-- Component content -->
</c-component>`
```


