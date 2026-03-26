import { useState, useMemo } from 'react';
import { Task } from '@/lib/tasks';
import { SortOption } from '@/lib/constants';

export function useTaskFilters(tasks: Task[]) {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterTag, setFilterTag] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('none');

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

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
    if (filterTag.trim() !== '') {
      const searchLower = filterTag.toLowerCase();
      result = result.filter(task => 
        task.tags?.some(tag => tag?.toLowerCase().includes(searchLower))
      );
    }

    if (sortBy !== 'none') {
      result.sort((a, b) => {
        if (sortBy === 'dueDate_asc' || sortBy === 'dueDate_desc') {
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
  }, [tasks, filterStatus, filterPriority, filterCategory, filterTag, sortBy]);

  const clearFilters = () => {
    setFilterStatus('ALL');
    setFilterPriority('ALL');
    setFilterCategory('');
    setFilterTag('');
  };

  return {
    filteredAndSortedTasks,
    filterStatus, setFilterStatus,
    filterPriority, setFilterPriority,
    filterCategory, setFilterCategory,
    filterTag, setFilterTag,
    sortBy, setSortBy,
    clearFilters
  };
}
