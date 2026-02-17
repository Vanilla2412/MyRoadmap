# Requirements Specification: My Roadmap

## 1. Project Overview

**Project Name:** My Roadmap  
**Purpose:** A learning task management application designed to help users track and organize their learning tasks systematically.

**Target Users:**

- Individuals managing self-paced learning goals
- Users who need structured task tracking for skill development

---

## 2. Core Features (Phase 1 - MVP)

### 2.1 Learning Task Management

The primary feature of this application is to manage learning tasks with the following essential attributes:

#### Task Properties

| Property     | Type   | Required | Description                                                                  |
| ------------ | ------ | -------- | ---------------------------------------------------------------------------- |
| **Title**    | String | Yes      | Name of the learning task (e.g., "Learn Next.js App Router")                 |
| **Status**   | Enum   | Yes      | Current state of the task: `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`         |
| **Priority** | Enum   | Yes      | Task priority level: `HIGH`, `MEDIUM`, `LOW`                                 |
| **Due Date** | Date   | Yes      | Target completion date                                                       |
| **Category** | String | Yes      | Learning domain (e.g., "Frontend", "Backend", "Infrastructure", "Algorithm") |

#### Status Definitions

- **NOT_STARTED**: Task has been created but not yet begun
- **IN_PROGRESS**: User is actively working on this task
- **COMPLETED**: Task has been finished successfully

---

## 3. Functional Requirements

### 3.1 Task CRUD Operations

- **FR-1.1**: Users shall be able to create a new learning task with all required properties
- **FR-1.2**: Users shall be able to view a list of all learning tasks
- **FR-1.3**: Users shall be able to update any property of an existing task
- **FR-1.4**: Users shall be able to delete a learning task
- **FR-1.5**: Users shall be able to change the status of a task (NOT_STARTED → IN_PROGRESS → COMPLETED)

### 3.2 Task Filtering and Sorting

- **FR-2.1**: Users shall be able to filter tasks by status
- **FR-2.2**: Users shall be able to filter tasks by priority
- **FR-2.3**: Users shall be able to filter tasks by category
- **FR-2.4**: Users shall be able to sort tasks by due date
- **FR-2.5**: Users shall be able to sort tasks by priority

### 3.3 Task Visualization

- **FR-3.1**: Users shall see a clear visual representation of task status
- **FR-3.2**: Users shall see priority indicators (e.g., color coding)
- **FR-3.3**: Users shall see upcoming deadlines highlighted

---

## 4. Non-Functional Requirements

### 4.1 Performance

- **NFR-1.1**: Task list shall load within 2 seconds
- **NFR-1.2**: Task CRUD operations shall complete within 1 second

### 4.2 Usability

- **NFR-2.1**: UI shall be responsive and work on desktop and mobile devices
- **NFR-2.2**: UI shall follow modern design principles (clean, intuitive)
- **NFR-2.3**: Application shall be accessible (WCAG 2.1 Level AA compliance)

### 4.3 Security

#### 4.3.1 Authentication & Identity Management

- **NFR-3.1.1**: Users shall authenticate via AWS Cognito with email verification
- **NFR-3.1.2**: Passwords shall meet minimum complexity requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character
- **NFR-3.1.3**: JWT tokens shall expire after 1 hour of inactivity
- **NFR-3.1.4**: Refresh tokens shall be securely stored using httpOnly cookies
- **NFR-3.1.5**: Failed login attempts shall be rate-limited (max 5 attempts per 15 minutes)

#### 4.3.2 Authorization & Access Control

- **NFR-3.2.1**: Users shall only access their own tasks (row-level security enforced by `userId`)
- **NFR-3.2.2**: All GraphQL mutations shall verify user ownership before allowing modifications
- **NFR-3.2.3**: AppSync resolvers shall enforce authorization rules at the field level
- **NFR-3.2.4**: API requests without valid JWT tokens shall return 401 Unauthorized
- **NFR-3.2.5**: API requests attempting to access unauthorized resources shall return 403 Forbidden

#### 4.3.3 Data Protection

- **NFR-3.3.1**: All data in transit shall be encrypted using TLS 1.2 or higher
- **NFR-3.3.2**: DynamoDB data at rest shall be encrypted using AWS managed keys
- **NFR-3.3.3**: Sensitive user data (email addresses) shall not be logged in plain text
- **NFR-3.3.4**: User passwords shall never be stored in plain text (handled by Cognito)
- **NFR-3.3.5**: JWT tokens shall not be stored in localStorage (use httpOnly cookies)

#### 4.3.4 Input Validation & API Security

- **NFR-3.4.1**: All user inputs shall be validated and sanitized on both client and server side
- **NFR-3.4.2**: GraphQL queries shall have a maximum depth limit of 5 to prevent DoS attacks
- **NFR-3.4.3**: API rate limiting shall be enforced at 100 requests per minute per user
- **NFR-3.4.4**: CORS policy shall restrict allowed origins to the production domain only
- **NFR-3.4.5**: GraphQL schema shall validate input types and reject malformed requests
- **NFR-3.4.6**: File uploads shall not be allowed in Phase 1 (future consideration)

