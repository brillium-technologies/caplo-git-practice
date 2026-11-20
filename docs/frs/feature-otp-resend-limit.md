# Feature: OTP Resend Limit

**Module:** access (in `caplo-api-server`, behind the OTP endpoint). **Criteria:** Appendix G, OTP-1 to OTP-4.

## Why

A customer who does not receive the sign-in OTP can ask for it again. Without a limit, a script can ask thousands of times, costing SMS money and flooding the customer's phone.

## Rule

1. A mobile number may have at most `otp.resendLimit` resends (Appendix E) in any rolling window of `otp.resendWindowMinutes` minutes.
2. A resend counts while it is less than `otp.resendWindowMinutes` minutes old. A resend sent exactly `otp.resendWindowMinutes` minutes ago no longer counts.
3. When the limit is reached, the resend is refused with the message key `otp.resendLimitReached` and the parameter `minutes`: the minutes until the oldest counted resend leaves the window, rounded up to a whole minute.
4. The same mobile number may be written in different ways (`+91 98765 43210`, `098765 43210`, `9876543210`). Two numbers are the same when their last 10 digits are the same.

## Message

| Key | English |
|---|---|
| `otp.resendLimitReached` | Too many OTP requests. Please try again in {minutes} minutes. |

Telugu and Hindi translations are needed for the same key.

## Out of scope

Sending the SMS and storing OTPs. The caller passes the list of earlier resends.
