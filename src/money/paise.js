/**
 * Converts a rupee amount to integer paise.
 * @param {number} rupees
 * @returns {number}
 */
export function rupeesToPaise(rupees) {
  return Math.round(rupees * 100);
}

/**
 * Converts integer paise to rupees.
 * @param {number} paise
 * @returns {number}
 */
export function paiseToRupees(paise) {
  return paise / 100;
}
