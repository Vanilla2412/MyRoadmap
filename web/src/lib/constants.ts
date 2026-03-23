export const TASK_STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'] as const;
export type TaskStatus = typeof TASK_STATUSES[number];

export const TASK_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'] as const;
export type TaskPriority = typeof TASK_PRIORITIES[number];

export const SORT_OPTIONS = ['dueDate_asc', 'dueDate_desc', 'priority_desc', 'none'] as const;
export type SortOption = typeof SORT_OPTIONS[number];
