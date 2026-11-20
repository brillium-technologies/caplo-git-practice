# caplo-git-practice

A throwaway repository for practising the Caplo Git workflow (branches, pull requests, merge conflicts, release tags and hotfixes) and for building small FRS features with Claude Code from `CLAUDE.md` and `docs/frs/`.

All code here is made up. Nothing in it ships.

## Getting Started

```bash
npm install
npm run check
```

`npm run check` checks that the English, Telugu and Hindi files have the same keys, then runs the tests.

## Branches

- `develop`: the default branch. Every feature and fix goes here by pull request.
- `release`: what is in UAT. Venkat merges `develop` into it.
- `master`: what is in production. Moves only to a release tag.

## Contact

Engineering lead: Venkat, CTO, Brillium
Support e-mail: support@caplo.in
