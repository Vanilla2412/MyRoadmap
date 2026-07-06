import React from 'react';
import { DraftSubtask } from '../hooks/useDecompose';
import { Button } from './ui/button';
import { Trash2, Plus, CalendarRange, Sparkles } from 'lucide-react';

interface DraftSubtaskListProps {
  drafts: DraftSubtask[];
  onUpdateDraft: (tempId: string, updated: Partial<DraftSubtask>) => void;
  onDeleteDraft: (tempId: string) => void;
}

export function DraftSubtaskList({
  drafts,
  onUpdateDraft,
  onDeleteDraft,
}: DraftSubtaskListProps) {
  if (drafts.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto py-12 text-center text-muted-foreground">
        <Sparkles className="mx-auto h-8 w-8 text-muted mb-3" />
        <p className="text-sm">No draft tasks available.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-4 space-y-4">
      <div className="border-b pb-2">
        <h3 className="text-base font-semibold tracking-tight text-foreground flex items-center gap-1.5">
          <Sparkles className="h-5 w-5 text-primary" />
          Preview and Adjust Generated Tasks
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          These are the AI-proposed tasks. You can adjust, edit, or delete them before saving.
        </p>
      </div>
      <div className="space-y-4">
        {drafts.map((subtask) => (
          <div
            key={subtask.tempId}
            className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm space-y-3 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {subtask.order}
              </div>
              <input
                type="text"
                className="flex-1 font-medium text-sm bg-transparent border-b border-transparent hover:border-input focus:border-primary focus:outline-none px-1 py-0.5 transition-colors"
                value={subtask.title}
                onChange={(e) => onUpdateDraft(subtask.tempId, { title: e.target.value })}
                placeholder="Enter subtask title"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => onDeleteDraft(subtask.tempId)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
            <div className="space-y-2">
              <textarea
                className="w-full text-xs bg-transparent border rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-y"
                rows={2}
                value={subtask.description || ''}
                onChange={(e) => onUpdateDraft(subtask.tempId, { description: e.target.value })}
                placeholder="Subtask description or steps (optional)"
              />
            </div>
            <div className="flex flex-wrap gap-4 items-center pt-1 border-t text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarRange className="h-3.5 w-3.5" />
                <span>Est:</span>
                <input
                  type="number"
                  min={1}
                  max={72}
                  className="w-12 bg-transparent border-b text-center focus:outline-none focus:border-primary focus:ring-0 px-1 py-0.5"
                  value={subtask.estimatedHours || ''}
                  onChange={(e) =>
                    onUpdateDraft(subtask.tempId, {
                      estimatedHours: e.target.value ? parseInt(e.target.value, 10) : undefined,
                    })
                  }
                />
                <span>hrs</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span>Priority:</span>
                <select
                  className="bg-transparent border-b focus:outline-none focus:border-primary py-0.5"
                  value={subtask.priority || 'medium'}
                  onChange={(e) =>
                    onUpdateDraft(subtask.tempId, {
                      priority: e.target.value as 'high' | 'medium' | 'low',
                    })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              {subtask.isEdited && (
                <span className="text-[10px] text-primary bg-primary/10 rounded px-1.5 py-0.5 ml-auto font-medium">
                  Edited
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
