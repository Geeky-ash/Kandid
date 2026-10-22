/**
 * @kandid/content — poses
 * seed catalog of parametric poses represented as normalized joint-angle coordinates.
 * rendered by @shopify/react-native-skia directly over viewfinder.
 */

import { Pose } from './types';

export const seedPoses: Pose[] = [
  // 1. sitting category
  {
    id: 'sitting_lean_01',
    title: 'seated lean',
    category: 'sitting',
    difficulty: 'easy',
    isPro: false,
    skeletonJoints: [
      { id: 'nose', x: 0.50, y: 0.28 },
      { id: 'left_shoulder', x: 0.42, y: 0.36 },
      { id: 'right_shoulder', x: 0.58, y: 0.37 },
      { id: 'left_elbow', x: 0.36, y: 0.48 },
      { id: 'right_elbow', x: 0.64, y: 0.50 },
      { id: 'left_wrist', x: 0.46, y: 0.33 },
      { id: 'right_wrist', x: 0.62, y: 0.62 },
      { id: 'left_hip', x: 0.44, y: 0.60 },
      { id: 'right_hip', x: 0.56, y: 0.61 },
      { id: 'left_knee', x: 0.38, y: 0.76 },
      { id: 'right_knee', x: 0.60, y: 0.77 },
      { id: 'left_ankle', x: 0.42, y: 0.92 },
      { id: 'right_ankle', x: 0.58, y: 0.93 },
    ],
    framingGuides: {
      recommendedLens: '1x',
      cameraAngle: 'eye_level',
      ruleOfThirdsLine: 'center',
    },
    subjectCues: [
      'sit comfortably and lean slightly forward toward the lens',
      'bring your left hand up to rest gently near your chin or jawline',
      'relax your shoulders and let your breath out',
      'look softly past the camera lens toward a distant point',
    ],
    photographerCues: [
      'align phone level with the subject’s eye height',
      'frame subject slightly off-center using the center grid line',
      'tap to focus directly on the subject’s nearest eye',
    ],
  },
  {
    id: 'sitting_stoop_02',
    title: 'stoop perch',
    category: 'sitting',
    difficulty: 'easy',
    isPro: false,
    skeletonJoints: [
      { id: 'nose', x: 0.48, y: 0.24 },
      { id: 'left_shoulder', x: 0.40, y: 0.32 },
      { id: 'right_shoulder', x: 0.56, y: 0.33 },
      { id: 'left_elbow', x: 0.34, y: 0.44 },
      { id: 'right_elbow', x: 0.62, y: 0.46 },
      { id: 'left_wrist', x: 0.42, y: 0.54 },
      { id: 'right_wrist', x: 0.54, y: 0.56 },
      { id: 'left_hip', x: 0.42, y: 0.56 },
      { id: 'right_hip', x: 0.54, y: 0.58 },
      { id: 'left_knee', x: 0.34, y: 0.72 },
      { id: 'right_knee', x: 0.58, y: 0.70 },
      { id: 'left_ankle', x: 0.38, y: 0.90 },
      { id: 'right_ankle', x: 0.62, y: 0.88 },
    ],
    framingGuides: {
      recommendedLens: '1x',
      cameraAngle: 'low_angle',
      ruleOfThirdsLine: 'center',
    },
    subjectCues: [
      'perch on the front step with knees bent and feet staggered',
      'drape forearms casually over your knees with loose fingers',
      'tilt your head slightly to one side and soften your gaze',
    ],
    photographerCues: [
      'crouch down to step level to capture perspective height',
      'keep the steps leading diagonally across the bottom frame',
    ],
  },

  // 2. solo category
  {
    id: 'solo_wall_lean_01',
    title: 'casual wall lean',
    category: 'solo',
    difficulty: 'easy',
    isPro: false,
    skeletonJoints: [
      { id: 'nose', x: 0.48, y: 0.20 },
      { id: 'left_shoulder', x: 0.40, y: 0.28 },
      { id: 'right_shoulder', x: 0.56, y: 0.27 },
      { id: 'left_elbow', x: 0.35, y: 0.38 },
      { id: 'right_elbow', x: 0.60, y: 0.39 },
      { id: 'left_wrist', x: 0.38, y: 0.48 },
      { id: 'right_wrist', x: 0.56, y: 0.49 },
      { id: 'left_hip', x: 0.44, y: 0.52 },
      { id: 'right_hip', x: 0.54, y: 0.51 },
      { id: 'left_knee', x: 0.46, y: 0.72 },
      { id: 'right_knee', x: 0.56, y: 0.70 },
      { id: 'left_ankle', x: 0.48, y: 0.90 },
      { id: 'right_ankle', x: 0.58, y: 0.88 },
    ],
    framingGuides: {
      recommendedLens: '1x',
      cameraAngle: 'waist_level',
      ruleOfThirdsLine: 'left_vertical',
    },
    subjectCues: [
      'rest your back shoulder gently against the wall or door frame',
      'cross your outside ankle in front of your inside ankle',
      'tuck one thumb into your front pocket to give your hand an anchor',
      'drop your chin half an inch and smile gently with your eyes',
    ],
    photographerCues: [
      'lower your phone to waist height and tilt upward 5 degrees',
      'include leading lines from the wall on the left side of frame',
    ],
  },
  {
    id: 'solo_coffee_sip_02',
    title: 'cafe cup hold',
    category: 'solo',
    difficulty: 'easy',
    isPro: false,
    skeletonJoints: [
      { id: 'nose', x: 0.50, y: 0.24 },
      { id: 'left_shoulder', x: 0.42, y: 0.34 },
      { id: 'right_shoulder', x: 0.58, y: 0.34 },
      { id: 'left_elbow', x: 0.38, y: 0.46 },
      { id: 'right_elbow', x: 0.62, y: 0.46 },
      { id: 'left_wrist', x: 0.46, y: 0.42 },
      { id: 'right_wrist', x: 0.54, y: 0.42 },
      { id: 'left_hip', x: 0.45, y: 0.62 },
      { id: 'right_hip', x: 0.55, y: 0.62 },
      { id: 'left_knee', x: 0.42, y: 0.78 },
      { id: 'right_knee', x: 0.58, y: 0.78 },
      { id: 'left_ankle', x: 0.44, y: 0.94 },
      { id: 'right_ankle', x: 0.56, y: 0.94 },
    ],
    framingGuides: {
      recommendedLens: '2x',
      cameraAngle: 'eye_level',
      ruleOfThirdsLine: 'center',
    },
    subjectCues: [
      'hold your coffee cup with both hands just below chin height',
      'look down toward the cup with a warm, subtle smile',
      'keep elbows gently resting on the cafe table surface',
    ],
    photographerCues: [
      'switch to 2x lens to blur background cafe distractions',
      'capture steam rising from the cup in natural window light',
    ],
  },

  // 3. walking category
  {
    id: 'walking_crosswalk_01',
    title: 'city crosswalk',
    category: 'walking',
    difficulty: 'moderate',
    isPro: false,
    skeletonJoints: [
      { id: 'nose', x: 0.50, y: 0.18 },
      { id: 'left_shoulder', x: 0.42, y: 0.26 },
      { id: 'right_shoulder', x: 0.58, y: 0.26 },
      { id: 'left_elbow', x: 0.36, y: 0.38 },
      { id: 'right_elbow', x: 0.64, y: 0.38 },
      { id: 'left_wrist', x: 0.34, y: 0.48 },
      { id: 'right_wrist', x: 0.66, y: 0.48 },
      { id: 'left_hip', x: 0.46, y: 0.50 },
      { id: 'right_hip', x: 0.54, y: 0.50 },
      { id: 'left_knee', x: 0.40, y: 0.68 },
      { id: 'right_knee', x: 0.60, y: 0.72 },
      { id: 'left_ankle', x: 0.36, y: 0.88 },
      { id: 'right_ankle', x: 0.64, y: 0.92 },
    ],
    framingGuides: {
      recommendedLens: '1x',
      cameraAngle: 'waist_level',
      ruleOfThirdsLine: 'center',
    },
    subjectCues: [
      'take deliberate, slow paces across the walkway',
      'swing arms loosely and look straight ahead past the camera',
      'keep your spine upright and shoulders open',
    ],
    photographerCues: [
      'use burst series or rapid shutter taps while subject walks',
      'crouch slightly to lengthen legs and enhance stride energy',
    ],
  },
  {
    id: 'walking_glance_02',
    title: 'over-the-shoulder glance',
    category: 'walking',
    difficulty: 'moderate',
    isPro: true,
    skeletonJoints: [
      { id: 'nose', x: 0.46, y: 0.20 },
      { id: 'left_shoulder', x: 0.42, y: 0.28 },
      { id: 'right_shoulder', x: 0.56, y: 0.28 },
      { id: 'left_elbow', x: 0.38, y: 0.40 },
      { id: 'right_elbow', x: 0.60, y: 0.40 },
      { id: 'left_wrist', x: 0.40, y: 0.50 },
      { id: 'right_wrist', x: 0.58, y: 0.50 },
      { id: 'left_hip', x: 0.45, y: 0.52 },
      { id: 'right_hip', x: 0.55, y: 0.52 },
      { id: 'left_knee', x: 0.44, y: 0.70 },
      { id: 'right_knee', x: 0.56, y: 0.72 },
      { id: 'left_ankle', x: 0.42, y: 0.88 },
      { id: 'right_ankle', x: 0.58, y: 0.90 },
    ],
    framingGuides: {
      recommendedLens: '2x',
      cameraAngle: 'eye_level',
      ruleOfThirdsLine: 'left_vertical',
    },
    subjectCues: [
      'walk away from the camera, then turn your chin back toward the lens',
      'let your hair trail naturally with the turning motion',
      'catch the photographer’s eyes with a fleeting, playful expression',
    ],
    photographerCues: [
      'call the subject’s name right before tapping shutter to catch the turn',
      'keep autofocus locked on the subject’s face',
    ],
  },

  // 4. couple category
  {
    id: 'couple_forehead_01',
    title: 'forehead touch',
    category: 'couple',
    difficulty: 'moderate',
    isPro: true,
    skeletonJoints: [
      // person a (left)
      { id: 'nose', x: 0.46, y: 0.26 },
      { id: 'left_shoulder', x: 0.38, y: 0.35 },
      { id: 'right_shoulder', x: 0.48, y: 0.35 },
      { id: 'left_hip', x: 0.40, y: 0.58 },
      { id: 'right_hip', x: 0.48, y: 0.58 },
      { id: 'left_knee', x: 0.38, y: 0.76 },
      { id: 'right_knee', x: 0.46, y: 0.76 },
      { id: 'left_ankle', x: 0.36, y: 0.92 },
      { id: 'right_ankle', x: 0.44, y: 0.92 },
      // person b (right)
      { id: 'left_elbow', x: 0.54, y: 0.35 },
      { id: 'right_elbow', x: 0.64, y: 0.35 },
      { id: 'left_wrist', x: 0.50, y: 0.48 },
      { id: 'right_wrist', x: 0.58, y: 0.48 },
    ],
    framingGuides: {
      recommendedLens: '2x',
      cameraAngle: 'eye_level',
      ruleOfThirdsLine: 'center',
    },
    subjectCues: [
      'stand close and rest your foreheads gently against each other',
      'close your eyes and smile softly as if whispering a secret',
      'wrap hands tenderly around partner’s waist or upper arm',
    ],
    photographerCues: [
      'step back and shoot at 2x lens to create shallow depth of field',
      'center the intimate space between their profiles',
    ],
  },
  {
    id: 'couple_sunset_walk_02',
    title: 'sunset stroll',
    category: 'couple',
    difficulty: 'easy',
    isPro: true,
    skeletonJoints: [
      { id: 'nose', x: 0.42, y: 0.24 },
      { id: 'left_shoulder', x: 0.34, y: 0.32 },
      { id: 'right_shoulder', x: 0.48, y: 0.32 },
      { id: 'left_elbow', x: 0.30, y: 0.44 },
      { id: 'right_elbow', x: 0.52, y: 0.44 },
      { id: 'left_wrist', x: 0.32, y: 0.56 },
      { id: 'right_wrist', x: 0.56, y: 0.56 },
      { id: 'left_hip', x: 0.38, y: 0.56 },
      { id: 'right_hip', x: 0.52, y: 0.56 },
      { id: 'left_knee', x: 0.36, y: 0.74 },
      { id: 'right_knee', x: 0.54, y: 0.74 },
      { id: 'left_ankle', x: 0.34, y: 0.92 },
      { id: 'right_ankle', x: 0.56, y: 0.92 },
    ],
    framingGuides: {
      recommendedLens: '1x',
      cameraAngle: 'eye_level',
      ruleOfThirdsLine: 'center',
    },
    subjectCues: [
      'hold hands and walk slowly away toward the golden sunset horizon',
      'lean in toward each other as you walk at a calm pace',
    ],
    photographerCues: [
      'keep the low golden sun behind the couple for glowing rim light',
      'frame couple in the lower third with expansive sunset sky above',
    ],
  },

  // 5. besties category
  {
    id: 'besties_laugh_01',
    title: 'candid giggle',
    category: 'besties',
    difficulty: 'easy',
    isPro: false,
    skeletonJoints: [
      { id: 'nose', x: 0.44, y: 0.26 },
      { id: 'left_shoulder', x: 0.36, y: 0.34 },
      { id: 'right_shoulder', x: 0.48, y: 0.34 },
      { id: 'left_elbow', x: 0.32, y: 0.46 },
      { id: 'right_elbow', x: 0.54, y: 0.46 },
      { id: 'left_wrist', x: 0.38, y: 0.54 },
      { id: 'right_wrist', x: 0.56, y: 0.54 },
      { id: 'left_hip', x: 0.40, y: 0.58 },
      { id: 'right_hip', x: 0.52, y: 0.58 },
      { id: 'left_knee', x: 0.38, y: 0.76 },
      { id: 'right_knee', x: 0.52, y: 0.76 },
      { id: 'left_ankle', x: 0.36, y: 0.92 },
      { id: 'right_ankle', x: 0.54, y: 0.92 },
    ],
    framingGuides: {
      recommendedLens: '1x',
      cameraAngle: 'eye_level',
      ruleOfThirdsLine: 'center',
    },
    subjectCues: [
      'stand side by side and share a whisper or private joke',
      'let out a genuine laugh while looking at each other',
      'lean your shoulders together naturally',
    ],
    photographerCues: [
      'use continuous burst mode while they interact naturally',
      'keep both faces sharp and capture spontaneous laughter',
    ],
  },

  // 6. mirror category
  {
    id: 'mirror_angle_01',
    title: 'mirror angle',
    category: 'mirror',
    difficulty: 'easy',
    isPro: false,
    skeletonJoints: [
      { id: 'nose', x: 0.52, y: 0.22 },
      { id: 'left_shoulder', x: 0.44, y: 0.30 },
      { id: 'right_shoulder', x: 0.58, y: 0.31 },
      { id: 'left_elbow', x: 0.42, y: 0.44 },
      { id: 'right_elbow', x: 0.64, y: 0.42 },
      { id: 'left_wrist', x: 0.48, y: 0.54 },
      { id: 'right_wrist', x: 0.54, y: 0.38 },
      { id: 'left_hip', x: 0.46, y: 0.58 },
      { id: 'right_hip', x: 0.56, y: 0.57 },
      { id: 'left_knee', x: 0.44, y: 0.76 },
      { id: 'right_knee', x: 0.58, y: 0.74 },
      { id: 'left_ankle', x: 0.46, y: 0.92 },
      { id: 'right_ankle', x: 0.56, y: 0.90 },
    ],
    framingGuides: {
      recommendedLens: '1x',
      cameraAngle: 'eye_level',
      ruleOfThirdsLine: 'center',
    },
    subjectCues: [
      'hold phone at upper chest level, tilted slightly forward',
      'angle hips 30 degrees away from the mirror',
      'pop your front knee toward the center to create body contour',
      'look directly into the reflection of your phone lens',
    ],
    photographerCues: [
      'keep camera steady and avoid harsh overhead spotlight reflection',
    ],
  },

  // 7. masc category
  {
    id: 'masc_jacket_01',
    title: 'jacket drape',
    category: 'masc',
    difficulty: 'easy',
    isPro: false,
    skeletonJoints: [
      { id: 'nose', x: 0.50, y: 0.20 },
      { id: 'left_shoulder', x: 0.38, y: 0.28 },
      { id: 'right_shoulder', x: 0.60, y: 0.28 },
      { id: 'left_elbow', x: 0.32, y: 0.42 },
      { id: 'right_elbow', x: 0.66, y: 0.40 },
      { id: 'left_wrist', x: 0.36, y: 0.54 },
      { id: 'right_wrist', x: 0.58, y: 0.26 },
      { id: 'left_hip', x: 0.44, y: 0.54 },
      { id: 'right_hip', x: 0.56, y: 0.54 },
      { id: 'left_knee', x: 0.44, y: 0.74 },
      { id: 'right_knee', x: 0.56, y: 0.74 },
      { id: 'left_ankle', x: 0.44, y: 0.92 },
      { id: 'right_ankle', x: 0.56, y: 0.92 },
    ],
    framingGuides: {
      recommendedLens: '1x',
      cameraAngle: 'low_angle',
      ruleOfThirdsLine: 'center',
    },
    subjectCues: [
      'hook right thumb under jacket collar draped over your right shoulder',
      'keep left hand resting loosely in front pocket',
      'square shoulders and look firmly off-camera to the left',
    ],
    photographerCues: [
      'shoot from chest height to create strong masculine posture',
      'let jacket texture catch dramatic side light',
    ],
  },
  {
    id: 'masc_cuff_02',
    title: 'cuff adjustment',
    category: 'masc',
    difficulty: 'easy',
    isPro: true,
    skeletonJoints: [
      { id: 'nose', x: 0.48, y: 0.22 },
      { id: 'left_shoulder', x: 0.38, y: 0.30 },
      { id: 'right_shoulder', x: 0.58, y: 0.30 },
      { id: 'left_elbow', x: 0.34, y: 0.44 },
      { id: 'right_elbow', x: 0.54, y: 0.46 },
      { id: 'left_wrist', x: 0.44, y: 0.52 },
      { id: 'right_wrist', x: 0.46, y: 0.52 },
      { id: 'left_hip', x: 0.44, y: 0.56 },
      { id: 'right_hip', x: 0.56, y: 0.56 },
      { id: 'left_knee', x: 0.44, y: 0.74 },
      { id: 'right_knee', x: 0.56, y: 0.74 },
      { id: 'left_ankle', x: 0.44, y: 0.92 },
      { id: 'right_ankle', x: 0.56, y: 0.92 },
    ],
    framingGuides: {
      recommendedLens: '2x',
      cameraAngle: 'eye_level',
      ruleOfThirdsLine: 'center',
    },
    subjectCues: [
      'look down slightly while adjusting your watch or shirt cuff',
      'keep fingers purposeful and natural, not clenched',
    ],
    photographerCues: [
      'focus sharply on the watch/cuff detail with portrait blur',
    ],
  },

  // 8. fem category
  {
    id: 'fem_twirl_01',
    title: 'soft twirl',
    category: 'fem',
    difficulty: 'moderate',
    isPro: false,
    skeletonJoints: [
      { id: 'nose', x: 0.50, y: 0.22 },
      { id: 'left_shoulder', x: 0.42, y: 0.30 },
      { id: 'right_shoulder', x: 0.58, y: 0.30 },
      { id: 'left_elbow', x: 0.34, y: 0.40 },
      { id: 'right_elbow', x: 0.66, y: 0.40 },
      { id: 'left_wrist', x: 0.30, y: 0.48 },
      { id: 'right_wrist', x: 0.70, y: 0.48 },
      { id: 'left_hip', x: 0.44, y: 0.54 },
      { id: 'right_hip', x: 0.56, y: 0.54 },
      { id: 'left_knee', x: 0.42, y: 0.72 },
      { id: 'right_knee', x: 0.58, y: 0.74 },
      { id: 'left_ankle', x: 0.40, y: 0.90 },
      { id: 'right_ankle', x: 0.60, y: 0.92 },
    ],
    framingGuides: {
      recommendedLens: '1x',
      cameraAngle: 'eye_level',
      ruleOfThirdsLine: 'center',
    },
    subjectCues: [
      'gently lift skirt or dress fabric and perform a half-speed twirl',
      'let your head lead the turn with a radiant, open smile',
      'lift chin slightly as fabric flows around your legs',
    ],
    photographerCues: [
      'shoot continuous frames to freeze fabric movement at its peak flare',
      'leave ample room around the sides for dress movement',
    ],
  },
  {
    id: 'fem_hair_tuck_02',
    title: 'hair tuck',
    category: 'fem',
    difficulty: 'easy',
    isPro: false,
    skeletonJoints: [
      { id: 'nose', x: 0.48, y: 0.22 },
      { id: 'left_shoulder', x: 0.40, y: 0.30 },
      { id: 'right_shoulder', x: 0.56, y: 0.32 },
      { id: 'left_elbow', x: 0.34, y: 0.42 },
      { id: 'right_elbow', x: 0.62, y: 0.40 },
      { id: 'left_wrist', x: 0.38, y: 0.52 },
      { id: 'right_wrist', x: 0.54, y: 0.24 },
      { id: 'left_hip', x: 0.44, y: 0.56 },
      { id: 'right_hip', x: 0.54, y: 0.56 },
      { id: 'left_knee', x: 0.44, y: 0.74 },
      { id: 'right_knee', x: 0.54, y: 0.74 },
      { id: 'left_ankle', x: 0.44, y: 0.92 },
      { id: 'right_ankle', x: 0.54, y: 0.92 },
    ],
    framingGuides: {
      recommendedLens: '2x',
      cameraAngle: 'eye_level',
      ruleOfThirdsLine: 'center',
    },
    subjectCues: [
      'reach right hand up to tuck hair tenderly behind your ear',
      'tilt head 10 degrees to the left and look down with lashes soft',
      'breathe gently through slightly parted lips',
    ],
    photographerCues: [
      'frame from chest up with 2x zoom for delicate facial focus',
    ],
  },
];

export const getPoseById = (id: string): Pose | undefined => {
  return seedPoses.find(p => p.id === id);
};

export const getPosesByCategory = (category: string): Pose[] => {
  if (category === 'all') return seedPoses;
  return seedPoses.filter(p => p.category === category);
};

export const getPoseCatalogCount = (): number => {
  return seedPoses.length;
};
