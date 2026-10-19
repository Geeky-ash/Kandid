/**
 * @kandid/content — looks
 * 16 gemstone-named color matrices rendered in real-time via skia color filters.
 */

import { GemLook } from './types';

export const gemLooks: GemLook[] = [
  {
    id: 'citrine',
    name: 'citrine',
    description: 'warm sunlit amber highlights with softened editorial contrast',
    isPro: false,
    defaultIntensity: 0.85,
    colorMatrix: [
      1.12, 0.04, 0.02, 0, 0.03,
      0.02, 1.08, 0.02, 0, 0.02,
      0.01, 0.02, 0.94, 0, -0.02,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'pearl',
    name: 'pearl',
    description: 'creamy luminous skin tones with gentle lifted shadows',
    isPro: false,
    defaultIntensity: 0.80,
    colorMatrix: [
      1.06, 0.03, 0.02, 0, 0.04,
      0.02, 1.05, 0.02, 0, 0.04,
      0.02, 0.02, 1.04, 0, 0.03,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'amber',
    name: 'amber',
    description: 'rich golden-hour bronze glow reminiscent of 35mm film',
    isPro: false,
    defaultIntensity: 0.90,
    colorMatrix: [
      1.18, 0.06, -0.02, 0, 0.02,
      0.04, 1.10, -0.01, 0, 0.01,
      -0.03, 0.01, 0.88, 0, -0.03,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'onyx',
    name: 'onyx',
    description: 'punchy black and white with deep blacks and velvety mid-tones',
    isPro: false,
    defaultIntensity: 1.0,
    colorMatrix: [
      0.30, 0.59, 0.11, 0, -0.02,
      0.30, 0.59, 0.11, 0, -0.02,
      0.30, 0.59, 0.11, 0, -0.02,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'sapphire',
    name: 'sapphire',
    description: 'crisp editorial cool tones with ocean blues and clean whites',
    isPro: true,
    defaultIntensity: 0.75,
    colorMatrix: [
      0.95, 0.02, 0.03, 0, -0.02,
      0.01, 0.98, 0.04, 0, -0.01,
      0.02, 0.03, 1.15, 0, 0.04,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'emerald',
    name: 'emerald',
    description: 'deep forest greens and balanced earthy tones for outdoor shoots',
    isPro: true,
    defaultIntensity: 0.80,
    colorMatrix: [
      0.96, 0.02, 0.01, 0, -0.01,
      0.03, 1.14, 0.02, 0, 0.03,
      0.01, 0.04, 0.95, 0, -0.02,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'rose_quartz',
    name: 'rose quartz',
    description: 'romantic blush tint with gentle magenta bloom in highlights',
    isPro: true,
    defaultIntensity: 0.75,
    colorMatrix: [
      1.14, 0.02, 0.04, 0, 0.04,
      0.03, 0.98, 0.03, 0, 0.01,
      0.04, 0.02, 1.08, 0, 0.03,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'topaz',
    name: 'topaz',
    description: 'vibrant high-fashion pop with saturated warm accents',
    isPro: true,
    defaultIntensity: 0.85,
    colorMatrix: [
      1.15, 0.04, -0.01, 0, 0.02,
      0.02, 1.12, 0.01, 0, 0.02,
      -0.01, 0.02, 0.96, 0, -0.01,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'ruby',
    name: 'ruby',
    description: 'intense warm crimson undertones for dramatic evening shoots',
    isPro: true,
    defaultIntensity: 0.80,
    colorMatrix: [
      1.22, 0.02, -0.01, 0, 0.04,
      0.01, 0.96, 0.02, 0, -0.01,
      0.01, 0.01, 0.95, 0, -0.02,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'amethyst',
    name: 'amethyst',
    description: 'subtle violet-tinted shadows and retro twilight mood',
    isPro: true,
    defaultIntensity: 0.70,
    colorMatrix: [
      1.04, 0.01, 0.06, 0, 0.01,
      0.01, 0.96, 0.03, 0, -0.02,
      0.05, 0.02, 1.16, 0, 0.03,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'jade',
    name: 'jade',
    description: 'muted sage greens and matte shadows for serene portraits',
    isPro: true,
    defaultIntensity: 0.75,
    colorMatrix: [
      0.94, 0.04, 0.02, 0, 0.01,
      0.02, 1.08, 0.03, 0, 0.03,
      0.02, 0.04, 0.98, 0, 0.01,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'opal',
    name: 'opal',
    description: 'iridescent highlight roll-off with pastel softness',
    isPro: true,
    defaultIntensity: 0.70,
    colorMatrix: [
      1.05, 0.03, 0.03, 0, 0.03,
      0.02, 1.06, 0.02, 0, 0.03,
      0.03, 0.02, 1.08, 0, 0.04,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'garnet',
    name: 'garnet',
    description: 'deep burgundy richness with cinematic warmth in skin tones',
    isPro: true,
    defaultIntensity: 0.85,
    colorMatrix: [
      1.16, 0.03, 0.01, 0, 0.03,
      0.02, 0.97, 0.01, 0, -0.01,
      0.01, 0.01, 0.94, 0, -0.02,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'aquamarine',
    name: 'aquamarine',
    description: 'bright airy cyan breeze with crystal-clear whites',
    isPro: true,
    defaultIntensity: 0.75,
    colorMatrix: [
      0.96, 0.02, 0.04, 0, -0.01,
      0.02, 1.06, 0.05, 0, 0.02,
      0.03, 0.04, 1.18, 0, 0.05,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'peridot',
    name: 'peridot',
    description: 'zesty lime-golden afternoon sun for playful vacation photos',
    isPro: true,
    defaultIntensity: 0.80,
    colorMatrix: [
      1.10, 0.06, -0.02, 0, 0.02,
      0.05, 1.15, -0.01, 0, 0.04,
      -0.03, 0.02, 0.92, 0, -0.02,
      0,    0,    0,    1, 0,
    ],
  },
  {
    id: 'tourmaline',
    name: 'tourmaline',
    description: 'vivid multi-dimensional pop with deep blues and punchy warm accents',
    isPro: true,
    defaultIntensity: 0.85,
    colorMatrix: [
      1.12, 0.02, 0.03, 0, 0.02,
      0.01, 1.08, 0.02, 0, 0.02,
      0.03, 0.02, 1.14, 0, 0.03,
      0,    0,    0,    1, 0,
    ],
  },
];

export const getLookById = (id: string): GemLook | undefined => {
  return gemLooks.find(l => l.id === id);
};
