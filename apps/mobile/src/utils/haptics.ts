import * as Haptics from 'expo-haptics';
import { usePreferencesStore } from '../stores/preferencesStore';

const isHapticsAllowed = () => usePreferencesStore.getState().hapticsEnabled;

export const triggerHaptic = {
  light: async () => {
    if (!isHapticsAllowed()) return;
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
  },
  medium: async () => {
    if (!isHapticsAllowed()) return;
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
  },
  heavy: async () => {
    if (!isHapticsAllowed()) return;
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch {}
  },
  selection: async () => {
    if (!isHapticsAllowed()) return;
    try {
      await Haptics.selectionAsync();
    } catch {}
  },
  success: async () => {
    if (!isHapticsAllowed()) return;
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
  },
};
