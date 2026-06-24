# Application Showcase

An overview of the current user interface, user experience flows, and core features implemented in the **My Roadmap** application.

---

## 1. Authentication Flow
Secure user identity management powered by **AWS Cognito**.

### Key Features
* **Dual Tabs Interface**: Interactive tabs to seamlessly toggle between "Sign In" and "Create Account" states.
* **Password Visibility Toggle**: Inline eye icons to easily check passwords and confirm password entries.
* **Input Validation & Safety**: Clean and standard input layouts with descriptive placeholder texts to guide the user.
* **Self-Service Actions**: Access to password recovery (Forgot your password?) to resolve account access issues.

### Screenshots

<div style="display: flex; gap: 16px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 300px;">
    <p style="font-weight: 600; text-align: center;">Sign In</p>
    <img src="/assets/showcase/auth-signin.png" alt="Sign In Screen" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%; height: auto;" />
  </div>
  <div style="flex: 1; min-width: 300px;">
    <p style="font-weight: 600; text-align: center;">Create Account</p>
    <img src="/assets/showcase/auth-signup.png" alt="Create Account Screen" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%; height: auto;" />
  </div>
</div>

---

## 2. Task Dashboard
The main control center featuring a comprehensive task list, metadata displays, and advanced querying capabilities.

### Key Features
* **Detailed Task Cards**: Displays important task information at a glance, including title, description summary, priority level badge (e.g., `LOW`), due date, and status badges (`TODO`, `IN PROGRESS`, `DONE`).
* **Multi-Criteria Filtering**: Dynamic dropdown selectors and input fields allowing users to filter tasks by **Status**, **Priority**, **Category**, and **Tag**.
* **Sorting Capabilities**: Easily sort the list of tasks (e.g., Default order).
* **Toast Notifications**: Asynchronous notifications at the bottom-right of the screen to give immediate feedback when tasks are updated (e.g., "Task updated successfully").

### Screenshots

<img src="/assets/showcase/dashboard.png" alt="Task Dashboard Screen" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 1.5rem 0; width: 100%; height: auto;" />

---

## 3. Task Creation & Editing
A unified modal overlay for creating new tasks or editing existing ones with granular parameters.

### Key Features
* **Time Management**: Track task scope by specifying both `Estimated Hours` and `Actual Hours`.
* **Due Date Selector**: Native calendar date picker for scheduling task completion.
* **Tags & Categories**: Add a search category and comma-separated tags to keep roadmap elements highly discoverable.
* **Dynamic Subtask List**: Add, remove, and manage multiple subtasks inside a single parent task item.

### Screenshots

<img src="/assets/showcase/task-edit.png" alt="Task Creation & Editing Modal" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 1.5rem 0; width: 100%; height: auto;" />

---

## 4. Settings & Account Profile
A centralized preferences area for user profile updates, privacy control, and account termination.

### Key Features
* **Profile Summary**: Displays the signed-in user's primary information (such as email address).
* **Privacy Controls**: "Analytics & Telemetry" toggle switch allowing users to opt in or out of anonymous tracking.
* **Danger Zone**: A secure, multi-step confirmation area for deleting accounts. It features a check agreement statement to prevent accidental permanent deletion of task data.

### Screenshots

<img src="/assets/showcase/settings.png" alt="Account Settings Screen" style="border-radius: 8px; border: 1px solid var(--vp-c-divider); box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 1.5rem 0; width: 100%; height: auto;" />
