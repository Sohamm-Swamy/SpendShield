import 'react-native-url-polyfill/auto';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { AppState, type AppStateStatus, type NativeEventSubscription } from 'react-native';

import { env } from '@/lib/env';
import { storage } from '@/lib/storage';
import type { Database } from '@/types/supabase';

let client: SupabaseClient<Database> | null = null;

/**
 * Returns the Supabase client, or null when the required env vars are absent.
 * Callers should gate on `env.isSupabaseConfigured` — creating a client with a
 * placeholder URL throws at import time and takes the whole app down.
 */
export function getSupabase(): SupabaseClient<Database> | null {
  if (!env.isSupabaseConfigured) return null;
  if (client) return client;

  client = createClient<Database>(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      storage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });

  return client;
}

/**
 * Keeps the access token fresh while the app is foregrounded. Supabase
 * refreshes on its own schedule; this just stops the timer when backgrounded
 * so it does not burn battery or fight iOS background execution limits.
 */
export function startSessionAutoRefresh(): () => void {
  const supabase = getSupabase();
  if (!supabase) return () => {};

  supabase.auth.startAutoRefresh();

  const subscription: NativeEventSubscription = AppState.addEventListener(
    'change',
    (next: AppStateStatus) => {
      if (next === 'active') {
        supabase.auth.startAutoRefresh();
      } else if (next === 'background') {
        supabase.auth.stopAutoRefresh();
      }
    }
  );

  return () => {
    subscription.remove();
    supabase.auth.stopAutoRefresh();
  };
}