import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { JointCoordinate } from '@kandid/content';
import { colors, typography } from '@kandid/ui-tokens';
import { MannequinView } from './MannequinView';

interface CameraOverlayProps {
  joints: JointCoordinate[];
  showGrid: boolean;
  countdown: number;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const CameraOverlay: React.FC<CameraOverlayProps> = ({
  joints,
  showGrid,
  countdown,
}) => {
  return (
    <View pointerEvents="none" style={styles.container}>
      {/* rule-of-thirds grid lines */}
      {showGrid && (
        <View style={styles.gridContainer}>
          <View style={styles.gridLineH1} />
          <View style={styles.gridLineH2} />
          <View style={styles.gridLineV1} />
          <View style={styles.gridLineV2} />

          {/* subtle horizon level guide indicator */}
          <View style={styles.horizonGuide}>
            <View style={styles.horizonLineLeft} />
            <View style={styles.horizonCenterDot} />
            <View style={styles.horizonLineRight} />
          </View>
        </View>
      )}

      {/* parametric skia mannequin vector */}
      <MannequinView
        joints={joints}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT * 0.70}
        topOffset={65}
      />

      {/* countdown overlay banner */}
      {countdown > 0 && (
        <View style={styles.countdownContainer}>
          <View style={styles.countdownPill}>
            <Text style={styles.countdownText}>{countdown}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
  },
  gridContainer: {
    ...StyleSheet.absoluteFill,
  },
  gridLineH1: {
    position: 'absolute',
    top: '33.33%',
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(252, 249, 244, 0.22)',
  },
  gridLineH2: {
    position: 'absolute',
    top: '66.66%',
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(252, 249, 244, 0.22)',
  },
  gridLineV1: {
    position: 'absolute',
    left: '33.33%',
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(252, 249, 244, 0.22)',
  },
  gridLineV2: {
    position: 'absolute',
    left: '66.66%',
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(252, 249, 244, 0.22)',
  },
  horizonGuide: {
    position: 'absolute',
    top: '50%',
    left: '35%',
    right: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 0.65,
  },
  horizonLineLeft: {
    flex: 1,
    height: 1.5,
    backgroundColor: colors.brand.gold,
    borderRadius: 1,
  },
  horizonCenterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand.gold,
    marginHorizontal: 8,
  },
  horizonLineRight: {
    flex: 1,
    height: 1.5,
    backgroundColor: colors.brand.gold,
    borderRadius: 1,
  },
  countdownContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(28, 26, 24, 0.40)',
    zIndex: 50,
  },
  countdownPill: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.brand.gold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.brand.goldDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  countdownText: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 54,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onGold, // espresso strictly on gold per WCAG AA
  },
});
