from django.shortcuts import render
from django.conf import settings
from django.http import Http404, HttpRequest, HttpResponse

from ...context import get_docs_template_and_context


def index(request: HttpRequest) -> HttpResponse:
  component = __name__.split('.')[-1]
  template_name, context = get_docs_template_and_context(component)
  context.update({
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
    }]
  })
  return render(request, template_name, context)

def multiple(request):
  template_name = 'docs/components/accordion/multiple.html'
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
  return render(request, template_name, context)

def borders(request):
  template_name = 'docs/components/accordion/borders.html'
  context = {
    'items': [
      {
        "value": "billing",
        "trigger": "How does billing work?",
        "content":
          "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members."
      },
      {
        "value": "security",
        "trigger": "Is my data secure?",
        "content":
          "Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits. All data is encrypted at rest and in transit using industry-standard protocols."
      },
      {
        "value": "integration",
        "trigger": "What integrations do you support?",
        "content":
          "We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks."
      }
    ]
  }
  return render(request, template_name, context)

def card(request):
  template_name = 'docs/components/accordion/card.html'
  context = {
    "items": [
      {
        "value": "plans",
        "trigger": "What subscription plans do you offer?",
        "content":
          "We offer three subscription tiers: Starter ($9/month), Professional ($29/month), and Enterprise ($99/month). Each plan includes increasing storage limits, API access, priority support, and team collaboration features.",
      },
      {
        "value": "billing",
        "trigger": "How does billing work?",
        "content":
          "Billing occurs automatically at the start of each billing cycle. We accept all major credit cards, PayPal, and ACH transfers for enterprise customers. You'll receive an invoice via email after each payment.",
      },
      {
        "value": "cancel",
        "trigger": "How do I cancel my subscription?",
        "content":
          "You can cancel your subscription anytime from your account settings. There are no cancellation fees or penalties. Your access will continue until the end of your current billing period.",
      },
    ]
  }
  return render(request, template_name, context)