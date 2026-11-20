# Appendix G: Acceptance Criteria

Each criterion becomes one test, named `<ID>: Given …, when …, then …`. The examples use the defaults in Appendix E.

## OTP Resend Limit

- **OTP-1:** Given a mobile number with 2 resends in the last 15 minutes, when the customer asks for another resend, then it is allowed.
- **OTP-2:** Given a mobile number with 3 resends in the last 15 minutes, the oldest 10 minutes 30 seconds ago, when the customer asks for another resend, then it is refused with `otp.resendLimitReached` and `minutes` 5 (4.5 rounded up).
- **OTP-3:** Given a mobile number with 3 resends, the oldest exactly 15 minutes ago and the other two in the last 15 minutes, when the customer asks for another resend, then it is allowed.
- **OTP-4:** Given 3 resends in the last 15 minutes recorded as `+91 98765 43210`, `098765 43210` and `9876543210`, when a resend is asked for `919876543210`, then it is refused with `otp.resendLimitReached`.

## Loan Amount Entry

- **LOAN-1:** Given the agent types `2500000.50`, when the amount is checked, then it is accepted as exactly 250000050 paise.
- **LOAN-2:** Given the customer types `9999.99`, when the amount is checked, then it is refused with `loan.amountTooLow` and `min` ₹10,000.
- **LOAN-3:** Given the customer types `10000000.01`, when the amount is checked, then it is refused with `loan.amountTooHigh` and `max` ₹1,00,00,000.
- **LOAN-4:** Given the customer types `1000.555`, when the amount is checked, then it is refused with `amount.invalid` and not rounded.
- **LOAN-5:** Given amounts of 1000000000 paise and 250000050 paise, when they are shown, then they read ₹1,00,00,000 and ₹25,00,000.50.
