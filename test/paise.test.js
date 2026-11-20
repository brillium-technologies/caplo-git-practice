import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rupeesToPaise } from '../src/money/paise.js';

test('rupeesToPaise converts whole rupees', () => {
  assert.equal(rupeesToPaise(250), 25000);
});
