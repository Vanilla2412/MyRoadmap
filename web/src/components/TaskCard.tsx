import React, { useState } from 'react';
import { MoreVertical, Edit2, Trash2, Calendar, Tag, AlertCircle } from 'lucide-react';
import { isPast } from 'date-fns';
import { Task, UpdateTaskInput } from '../lib/tasks';
import EditTaskModal from './EditTaskModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

type TaskCardProps = {
  task: Task;
  onUpdateStatus: (id: string, newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (input: UpdateTaskInput) => Promise<void>;
};

export default function TaskCard({ task, onUpdateStatus, onDelete, onEdit }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newStatus = e.target.value as 'TODO' | 'IN_PROGRESS' | 'DONE';
    if (newStatus !== task.status) {
      setIsUpdating(true);
      await onUpdateStatus(task.id, newStatus);
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      await onDelete(task.id);
      setIsDeleting(false);
    }
  };

  const statusColors = {
    TODO: 'bg-gray-100 text-gray-800 border-gray-200',
    IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-200',
    DONE: 'bg-green-100 text-green-800 border-green-200',
  };

  const priorityColors = {
    LOW: 'bg-slate-100 text-slate-700',
    MEDIUM: 'bg-orange-100 text-orange-700',
    HIGH: 'bg-red-100 text-red-700',
  };

  const formattedDate = task.dueDate 
    ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : null;

  // Overdue: past due date AND not yet completed
  const isOverdue = task.dueDate
    ? isPast(new Date(task.dueDate)) && task.status !== 'DONE'
    : false;

  return (
    <>
      <div className={`bg-white border rounded-lg p-5 shadow-sm flex flex-col justify-between h-56 transition-all hover:shadow-md ${isDeleting ? 'opacity-50 pointer-events-none' : ''} ${isOverdue ? 'border-red-300 bg-red-50/20' : 'border-gray-200'}`}>
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1" title={task.title}>
              {task.title}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8 focus-visible:ring-0">
                  <MoreVertical className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {task.priority && (
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                {task.priority}
              </span>
            )}
            {task.category && (
              <span className="text-xs text-gray-500 flex items-center bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                <Tag className="w-3 h-3 mr-1" />
                {task.category}
              </span>
            )}
            {formattedDate && (
              <span className={`text-xs flex items-center px-2 py-0.5 rounded border ${
                isOverdue
                  ? 'text-red-600 bg-red-50 border-red-200 font-medium'
                  : 'text-gray-500 bg-gray-50 border-gray-100'
              }`}>
                <Calendar className="w-3 h-3 mr-1" />
                {formattedDate}
                {isOverdue && <AlertCircle className="w-3 h-3 ml-1" />}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2" title={task.description || ''}>
            {task.description || 'No description provided.'}
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <select
            value={task.status || 'TODO'}
            onChange={handleStatusChange}
            disabled={isUpdating}
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 text-gray-700 py-1.5 pl-3 pr-8 w-36 disabled:opacity-50"
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
          <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[task.status || 'TODO']} flex-shrink-0 font-medium`}>
            {task.status?.replace('_', ' ')}
          </span>
        </div>
      </div>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        onEdit={onEdit}
      />
    </>
  );
}
