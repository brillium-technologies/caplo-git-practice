/** Per-client limits. See docs/frs/appendix-e-client-config.md. */
export const clientConfig = Object.freeze({
  otp: Object.freeze({
    resendLimit: 3,
    resendWindowMinutes: 15,
    validityMinutes: 5,
  }),
  loan: Object.freeze({
    minAmountPaise: 1000000,
    maxAmountPaise: 1000000000,
  }),
});
