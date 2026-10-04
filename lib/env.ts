const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export { supabaseUrl, supabaseAnonKey };

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export function missingEnvVars(): string[] {
  const missing: string[] = [];
  if (!supabaseUrl) missing.push('EXPO_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) missing.push('EXPO_PUBLIC_SUPABASE_ANON_KEY');
  return missing;
}

export const env = {
  supabaseUrl: supabaseUrl ?? '',
  supabaseAnonKey: supabaseAnonKey ?? '',
  isSupabaseConfigured,
} as const;