#### 4.3.5 Security Monitoring & Logging

- **NFR-3.5.1**: Failed authentication attempts shall be logged to CloudWatch
- **NFR-3.5.2**: Suspicious activity (rate limit exceeded, invalid tokens) shall trigger CloudWatch alarms
- **NFR-3.5.3**: Access logs shall be retained for 90 days
- **NFR-3.5.4**: Security events (failed auth, authorization failures) shall be monitored and dashboarded
- **NFR-3.5.5**: Application logs shall not contain sensitive data (passwords, tokens, PII)

#### 4.3.6 Compliance & Best Practices

- **NFR-3.6.1**: Application shall follow OWASP Top 10 mitigation strategies
- **NFR-3.6.2**: Dependencies shall be scanned for known vulnerabilities using `npm audit`
- **NFR-3.6.3**: AWS resources shall follow the principle of least privilege (IAM policies)
- **NFR-3.6.4**: Security headers shall be configured:
  - `Strict-Transport-Security` (HSTS)
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Content-Security-Policy` (CSP)
- **NFR-3.6.5**: Regular security reviews shall be conducted before each release

**Note**: Advanced security features (MFA, AWS WAF, AWS GuardDuty) are deferred to Phase 2+ for cost optimization.

### 4.4 Scalability

- **NFR-4.1**: System shall support up to 1,000 tasks per user
- **NFR-4.2**: System shall handle concurrent users efficiently

---

## 5. System Architecture

### 5.1 Infrastructure Architecture

The following diagram illustrates the AWS infrastructure and service integration:

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
    end

    subgraph "AWS Cloud"
        subgraph "Frontend Hosting"
            Amplify[AWS Amplify Hosting]
            CloudFront[Amazon CloudFront CDN]
        end

        subgraph "Authentication"
            Cognito[Amazon Cognito]
        end

        subgraph "API Layer"
            AppSync[AWS AppSync<br/>GraphQL API]
        end

        subgraph "Data Layer"
            DynamoDB[(Amazon DynamoDB)]
        end

        subgraph "CI/CD"
            GitHub[GitHub Repository]
            Actions[GitHub Actions]
        end
    end

    Browser -->|HTTPS| CloudFront
    CloudFront --> Amplify
    Browser -->|Auth Request| Cognito
    Browser -->|GraphQL Query/Mutation| AppSync
    AppSync -->|Verify Token| Cognito
    AppSync -->|Read/Write| DynamoDB

    GitHub -->|Push| Actions
    Actions -->|Deploy| Amplify

    style Browser fill:#e1f5ff
    style Amplify fill:#ff9900
    style CloudFront fill:#ff9900
    style Cognito fill:#ff9900
    style AppSync fill:#ff9900
    style DynamoDB fill:#ff9900
    style GitHub fill:#24292e
    style Actions fill:#2088ff
```

### 5.2 Application Architecture

The following diagram shows the application layer structure:

```mermaid
graph TB
    subgraph "Frontend - Next.js App Router"
        Pages[Pages/Routes]
        Components[React Components<br/>shadcn/ui]
        GraphQLClient[Apollo Client /<br/>AWS Amplify Client]
        AuthContext[Auth Context]
    end

    subgraph "Backend - AWS AppSync"
        Schema[GraphQL Schema]
        Resolvers[Resolvers]
        AuthZ[Authorization Rules]
    end

    subgraph "Data Store"
        TasksTable[Tasks Table<br/>DynamoDB]
    end

    Pages --> Components
    Components --> GraphQLClient
    Components --> AuthContext
    GraphQLClient -->|GraphQL Operations| Schema
    Schema --> Resolvers
    Resolvers --> AuthZ
    AuthZ -->|Validated Request| TasksTable

    style Pages fill:#61dafb
    style Components fill:#61dafb
    style GraphQLClient fill:#61dafb
    style AuthContext fill:#61dafb
    style Schema fill:#e535ab
    style Resolvers fill:#e535ab
    style AuthZ fill:#e535ab
    style TasksTable fill:#4053d6
```

### 5.3 Data Flow Diagram

The following diagram illustrates a typical user interaction flow:

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant Cognito
    participant AppSync
    participant DynamoDB

    User->>Browser: Open Application
    Browser->>Cognito: Request Authentication
    Cognito-->>Browser: Return JWT Token

    User->>Browser: Create Task
    Browser->>AppSync: GraphQL Mutation<br/>(with JWT)
    AppSync->>Cognito: Validate Token
    Cognito-->>AppSync: Token Valid
    AppSync->>AppSync: Check Authorization
    AppSync->>DynamoDB: PutItem (Task)
    DynamoDB-->>AppSync: Success
    AppSync-->>Browser: Task Created
    Browser-->>User: Display Success

    User->>Browser: View Task List
    Browser->>AppSync: GraphQL Query<br/>(with JWT)
    AppSync->>Cognito: Validate Token
    Cognito-->>AppSync: Token Valid
    AppSync->>DynamoDB: Query (userId)
    DynamoDB-->>AppSync: Return Tasks
    AppSync-->>Browser: Task List
    Browser-->>User: Display Tasks
