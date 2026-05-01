---
title: Installation
description: How to install dependencies and structure your app.
---

## Add Components
The easiest way to interact with chad/ui components is via the CLI using `pipx` or `uvx`:

```bash
pipx run chad-ui -h
```

```bash
pipx run chad-ui -h
```

To view an index of all available components:

```bash
pipx run chad-ui -h
```

To add a component:

```bash
pipx run chad-ui add <component>
```

## HTMX

### hx-indicator

```css
.htmx-indicator {
    display: none;
}
.htmx-request .htmx-indicator {
    display: inline-block;
}
.htmx-request.htmx-indicator {
    display: inline-block;
}
.htmx-request.htmx-indicator-hide {
    visibility: hidden;
}
.htmx-request .htmx-indicator-hide {
    visibility: hidden;
}
```