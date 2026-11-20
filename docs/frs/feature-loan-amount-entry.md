# Feature: Loan Amount Entry

**Module:** loan (in `caplo-mobile-app`, used by the loan amount field and the summary screens). **Criteria:** Appendix G, LOAN-1 to LOAN-5.

## Why

Customers and agents type the loan amount on the phone, often with no network. The app must check it on the phone, store it exactly, and show it the way people in India read amounts.

## Rule

1. The customer or agent types the amount in rupees: digits, optionally a decimal point and one or two digits of paise. Spaces at either end are ignored.
2. Anything else, including more than two decimal places (`1000.555`), is refused with `amount.invalid`. It is never rounded.
3. The amount is stored as an integer number of paise, converted from the typed text exactly (`2500000.50` is 250000050 paise).
4. The amount must be at least `loan.minAmountPaise` and at most `loan.maxAmountPaise` (Appendix E). Below the minimum: `loan.amountTooLow` with the parameter `min`. Above the maximum: `loan.amountTooHigh` with the parameter `max`. Both parameters are shown as rupees.
5. Rupees are shown with the ₹ sign and Indian grouping (the last three digits, then groups of two): ₹1,00,00,000. Paise are shown only when they are not zero, as two digits: ₹25,00,000.50.
6. The check runs on the phone and needs no network.

## Messages

| Key | English |
|---|---|
| `loan.amountTooLow` | The loan amount must be at least {min}. |
| `loan.amountTooHigh` | The loan amount must be at most {max}. |
| `amount.invalid` (exists) | Please enter a valid amount. |

Telugu and Hindi translations are needed for the new keys.
