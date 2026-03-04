import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Task } from '../lib/tasks';

type TaskCardProps = {
  task: Task;
  onUpdateStatus: (id: string, newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') => void;
  onDelete: (id: string) => void;
};

export default function TaskCard({ task, onUpdateStatus, onDelete }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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
    setIsDeleting(true);
    await onDelete(task.id);
    setIsDeleting(false);
  };

  // Status badge colors
  const statusColors = {
    TODO: 'bg-gray-100 text-gray-800 border-gray-200',
    IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-200',
    DONE: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex flex-col justify-between h-48 transition-all hover:shadow-md ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1" title={task.title}>
            {task.title}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[task.status || 'TODO']} flex-shrink-0 ml-2 font-medium`}>
            {task.status?.replace('_', ' ')}
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3" title={task.description || ''}>
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
        
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-full hover:bg-red-50 disabled:opacity-50"
          aria-label="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
