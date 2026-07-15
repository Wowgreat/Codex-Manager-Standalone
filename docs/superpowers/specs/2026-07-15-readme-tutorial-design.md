# README Tutorial Redesign

## Goal

Replace the root and localized README files with practical, end-user tutorials.
The supported languages are Simplified Chinese, English, Russian, and Korean.

## Scope

- Replace `README.md`.
- Replace `docs/en/README.md`.
- Replace `docs/ru/README.md`.
- Replace `docs/ko/README.md`.
- Use this language-link matrix in all files: Chinese `README.md`, English
  `docs/en/README.md`, Russian `docs/ru/README.md`, and Korean
  `docs/ko/README.md`. The localized files link back to `../../README.md` for
  Chinese and to each other with their matching relative path.
- Omit the existing sponsor sections entirely; they are intentionally outside
  the new user-tutorial format.
- Do not change application code, release assets, or other documentation.

## Information Architecture

All four files use the same structure, translated for their audience:

1. What CodexManager is and when to use it.
2. Installation on Windows: the installer asset
   `CodexManager_<version>_x64-setup.exe` and the portable asset
   `CodexManager-portable.exe`.
3. First-run workflow: start the service, authorize an account, and verify status.
4. Create a platform API key and connect an OpenAI-compatible client using
   `http://localhost:48760/v1` and that key as Bearer authentication. Document
   `/v1/responses` and `/v1/chat/completions` as the primary endpoints.
5. Manage models, including GPT-5.6, GPT-5.6 Sol, Terra, Luna, and reasoning levels.
6. Configure Aggregate API upstreams: create one in the Aggregate API page,
   store its upstream key in the app, test it, then choose its model mappings
   and priority. The generic upstream base URL must not include `/v1`, because
   the gateway appends the client request path. Cover upstream proxy and bypass
   domains separately.
7. Troubleshooting and safety notes.
8. Build commands for developers.

## Content Rules

- Write direct, step-by-step instructions for users rather than project promotion.
- Keep endpoint examples local and use placeholders for secrets.
- State that credentials and API keys must not be shared.
- Warn that a gateway exposed outside localhost must be protected with platform
  keys and network access controls.
- Do not make claims about model availability; explain that account access controls the visible catalog.
- Describe GPT-5.6 accurately: `gpt-5.6` is the GPT-5.6 Sol alias;
  `gpt-5.6-sol`, `gpt-5.6-terra`, and `gpt-5.6-luna` are individual catalog
  slugs. Catalog visibility and API access still depend on the user account.
- Keep build instructions limited to the supported Windows/PowerShell workflow.
  Use `pwsh -NoLogo -NoProfile -File scripts/rebuild.ps1 -Bundle nsis -CleanDist -Portable`,
  with Rust, Node.js, pnpm, and PowerShell as prerequisites.

## Verification

- Check all four files have the agreed sections and the language-link matrix.
- Confirm every command and file path matches the repository.
- Validate relative Markdown links from each README directory and verify the
  build command against `scripts/rebuild.ps1` and `apps/package.json`.
- Run `git diff --check`.
