// Local storage utilities with error handling
import type { Session, ChatMessage, Action, DocumentItem } from './types';
import { SESSION_KEY, MESSAGES_KEY, ACTIONS_KEY, DOCUMENTS_KEY } from './config';

// Session management
export const getSession = (): Session | null => {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
};

export const saveSession = (session: Session): void => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Failed to save session:', error);
  }
};

// Messages management
export const getMessages = (sessionId: string): ChatMessage[] => {
  try {
    const messages = localStorage.getItem(`${MESSAGES_KEY}_${sessionId}`);
    return messages ? JSON.parse(messages) : [];
  } catch {
    return [];
  }
};

export const saveMessages = (sessionId: string, messages: ChatMessage[]): void => {
  try {
    localStorage.setItem(`${MESSAGES_KEY}_${sessionId}`, JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save messages:', error);
  }
};

// Actions management
export const getActions = (): Action[] => {
  try {
    const actions = localStorage.getItem(ACTIONS_KEY);
    return actions ? JSON.parse(actions) : [];
  } catch {
    return [];
  }
};

export const saveActions = (actions: Action[]): void => {
  try {
    localStorage.setItem(ACTIONS_KEY, JSON.stringify(actions));
  } catch (error) {
    console.error('Failed to save actions:', error);
  }
};

// Documents management
export const getDocuments = (): DocumentItem[] => {
  try {
    const documents = localStorage.getItem(DOCUMENTS_KEY);
    return documents ? JSON.parse(documents) : [];
  } catch {
    return [];
  }
};

export const saveDocuments = (documents: DocumentItem[]): void => {
  try {
    localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(documents));
  } catch (error) {
    console.error('Failed to save documents:', error);
  }
};

// Utility to generate IDs
export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Generate session ID
export const generateSessionId = (): string => {
  return crypto.randomUUID?.() || generateId();
};