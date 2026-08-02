# Shared Glossary for Autonomous Engineering Workflows

This document establishes standard terminology used across all autonomous AI agent workflows.

---

## Terms and Definitions

### Acceptance Criteria
Formal, verifiable requirements that a task or feature must satisfy before being considered complete.

### Agent-First
A design methodology where tools, instructions, documentation, and workflows are structured primarily for autonomous AI execution rather than manual human operation.

### Approval Hook
A hard stop in execution where an autonomous agent MUST request human consent before proceeding (e.g., executing destructive actions, pushing to production).

### Checkpoint
A state snapshot (git commit or local stash) created by the agent after passing a verification step, enabling safe rollback if subsequent steps fail.

### Context Engineering
The workflow responsible for discovering, filtering, assembling, refreshing, and managing token budgets for repository information supplied to the agent.

### Guardrail
A strict rule, constraint, or automated safety check enforced on agent actions to prevent runaway behavior, security leaks, or repository corruption.

### Harness Engineering
The workflow responsible for configuring and running tools (tests, compilers, linters, static analyzers, security scanners) in an isolated execution environment.

### Loop Engineering
The workflow responsible for orchestrating iterative, autonomous development steps (planning → TDD → execution → verification → self-correction).

### Micro-Task
A small, self-contained unit of work with a target completion estimate of **XS** (< 1 hour) or **S** (1-2 hours) designed to minimize cognitive overhead and error blast radius.

### Planning Engineering
The workflow responsible for analyzing goals, building dependency graphs, decomposing complex requirements into micro-tasks, and mapping risks.

### PR Engineering
The workflow responsible for compiling change summaries, conventional commits, reviewer checklists, test evidence, and initiating Pull Requests.

### Prompt Engineering
The workflow responsible for instruction design, role definition, output contract validation, and reusable prompt templates.

### Quality Gate
A threshold of metrics (e.g., test pass rate, code coverage percentage, zero critical security findings) that must be cleared to transition between workflow phases.

### Retry Policy
A predefined mechanism governing how many times an agent can attempt self-correction on a failing step (default: maximum 3 consecutive retries) before halting.

### Rollback Strategy
A procedure for reverting the repository to a previous known-good Checkpoint when a non-recoverable error or safety violation occurs.

### Single Responsibility Principle (SRP)
The constraint that every workflow module owns exactly one distinct domain of responsibility without functional overlap.

### Token Budget
The maximum allowed context size per model invocation, managed to prevent truncation, degradation of reasoning, or out-of-memory errors.

### Verification Engineering
The workflow responsible for deep quality checks, architecture review, security audits, performance profiling, and acceptance verification.
