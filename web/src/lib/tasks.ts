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
};

// Require ID for updates, other fields optional
export type UpdateTaskInput = {
  id: string;
  title?: string;
  description?: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
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
      console.error('Errors fetching tasks:', errors);
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
    const { data: newTask, errors } = await client.models.Task.create({
      title: input.title,
      description: input.description,
      status: input.status || 'TODO',
    });
    
    if (errors || !newTask) {
      console.error('Errors creating task:', errors);
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
    const { data: updatedTask, errors } = await client.models.Task.update(input);
    
    if (errors || !updatedTask) {
      console.error('Errors updating task:', errors);
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
      console.error('Errors deleting task:', errors);
      throw new Error('Failed to delete task');
    }
  } catch (error) {
    console.error('Error in deleteTask:', error);
    throw error;
  }
}
