# Test Strategy and Defect Management

This document defines the testing approach and quality standards for the "My Roadmap" project.

## 1. Testing Strategy

We follow the testing pyramid approach, prioritizing unit and integration tests for speed and reliability.

### 1.1 Testing Levels

| Level | Scope | Tools | Frequency |
| :--- | :--- | :--- | :--- |
| **Unit Test** | Pure functions, individual hooks, utility logic | Vitest | Every PR / Local dev |
| **Component Test** | UI components (shadcn/ui), form interactions | Vitest + React Testing Library | Every PR / Local dev |
| **Integration Test** | Amplify GraphQL API, Auth flows | Manual (Amplify Sandbox) | Major feature updates |
| **E2E Test** | Full user journeys | Playwright (Future) | Post-MVP |

### 1.2 Responsibilities

- **Developers**: Responsible for writing unit and component tests for every new feature.
- **AI Agent**: Responsible for maintaining test infrastructure and generating initial test boilerplate.

## 2. Defect Management

### 2.1 Issue Tracking
- All bugs must be reported as GitHub Issues with the `bug` label.
- Reports should include:
  - Steps to reproduce
  - Expected vs. Actual behavior
  - Environment details (Browser, OS)

### 2.2 Severity Levels

| Level | Description | Priority |
| :--- | :--- | :--- |
| **P0 (Critical)** | Core functionality broken (Auth, DB), Security leak | Immediate Fix |
| **P1 (High)** | Major feature broken, UI/UX severely impacted | Next Sprint |
| **P2 (Medium)** | Minor feature bug, edge case issues | As scheduled |
| **P3 (Low)** | Stylistic issues, minor typos | Backlog |

## 3. Tooling and Environment

- **Runner**: [Vitest](https://vitest.dev/)
- **Environment**: [jsdom](https://github.com/jsdom/jsdom)
- **Component Mocking**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **CI Integration**: GitHub Actions runs `npm run test` on every PR to `main`.
