import { describe, it, expect } from 'vitest';
import { taskSchema } from './validations';

describe('taskSchema', () => {
  describe('title', () => {
    it('should fail validation when title is empty', () => {
      const result = taskSchema.safeParse({ title: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Title is required');
      }
    });

    it('should pass validation with a title of 1 character (lower boundary)', () => {
      const result = taskSchema.safeParse({ title: 'A' });
      expect(result.success).toBe(true);
    });

    it('should pass validation with a title of 100 characters (upper boundary)', () => {
      const result = taskSchema.safeParse({ title: 'A'.repeat(100) });
      expect(result.success).toBe(true);
    });

    it('should fail validation when title exceeds 100 characters', () => {
      const result = taskSchema.safeParse({ title: 'A'.repeat(101) });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Title is too long');
      }
    });
  });

  describe('status', () => {
    it('should default to "TODO" if status is not provided', () => {
      const result = taskSchema.safeParse({ title: 'My Task' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe('TODO');
      }
    });

    // it.each: each value runs as a separate test case, making it easy to pinpoint
    // exactly which enum value failed without having to inspect the loop state.
    it.each(['TODO', 'IN_PROGRESS', 'DONE'] as const)(
      'should accept valid status "%s"',
      (status) => {
        const result = taskSchema.safeParse({ title: 'My Task', status });
        expect(result.success).toBe(true);
      },
    );

    it('should fail validation for an invalid status value', () => {
      const result = taskSchema.safeParse({ title: 'My Task', status: 'INVALID' });
      expect(result.success).toBe(false);
    });
  });

  describe('priority', () => {
    // it.each: each of the three valid values is reported as a separate test entry.
    it.each(['LOW', 'MEDIUM', 'HIGH'] as const)(
      'should accept valid priority "%s"',
      (priority) => {
        const result = taskSchema.safeParse({ title: 'My Task', priority });
        expect(result.success).toBe(true);
      },
    );

    it('should fail validation for an invalid priority value', () => {
      const result = taskSchema.safeParse({ title: 'My Task', priority: 'CRITICAL' });
      expect(result.success).toBe(false);
    });

    it('should pass validation when priority is not provided (optional)', () => {
      const result = taskSchema.safeParse({ title: 'My Task' });
      expect(result.success).toBe(true);
    });
  });

  describe('dueDate', () => {
    it('should pass when dueDate is a valid ISO 8601 date string', () => {
      const result = taskSchema.safeParse({ title: 'My Task', dueDate: '2025-12-31' });
      expect(result.success).toBe(true);
    });

    it('should pass when dueDate is not provided (optional)', () => {
      const result = taskSchema.safeParse({ title: 'My Task' });
      expect(result.success).toBe(true);
    });

    // NOTE: taskSchema uses z.string().optional() for dueDate, which means
    // any non-empty string is accepted at the schema level.
    // Date format validation ("not-a-date" should fail) would require
    // z.string().datetime() or a custom refine(). This test documents
    // the CURRENT behavior and flags it as a future improvement.
    it('should currently PASS for an invalid date string (schema accepts any string — future improvement)', () => {
      const result = taskSchema.safeParse({ title: 'My Task', dueDate: 'not-a-date' });
      // This passes today because the schema doesn't enforce date format.
      // TODO: Consider z.string().regex(/^\d{4}-\d{2}-\d{2}$/) to enforce ISO format.
      expect(result.success).toBe(true);
    });
  });
});
