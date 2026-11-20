import { test } from 'node:test';
import assert from 'node:assert/strict';
import { t } from '../src/i18n/t.js';

test('t returns the English text for a key', () => {
  assert.equal(t('en', 'amount.invalid'), 'Please enter a valid amount.');
});
