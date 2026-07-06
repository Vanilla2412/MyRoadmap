import React from 'react';
import { DraftSubtask } from '../hooks/useDecompose';
import { Sparkles, CalendarRange } from 'lucide-react';

interface StreamingPreviewProps {
  drafts: DraftSubtask[];
}

export function StreamingPreview({ drafts }: StreamingPreviewProps) {
  if (drafts.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto py-12 text-center text-muted-foreground animate-pulse">
        <Sparkles className="mx-auto h-8 w-8 text-primary mb-3" />
        <p className="text-sm">AI is drafting subtask proposals...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-4 space-y-4">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-primary animate-spin" />
          Proposed Subtasks ({drafts.length})
        </h3>
        <span className="text-xs text-muted-foreground">Streaming in real-time...</span>
      </div>
      <div className="space-y-3">
        {drafts.map((subtask) => (
          <div
            key={subtask.tempId}
            className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm flex items-start gap-3 transition-all duration-300 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {subtask.order}
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <h4 className="text-sm font-medium leading-none truncate">{subtask.title}</h4>
              {subtask.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">{subtask.description}</p>
              )}
              <div className="flex gap-2 pt-1.5">
                {subtask.estimatedHours && (
                  <span className="inline-flex items-center gap-1 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">
                    <CalendarRange className="h-3 w-3" />
                    {subtask.estimatedHours} hrs
                  </span>
                )}
                {subtask.priority && (
                  <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium capitalize ${
                    subtask.priority === 'high'
                      ? 'bg-destructive/10 text-destructive'
                      : subtask.priority === 'medium'
                      ? 'bg-amber-500/10 text-amber-500'
                      : 'bg-green-500/10 text-green-500'
                  }`}>
                    {subtask.priority}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
