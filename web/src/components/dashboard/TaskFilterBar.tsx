import React from 'react';
import { Filter, SortDesc } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SortOption } from '@/lib/constants';

type TaskFilterBarProps = {
  filterStatus: string;
  setFilterStatus: (val: string) => void;
  filterPriority: string;
  setFilterPriority: (val: string) => void;
  filterCategory: string;
  setFilterCategory: (val: string) => void;
  filterTag: string;
  setFilterTag: (val: string) => void;
  sortBy: SortOption;
  setSortBy: (val: SortOption) => void;
};

type FilterSelectProps = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  value: string;
  onValueChange: (val: string) => void;
  placeholder: string;
  children: React.ReactNode;
};

function FilterSelect({ id, label, icon, value, onValueChange, placeholder, children }: FilterSelectProps) {
  return (
    <div className="space-y-1.5 text-left">
      <label 
        htmlFor={id} 
        className={cn(
          "text-xs font-semibold uppercase text-gray-500",
          "flex items-center"
        )}
      >
        {icon && <span className="mr-1" aria-hidden="true">{icon}</span>}
        {label}
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} aria-label={`Filter by ${label}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {children}
        </SelectContent>
      </Select>
    </div>
  );
}

export function TaskFilterBar({
  filterStatus, setFilterStatus,
  filterPriority, setFilterPriority,
  filterCategory, setFilterCategory,
  filterTag, setFilterTag,
  sortBy, setSortBy
}: TaskFilterBarProps) {
  return (
    <div className={cn(
      "bg-white border border-gray-200 rounded-lg shadow-sm font-sans", // Appearance
      "p-4 mb-6", // Spacing
      "flex flex-col md:flex-row items-end gap-4" // Layout
    )}>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4 w-full">
        {/* Status Filter */}
        <FilterSelect
          id="filter-status"
          label="Status"
          icon={<Filter className="w-3 h-3" />}
          value={filterStatus}
          onValueChange={setFilterStatus}
          placeholder="All Status"
        >
          <SelectItem value="ALL">All Status</SelectItem>
          <SelectItem value="TODO">To Do</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="DONE">Done</SelectItem>
        </FilterSelect>

        {/* Priority Filter */}
        <FilterSelect
          id="filter-priority"
          label="Priority"
          value={filterPriority}
          onValueChange={setFilterPriority}
          placeholder="All Priority"
        >
          <SelectItem value="ALL">All Priority</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="LOW">Low</SelectItem>
        </FilterSelect>

        {/* Category Search */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="filter-category" className="text-xs font-semibold text-gray-500 uppercase">Category</label>
          <Input 
            id="filter-category"
            placeholder="Search category..." 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)} 
            aria-label="Search category"
            className="h-10"
          />
        </div>

        {/* Tag Search */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="filter-tag" className="text-xs font-semibold text-gray-500 uppercase text-indigo-600">Tag</label>
          <Input 
            id="filter-tag"
            placeholder="Search tag..." 
            value={filterTag} 
            onChange={(e) => setFilterTag(e.target.value)} 
            aria-label="Search tag"
            className={cn(
              "h-10 border-indigo-100",
              "focus:border-indigo-300 focus:ring-indigo-200"
            )}
          />
        </div>
      </div>
      
      {/* Sort Options */}
      <div className="w-full md:w-48 space-y-1.5 shrink-0 text-left">
        <label htmlFor="sort-tasks" className="text-xs font-semibold text-gray-500 uppercase flex items-center">
          <SortDesc className="w-3 h-3 mr-1" aria-hidden="true" /> Sort By
        </label>
        <Select value={sortBy} onValueChange={(val) => setSortBy(val as SortOption)}>
          <SelectTrigger id="sort-tasks" aria-label="Sort Tasks" className="h-10">
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
  );
}
