import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Block } from '@/lib/types';

interface DocumentSuggestionProps {
  block: Block;
}

export const DocumentSuggestion = ({ block }: DocumentSuggestionProps) => {
  const handleGenerateDocument = () => {
    // This will be handled by a modal or navigation
    // For now, we'll use an event or callback
    const event = new CustomEvent('openDocumentGenerator', {
      detail: {
        type: block.docType,
        title: block.title,
        ...block.payload,
      },
    });
    window.dispatchEvent(event);
  };

  const getDocTypeLabel = (type: string) => {
    switch (type) {
      case 'plano': return 'Plano';
      case 'comunicado': return 'Comunicado';
      case 'checklist': return 'Checklist';
      default: return 'Documento';
    }
  };

  return (
    <Card className="border-secondary/20 bg-secondary/10 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">
              Sugestão de Documento
            </span>
            {block.docType && (
              <Badge variant="secondary" className="text-xs">
                {getDocTypeLabel(block.docType)}
              </Badge>
            )}
          </div>
          <p className="text-sm text-foreground">
            {block.title}
          </p>
        </div>
        
        <Button
          size="sm"
          variant="secondary"
          onClick={handleGenerateDocument}
          className="shrink-0"
        >
          <Plus className="h-3 w-3 mr-1" />
          Gerar documento
        </Button>
      </div>
    </Card>
  );
};