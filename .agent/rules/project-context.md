---
trigger: always_on
---

# Project Overview

- **Project Name**: My Roadmap
- **Objective 1 (Self-Improvement)**: Master state-of-the-art to modern web technologies through AI-driven development.
- **Objective 2 (Market Value)**: Create a professional portfolio that demonstrates high-level engineering skills to global tech companies.

# Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: AWS Amplify Gen 2 (Infrastructure as Code via TypeScript)
- **Auth**: AWS Cognito
- **DB**: Amazon DynamoDB
- **CI/CD**: GitHub Actions

# Security & Privacy Constraints (STRICTLY ENFORCED)

The AI Agent MUST strictly adhere to the following security and privacy requirements at all times:

1. **Path Sanitization**:
   - NEVER output absolute paths of the local machine (e.g., `C:\Users\...`, `/mnt/c/...`, `/workspaces/anti00/...`, `/home/...`) in Issues, PRs, commit messages, or documentation (`docs/`).
   - Always use **relative paths** starting from the project root (e.g., `./src/app/page.tsx`).
2. **Log Masking**:
   - Before outputting error logs or terminal execution results to Issues, scan for and remove any usernames or machine-specific environment variables.
   - Mask them using placeholders like `<project_root>` or `[USER_HOME]`.
3. **Credential Protection**:
   - NEVER hardcode or output AWS credentials, API keys, passwords, or any sensitive information that belongs in `.env` into code, Issues, or PRs.

# Collaboration & Language Policy (Hybrid)

1. **Communication**: Dialogue with the AI agent, complex logic discussions, and requirements deep-dives will be conducted in **Japanese**.
2. **Core Documentation**: Requirements and Architecture in `docs/` should be written in **both Japanese and English** (or primarily Japanese for accuracy).
3. **Source Code**:
   - Variables & Function Names: **English**
   - Inline Comments: **English** (following global development standards).
4. **Git Workflow**:
   - Commit Messages: **English (Conventional Commits)**
   - PR Descriptions: **English**

# Task Execution & Approval Protocol (STRICTLY ENFORCED)

To prevent unintended modifications, the AI Agent MUST NOT execute any implementation or additional work without explicit user approval.

Before starting any task, the AI MUST:

1. Reference the latest requirements in the `docs/` folder.
2. Formulate a detailed, step-by-step plan.
3. Output the plan and **HALT execution** until the user explicitly approves it.

**[Required Output Template for Plan Proposal]**
The AI MUST use the following format to present the plan and ask for permission:

### 📋 Proposed Plan for [Task Name]

**Objective**: [Brief description of what will be achieved]

**Implementation Steps**:

1. [Step 1 description - e.g., Create file X]
2. [Step 2 description - e.g., Install package Y]
3. [Step 3 description - e.g., Update configuration Z]

**Files to be modified/created**:

- `path/to/file1.ts`
- `path/to/file2.tsx`

> ⚠️ **@User: Please review the detailed plan above. Do I have your approval to proceed with this implementation? (Yes / No / Please Modify)**
