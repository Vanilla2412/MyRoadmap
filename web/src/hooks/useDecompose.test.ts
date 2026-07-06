import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDecompose } from './useDecompose';
import { streamDecompose } from '../lib/ai-service-client';
import { createTask } from '@/lib/tasks';

// Mock dependencies
vi.mock('../lib/ai-service-client', () => ({
  streamDecompose: vi.fn(),
}));

vi.mock('@/lib/tasks', () => ({
  createTask: vi.fn().mockResolvedValue({ id: 'new-id' }),
}));

// Mock SWR mutate
vi.mock('swr', () => ({
  mutate: vi.fn().mockResolvedValue(undefined),
}));

describe('useDecompose Hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with default idle state', () => {
    const { result } = renderHook(() => useDecompose());
    expect(result.current.status).toBe('idle');
    expect(result.current.drafts).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should transition to streaming and then preview during decomposition', async () => {
    // Mock successful streamDecompose implementation that invokes the callback
    vi.mocked(streamDecompose).mockImplementation(async (req, onEvent, signal) => {
      // Simulate task_created event
      onEvent({
        type: 'task_created',
        data: {
          subtask: {
            tempId: 'temp-1',
            title: 'Subtask 1',
            description: 'Desc 1',
            order: 1,
          },
        },
      });
      // Simulate completed event
      onEvent({
        type: 'decompose_completed',
        data: {},
      });
      return Promise.resolve();
    });

    const { result } = renderHook(() => useDecompose());

    await act(async () => {
      await result.current.startDecompose('Build a python backend');
    });

    expect(result.current.status).toBe('preview');
    expect(result.current.drafts.length).toBe(1);
    expect(result.current.drafts[0].title).toBe('Subtask 1');
  });

  it('should allow updating a draft task', async () => {
    // Fill the drafts list first
    vi.mocked(streamDecompose).mockImplementation(async (req, onEvent) => {
      onEvent({
        type: 'task_created',
        data: { subtask: { tempId: 'temp-1', title: 'Original Title', order: 1 } },
      });
      onEvent({ type: 'decompose_completed', data: {} });
      return Promise.resolve();
    });

    const { result } = renderHook(() => useDecompose());

    await act(async () => {
      await result.current.startDecompose('Test');
    });

    act(() => {
      result.current.updateDraft('temp-1', { title: 'Updated Title' });
    });

    const draft = result.current.drafts.find((d) => d.tempId === 'temp-1');
    expect(draft).toBeDefined();
    expect(draft?.title).toBe('Updated Title');
    expect(draft?.isEdited).toBe(true);
  });

  it('should allow deleting a draft task', async () => {
    // Fill the drafts list first
    vi.mocked(streamDecompose).mockImplementation(async (req, onEvent) => {
      onEvent({
        type: 'task_created',
        data: { subtask: { tempId: 'temp-1', title: 'To Delete', order: 1 } },
      });
      onEvent({ type: 'decompose_completed', data: {} });
      return Promise.resolve();
    });

    const { result } = renderHook(() => useDecompose());

    await act(async () => {
      await result.current.startDecompose('Test');
    });

    act(() => {
      result.current.deleteDraft('temp-1');
    });

    const draft = result.current.drafts.find((d) => d.tempId === 'temp-1');
    expect(draft).toBeUndefined();
  });

  it('should transition status during confirmAll', async () => {
    vi.mocked(streamDecompose).mockImplementation(async (req, onEvent) => {
      onEvent({
        type: 'task_created',
        data: { subtask: { tempId: 'temp-1', title: 'Task to confirm', order: 1 } },
      });
      onEvent({ type: 'decompose_completed', data: {} });
      return Promise.resolve();
    });

    const { result } = renderHook(() => useDecompose());

    await act(async () => {
      await result.current.startDecompose('Test');
    });

    await act(async () => {
      await result.current.confirmAll();
    });

    expect(createTask).toHaveBeenCalledTimes(1);
    expect(result.current.status).toBe('confirmed');
  });

  it('should reset state on discardAll', async () => {
    vi.mocked(streamDecompose).mockImplementation(async (req, onEvent) => {
      onEvent({
        type: 'task_created',
        data: { subtask: { tempId: 'temp-1', title: 'Task to discard', order: 1 } },
      });
      return Promise.resolve();
    });

    const { result } = renderHook(() => useDecompose());

    await act(async () => {
      await result.current.startDecompose('Test');
    });

    act(() => {
      result.current.discardAll();
    });

    expect(result.current.status).toBe('idle');
    expect(result.current.drafts).toEqual([]);
  });
});
