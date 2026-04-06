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
  task?: Task; // If provided, acts as Edit Modal. Otherwise, Create Modal.
  onSave: (input: CreateTaskInput | UpdateTaskInput) => Promise<Task>;
};

export default function TaskDialog({ isOpen, onClose, task, onSave }: TaskDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!task;

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
      };

      if (isEditing) {
        await onSave({ ...payload, id: task.id } as UpdateTaskInput);
        toast.success('Task updated successfully');
      } else {
        await onSave(payload as CreateTaskInput);
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
          defaultValues={task ? {
            title: task.title,
            description: task.description || '',
            status: task.status || 'TODO',
            priority: task.priority || 'LOW',
            category: task.category || '',
            dueDate: task.dueDate || '',
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
