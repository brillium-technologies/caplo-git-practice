import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildOtpSms } from '../src/sms/otpSms.js';

test('buildOtpSms includes the OTP and its validity', () => {
  const sms = buildOtpSms('en', '9876543210', '482913');
  assert.match(sms, /482913/);
  assert.match(sms, /5 minutes/);
});

test('#6: buildOtpSms shows only the last 4 digits of the mobile number', () => {
  const sms = buildOtpSms('en', '9876543210', '482913');
  assert.doesNotMatch(sms, /9876543210/);
  assert.match(sms, /XXXXXX3210/);
});
