import type { AppConfig } from './types';

// Environment configuration with defaults
export const config: AppConfig = {
  mockMode: import.meta.env.VITE_MOCK === 'true' || import.meta.env.VITE_MOCK === undefined,
  chatUrl: import.meta.env.VITE_CHAT_URL || 'http://localhost:5678/webhook/3aefcea5-b1f2-44ce-94bf-6faf62c0ee5d/chat',
  actionsUrl: import.meta.env.VITE_ACTIONS_URL || 'http://localhost:5678/webhook/placeholder/actions',
  docsUrl: import.meta.env.VITE_DOCS_URL || 'http://localhost:5678/webhook/placeholder/docs',
  authGoogleUrl: import.meta.env.VITE_AUTH_GOOGLE_URL || '',
  headers: parseHeaders(import.meta.env.VITE_HEADERS_JSON || '{}'),
  allowedOrigin: import.meta.env.VITE_ALLOWED_ORIGIN || 'http://localhost:5173',
};

function parseHeaders(headersJson: string): Record<string, string> {
  try {
    return JSON.parse(headersJson);
  } catch {
    return {};
  }
}

// Session management
export const SESSION_KEY = 'ajudadiretora_session';
export const MESSAGES_KEY = 'ajudadiretora_messages';
export const ACTIONS_KEY = 'ajudadiretora_actions';
export const DOCUMENTS_KEY = 'ajudadiretora_documents';

// Quick action chips
export const QUICK_ACTIONS = [
  { id: 'matricula', label: 'Matrícula', icon: '👥' },
  { id: 'horarios', label: 'Horários', icon: '⏰' },
  { id: 'alimentacao', label: 'Alimentação', icon: '🍎' },
  { id: 'comunicados', label: 'Comunicados', icon: '📋' },
  { id: 'eventos', label: 'Eventos/Halloween', icon: '🎃' },
];

// Document types
export const DOCUMENT_TYPES = [
  { value: 'plano', label: 'Plano de Festa', description: 'Planejamento completo para eventos e comemorações' },
  { value: 'comunicado', label: 'Comunicado', description: 'Comunicação oficial para famílias e equipe' },
  { value: 'checklist', label: 'Checklist', description: 'Lista de verificação para processos' },
] as const;