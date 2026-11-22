# Contributing

Thank you for considering a contribution to Persian Payroll Compass.

## Before opening a pull request

1. Open an issue first for substantial features or architectural changes.
2. Create a focused branch from the current default branch.
3. Keep changes scoped and explain the user-visible impact.
4. Use synthetic data only. Never include real employee, payroll, banking, or identity information.
5. Do not add secrets or local environment files.

## Local checks

Install dependencies and run the checks relevant to your change:

```bash
npm ci
npm run lint
npm test
npm run build
```

If a check cannot be run, state that clearly in the pull request.

## Pull request expectations

Include:
- A concise problem statement and summary of the change
- Screenshots for UI changes, using synthetic/demo data
- Tests or manual verification performed
- Any migration, configuration, or deployment notes

Do not describe placeholder screens or demo data as completed production functionality.
