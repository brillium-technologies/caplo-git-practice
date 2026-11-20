import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildOtpSms } from '../src/sms/otpSms.js';

test('buildOtpSms includes the OTP and its validity', () => {
  const sms = buildOtpSms('en', '9876543210', '482913');
  assert.match(sms, /482913/);
  assert.match(sms, /5 minutes/);
});
