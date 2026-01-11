[![PyPI version](https://img.shields.io/pypi/v/chad-ui.svg)](https://pypi.org/project/chad-ui/)
[![PyPI - Python Version](https://img.shields.io/pypi/pyversions/chad-ui.svg)](https://pypi.org/project/chad-ui/)

# chad/ui

Beautifully designed components based on the Cotton/HTMX/Alpine.js stack for Django.

[Cotton](https://django-cotton.com/) | [HTMX](https://htmx.org/) | [Alpine.js](https://alpinejs.dev/)

## What is chad/ui?

chad/ui is a collection of re-usable components that you can copy and paste into your Django apps.

Inspired by [shadcn/ui](https://ui.shadcn.com), chad/ui builds on [shadcn-django](https://github.com/shadcn-django)'s great foundation and faithful port of shadcn/ui to Django.
It's a slightly different & opinionated flavor with:

- 🧩 **Additional components** - File upload, filter, radio group, spinner, and more.
- 🔌 **Third-party integrations** - AG Grid, TradingView widgets, etc.
- 🛠️ **Backend integration** - Seamless async data fetching, client-side validation, and more, via HTMX.
- 📱 **Enhanced patterns & design** - Radix-aligned composition & APIs, improved responsiveness and mobile interactivity, and visual feedback during async requests.

If you want the core, basic shadcn/ui experience in Django, use shadcn-django. If you would like these additional features and enhancements, use chad/ui.

## Why chad/ui?

- **Own your code** - Components live in your project, not hidden in a package
- **Customize everything** - Change the code however you want since you own it
- **Django-native** - Built using standard django template language and django-cotton for re-usability and progressive enhancement
- **Interactive without JavaScript fatigue** - HTMX for server interactions, Alpine.js for client-side reactivity
- **Adapt to your setup** - Compatible with HTMX and Alpine.js as CDN links or as an npm modules
- **Tailwind for styling** - Utility-first CSS that's easy to customize

## Getting Started

If you already have Django configured with django-cotton, HTMX, Alpine.js, and TailwindCSS, you are ready to go. 

Else, please see [Install Dependencies](#install-dependencies).

### Add Components

The easiest way to interact with chad/ui components is via the CLI using `pipx` or `uvx`:

```bash
pipx run chad-ui -h
```

```bash
uvx chad-ui -- -h
```

To view an index of all available components:
```bash
pipx run chad-ui index
```

To add a component:
```bash
pipx run chad-ui add <component>
```

### Install Dependencies

#### 1. django-cotton

Please see the [django-cotton installation instructions](https://django-cotton.com/docs/quickstart).

#### 2. HTMX

See the [HTMX installation docs](https://htmx.org/docs/#installing) for the full documentation.

Option A - CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.8/dist/htmx.min.js"></script>
```

Option B - Download:
Download [htmx.min.js](https://unpkg.com/htmx.org@2.0.8/dist/htmx.min.js) to your static files and reference via script tag.

Option C - npm:
```bash
npm install htmx.org@2.0.8
```

Use in your bundle (e.g., `index.js`):
```js
import 'htmx.org';
```

For global `htmx` variable access (recommended):
```js
window.htmx = require('htmx.org');
```

#### 3. AlpineJS

See the [Alpine.js installation docs](https://alpinejs.dev/essentials/installation) for the full documentation.

Option A - CDN:
```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

Option B - npm:
```bash
npm install alpinejs
```

Add to your JS bundle:
```js
import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()
```

#### 4. Tailwind CSS

See the [Tailwind CSS docs](https://tailwindcss.com/docs/installation) for the full documentation.

Option A - CDN (Development):
```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

Option B - Tailwind CLI (Production):
```bash
npm install -D tailwindcss
npx tailwindcss init
```
---