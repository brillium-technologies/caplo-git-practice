import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkOtpResend } from '../src/access/otpResendLimit.js';
import { clientConfig } from '../src/config/clientConfig.js';

const now = new Date('2026-11-20T10:00:00.000Z');
const ago = (minutes, seconds = 0) => new Date(now.getTime() - (minutes * 60 + seconds) * 1000);
const mobile = '9876543210';

test('OTP-1: Given a mobile number with 2 resends in the last 15 minutes, when the customer asks for another resend, then it is allowed', () => {
  const previousResends = [{ mobile, sentAt: ago(10) }, { mobile, sentAt: ago(2) }];
  assert.deepEqual(checkOtpResend({ mobile, previousResends, now }), { allowed: true });
});

test('OTP-2: Given a mobile number with 3 resends in the last 15 minutes, the oldest 10 minutes 30 seconds ago, when the customer asks for another resend, then it is refused with otp.resendLimitReached and minutes 5', () => {
  const previousResends = [{ mobile, sentAt: ago(10, 30) }, { mobile, sentAt: ago(6) }, { mobile, sentAt: ago(1) }];
  assert.deepEqual(checkOtpResend({ mobile, previousResends, now }), {
    allowed: false,
    messageKey: 'otp.resendLimitReached',
    params: { minutes: 5 },
  });
});

test('OTP-3: Given a mobile number with 3 resends, the oldest exactly 15 minutes ago, when the customer asks for another resend, then it is allowed', () => {
  const previousResends = [{ mobile, sentAt: ago(15) }, { mobile, sentAt: ago(14, 59) }, { mobile, sentAt: ago(1) }];
  assert.deepEqual(checkOtpResend({ mobile, previousResends, now }), { allowed: true });
});

test('OTP-4: Given 3 resends in the last 15 minutes recorded as +91 98765 43210, 098765 43210 and 9876543210, when a resend is asked for 919876543210, then it is refused with otp.resendLimitReached', () => {
  const previousResends = [
    { mobile: '+91 98765 43210', sentAt: ago(9) },
    { mobile: '098765 43210', sentAt: ago(5) },
    { mobile: '9876543210', sentAt: ago(1) },
  ];
  const result = checkOtpResend({ mobile: '919876543210', previousResends, now });
  assert.equal(result.allowed, false);
  assert.equal(result.messageKey, 'otp.resendLimitReached');
});

test('the limit and window come from clientConfig', () => {
  const config = { ...clientConfig, otp: { ...clientConfig.otp, resendLimit: 2, resendWindowMinutes: 30 } };
  const previousResends = [{ mobile, sentAt: ago(20) }, { mobile, sentAt: ago(1) }];
  assert.deepEqual(checkOtpResend({ mobile, previousResends, now, config }), {
    allowed: false,
    messageKey: 'otp.resendLimitReached',
    params: { minutes: 10 },
  });
});

test('resends for other mobile numbers do not count', () => {
  const other = '9123456780';
  const previousResends = [{ mobile: other, sentAt: ago(3) }, { mobile: other, sentAt: ago(2) }, { mobile: other, sentAt: ago(1) }];
  assert.deepEqual(checkOtpResend({ mobile, previousResends, now }), { allowed: true });
});

test('minutes rounds up to 1 when only seconds are left', () => {
  const previousResends = [{ mobile, sentAt: ago(14, 59) }, { mobile, sentAt: ago(5) }, { mobile, sentAt: ago(1) }];
  assert.deepEqual(checkOtpResend({ mobile, previousResends, now }).params, { minutes: 1 });
});

test('with more resends than the limit, minutes counts until the count drops below the limit', () => {
  // 4 in the window: the count drops to 2 only when the second oldest (12 minutes ago) leaves, in 3 minutes.
  const previousResends = [
    { mobile, sentAt: ago(14) },
    { mobile, sentAt: ago(12) },
    { mobile, sentAt: ago(5) },
    { mobile, sentAt: ago(1) },
  ];
  assert.deepEqual(checkOtpResend({ mobile, previousResends, now }).params, { minutes: 3 });
});
