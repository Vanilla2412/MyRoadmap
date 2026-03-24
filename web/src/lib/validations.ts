import * as z from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).default('TODO'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  category: z.string().optional(),
  dueDate: z.string().optional(), // Using ISO string for dates to align with AWS Amplify
  subtasks: z.array(z.string()).optional(),
  estimatedHours: z.number().min(0).optional(),
  actualHours: z.number().min(0).optional(),
  tags: z.array(z.string()).optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
