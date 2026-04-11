# Security Policy

## Supported Versions

The following versions of this project are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

## Reporting a Vulnerability

We take the security of the Sonicverse repository seriously. If you discover a security vulnerability, please follow the steps below to report it responsibly.

**Please do not report security vulnerabilities through public GitHub issues.**

### How to Report

You can report vulnerabilities through either of the following channels:

1. **GitHub Private Vulnerability Reporting** — Use the [GitHub Security Advisories](../../security/advisories/new) feature to submit a private report directly in this repository.
2. **Email** — Send a detailed report to our security team at **[security@sonicverse.eu](mailto:security@sonicverse.eu)**

Please include as much of the following information as possible to help us understand and resolve the issue quickly:

- A clear description of the vulnerability and its potential impact.
- The type of issue (e.g., cross-site scripting, injection, authentication bypass, etc.).
- Step-by-step instructions to reproduce the issue.
- Any relevant proof-of-concept code, screenshots, or logs.
- The affected version(s) or commit hash(es).
- Any suggested mitigation or fix, if you have one.

### What to Expect

- **Acknowledgement:** We will acknowledge receipt of your report within **48 hours**.
- **Assessment:** We will investigate and assess the severity of the issue, typically within **5 business days**.
- **Resolution:** We aim to release a fix for confirmed vulnerabilities as quickly as possible, depending on severity.
- **Disclosure:** We will coordinate responsible disclosure with you before any public announcement.

We appreciate your effort in helping keep Sonicverse and its users safe. Responsible disclosure of security vulnerabilities is greatly appreciated and we will credit researchers who report valid issues (unless they prefer to remain anonymous).

## Security Best Practices for Contributors

When contributing to this repository, please keep the following in mind:

- Never commit secrets, API keys, tokens, or credentials. Use environment variables as defined in `.env.example`.
- Keep dependencies up to date and avoid introducing packages with known vulnerabilities.
- Follow the principle of least privilege when writing code that handles user data or external services.
- Sanitize and validate all user inputs.
