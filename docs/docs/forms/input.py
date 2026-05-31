from django import forms
from django.utils.translation import gettext_lazy as _


class InputForm(forms.Form):
    email = forms.EmailField(
        max_length=254,
        required=True,
        label=_('Email'),
        help_text=_("We'll never share your email with anyone."),
        widget=forms.EmailInput(attrs={'placeholder': 'john@example.com'}),
    )
