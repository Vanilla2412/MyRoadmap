---
description: Create a Pull Request using GitHub CLI for safe code review workflow
---

# Create Pull Request Workflow

// turbo-all

## Prerequisites

- GitHub CLI (`gh`) is installed and authenticated
- Working tree is clean (`git status` shows no uncommitted changes for unrelated work)
- You are on the base branch (e.g., `main`) before creating a new feature branch

## Steps

1. Ensure you are on the latest `main` branch:

```powershell
git switch main
git pull origin main
```

2. Create a new feature branch with a descriptive name. Use one of these prefixes:
   - `feat/<description>` — New feature
   - `fix/<description>` — Bug fix
   - `docs/<description>` — Documentation changes
   - `refactor/<description>` — Refactoring
   - `chore/<description>` — Maintenance tasks

```powershell
git switch -c <type>/<short-description>
```

3. Make your code changes (implement the feature, fix, etc.)

4. Stage and commit changes using **Conventional Commits** format (English):

```powershell
git add <files>
git commit -m "<type>(<scope>): <description>"
```

Examples:

- `feat(task): add priority filter component`
- `fix(auth): resolve token refresh race condition`
- `docs(readme): update setup instructions`

5. Push the branch to the remote:

```powershell
git push -u origin <branch-name>
```

6. Create a Pull Request using GitHub CLI:

```powershell
gh pr create --base main --title "<type>(<scope>): <description>" --body-file .github/pull_request_template.md
```

If `--body-file` is not suitable (e.g., you want to customize the body), use `--body` instead:

```powershell
gh pr create --base main --title "<type>(<scope>): <description>" --body "## Summary`nDescribe changes here`n`n## Type of Change`n- [x] Feature`n`n## Checklist`n- [x] Code follows project style`n- [x] Self-reviewed"
```

7. Notify the user of the PR URL using `notify_user` so they can review it.

## Safety Rules

> [!CAUTION]
> **NEVER** push directly to `main`. Always create a feature branch and PR.

> [!CAUTION]
> **NEVER** merge a PR without user approval. The agent creates the PR; the user merges it.

> [!IMPORTANT]
> Always run `git status` before committing to verify which files will be included.

> [!IMPORTANT]
> Keep PRs small and focused. One PR per feature/fix/task.
