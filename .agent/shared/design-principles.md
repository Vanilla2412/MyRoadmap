# Shared Design Principles

This document defines core principles governing the architecture and execution of autonomous engineering workflows.

---

## 1. Single Responsibility Principle (SRP)

* **Rule**: Every workflow module owns exactly one distinct domain of engineering responsibility.
* **Rationale**: Prevents bloated, monolithic prompts and eliminates conflicting instructions across execution steps.
* **Enforcement**: If a workflow attempts to perform actions belonging to another domain (e.g., Planning Engineering attempting to run tests directly), it MUST delegate to the appropriate upstream/downstream workflow.

---

## 2. Composability & Standardized Interfaces

* **Rule**: Workflows interact exclusively via structured, machine-readable inputs and outputs.
* **Rationale**: Enables building complex execution pipelines by chaining independent workflows together like UNIX pipes.
* **Enforcement**: Every workflow specification MUST define explicit JSON/Markdown schema formats for its `Inputs` and `Outputs`.

---

## 3. Stateless Execution

* **Rule**: Workflows must not rely on implicit session memory or unstated environmental assumptions.
* **Rationale**: Autonomous agents may experience context resets, long-running breaks, or execution across multiple subagents.
* **Enforcement**: All state required for execution MUST be supplied directly via Context Engineering or passed explicitly as structured inputs.

---

## 4. Safety First & Defense in Depth

* **Rule**: Safety mechanisms take priority over autonomous execution speed or convenience.
* **Rationale**: Prevents accidental data loss, branch corruption, secret exposure, or infinite execution loops.
* **Enforcement**:
  - Never execute directly on the `main` branch.
  - Enforce hard retry limits (max 3 attempts per failure).
  - Require explicit user approval for destructive actions.
  - Revert to known-good checkpoints upon unrecoverable failure.

---

## 5. Agent-Friendly & Machine-Readable First

* **Rule**: Workflows, logs, and output schemas must be optimized for parsing by LLMs and automated CLI tools.
* **Rationale**: Human-oriented unstructured text leads to parsing ambiguity and unreliable downstream processing.
* **Enforcement**: Use clear Markdown headings, JSON output contracts, strict regexable conventions, and explicit status codes.

---

## 6. Vendor Neutrality & Portability

* **Rule**: Workflows must remain decoupled from specific IDEs, AI vendors, or underlying command structures.
* **Rationale**: Workflows should run identically on Claude Code, Gemini CLI, Codex, OpenHands, or custom agent drivers.
* **Enforcement**: Use abstract template variables (`{{TEST_COMMAND}}`, `{{TYPE_CHECK_COMMAND}}`) backed by project-level configuration mappings (`project-config.md`).
