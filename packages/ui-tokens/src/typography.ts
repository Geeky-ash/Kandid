/**
 * @kandid/ui-tokens — typography
 * source of truth: stitch mcp (project id: 931723337622910157)
 * fonts: Playfair Display (headlines) + Plus Jakarta Sans (ui & body)
 * minimum text floor: 12px across all mobile screens.
 */

export const typography = {
  fontFamilies: {
    headline: 'Playfair Display',
    body: 'Plus Jakarta Sans',
  },

  fontSize: {
    displayLg: 36,     // playfair display regular, line-height 42
    headlineLg: 28,    // playfair display medium, line-height 34
    headlineMd: 22,    // playfair display medium, line-height 28
    headlineSm: 18,    // playfair display semibold, line-height 24
    bodyLg: 16,        // plus jakarta sans regular, line-height 24
    bodyMd: 14,        // plus jakarta sans regular, line-height 20
    bodySm: 12,        // plus jakarta sans regular, line-height 16 (system floor)
    labelLg: 14,       // plus jakarta sans semibold, line-height 18
    labelMd: 12,       // plus jakarta sans semibold, line-height 16
    labelSm: 12,       // plus jakarta sans bold, line-height 14 (lowercase only)
  },

  lineHeight: {
    displayLg: 42,
    headlineLg: 34,
    headlineMd: 28,
    headlineSm: 24,
    bodyLg: 24,
    bodyMd: 20,
    bodySm: 16,
    labelLg: 18,
    labelMd: 16,
    labelSm: 14,
  },

  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1.0,
  },
} as const;

export type Typography = typeof typography;
