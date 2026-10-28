import { create } from 'zustand';

interface PreferencesState {
  saveOriginals: boolean;
  hapticsEnabled: boolean;
  autoGrid: boolean;
  toggleSaveOriginals: () => void;
  toggleHaptics: () => void;
  toggleAutoGrid: () => void;
  resetPreferences: () => void;
}

export const usePreferencesStore = create<PreferencesState>(set => ({
  saveOriginals: true,
  hapticsEnabled: true,
  autoGrid: true,

  toggleSaveOriginals: () => set(state => ({ saveOriginals: !state.saveOriginals })),
  toggleHaptics: () => set(state => ({ hapticsEnabled: !state.hapticsEnabled })),
  toggleAutoGrid: () => set(state => ({ autoGrid: !state.autoGrid })),
  resetPreferences: () => set({ saveOriginals: true, hapticsEnabled: true, autoGrid: true }),
}));
