# 🎯 AjudaDiretora - Secretária de Luxo para Educação Infantil

Uma aplicação web inteligente que atua como assistente virtual para diretoras e coordenadoras pedagógicas, oferecendo chat com IA, sistema de lembretes e geração de documentos educacionais.

## ✨ Funcionalidades

- 🤖 **Chat Inteligente**: Assistente virtual com respostas contextualizadas para educação infantil
- ⏰ **Sistema de Ações**: Lembretes e agendamentos com integração ao Google Calendar
- 📋 **Geração de Documentos**: Planos de festa, comunicados e checklists automatizados
- 🌙 **Tema Claro/Escuro**: Interface adaptável às preferências do usuário
- 📱 **PWA**: Instalável como app nativo no celular e desktop
- 🔒 **Privacidade**: Dados armazenados localmente, conformidade LGPD

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui + Lucide Icons
- **Estado**: React Query + Local Storage
- **Integração**: n8n (webhooks) + Mock system
- **PWA**: Service Worker + Web Manifest

## 📦 Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd ajudadiretora

# Instale as dependências
npm install

# Configure o ambiente
cp .env.example .env

# Inicie o desenvolvimento
npm run dev
```

## ⚙️ Configuração

### Modo Mock (Desenvolvimento)
Por padrão, a aplicação roda em modo mock com respostas simuladas:

```env
VITE_MOCK=true
```

### Integração com n8n (Produção)
Para usar com n8n real, configure:

```env
VITE_MOCK=false
VITE_CHAT_URL=http://localhost:5678/webhook/3aefcea5-b1f2-44ce-94bf-6faf62c0ee5d/chat
VITE_ACTIONS_URL=http://localhost:5678/webhook/actions
VITE_DOCS_URL=http://localhost:5678/webhook/docs
```

### Expor para Testes Externos

1. **Com ngrok**:
```bash
ngrok http 5173
# Use a URL do ngrok no VITE_ALLOWED_ORIGIN
```

2. **Com Cloudflare Tunnel**:
```bash
cloudflared tunnel --url http://localhost:5173
```

## 🎨 Design System

O projeto utiliza um design system customizado baseado em:
- **Primária**: Sky Blue (`#0ea5e9`)
- **Secundária**: Orange (`#f97316`)
- **Gradientes**: Suaves e profissionais
- **Animações**: Micro-interações elegantes
- **Responsivo**: Mobile-first approach

## 📱 PWA Features

- ✅ Instalável em dispositivos móveis e desktop
- ✅ Funciona offline (interface básica)
- ✅ Ícones e splash screens personalizados
- ✅ Shortcuts para ações principais
- ⏳ Sincronização em background (futuro)
- ⏳ Push notifications (futuro)

## 🧪 Scripts

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run lint         # Lint do código
npm run type-check   # Verificação de tipos
```

## 📂 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes base (shadcn)
│   ├── Chat/           # Interface de chat
│   ├── Layout/         # Layout da aplicação
│   └── LGPDConsent/    # Modal de consentimento
├── hooks/              # Hooks customizados
│   ├── useSession.ts   # Gerenciamento de sessão
│   ├── useChat.ts      # Lógica do chat
│   ├── useActions.ts   # Sistema de ações
│   └── useDocuments.ts # Geração de documentos
├── lib/                # Utilitários
│   ├── types.ts        # Definições de tipos
│   ├── config.ts       # Configuração da app
│   └── storage.ts      # LocalStorage helpers
├── mocks/              # Dados e respostas mock
├── pages/              # Páginas da aplicação
└── index.css           # Design system
```

## 🔄 Fluxo de Dados

1. **Sessão**: Criada no primeiro acesso, armazenada localmente
2. **Chat**: Mensagens processadas via hooks, integração n8n/mock
3. **Ações**: CRUD local + sincronização opcional com APIs
4. **Documentos**: Geração baseada em templates + IA (mock/real)

## 🧩 Extensibilidade

### Preparação para Capacitor

O projeto está estruturado para empacotamento futuro:

```bash
# Instalar Capacitor (quando necessário)
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android

# Inicializar
npx cap init ajudadiretora app.lovable.ajudadiretora

# Adicionar plataformas
npx cap add ios
npx cap add android

# Sincronizar
npm run build
npx cap sync
```

### Novas Integrações

- Google Calendar (OAuth via n8n)
- WhatsApp Business API
- Sistema de notificações push
- Backup em nuvem opcional

## 🛡️ Segurança & Privacidade

- ✅ **LGPD**: Consentimento explícito obrigatório
- ✅ **Local Storage**: Dados ficam no dispositivo
- ✅ **Headers CORS**: Configuração de origens permitidas
- ✅ **Sanitização**: Markdown seguro no chat
- ⏳ **Criptografia**: Para dados sensíveis (futuro)

## 📈 Métricas de Sucesso (MVP)

- [ ] Tarefa completa em ≤ 3 cliques pós-resposta do bot
- [ ] Documento + ação criados em < 2 minutos
- [ ] Zero bloqueios por CORS/configuração
- [ ] PWA instala sem erros
- [ ] Funciona offline (interface básica)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte:
- 📧 Email: suporte@ajudadiretora.app
- 📱 WhatsApp: (xx) xxxxx-xxxx
- 🌐 Website: https://ajudadiretora.app

---

**AjudaDiretora** - Transformando a gestão educacional com inteligência artificial 🎓✨