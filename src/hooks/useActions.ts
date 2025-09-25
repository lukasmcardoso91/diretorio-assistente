import React, { useState, useEffect } from 'react';
import type { Action } from '../lib/types';
import { getActions, saveActions, generateId } from '../lib/storage';
import { config } from '../lib/config';

export const useActions = () => {
  const [actions, setActions] = React.useState<Action[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Load actions on mount
  React.useEffect(() => {
    const storedActions = getActions();
    setActions(storedActions);
  }, []);

  // Save actions when they change
  React.useEffect(() => {
    saveActions(actions);
  }, [actions]);

  const createAction = async (actionData: Omit<Action, 'id'>): Promise<Action> => {
    setLoading(true);
    setError(null);

    try {
      const newAction: Action = {
        ...actionData,
        id: generateId(),
      };

      if (!config.mockMode) {
        // Make API call to create action
        const response = await fetch(config.actionsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...config.headers,
          },
          body: JSON.stringify(newAction),
        });

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }
      }

      // Add to local state
      setActions(prev => [...prev, newAction]);
      return newAction;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar ação';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateAction = async (id: string, updates: Partial<Action>): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const updatedAction = actions.find(a => a.id === id);
      if (!updatedAction) {
        throw new Error('Ação não encontrada');
      }

      const newAction = { ...updatedAction, ...updates };

      if (!config.mockMode) {
        // Make API call to update action
        const response = await fetch(`${config.actionsUrl}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...config.headers,
          },
          body: JSON.stringify(newAction),
        });

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }
      }

      // Update local state
      setActions(prev => prev.map(a => a.id === id ? newAction : a));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar ação';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteAction = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      if (!config.mockMode) {
        // Make API call to delete action
        const response = await fetch(`${config.actionsUrl}/${id}`, {
          method: 'DELETE',
          headers: config.headers,
        });

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }
      }

      // Remove from local state
      setActions(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar ação';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const completeAction = (id: string) => {
    return updateAction(id, { status: 'done' });
  };

  const scheduleAction = (id: string) => {
    return updateAction(id, { status: 'scheduled' });
  };

  // Computed values
  const scheduledActions = actions.filter(a => a.status === 'scheduled');
  const completedActions = actions.filter(a => a.status === 'done');
  const overdueActions = scheduledActions.filter(a => new Date(a.dueAt) < new Date());

  return {
    actions,
    scheduledActions,
    completedActions,
    overdueActions,
    loading,
    error,
    createAction,
    updateAction,
    deleteAction,
    completeAction,
    scheduleAction,
  };
};