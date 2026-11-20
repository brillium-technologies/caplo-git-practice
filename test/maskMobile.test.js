import { test } from 'node:test';
import assert from 'node:assert/strict';
import { maskMobile } from '../src/sms/maskMobile.js';

test('maskMobile shows only the last 4 digits', () => {
  assert.equal(maskMobile('9876543210'), 'XXXXXX3210');
});

test('maskMobile ignores the country code and spaces', () => {
  assert.equal(maskMobile('+91 98765 43210'), 'XXXXXX3210');
});
