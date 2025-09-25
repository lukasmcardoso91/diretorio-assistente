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

  const handleScheduleAction = async () => {
    try {
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
        description: 'Não foi possível criar a ação. Tente novamente.',
        variant: 'destructive',
      });
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
          className="shrink-0"
        >
          <Plus className="h-3 w-3 mr-1" />
          Agendar agora
        </Button>
      </div>
    </Card>
  );
};