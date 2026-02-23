# Database Design

## 1. Overview

- **Database Service**: Amazon DynamoDB
- **Infrastructure as Code**: AWS Amplify Gen 2 (TypeScript)
- **Data Model**: Single Table Design concept managed by Amplify.

## 2. Data Models (Amplify Gen 2 Schema)

The following `schema.ts` definition serves as the single source of truth for the backend data model.

```typescript
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1: Define the model ==*/
const schema = a.schema({
  Task: a
    .model({
      // Primary Key is automatically id: ID! unless specified otherwise
      // Amplify automatically handles owner authorization

      owner: a.string(), // Partition Key for multi-tenant GSIs

      title: a.string().required(),

      // Enums are handled as Strings in DynamoDB with application-level validation
      // or using a.enum() if supported by the specific Amplify version
      status: a.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),

      priority: a.enum(["LOW", "MEDIUM", "HIGH"]),

      dueDate: a.date(), // ISO 8601 Date string

      category: a.string(), // e.g., "Frontend", "Backend"

      description: a.string(), // Optional content

      // Timestamps (createdAt, updatedAt) are automatically added by Amplify
    })
    .authorization((allow) => [
      // OWNER AUTH: Only the creator can Create, Read, Update, Delete their own tasks
      allow.owner(),
    ])
    // Secondary Indexes for Filtering/Sorting (Optimized for Multi-tenant)
    .secondaryIndexes((index) => [
      // Filter by Status (PK: owner, SK: status)
      index("owner").sortKeys(["status"]).queryField("listTasksByStatus"),

      // Sort by Due Date (PK: owner, SK: dueDate)
      index("owner").sortKeys(["dueDate"]).queryField("listTasksByDueDate"),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is not used for this authenticated-only app
  },
});
```

## 3. DynamoDB Implementation Details

### 3.1 Table Structure (Conceptual)

Amplify Gen 2 abstracts the low-level table creation, but the underlying DynamoDB table will strictly follow these patterns:

| Attribute   | Type   | Role             | Notes                                                   |
| ----------- | ------ | ---------------- | ------------------------------------------------------- |
| `id`        | String | Primary Key (PK) | UUID (Auto-generated)                                   |
| `owner`     | String | GSI PK / Auth    | `userId` from Cognito (Partition Key for owner queries) |
| `title`     | String | Attribute        |                                                         |
| `status`    | String | GSI SK           | For filtering by status                                 |
| `priority`  | String | Attribute        |                                                         |
| `dueDate`   | String | GSI SK           | For sorting by date                                     |
| `category`  | String | Attribute        |                                                         |
| `createdAt` | String | Attribute        | ISO 8601                                                |
| `updatedAt` | String | Attribute        | ISO 8601                                                |

> **Note on PK/SK**: Amplify's default `@model` often uses `id` as PK. For multi-tenant isolation and to prevent partition bloat, we explicitly define `owner` and use it as the PK for Global Secondary Indexes (GSIs).
> This ensures queries are scoped cleanly to individual users (e.g., `identifier: ['owner', 'status']` behavior scaling naturally for thousands of users without RCU spikes).

### 3.2 Access Patterns (GSIs)

1.  **Get Task by ID**
    - `getTask(id: "...")`
    - Auth: Owner check.

2.  **List All My Tasks**
    - `listTasks()`
    - Filter: `owner == CurrentUser`.

3.  **Filter by Status** (e.g., "Show me all In Progress tasks")
    - `listTasksByStatus(owner: CurrentUser, status: "IN_PROGRESS")`
    - Uses GSI (PK: `owner`, SK: `status`).

4.  **Sort by Due Date** (e.g., "What's due next?")
    - `listTasksByDueDate(owner: CurrentUser, sortDirection: ASC)`
    - Uses GSI (PK: `owner`, SK: `dueDate`).

## 4. Cost & Scalability Considerations

- **Capacity Mode**: On-Demand (ideal for sporadic traffic of a portfolio app).
- **Encryption**: AWS Managed Keys (default).
- **Backup**: Point-in-time recovery (PITR) recommended for production.
