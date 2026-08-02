---
trigger: always_on
---

# Git Workflow

## Commit Message Format

```text
<type>(<scope>): <description>

<optional body>
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`
Example: `feat(task): add priority filter component`

## Pull Request Workflow

When creating PRs:
1. Analyze full commit history (not just latest commit)
2. Draft comprehensive PR summary
3. Include test plan with TODOs
4. Execute PR creation via [PR Engineering](../workflows/pr-engineering.md) or `/create-pr` workflow

> [!CAUTION]
> **NEVER** modify files directly on the `main` branch. Always create a feature branch (`git checkout -b feat/...`) before making any edits.

> [!CAUTION]
> **NEVER** push directly to `main`. Always create a feature branch and PR.

## Pre-PR Checklist

Before pushing a branch or creating a PR:
- [ ] Code follows project style
- [ ] Tests pass (`cd web && npx vitest run`)
- [ ] Coverage meets 80%+ threshold (`cd web && npx vitest run --coverage`)
- [ ] Types are correct (`cd web && npx tsc --noEmit`)
- [ ] Self-reviewed using `/code-review` or `/verification-engineering` workflow

## Autonomous Loop Engineering Guidelines

When running autonomous workflows ([Loop Engineering](../workflows/loop-engineering.md)):
1. **Branch Protection**: The AI agent MUST verify active branch (`git branch --show-current`) is NOT `main` before ANY file modification.
2. **Micro-Task Iterations**: Break tasks into XS (< 1h) or S (1-2h) sizing. Run test verification after each micro-step.
3. **Self-Correction Circuit Breaker**: Maximum 3 consecutive retries for the same failure. On 4th failure, STOP execution and request human feedback.
4. **Checkpointing**: Create a clean git commit after every successfully verified micro-task.
