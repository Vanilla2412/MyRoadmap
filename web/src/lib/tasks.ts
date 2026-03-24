import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

// Generate a typed client for the Amplify Data API
const client = generateClient<Schema>();

// --- Types ---
export type Task = Schema['Task']['type'];

// Omit auto-generated fields for creation
export type CreateTaskInput = {
  title: string;
  description?: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  category?: string;
};

// Require ID for updates, other fields optional
export type UpdateTaskInput = {
  id: string;
  title?: string;
  description?: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  category?: string;
};

// --- CRUD Operations ---

/**
 * Fetch all tasks for the current user.
 * Thanks to owner-based authorization, this automatically filters to the user's tasks.
 */
export async function listTasks(): Promise<Task[]> {
  try {
    const { data: tasks, errors } = await client.models.Task.list();
    if (errors) {
      console.error('Errors fetching tasks:', JSON.stringify(errors, null, 2));
      throw new Error('Failed to fetch tasks');
    }
    return tasks;
  } catch (error) {
    console.error('Error in listTasks:', error);
    throw error;
  }
}

/**
 * Create a new task.
 */
export async function createTask(input: CreateTaskInput): Promise<Task> {
  try {
    // AppSync GraphQL client crashes if explicitly given `undefined`. Strip them out.
    const payload = Object.fromEntries(
      Object.entries({
        title: input.title,
        description: input.description,
        status: input.status || 'TODO',
        priority: input.priority,
        dueDate: input.dueDate,
        category: input.category,
      }).filter(([, v]) => v !== undefined)
    );

    const { data: newTask, errors } = await client.models.Task.create(payload as Parameters<typeof client.models.Task.create>[0]);
    
    if (errors || !newTask) {
      console.error('Payload sent:', JSON.stringify(payload, null, 2));
      console.error('Errors creating task:', JSON.stringify(errors, null, 2));
      throw new Error('Failed to create task');
    }
    return newTask;
  } catch (error) {
    console.error('Error in createTask:', error);
    throw error;
  }
}

/**
 * Update an existing task by ID.
 */
export async function updateTask(input: UpdateTaskInput): Promise<Task> {
  try {
    const payload = Object.fromEntries(
      Object.entries(input).filter(([, v]) => v !== undefined)
    );

    const { data: updatedTask, errors } = await client.models.Task.update(payload as Parameters<typeof client.models.Task.update>[0]);
    
    if (errors || !updatedTask) {
      console.error('Payload sent:', JSON.stringify(payload, null, 2));
      console.error('Errors updating task:', JSON.stringify(errors, null, 2));
      throw new Error('Failed to update task');
    }
    return updatedTask;
  } catch (error) {
    console.error('Error in updateTask:', error);
    throw error;
  }
}

/**
 * Delete a task by ID.
 */
export async function deleteTask(id: string): Promise<void> {
  try {
    const { errors } = await client.models.Task.delete({ id });
    
    if (errors) {
      console.error('Errors deleting task:', JSON.stringify(errors, null, 2));
      throw new Error('Failed to delete task');
    }
  } catch (error) {
    console.error('Error in deleteTask:', error);
    throw error;
  }
}
