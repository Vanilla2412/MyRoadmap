---
description: Enforce test-driven development workflow. Scaffold interfaces, generate tests FIRST, then implement minimal code to pass. Ensure 80%+ coverage.
---

This workflow invokes the **tdd-guide** skill to enforce test-driven development methodology on My Roadmap.

## What This Workflow Does
1. **Scaffold Interfaces** - Define types/interfaces first
2. **Generate Tests First** - Write failing tests (RED)
3. **Implement Minimal Code** - Write just enough to pass (GREEN)
4. **Refactor** - Improve code while keeping tests green (REFACTOR)
5. **Verify Coverage** - Ensure 80%+ test coverage

## When to Use
Use `/tdd` when:
- Implementing new features
- Adding new functions/components
- Fixing bugs (write test that reproduces bug first)
- Refactoring existing code
- Building critical business logic

## How It Works
The tdd-guide skill will:

1. **Define interfaces** for inputs/outputs
2. **Write tests that will FAIL** (because code doesn't exist yet)
3. **Run tests** and verify they fail for the right reason (`cd web && npx vitest run`)
4. **Write minimal implementation** to make tests pass
5. **Run tests** and verify they pass (`cd web && npx vitest run`)
6. **Refactor** code while keeping tests green
7. **Check coverage** (`cd web && npx vitest run --coverage`) and add more tests if below 80%

## TDD Cycle
```
RED → GREEN → REFACTOR → REPEAT

RED:      Write a failing test
GREEN:    Write minimal code to pass
REFACTOR: Improve code, keep tests passing
REPEAT:   Next feature/scenario
```

## TDD Best Practices
**DO:**
- PASS: Write the test FIRST, before any implementation
- PASS: Run tests and verify they FAIL before implementing
- PASS: Write minimal code to make tests pass
- PASS: Refactor only after tests are green
- PASS: Add edge cases and error scenarios
- PASS: Aim for 80%+ coverage (100% for authentication logic)

**DON'T:**
- FAIL: Write implementation before tests
- FAIL: Skip running tests after each change
- FAIL: Write too much code at once
- FAIL: Ignore failing tests
- FAIL: Test implementation details (test behavior)

## Coverage Requirements
- **80% minimum** for all code
- **100% required** for:
  - Financial calculations
  - Authentication logic
  - Security-critical code
  - Core business logic

## Important Notes
**MANDATORY**: Tests must be written BEFORE implementation. The TDD cycle is:

1. **RED** - Write failing test
2. **GREEN** - Implement to pass
3. **REFACTOR** - Improve code

Never skip the RED phase. Never write code before tests.
