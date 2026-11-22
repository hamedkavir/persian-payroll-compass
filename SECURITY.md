# Security Policy

## Scope

This repository is an evolving payroll and HR frontend. Treat any deployed payroll system and any connected database as sensitive systems containing personal and financial information.

## Supported versions

Security fixes are considered for the latest code on the default branch. Older snapshots may not receive fixes.

## Reporting a vulnerability

Please do not publish exploitable details, credentials, personal data, employee records, or proof-of-concept data in a public issue.

If GitHub private vulnerability reporting is enabled for this repository, use the **Report a vulnerability** option in the repository's Security tab. Otherwise, contact the repository maintainer privately through GitHub before disclosing details publicly.

## Data-handling rules

- Use synthetic data in issues, tests, screenshots, and pull requests.
- Never commit production `.env` files, API keys, passwords, tokens, private keys, database dumps, backups, payslips, bank details, identity documents, or employee photos.
- Rotate any credential that may have been exposed; deleting it from the latest commit does not remove it from Git history.
- Do not use demo dashboard values as evidence of real users, deployments, or payroll processing.
