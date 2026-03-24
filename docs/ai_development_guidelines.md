# AI-Native Development Guidelines

This document outlines the rules of engagement and best practices for developing the **My Roadmap** project using AI coding assistants. The goal is to maximize productivity while strictly preventing the accumulation of technical debt, architectural drift, and "black box" code.

---

## 1. Core Principles: Preventing "AI Sprawl"

AI assistants are powerful but prone to over-engineering or hallucinating complex solutions when given overly broad prompts. We mitigate this through **strict control and verification**.

### 1.1 Small Chunking (Granular Issues)
- **Rule**: Never ask the AI to build an entire feature (e.g., "Build the dashboard") in a single prompt.
- **Action**: Break down features into explicit, atomic GitHub Issues (S size, 1-2 hours).
- **Execution**: Instruct the AI to focus *only* on the current Issue. One Pull Request (PR) must equal one specific objective.

### 1.2 Test-Driven AI (TDAI)
- **Rule**: Define the expected behavior before writing the implementation.
- **Action**: For complex logic, ask the AI to write the unit tests (Vitest) or validation schemas (Zod) *first*.
- **Execution**: Review and approve the tests. Only then, instruct the AI to write the minimum code required to pass those tests.

### 1.3 Critical Review & The "Explain It" Rule
- **Rule**: Never blindly accept code you do not fully understand.
- **Action**: If the AI proposes a complex architecture, an unfamiliar library, or a dense block of code, halt the implementation.
- **Execution**: Demand an explanation: "Explain this code line-by-line", or request a refactor: "Rewrite this using a simpler, more maintainable approach (KISS principle)."

---

## 2. Infrastructure as the Quality Gate (CI/CD)

We rely on automated systems to catch AI errors that human review might miss.

### 2.1 Strict Linting and Typing
- The AI must adhere strictly to ESLint configurations and TypeScript's `strict: true` mode.
- Use of `any` or `@ts-ignore` is strictly prohibited unless explicitly authorized with a documented reason.

### 2.2 CI/CD Enforcement
- All AI-generated PRs must pass the GitHub Actions CI pipeline (Typecheck, Lint, Tests).
- If the CI fails, feed the error logs back to the AI for step-by-step debugging. The AI must fix the root cause, not apply a temporary patch.

---

## 3. Context Management and Prompt Engineering

The quality of AI output is directly proportional to the context provided.

### 3.1 The "Context Rule"
- **Rule**: The AI must always refer to `docs/requirements.md`, `project-context.md`, and this `ai_development_guidelines.md` before starting a new task.
- **Action**: Ensure the AI is explicitly aware of the Tech Stack (Next.js App Router, Tailwind, Amplify Gen 2, etc.) and avoids deviating into older paradigms (e.g., React Class Components or Pages Router).

### 3.2 Implementation Plans
- **Rule**: Code must not be written without a plan.
- **Action**: The AI must output a detailed, step-by-step `implementation_plan.md` for the current task and **wait for explicit user approval** before executing any file modifications.

---

## 4. Continuous Refactoring

AI code can become disjointed over multiple sessions.
- **Rule**: Refactor early and often.
- **Action**: After completing a major feature, dedicate a session solely to cleaning up the code, extracting reusable components (shadcn/ui), and consolidating duplicated logic. Do not add new features during a refactoring session.

---

## Appendix: Communication Protocol (Hybrid)

- Deep dives, logic discussions, and complex planning: **Japanese**
- Source code variables, function names, inline comments, commit messages (Conventional Commits), PR descriptions: **English**
