---
description: Code Review workflow for human and automated review using code-reviewer, typescript-reviewer skills, and Verification Engineering standards.
---

# Code Review (`/code-review`)

Comprehensive security and quality review of uncommitted changes. This workflow utilizes the `code-reviewer` and `typescript-reviewer` skills and aligns with [Verification Engineering](./verification-engineering.md).

---

## 🛡️ Guardrails & Strict Rules

> [!CAUTION]
> **Branch Protection**: NEVER execute code reviews directly on `main` to commit fixes. Always ensure changes are on a feature branch (`feat/*`, `fix/*`).

> [!CAUTION]
> **Zero Tolerance**: NEVER approve code containing CRITICAL or HIGH security findings (hardcoded secrets, unhandled injection, absolute machine path leaks).

> [!IMPORTANT]
> **Confidence Threshold**: Only report issues where confidence of a defect is > 80% to avoid review noise.

---

## Review Process

1. **Get Changed Files**: `git diff --name-only HEAD`
2. **Execute Diagnostic Commands** (via [project-config.md](../shared/project-config.md)):
   - Type check: `{{TYPE_CHECK_COMMAND}}` (`cd web && npx tsc --noEmit`)
   - Test suite: `{{TEST_COMMAND}}` (`cd web && npx vitest run`)
3. **Inspect Checklist Categories**:

**Security Issues (CRITICAL):**
- Hardcoded credentials, API keys, AWS tokens
- SQL/NoSQL injection & XSS vulnerabilities
- Missing input validation (Zod schema boundary validation)
- Insecure dependencies or absolute local path leaks
- AWS Amplify specific (Cognito token leaks, DataStore permissive rules)

**Code Quality (HIGH):**
- Functions > 50 lines / Files > 800 lines
- Nesting depth > 4 levels
- Missing error handling / Swallowed exceptions
- `console.log` statements or dead code
- Server/Client boundary violations in Next.js React Server Components

**TypeScript Check (HIGH):**
- `any` without explicit justification
- Non-null assertion abuse (`!`)
- `as` casts that bypass type checks
- `{{TYPE_CHECK_COMMAND}}` failures

**Best Practices (MEDIUM):**
- Mutation patterns (MUST use immutable objects)
- Missing unit tests for new logic (coverage must meet `{{COVERAGE_THRESHOLD}}`%)
- Dependency arrays missing in `useEffect` / `useCallback`

4. **Generate Structured Report**:
   - Severity: `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`
   - File location (relative paths only) and line numbers
   - Detailed issue description & suggested fix snippet
5. **Issue Verdict**:
   - `APPROVE` / `WARNING` / `BLOCK`
   - Block PR creation or git merge actions if CRITICAL or HIGH issues exist.
