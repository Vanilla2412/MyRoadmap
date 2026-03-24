"use client";

import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useTaskFilters } from '@/hooks/useTaskFilters';
import { TaskFilterBar } from '@/components/dashboard/TaskFilterBar';
import { TaskList } from '@/components/dashboard/TaskList';
import TaskDialog from '@/components/TaskDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { TaskStatus } from '@/lib/constants';

export default function DashboardPage() {
  const { tasks, error, isLoading, createTask, updateTask, deleteTask } = useTasks();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filters = useTaskFilters(tasks);

  // If there's a serious data fetching error, show a toast or a banner.
  // We handle it once here.
  if (error) {
    toast.error("Failed to load tasks from server", { id: "fetch_error" });
  }

  const handleUpdateStatus = async (id: string, newStatus: TaskStatus) => {
    await updateTask({ id, status: newStatus });
  };

  const hasActiveFilters = 
    filters.filterStatus !== 'ALL' || 
    filters.filterPriority !== 'ALL' || 
    filters.filterCategory !== '';

  return (
    <div className={cn(
      "flex-1 flex flex-col", // Layout
      "w-full max-w-7xl mx-auto", // Sizing & Alignment
      "px-4 sm:px-6 lg:px-8 py-8" // Spacing
    )}>
      <div className={cn(
        "flex flex-col sm:flex-row justify-between", // Layout
        "items-start sm:items-center", // Alignment
        "mb-6 gap-4" // Spacing
      )}>
        <h1 className="text-2xl font-bold text-gray-900">Your Tasks</h1>
        <Button onClick={() => setIsCreateModalOpen(true)} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          New Task
        </Button>
      </div>

      <TaskFilterBar {...filters} />

      <TaskList
        tasks={filters.filteredAndSortedTasks}
        isLoading={isLoading}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={filters.clearFilters}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onUpdateStatus={handleUpdateStatus}
        onDelete={deleteTask}
        onEdit={updateTask}
      />

      <TaskDialog
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={createTask}
      />
    </div>
  );
}
