# Architecture Specification for Autonomous AI Workflows

This document presents the complete architecture of the autonomous software engineering workflow system.

---

## 1. Overall System Architecture

```mermaid
graph TD
    subgraph "Core Orchestration"
        PE["Prompt Engineering Workflow"]
        CE["Context Engineering Workflow"]
        PL["Planning Engineering Workflow"]
        LE["Loop Engineering Workflow"]
    end

    subgraph "Execution & Verification"
        HE["Harness Engineering Workflow"]
        VE["Verification Engineering Workflow"]
        PRE["PR Engineering Workflow"]
    end

    subgraph "Shared Foundation Layer"
        GL["Glossary (.agent/shared/glossary.md)"]
        DP["Design Principles (.agent/shared/design-principles.md)"]
        SG["Guardrails (.agent/shared/guardrails.md)"]
        PC["Project Config (.agent/shared/project-config.md)"]
    end

    PE --> CE
    CE --> PL
    PL --> LE
    LE <--> HE
    LE --> VE
    VE --> PRE

    PE -.-> Shared Foundation Layer
    CE -.-> Shared Foundation Layer
    PL -.-> Shared Foundation Layer
    LE -.-> Shared Foundation Layer
    HE -.-> Shared Foundation Layer
    VE -.-> Shared Foundation Layer
    PRE -.-> Shared Foundation Layer
```

---

## 2. Workflow Dependency Graph

```mermaid
graph LR
    A["Prompt Engineering"] -->|Instruction Contracts| B["Context Engineering"]
    B -->|Assembled Context & Token Budget| C["Planning Engineering"]
    C -->|Task Roadmap & Acceptance Criteria| D["Loop Engineering"]
    D <-->|Executes Test/Lint/Build| E["Harness Engineering"]
    D -->|Staged Code Changes| F["Verification Engineering"]
    F -->|Quality Gate Status & Artifacts| G["PR Engineering"]
```

---

## 3. Data Flow Diagram

```mermaid
flowchart TD
    UserReq["User Feature Request / Issue"] --> PE_Phase["Prompt Engineering Workflow"]
    PE_Phase -->|Validated Prompt Contract| CE_Phase["Context Engineering Workflow"]
    
    CE_Phase -->|Context Bundle & Token Budget| PL_Phase["Planning Engineering Workflow"]
    PL_Phase -->|Decomposed Micro-Tasks| LE_Phase["Loop Engineering Workflow"]
    
    subgraph "Iterative Execution Loop"
        LE_Phase -->|Execute Code Change| HE_Phase["Harness Engineering Workflow"]
        HE_Phase -->|Test/Build Output| LE_Phase
    end

    LE_Phase -->|Completed Code & Checkpoints| VE_Phase["Verification Engineering Workflow"]
    VE_Phase -->|Quality Gate Report| PRE_Phase["PR Engineering Workflow"]
    PRE_Phase -->|Pull Request & Evidence Report| GitHubPR["GitHub PR Created & User Notified"]
```

---

## 4. State Transition Diagram

```mermaid
stateDiagram-v2
    [*] --> PromptValidation: User Invokes Task
    PromptValidation --> ContextAssembly: Prompt Validated
    ContextAssembly --> TaskPlanning: Context Built
    TaskPlanning --> LoopExecution: Roadmap Approved
    
    state LoopExecution {
        [*] --> PickMicroTask
        PickMicroTask --> WriteTest_RED: Micro-Task Sizing OK
        WriteTest_RED --> Implement_GREEN: Test Fails As Expected
        Implement_GREEN --> HarnessCheck: Run Verification
        
        HarnessCheck --> SelfCorrection: Failure (Retry < 3)
        SelfCorrection --> Implement_GREEN: Retry Attempt
        HarnessCheck --> CheckpointCommit: All Checks Pass
        
        HarnessCheck --> Halted: Failure (Retry >= 3)
        CheckpointCommit --> PickMicroTask: Next Task Available
        CheckpointCommit --> LoopComplete: All Tasks Passed
    }

    LoopExecution --> QualityGateCheck: Loop Complete
    QualityGateCheck --> PRCreation: Quality Gate Passed (APPROVED)
    QualityGateCheck --> LoopExecution: Quality Gate Failed (Re-enter Loop)
    PRCreation --> [*]: PR Created
    Halted --> [*]: User Intervention Required
```

---

## 5. Recommended Execution Pipeline Order

| Step | Workflow Module | Primary Responsibilities |
|:---:|:---|:---|
| 1 | **Prompt Engineering** | Instruction design, role contracts, output validation, template optimization. |
| 2 | **Context Engineering** | Repository exploration, token budget tracking, context pruning, memory loading. |
| 3 | **Harness Engineering** | Environment execution, test running, linting, build checks, sandboxing. |
| 4 | **Planning Engineering** | Requirement breakdown, micro-task sizing, risk identification, roadmap generation. |
| 5 | **Loop Engineering** | Autonomous TDD execution, iteration management, self-correction, state checkpointing. |
| 6 | **Verification Engineering** | Architecture evaluation, security auditing, quality gates, performance checks. |
| 7 | **PR Engineering** | Change summarization, commit formatting, evidence collation, Pull Request generation. |

---

## 6. Directory Structure Overview

```
.agent/
├── shared/
│   ├── glossary.md
│   ├── design-principles.md
│   ├── guardrails.md
│   ├── project-config.md
│   └── architecture.md
└── workflows/
    ├── prompt-engineering.md
    ├── context-engineering.md
    ├── harness-engineering.md
    ├── planning-engineering.md
    ├── loop-engineering.md
    ├── verification-engineering.md
    └── pr-engineering.md
```