```

---

## 6. Technical Stack

### Frontend

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

### Backend

- **Infrastructure**: AWS Amplify Gen 2 (TypeScript-based IaC)
- **Authentication**: AWS Cognito
- **Database**: Amazon DynamoDB
- **API**: AWS AppSync (GraphQL)

### CI/CD

- **Version Control**: GitHub
- **Pipeline**: GitHub Actions

---

## 6. Data Model (Phase 1)

### Task Entity

```typescript
interface Task {
  id: string; // Unique identifier (UUID)
  userId: string; // Owner of the task (from Cognito)
  title: string; // Task name
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  priority: "HIGH" | "MEDIUM" | "LOW";
  dueDate: string; // ISO 8601 date format
  category: string; // Learning domain
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
}
```

### DynamoDB Table Design

- **Table Name**: `Tasks`
- **Partition Key**: `userId` (String)
- **Sort Key**: `id` (String)
- **GSI (Global Secondary Index)**:
  - `StatusIndex`: Partition Key = `userId`, Sort Key = `status`
  - `DueDateIndex`: Partition Key = `userId`, Sort Key = `dueDate`

---

## 7. User Stories (Phase 1)

### Epic: Task Management

**US-1**: As a learner, I want to create a new learning task so that I can track what I need to study.

**US-2**: As a learner, I want to view all my tasks in a list so that I can see my learning roadmap at a glance.

**US-3**: As a learner, I want to update a task's status to "In Progress" when I start working on it, so that I can track my current focus.

**US-4**: As a learner, I want to mark a task as "Completed" when I finish it, so that I can see my progress.

**US-5**: As a learner, I want to set a priority for each task so that I can focus on the most important items first.

**US-6**: As a learner, I want to set a due date for each task so that I can manage my time effectively.

**US-7**: As a learner, I want to filter tasks by status so that I can focus on tasks that are in progress or not yet started.

**US-8**: As a learner, I want to categorize tasks (Frontend, Backend, etc.) so that I can organize my learning by domain.

---

## 8. Out of Scope (Future Phases)

The following features are **not included in Phase 1** but may be considered for future iterations:

**Task Management Features:**

- Subtasks / nested tasks
- Time tracking (estimated hours, actual hours)
- Learning resources (URLs, notes)
- Progress percentage
- Achievement tracking
- Collaboration features
- Skill tree integration
- Difficulty levels
- Tags and advanced search
- Analytics and insights

**Advanced Security Features (Phase 2+):**

- Multi-Factor Authentication (MFA)
- AWS WAF (Web Application Firewall)
- AWS GuardDuty (threat detection)
- Advanced DDoS protection
- Penetration testing
- Security incident response automation

---

## 9. Success Criteria

Phase 1 will be considered successful when:

1. Users can perform full CRUD operations on learning tasks
2. Users can filter and sort tasks by status, priority, category, and due date
3. The application is deployed on AWS with authentication
4. The UI is responsive and follows modern design standards
5. All core functional requirements (FR-1.x, FR-2.x, FR-3.x) are implemented
6. The codebase follows TypeScript best practices and maintains type safety

---

## 10. Acceptance Criteria

### Functional Criteria

- [ ] User can sign up and log in via AWS Cognito
- [ ] User can create a task with title, status, priority, due date, and category
- [ ] User can view a list of all their tasks
- [ ] User can edit any task property
- [ ] User can delete a task
- [ ] User can change task status (NOT_STARTED → IN_PROGRESS → COMPLETED)
- [ ] User can filter tasks by status, priority, and category
- [ ] User can sort tasks by due date and priority
- [ ] UI is responsive on desktop and mobile
- [ ] Application is deployed to AWS and accessible via HTTPS
- [ ] Code follows TypeScript best practices and includes type safety
- [ ] README includes setup instructions and project overview

### Security Criteria

- [ ] Password complexity requirements are enforced during registration
- [ ] Email verification is required before first login
- [ ] JWT tokens expire after 1 hour of inactivity
- [ ] Users cannot access other users' tasks (verified via API testing)
- [ ] API requests without valid JWT return 401 Unauthorized
- [ ] All data is transmitted over HTTPS (TLS 1.2+)
- [ ] DynamoDB encryption at rest is enabled
- [ ] GraphQL query depth limiting is configured (max depth 5)
- [ ] API rate limiting prevents abuse (100 requests/min per user)
- [ ] CORS policy restricts to production domain only
- [ ] Security headers are configured (HSTS, X-Frame-Options, CSP, X-Content-Type-Options)
- [ ] npm audit shows no high or critical vulnerabilities
- [ ] Failed authentication attempts are logged to CloudWatch
- [ ] CloudWatch alarms are configured for suspicious activity

---

## Document Information

- **Version**: 1.0.0
- **Last Updated**: 2026-02-16
- **Author**: John ([github](https://github.com/vanilla2412))
- **Status**: Draft
