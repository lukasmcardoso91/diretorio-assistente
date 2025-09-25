import type { ChatResponse, Block } from '../lib/types';

// Mock responses for different types of queries
export const mockChatResponses: Record<string, ChatResponse> = {
  default: {
    message: `Olá! 👋 Sou sua assistente virtual para educação infantil. 

Como posso ajudá-la hoje? Posso auxiliar com:

- 📋 **Comunicados e avisos** para famílias
- 🎉 **Planejamento de eventos** e festas temáticas  
- ⏰ **Organização de rotinas** e horários
- 🍎 **Orientações sobre alimentação** e cuidados
- 👥 **Processos de matrícula** e documentação

Digite sua dúvida ou escolha uma das opções rápidas abaixo!`,
    blocks: [
      {
        type: 'action_suggestion',
        title: 'Agendar reunião com famílias',
        defaultDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },

  matricula: {
    message: `# 👥 Processo de Matrícula

Aqui estão as **orientações principais** para matrículas:

## Documentos Necessários:
- Certidão de nascimento (original + cópia)
- Carteira de vacinação atualizada
- Comprovante de residência
- RG e CPF dos responsáveis
- Fotos 3x4 da criança

## Cronograma Sugerido:
1. **Reunião de apresentação** da escola
2. **Entrega da documentação**
3. **Período de adaptação** (1-2 semanas)
4. **Acompanhamento inicial** com famílias

Gostaria que eu prepare um **comunicado sobre matrículas** ou um **checklist** para organizar o processo?`,
    blocks: [
      {
        type: 'doc_suggestion',
        title: 'Gerar comunicado sobre matrículas',
        docType: 'comunicado',
      },
      {
        type: 'action_suggestion',
        title: 'Agendar período de matrículas',
        defaultDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },

  eventos: {
    message: `# 🎃 Festa de Halloween - Planejamento Completo

Que ótima ideia! Vou te ajudar com um **plano detalhado** para o Halloween:

## Sugestões de Atividades:
- 👻 **Oficina de fantasias** (materiais recicláveis)
- 🎨 **Decoração colaborativa** com as crianças
- 🍭 **Mesa temática** com guloseimas saudáveis
- 📸 **Cantinho da foto** com cenário assombrado
- 🎵 **Playlist temática** infantil

## Comunicação com Famílias:
- Avisar sobre fantasias (opcional)
- Informar sobre alimentos e restrições
- Convidar para participar das atividades

Posso **gerar o plano completo** e **agendar lembretes** para você!`,
    blocks: [
      {
        type: 'doc_suggestion',
        title: 'Gerar plano completo da festa de Halloween',
        docType: 'plano',
      },
      {
        type: 'action_suggestion',
        title: 'Lembrete: enviar comunicado para famílias',
        defaultDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },

  comunicados: {
    message: `# 📋 Comunicados Eficazes

Para **comunicações delicadas** com famílias, algumas dicas importantes:

## Tom e Linguagem:
- ✅ **Acolhedor e respeitoso**
- ✅ **Linguagem clara e objetiva**
- ✅ **Foco na parceria escola-família**

## Estrutura Recomendada:
1. **Saudação calorosa**
2. **Contexto da situação**
3. **Orientações práticas**
4. **Abertura para diálogo**
5. **Agradecimento e despedida**

## Temas Comuns:
- Questões comportamentais
- Mudanças na rotina
- Orientações pedagógicas
- Eventos e atividades

Quer que eu **redija um comunicado específico** para você?`,
    blocks: [
      {
        type: 'doc_suggestion',
        title: 'Criar comunicado personalizado',
        docType: 'comunicado',
      }
    ]
  },

  alimentacao: {
    message: `# 🍎 Orientações sobre Alimentação Escolar

## Diretrizes Nutricionais:
- **Variedade** de cores e texturas
- **Frutas da estação** sempre presentes
- **Redução de açúcar** e processados
- **Água** como bebida principal

## Sugestões de Cardápio:
- **Segunda**: Arroz, feijão, frango desfiado, cenoura
- **Terça**: Macarrão integral, molho de tomate, carne moída
- **Quarta**: Purê de batata, peixe grelhado, salada
- **Quinta**: Risoto de abóbora, frango, brócolis
- **Sexta**: Pizza caseira com vegetais

## Alergias e Restrições:
- Manter **cadastro atualizado**
- **Alternativas** sempre disponíveis
- **Comunicação clara** com cozinha

Precisa de um **cardápio detalhado** ou **comunicado nutricional**?`,
    blocks: [
      {
        type: 'doc_suggestion',
        title: 'Gerar cardápio semanal',
        docType: 'plano',
      },
      {
        type: 'action_suggestion',
        title: 'Revisar fichas de alergias alimentares',
        defaultDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ]
  },

  horarios: {
    message: `# ⏰ Organização de Horários e Rotinas

## Estrutura Diária Sugerida:

**07h30 - 08h30**: Acolhida e atividades livres
**08h30 - 09h00**: Roda de conversa e chamada
**09h00 - 10h00**: Atividade dirigida principal
**10h00 - 10h15**: Lanche da manhã
**10h15 - 11h15**: Atividades ao ar livre
**11h15 - 12h00**: Higiene e preparação para almoço
**12h00 - 13h00**: Almoço
**13h00 - 14h00**: Descanso/sono
**14h00 - 15h00**: Atividades pedagógicas
**15h00 - 15h15**: Lanche da tarde
**15h15 - 16h30**: Atividades livres e saída

## Dicas para Transições:
- **Músicas** para cada momento
- **Sinais visuais** e sonoros
- **Rotina flexível** mas consistente

Quer um **cronograma personalizado** para sua turma?`,
    blocks: [
      {
        type: 'doc_suggestion',
        title: 'Criar cronograma personalizado',
        docType: 'plano',
      }
    ]
  }
};

// Simulate API delay
export const simulateDelay = (ms: number = 800): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Generate mock response based on message content
export const generateMockResponse = async (message: string): Promise<ChatResponse> => {
  await simulateDelay();
  
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('matricula') || lowerMessage.includes('matrícula')) {
    return mockChatResponses.matricula;
  }
  
  if (lowerMessage.includes('halloween') || lowerMessage.includes('festa') || lowerMessage.includes('evento')) {
    return mockChatResponses.eventos;
  }
  
  if (lowerMessage.includes('comunicado') || lowerMessage.includes('avisar') || lowerMessage.includes('família')) {
    return mockChatResponses.comunicados;
  }
  
  if (lowerMessage.includes('alimentação') || lowerMessage.includes('comida') || lowerMessage.includes('lanche')) {
    return mockChatResponses.alimentacao;
  }
  
  if (lowerMessage.includes('horário') || lowerMessage.includes('rotina') || lowerMessage.includes('cronograma')) {
    return mockChatResponses.horarios;
  }
  
  return mockChatResponses.default;
};