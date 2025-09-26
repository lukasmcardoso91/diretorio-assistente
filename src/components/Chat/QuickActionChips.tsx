import React from 'react';
import { Button } from '@/components/ui/button';
import { QUICK_ACTIONS } from '@/lib/config';
import { cn } from '@/lib/utils';

interface QuickActionChipsProps {
  onAction: (actionId: string) => void;
  compact?: boolean;
}

export const QuickActionChips = ({ onAction, compact = false }: QuickActionChipsProps) => {
  return (
    <div className={cn(
      'flex flex-wrap gap-2',
      compact ? 'justify-start' : 'justify-center'
    )}>
      {QUICK_ACTIONS.map((action) => (
        <Button
          key={action.id}
          variant="outline"
          size={compact ? 'sm' : 'default'}
          onClick={() => onAction(action.id)}
          className={cn(
            'transition-all hover:scale-105 hover:shadow-md',
            !compact && 'h-12 px-4'
          )}
        >
          <span className="mr-2 text-base">{action.icon}</span>
          <span className={compact ? 'text-xs' : 'text-sm'}>
            {action.label}
          </span>
        </Button>
      ))}
    </div>
  );
};