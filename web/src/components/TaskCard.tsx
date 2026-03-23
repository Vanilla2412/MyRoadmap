import React, { useState } from 'react';
import { MoreVertical, Edit2, Trash2, Calendar, Tag, AlertCircle } from 'lucide-react';
import { isPast } from 'date-fns';
import { cva, type VariantProps } from 'class-variance-authority';
import { Task, UpdateTaskInput } from '../lib/tasks';
import { TaskStatus, TaskPriority } from '../lib/constants';
import TaskDialog from './TaskDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { toast } from 'sonner';

// --- CVA Variants (Styles separated from Logic) ---

const taskCardVariants = cva(
  "bg-white border rounded-lg p-5 shadow-sm flex flex-col justify-between h-56 transition-all hover:shadow-md",
  {
    variants: {
      status: {
        default: "border-gray-200",
        overdue: "border-red-300 bg-red-50/20",
      },
      isDeleting: {
        true: "opacity-50 pointer-events-none",
        false: "",
      }
    },
    defaultVariants: {
      status: "default",
      isDeleting: false,
    }
  }
);

const badgeVariants = cva(
  "text-[10px] uppercase font-bold px-2 py-0.5 rounded",
  {
    variants: {
      intent: {
        priorityLOW: "bg-slate-100 text-slate-700",
        priorityMEDIUM: "bg-orange-100 text-orange-700",
        priorityHIGH: "bg-red-100 text-red-700",
        statusTODO: "bg-gray-100 text-gray-800 border border-gray-200",
        statusIN_PROGRESS: "bg-blue-100 text-blue-800 border border-blue-200",
        statusDONE: "bg-green-100 text-green-800 border border-green-200",
      }
    }
  }
);

// --- Component Logic ---

type TaskCardProps = {
  task: Task;
  onUpdateStatus: (id: string, newStatus: TaskStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (input: UpdateTaskInput) => Promise<void>;
};

export default function TaskCard({ task, onUpdateStatus, onDelete, onEdit }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newStatus = e.target.value as TaskStatus;
    if (newStatus !== task.status) {
      setIsUpdating(true);
      try {
        await onUpdateStatus(task.id, newStatus);
        toast.success('Status updated');
      } catch (error) {
        toast.error('Failed to update status');
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await onDelete(task.id);
        toast.success('Task deleted');
      } catch (error) {
        toast.error('Failed to delete task');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formattedDate = task.dueDate 
    ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : null;

  const isOverdue = task.dueDate
    ? isPast(new Date(task.dueDate)) && task.status !== 'DONE'
    : false;

  return (
    <>
      {/* Container logic using CVA */}
      <div data-testid="task-card" className={taskCardVariants({ status: isOverdue ? "overdue" : "default", isDeleting })}>
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1" title={task.title}>
              {task.title}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8 focus-visible:ring-0">
                  <span className="sr-only">Open task menu</span>
                  <MoreVertical className="h-4 w-4 text-gray-500" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
                  <Edit2 className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {task.priority && (
              <span className={badgeVariants({ intent: `priority${task.priority}` as any })}>
                {task.priority}
              </span>
            )}
            {task.category && (
              <span className="text-xs text-gray-500 flex items-center bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                <Tag className="w-3 h-3 mr-1" aria-hidden="true" />
                {task.category}
              </span>
            )}
            {formattedDate && (
              <span className={`text-xs flex items-center px-2 py-0.5 rounded border ${
                isOverdue
                  ? 'text-red-600 bg-red-50 border-red-200 font-medium'
                  : 'text-gray-500 bg-gray-50 border-gray-100'
              }`}>
                <Calendar className="w-3 h-3 mr-1" aria-hidden="true" />
                {formattedDate}
                {isOverdue && <AlertCircle className="w-3 h-3 ml-1" aria-hidden="true" />}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2" title={task.description || ''}>
            {task.description || 'No description provided.'}
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <label htmlFor={`status-select-${task.id}`} className="sr-only">Update Task Status</label>
          <select
            id={`status-select-${task.id}`}
            value={task.status || 'TODO'}
            onChange={handleStatusChange}
            disabled={isUpdating}
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 text-gray-700 py-1.5 pl-3 pr-8 w-36 disabled:opacity-50"
            aria-label="Update task status"
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
          <span className={badgeVariants({ intent: `status${task.status || 'TODO'}` as any })} aria-hidden="true">
            {task.status?.replace('_', ' ')}
          </span>
        </div>
      </div>

      <TaskDialog
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        onSave={onEdit}
      />
    </>
  );
}

