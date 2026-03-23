import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import DashboardPage from './page';
import { SWRConfig } from 'swr';
import * as tasksApi from '@/lib/tasks';

// 1. Mock the AWS Amplify API wrapper (TDD isolation)
vi.mock('@/lib/tasks', () => ({
  listTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

describe('Dashboard Integration: Task Creation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // 2. Wrap Dashboard in SWRConfig to clear cache between tests
  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      {children}
    </SWRConfig>
  );

  it('should successfully create a new task when submitting form', async () => {
    const user = userEvent.setup();
    
    // Mock initial data load
    (tasksApi.listTasks as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    
    // Mock successful task creation returning backend data
    (tasksApi.createTask as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: 'server-id-123',
      title: 'Integration Test Task',
      status: 'TODO',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Mount entire Dashboard Page
    render(<DashboardPage />, { wrapper: TestWrapper });

    // Wait for initial fetch
    await waitFor(() => {
      expect(tasksApi.listTasks).toHaveBeenCalled();
    });

    // Act: Click 'New Task' to open Dialog
    const newBtns = screen.getAllByRole('button', { name: /new task/i });
    await user.click(newBtns[0]);
    
    // Assert Modal is open
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Act: Fill Title input
    const titleInput = screen.getByRole('textbox', { name: /title/i });
    await user.type(titleInput, 'Integration Test Task');

    // Act: Submit the form
    await user.click(screen.getByRole('button', { name: /create task/i }));

    // Assert: Check if createTask was precisely called with sanitized payload
    await waitFor(() => {
      expect(tasksApi.createTask).toHaveBeenCalledWith({
        title: 'Integration Test Task',
        description: undefined,
        status: 'TODO',
        priority: undefined,
        category: undefined,
        dueDate: undefined,
      });
    });

    // Assert: Modal is closed after success
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
