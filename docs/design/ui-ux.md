# UI/UX Design

## 1. Design Philosophy

- **Framework**: Shadcn/ui (Tailwind CSS)
- **Theme**: Dark/Light mode support (System default initially).
- **Aesthetics**: Clean, modern, distraction-free learning environment.
- **Responsiveness**: Mobile-first approach.

## 2. Site Map & Navigation

### Public Routes

- `/login`: User authentication (Email/Password via Cognito).
- `/register`: New user registration.
- `/forgot-password`: Password recovery flow.

### Private Routes (Protected)

- `/`: **Dashboard** (Main View). Displays task list, filters, and summary.
- `/settings`: User profile and application settings (Phase 2, placeholder for logout).

## 3. Page Specifications

### 3.1 Authentication Pages (`/login`, `/register`)

- **Layout**: Centered card on a clean background.
- **Components**:
  - `Card`: Container for the form.
  - `Form`: React Hook Form with Zod validation.
  - `Input`: Email, Password fields.
  - `Button`: Primary action (Login/Register), Secondary action (Link to switch usage).
  - `Alert`: Error display.

### 3.2 Dashboard (`/`)

The interaction hub. Designed to minimize clicks.

#### Header

- **Logo**: Branded text/icon (top-left).
- **UserMenu**: Dropdown with Avatar (top-right).
  - Items: "Profile", "Theme (Light/Dark)", "Logout".

#### Main Content Area

- **Stats Bar** (Top): Quick summary (e.g., "3 Tasks Due Today", "5 In Progress").
- **Action Bar**:
  - **Search**: Text input to filter tasks by title.
  - **Filter Group**: Dropdowns for Status, Priority, Category.
  - **Sort**: Dropdown for Sort Order (Due Date, Priority).
  - **View Toggle**: List View vs. Board View (optional Phase 1 feature, stick to List for MVP).
  - **"New Task" Button**: Prominent primary button opening the **Create Task Modal**.

#### Task List Area

- **Empty State**: Friendly illustration and "Create your first task" button when no tasks exist.
- **List Item (Task Card)**:
  - **Left**: Status Indicator (Checkbox or colored dot).
  - **Middle**: Title (truncated), Category Badge (e.g., "Frontend" in blue), Due Date (red if overdue).
  - **Right**: Priority Badge, Actions Menu (Edit, Delete).
- **Pagination/Infinite Scroll**: Load more tasks.

### 3.3 Task Management (Modals/Drawers)

Using Modals (Dialogs) or Drawers (Sheet) prevents context switching, keeping the user on the Dashboard.

#### Create/Edit Task Modal

- **Title**: "Add New Task" or "Edit Task".
- **Form Fields**:
  - Title (Text Input, required).
  - Category (Select/Combobox, custom creation allowed or predefined).
  - Priority (Select: Low, Medium, High).
  - Due Date (DatePicker).
  - Status (Select: Not Started, In Progress, Completed).
- **Actions**: "Cancel" (Ghost), "Save" (Primary).

## 4. Component Hierarchy (Atomic Design)

### Atoms (shadcn/ui primitives)

- `Button`, `Input`, `Select`, `Badge`, `Avatar`, `Card`, `Dialog`, `DropdownMenu`, `Calendar`, `Popover` (for DatePicker).

### Molecules

- **TaskStatusBadge**: Color-coded badge based on status.
- **PriorityIndicator**: Icon or colored text for priority.
- **UserNav**: Avatar with Dropdown menu.
- **FilterSelect**: Reusable select component for filtering.

### Organisms

- **TaskCard**: Composed of Status, Title, Badges, and Action Menu.
- **TaskForm**: Reusable form for Create/Edit logic.
- **TaskFilters**: Composition of Search and Filter selects.
- **PageHeader**: Logo + UserNav.

### Templates

- **AuthLayout**: Centered content.
- **DashboardLayout**: Header + Main Content (max-width container).

## 5. UX Flows

### 5.1 Task Creation

1. User clicks "+ New Task".
2. Modal opens with focus on "Title" input.
3. User enters details.
4. User hits "Enter" or clicks "Save".
5. Optimistic UI update: Task appears immediately in the list.
6. Modal closes.

### 5.2 Task Completion

1. User clicks the status checkbox/indicator on a task card.
2. Confetti or subtle animation triggers (positive reinforcement).
3. Status updates to "Completed".
4. Task moves to bottom or disappears based on filter settings.

## 6. Theme Tokens (Tailwind)

- **Primary**: Indigo/Violet (Focus, Creativity).
- **Secondary**: Slate/Gray (Structure).
- **Danger**: Red/Rose (Overdue, Delete).
- **Success**: Emerald/Green (Completion).
- **Warning**: Amber (Medium Priority, Approaching Due Date).
