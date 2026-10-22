import React from 'react';
import { View, StyleSheet, Dimensions, StyleProp, ViewStyle } from 'react-native';
import { JointCoordinate } from '@kandid/content';
import { colors } from '@kandid/ui-tokens';

export interface MannequinViewProps {
  joints: JointCoordinate[];
  width?: number;
  height?: number;
  topOffset?: number;
  style?: StyleProp<ViewStyle>;
}

const BONE_CONNECTIONS: [string, string][] = [
  ['nose', 'left_shoulder'],
  ['nose', 'right_shoulder'],
  ['left_shoulder', 'right_shoulder'],
  ['left_shoulder', 'left_elbow'],
  ['left_elbow', 'left_wrist'],
  ['right_shoulder', 'right_elbow'],
  ['right_elbow', 'right_wrist'],
  ['left_shoulder', 'left_hip'],
  ['right_shoulder', 'right_hip'],
  ['left_hip', 'right_hip'],
  ['left_hip', 'left_knee'],
  ['left_knee', 'left_ankle'],
  ['right_hip', 'right_knee'],
  ['right_knee', 'right_ankle'],
];

export const MannequinView: React.FC<MannequinViewProps> = ({
  joints,
  width = Dimensions.get('window').width,
  height = Dimensions.get('window').height * 0.70,
  topOffset = 0,
  style,
}) => {
  const jointMap = new Map(joints.map(j => [j.id, j]));

  return (
    <View pointerEvents="none" style={[styles.canvas, { width, height, top: topOffset }, style]}>
      {/* render connecting bone lines */}
      {BONE_CONNECTIONS.map(([idA, idB], index) => {
        const a = jointMap.get(idA as JointCoordinate['id']);
        const b = jointMap.get(idB as JointCoordinate['id']);
        if (!a || !b) return null;

        const x1 = a.x * width;
        const y1 = a.y * height;
        const x2 = b.x * width;
        const y2 = b.y * height;
        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

        return (
          <View
            key={`bone-${index}`}
            style={[
              styles.boneLine,
              {
                width: length,
                left: x1,
                top: y1,
                transform: [{ rotate: `${angle}deg` }],
              },
            ]}
          />
        );
      })}

      {/* render joint dots */}
      {joints.map(j => (
        <View
          key={j.id}
          style={[
            styles.jointDot,
            {
              left: j.x * width - 5,
              top: j.y * height - 5,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 20,
  },
  boneLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'rgba(252, 249, 244, 0.70)',
    transformOrigin: 'left center',
    borderRadius: 1,
  },
  jointDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.brand.gold,
    borderWidth: 1.5,
    borderColor: colors.background.primary,
  },
});
