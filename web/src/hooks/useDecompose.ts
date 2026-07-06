import { useState, useRef } from 'react';
import { mutate } from 'swr';
import { streamDecompose, SSEEvent } from '../lib/ai-service-client';
import { createTask } from '@/lib/tasks';

export type DecomposeStatus = 
  | 'idle' 
  | 'streaming' 
  | 'preview' 
  | 'confirming' 
  | 'error' 
  | 'confirmed';

export interface DraftSubtask {
  tempId: string;
  title: string;
  description?: string;
  estimatedHours?: number;
  priority?: 'high' | 'medium' | 'low';
  order: number;
  isEdited?: boolean;
  isDeleted?: boolean;
}

export interface UseDecomposeReturn {
  status: DecomposeStatus;
  drafts: DraftSubtask[];
  error: Error | null;
  startDecompose: (epicText: string) => Promise<void>;
  updateDraft: (tempId: string, updated: Partial<DraftSubtask>) => void;
  deleteDraft: (tempId: string) => void;
  confirmAll: () => Promise<void>;
  discardAll: () => void;
}

export function useDecompose(): UseDecomposeReturn {
  const [status, setStatus] = useState<DecomposeStatus>('idle');
  const [drafts, setDrafts] = useState<DraftSubtask[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const startDecompose = async (epicText: string) => {
    // Abort previous stream if active
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setStatus('streaming');
    setDrafts([]);
    setError(null);

    try {
      await streamDecompose(
        { epicText },
        (event: SSEEvent) => {
          if (event.type === 'task_created') {
            const payload = event.data;
            setDrafts((prev) => {
              // Ensure tempId uniqueness
              const tempId = payload.subtask?.tempId || `temp-${Date.now()}-${prev.length}`;
              const newSubtask: DraftSubtask = {
                tempId,
                title: payload.subtask?.title || '',
                description: payload.subtask?.description || '',
                estimatedHours: payload.subtask?.estimatedHours || undefined,
                priority: payload.subtask?.priority || undefined,
                order: payload.subtask?.order || prev.length + 1,
              };
              return [...prev, newSubtask];
            });
          } else if (event.type === 'decompose_completed') {
            setStatus('preview');
          } else if (event.type === 'decompose_error') {
            const errMsg = event.data?.error?.message || 'Error occurred during decomposition';
            setError(new Error(errMsg));
            setStatus('error');
          }
        },
        abortControllerRef.current.signal
      );
      
      // Fallback in case completed event was missing but connection closed successfully
      setStatus((current) => (current === 'streaming' ? 'preview' : current));
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setError(err instanceof Error ? err : new Error(err?.message || 'Failed to decompose'));
      setStatus('error');
    }
  };

  const updateDraft = (tempId: string, updated: Partial<DraftSubtask>) => {
    setDrafts((prev) =>
      prev.map((d) => (d.tempId === tempId ? { ...d, ...updated, isEdited: true } : d))
    );
  };

  const deleteDraft = (tempId: string) => {
    setDrafts((prev) => prev.filter((d) => d.tempId !== tempId));
  };

  const confirmAll = async () => {
    setStatus('confirming');
    try {
      // Map and filter active drafts (not marked as deleted)
      const activeDrafts = drafts.filter((d) => !d.isDeleted);

      // Create tasks sequentially or in parallel
      await Promise.all(
        activeDrafts.map((d) =>
          createTask({
            title: d.title,
            description: d.description || undefined,
            status: 'TODO',
            priority: d.priority ? (d.priority.toUpperCase() as 'LOW' | 'MEDIUM' | 'HIGH') : 'MEDIUM',
            estimatedHours: d.estimatedHours || undefined,
            tags: ['ai-generated'],
          })
        )
      );

      // Mutate global SWR tasks cache to reload list
      await mutate('tasks');
      setStatus('confirmed');
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(err?.message || 'Failed to save tasks'));
      setStatus('error');
    }
  };

  const discardAll = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setStatus('idle');
    setDrafts([]);
    setError(null);
  };

  return {
    status,
    drafts,
    error,
    startDecompose,
    updateDraft,
    deleteDraft,
    confirmAll,
    discardAll,
  };
}
