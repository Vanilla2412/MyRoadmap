"use client";

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Task, CreateTaskInput, UpdateTaskInput, listTasks, createTask, updateTask, deleteTask } from '@/lib/tasks';
import TaskCard from '@/components/TaskCard';
import CreateTaskModal from '@/components/CreateTaskModal';
import { Button } from '@/components/ui/button';
import { Plus, Filter, SortDesc } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

type SortOption = 'dueDate_asc' | 'dueDate_desc' | 'priority_desc' | 'none';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter States
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('');
  
  // Sort State
  const [sortBy, setSortBy] = useState<SortOption>('none');

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedTasks = await listTasks();
      setTasks(fetchedTasks || []);
    } catch (err: unknown) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (input: CreateTaskInput) => {
    const newTask = await createTask(input);
    setTasks(prev => [newTask, ...prev]);
  };

  const handleUpdateTaskStatus = async (id: string, newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
    try {
      await updateTask({ id, status: newStatus });
    } catch (err) {
      console.error('Failed to update task:', err);
      fetchTasks();
    }
  };

  const handleEditTask = async (input: UpdateTaskInput) => {
    setTasks(prev => prev.map(task =>
      task.id === input.id ? { ...task, ...input } : task
    ));
    try {
      await updateTask(input);
    } catch (err) {
      console.error('Failed to edit task:', err);
      fetchTasks();
    }
  };

  const handleDeleteTask = async (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    try {
      await deleteTask(id);
    } catch (err) {
      console.error('Failed to delete task:', err);
      fetchTasks();
    }
  };

  // Derived state: Filtered and Sorted Tasks
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Apply Filters
    if (filterStatus !== 'ALL') {
      result = result.filter(task => task.status === filterStatus);
    }
    if (filterPriority !== 'ALL') {
      result = result.filter(task => task.priority === filterPriority);
    }
    if (filterCategory.trim() !== '') {
      const searchLower = filterCategory.toLowerCase();
      result = result.filter(task => task.category?.toLowerCase().includes(searchLower));
    }

    // Apply Sorting
    if (sortBy !== 'none') {
      result.sort((a, b) => {
        if (sortBy === 'dueDate_asc' || sortBy === 'dueDate_desc') {
          // Handle missing dates by grouping them at the end
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          const dateA = new Date(a.dueDate).getTime();
          const dateB = new Date(b.dueDate).getTime();
          return sortBy === 'dueDate_asc' ? dateA - dateB : dateB - dateA;
        } else if (sortBy === 'priority_desc') {
          const priorityWeight = { HIGH: 3, MEDIUM: 2, LOW: 1, undefined: 0, null: 0 };
          const weightA = priorityWeight[a.priority as keyof typeof priorityWeight] || 0;
          const weightB = priorityWeight[b.priority as keyof typeof priorityWeight] || 0;
          return weightB - weightA;
        }
        return 0;
      });
    }

    return result;
  }, [tasks, filterStatus, filterPriority, filterCategory, sortBy]);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
        <Button onClick={() => setIsCreateModalOpen(true)} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Filter and Sort Controls */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase flex items-center"><Filter className="w-3 h-3 mr-1"/> Status</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="TODO">To Do</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="DONE">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase">Priority</label>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger>
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Priority</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase">Category</label>
            <Input 
              placeholder="Search category..." 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)} 
            />
          </div>
        </div>
        
        <div className="w-full md:w-48 space-y-1.5 shrink-0">
          <label className="text-xs font-semibold text-gray-500 uppercase flex items-center"><SortDesc className="w-3 h-3 mr-1"/> Sort By</label>
          <Select value={sortBy} onValueChange={(val) => setSortBy(val as SortOption)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort tasks..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Default</SelectItem>
              <SelectItem value="dueDate_asc">Due Date (Earliest)</SelectItem>
              <SelectItem value="dueDate_desc">Due Date (Latest)</SelectItem>
              <SelectItem value="priority_desc">Priority (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm animate-pulse flex flex-col justify-between h-48">
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
      ) : filteredAndSortedTasks.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 border-dashed rounded-lg bg-gray-50/50">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {tasks.length > 0 ? "Try adjusting your filters to see more tasks." : "Get started by creating a new task."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            {tasks.length > 0 && (
              <Button variant="outline" onClick={() => { setFilterStatus('ALL'); setFilterPriority('ALL'); setFilterCategory(''); }}>
                Clear Filters
              </Button>
            )}
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={handleUpdateTaskStatus}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      )}

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
}
