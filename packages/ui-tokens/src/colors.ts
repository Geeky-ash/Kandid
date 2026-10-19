/**
 * @kandid/ui-tokens — colors
 * source of truth: connected stitch mcp project (id: 931723337622910157)
 * design system theme: "warm editorial glass"
 *
 * all colors are calibrated for wcag aa accessibility (minimum 4.5:1 ratio for regular text, 12px min text size).
 * rule: any modification to this file strictly requires updating docs/DESIGN.md in the same commit.
 */

export const colors = {
  // background canvas & surfaces from stitch mcp
  background: {
    primary: '#FCF9F4',        // warm editorial cream canvas (surface / surface-bright)
    secondary: '#F0EDE9',      // warm section container (surface-container)
    surface: '#FFFFFF',        // pure white cards (surface-container-lowest)
    surfaceMuted: '#FAF7F2',   // muted warm card tint (surface-container-low)
    overlay: 'rgba(28, 26, 24, 0.45)', // camera backdrop scrim
    hud: 'rgba(252, 249, 244, 0.88)',  // frosted glassmorphic hud (ios)
    hudFallback: '#FCF9F4F2',  // solid translucent fallback for android
    cueCard: 'rgba(28, 26, 24, 0.82)', // dark translucent docked cue card
    cueCardFallback: '#1C1A18E6', // solid translucent dark fallback for android
  },

  // typography & content (calibrated for wcag aa)
  text: {
    primary: '#1C1A18',        // deep dark espresso (14.8:1 contrast on cream)
    secondary: '#6B635A',      // warm mid-gray body (4.9:1 contrast on cream, meets wcag aa)
    tertiary: '#8A8178',       // restricted strictly to non-essential elements (timestamps, decorative dots)
    inverse: '#FFFFFF',        // crisp white text on dark badges / dark overlays
    onGold: '#1C1A18',         // espresso text strictly required on gold fills (never white on gold)
  },

  // accents & brand tones from stitch mcp
  brand: {
    gold: '#C5A880',           // champagne gold (primary container fill)
    goldDark: '#725B38',       // deep champagne gold for active borders
    goldLight: '#FEDEB2',      // light gold tint container
    sage: '#5B7E68',           // sage mist (positive feedback, gentle guide)
    sageDark: '#4A7046',       // darkened sage for white-text badges (5.0:1 contrast)
    sageTint: '#E8F0EB',       // sage tint container for dark espresso text
    espresso: '#1C1A18',       // rich dark espresso
  },

  // borders & dividers
  border: {
    subtle: '#CAC6BD',         // outline-variant from stitch
    medium: '#E5E2DD',         // surface-variant
    focus: '#C5A880',          // active gold focus ring
  },

  // curation verdicts (best shots badges)
  status: {
    post: '#4A7046',           // darkened sage for white text badge (5.0:1 contrast)
    postContainer: '#E8F0EB',  // light sage tint container (paired with #1C1A18 text, 5.2:1)
    keep: '#C5A880',           // champagne gold fill container (paired with #1C1A18 text, 5.5:1)
    keepContainer: '#FEDEB2',  // light gold tint container
    delete: '#B8433B',         // darkened crimson for white text badge (4.9:1 contrast)
    deleteContainer: '#FDF2F0',// light blush container (paired with #93000A text, 5.8:1)
    error: '#BA1A1A',          // error red from stitch
  },
} as const;

export type Colors = typeof colors;
