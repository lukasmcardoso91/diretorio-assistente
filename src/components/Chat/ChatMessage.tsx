import React from 'react';
import { User, Bot, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import type { ChatMessage as ChatMessageType } from '@/lib/types';
import { ActionSuggestion } from './ActionSuggestion';
import { DocumentSuggestion } from './DocumentSuggestion';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  const getIcon = () => {
    if (isUser) return <User className="h-4 w-4" />;
    if (isSystem) return <AlertTriangle className="h-4 w-4" />;
    return <Bot className="h-4 w-4" />;
  };

  const getMessageStyle = () => {
    if (isUser) return 'bg-chat-user text-primary-foreground ml-12';
    if (isSystem) return 'bg-chat-system text-foreground';
    return 'bg-chat-assistant text-foreground mr-12';
  };

  const getAvatarStyle = () => {
    if (isUser) return 'bg-primary text-primary-foreground ml-auto';
    if (isSystem) return 'bg-warning text-warning-foreground';
    return 'bg-primary text-primary-foreground';
  };

  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      {/* Avatar */}
      <div className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
        getAvatarStyle()
      )}>
        {getIcon()}
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-2">
        <Card className={cn('p-3', getMessageStyle())}>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown
              components={{
                // Customize markdown rendering
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-semibold mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-medium mb-1">{children}</h3>,
                code: ({ children }) => (
                  <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-muted p-2 rounded text-sm overflow-x-auto">
                    {children}
                  </pre>
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        </Card>

        {/* Action Blocks */}
        {message.blocks && message.blocks.length > 0 && (
          <div className="space-y-2">
            {message.blocks.map((block, index) => (
              <div key={index}>
                {block.type === 'action_suggestion' && (
                  <ActionSuggestion block={block} />
                )}
                {block.type === 'doc_suggestion' && (
                  <DocumentSuggestion block={block} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <div className={cn(
          'text-xs text-muted-foreground',
          isUser && 'text-right'
        )}>
          {new Date(message.createdAt).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
};