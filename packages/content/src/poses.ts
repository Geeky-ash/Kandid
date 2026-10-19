/**
 * @kandid/content — poses
 * seed catalog of parametric poses represented as normalized joint-angle coordinates.
 * rendered by @shopify/react-native-skia directly over viewfinder.
 */

import { Pose } from './types';

export const seedPoses: Pose[] = [
  {
    id: 'seated_editorial_01',
    title: 'seated lean',
    category: 'seated',
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
    id: 'standing_casual_01',
    title: 'casual wall lean',
    category: 'standing',
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
      'tuck one thumb into your front pocket to give your hand a natural anchor',
      'drop your chin half an inch and smile with your eyes',
    ],
    photographerCues: [
      'lower your phone to your own waist height and tilt upward 5 degrees',
      'include leading lines from the wall on the left side of frame',
      'leave headroom of about one-fifth screen height above subject',
    ],
  },
  {
    id: 'mirror_selfie_01',
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
      'pop your front knee toward the center to create natural body contour',
      'look directly into the mirror reflection of your phone lens',
    ],
    photographerCues: [
      'keep camera steady and check for glare from mirror spotlights',
    ],
  },
  {
    id: 'golden_hour_turn_01',
    title: 'golden hour turn',
    category: 'golden_hour',
    difficulty: 'moderate',
    isPro: true,
    skeletonJoints: [
      { id: 'nose', x: 0.46, y: 0.24 },
      { id: 'left_shoulder', x: 0.40, y: 0.32 },
      { id: 'right_shoulder', x: 0.54, y: 0.34 },
      { id: 'left_elbow', x: 0.34, y: 0.44 },
      { id: 'right_elbow', x: 0.58, y: 0.46 },
      { id: 'left_wrist', x: 0.36, y: 0.56 },
      { id: 'right_wrist', x: 0.50, y: 0.52 },
      { id: 'left_hip', x: 0.42, y: 0.56 },
      { id: 'right_hip', x: 0.52, y: 0.58 },
      { id: 'left_knee', x: 0.40, y: 0.74 },
      { id: 'right_knee', x: 0.54, y: 0.76 },
      { id: 'left_ankle', x: 0.42, y: 0.92 },
      { id: 'right_ankle', x: 0.52, y: 0.94 },
    ],
    framingGuides: {
      recommendedLens: '2x',
      cameraAngle: 'eye_level',
      ruleOfThirdsLine: 'left_vertical',
    },
    subjectCues: [
      'position yourself with the low golden sun warming your side profile',
      'turn your torso halfway away from camera, then look back over your shoulder',
      'let your hair catch the backlight glow',
      'hold a slight soft smile as the light hits your cheekbone',
    ],
    photographerCues: [
      'switch to 2x optical telephoto lens for flattering compression',
      'tap the sun flare rim to pull exposure down slightly and retain warm highlights',
      'keep the sun just outside the top corner of the camera frame',
    ],
  },
  {
    id: 'duo_candid_walk_01',
    title: 'duo stroll',
    category: 'duo',
    difficulty: 'moderate',
    isPro: true,
    skeletonJoints: [
      // left person
      { id: 'nose', x: 0.38, y: 0.26 },
      { id: 'left_shoulder', x: 0.30, y: 0.34 },
      { id: 'right_shoulder', x: 0.44, y: 0.35 },
      { id: 'left_hip', x: 0.32, y: 0.58 },
      { id: 'right_hip', x: 0.42, y: 0.59 },
      { id: 'left_knee', x: 0.30, y: 0.76 },
      { id: 'right_knee', x: 0.44, y: 0.74 },
      { id: 'left_ankle', x: 0.28, y: 0.92 },
      { id: 'right_ankle', x: 0.46, y: 0.90 },
      // right person
      { id: 'left_elbow', x: 0.58, y: 0.35 },
      { id: 'right_elbow', x: 0.68, y: 0.46 },
      { id: 'left_wrist', x: 0.48, y: 0.46 },
      { id: 'right_wrist', x: 0.60, y: 0.56 },
    ],
    framingGuides: {
      recommendedLens: '1x',
      cameraAngle: 'waist_level',
      ruleOfThirdsLine: 'center',
    },
    subjectCues: [
      'walk slowly toward the camera side by side at a natural talking pace',
      'share an inside joke and look at each other, not at the phone',
      'swing your outside arms naturally as you take small steps',
    ],
    photographerCues: [
      'use burst series or hands-free timer mode to capture movement in-between steps',
      'walk backwards at an even pace or crouch at 10 feet distance',
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
