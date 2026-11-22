# Persian Payroll Compass

A Persian (Farsi), right-to-left payroll and human-resources application project.

## Project status

This repository currently contains the React + TypeScript redesign of the payroll interface. It is an evolving frontend, not yet a complete production payroll application. Dashboard figures and sample employee/payroll content are demonstration data and must not be treated as live records.

The existing operational application uses a separate Node.js/Express + MySQL backend and a legacy HTML/CSS/JavaScript client. Their source has **not yet been imported into this repository**. Backend integration and migration of the legacy workflows into React are planned work; do not assume the React UI is connected to a production database.

## Technology

- React and TypeScript
- TanStack Start and TanStack Router
- Vite
- Tailwind CSS
- Radix UI components
- Persian RTL layout and Vazirmatn typography

## Development

Requirements: Node.js (LTS) and npm.

```bash
npm ci
npm run dev
```

Available checks:

```bash
npm run lint
npm test
npm run build
```

## Security and privacy

Payroll applications may handle highly sensitive employee information. This repository must contain source code and synthetic examples only. Never commit:

- `.env` files, credentials, API keys, tokens, private keys, or production connection strings
- Real employee records, payslips, bank details, identity documents, or personnel photographs
- Database dumps, backups, runtime uploads, or production logs

Review [SECURITY.md](SECURITY.md) before deploying or reporting a vulnerability.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Changes should be proposed through a branch and pull request. Do not commit directly to `main` for substantial changes.

## License

No open-source license has been added yet. Until a license is explicitly selected and committed, the default copyright rules apply; public visibility does not itself grant permission to reuse, modify, or redistribute the code.
