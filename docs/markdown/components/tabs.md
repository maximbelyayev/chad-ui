---
title: Tabs
description: A set of layered sections of content—known as tab panels—that are displayed one at a time.
---

:::example
```html
<c-tabs defaultValue="overview" class="w-[400px]">
  <c-tabs.list>
    <c-tabs.trigger value="overview">Overview</c-tabs.trigger>
    <c-tabs.trigger value="analytics">Analytics</c-tabs.trigger>
    <c-tabs.trigger value="reports">Reports</c-tabs.trigger>
    <c-tabs.trigger value="settings">Settings</c-tabs.trigger>
  </c-tabs.list>
  <c-tabs.content value="overview">
    <c-card>
      <c-card.header>
        <c-card.title>Overview</c-card.title>
        <c-card.description>
          View your key metrics and recent project activity. Track progress
          across all your active projects.
        </c-card.description>
      </c-card.header>
      <c-card.content class="text-sm text-muted-foreground">
        You have 12 active projects and 3 pending tasks.
      </c-card.content>
    </c-card>
  </c-tabs.content>
  <c-tabs.content value="analytics">
    <c-card>
      <c-card.header>
        <c-card.title>Analytics</c-card.title>
        <c-card.description>
          Track performance and user engagement metrics. Monitor trends and
          identify growth opportunities.
        </c-card.description>
      </c-card.header>
      <c-card.content class="text-sm text-muted-foreground">
        Page views are up 25% compared to last month.
      </c-card.content>
    </c-card>
  </c-tabs.content>
  <c-tabs.content value="reports">
    <c-card>
      <c-card.header>
        <c-card.title>Reports</c-card.title>
        <c-card.description>
          Generate and download your detailed reports. Export data in
          multiple formats for analysis.
        </c-card.description>
      </c-card.header>
      <c-card.content class="text-sm text-muted-foreground">
        You have 5 reports ready and available to export.
      </c-card.content>
    </c-card>
  </c-tabs.content>
  <c-tabs.content value="settings">
    <c-card>
      <c-card.header>
        <c-card.title>Settings</c-card.title>
        <c-card.description>
          Manage your account preferences and options. Customize your
          experience to fit your needs.
        </c-card.description>
      </c-card.header>
      <c-card.content class="text-sm text-muted-foreground">
        Configure notifications, security, and themes.
      </c-card.content>
    </c-card>
  </c-tabs.content>
</c-tabs>
```
```python
def view_test(request)
  template = "foo.html"
  return render(request, template, context)
  def view_test(request)
  template = "foo.html"
  return render(request, template, context)def view_test(request)
  template = "foo.html"
  return render(request, template, context)
```
:::

## Installation

```bash
pipx run chad-ui add tabs
```

## Usage

```html
<c-tabs defaultValue="account" class="w-[400px]">
  <c-tabs.list>
    <c-tabs.trigger value="account">Account</c-tabs.trigger>
    <c-tabs.trigger value="password">Password</c-tabs.trigger>
  </c-tabs.list>
  <c-tabs.content value="account">Make changes to your account here.</c-tabs.content>
  <c-tabs.content value="password">Change your password here.</c-tabs.content>
</c-tabs>
```

## Composition

Use the following composition to build `c-tabs`:

```text
c-tabs
├── c-tabs.list
│   ├── c-tabs.trigger
│   └── c-tabs.trigger
├── c-tabs.content
└── c-tabs.content
```

## Examples

### Line

Use the `variant="line"` prop on `c-tabs.list` for a line style.

:::example
```html
<c-tabs defaultValue="overview">
  <c-tabs.list variant="line">
    <c-tabs.trigger value="overview">Overview</c-tabs.trigger>
    <c-tabs.trigger value="analytics">Analytics</c-tabs.trigger>
    <c-tabs.trigger value="reports">Reports</c-tabs.trigger>
  </c-tabs.list>
</c-tabs>
```
:::

## API Reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `string` | `vertical` | Layout direction |
| `defaultValue` | `string` | — | Initially open item |