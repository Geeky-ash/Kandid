import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { FlashMode, TimerDuration } from '../../stores/cameraStore';

interface CameraTopBarProps {
  onClose: () => void;
  flash: FlashMode;
  onToggleFlash: () => void;
  timer: TimerDuration;
  onToggleTimer: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  onOpenSoftLight: () => void;
  cueType: 'subject' | 'photographer';
  onToggleCueType: () => void;
}

export const CameraTopBar: React.FC<CameraTopBarProps> = ({
  onClose,
  flash,
  onToggleFlash,
  timer,
  onToggleTimer,
  showGrid,
  onToggleGrid,
  onOpenSoftLight,
  cueType,
  onToggleCueType,
}) => {
  const flashIcon = flash === 'on' ? '⚡' : flash === 'auto' ? '⚡A' : '⚡✕';
  const timerLabel = timer === 0 ? '⏱' : `${timer}s`;

  return (
    <SafeAreaView edges={['top']} style={styles.safeContainer}>
      <View style={styles.topBar}>
        {/* close button */}
        <TouchableOpacity
          accessibilityLabel="close camera"
          onPress={onClose}
          style={styles.circleButton}
        >
          <Text style={styles.circleIcon}>✕</Text>
        </TouchableOpacity>

        {/* cue toggle pill */}
        <TouchableOpacity onPress={onToggleCueType} style={styles.pillToggle}>
          <Text style={styles.pillToggleText}>
            {cueType === 'subject' ? 'cue: for you' : 'cue: photographer'}
          </Text>
        </TouchableOpacity>

        {/* control icons group */}
        <View style={styles.controlsGroup}>
          {/* soft light trigger */}
          <TouchableOpacity
            accessibilityLabel="toggle soft light"
            onPress={onOpenSoftLight}
            style={styles.circleButton}
          >
            <Text style={styles.circleIcon}>💡</Text>
          </TouchableOpacity>

          {/* grid toggle */}
          <TouchableOpacity
            accessibilityLabel="toggle grid"
            onPress={onToggleGrid}
            style={[styles.circleButton, showGrid && styles.circleButtonActive]}
          >
            <Text style={[styles.circleIcon, showGrid && styles.circleIconActive]}>#</Text>
          </TouchableOpacity>

          {/* timer toggle */}
          <TouchableOpacity
            accessibilityLabel="toggle timer"
            onPress={onToggleTimer}
            style={[styles.circleButton, timer > 0 && styles.circleButtonActive]}
          >
            <Text style={[styles.circleIcon, timer > 0 && styles.circleIconActive]}>
              {timerLabel}
            </Text>
          </TouchableOpacity>

          {/* flash toggle */}
          <TouchableOpacity
            accessibilityLabel="toggle flash"
            onPress={onToggleFlash}
            style={[styles.circleButton, flash !== 'off' && styles.circleButtonActive]}
          >
            <Text style={[styles.circleIcon, flash !== 'off' && styles.circleIconActive]}>
              {flashIcon}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.marginMobile,
    paddingVertical: space.xs,
  },
  circleButton: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(28, 26, 24, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(252, 249, 244, 0.20)',
  },
  circleButtonActive: {
    backgroundColor: colors.brand.gold,
    borderColor: colors.brand.goldDark,
  },
  circleIcon: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.labelSm,
    fontWeight: typography.fontWeight.bold,
  },
  circleIconActive: {
    color: colors.text.onGold,
  },
  pillToggle: {
    paddingHorizontal: space.sm,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(28, 26, 24, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(252, 249, 244, 0.20)',
  },
  pillToggleText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    color: colors.background.primary,
    fontWeight: typography.fontWeight.medium,
  },
  controlsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
  },
});
