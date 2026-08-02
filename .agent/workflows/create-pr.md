---
description: Create a Pull Request using GitHub CLI for safe code review workflow
---

# Create Pull Request Workflow (`/create-pr`)

Create and submit a GitHub Pull Request using GitHub CLI (`gh`). This workflow integrates with [PR Engineering](./pr-engineering.md) for automated evidence collection and summary formatting.

---

## 🛡️ Guardrails & Safety Rules (STRICTLY ENFORCED)

> [!CAUTION]
> **NEVER push directly to `main`**. Always create a feature branch (`feat/*`, `fix/*`) and open a Pull Request.

> [!CAUTION]
> **NEVER auto-merge a Pull Request**. The agent creates the PR; the human user MUST review and merge it.

> [!IMPORTANT]
> **Pre-PR Verification Gate**: All tests (`{{TEST_COMMAND}}`) and type checks (`{{TYPE_CHECK_COMMAND}}`) MUST pass cleanly before opening a PR.

> [!IMPORTANT]
> **Path Sanitization**: PR descriptions and titles MUST NOT contain local absolute paths (`C:\Users\...`).

---

## Prerequisites

- GitHub CLI (`gh`) is installed and authenticated (`gh auth status`).
- Active working directory is on a feature branch (not `main`).
- Unit tests (`cd web && npx vitest run`) and type checks (`cd web && npx tsc --noEmit`) pass cleanly.

---

## Steps

1. **Verify Branch Isolation**:
   ```powershell
   git branch --show-current
   ```
   *Ensure active branch is NOT `main`.*

2. **Run Verification Gate**:
   ```powershell
   cd web; npx tsc --noEmit; npx vitest run
   ```

3. **Stage and Commit Changes (Conventional Commits)**:
   ```powershell
   git add <files>
   git commit -m "<type>(<scope>): <description>"
   ```
   *Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`*

4. **Push Feature Branch to Remote**:
   ```powershell
   git push -u origin <branch-name>
   ```

5. **Create Pull Request via GitHub CLI**:
   ```powershell
   gh pr create --base main --title "<type>(<scope>): <description>" --body "## Summary`n<description>`n`n## Test Evidence`n- Unit Tests: Passed`n- Type Check: Passed`n`n## Checklist`n- [x] Code follows project style`n- [x] Self-reviewed`n- [x] Relative paths verified"
   ```

6. **Notify User**: Present the returned PR URL to the user for review.
