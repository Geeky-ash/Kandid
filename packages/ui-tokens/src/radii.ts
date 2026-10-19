/**
 * @kandid/ui-tokens — radii
 * source of truth: stitch mcp (project id: 931723337622910157)
 */

export const radius = {
  none: 0,
  sm: 4,               // small chips, badge corners
  md: 8,               // input fields, thumbnails
  lg: 12,              // secondary cards, dialogs
  xl: 16,              // standard card radius
  '2xl': 24,           // hero cards, pose preview containers
  '3xl': 32,           // modal sheets, floating tab bar container
  pill: 9999,          // pill buttons, lens selectors, filter chips, cue cards
} as const;

export type Radius = typeof radius;
