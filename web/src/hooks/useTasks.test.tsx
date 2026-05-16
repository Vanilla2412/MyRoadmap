import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTasks } from './useTasks';
import * as tasksApi from '@/lib/tasks';
import { SWRConfig } from 'swr';
import React from 'react';

const { mockList, mockCreate, mockUpdate, mockDelete } = vi.hoisted(() => ({
  mockList: vi.fn(),
  mockCreate: vi.fn(),
  mockUpdate: vi.fn(),
  mockDelete: vi.fn(),
}));

vi.mock('@/lib/tasks', () => ({
  listTasks: mockList,
  createTask: mockCreate,
  updateTask: mockUpdate,
  deleteTask: mockDelete,
}));

describe('useTasks hook', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      {children}
    </SWRConfig>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch tasks on mount', async () => {
    const mockTasks = [{ id: '1', title: 'Test Task', status: 'TODO' }];
    mockList.mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTasks(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.tasks).toEqual(mockTasks);
    });
    expect(result.current.isLoading).toBe(false);
  });

  describe('createTask (Optimistic Update)', () => {
    it('should add task optimistically and then update with server response', async () => {
      mockList.mockResolvedValue([]);
      const newTaskInput = { title: 'New Task', priority: 'HIGH' as const };
      const serverTask = { id: 'server-id', ...newTaskInput, status: 'TODO' };
      
      mockCreate.mockResolvedValue(serverTask);

      const { result } = renderHook(() => useTasks(), { wrapper });

      // Wait for initial fetch to complete
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      let createPromise: Promise<import('@/lib/tasks').Task>;
      act(() => {
        createPromise = result.current.createTask(newTaskInput);
      });

      // Check optimistic state (should have a temp ID)
      await waitFor(() => {
        expect(result.current.tasks[0]).toMatchObject({
          title: 'New Task',
          id: expect.stringContaining('temp-'),
        });
      });

      const finalResult = await act(async () => await createPromise);

      // Check final state (server ID)
      expect(result.current.tasks[0]).toEqual(serverTask);
      expect(finalResult).toEqual(serverTask);
    });

    it('should rollback on creation failure', async () => {
      mockList.mockResolvedValue([]);
      mockCreate.mockRejectedValue(new Error('Creation Failed'));

      const { result } = renderHook(() => useTasks(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await expect(result.current.createTask({ title: 'Fail Task' })).rejects.toThrow('Creation Failed');

      // Should be empty after rollback
      expect(result.current.tasks).toEqual([]);
    });
  });

  describe('updateTask (Optimistic Update)', () => {
    it('should update task optimistically', async () => {
      const initialTask = { id: '1', title: 'Old Title', status: 'TODO' as const };
      mockList.mockResolvedValue([initialTask]);
      mockUpdate.mockResolvedValue({ ...initialTask, title: 'New Title' });

      const { result } = renderHook(() => useTasks(), { wrapper });
      await waitFor(() => expect(result.current.tasks).toHaveLength(1));

      let updatePromise: Promise<import('@/lib/tasks').Task>;
      act(() => {
        updatePromise = result.current.updateTask({ id: '1', title: 'New Title' });
      });

      // Check optimistic update
      await waitFor(() => {
        expect(result.current.tasks[0].title).toBe('New Title');
      });

      await act(async () => await updatePromise);

      await waitFor(() => {
        expect(tasksApi.updateTask).toHaveBeenCalled();
      });
    });

    it('should rollback on update failure', async () => {
      const initialTask = { id: '1', title: 'Stable', status: 'TODO' as const };
      mockList.mockResolvedValue([initialTask]);
      mockUpdate.mockRejectedValue(new Error('Update Failed'));

      const { result } = renderHook(() => useTasks(), { wrapper });
      await waitFor(() => expect(result.current.tasks).toHaveLength(1));

      await expect(result.current.updateTask({ id: '1', title: 'Changed' })).rejects.toThrow('Update Failed');

      // Should rollback to Stable
      expect(result.current.tasks[0].title).toBe('Stable');
    });
  });

  describe('deleteTask (Optimistic Update)', () => {
    it('should remove task optimistically', async () => {
      const taskToDelete = { id: '1', title: 'To Delete', status: 'TODO' as const };
      mockList.mockResolvedValue([taskToDelete]);
      mockDelete.mockResolvedValue({});

      const { result } = renderHook(() => useTasks(), { wrapper });
      await waitFor(() => expect(result.current.tasks).toHaveLength(1));

      let deletePromise: Promise<void>;
      act(() => {
        deletePromise = result.current.deleteTask('1');
      });

      // Optimistically removed
      await waitFor(() => {
        expect(result.current.tasks).toHaveLength(0);
      });

      await act(async () => await deletePromise);

      await waitFor(() => {
        expect(tasksApi.deleteTask).toHaveBeenCalledWith('1');
      });
    });

    it('should rollback on delete failure', async () => {
      const task = { id: '1', title: 'Persistent', status: 'TODO' as const };
      mockList.mockResolvedValue([task]);
      mockDelete.mockRejectedValue(new Error('Delete Failed'));

      const { result } = renderHook(() => useTasks(), { wrapper });
      await waitFor(() => expect(result.current.tasks).toHaveLength(1));

      await expect(result.current.deleteTask('1')).rejects.toThrow('Delete Failed');

      // Should be back in the list
      expect(result.current.tasks).toHaveLength(1);
      expect(result.current.tasks[0].title).toBe('Persistent');
    });
  });
});
