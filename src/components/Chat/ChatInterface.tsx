import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useChat } from '@/hooks/useChat';
import { useSession } from '@/hooks/useSession';
import { ChatMessage } from './ChatMessage';
import { QuickActionChips } from './QuickActionChips';
import { LoadingIndicator } from './LoadingIndicator';
import { N8nResponseCard } from './N8nResponseCard';
import { QUICK_ACTIONS } from '@/lib/config';
import { toast } from '@/hooks/use-toast';

export const ChatInterface = () => {
  const { session } = useSession();
  const { messages, loading, sendMessage } = useChat(session?.sessionId || '');
  const [input, setInput] = useState('');
  const [n8nLoading, setN8nLoading] = useState(false);
  const [n8nResponse, setN8nResponse] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // N8n integration
  const callN8n = async (payload: any) => {
    console.log('N8N Integration active - calling webhook...');
    const response = await fetch("https://attentional-beld-ellsworth.ngrok-free.dev/webhook/3aefcea5-b1f2-44ce-94bf-6faf62c0ee5d/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // "Authorization": "Basic " + btoa("lovable:segredo123") // Uncomment if Basic Auth needed
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }
    
    return response.json();
  };

  const handleSend = async () => {
    if (!input.trim() || loading || n8nLoading || !session) return;
    
    const message = input.trim();
    setInput('');
    
    // Send to n8n
    setN8nLoading(true);
    try {
      const data = await callN8n({
        userId: "demo",
        message: message,
        context: {
          origin: "lovable",
          section: "chat"
        }
      });
      setN8nResponse(data);
    } catch (error) {
      console.log("Erro na comunicação:", String(error));
    } finally {
      setN8nLoading(false);
    }
    
    // Also send to local chat system
    await sendMessage(message, session.userName, session.userEmail);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (actionId: string) => {
    const action = QUICK_ACTIONS.find(a => a.id === actionId);
    if (action) {
      setInput(action.label);
      setTimeout(() => handleSend(), 100);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando sessão...</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="flex flex-col h-[600px] bg-gradient-card border-border/50">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-card">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-hero">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">Assistente Virtual</h3>
          <p className="text-sm text-muted-foreground">
            Como posso ajudá-la hoje?
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          {loading ? 'Digitando...' : 'Online'}
        </Badge>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground text-lg mb-2">
                Olá! 👋 Sou sua assistente virtual
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Digite uma mensagem ou escolha uma ação rápida abaixo
              </p>
              <QuickActionChips onAction={handleQuickAction} />
            </div>
          )}
          
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {n8nResponse && (
            <N8nResponseCard response={n8nResponse} />
          )}
          
          {(loading || n8nLoading) && <LoadingIndicator />}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            disabled={loading}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || loading || n8nLoading}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {messages.length > 0 && (
          <div className="mt-2">
            <QuickActionChips onAction={handleQuickAction} compact />
          </div>
        )}
      </div>
    </Card>
  );
};