import { clientConfig } from '../config/clientConfig.js';

const MS_PER_MINUTE = 60 * 1000;

/** Two mobile numbers are the same when their last 10 digits are the same (OTP-4). */
const last10Digits = (mobile) => mobile.replace(/\D/g, '').slice(-10);

/**
 * Checks whether a mobile number may have another OTP resend.
 * See docs/frs/feature-otp-resend-limit.md and Appendix G, OTP-1 to OTP-4.
 *
 * @param {object} input
 * @param {string} input.mobile The number asking for a resend, in any format.
 * @param {Array<{ mobile: string, sentAt: Date }>} input.previousResends Earlier resends, any numbers.
 * @param {Date} input.now The current time, passed in so the rule is testable.
 * @param {typeof clientConfig} [input.config]
 * @returns {{ allowed: true } | { allowed: false, messageKey: 'otp.resendLimitReached', params: { minutes: number } }}
 */
export function checkOtpResend({ mobile, previousResends, now, config = clientConfig }) {
  const { resendLimit, resendWindowMinutes } = config.otp;
  const windowMs = resendWindowMinutes * MS_PER_MINUTE;
  const number = last10Digits(mobile);

  // A resend counts while it is less than the window old (OTP-3: exactly the window no longer counts).
  const counted = previousResends
    .filter((resend) => last10Digits(resend.mobile) === number)
    .map((resend) => resend.sentAt.getTime())
    .filter((sentAt) => now.getTime() - sentAt < windowMs)
    .sort((a, b) => a - b);

  if (counted.length < resendLimit) return { allowed: true };

  // Allowed again once enough of the oldest resends leave the window to drop below the limit.
  const leavesWindowAt = counted[counted.length - resendLimit] + windowMs;
  const minutes = Math.ceil((leavesWindowAt - now.getTime()) / MS_PER_MINUTE);
  return { allowed: false, messageKey: 'otp.resendLimitReached', params: { minutes } };
}
