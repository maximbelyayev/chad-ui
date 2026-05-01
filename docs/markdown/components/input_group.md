---
title: Input Group
description: Add addons, buttons, and helper content to inputs.
---

:::example
```html
<c-input-group class="max-w-xs">
  <c-input-group.input placeholder="Search..." />
  <c-input-group.addon>
    {% heroicon_outline 'magnifying-glass' stroke_width=2 %}
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
    {% heroicon_outline 'magnifying-glass' stroke_width=2 %}
  </c-input-group.addon>
</c-input-group>
```

## Composition

Use the following composition to build an input group:

```text
c-input-group
├── c-input-group.input or c-input-group.textarea
├── c-input-group.addon
├── c-input-group.button
└── c-input-group.text
```

## Align

Use the `align` prop on `c-input-group.addon` to position the addon relative to the input.

<c-callout title="Focus Navigation" icon="information-circle" >
  For proper focus management, `c-input-group.addon`should always be placed after
  `c-input-group.input` or `c-input-group.textarea` in the DOM. Set the `align` prop to
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
      {% heroicon_outline 'eye-slash' stroke_width=2 %}
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
        {% heroicon_outline 'code-bracket-square' stroke_width=2 class="size-4" %}
        <c-input-group.text class="font-mono">script.js</c-input-group.text>
        <c-input-group.button size="icon-xs" class="ml-auto!">
          {% heroicon_outline 'square-2-stack' stroke_width=2 class="size-4" %}
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
<div class="grid w-full max-w-sm gap-6">
  <c-input-group>
    <c-input-group.input placeholder="Search..." />
    <c-input-group.addon>
      {% heroicon_outline 'magnifying-glass' stroke_width=2 %}
    </c-input-group.addon>
  </c-input-group>
  <c-input-group>
    <c-input-group.input type="email" placeholder="Enter your email" />
    <c-input-group.addon>
      {% heroicon_outline 'envelope' stroke_width=2 %}
    </c-input-group.addon>
  </c-input-group>
  <c-input-group>
    <c-input-group.input placeholder="Card number" />
    <c-input-group.addon>
      {% heroicon_outline 'credit-card' stroke_width=2 %}
    </c-input-group.addon>
    <c-input-group.addon align="inline-end">
      {% heroicon_outline 'check' stroke_width=2 %}
    </c-input-group.addon>
  </c-input-group>
  <c-input-group>
    <c-input-group.input placeholder="Card number" />
    <c-input-group.addon align="inline-end">
      {% heroicon_outline 'star' stroke_width=2 %}
      {% heroicon_outline 'information-circle' stroke_width=2 %}
    </c-input-group.addon>
  </c-input-group>
</div>
```
:::

### Text

:::example
```html
<div class="grid w-full max-w-sm gap-6">
  <c-input-group>
    <c-input-group.addon>
      <c-input-group.text>$</c-input-group.text>
    </c-input-group.addon>
    <c-input-group.input placeholder="0.00" />
    <c-input-group.addon align="inline-end">
      <c-input-group.text>USD</c-input-group.text>
    </c-input-group.addon>
  </c-input-group>
  <c-input-group>
    <c-input-group.addon>
      <c-input-group.text>https://</c-input-group.text>
    </c-input-group.addon>
    <c-input-group.input placeholder="example.com" class="pl-0.5!" />
    <c-input-group.addon align="inline-end">
      <c-input-group.text>.com</c-input-group.text>
    </c-input-group.addon>
  </c-input-group>
  <c-input-group>
    <c-input-group.input placeholder="Enter your username" />

    <c-input-group.addon align="inline-end">
      <c-input-group.text>@company.com</c-input-group.text>
    </c-input-group.addon>
  </c-input-group>
  <c-input-group>
    <c-input-group.textarea placeholder="Enter your message" />
    <c-input-group.addon align="block-end">
      <c-input-group.text class="text-xs text-muted-foreground">
        120 characters left
      </c-input-group.text>
    </c-input-group.addon>
  </c-input-group>
</div>
```
:::

### Button

:::example
```html
<div class="grid w-full max-w-sm gap-6"
  x-data="{
    copied: false,
    favorite: false,
    async copy(text) {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Unable to copy code to clipboard', err);
        }
    },
    copyToClipboard(text) {
        this.copied = true;
        this.copy(String(text));
        setTimeout(() => this.copied = false, 2000);
    },
    toggleFavorite() {
      this.favorite = !this.favorite;
    }
  }"
