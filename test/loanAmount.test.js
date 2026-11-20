import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkLoanAmount, formatRupees } from '../src/loan/loanAmount.js';
import { clientConfig } from '../src/config/clientConfig.js';

test('LOAN-1: Given the agent types 2500000.50, when the amount is checked, then it is accepted as exactly 250000050 paise', () => {
  assert.deepEqual(checkLoanAmount('2500000.50'), { valid: true, amountPaise: 250000050 });
});

test('LOAN-2: Given the customer types 9999.99, when the amount is checked, then it is refused with loan.amountTooLow and min ₹10,000', () => {
  assert.deepEqual(checkLoanAmount('9999.99'), {
    valid: false,
    messageKey: 'loan.amountTooLow',
    params: { min: '₹10,000' },
  });
});

test('LOAN-3: Given the customer types 10000000.01, when the amount is checked, then it is refused with loan.amountTooHigh and max ₹1,00,00,000', () => {
  assert.deepEqual(checkLoanAmount('10000000.01'), {
    valid: false,
    messageKey: 'loan.amountTooHigh',
    params: { max: '₹1,00,00,000' },
  });
});

test('LOAN-4: Given the customer types 1000.555, when the amount is checked, then it is refused with amount.invalid and not rounded', () => {
  assert.deepEqual(checkLoanAmount('1000.555'), { valid: false, messageKey: 'amount.invalid', params: {} });
});

test('LOAN-5: Given amounts of 1000000000 paise and 250000050 paise, when they are shown, then they read ₹1,00,00,000 and ₹25,00,000.50', () => {
  assert.equal(formatRupees(1000000000), '₹1,00,00,000');
  assert.equal(formatRupees(250000050), '₹25,00,000.50');
});

test('the exact minimum and maximum are accepted', () => {
  assert.deepEqual(checkLoanAmount('10000'), { valid: true, amountPaise: 1000000 });
  assert.deepEqual(checkLoanAmount(' 10000000.00 '), { valid: true, amountPaise: 1000000000 });
});

test('text that is not an amount is refused with amount.invalid', () => {
  for (const text of ['', ' ', 'abc', '-500', '1,000', '12.', '.5', '1e5']) {
    assert.equal(checkLoanAmount(text).messageKey, 'amount.invalid', text);
  }
});

test('the minimum and maximum come from clientConfig', () => {
  const config = { ...clientConfig, loan: { minAmountPaise: 500000, maxAmountPaise: 2000000 } };
  assert.equal(checkLoanAmount('5000', config).valid, true);
  assert.deepEqual(checkLoanAmount('20000.01', config).params, { max: '₹20,000' });
});

test('formatRupees groups small amounts and shows one-digit paise as two digits', () => {
  assert.equal(formatRupees(0), '₹0');
  assert.equal(formatRupees(99900), '₹999');
  assert.equal(formatRupees(100005), '₹1,000.05');
});

test('a leading zero is read as a decimal amount', () => {
  assert.deepEqual(checkLoanAmount('010000'), { valid: true, amountPaise: 1000000 });
});
