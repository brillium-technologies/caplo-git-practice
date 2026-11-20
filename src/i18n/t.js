import { readFileSync } from 'node:fs';

const load = (lang) => JSON.parse(readFileSync(new URL(`./${lang}.json`, import.meta.url), 'utf8'));

/** @type {Record<'en' | 'te' | 'hi', Record<string, string>>} */
export const messages = { en: load('en'), te: load('te'), hi: load('hi') };

/**
 * Turns a message key into text in the given language, filling in {name} parameters.
 * @param {'en' | 'te' | 'hi'} lang
 * @param {string} key
 * @param {Record<string, string | number>} [params]
 */
export function t(lang, key, params = {}) {
  const text = messages[lang]?.[key];
  if (text === undefined) throw new Error(`Missing message key ${key} for ${lang}`);
  return text.replace(/\{(\w+)\}/g, (match, name) => (name in params ? String(params[name]) : match));
}
