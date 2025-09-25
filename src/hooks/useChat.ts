import { useState, useEffect } from 'react';
import type { ChatMessage, ChatRequest, ChatResponse } from '../lib/types';
import { getMessages, saveMessages, generateId } from '../lib/storage';
import { config } from '../lib/config';
import { generateMockResponse } from '../mocks/chatMocks';

export const useChat = (sessionId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load messages on session change
  useEffect(() => {
    if (sessionId) {
      const storedMessages = getMessages(sessionId);
      setMessages(storedMessages);
    }
  }, [sessionId]);

  // Save messages when they change
  useEffect(() => {
    if (sessionId && messages.length > 0) {
      saveMessages(sessionId, messages);
    }
  }, [sessionId, messages]);

  const sendMessage = async (
    text: string,
    userName?: string,
    userEmail?: string
  ): Promise<void> => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    // Add user message
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      let response: ChatResponse;

      if (config.mockMode) {
        // Use mock response
        response = await generateMockResponse(text);
      } else {
        // Make real API call
        const request: ChatRequest = {
          message: text,
          meta: {
            sessionId,
            userName,
            userEmail,
          },
        };

        const apiResponse = await fetch(config.chatUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...config.headers,
          },
          body: JSON.stringify(request),
        });

        if (!apiResponse.ok) {
          throw new Error(`Erro na API: ${apiResponse.status}`);
        }

        response = await apiResponse.json();
      }

      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        text: response.message,
        createdAt: new Date().toISOString(),
        blocks: response.blocks,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      
      // Add error message to chat
      const errorChatMessage: ChatMessage = {
        id: generateId(),
        role: 'system',
        text: `❌ Desculpe, ocorreu um erro: ${errorMessage}. Tente novamente.`,
        createdAt: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, errorChatMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    saveMessages(sessionId, []);
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
  };
};