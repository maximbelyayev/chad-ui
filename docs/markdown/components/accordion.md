---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
---

:::example
```html
<c-accordion orientation="vertical" defaultValue="shipping" class="max-w-lg">
  <c-accordion.item value="shipping">
    <c-accordion.trigger>What are your shipping options?</c-accordion.trigger>
    <c-accordion.content>
      We offer standard (5-7 days), express (2-3 days), and overnight
      shipping. Free shipping on international orders.
    </c-accordion.content>
  </c-accordion.item>
  <c-accordion.item value="returns">
    <c-accordion.trigger>What is your return policy?</c-accordion.trigger>
    <c-accordion.content>
      Returns accepted within 30 days. Items must be unused and in original
      packaging. Refunds processed within 5-7 business days.
    </c-accordion.content>
  </c-accordion.item>
  <c-accordion.item value="support">
    <c-accordion.trigger>How can I contact customer support?</c-accordion.trigger>
    <c-accordion.content>
      Reach us via email, live chat, or phone. We respond within 24 hours
      during business days.
    </c-accordion.content>
  </c-accordion.item>
</c-accordion>
```
:::

## Installation
```bash
pipx run chad-ui add accordion
```

## Usage
```html
<c-accordion defaultValue="item-1">
  <c-accordion.item value="item-1">
    <c-accordion.trigger>Is it accessible?</c-accordion.trigger>
    <c-accordion.content>
      Yes. It adheres to the WAI-ARIA design pattern.
    </c-accordion.content>
  </c-accordion.item>
</c-accordion>
```

## Example

### Basic
A basic accordion that shows one item at a time. The first item is open by default.

:::example
```html
<c-accordion type="single" collapsible defaultValue="item-1" class="max-w-lg">
  <c-accordion.item value="item-1">
    <c-accordion.trigger>How do I reset my password?</c-accordion.trigger>
    <c-accordion.content>
    Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.
    </c-accordion.content>
  </c-accordion.item>
  <c-accordion.item value="item-2">
    <c-accordion.trigger>Can I change my subscription plan?</c-accordion.trigger>
    <c-accordion.content>
    Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.
    </c-accordion.content>
  </c-accordion.item>
  <c-accordion.item value="item-3">
    <c-accordion.trigger>What payment methods do you accept?</c-accordion.trigger>
    <c-accordion.content>
    We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.
    </c-accordion.content>
  </c-accordion.item>
</c-accordion>
```
:::

### Multiple
Use `type="multiple"` to allow multiple items to be open at the same time.

:::example
```html
<c-accordion type="multiple" defaultValue="notifications" class="max-w-lg">
  {% for item in items %}
    <c-accordion.item key="{{ item.value }}" value="{{ item.value }}">
      <c-accordion.trigger>{{ item.trigger }}</c-accordion.trigger>
      <c-accordion.content>{{ item.content }}</c-accordion.content>
    </c-accordion.item>
  {% endfor %}
</c-accordion>
```
```python
def multiple(request):
  context = {
    'items': [
      {
        'value': "notifications",
        'trigger': "Notification Settings",
        'content':
        "Manage how you receive notifications. You can enable email alerts for updates or push notifications for mobile devices.",
      },
      {
        'value': "privacy",
        'trigger': "Privacy & Security",
        'content':
        "Control your privacy settings and security preferences. Enable two-factor authentication, manage connected devices, review active sessions, and configure data sharing preferences. You can also download your data or delete your account.",
      },
      {
        'value': "billing",
        'trigger': "Billing & Subscription",
        'content':
        "View your current plan, payment history, and upcoming invoices. Update your payment method, change your subscription tier, or cancel your subscription.",
      },
    ]
  }
return render(request, "multiple.html", context)
```
:::

### Disabled
Use the `disabled` prop on `c-accordion.item` to disable individual items.

:::example
```html
<c-accordion type="single" collapsible class="w-full">
  <c-accordion.item value="item-1">
    <c-accordion.trigger>Can I access my account history?</c-accordion.trigger>
    <c-accordion.content>
      Yes, you can view your complete account history including all
      transactions, plan changes, and support tickets in the Account History
      section of your dashboard.
    </c-accordion.content>
  </c-accordion.item>
  <c-accordion.item value="item-2" disabled>
    <c-accordion.trigger>Premium feature information</c-accordion.trigger>
    <c-accordion.content>
      This section contains information about premium features. Upgrade your
      plan to access this content.
    </c-accordion.content>
  </c-accordion.item>
  <c-accordion.item value="item-3">
    <c-accordion.trigger>How do I update my email address?</c-accordion.trigger>
    <c-accordion.content>
      You can update your email address in your account settings.
      You'll receive a verification email at your new address to
      confirm the change.
    </c-accordion.content>
  </c-accordion.item>
</c-accordion>
```
:::

### Borders
Add `border` to the `c-accordion` and `border-b last:border-b-0` to the `c-accordion.item` to add borders to the items.

:::example
```html
<c-accordion
  type="single"
  collapsible
  class="max-w-lg rounded-lg border"
  defaultValue="billing"
>
  {% for item in items %}
    <c-accordion.item
      key="{{ item.value }}"
      value="{{ item.value }}"
      class="border-b px-4 last:border-b-0"
    >
      <c-accordion.trigger>{{ item.trigger }}</c-accordion.trigger>
      <c-accordion.content>{{ item.content }}</c-accordion.content>
    </c-accordion.item>
  {% endfor %}
</c-accordion>
```
```python
<Accordion
  type="single"
  collapsible
  className="max-w-lg rounded-lg border"
  defaultValue="billing"
>
  {items.map((item) => (
    <AccordionItem
      key={item.value}
      value={item.value}
      className="border-b px-4 last:border-b-0"
    >
      <AccordionTrigger>{item.trigger}</AccordionTrigger>
      <AccordionContent>{item.content}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```
:::

### Card
Wrap the `c-accordion` in a `c-card` component.

:::example
```html
<c-card class="w-full max-w-sm">
  <c-card.header>
    <c-card.title>Subscription & Billing</c-card.title>
    <c-card.description>
      Common questions about your account, plans, payments and
      cancellations.
    </c-card.description>
  </c-card.header>
  <c-card.content>
    <c-accordion type="single" collapsible defaultValue="plans">
      {% for item in items %}
        <c-accordion.item key="{{ item.value }}" value="{{ item.value }}">
          <c-accordion.trigger>{{ item.trigger }}</c-accordion.trigger>
          <c-accordion.content>{{ item.content }}</c-accordion.content>
        </c-accordion.item>
      {% endfor %}
    </c-accordion>
  </c-card.content>
</c-card>
```
:::

## API Reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `string` | `vertical` | Layout direction |
| `defaultValue` | `string` | — | Initially open item |