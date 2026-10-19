/**
 * @kandid/ui-tokens — spacing
 * source of truth: stitch mcp (project id: 931723337622910157)
 */

export const space = {
  xs: 4,               // 0.25rem: space-xs
  sm: 8,               // 0.5rem:  space-sm
  md: 16,              // 1.0rem:  space-md
  lg: 24,              // 1.5rem:  space-lg
  xl: 36,              // 2.25rem: space-xl
  gutterMobile: 12,    // 0.75rem: gutter-mobile
  marginMobile: 20,    // 1.25rem: margin-mobile
  gutter: 16,          // 1.0rem:  gutter
  margin: 24,          // 1.5rem:  margin
} as const;

export type Space = typeof space;
