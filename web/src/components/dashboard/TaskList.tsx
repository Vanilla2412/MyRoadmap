import React from 'react';
import { Task, UpdateTaskInput } from '@/lib/tasks';
import TaskCard from '@/components/TaskCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type TaskListProps = {
  tasks: Task[];
  isLoading: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onOpenCreateModal: () => void;
  onUpdateStatus: (id: string, newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (input: UpdateTaskInput) => Promise<void>;
};

function TaskSkeleton() {
  return (
    <div 
      className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3")} 
      aria-label="Loading tasks"
    >
      {[1, 2, 3].map((i) => (
        <div key={i} className={cn(
          "bg-white border border-gray-200 rounded-lg p-5 shadow-sm animate-pulse",
          "flex flex-col justify-between h-56"
        )}>
          <div>
            <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyTaskList({ 
  hasActiveFilters, onClearFilters, onOpenCreateModal 
}: { 
  hasActiveFilters: boolean; 
  onClearFilters: () => void; 
  onOpenCreateModal: () => void;
}) {
  return (
    <div className={cn(
      "text-center py-16 bg-white border border-gray-200 border-dashed rounded-lg bg-gray-50/50"
    )}>
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
        <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No tasks found</h3>
      <p className="mt-1 text-sm text-gray-500">
        {hasActiveFilters ? "Try adjusting your filters to see more tasks." : "Get started by creating a new task."}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        )}
        <Button onClick={onOpenCreateModal}>
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          New Task
        </Button>
      </div>
    </div>
  );
}

export function TaskList({
  tasks, isLoading, hasActiveFilters, onClearFilters, onOpenCreateModal,
  onUpdateStatus, onDelete, onEdit
}: TaskListProps) {
  if (isLoading) return <TaskSkeleton />;

  if (tasks.length === 0) {
    return (
      <EmptyTaskList 
        hasActiveFilters={hasActiveFilters} 
        onClearFilters={onClearFilters} 
        onOpenCreateModal={onOpenCreateModal} 
      />
    );
  }

  return (
    <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3")}>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
