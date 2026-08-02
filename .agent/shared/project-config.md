# Project Configuration & Template Variable Mappings

This file maps generic template variables used in autonomous workflows to concrete project commands and parameters.

---

## 1. Execution Commands

| Variable Name | Mapping / Value | Description |
|:---|:---|:---|
| `{{TEST_COMMAND}}` | `cd web && npx vitest run` | Command to run unit/integration test suite |
| `{{TEST_WATCH_COMMAND}}` | `cd web && npx vitest` | Command to run test watcher |
| `{{TEST_COVERAGE_COMMAND}}` | `cd web && npx vitest run --coverage` | Command to calculate test coverage |
| `{{TYPE_CHECK_COMMAND}}` | `cd web && npx tsc --noEmit` | Canonical TypeScript type-check command |
| `{{LINT_COMMAND}}` | `cd web && npx eslint src/` | Command for code linting |
| `{{FORMAT_COMMAND}}` | `npx prettier --write src/` | Code formatting command |
| `{{BUILD_COMMAND}}` | `cd web && npm run build` | Production build command |
| `{{SECURITY_SCAN_COMMAND}}` | `npm audit` | Security vulnerability scan command |

---

## 2. Thresholds & Limits

| Variable Name | Value | Description |
|:---|:---|:---|
| `{{COVERAGE_THRESHOLD}}` | `80` | Minimum required overall test coverage percentage |
| `{{CRITICAL_COVERAGE_THRESHOLD}}` | `100` | Minimum test coverage for auth & security logic |
| `{{MAX_RETRY_COUNT}}` | `3` | Maximum consecutive self-correction retries per step |
| `{{MAX_FILE_LINES}}` | `800` | Maximum recommended line count per file |
| `{{MAX_FUNCTION_LINES}}` | `50` | Maximum recommended line count per function |
| `{{MAX_NESTING_DEPTH}}` | `4` | Maximum recommended nesting level |

---

## 3. Branching & Git Conventions

| Variable Name | Value | Description |
|:---|:---|:---|
| `{{BASE_BRANCH}}` | `main` | Production base branch |
| `{{BRANCH_PREFIXES}}` | `feat/`, `fix/`, `refactor/`, `docs/`, `chore/` | Allowed feature branch prefixes |
| `{{COMMIT_FORMAT}}` | `Conventional Commits (<type>(<scope>): <description>)` | Required commit style |

---

## 4. Tech Stack Context

| Parameter | Value |
|:---|:---|
| Frontend Framework | Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| Backend & Infrastructure | AWS Amplify Gen 2 (TypeScript IaC) |
| Auth & DB | AWS Cognito, Amazon DynamoDB |
| Test Framework | Vitest, Testing Library |
