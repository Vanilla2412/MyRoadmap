---
trigger: always_on
---

# Testing Requirements

## Minimum Test Coverage: 80%

Test Types (ALL required):
1. **Unit Tests** - Individual functions, utilities, components
2. **Integration Tests** - API endpoints, database operations
3. **E2E Tests** - Critical user flows

> [!IMPORTANT]
> Authentication logic and security-critical code must aim for 100% coverage.

## Test-Driven Development (TDD)

MANDATORY workflow:
1. Write test first (RED)
2. Run test - it should FAIL
3. Write minimal implementation (GREEN)
4. Run test - it should PASS
5. Refactor (IMPROVE)
6. Verify coverage (80%+)

## Relevant Commands

- Run Tests: `cd web && npx vitest run`
- Watch Tests: `cd web && npx vitest`
- Coverage: `cd web && npx vitest run --coverage`

## Troubleshooting Test Failures

1. Use **tdd-guide** workflow/skill
2. Check test isolation
3. Verify mocks are correct
4. Fix implementation, not tests (unless tests are wrong)
