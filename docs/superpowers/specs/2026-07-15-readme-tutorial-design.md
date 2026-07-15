# README Tutorial Redesign

## Goal

Replace the root and localized README files with practical, end-user tutorials.
The supported languages are Simplified Chinese, English, Russian, and Korean.

## Scope

- Replace `README.md`.
- Replace `docs/en/README.md`.
- Replace `docs/ru/README.md`.
- Replace `docs/ko/README.md`.
- Preserve the existing language-navigation links, adapted to the new layout.
- Do not change application code, release assets, sponsors, or other documentation.

## Information Architecture

All four files use the same structure, translated for their audience:

1. What CodexManager is and when to use it.
2. Installation on Windows, including portable executable use.
3. First-run workflow: start the service, authorize an account, and verify status.
4. Create a platform API key and connect an OpenAI-compatible client.
5. Manage models, including GPT-5.6, GPT-5.6 Sol, Terra, Luna, and reasoning levels.
6. Configure Aggregate API upstreams and upstream proxy options.
7. Troubleshooting and safety notes.
8. Build commands for developers.

## Content Rules

- Write direct, step-by-step instructions for users rather than project promotion.
- Keep endpoint examples local and use placeholders for secrets.
- State that credentials and API keys must not be shared.
- Do not make claims about model availability; explain that account access controls the visible catalog.
- Keep build instructions limited to the supported Windows/PowerShell workflow.

## Verification

- Check all four files have the agreed sections and valid relative language links.
- Confirm every command and file path matches the repository.
- Run `git diff --check`.
