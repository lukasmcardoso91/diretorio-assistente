import { useState, useEffect } from 'react';
import type { Session } from '../lib/types';
import { getSession, saveSession, generateSessionId } from '../lib/storage';

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existingSession = getSession();
    if (existingSession) {
      setSession(existingSession);
    } else {
      // Create new session with LGPD consent required
      const newSession: Session = {
        sessionId: generateSessionId(),
        consentLGPD: false,
      };
      setSession(newSession);
    }
    setLoading(false);
  }, []);

  const updateSession = (updates: Partial<Session>) => {
    console.log('updateSession called', { updates, currentSession: session });
    if (!session) return;
    
    const updatedSession = { ...session, ...updates };
    console.log('Updated session', updatedSession);
    setSession(updatedSession);
    saveSession(updatedSession);
  };

  const resetSession = () => {
    const newSession: Session = {
      sessionId: generateSessionId(),
      consentLGPD: false,
    };
    setSession(newSession);
    saveSession(newSession);
  };

  return {
    session,
    updateSession,
    resetSession,
    loading,
    isAuthenticated: session?.consentLGPD || false,
  };
};