import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Pose } from '@kandid/content';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { MannequinView } from '../camera/MannequinView';

interface PoseHeroProps {
  pose: Pose;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_WIDTH = SCREEN_WIDTH - space.marginMobile * 2;
const HERO_HEIGHT = 280;

export const PoseHero: React.FC<PoseHeroProps> = ({ pose }) => {
  return (
    <View style={styles.container}>
      {/* simulated rule-of-thirds grid background */}
      <View style={styles.gridOverlay}>
        <View style={styles.gridLineH1} />
        <View style={styles.gridLineH2} />
        <View style={styles.gridLineV1} />
        <View style={styles.gridLineV2} />
      </View>

      {/* parametric skia mannequin outline */}
      <MannequinView
        joints={pose.skeletonJoints}
        width={HERO_WIDTH}
        height={HERO_HEIGHT}
        topOffset={12}
      />

      {/* floating tags overlay */}
      <View style={styles.tagsContainer}>
        <View style={styles.pillTag}>
          <Text style={styles.pillTagText}>{pose.category}</Text>
        </View>

        <View style={styles.pillTag}>
          <Text style={styles.pillTagText}>{pose.difficulty}</Text>
        </View>

        {pose.isPro && (
          <View style={styles.proTag}>
            <Text style={styles.proTagText}>pro</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: HERO_WIDTH,
    height: HERO_HEIGHT,
    alignSelf: 'center',
    backgroundColor: '#1C1A18', // dark backdrop to contrast golden mannequin vectors
    borderRadius: radius['3xl'],
    overflow: 'hidden',
    position: 'relative',
    marginVertical: space.md,
    borderWidth: 1,
    borderColor: 'rgba(252, 249, 244, 0.08)',
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFill,
  },
  gridLineH1: {
    position: 'absolute',
    top: '33.33%',
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(252, 249, 244, 0.12)',
  },
  gridLineH2: {
    position: 'absolute',
    top: '66.66%',
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(252, 249, 244, 0.12)',
  },
  gridLineV1: {
    position: 'absolute',
    left: '33.33%',
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(252, 249, 244, 0.12)',
  },
  gridLineV2: {
    position: 'absolute',
    left: '66.66%',
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(252, 249, 244, 0.12)',
  },
  tagsContainer: {
    position: 'absolute',
    bottom: space.md,
    left: space.md,
    right: space.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    zIndex: 30,
  },
  pillTag: {
    backgroundColor: 'rgba(28, 26, 24, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(252, 249, 244, 0.20)',
    paddingHorizontal: space.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  pillTagText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    color: colors.background.primary,
    fontWeight: typography.fontWeight.medium,
  },
  proTag: {
    backgroundColor: colors.brand.gold,
    paddingHorizontal: space.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  proTagText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    color: colors.text.onGold,
    fontWeight: typography.fontWeight.bold,
  },
});
