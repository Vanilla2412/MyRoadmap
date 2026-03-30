---
description: Code Review
---

# Code Review

Comprehensive security and quality review of uncommitted changes. This workflow utilizes the `code-reviewer` and `typescript-reviewer` skills.

1. Get changed files: `git diff --name-only HEAD`

2. For each changed file, check for:

**Security Issues (CRITICAL):**
- Hardcoded credentials, API keys, AWS tokens
- SQL/NoSQL injection
- XSS vulnerabilities
- Missing input validation
- Insecure dependencies
- Path traversal risks
- AWS Amplify specific (Cognito token leaks, DataStore permissive rules)

**Code Quality (HIGH):**
- Functions > 50 lines
- Files > 800 lines
- Nesting depth > 4 levels
- Missing error handling
- console.log statements
- TODO/FIXME comments
- Server/Client boundary violations (React Server Components vs Client Components)

**TypeScript Check (HIGH):**
- `any` without justification
- non-null assertion abuse (`!`)
- `as` casts that bypass checks
- `cd web && npx tsc --noEmit` fails

**Best Practices (MEDIUM):**
- Mutation patterns (use immutable instead)
- Missing tests for new code (check `cd web && npm test`)
- Dependency arrays missing in `useEffect`

3. Generate report with:
   - Severity: CRITICAL, HIGH, MEDIUM, LOW
   - File location and line numbers
   - Issue description
   - Suggested fix

4. Block PR creation or git actions if CRITICAL or HIGH issues are found.

Never approve code with security vulnerabilities!
