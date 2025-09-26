import React, { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Block } from '@/lib/types';
import { useActions } from '@/hooks/useActions';
import { toast } from '@/hooks/use-toast';

interface ActionSuggestionProps {
  block: Block;
}

export const ActionSuggestion = ({ block }: ActionSuggestionProps) => {
  const { createAction } = useActions();
  const [loading, setLoading] = useState(false);

  // N8n integration
  const callN8n = async (payload: any) => {
    const response = await fetch("https://attentional-beld-ellsworth.ngrok-free.dev/webhook/3aefcea5-b1f2-44ce-94bf-6faf62c0ee5d/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }
    
    return response.json();
  };

  const handleScheduleAction = async () => {
    setLoading(true);
    try {
      // Send to n8n
      const suggestedDate = block.defaultDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      await callN8n({
        userId: "demo",
        intent: "AGENDAR_LEMBRETE",
        reminder: block.title,
        suggestedDate: suggestedDate,
        context: {
          origin: "lovable",
          section: "acoes"
        }
      });

      // Also create local action
      const dueDate = block.defaultDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      
      await createAction({
        title: block.title,
        dueAt: dueDate,
        status: 'scheduled',
        source: 'chat_suggestion',
        notes: `Ação sugerida pelo assistente virtual`,
      });

      toast({
        title: '✅ Ação agendada!',
        description: `"${block.title}" foi adicionada aos seus lembretes.`,
      });
    } catch (error) {
      toast({
        title: '❌ Erro ao agendar',
        description: String(error),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-action-scheduled p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Sugestão de Ação
            </span>
          </div>
          <p className="text-sm text-foreground mb-2">
            {block.title}
          </p>
          {block.defaultDate && (
            <p className="text-xs text-muted-foreground">
              Data sugerida: {new Date(block.defaultDate).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
        
        <Button
          size="sm"
          onClick={handleScheduleAction}
          disabled={loading}
          className="shrink-0"
        >
          <Plus className="h-3 w-3 mr-1" />
          Agendar agora
        </Button>
      </div>
    </Card>
  );
};