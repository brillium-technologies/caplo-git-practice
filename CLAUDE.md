# CLAUDE.md — caplo-git-practice

A mini version of the Caplo `CLAUDE.md`, with the same sections, for the practice exercises.

## 1. What Caplo is

Caplo is a lending platform for customers and field agents in India. This repository holds a few made-up rules from it so the team can practise Git and Claude Code.

## 2. Source of truth

- Features: `docs/frs/feature-*.md`.
- Client configuration: `docs/frs/appendix-e-client-config.md`.
- Acceptance criteria: `docs/frs/appendix-g-acceptance-criteria.md`. Each criterion has an ID (for example OTP-1) and is written as Given / when / then.
- If the code and the FRS disagree, the FRS wins. Ask before changing the FRS.

## 3. Stack

- Node.js 22, plain JavaScript ES modules, JSDoc for types.
- Tests use the Node test runner (`node:test`) and `node:assert/strict`. No other dependencies.

## 4. The API contract with caplo-mobile-app

Rules return data, never display text: `{ messageKey, params }`. The app (or the API server) turns the key into text in the user's language with `t(lang, key, params)`.

## 5. Repository layout

- `src/config/`: `clientConfig`, the per-client limits from Appendix E.
- `src/i18n/`: `en.json`, `te.json`, `hi.json` and `t()`.
- `src/money/`: rupee and paise conversions.
- `src/sms/`: SMS text builders and `maskMobile`.
- `test/`: one `*.test.js` file per source file.
- `docs/frs/`: features and appendices.

## 6. Modules

- `access`: OTP and sign-in rules (in `caplo-api-server`).
- `loan`: loan application rules (in `caplo-mobile-app` and `caplo-api-server`).

## 7. Conventions

### Messages

- No user-facing text in code. Every message is a key in all three files: English, Telugu and Hindi.
- Keys are `module.camelCase`, for example `otp.resendLimitReached`.

### Configuration

- Limits come from `clientConfig`. Never write a limit as a number in a rule.

### Money and time

- Money is stored as integer paise. Never use floating point for stored amounts.
- Rupees are shown with Indian grouping: ₹1,00,00,000.
- Rules take `now: Date` as a parameter. No `Date.now()` or `new Date()` inside a rule.

### Mobile numbers

- Compare mobile numbers by their last 10 digits.
- Show only the last 4 digits in any text: use `maskMobile`.

### Rate limiting

- Rate limiting: to be added.

## 8. Testing

- Write the tests first, one per acceptance criterion.
- Name each test after its criterion: `OTP-1: Given …, when …, then …`.
- Test the edges: exactly on a limit, one under, one over.

## 9. Commands

```bash
npm install
npm test          # tests only
npm run check     # translation keys, then tests; must pass before a pull request
```

## 10. How to work on a task

1. Read the issue, this file and the FRS feature it names.
2. Plan first (plan mode): files, function signatures, one test per criterion, message keys.
3. Tests first (they fail), then the code, then `npm run check`.
4. Before the pull request: list any hard-coded text or limit and any missing Telugu or Hindi key, and update this file if it no longer describes the code.

### Git

- Branch from the latest `develop`: `feature/<issue>-<slug>`, `fix/<issue>-<slug>`, `hotfix/<issue>-<slug>` (a hotfix branches from the release tag).
- Commit messages: imperative, ending with the issue, for example `Add OTP resend limit check (#3)`.
- Pull requests go into `develop` and end with `Closes #<issue>`. Only a hotfix also goes into `release`.
- Never push to `develop`, `release` or `master` directly.

## 11. Environments

- `develop`: integration. `release`: UAT. `master`: production, tagged `vX.Y.Z`.
