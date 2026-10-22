import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  isGuest: boolean;
  avatarUrl?: string;
}

interface AuthState {
  user: UserProfile | null;
  isGuest: boolean;
  isLoading: boolean;
  error: string | null;
  signInWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signInWithOAuth: (provider: 'apple' | 'google') => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: {
    id: 'guest_user_demo',
    email: 'guest@kandid.app',
    name: 'guest creator',
    isGuest: true,
  },
  isGuest: true,
  isLoading: false,
  error: null,

  signInWithEmail: async (email: string, _pass: string) => {
    set({ isLoading: true, error: null });
    try {
      const mockUser: UserProfile = {
        id: `usr_${Date.now()}`,
        email: email.toLowerCase(),
        name: email.split('@')[0],
        isGuest: false,
      };
      set({ user: mockUser, isGuest: false, isLoading: false });
      return { success: true };
    } catch (e: any) {
      set({ isLoading: false, error: e.message });
      return { success: false, error: e.message };
    }
  },

  signUpWithEmail: async (email: string, _pass: string) => {
    set({ isLoading: true, error: null });
    try {
      const mockUser: UserProfile = {
        id: `usr_${Date.now()}`,
        email: email.toLowerCase(),
        name: email.split('@')[0],
        isGuest: false,
      };
      set({ user: mockUser, isGuest: false, isLoading: false });
      return { success: true };
    } catch (e: any) {
      set({ isLoading: false, error: e.message });
      return { success: false, error: e.message };
    }
  },

  signInWithOAuth: async (provider: 'apple' | 'google') => {
    set({ isLoading: true, error: null });
    try {
      const mockUser: UserProfile = {
        id: `oauth_${provider}_${Date.now()}`,
        email: `${provider}.user@kandid.app`,
        name: `${provider} creator`,
        isGuest: false,
      };
      set({ user: mockUser, isGuest: false, isLoading: false });
      return { success: true };
    } catch (e: any) {
      set({ isLoading: false, error: e.message });
      return { success: false, error: e.message };
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({
      user: {
        id: 'guest_user_demo',
        email: 'guest@kandid.app',
        name: 'guest creator',
        isGuest: true,
      },
      isGuest: true,
    });
  },

  continueAsGuest: () => {
    set({
      user: {
        id: 'guest_user_demo',
        email: 'guest@kandid.app',
        name: 'guest creator',
        isGuest: true,
      },
      isGuest: true,
    });
  },
}));
