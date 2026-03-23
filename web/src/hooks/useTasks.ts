import useSWR from 'swr';
import { listTasks, createTask, updateTask, deleteTask, Task, CreateTaskInput, UpdateTaskInput } from '@/lib/tasks';

export function useTasks() {
  const { data, error, isLoading, mutate } = useSWR<Task[]>('tasks', listTasks, {
    revalidateOnFocus: true,
  });

  const create = async (input: CreateTaskInput) => {
    // Optimistic update
    const tempId = `temp-${Date.now()}`;
    const tempTask: Task = {
      ...input,
      id: tempId,
      status: input.status || 'TODO',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mutate(current => current ? [tempTask, ...current] : [tempTask], false);
    
    try {
      const result = await createTask(input);
      mutate(current => current ? current.map(t => t.id === tempId ? result : t) : [result], false);
      return result;
    } catch (err) {
      mutate(); // rollback
      throw err;
    }
  };

  const update = async (input: UpdateTaskInput) => {
    mutate(current => current ? current.map(t => t.id === input.id ? { ...t, ...input } : t) : [], false);
    try {
      await updateTask(input);
      mutate();
    } catch (err) {
      mutate(); // rollback
      throw err;
    }
  };

  const remove = async (id: string) => {
    mutate(current => current ? current.filter(t => t.id !== id) : [], false);
    try {
      await deleteTask(id);
      mutate();
    } catch (err) {
      mutate(); // rollback
      throw err;
    }
  };

  return {
    tasks: data || [],
    error,
    isLoading,
    mutate,
    createTask: create,
    updateTask: update,
    deleteTask: remove,
  };
}
