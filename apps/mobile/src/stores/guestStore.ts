import { create } from 'zustand';

interface GuestState {
  hasCompletedOnboarding: boolean;
  savedPoseIds: string[];
  completeOnboarding: () => void;
  toggleSavePose: (poseId: string) => void;
  isPoseSaved: (poseId: string) => boolean;
}

export const useGuestStore = create<GuestState>((set, get) => ({
  hasCompletedOnboarding: false,
  savedPoseIds: ['sitting_lean_01', 'solo_wall_lean_01'],

  completeOnboarding: () => {
    set({ hasCompletedOnboarding: true });
  },

  toggleSavePose: (poseId: string) => {
    const current = get().savedPoseIds;
    if (current.includes(poseId)) {
      set({ savedPoseIds: current.filter(id => id !== poseId) });
    } else {
      set({ savedPoseIds: [...current, poseId] });
    }
  },

  isPoseSaved: (poseId: string) => {
    return get().savedPoseIds.includes(poseId);
  },
}));
