# Appendix E: Client Configuration

Each client can change these values. The code reads them from `clientConfig` (`src/config/clientConfig.js`) and never writes them as numbers.

| Key | Default | Meaning |
|---|---|---|
| `otp.resendLimit` | 3 | Most OTP resends for one mobile number in the window |
| `otp.resendWindowMinutes` | 15 | Length of the rolling OTP resend window, in minutes |
| `otp.validityMinutes` | 5 | How long an OTP is valid, in minutes |
| `loan.minAmountPaise` | 1000000 | Smallest loan amount, in paise (₹10,000) |
| `loan.maxAmountPaise` | 1000000000 | Largest loan amount, in paise (₹1,00,00,000) |
