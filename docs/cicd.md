# CI/CD Pipeline Specification

This document details the Continuous Integration (CI) and Continuous Deployment (CD) workflows for the **My Roadmap** project.

## 1. Overview

The project uses GitHub Actions for automated testing and deployment to AWS Amplify.

- **CI**: Automated linting, type checking, and build verification on every Pull Request.
- **CD**: Semi-automated deployment strategy. Automatic deployment on merge is disabled to optimize costs and ensure security. Deployment is triggered by schedules or manual actions, requiring administrator approval.

---

## 2. Continuous Integration (CI)

### Workflow: `Next.js CI` (`.github/workflows/ci.yml`)

- **Trigger**: Pushes to `main` and all Pull Requests targeting `main`.
- **Environment**: Node.js 20.x, Ubuntu latest.

#### Key Steps:
1. **Dependency Installation**: Uses `npm install`. To avoid environmental discrepancies between Windows and CI, `package-lock.json` is removed before installation in the pipeline.
2. **Type Check**: Runs `npm run typecheck` to ensure TypeScript safety.
3. **Lint**: Runs `npm run lint` (ESLint) to maintain code quality.
4. **Build Verification**: Runs `npm run build` to ensure the Next.js application compiles correctly.

---

## 3. Continuous Deployment (CD)

The project adopts a **Semi-Automated** deployment strategy to AWS Amplify.

### Workflow: `Amplify Deploy` (`.github/workflows/deploy.yml`)

#### A. Scheduled Deployment
- **Schedule**: Every Sunday at 23:00 JST (`0 14 * * 0` UTC).
- **Purpose**: To provide a regular "Weekly Release" without manual intervention.

#### B. Manual Deployment
- **Trigger**: `workflow_dispatch` (Manual trigger from GitHub UI).
- **Requirement**: Execution requires an environment with "Admin Approval".
- **Log**: The reason for deployment is recorded in the GitHub Actions summary.

### Deployment Process Logic (`amplify.yml`)
1. **Backend**: Deploys AWS resources (Auth, Data) using `npx ampx pipeline-deploy`.
2. **Frontend**: Builds the Next.js application.
3. **Cache**: Node modules and Next.js build cache are preserved to speed up subsequent builds.

---

## 4. Future Roadmap

### 4.1 Testing Expansion
As defined in the [Requirements Specification](./requirements.md), the following tests are planned to be integrated into the CI pipeline:
- **Unit/Integration Tests**: Using **Vitest**.
- **End-to-End (E2E) Tests**: Using **Playwright** to verify critical user flows (Login, Task CRUD).

### 4.2 Automated Notifications
Implementation of automated notifications for build/deployment status to:
- **Slack** or **Discord**.

### 4.3 Staging Environments
Currently, the project operates on a single `main` branch. Future iterations may include:
- Preview deployments for Pull Requests.
- A dedicated `develop` branch for staging.

---

## 5. Security & Credentials

- All AWS credentials and App IDs are stored securely in **GitHub Secrets**.
- Deployments to the production environment require manual approval from a repository administrator.
