# MVP Development Task Breakdown (Issues)

These are the 1-2 hour estimation tasks (Size: S) broken down from `memo.md` for Step 2 and beyond. You can copy the content below to create new GitHub Issues using the template we just created.

## Step 2: Authentication

### Issue 1: Amplify Gen2 Auth resource definition

- **Title**: `feat: define Amplify Gen 2 Auth resource`
- **Context**: We need to configure the backend authentication rules using email sign-up for Cognito.
- **Acceptance Criteria**:
  - [ ] `web/amplify/auth/resource.ts` is updated with email sign-in logic.
  - [ ] Running `npx ampx sandbox` launches successfully and provisions the Auth resource without errors.
- **Estimated Size**: `S (1-2h)`

### Issue 2: Login and Signup UI Implementation

- **Title**: `feat: implement login and signup UI`
- **Context**: The frontend needs a way to present login options to the user, integrating the Amplify Authenticator.
- **Acceptance Criteria**:
  - [ ] Create a dedicated login route (`/login` or similar).
  - [ ] Embed the Amplify Authenticator component.
  - [ ] UI is rendered correctly and accepts user input.
- **Estimated Size**: `S (1-2h)`

### Issue 3: Next.js Middleware for Protected Routes

- **Title**: `feat: implement protected routes via Next.js Middleware`
- **Context**: Only authenticated users should be able to access the Task Dashboard.
- **Acceptance Criteria**:
  - [ ] Create or update `middleware.ts` to check Amplify Auth session state.
  - [ ] Unauthenticated users are redirected to the login page.
  - [ ] Authenticated users can successfully access the protected dashboard route.
- **Estimated Size**: `S (1-2h)`

---

## Step 3: Backend Data Model

### Issue 4: Task Data Model definition (DynamoDB & AppSync)

- **Title**: `feat: define Task data model with owner authorization`
- **Context**: Users need a DynamoDB table to store their tasks. We need to define the schema and ensure owner-based access control.
- **Acceptance Criteria**:
  - [ ] `web/amplify/data/resource.ts` defines the `Task` model (title, status, priority, dueDate, category).
  - [ ] Authorization rules (`allow.owner()`) are applied to the model.
  - [ ] `amplify sandbox` applies the DB schema correctly.
- **Estimated Size**: `S (1-2h)`

---

## Step 4: Frontend UI Implementation

### Issue 5: Task Dashboard UI

- **Title**: `feat: implement Task Dashboard layout and list rendering`
- **Context**: Displaying the user's tasks using shadcn/ui components.
- **Acceptance Criteria**:
  - [ ] Fetch tasks from the AppSync API.
  - [ ] Render the tasks in a list/table format using shadcn/ui.
  - [ ] Loading states are handled gracefully.
- **Estimated Size**: `S (1-2h)`

### Issue 6: Task Creation Form (React Hook Form + Zod)

- **Title**: `feat: implement Task creation form`
- **Context**: Users need a validated form to create new tasks.
- **Acceptance Criteria**:
  - [ ] Create a form mapped to a Zod schema matching the Task data model.
  - [ ] Integrate React Hook Form for state management.
  - [ ] Upon submission, a new task is created via the GraphQL API and the dashboard updates.
- **Estimated Size**: `S (1-2h)`

### Issue 7: Task Edit and Delete Functionality

- **Title**: `feat: implement Edit and Delete actions for Tasks`
- **Context**: Users must be able to update task status or delete tasks entirely.
- **Acceptance Criteria**:
  - [ ] Add an "Edit" and "Delete" button per task.
  - [ ] Edit functionality updates existing records in DynamoDB.
  - [ ] Delete functionality removes the task and refreshes the UI.
- **Estimated Size**: `S (1-2h)`

---

## Step 5: Deployment

### Issue 8: AWS Amplify Hosting Deployment Configuration

