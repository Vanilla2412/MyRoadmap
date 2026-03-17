import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('bg-red-500', 'p-4')).toBe('bg-red-500 p-4');
  });

  it('handles conditional classes', () => {
    expect(cn('bg-red-500', true && 'p-4', false && 'm-2')).toBe('bg-red-500 p-4');
  });

  it('merges tailwind classes correctly using tailwind-merge', () => {
    // p-2 and p-4 should merge to p-4
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
});
