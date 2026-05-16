import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTaskFilters } from './useTaskFilters';
import { Task } from '@/lib/tasks';

describe('useTaskFilters hook', () => {
  const mockTasks: Task[] = [
    { 
      id: '1', 
      title: 'A Task', 
      status: 'TODO', 
      priority: 'HIGH', 
      category: 'Work', 
      dueDate: '2024-12-31', 
      tags: ['urgent'],
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    },
    { 
      id: '2', 
      title: 'B Task', 
      status: 'IN_PROGRESS', 
      priority: 'MEDIUM', 
      category: 'Home', 
      dueDate: '2024-12-01', 
      tags: ['hobby'],
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    },
    { 
      id: '3', 
      title: 'C Task', 
      status: 'DONE', 
      priority: 'LOW', 
      category: 'Work', 
      dueDate: '2024-12-15', 
      tags: ['urgent', 'meeting'],
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    },
  ];

  it('should return all tasks by default', () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));
    expect(result.current.filteredAndSortedTasks).toHaveLength(3);
    expect(result.current.filterStatus).toBe('ALL');
  });

  describe('Filtering', () => {
    it('should filter by status', () => {
      const { result } = renderHook(() => useTaskFilters(mockTasks));
      
      act(() => {
        result.current.setFilterStatus('IN_PROGRESS');
      });

      expect(result.current.filteredAndSortedTasks).toHaveLength(1);
      expect(result.current.filteredAndSortedTasks[0].id).toBe('2');
    });

    it('should filter by priority', () => {
      const { result } = renderHook(() => useTaskFilters(mockTasks));
      
      act(() => {
        result.current.setFilterPriority('HIGH');
      });

      expect(result.current.filteredAndSortedTasks).toHaveLength(1);
      expect(result.current.filteredAndSortedTasks[0].id).toBe('1');
    });

    it('should filter by category (case-insensitive search)', () => {
      const { result } = renderHook(() => useTaskFilters(mockTasks));
      
      act(() => {
        result.current.setFilterCategory('work');
      });

      expect(result.current.filteredAndSortedTasks).toHaveLength(2);
    });

    it('should filter by tag', () => {
      const { result } = renderHook(() => useTaskFilters(mockTasks));
      
      act(() => {
        result.current.setFilterTag('urgent');
      });

      expect(result.current.filteredAndSortedTasks).toHaveLength(2);
      expect(result.current.filteredAndSortedTasks.map(t => t.id)).toContain('1');
      expect(result.current.filteredAndSortedTasks.map(t => t.id)).toContain('3');
    });

    it('should apply multiple filters together', () => {
      const { result } = renderHook(() => useTaskFilters(mockTasks));
      
      act(() => {
        result.current.setFilterStatus('DONE');
        result.current.setFilterPriority('LOW');
      });

      expect(result.current.filteredAndSortedTasks).toHaveLength(1);
      expect(result.current.filteredAndSortedTasks[0].id).toBe('3');
    });
  });

  describe('Sorting', () => {
    it('should sort by dueDate ascending', () => {
      const { result } = renderHook(() => useTaskFilters(mockTasks));
      
      act(() => {
        result.current.setSortBy('dueDate_asc');
      });

      const ids = result.current.filteredAndSortedTasks.map(t => t.id);
      expect(ids).toEqual(['2', '3', '1']); // Dec 1, Dec 15, Dec 31
    });

    it('should sort by dueDate descending', () => {
      const { result } = renderHook(() => useTaskFilters(mockTasks));
      
      act(() => {
        result.current.setSortBy('dueDate_desc');
      });

      const ids = result.current.filteredAndSortedTasks.map(t => t.id);
      expect(ids).toEqual(['1', '3', '2']); // Dec 31, Dec 15, Dec 1
    });

    it('should sort by priority (HIGH > MEDIUM > LOW)', () => {
      const { result } = renderHook(() => useTaskFilters(mockTasks));
      
      act(() => {
        result.current.setSortBy('priority_desc');
      });

      const priorities = result.current.filteredAndSortedTasks.map(t => t.priority);
      expect(priorities).toEqual(['HIGH', 'MEDIUM', 'LOW']);
    });
  });

  it('should clear all filters', () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));
    
    act(() => {
      result.current.setFilterStatus('DONE');
      result.current.setFilterPriority('LOW');
      result.current.setFilterCategory('Work');
      result.current.clearFilters();
    });

    expect(result.current.filterStatus).toBe('ALL');
    expect(result.current.filterPriority).toBe('ALL');
    expect(result.current.filterCategory).toBe('');
    expect(result.current.filteredAndSortedTasks).toHaveLength(3);
  });
});
