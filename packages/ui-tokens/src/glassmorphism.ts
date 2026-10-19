/**
 * @kandid/ui-tokens — glassmorphism & surfaces
 * defines ios frosted glass presets and android solid translucent fallbacks per docs/RULES.md.
 */

import { colors } from './colors';
import { radius } from './radii';

export const glassmorphism = {
  // ios frosted glass hud (using expo-blur)
  hud: {
    ios: {
      intensity: 65,
      tint: 'light' as const,
      backgroundColor: colors.background.hud,
      borderColor: colors.border.subtle,
      borderWidth: 1,
    },
    // android solid translucent fallback
    android: {
      backgroundColor: colors.background.hudFallback,
      borderColor: colors.border.medium,
      borderWidth: 1,
      elevation: 4,
    },
  },

  // dark docked cue card (above shutter container)
  cueCard: {
    ios: {
      intensity: 75,
      tint: 'dark' as const,
      backgroundColor: colors.background.cueCard,
      borderColor: 'rgba(252, 249, 244, 0.15)',
      borderWidth: 1,
      borderRadius: radius.pill,
    },
    android: {
      backgroundColor: colors.background.cueCardFallback,
      borderColor: 'rgba(252, 249, 244, 0.20)',
      borderWidth: 1,
      borderRadius: radius.pill,
      elevation: 6,
    },
  },

  // bottom floating tab bar
  tabBar: {
    ios: {
      intensity: 70,
      tint: 'light' as const,
      backgroundColor: colors.background.hud,
      borderColor: colors.border.subtle,
      borderWidth: 1,
      borderRadius: radius['3xl'],
    },
    android: {
      backgroundColor: colors.background.hudFallback,
      borderColor: colors.border.medium,
      borderWidth: 1,
      borderRadius: radius['3xl'],
      elevation: 8,
    },
  },
} as const;

export type Glassmorphism = typeof glassmorphism;
