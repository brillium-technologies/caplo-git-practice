import { clientConfig } from '../config/clientConfig.js';
import { t } from '../i18n/t.js';

/**
 * Builds the OTP SMS text in the customer's language.
 * @param {'en' | 'te' | 'hi'} lang
 * @param {string} mobile
 * @param {string} otp
 * @param {typeof clientConfig} [config]
 */
export function buildOtpSms(lang, mobile, otp, config = clientConfig) {
  return t(lang, 'otp.sms', { mobile, otp, minutes: config.otp.validityMinutes });
}
