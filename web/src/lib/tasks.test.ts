import { describe, it, expect, vi, beforeEach } from 'vitest';

// Use vi.hoisted to ensure these variables are available before vi.mock executes
// This avoids "ReferenceError: Cannot access 'mockList' before initialization"
const { mockList, mockCreate, mockUpdate, mockDelete } = vi.hoisted(() => ({
  mockList: vi.fn(),
  mockCreate: vi.fn(),
  mockUpdate: vi.fn(),
  mockDelete: vi.fn(),
}));

vi.mock('aws-amplify/data', () => ({
  generateClient: () => ({
    models: {
      Task: {
        list: mockList,
        create: mockCreate,
        update: mockUpdate,
        delete: mockDelete,
      },
    },
  }),
}));

// Mocking RUM logEvent
vi.mock('./rum', () => ({
  logEvent: vi.fn(),
}));

// Important: Import the module under test AFTER defining mocks
import { listTasks, createTask, updateTask, deleteTask } from './tasks';
import { logEvent as mockedLogEvent } from './rum';

describe('tasks logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('listTasks', () => {
    it('should successfully return a list of tasks', async () => {
      const mockTasks = [{ id: '1', title: 'Task 1' }, { id: '2', title: 'Task 2' }];
      mockList.mockResolvedValue({ data: mockTasks, errors: null });

      const result = await listTasks();

      expect(mockList).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockTasks);
    });

    it('should throw an error when API returns errors', async () => {
      mockList.mockResolvedValue({ data: null, errors: [{ message: 'API Error' }] });

      await expect(listTasks()).rejects.toThrow('Failed to fetch tasks');
    });

    it('should bubble up unexpected errors', async () => {
      mockList.mockRejectedValue(new Error('Network Fail'));

      await expect(listTasks()).rejects.toThrow('Network Fail');
    });
  });

  describe('createTask', () => {
    const input = { title: 'New Task', priority: 'HIGH' as const };

    it('should successfully create a task and log an event', async () => {
      const mockNewTask = { id: 'new-1', ...input, status: 'TODO' };
      mockCreate.mockResolvedValue({ data: mockNewTask, errors: null });

      const result = await createTask(input);

      expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Task',
        priority: 'HIGH',
      }));
      expect(result).toEqual(mockNewTask);
      expect(mockedLogEvent).toHaveBeenCalledWith('task_created', expect.any(Object));
    });

    it('should strip undefined values from payload', async () => {
      mockCreate.mockResolvedValue({ data: { id: '1' }, errors: null });
      
      await createTask({ title: 'Task', description: undefined });

      const sentPayload = mockCreate.mock.calls[0][0];
      expect(sentPayload).not.toHaveProperty('description');
    });

    it('should throw an error on API failure', async () => {
      mockCreate.mockResolvedValue({ data: null, errors: [{ message: 'Forbidden' }] });

      await expect(createTask(input)).rejects.toThrow('Failed to create task');
    });
  });

  describe('updateTask', () => {
    const input = { id: '1', status: 'DONE' as const };

    it('should successfully update a task and log an event', async () => {
      const mockUpdatedTask = { ...input, title: 'Updated' };
      mockUpdate.mockResolvedValue({ data: mockUpdatedTask, errors: null });

      const result = await updateTask(input);

      expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining(input));
      expect(result).toEqual(mockUpdatedTask);
      expect(mockedLogEvent).toHaveBeenCalledWith('task_updated', expect.any(Object));
    });

    it('should throw an error on API failure', async () => {
      mockUpdate.mockResolvedValue({ data: null, errors: [{ message: 'Conflict' }] });

      await expect(updateTask(input)).rejects.toThrow('Failed to update task');
    });
  });

  describe('deleteTask', () => {
    const taskId = '123';

    it('should successfully delete a task', async () => {
      mockDelete.mockResolvedValue({ errors: null });

      await deleteTask(taskId);

      expect(mockDelete).toHaveBeenCalledWith({ id: taskId });
      expect(mockedLogEvent).toHaveBeenCalledWith('task_deleted');
    });

    it('should throw an error on API failure', async () => {
      mockDelete.mockResolvedValue({ errors: [{ message: 'Not Found' }] });

      await expect(deleteTask(taskId)).rejects.toThrow('Failed to delete task');
    });
  });
});
