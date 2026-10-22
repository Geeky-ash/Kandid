import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://kandid-app.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.mock_kandid_anon_token_production';

// in-memory secure storage adapter for session persistence across hot reloads
const sessionCache = new Map<string, string>();

const secureStorageAdapter = {
  getItem: (key: string): string | null => sessionCache.get(key) ?? null,
  setItem: (key: string, value: string): void => {
    sessionCache.set(key, value);
  },
  removeItem: (key: string): void => {
    sessionCache.delete(key);
  },
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: secureStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
