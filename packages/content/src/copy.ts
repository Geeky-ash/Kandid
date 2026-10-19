/**
 * @kandid/content — copy dictionary
 * rule: all user-facing copy is strictly lowercase.
 * allowed exceptions: legal text, user names, error codes, and platform trademarks (ADR-011).
 */

export const copy = {
  brand: {
    name: 'kandid',
    tagline: 'effortless angles for every shot.',
  },

  socialProof: {
    // placeholders reserved for verified production metrics; omitted from initial release views
    usersCoached: '[stat_users_coached]',
    appRating: '[stat_app_rating]',
    sampleReview: '[placeholder_review]',
  },

  navigation: {
    home: 'home',
    poses: 'poses',
    camera: 'camera',
    bestShots: 'best shots',
    profile: 'profile',
  },

  onboarding: {
    welcomeTitle: 'effortless angles for every shot.',
    welcomeSubtitle: 'calm visual pose outlines and smart cue cards to help you feel confident in front of any camera.',
    getStarted: 'get started',
    continueAsGuest: 'continue as guest',
    skip: 'skip',
    permissions: {
      cameraTitle: 'camera access',
      cameraSubtitle: 'we need camera access to display pose overlays and capture photos. everything stays on your device.',
      enableCamera: 'enable camera',
      photosTitle: 'photo library access',
      photosSubtitle: 'required to save your captures and apply looks to existing photos.',
      enablePhotos: 'enable photo library',
    },
    paywall: {
      title: 'unlock kandid pro',
      subtitle: 'elevate every session with full pose collections, interval series bursts, and calibrated studio lighting.',
      startTrial: 'start 7-day free trial',
      trialNotice: '7 days free, then $39.99/year. cancel anytime.',
      restore: 'restore purchases',
      maybeLater: 'maybe later',
    },
  },

  home: {
    headerTitle: "pick a pose, we'll guide the shot",
    headerSubtitle: 'choose how you want to shoot today',
    modes: {
      poseCamera: {
        title: 'pose camera',
        subtitle: 'visual mannequin overlay with step-by-step guidance cues',
        badge: 'popular',
      },
      handsFreeSeries: {
        title: 'hands-free series',
        subtitle: 'propped-up recurring interval bursts with haptic pacing',
        badge: 'pro',
      },
    },
    quickActions: {
      softLight: 'soft light',
      poseMe: 'random pose',
      recentShoots: 'recent shoots',
    },
  },

  poseLibrary: {
    searchPlaceholder: 'search poses (e.g. coffee, sitting, duo)...',
    allCategories: 'all',
    filterCategories: [
      { id: 'all', label: 'all' },
      { id: 'solo', label: 'solo' },
      { id: 'seated', label: 'seated' },
      { id: 'standing', label: 'standing' },
      { id: 'mirror', label: 'mirror' },
      { id: 'duo', label: 'duo' },
      { id: 'golden_hour', label: 'golden hour' },
      { id: 'casual', label: 'casual' },
      { id: 'editorial', label: 'editorial' },
    ],
    saveToFavorites: 'save to favorites',
    useThisPose: 'use this pose',
  },

  camera: {
    forSubjectPill: 'for you',
    forPhotographerPill: 'for photographer',
    cueProgress: (current: number, total: number) => `cue ${current} of ${total}`,
    nextCue: 'next cue',
    softLightNotice: 'soft light on',
    handsFreeTimer: (seconds: number) => `${seconds}s`,
    zoomLevel: (level: string) => level,
  },

  bestShots: {
    title: 'best shots curation',
    subtitle: 'in-memory ai evaluation that finds your sharpest, most flattering photos in seconds.',
    privacyBadge: 'zero-storage privacy: photos are processed ephemerally in memory and never saved to cloud disks.',
    creditCostNotice: '1 credit curates up to 10 photos',
    batchPickerTitle: 'select up to 10 photos to curate',
    curateButton: 'curate batch (1 credit)',
    curatingStatus: 'evaluating lighting, sharpness, and expressions in memory...',
    columns: {
      post: 'post',
      keep: 'keep',
      delete: 'delete',
    },
    editTopPick: 'edit top pick in looks editor',
    insufficientCredits: 'insufficient credits. tap to refill credit pack.',
    refundNotice: 'curation could not be completed. your credit has been automatically refunded.',
  },

  editor: {
    title: 'looks editor',
    compareOverlay: 'hold image to compare with original',
    intensity: 'intensity',
    exportToPhotos: 'export to photos',
    savedSuccess: 'photo saved to your camera roll',
  },

  profile: {
    title: 'profile & settings',
    guestNotice: 'you are currently in guest mode. photos and poses are stored on this device.',
    signInPrompt: 'sign in to sync credits, unlock cloud best shots, and manage subscriptions.',
    signInWithApple: 'Sign in with Apple', // platform trademark exception per ADR-011
    signInWithGoogle: 'Sign in with Google', // platform trademark exception per ADR-011
    creditsAvailable: (count: number) => `${count} curation credits available`,
    buyCredits: 'get more credits',
    shootsCompleted: 'shoots taken',
    savedPoses: 'saved poses',
    privacySection: 'privacy & data governance',
    zeroRetentionDesc: 'kandid never saves your photos to cloud servers. best shots evaluations run ephemerally in-memory.',
    legal: {
      termsOfService: 'Terms of Service', // legal exception per ADR-011
      privacyPolicy: 'Privacy Policy', // legal exception per ADR-011
      copyright: '© 2026 Kandid. all rights reserved.',
      eula: 'Standard Apple Terms of Use (EULA)',
    },
    signOut: 'sign out',
    deleteAccount: 'delete account',
  },
} as const;

export type Copy = typeof copy;
