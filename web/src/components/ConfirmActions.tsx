import React from 'react';
import { Button } from './ui/button';
import { Loader2, Check, X } from 'lucide-react';

interface ConfirmActionsProps {
  onConfirm: () => Promise<void>;
  onDiscard: () => void;
  isConfirming: boolean;
}

export function ConfirmActions({
  onConfirm,
  onDiscard,
  isConfirming,
}: ConfirmActionsProps) {
  return (
    <div className="w-full max-w-2xl mx-auto py-4 px-4 border-t flex items-center justify-between gap-4">
      <Button
        variant="ghost"
        onClick={onDiscard}
        disabled={isConfirming}
        className="text-muted-foreground hover:text-foreground"
      >
        <X className="mr-2 h-4 w-4" />
        Discard All
      </Button>
      <Button
        onClick={onConfirm}
        disabled={isConfirming}
        className="shadow-sm"
      >
        {isConfirming ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving to Roadmap...
          </>
        ) : (
          <>
            <Check className="mr-2 h-4 w-4" />
            Confirm and Save to Roadmap
          </>
        )}
      </Button>
    </div>
  );
}
