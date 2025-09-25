// AjudaDiretora - Type Definitions

export type Session = {
  sessionId: string;
  userName?: string;
  userEmail?: string;
  consentLGPD: boolean;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  createdAt: string;
  blocks?: Block[];
};

export type Block = {
  type: 'action_suggestion' | 'doc_suggestion';
  title: string;
  defaultDate?: string;
  docType?: 'plano' | 'comunicado' | 'checklist';
  payload?: any;
};

export type Action = {
  id: string;
  title: string;
  dueAt: string;
  status: 'scheduled' | 'done' | 'cancelled';
  source?: string;
  calendarLink?: string;
  notes?: string;
  description?: string;
};

export type DocumentItem = {
  id: string;
  type: 'plano' | 'comunicado' | 'checklist';
  title: string;
  contentMD: string;
  createdAt: string;
  relatedActionId?: string;
};

export type DocumentType = 'plano' | 'comunicado' | 'checklist';

export type ActionStatus = 'scheduled' | 'done' | 'cancelled';

// API Types
export type ChatRequest = {
  message: string;
  meta: {
    sessionId: string;
    userName?: string;
    userEmail?: string;
  };
};

export type ChatResponse = {
  message: string;
  blocks?: Block[];
};

// Environment Config
export type AppConfig = {
  mockMode: boolean;
  chatUrl: string;
  actionsUrl: string;
  docsUrl: string;
  authGoogleUrl: string;
  headers: Record<string, string>;
  allowedOrigin: string;
};

// Document Generation
export type DocumentFormData = {
  type: DocumentType;
  title: string;
  theme?: string;
  audience?: string;
  tone?: string;
  details?: string;
  relatedActionId?: string;
};