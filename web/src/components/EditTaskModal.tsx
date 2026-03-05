import React, { useState } from 'react';
import { Task, UpdateTaskInput } from '../lib/tasks';
import { TaskForm } from './TaskForm';
import { TaskFormValues } from '../lib/validations';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

type EditTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onEdit: (input: UpdateTaskInput) => Promise<void>;
};

export default function EditTaskModal({ isOpen, onClose, task, onEdit }: EditTaskModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: TaskFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await onEdit({
        id: task.id,
        title: values.title.trim(),
        description: values.description?.trim() || undefined,
        status: values.status,
      });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
            {error}
          </div>
        )}
        <TaskForm
          defaultValues={{
            title: task.title,
            description: task.description || '',
            status: task.status || 'TODO',
          }}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Save Changes"
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
