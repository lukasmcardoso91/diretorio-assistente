import type { DocumentFormData } from '../lib/types';

// Mock document templates
export const documentTemplates: Record<string, (data: DocumentFormData) => string> = {
  plano: (data) => `# ${data.title}

## 🎯 Objetivo
Proporcionar uma experiência educativa e divertida com o tema **${data.theme || 'temático'}** para ${data.audience || 'as crianças'}.

## 📅 Planejamento

### Preparação (1 semana antes)
- [ ] Definir decoração e materiais necessários
- [ ] Comunicar famílias sobre a festa
- [ ] Organizar cardápio temático
- [ ] Preparar atividades pedagógicas

### Atividades Principais
- **🎨 Oficina de Arte**: Criação de decorações temáticas
- **🎵 Música e Dança**: Playlist com músicas relacionadas ao tema
- **🎭 Dramatização**: Pequenas encenações e brincadeiras
- **📸 Registro**: Fotos e vídeos para memórias

### Cronograma do Dia
- **08h00**: Preparação do ambiente
- **09h00**: Acolhida com decoração especial
- **10h00**: Atividades temáticas em grupos
- **11h00**: Lanche temático
- **14h00**: Apresentações e brincadeiras
- **15h30**: Encerramento e despedida

## 📋 Materiais Necessários
- Decoração: papel crepom, balões, cartolinas
- Arte: tintas, pincéis, cola, papéis coloridos
- Som: caixa de som, microfone
- Lanche: ingredientes para receitas temáticas

## 👥 Envolvimento das Famílias
- Convite para participar das atividades
- Sugestão de fantasias (opcional)
- Compartilhamento de fotos e momentos

## ✅ Avaliação
- Observar engajamento das crianças
- Coletar feedback das famílias
- Registrar aprendizados para próximos eventos

---
*Plano elaborado em ${new Date().toLocaleDateString('pt-BR')} • Tom: ${data.tone || 'alegre e educativo'}*`,

  comunicado: (data) => `# ${data.title}

**Queridas Famílias,**

Esperamos que todos estejam bem! 

## 📢 Informações Importantes

${data.details || 'Gostaríamos de compartilhar algumas informações relevantes para o desenvolvimento educacional das crianças.'}

### 🎯 Objetivo
Esta comunicação visa manter vocês informados sobre as atividades e orientações pedagógicas da nossa escola.

### 📅 Cronograma
As atividades mencionadas seguirão o cronograma regular da escola, com possíveis ajustes que serão comunicados previamente.

### 👥 Como Podem Colaborar
- Participem ativamente das propostas
- Mantenham comunicação constante conosco
- Compartilhem suas dúvidas e sugestões

## 💡 Orientações Práticas
- Mantenham a rotina de casa alinhada com a escola
- Incentivem as crianças a compartilhar suas experiências
- Estejam disponíveis para conversas quando necessário

## 📞 Canais de Comunicação
- Presencial: durante os horários de entrada e saída
- WhatsApp da escola: para comunicações rápidas
- Reuniões: agendadas conforme necessidade

---

**Contamos com a parceria de vocês para continuar proporcionando o melhor desenvolvimento para nossas crianças!**

*Com carinho,*
**Equipe Pedagógica**

*Comunicado elaborado em ${new Date().toLocaleDateString('pt-BR')} • Público: ${data.audience || 'famílias'} • Tom: ${data.tone || 'acolhedor'}*`,

  checklist: (data) => `# ${data.title}

## ✅ Lista de Verificação

### 📋 Itens Principais

#### Antes da Atividade
- [ ] **Planejamento**: Objetivos definidos e atividades estruturadas
- [ ] **Materiais**: Todos os recursos necessários separados e organizados
- [ ] **Ambiente**: Espaço preparado e seguro para as crianças
- [ ] **Equipe**: Todos os profissionais orientados sobre suas funções

#### Durante a Atividade
- [ ] **Acolhida**: Receber as crianças com carinho e atenção
- [ ] **Segurança**: Manter supervisão constante e ambiente seguro
- [ ] **Engajamento**: Estimular participação de todas as crianças
- [ ] **Flexibilidade**: Adaptar conforme necessidade do grupo

#### Após a Atividade
- [ ] **Organização**: Guardar materiais e organizar o espaço
- [ ] **Registro**: Documentar observações e aprendizados
- [ ] **Comunicação**: Informar famílias sobre pontos relevantes
- [ ] **Avaliação**: Refletir sobre pontos de melhoria

### 📊 Critérios de Qualidade
- [ ] Objetivos pedagógicos alcançados
- [ ] Crianças demonstraram interesse e participação
- [ ] Ambiente mantido seguro durante toda atividade
- [ ] Comunicação clara com famílias

### 📝 Observações Importantes
${data.details || 'Registre aqui observações específicas, adaptações necessárias ou pontos de atenção para próximas atividades.'}

### 🔄 Próximos Passos
- [ ] Planejar atividade de continuidade
- [ ] Preparar materiais para próxima semana
- [ ] Agendar conversa com famílias (se necessário)
- [ ] Documentar aprendizados no relatório pedagógico

---
*Checklist elaborado em ${new Date().toLocaleDateString('pt-BR')} • Público: ${data.audience || 'equipe pedagógica'} • Foco: ${data.theme || 'organização geral'}*`
};

// Mock document generation with delay
export const generateMockDocument = async (data: DocumentFormData): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate processing
  
  const template = documentTemplates[data.type];
  if (!template) {
    throw new Error(`Template não encontrado para o tipo: ${data.type}`);
  }
  
  return template(data);
};