---
title: Field
description: Combine labels, controls, and help text to compose accessible form fields and grouped inputs.
---

:::example
```html
<div class="w-full max-w-md">
  <form>
    <c-field.group>
      <c-field.set>
        <c-field.legend>Payment Method</c-field.legend>
        <c-field.description>
          All transactions are secure and encrypted
        </c-field.description>
        <c-field.group>
          <c-field>
            <c-field.label for="checkout-7j9-card-name-43j">
              Name on Card
            </c-field.label>
            <c-input
              id="checkout-7j9-card-name-43j"
              placeholder="Evil Rabbit"
              required
            />
          </c-field>
          <c-field>
            <c-field.label for="checkout-7j9-card-number-uw1">
              Card Number
            </c-field.label>
            <c-input
              id="checkout-7j9-card-number-uw1"
              placeholder="1234 5678 9012 3456"
              required
            />
            <c-field.description>
              Enter your 16-digit card number
            </c-field.description>
          </c-field>
          <div class="grid grid-cols-3 gap-4">
            <c-field>
              <c-field.label for="checkout-exp-month-ts6">
                Month
              </c-field.label>
              <c-select defaultValue="">
                <c-select.trigger>
                  <c-select.value placeholder="MM" />
                </c-select.trigger>
                <c-select.content>
                  <c-select.group>
                    <c-select.item value="01">01</c-select.item>
                    <c-select.item value="02">02</c-select.item>
                    <c-select.item value="03">03</c-select.item>
                    <c-select.item value="04">04</c-select.item>
                    <c-select.item value="05">05</c-select.item>
                    <c-select.item value="06">06</c-select.item>
                    <c-select.item value="07">07</c-select.item>
                    <c-select.item value="08">08</c-select.item>
                    <c-select.item value="09">09</c-select.item>
                    <c-select.item value="10">10</c-select.item>
                    <c-select.item value="11">11</c-select.item>
                    <c-select.item value="12">12</c-select.item>
                  </c-select.group>
                </c-select.content>
              </c-select>
            </c-field>
            <c-field>
              <c-field.label for="checkout-7j9-exp-year-f59">
                Year
              </c-field.label>
              <c-select defaultValue="">
                <c-select.trigger>
                  <c-select.value placeholder="YYYY" />
                </c-select.trigger>
                <c-select.content>
                  <c-select.group>
                    <c-select.item value="2024">2024</c-select.item>
                    <c-select.item value="2025">2025</c-select.item>
                    <c-select.item value="2026">2026</c-select.item>
                    <c-select.item value="2027">2027</c-select.item>
                    <c-select.item value="2028">2028</c-select.item>
                    <c-select.item value="2029">2029</c-select.item>
                  </c-select.group>
                </c-select.content>
              </c-select>
            </c-field>
            <c-field>
              <c-field.label for="checkout-7j9-cvv">CVV</c-field.label>
              <c-input id="checkout-7j9-cvv" placeholder="123" required />
            </c-field>
          </div>
        </c-field.group>
      </c-field.set>
      <c-field.separator />
      <c-field.set>
        <c-field.legend>Billing Address</c-field.legend>
        <c-field.description>
          The billing address associated with your payment method
        </c-field.description>
        <c-field.group>
          <c-field orientation="horizontal">
            <c-checkbox
              id="checkout-7j9-same-as-shipping-wgm"
              defaultChecked
            />
            <c-field.label
              for="checkout-7j9-same-as-shipping-wgm"
              class="font-normal"
            >
              Same as shipping address
            </c-field.label>
          </c-field>
        </c-field.group>
      </c-field.set>
      <c-field.set>
        <c-field.group>
          <c-field>
            <c-field.label for="checkout-7j9-optional-comments">
              Comments
            </c-field.label>
            <c-textarea
              id="checkout-7j9-optional-comments"
              placeholder="Add any additional comments"
              class="resize-none"
            />
          </c-field>
        </c-field.group>
      </c-field.set>
      <c-field orientation="horizontal">
        <c-button type="submit">Submit</c-button>
        <c-button variant="outline" type="button">
          Cancel
        </c-button>
      </c-field>
    </c-field.group>
  </form>
</div>
```
:::

## Installation

## Usage

## Composition

## Validation