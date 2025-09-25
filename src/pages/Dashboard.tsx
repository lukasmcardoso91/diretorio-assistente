import { useSession } from '@/hooks/useSession';
import { LGPDModal } from '@/components/LGPDConsent/LGPDModal';
import { ChatInterface } from '@/components/Chat/ChatInterface';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, CheckSquare } from 'lucide-react';

export const Dashboard = () => {
  const { session, loading } = useSession();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 w-8 rounded-full bg-gradient-hero mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* LGPD Consent Modal */}
      <LGPDModal open={!session?.consentLGPD} />

      {/* Main Content */}
      {session?.consentLGPD && (
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              {session.userName ? `Olá, ${session.userName}!` : 'Bem-vinda!'}
            </h1>
            <p className="text-muted-foreground text-lg">
              Sua secretária de luxo está pronta para ajudar
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 text-center hover:shadow-lg transition-all cursor-pointer">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Ações & Lembretes</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Organize suas tarefas e compromissos
              </p>
              <Button variant="outline" size="sm">
                Ver ações
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all cursor-pointer">
              <FileText className="h-8 w-8 text-secondary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Documentos</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Gere planos, comunicados e checklists
              </p>
              <Button variant="secondary" size="sm">
                Criar documento
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all cursor-pointer">
              <CheckSquare className="h-8 w-8 text-success mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Histórico</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Acesse conversas e atividades passadas
              </p>
              <Button variant="outline" size="sm">
                Ver histórico
              </Button>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="max-w-4xl mx-auto">
            <ChatInterface />
          </div>
        </div>
      )}
    </div>
  );
};