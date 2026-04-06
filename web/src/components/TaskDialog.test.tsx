import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskDialog from './TaskDialog';

// --- Mocks ---

// Mock TaskForm to prevent recursively testing its internal logic
vi.mock('./TaskForm', () => ({
  TaskForm: ({ submitLabel, onCancel }: any) => (
    <div>
      <div data-testid="mock-task-form">{submitLabel}</div>
      <button onClick={onCancel}>Cancel</button>
    </div>
  ),
}));

// Mock the Dialog components from shadcn/ui
vi.mock('./ui/dialog', () => ({
  Dialog: ({ children, open }: any) => (open ? <div>{children}</div> : null),
  DialogContent: ({ children }: any) => <div>{children}</div>,
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <div>{children}</div>,
}));

// Mock Sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('TaskDialog', () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSave: mockOnSave,
  };

  it('should render "Create New Task" when no task is provided', () => {
    render(<TaskDialog {...defaultProps} />);
    expect(screen.getByText(/Create New Task/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-task-form')).toHaveTextContent('Create Task');
  });

  it('should render "Edit Task" when a task is provided', () => {
    const task = {
      id: 'task-1',
      title: 'Existing Task',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
    } as any;

    render(<TaskDialog {...defaultProps} task={task} />);
    expect(screen.getByText(/Edit Task/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-task-form')).toHaveTextContent('Save Changes');
  });

  it('should handle cancel by calling onClose', () => {
    render(<TaskDialog {...defaultProps} />);
    screen.getByRole('button', { name: /cancel/i }).click();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not render anything when isOpen is false', () => {
    const { container } = render(<TaskDialog {...defaultProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });
});
