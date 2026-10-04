import type { Session } from '@supabase/supabase-js';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { env } from '@/lib/env';
import { getSupabase, startSessionAutoRefresh } from '@/lib/supabase';

type SessionContextValue = {
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  refresh: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(env.isSupabaseConfigured);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    let isMounted = true;

    void supabase.auth
      .getSession()
      .then(({ data }) => {
        if (isMounted) setSession(data.session);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) setSession(nextSession);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => startSessionAutoRefresh(), []);

  const refresh = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      isLoading,
      isConfigured: env.isSupabaseConfigured,
      refresh,
    }),
    [session, isLoading, refresh]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used inside a SessionProvider');
  }
  return context;
}