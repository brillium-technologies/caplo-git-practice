import { clientConfig } from '../config/clientConfig.js';

// Whole rupees, then optionally a point and one or two digits of paise. Nothing else.
const AMOUNT_PATTERN = /^(\d+)(?:\.(\d{1,2}))?$/;

/**
 * Checks the loan amount a customer or agent typed, on the phone and offline.
 * The text is converted to paise from its digits, never by floating-point multiplication (LOAN-1).
 * See docs/frs/feature-loan-amount-entry.md and Appendix G, LOAN-1 to LOAN-5.
 *
 * @param {string} text What was typed, in rupees.
 * @param {typeof clientConfig} [config]
 * @returns {{ valid: true, amountPaise: number }
 *   | { valid: false, messageKey: 'amount.invalid', params: {} }
 *   | { valid: false, messageKey: 'loan.amountTooLow', params: { min: string } }
 *   | { valid: false, messageKey: 'loan.amountTooHigh', params: { max: string } }}
 */
export function checkLoanAmount(text, config = clientConfig) {
  const match = AMOUNT_PATTERN.exec(text.trim());
  if (!match) return { valid: false, messageKey: 'amount.invalid', params: {} };

  const [, rupees, paise = ''] = match;
  const amountPaise = Number(rupees + paise.padEnd(2, '0'));

  const { minAmountPaise, maxAmountPaise } = config.loan;
  if (amountPaise < minAmountPaise) {
    return { valid: false, messageKey: 'loan.amountTooLow', params: { min: formatRupees(minAmountPaise) } };
  }
  if (amountPaise > maxAmountPaise) {
    return { valid: false, messageKey: 'loan.amountTooHigh', params: { max: formatRupees(maxAmountPaise) } };
  }
  return { valid: true, amountPaise };
}

/**
 * Shows integer paise as rupees with Indian grouping: 1000000000 → ₹1,00,00,000, 250000050 → ₹25,00,000.50.
 * Written by hand because Intl 'en-IN' is not available in every React Native engine.
 * @param {number} amountPaise
 */
export function formatRupees(amountPaise) {
  const rupees = String(Math.trunc(amountPaise / 100));
  const paise = amountPaise % 100;
  const lastThree = rupees.slice(-3);
  const rest = rupees.slice(0, -3).replace(/\B(?=(\d{2})+$)/g, ',');
  const grouped = rest ? `${rest},${lastThree}` : lastThree;
  return `₹${grouped}${paise ? `.${String(paise).padStart(2, '0')}` : ''}`;
}
