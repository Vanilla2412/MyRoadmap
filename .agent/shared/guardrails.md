# Shared Guardrails & Safety Policies

This document establishes universal safety mechanisms, constraints, and failure recovery protocols enforced across all autonomous agent operations.

---

## 1. Branch Protection & Isolation

* **Rule**: Operations MUST NOT modify files or commit directly on the `main` branch.
* **Validation Procedure**:
  - Before any edit, verify active branch using `git branch --show-current`.
  - If current branch is `main` (or protected base branch), immediately create/switch to a feature branch (`feat/*`, `fix/*`, `chore/*`).
* **Violation Action**: Immediately halt execution and alert user if branch validation fails.

---

## 2. Path Sanitization & Privacy Control

* **Rule**: Local absolute file paths (e.g., `C:\Users\...`, `/home/...`) MUST NEVER be output in commit messages, Pull Requests, issues, or persistent log files.
* **Sanitization Standard**:
  - Use project-root relative paths (`./web/...`, `./.agent/...`).
  - Mask local machine identifiers with placeholders (e.g., `<project_root>`, `[USER_HOME]`).

---

## 3. Secret Protection & Credential Masking

* **Rule**: Secrets, passwords, API tokens, AWS keys, or `.env` parameters MUST NEVER be committed to repository files or exposed in output text.
* **Scan Rules**:
  - Check staged files for regex patterns matching API keys (`sk-*`, `AKIA*`, tokens).
  - Verify `.env.local` or environment files containing real keys are included in `.gitignore`.

---

## 4. Execution Retry Policy & Circuit Breakers

* **Rule**: Strict limits on retries to prevent infinite execution loops and token exhaustion.
* **Dual Circuit Breaker Logic**:
  - **Task-Level Limit (`TaskRetryCount`)**: Maximum of **3 consecutive retries** for the same error on a single micro-task.
  - **Cumulative Loop Limit (`TotalRetryBudget`)**: Maximum of **5 cumulative retries** across the entire loop execution session.
* **Retry Counter Procedure**:
  - Attempt 1: Analyze un-truncated error log → apply targeted fix.
  - Attempt 2: Re-read context & dependencies → apply alternative minimal fix.
  - Attempt 3: Run comprehensive check → apply final fix.
  - **Trigger (TaskRetryCount > 3 OR TotalRetryCount > TotalRetryBudget)**: Trigger **Circuit Breaker** → HALT execution immediately and request human intervention.

---

## 5. Approval Checkpoints (Human-in-the-Loop)

* **Rule**: Explicit user authorization is MANDATORY prior to executing any high-risk operations:
  - Deleting directories or core repository files.
  - Resetting databases or running destructive migrations.
  - Force-pushing to remote branches.
  - Merging Pull Requests into `main`.

---

## 6. Checkpointing & Rollback Policy

* **Rule**: Create a git commit or stash checkpoint before starting complex modifications.
* **Rollback Protocol**:
  1. Detect unrecoverable failure or circuit breaker trip.
  2. Execute `git reset --hard <last-checkpoint-sha>` or `git checkout -- .`.
  3. Clean untracked garbage files (`git clean -fd`).
  4. Output explicit rollback status report to user.

---

## 7. Token & Cost Optimization Limits

* **Rule**: Prevent runaway token consumption and API cost inflation during autonomous agent execution.
* **Cost Safety Limits**:
  - **Max Scope Per Micro-Task**: Maximum **3 files modified** and **< 200 lines changed** per task. If a task requires wider changes, it MUST be re-decomposed by Planning Engineering.
  - **Max Tasks Per Run (`MaxTasksPerRun`)**: Maximum **5 micro-tasks** executed in a single continuous loop invocation.
  - **Targeted Context Refresh**: Context Engineering MUST refresh memory only for files actually modified during the checkpoint, avoiding full repository re-scans.
