import React, { useState, useEffect } from 'react';
import type { DocumentItem, DocumentFormData } from '../lib/types';
import { getDocuments, saveDocuments, generateId } from '../lib/storage';
import { config } from '../lib/config';
import { generateMockDocument } from '../mocks/documentMocks';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load documents on mount
  useEffect(() => {
    const storedDocuments = getDocuments();
    setDocuments(storedDocuments);
  }, []);

  // Save documents when they change
  useEffect(() => {
    saveDocuments(documents);
  }, [documents]);

  const generateDocument = async (formData: DocumentFormData): Promise<DocumentItem> => {
    setLoading(true);
    setError(null);

    try {
      let contentMD: string;

      if (config.mockMode) {
        // Use mock generation
        contentMD = await generateMockDocument(formData);
      } else {
        // Make API call to generate document
        const response = await fetch(config.docsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...config.headers,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const result = await response.json();
        contentMD = result.content || result.contentMD;
      }

      // Create document item
      const newDocument: DocumentItem = {
        id: generateId(),
        type: formData.type,
        title: formData.title,
        contentMD,
        createdAt: new Date().toISOString(),
        relatedActionId: formData.relatedActionId,
      };

      // Add to local state
      setDocuments(prev => [...prev, newDocument]);
      return newDocument;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao gerar documento';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = (id: string): void => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const getDocumentsByType = (type: DocumentItem['type']): DocumentItem[] => {
    return documents.filter(d => d.type === type);
  };

  // Export functions
  const exportToText = (doc: DocumentItem): void => {
    const blob = new Blob([doc.contentMD], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${doc.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async (doc: DocumentItem): Promise<void> => {
    try {
      await navigator.clipboard.writeText(doc.contentMD);
    } catch (err) {
      // Fallback for older browsers
      const textarea = window.document.createElement('textarea');
      textarea.value = doc.contentMD;
      window.document.body.appendChild(textarea);
      textarea.select();
      window.document.execCommand('copy');
      window.document.body.removeChild(textarea);
    }
  };

  return {
    documents,
    loading,
    error,
    generateDocument,
    deleteDocument,
    getDocumentsByType,
    exportToText,
    copyToClipboard,
  };
};