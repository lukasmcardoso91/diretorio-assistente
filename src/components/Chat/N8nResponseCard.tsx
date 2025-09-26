import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface N8nResponse {
  title?: string;
  message?: string;
  steps?: string[];
  status?: 'success' | 'error' | 'info';
}

interface N8nResponseCardProps {
  response: N8nResponse;
}

export const N8nResponseCard = ({ response }: N8nResponseCardProps) => {
  const getStatusIcon = () => {
    switch (response.status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusBadge = () => {
    switch (response.status) {
      case 'success':
        return <Badge className="bg-success text-success-foreground">Sucesso</Badge>;
      case 'error':
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="secondary">Resposta</Badge>;
    }
  };

  return (
    <Card className="border-primary/20 bg-card p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="font-semibold text-primary">
              Resposta do Assistente
            </span>
          </div>
          {getStatusBadge()}
        </div>

        {response.title && (
          <h3 className="font-semibold text-foreground">
            {response.title}
          </h3>
        )}

        {response.message && (
          <p className="text-sm text-foreground">
            {response.message}
          </p>
        )}

        {response.steps && response.steps.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Próximos passos:
            </h4>
            <ul className="space-y-1">
              {response.steps.map((step, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-medium">
                    {index + 1}.
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};