// Fails when English, Telugu and Hindi do not have exactly the same message keys.
import { messages } from '../src/i18n/t.js';

const langs = Object.keys(messages);
const all = new Set(langs.flatMap((lang) => Object.keys(messages[lang])));
const problems = [];
for (const key of all) {
  for (const lang of langs) {
    if (!(key in messages[lang])) problems.push(`${lang}.json is missing ${key}`);
    else if (!messages[lang][key].trim()) problems.push(`${lang}.json has an empty ${key}`);
  }
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`i18n: ${all.size} keys in ${langs.join(', ')}`);