>
  <c-input-group>
    <c-input-group.input placeholder="https://github.com/maximbelyayev/" readonly />
    <c-input-group.addon align="inline-end">
      <c-input-group.button
        aria-label="Copy"
        title="Copy"
        size="icon-xs"
        @click="copyToClipboard('https://github.com/maximbelyayev/')"
      >
        {% heroicon_outline 'square-2-stack' stroke_width=2 class="size-4" x_show="!copied" %}
        {% heroicon_outline 'check' stroke_width=2 class="size-4" x_show="copied" %}
      </c-input-group.button>
    </c-input-group.addon>
  </c-input-group>

  <c-input-group class="rounded-full! **:rounded-full!">
    <c-popover>
      <c-popover.trigger>
        <c-input-group.addon>
          <c-input-group.button variant="secondary" size="icon-xs">
            {% heroicon_outline 'information-circle' stroke_width=2 class="size-4" %}
          </c-input-group.button>
        </c-input-group.addon>
      </c-popover.trigger>
      <c-popover.content
        align="start"
        class="flex flex-col p-2.5! gap-1! rounded-xl! text-sm!"
      >
        <p class="font-medium">Your connection is not secure.</p>
        <p>
          You should not enter any sensitive information on this site.
        </p>
      </c-popover.content>
    </c-popover>
    <c-input-group.addon class="pl-1.5 text-muted-foreground">
      https://
    </c-input-group.addon>
    <c-input-group.input id="input-secure-19" />
    <c-input-group.addon align="inline-end">
      <c-input-group.button size="icon-xs" @click="toggleFavorite()" ::class="favorite ? '[&>svg]:stroke-blue-600 [&>svg]:fill-blue-600': null" >
        {% heroicon_outline 'star' stroke_width=2 class="size-4" %}
      </c-input-group.button>
    </c-input-group.addon>
  </c-input-group>

  <c-input-group>
    <c-input-group.input placeholder="Type to search..." />
    <c-input-group.addon align="inline-end">
      <c-input-group.button variant="secondary">
        Search
      </c-input-group.button>
    </c-input-group.addon>
  </c-input-group>
</div>
```
:::

### Kbd

:::example
```html
<c-input-group class="max-w-sm">
  <c-input-group.input placeholder="Search..." />
  <c-input-group.addon>
    {% heroicon_outline 'magnifying-glass' stroke_width=2 class="text-muted-foreground" %}
  </c-input-group.addon>
  <c-input-group.addon align="inline-end">
    <c-kbd>⌘K</c-kbd>
  </c-input-group.addon>
</c-input-group>
```
:::

### Dropdown

:::example
```html
<div class="grid w-full max-w-sm gap-4">
  <c-input-group>
    <c-input-group.input placeholder="Enter file name" />
    <c-input-group.addon align="inline-end">
      <c-dropdown-menu>
        <c-dropdown-menu.trigger asChild>
          <c-input-group.button variant="ghost" aria-label="More" size="icon-xs">
            {% heroicon_outline 'ellipsis-horizontal' stroke_width=2 class="size-4" %}
          </c-input-group.button>
        </c-dropdown-menu.trigger>
        <c-dropdown-menu.content align="end">
          <c-dropdown-menu.group>
            <c-dropdown-menu.item>Settings</c-dropdown-menu.item>
            <c-dropdown-menu.item>Copy path</c-dropdown-menu.item>
            <c-dropdown-menu.item>Open location</c-dropdown-menu.item>
          </c-dropdown-menu.group>
        </c-dropdown-menu.content>
      </c-dropdown-menu>
    </c-input-group.addon>
  </c-input-group>
  <c-input-group>
    <c-input-group.input placeholder="Enter search query" />
    <c-input-group.addon align="inline-end">
      <c-dropdown-menu>
        <c-dropdown-menu.trigger as-child>
          <c-input-group.button variant="ghost" class="pr-1.5! text-xs">
            Search In...
            {% heroicon_outline 'chevron-down' stroke_width=2 class="size-3" %}
          </c-input-group.button>
        </c-dropdown-menu.trigger>
        <c-dropdown-menu.content align="end" class="[--radius:0.95rem]">
          <c-dropdown-menu.group>
            <c-dropdown-menu.item>Documentation</c-dropdown-menu.item>
            <c-dropdown-menu.item>Blog Posts</c-dropdown-menu.item>
            <c-dropdown-menu.item>Changelog</c-dropdown-menu.item>
          </c-dropdown-menu.group>
        </c-dropdown-menu.content>
      </c-dropdown-menu>
    </c-input-group.addon>
  </c-input-group>
