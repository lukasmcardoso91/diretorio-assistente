import { Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Conteúdo curado por</span>
          <a
            href="https://instagram.com/eukarinacardoso"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:text-primary-glow transition-colors flex items-center gap-1"
          >
            Karina Cardoso
            <Instagram className="h-4 w-4" />
          </a>
          <span>— @eukarinacardoso</span>
        </div>
      </div>
    </footer>
  );
};