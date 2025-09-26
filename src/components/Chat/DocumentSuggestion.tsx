import React, { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Block } from '@/lib/types';
// import { toast } from '@/hooks/use-toast';

interface DocumentSuggestionProps {
  block: Block;
}

export const DocumentSuggestion = ({ block }: DocumentSuggestionProps) => {
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

  const handleGenerateDocument = async () => {
    setLoading(true);
    try {
      // Send to n8n
      await callN8n({
        userId: "demo",
        intent: "GERAR_DOCUMENTO",
        topic: block.title || "Festa de Halloween",
        context: {
          origin: "lovable",
          section: "documentos"
        }
      });

      console.log('✅ Documento solicitado!', `Geração do documento "${block.title}" foi enviada para processamento.`);

      // Also trigger local event
      const event = new CustomEvent('openDocumentGenerator', {
        detail: {
          type: block.docType,
          title: block.title,
          ...block.payload,
        },
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.log('❌ Erro ao gerar documento:', String(error));
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
          className="shrink-0"
        >
          <Plus className="h-3 w-3 mr-1" />
          Gerar documento
        </Button>
      </div>
    </Card>
  );
};