</div>
```
:::

### Spinner

:::example
```html
<div class="grid w-full max-w-sm gap-4">
  <c-input-group>
    <c-input-group.input placeholder="Searching..." />
    <c-input-group.addon align="inline-end">
      <c-spinner />
    </c-input-group.addon>
  </c-input-group>
  <c-input-group>
    <c-input-group.input placeholder="Processing..." />
    <c-input-group.addon>
      <c-spinner />
    </c-input-group.addon>
  </c-input-group>
  <c-input-group>
    <c-input-group.input placeholder="Saving changes..." />
    <c-input-group.addon align="inline-end">
      <c-input-group.text>Saving...</c-input-group.text>
      <c-spinner />
    </c-input-group.addon>
  </c-input-group>
  <c-input-group>
    <c-input-group.input placeholder="Refreshing data..." />
    <c-input-group.addon>
      {% heroicon_outline 'arrow-path' class="animate-spin" %}
    </c-input-group.addon>
    <c-input-group.addon align="inline-end">
      <c-input-group.text class="text-muted-foreground">
        Please wait...
      </c-input-group.text>
    </c-input-group.addon>
  </c-input-group>
</div>
```
:::

### Textarea

:::example
```html
<div class="grid w-full max-w-md gap-4">
  <c-input-group>
    <c-input-group.textarea
      id="textarea-code-32"
      placeholder="console.log('Hello, world!');"
      class="min-h-[200px]"
    />
    <c-input-group.addon align="block-end" class="border-t!">
      <c-input-group.text>Line 1, Column 1</c-input-group.text>
      <c-input-group.button size="sm" class="ml-auto" variant="default">
        Run {% heroicon_outline 'arrow-turn-down-left' stroke_width=2 %}
      </c-input-group.button>
    </c-input-group.addon>
    <c-input-group.addon align="block-start" class="border-b!">
      <c-input-group.text class="font-mono! font-medium!">
        {% heroicon_outline 'code-bracket-square' stroke_width=2 class="size-4" %}
        script.js
      </c-input-group.text>
      <c-input-group.button class="ml-auto" size="icon-xs">
        {% heroicon_outline 'arrow-path' stroke_width=2 class="size-4" %}
      </c-input-group.button>
      <c-input-group.button variant="ghost" size="icon-xs">
        {% heroicon_outline 'square-2-stack' stroke_width=2 class="size-4" %}
      </c-input-group.button>
    </c-input-group.addon>
  </c-input-group>
</div>
```
:::

## API Reference

### c-input-group

The main component that wraps inputs and addons.

| Prop | Type | Default | Description |
|---|---|---|---|

```html
<c-input-group>
  <c-input-group.input />
  <c-input-group.addon />
</c-input-group>
```

### c-input-group.addon

Displays icons, text, buttons, or other content alongside inputs.

<c-callout title="Focus Navigation" icon="information-circle" >
  For proper focus management, `c-input-group.addon`should always be placed after
  `c-input-group.input` or `c-input-group.textarea` in the DOM. Set the `align` prop to
  visually position the addon.
</c-callout>  

| Prop | Type | Default | Description |
|---|---|---|---|
| `align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` | The alignment of the addon within the input group |

**For `<c-input-group.input />`, use the `inline-start` or `inline-end` alignment. For `<c-input-group.textarea />`, use the `block-start` or `block-end` alignment.**

The `c-input-group.addon` component can have multiple `c-input-group.button` components and icons.

```html
<c-input-group.addon>
  <c-input-group.button>Button</c-input-group.button>
  <c-input-group.button>Button</c-input-group.button>
</c-input-group.addon>
```

### c-input-group.button

Displays buttons within input groups.

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"xs" \| "icon-xs" \| "sm" \| "icon-sm"` | `"xs"` | The size of the button |
| `variant` | `"default" \| "outline" \| "ghost" \| "destructive" \| "secondary" \| "link"` | `"ghost"` | The styling variant applied to the button |

```html
<c-input-group.button>Button</c-input-group.button>
<c-input-group.button size="icon-xs">
  {% heroicon_outline 'square-2-stack' stroke_width=2 %}
</c-input-group.button>
```

### c-input-group.input

Replacement for `<c-input />` when building input groups. This component has the input group styles pre-applied and uses the unified `data-slot="input-group-control"` for focus state handling.

| Prop | Type | Default | Description |
|---|---|---|---|

All props are passed through to the underlying `<c-input />` component.

```html
<c-input-group>
  <c-input-group.input placeholder="Enter text..." />
  <c-input-group.addon>
    {% heroicon_outline 'magnifying-glass' stroke_width=2 %}
  </c-input-group.addon>
</c-input-group>
```

### c-input-group.textarea

Replacement for `<c-textarea />` when building input groups. This component has the input group styles pre-applied and uses the unified `data-slot="input-group-control"` for focus state handling.

| Prop | Type | Default | Description |
|---|---|---|---|

All props are passed through to the underlying `<c-textarea />` component.

```html
<c-input-group>
  <c-input-group.textarea placeholder="Enter message..." />
  <c-input-group.addon align="block-end"  >
    <c-input-group.button>Send</c-input-group.button>
  </c-input-group.addon>
</c-input-group>
```