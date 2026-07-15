# README Tutorials Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four project README files with aligned, localized end-user tutorials.

**Architecture:** Each README is a standalone localized tutorial with the same task-oriented section order. A shared language-navigation matrix keeps readers able to switch language without relying on a separate Chinese document. The content uses repository-verified artifact names, local gateway defaults, and Windows build commands.

**Tech Stack:** Markdown, PowerShell, Git, pnpm.

---

### Task 1: Establish the shared tutorial skeleton

**Files:**
- Modify: `README.md`
- Modify: `docs/en/README.md`
- Modify: `docs/ru/README.md`
- Modify: `docs/ko/README.md`

- [ ] **Step 1: Define a per-file content checklist**

Require every version to include: introduction, Windows installation, first run,
platform key and local gateway, GPT-5.6 model catalog, Aggregate API and proxy,
troubleshooting/safety, developer build, and language links. Remove every
legacy sponsor section.

Use this exact language-link matrix: root `README.md` links to
`docs/en/README.md`, `docs/ru/README.md`, and `docs/ko/README.md`; each
localized README links to `../../README.md`, `../en/README.md`,
`../ru/README.md`, and `../ko/README.md` as appropriate.

- [ ] **Step 2: Verify facts used in all translations**

Run: `rg -n "localhost:48760|CodexManager-portable.exe|CodexManager_.*_x64-setup.exe|/v1/chat/completions|/v1/responses" apps crates docs scripts`

Expected: repository sources confirm the default service address, installer
asset `CodexManager_<version>_x64-setup.exe`, portable asset
`CodexManager-portable.exe`, and primary endpoints.

- [ ] **Step 3: Replace each README with the shared structure in its own language**

Use direct, numbered instructions. Keep exact command names and URLs unchanged
across translations while translating explanatory prose. The model section must
state that `gpt-5.6` is the GPT-5.6 Sol alias; list `gpt-5.6-sol`,
`gpt-5.6-terra`, and `gpt-5.6-luna`; show the supported reasoning levels; and
explain that catalog visibility/API availability depend on the account.

The Aggregate API section must cover creation, securely storing the upstream
key, testing, model mappings, and priority. It must say generic upstream base
URLs omit `/v1`, and distinguish the upstream proxy from bypass-domain settings.

The safety section must forbid sharing credentials or keys and require platform
keys plus network controls before exposing the gateway beyond localhost.

The first-run section must instruct users to start the service, authorize an
account, and verify its status. The platform-key section must instruct users to
create a key, configure `http://localhost:48760/v1`, use Bearer authentication,
and select `/v1/responses` or `/v1/chat/completions`. All endpoint examples
must remain local and use placeholders rather than real secrets.

The developer section must list Rust, Node.js, pnpm, and PowerShell as
prerequisites and use the exact command:
`pwsh -NoLogo -NoProfile -File scripts/rebuild.ps1 -Bundle nsis -CleanDist -Portable`.

- [ ] **Step 4: Check the section and link checklist**

Run: `rg -n "Installation|安装|Установка|설치|GPT-5.6|Aggregate API|localhost:48760" README.md docs/en/README.md docs/ru/README.md docs/ko/README.md`

Expected: each concept is present in every localized file.

### Task 2: Validate documentation integrity

**Files:**
- Modify: `README.md`
- Modify: `docs/en/README.md`
- Modify: `docs/ru/README.md`
- Modify: `docs/ko/README.md`

- [ ] **Step 1: Validate language navigation targets**

Run a PowerShell link-existence check for the exact language-link matrix from
each README directory.

Expected: all relative language links resolve to existing files.

- [ ] **Step 2: Validate formatting and repository commands**

Run: `git diff --check`

Run: `pnpm -C apps run build`

Run: `Select-String -Path scripts/rebuild.ps1 -Pattern 'Bundle|Portable|CleanDist'; Get-Content apps/package.json -Raw`

Expected: no whitespace errors and the existing frontend production build exits
successfully; the documented Windows build command and frontend build command
are present in the repository scripts.

- [ ] **Step 3: Commit the tutorial rewrite**

```powershell
git add README.md docs/en/README.md docs/ru/README.md docs/ko/README.md
git commit -m "docs: replace READMEs with user tutorials"
```
