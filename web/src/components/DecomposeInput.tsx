import React, { useState } from 'react';
import { Button } from './ui/button';
import { Loader2, Sparkles } from 'lucide-react';

interface DecomposeInputProps {
  onDecompose: (epicText: string) => Promise<void>;
  isLoading: boolean;
}

export function DecomposeInput({ onDecompose, isLoading }: DecomposeInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    await onDecompose(text);
  };

  return (
    <div className="w-full py-6 border-b bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-4 space-y-3">
        <div className="space-y-1">
          <label htmlFor="epic-input" className="text-sm font-semibold tracking-tight text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            AI Task Decomposition (Epic Input)
          </label>
          <textarea
            id="epic-input"
            rows={3}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            placeholder="Enter a learning goal or a large task to decompose (e.g., Master basic Python for data analysis in 2 weeks)..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!text.trim() || isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Decomposing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Decompose Tasks
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
