import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCard from './TaskCard';

// --- Mocks ---

// Mock TaskDialog to isolate TaskCard's behavior.
// This ensures TaskCard tests remain stable even if TaskDialog's internals change.
vi.mock('./TaskDialog', () => ({
  default: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="task-dialog">Task Dialog</div> : null,
}));

// Mock the DropdownMenu and related UI primitives.
// The shadcn DropdownMenu relies on Radix UI Portals which don't work well in jsdom.
// We render children directly so TaskCard interaction logic is still testable.
vi.mock('./ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuItem: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

// Mock the Button UI primitive
vi.mock('./ui/button', () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

// Pin a fixed "current time" to make date-related tests deterministic.
// All tests run as if today is 2025-01-15.
const MOCK_TODAY = new Date('2025-01-15T12:00:00.000Z');
vi.setSystemTime(MOCK_TODAY);

// --- Test Factories ---

/**
 * Creates a base task object for tests.
 * Spread overrides to create specific scenarios, keeping tests readable and DRY.
 */
const createMockTask = (overrides = {}) => ({
  id: 'task-1',
  title: 'My Test Task',
  description: 'A description of the task.',
  status: 'TODO' as const,
  priority: 'MEDIUM' as const,
  category: 'Work',
  dueDate: '2025-01-20', // 5 days from MOCK_TODAY → not overdue
  createdAt: '2025-01-10T00:00:00.000Z',
  updatedAt: '2025-01-10T00:00:00.000Z',
  owner: 'user-1',
  ...overrides,
});

// --- Tests ---

describe('TaskCard', () => {
  // Type annotations for mock functions matching TaskCardProps exactly.
  // Using `as unknown as` cast since Vitest v4 removed the 2-arg generic syntax vi.fn<[Args], Return>().
  // This is the idiomatic v4 pattern: mock is still a vi.fn() spy, but typed for prop compatibility.
  let onUpdateStatus: (id: string, newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') => Promise<void>;
  let onDelete: (id: string) => Promise<void>;
  let onEdit: (input: import('../lib/tasks').UpdateTaskInput) => Promise<import('../lib/tasks').Task>;

  beforeEach(() => {
    // clearAllMocks: resets call history and return values of vi.fn() mocks
    // restoreAllMocks: undoes vi.spyOn() replacements (e.g. window.confirm)
    // Both are needed: clearAllMocks alone does NOT restore spied-on real implementations.
    vi.clearAllMocks();
    vi.restoreAllMocks();
    onUpdateStatus = vi.fn() as unknown as typeof onUpdateStatus;
    onDelete = vi.fn() as unknown as typeof onDelete;
    onEdit = vi.fn() as unknown as typeof onEdit;
  });

  // Helper to compose props cleanly in each test
  const getProps = () => ({ onUpdateStatus, onDelete, onEdit });

  describe('Rendering', () => {
    it('should render the task title', () => {
      render(<TaskCard task={createMockTask()} {...getProps()} />);
      expect(screen.getByText('My Test Task')).toBeInTheDocument();
    });

    it('should render the task description', () => {
      render(<TaskCard task={createMockTask()} {...getProps()} />);
      expect(screen.getByText('A description of the task.')).toBeInTheDocument();
    });

    it('should render "No description provided." when description is missing', () => {
      render(<TaskCard task={createMockTask({ description: undefined })} {...getProps()} />);
      expect(screen.getByText('No description provided.')).toBeInTheDocument();
    });

    it('should render the priority badge', () => {
      render(<TaskCard task={createMockTask({ priority: 'HIGH' })} {...getProps()} />);
      expect(screen.getByText('HIGH')).toBeInTheDocument();
    });

    it('should render the category badge', () => {
      render(<TaskCard task={createMockTask({ category: 'Personal' })} {...getProps()} />);
      expect(screen.getByText('Personal')).toBeInTheDocument();
    });

    it('should render a formatted due date', () => {
      render(<TaskCard task={createMockTask({ dueDate: '2025-06-15' })} {...getProps()} />);
      // Use a locale-agnostic regex that matches both 'Jun 15' and '15 Jun'
      expect(screen.getByText(/Jun.*15|15.*Jun/i)).toBeInTheDocument();
    });

    it('should not show priority badge when priority is not set', () => {
      render(<TaskCard task={createMockTask({ priority: undefined })} {...getProps()} />);
      expect(screen.queryByText(/LOW|MEDIUM|HIGH/)).not.toBeInTheDocument();
    });
  });

  describe('Overdue Logic', () => {
    // FIX: Use data-testid="task-card" (added to TaskCard.tsx) instead of
    // CSS class selectors. This makes the test immune to Tailwind refactoring.
    it('should NOT show overdue styling for a task with future due date', () => {
      const task = createMockTask({ dueDate: '2025-01-20', status: 'TODO' });
      render(<TaskCard task={task} {...getProps()} />);
      expect(screen.getByTestId('task-card')).not.toHaveClass('border-red-300');
    });

    it('should show overdue styling for a past-due task that is not DONE', () => {
      // dueDate is Jan 10, which is before MOCK_TODAY (Jan 15)
      const task = createMockTask({ dueDate: '2025-01-10', status: 'TODO' });
      render(<TaskCard task={task} {...getProps()} />);
      expect(screen.getByTestId('task-card')).toHaveClass('border-red-300');
    });

    it('should NOT show overdue styling for a past-due task that IS "DONE"', () => {
      const task = createMockTask({ dueDate: '2025-01-10', status: 'DONE' });
      render(<TaskCard task={task} {...getProps()} />);
      expect(screen.getByTestId('task-card')).not.toHaveClass('border-red-300');
    });
  });

  describe('Status Change Interaction', () => {
    // FIX: Use userEvent instead of fireEvent.
    // userEvent wraps interactions in act() automatically, eliminating React state warnings.
    // It also more accurately simulates real browser events (pointer, keyboard, etc.).
    it('should call onUpdateStatus with the new status when user selects a different value', async () => {
      const user = userEvent.setup();
      render(<TaskCard task={createMockTask({ status: 'TODO' })} {...getProps()} />);

      await user.selectOptions(screen.getByRole('combobox'), 'IN_PROGRESS');

      expect(onUpdateStatus).toHaveBeenCalledTimes(1);
      expect(onUpdateStatus).toHaveBeenCalledWith('task-1', 'IN_PROGRESS');
    });

    it('should NOT call onUpdateStatus if the same status is re-selected', async () => {
      const user = userEvent.setup();
      render(<TaskCard task={createMockTask({ status: 'TODO' })} {...getProps()} />);

      await user.selectOptions(screen.getByRole('combobox'), 'TODO');

      expect(onUpdateStatus).not.toHaveBeenCalled();
    });
  });

  describe('Delete Interaction', () => {
    it('should call onDelete when the user confirms deletion', async () => {
      const user = userEvent.setup();
      vi.spyOn(window, 'confirm').mockReturnValue(true);
      render(<TaskCard task={createMockTask()} {...getProps()} />);

      await user.click(screen.getByRole('button', { name: /delete/i }));

      expect(window.confirm).toHaveBeenCalledTimes(1);
      expect(onDelete).toHaveBeenCalledWith('task-1');
    });

    it('should NOT call onDelete when the user cancels the confirmation dialog', async () => {
      const user = userEvent.setup();
      vi.spyOn(window, 'confirm').mockReturnValue(false);
      render(<TaskCard task={createMockTask()} {...getProps()} />);

      await user.click(screen.getByRole('button', { name: /delete/i }));

      expect(window.confirm).toHaveBeenCalledTimes(1);
      expect(onDelete).not.toHaveBeenCalled();
    });
  });

  describe('Task Dialog', () => {
    it('should show the task dialog when user clicks the Edit button', async () => {
      const user = userEvent.setup();
      render(<TaskCard task={createMockTask()} {...getProps()} />);

      expect(screen.queryByTestId('task-dialog')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /edit/i }));

      expect(screen.getByTestId('task-dialog')).toBeInTheDocument();
    });
  });
});
