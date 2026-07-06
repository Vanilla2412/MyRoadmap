"use client";

import { useState, useEffect } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useTaskFilters } from '@/hooks/useTaskFilters';
import { TaskFilterBar } from '@/components/dashboard/TaskFilterBar';
import { TaskList } from '@/components/dashboard/TaskList';
import TaskDialog from '@/components/TaskDialog';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { TaskStatus } from '@/lib/constants';
import { useDecompose } from '@/hooks/useDecompose';
import { DecomposeInput } from '@/components/DecomposeInput';
import { StreamingPreview } from '@/components/StreamingPreview';
import { DraftSubtaskList } from '@/components/DraftSubtaskList';
import { ConfirmActions } from '@/components/ConfirmActions';

export default function DashboardPage() {
  const { tasks, error, isLoading, createTask, updateTask, deleteTask } = useTasks();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // AI Task Decomposition Hook
  const {
    status: decompStatus,
    drafts: decompDrafts,
    error: decompError,
    startDecompose,
    updateDraft,
    deleteDraft,
    confirmAll,
    discardAll,
  } = useDecompose();

  const filters = useTaskFilters(tasks);

  // If there's a serious data fetching error, show a toast or a banner.
  if (error) {
    toast.error("Failed to load tasks from server", { id: "fetch_error" });
  }

  // Handle AI decomposition states (toasts)
  useEffect(() => {
    if (decompStatus === 'confirmed') {
      toast.success("AI generated subtasks successfully saved!");
      discardAll();
    } else if (decompStatus === 'error' && decompError) {
      toast.error(decompError.message || "Failed to generate tasks");
    }
  }, [decompStatus, decompError]);

  const handleUpdateStatus = async (id: string, newStatus: TaskStatus) => {
    await updateTask({ id, status: newStatus });
  };

  const hasActiveFilters = 
    filters.filterPriority !== 'ALL' || 
    filters.filterCategory !== '' ||
    filters.filterTag !== '';

  return (
    <div className="flex-1 flex flex-col w-full">
      {/* AI Task Decomposition Area - Placed at the very top of dashboard, taking full width */}
      <div className="bg-muted/30 border-b w-full">
        {decompStatus === 'idle' || decompStatus === 'streaming' ? (
          <div className="w-full">
            <DecomposeInput
              onDecompose={startDecompose}
              isLoading={decompStatus === 'streaming'}
            />
            {decompStatus === 'streaming' && (
              <div className="pb-6">
                <StreamingPreview drafts={decompDrafts} />
              </div>
            )}
          </div>
        ) : (decompStatus === 'preview' || decompStatus === 'confirming') ? (
          <div className="w-full bg-background pb-6">
            <DraftSubtaskList
              drafts={decompDrafts}
              onUpdateDraft={updateDraft}
              onDeleteDraft={deleteDraft}
            />
            <ConfirmActions
              onConfirm={confirmAll}
              onDiscard={discardAll}
              isConfirming={decompStatus === 'confirming'}
            />
          </div>
        ) : decompStatus === 'error' ? (
          <div className="w-full max-w-2xl mx-auto py-6 px-4 text-center space-y-4">
            <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
              {decompError?.message || "An error occurred. Please try again."}
            </div>
            <div className="flex justify-center gap-3">
              <Button onClick={() => discardAll()} variant="outline">
                Close
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      <div className={cn(
        "flex-grow flex flex-col", // Layout
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
    </div>
  );
}
