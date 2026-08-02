---
description: Feature issue creator. Structures raw feature requests into concise, action-ready GitHub issues aligned with project task templates, sizing rules, and security guidelines.
---

# Feature Issue Creator (`/create-feature-issue`)

Transform raw feature requests into structured GitHub Issues tailored for the **MyRoadmap** project.

## Core Rules

1. **Path Sanitization**: NEVER use absolute local paths (`C:\Users\...`). ALWAYS use relative paths (`./web/...`, `./ai-service/...`).
2. **Task Sizing**: Target **S (1-2h)** or **XS (<1h)**. Size **M** recommends splitting; Size **L** MUST be split into child tasks.
3. **Language**: Issue content MUST be in English.
4. **Issue Template Alignment**: Maps to `.github/ISSUE_TEMPLATE/task.yml`.

## Execution Workflow

When invoked with a feature request:
1. **Clarify Ambiguities**: If requirements or scope are unclear, ask minimal targeted questions before generating.
2. **Analyze Size**: Assess complexity. If Size > S, propose splitting into smaller actionable sub-issues.
3. **Generate Issue**: Produce markdown using the template below.

## Output Issue Template

```markdown
# feat(<scope>): <short description>

## Context & Background
[Why we are doing this feature and relevant context.]

## Problem Statement & Objective
- **Problem**: [Current gap or pain point]
- **Objective**: [Goal of what will be achieved]

## User Story
- **As a** <user/role>
- **I want** <feature>
- **So that** <benefit>

## Target Files
- `./web/src/...`

## Estimated Size
- [ ] **XS (< 1h)**
- [ ] **S (1-2h)** [Recommended]
- [ ] **M (Half day)** - *Recommend splitting*
- [ ] **L (1 day+)** - *MUST BE SPLIT*

## Technical Considerations
- **Architecture/Data Flow**: 
- **Security & Privacy**: Relative paths only, no exposed secrets/tokens.

## Implementation Tasks
- [ ] Task 1
- [ ] Task 2

## Acceptance Criteria
- **Given** [initial state]
- **When** [action taken]
- **Then** [expected result]

## Testing Strategy
- [ ] Unit Test (`cd web && npx vitest run`)
- [ ] Integration / Manual Verification

## Labels
`enhancement`, `feat`, `size/S`
```
