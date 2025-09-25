import { Bot } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const LoadingIndicator = () => {
  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Bot className="h-4 w-4" />
      </div>

      {/* Loading Message */}
      <div className="flex-1 mr-12">
        <Card className="bg-chat-assistant text-foreground p-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
            </div>
            <span className="text-sm text-muted-foreground">
              Assistente está digitando...
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};