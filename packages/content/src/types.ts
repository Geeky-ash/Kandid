/**
 * @kandid/content — domain types
 */

export type JointId =
  | 'nose'
  | 'left_shoulder'
  | 'right_shoulder'
  | 'left_elbow'
  | 'right_elbow'
  | 'left_wrist'
  | 'right_wrist'
  | 'left_hip'
  | 'right_hip'
  | 'left_knee'
  | 'right_knee'
  | 'left_ankle'
  | 'right_ankle';

export interface JointCoordinate {
  id: JointId;
  x: number; // 0.0 to 1.0 normalized
  y: number; // 0.0 to 1.0 normalized
  confidence?: number;
}

export type PoseCategory =
  | 'all'
  | 'solo'
  | 'duo'
  | 'seated'
  | 'standing'
  | 'mirror'
  | 'golden_hour'
  | 'casual'
  | 'editorial';

export interface FramingGuides {
  recommendedLens: '0.5x' | '1x' | '2x' | '3x';
  cameraAngle: 'waist_level' | 'eye_level' | 'low_angle';
  ruleOfThirdsLine: 'left_vertical' | 'right_vertical' | 'center';
}

export interface Pose {
  id: string;
  title: string;
  category: PoseCategory;
  difficulty: 'easy' | 'moderate' | 'expert';
  isPro: boolean;
  skeletonJoints: JointCoordinate[];
  framingGuides: FramingGuides;
  subjectCues: string[];
  photographerCues: string[];
}

export interface GemLook {
  id: string;
  name: string;
  description: string;
  isPro: boolean;
  colorMatrix: number[];
  defaultIntensity: number; // 0.0 to 1.0
}

export interface BestShotVerdict {
  photoId: string;
  verdict: 'post' | 'keep' | 'delete';
  score: number; // 0 to 100
  reason: string; // lowercase descriptive reason
  technicalScores: {
    sharpness: number;
    lighting: number;
    framing: number;
    expression: number;
  };
}
