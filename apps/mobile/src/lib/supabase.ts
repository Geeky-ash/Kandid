import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://kandid-app.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_JDPdRlKBoSXxqgISpE71BQ__hnwUNmI';

const sessionCache = new Map<string, string>();

export const secureStorageAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (Platform.OS === 'web') {
        return sessionCache.get(key) ?? null;
      }
      const val = await SecureStore.getItemAsync(key);
      return val ?? sessionCache.get(key) ?? null;
    } catch {
      return sessionCache.get(key) ?? null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    sessionCache.set(key, value);
    try {
      if (Platform.OS !== 'web') {
        await SecureStore.setItemAsync(key, value);
      }
    } catch {
      // fallback to memory
    }
  },
  removeItem: async (key: string): Promise<void> => {
    sessionCache.delete(key);
    try {
      if (Platform.OS !== 'web') {
        await SecureStore.deleteItemAsync(key);
      }
    } catch {
      // fallback to memory
    }
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
