import React, { useState } from 'react';
import { TaskForm } from './TaskForm';
import { TaskFormValues } from '../lib/validations';
import { Task, CreateTaskInput, UpdateTaskInput } from '../lib/tasks';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { toast } from 'sonner';

type TaskDialogProps = {
  isOpen: boolean;
  onClose: () => void;
} & (
  | { task?: undefined; onSave: (input: CreateTaskInput) => Promise<Task>; }
  | { task: Task; onSave: (input: UpdateTaskInput) => Promise<Task>; }
);

export default function TaskDialog(props: TaskDialogProps) {
  const { isOpen, onClose } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!props.task;

  const handleSubmit = async (values: TaskFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        title: values.title.trim(),
        description: values.description?.trim() || undefined,
        status: values.status,
        priority: values.priority,
        category: values.category?.trim() || undefined,
        dueDate: values.dueDate || undefined,
        subtasks: values.subtasks,
        estimatedHours: values.estimatedHours,
        actualHours: values.actualHours,
        tags: values.tags,
      };

      if (props.task) {
        await props.onSave({ ...payload, id: props.task.id });
        toast.success('Task updated successfully');
      } else {
        await props.onSave(payload as CreateTaskInput);
        toast.success('Task created successfully');
      }
      onClose();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        </DialogHeader>
        <TaskForm
          defaultValues={props.task ? {
            title: props.task.title,
            description: props.task.description || '',
            status: props.task.status || 'TODO',
            priority: props.task.priority || 'LOW',
            category: props.task.category || '',
            dueDate: props.task.dueDate || '',
            subtasks: (props.task.subtasks || []).filter((s): s is string => s !== null),
            estimatedHours: props.task.estimatedHours ?? undefined,
            actualHours: props.task.actualHours ?? undefined,
            tags: (props.task.tags || []).filter((t): t is string => t !== null),
          } : undefined}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel={isEditing ? 'Save Changes' : 'Create Task'}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
