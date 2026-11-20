/**
 * Hides all but the last 4 digits of a mobile number: 9876543210 → XXXXXX3210.
 * @param {string} mobile
 */
export function maskMobile(mobile) {
  const last10 = mobile.replace(/\D/g, '').slice(-10);
  return 'X'.repeat(last10.length - 4) + last10.slice(-4);
}
