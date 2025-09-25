import { useState } from 'react';
import { Check, Shield, Eye, Lock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useSession } from '@/hooks/useSession';

interface LGPDModalProps {
  open: boolean;
}

export const LGPDModal = ({ open }: LGPDModalProps) => {
  const { updateSession } = useSession();
  const [consent, setConsent] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleAccept = () => {
    updateSession({
      consentLGPD: true,
      userName: userName.trim() || undefined,
      userEmail: userEmail.trim() || undefined,
    });
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-hero">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <DialogTitle className="text-xl">Bem-vinda ao AjudaDiretora!</DialogTitle>
          <DialogDescription className="text-base">
            Sua privacidade é importante para nós. Leia as informações abaixo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Privacy Information */}
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Lock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-medium mb-1">Dados Locais</p>
                <p className="text-muted-foreground text-xs">
                  Suas conversas ficam armazenadas apenas no seu dispositivo
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Eye className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-medium mb-1">Transparência</p>
                <p className="text-muted-foreground text-xs">
                  Não compartilhamos informações pessoais com terceiros
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Optional Information */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Informações Opcionais</h4>
            <p className="text-xs text-muted-foreground">
              Ajude-nos a personalizar sua experiência:
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs">Nome (opcional)</Label>
              <Input
                id="name"
                placeholder="Ex: Maria Silva"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="h-9"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs">Email (opcional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ex: maria@escola.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="h-9"
              />
            </div>
          </div>

          <Separator />

          {/* Consent */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked === true)}
              className="mt-0.5"
            />
            <Label htmlFor="consent" className="text-sm leading-relaxed">
              Concordo com o processamento dos meus dados conforme descrito acima 
              e autorizo o uso do assistente virtual.
            </Label>
          </div>

          <Button
            onClick={handleAccept}
            disabled={!consent}
            variant="hero"
            size="lg"
            className="w-full"
          >
            <Check className="h-4 w-4 mr-2" />
            Começar a usar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};