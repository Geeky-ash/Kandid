import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { performGoogleOAuth } from '../lib/oauth';
import { fetchProfile, updateProfile, uploadAvatar } from '../services/profileService';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  displayName?: string;
  bio?: string;
  isGuest: boolean;
  avatarUrl?: string;
}

const GUEST_USER: UserProfile = {
  id: 'guest_user_demo',
  email: 'guest@kandid.app',
  name: 'guest creator',
  displayName: 'guest creator',
  bio: 'capturing effortless angles.',
  isGuest: true,
};

interface AuthState {
  user: UserProfile | null;
  isGuest: boolean;
  isLoading: boolean;
  error: string | null;
  signInWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signInWithOAuth: (provider: 'apple' | 'google') => Promise<{ success: boolean; error?: string }>;
  updateUserProfile: (u: { fullName?: string; displayName?: string; bio?: string; avatarUrl?: string }) => Promise<{ success: boolean; error?: string }>;
  uploadUserAvatar: (uri: string) => Promise<{ url?: string; error?: string }>;
  fetchUserProfile: () => Promise<void>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: GUEST_USER,
  isGuest: true,
  isLoading: false,
  error: null,

  signInWithEmail: async (email: string) => {
    set({ isLoading: true, error: null });
    const user: UserProfile = { id: `usr_${Date.now()}`, email: email.toLowerCase(), name: email.split('@')[0], displayName: email.split('@')[0], isGuest: false };
    set({ user, isGuest: false, isLoading: false });
    return { success: true };
  },

  signUpWithEmail: async (email: string) => {
    set({ isLoading: true, error: null });
    const user: UserProfile = { id: `usr_${Date.now()}`, email: email.toLowerCase(), name: email.split('@')[0], displayName: email.split('@')[0], isGuest: false };
    set({ user, isGuest: false, isLoading: false });
    return { success: true };
  },

  signInWithOAuth: async (provider: 'apple' | 'google') => {
    set({ isLoading: true, error: null });
    if (provider === 'google') {
      const res = await performGoogleOAuth();
      if (!res.success) {
        set({ isLoading: false, error: res.error || 'google sign in failed' });
        return { success: false, error: res.error };
      }
      const raw = res.user, email = raw?.email || 'creator.google@kandid.app', meta = raw?.user_metadata || {};
      const newUser: UserProfile = {
        id: raw?.id || `google_${Date.now()}`,
        email,
        name: meta.full_name || meta.name || email.split('@')[0],
        displayName: meta.display_name || meta.full_name || email.split('@')[0],
        avatarUrl: meta.avatar_url || meta.picture,
        isGuest: false,
      };
      set({ user: newUser, isGuest: false, isLoading: false });
      return { success: true };
    }
    const appleUser: UserProfile = { id: `apple_${Date.now()}`, email: 'creator.apple@kandid.app', name: 'apple creator', displayName: 'apple creator', isGuest: false };
    set({ user: appleUser, isGuest: false, isLoading: false });
    return { success: true };
  },

  updateUserProfile: async updates => {
    const cur = get().user;
    if (!cur) return { success: false, error: 'no user' };
    set({ isLoading: true });
    await updateProfile(cur.id, updates);
    set({
      user: {
        ...cur,
        name: updates.fullName ?? cur.name,
        displayName: updates.displayName ?? cur.displayName,
        bio: updates.bio ?? cur.bio,
        avatarUrl: updates.avatarUrl ?? cur.avatarUrl,
      },
      isLoading: false,
    });
    return { success: true };
  },

  uploadUserAvatar: async uri => {
    const cur = get().user;
    return cur ? await uploadAvatar(cur.id, uri) : { error: 'no user' };
  },

  fetchUserProfile: async () => {
    const cur = get().user;
    if (!cur || cur.isGuest) return;
    const { data } = await fetchProfile(cur.id);
    if (data) {
      set({
        user: {
          ...cur,
          name: data.fullName || cur.name,
          displayName: data.displayName || cur.displayName,
          bio: data.bio || cur.bio,
          avatarUrl: data.avatarUrl || cur.avatarUrl,
        },
      });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: GUEST_USER, isGuest: true });
  },

  continueAsGuest: () => {
    set({ user: GUEST_USER, isGuest: true });
  },
}));