- **Title**: `chore: configure Amplify Hosting deployment logic`
- **Context**: The MVP must be accessible to the public on AWS via Amplify Hosting.
- **Acceptance Criteria**:
  - [ ] The app is successfully built in the Amplify CI/CD console or via AWS CDK setup.
  - [ ] The live URL is active and functional.
- **Estimated Size**: `S (1-2h)`

---

## Step 6: Observability & Notifications

### Issue 9: Implement Slack Notifications for CI/CD Pipeline

- **Title**: `feat: implement Slack notifications for CI/CD status`
- **GitHub Issue**: [Closes #63](https://github.com/Vanilla2412/MyRoadmap/issues/63)
- **Context**: Real-time feedback on build and deployment status is crucial for development efficiency.
- **Acceptance Criteria**:
  - [x] Create a Slack Inbox Webhook.
  - [x] Store the Webhook URL in GitHub Secrets as `SLACK_WEBHOOK_URL`.
  - [x] Update `ci.yml` and `deploy.yml` to include notification steps.
  - [x] Verify that notifications are received in Slack for both success and failure states.
- **Estimated Size**: `S (1-2h)`

---

## Step 7: Project Standards & Sustainability

### Issue 10: GitHub Release Notes and Community Standards

- **Title**: `chore: implement GitHub Release Notes and Community Standards`
- **GitHub Issue**: [issue #64](https://github.com/Vanilla2412/MyRoadmap/issues/64)
- **Context**: Transitioning the repository from a personal script to an open-source grade project requires standardized community files and automated versioning.
- **Acceptance Criteria**:
  - [ ] Create `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md`.
  - [ ] Configure GitHub Actions to automate release note generation (e.g., via `release-drafter`).
  - [ ] Document the project's versioning strategy (SemVer).
- **Estimated Size**: `S (1-2h)`

### Issue 11: Financial Cost Estimation and Analysis

- **Title**: `docs: conduct project financial cost estimation and analysis`
- **GitHub Issue**: [issue #65](https://github.com/Vanilla2412/MyRoadmap/issues/65)
- **Context**: Demonstrating cost-awareness is a key engineering skill. We need to estimate the operating costs on AWS.
- **Acceptance Criteria**:
  - [ ] Research and estimate monthly costs for Amplify, Cognito, DynamoDB, and AppSync.
  - [ ] Identify cost transition points when scaling beyond the AWS Free Tier.
  - [ ] Create a cost analysis report in Markdown.
- **Estimated Size**: `S (1-2h)`

---

## Step 8: Future Planning (Phase 3 & 4)

### Issue 12: Phase 3 - AWS Cost Design and Operations Policy

- **Title**: `feat: define Phase 3 AWS cost design and operations policy`
- **GitHub Issue**: [issue #66](https://github.com/Vanilla2412/MyRoadmap/issues/66)
- **Context**: Operational excellence involves designing for cost-efficiency and reliable maintenance.
- **Acceptance Criteria**:
  - [x] Define budget alerts and cost monitoring strategies. (Implemented in PR #71)
  - [x] Design resource management policies (log retention, cleanup schedules).
  - [x] Establish a disaster recovery and automated backup policy.
- **Estimated Size**: `S (1-2h)`

### Issue 13: Phase 4 - AI Integration and MLOps Foundation

- **Title**: `feat: research Phase 4 AI integration and MLOps foundation`
- **GitHub Issue**: [issue #67](https://github.com/Vanilla2412/MyRoadmap/issues/67)
- **Context**: Preparing for AI features and building the foundation for MLOps skills.
- **Acceptance Criteria**:
  - [ ] Define requirements for AI features (e.g., auto-categorization, priority recommendation).
  - [ ] Evaluate AWS-native AI services (SageMaker, Bedrock, etc.) for integration.
  - [ ] Outline a roadmap for transitioning to an AI-native application architecture.
  - [ ] Draft an initial MLOps pipeline concept (CI/CD for ML).
- **Estimated Size**: `L (4-8h / Research Task)`
