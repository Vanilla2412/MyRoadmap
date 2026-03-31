---
trigger: always_on
---

# Git Workflow

## Commit Message Format

```text
<type>(<scope>): <description>

<optional body>
```

Types: feat, fix, refactor, docs, test, chore, perf, ci
Example: `feat(task): add priority filter component`

## Pull Request Workflow

When creating PRs:
1. Analyze full commit history (not just latest commit)
2. Draft comprehensive PR summary
3. Include test plan with TODOs
4. Execute PR creation via `/create-pr` workflow

> [!CAUTION]
> NEVER push directly to `main`. Always create a feature branch and PR.

## Pre-PR Checklist

Before pushing a branch or creating a PR:
- [ ] Code follows project style
- [ ] Tests pass (`cd web && npx vitest run`)
- [ ] Coverage meets 80%+ threshold (`cd web && npx vitest run --coverage`)
- [ ] Types are correct (`cd web && npx tsc --noEmit`)
- [ ] Self-reviewed using `/code-review` workflow
