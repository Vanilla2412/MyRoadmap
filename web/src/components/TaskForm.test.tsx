import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskForm } from './TaskForm';

// --- Types ---

interface SelectContextValue {
  onValueChange: (value: string) => void;
  defaultValue?: string;
  children: React.ReactNode;
}

interface SelectProps {
  children: React.ReactNode;
  onValueChange: (value: string) => void;
  defaultValue?: string;
}

interface SelectTriggerProps {
  id?: string;
  children: React.ReactNode;
}

// --- Mocks ---

// Use vi.hoisted to ensure SelectContext is available before vi.mock
const { SelectContext } = vi.hoisted(() => ({
  SelectContext: React.createContext<SelectContextValue | null>(null),
}));

vi.mock('./ui/select', () => {
  return {
    Select: ({ children, onValueChange, defaultValue }: SelectProps) => {
      return (
        <SelectContext.Provider value={{ onValueChange, defaultValue, children }}>
          <div data-testid="select-mock-container">{children}</div>
        </SelectContext.Provider>
      );
    },
    SelectTrigger: ({ id, children }: SelectTriggerProps) => {
      const ctx = React.useContext(SelectContext);
      if (!ctx) return null;
      const { onValueChange, defaultValue, children: selectChildren } = ctx;
      
      const findOptions = (nodes: React.ReactNode): React.ReactElement[] => {
        return React.Children.toArray(nodes).reduce((acc: React.ReactElement[], child: React.ReactNode) => {
          if (!child || typeof child !== 'object') return acc;
          
          if ('props' in child) {
            const element = child as React.ReactElement<{ value?: string; children?: React.ReactNode }>;
            if (element.props.value !== undefined && element.props.children !== undefined) {
              // Likely a SelectItem
              return [...acc, <option key={element.props.value} value={element.props.value}>{element.props.children}</option>];
            }
            if (element.props.children) {
              return [...acc, ...findOptions(element.props.children)];
            }
          }
          return acc;
        }, []);
      };

      return (
        <select 
          id={id} 
          defaultValue={defaultValue} 
          onChange={(e) => onValueChange(e.target.value)}
        >
          {children}
          {findOptions(selectChildren)}
        </select>
      );
    },
    SelectValue: ({ placeholder }: { placeholder?: string }) => <option value="" disabled>{placeholder}</option>,
    SelectContent: () => null,
    SelectItem: () => null,
  };
});

describe('TaskForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    onSubmit: mockOnSubmit,
    isSubmitting: false,
    submitLabel: 'Create Task',
    onCancel: mockOnCancel,
  };

  describe('Validation', () => {
    it('should show validation error when title is empty and form is submitted', async () => {
      const user = userEvent.setup();
      render(<TaskForm {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /create task/i }));

      // Message defined in taskSchema: 'Title is required'
      expect(await screen.findByText(/Title is required/i)).toBeInTheDocument();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit with form values when valid', async () => {
      const user = userEvent.setup();
      render(<TaskForm {...defaultProps} />);

      await user.type(screen.getByLabelText(/title/i), 'New Feature');
      await user.type(screen.getByLabelText(/description/i), 'Implementing tests');
      
      await user.selectOptions(screen.getByLabelText(/priority/i), 'HIGH');
      
      await user.click(screen.getByRole('button', { name: /create task/i }));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      });
      
      const submittedValues = mockOnSubmit.mock.calls[0][0];
      expect(submittedValues.title).toBe('New Feature');
      expect(submittedValues.priority).toBe('HIGH');
    });

    it('should disable fields and buttons when isSubmitting is true', () => {
      render(<TaskForm {...defaultProps} isSubmitting={true} />);

      expect(screen.getByLabelText(/title/i)).toBeDisabled();
      expect(screen.getByRole('button', { name: /saving\.\.\./i })).toBeDisabled();
    });
  });

  describe('Subtasks', () => {
    it('should allow adding and removing subtasks', async () => {
      const user = userEvent.setup();
      render(<TaskForm {...defaultProps} />);

      const addButton = screen.getByRole('button', { name: /add subtask/i });
      
      await user.click(addButton);
      expect(screen.getByPlaceholderText(/subtask 1/i)).toBeInTheDocument();

      await user.click(addButton);
      expect(screen.getByPlaceholderText(/subtask 2/i)).toBeInTheDocument();

      await user.type(screen.getByPlaceholderText(/subtask 1/i), 'First subtask');
      
      const removeButtons = screen.getAllByRole('button').filter(btn => btn.querySelector('svg.text-red-500'));
      await user.click(removeButtons[0]);

      expect(screen.queryByPlaceholderText(/subtask 2/i)).not.toBeInTheDocument();
      expect(screen.getByPlaceholderText(/subtask 1/i)).toBeInTheDocument();
    });
  });

  describe('Cancel', () => {
    it('should call onCancel when cancel button is clicked', async () => {
      const user = userEvent.setup();
      render(<TaskForm {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /cancel/i }));
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });
});
