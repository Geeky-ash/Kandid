import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { ShutterMode, ZoomLevel } from '../../stores/cameraStore';
import { ZoomPillSelector } from './ZoomPillSelector';

const BURST_INTERVALS = [2, 3, 5] as const;

interface ShutterBarProps {
  zoomLevel: ZoomLevel;
  onSelectZoom: (z: ZoomLevel) => void;
  shutterMode: ShutterMode;
  onToggleShutterMode: (m: ShutterMode) => void;
  burstInterval: number;
  onSelectBurstInterval: (s: number) => void;
  isCapturing: boolean;
  onPressShutter: () => void;
  onFlipCamera: () => void;
  capturedCount: number;
}

import { triggerHaptic } from '../../utils/haptics';

export const ShutterBar: React.FC<ShutterBarProps> = ({
  zoomLevel,
  onSelectZoom,
  shutterMode,
  onToggleShutterMode,
  burstInterval,
  onSelectBurstInterval,
  isCapturing,
  onPressShutter,
  onFlipCamera,
  capturedCount,
}) => {
  const handleShutterPress = () => {
    triggerHaptic.heavy();
    onPressShutter();
  };

  const handleModeToggle = (m: ShutterMode) => {
    triggerHaptic.selection();
    onToggleShutterMode(m);
  };

  const handleBurstInterval = (sec: number) => {
    triggerHaptic.selection();
    onSelectBurstInterval(sec);
  };

  const handleFlip = () => {
    triggerHaptic.medium();
    onFlipCamera();
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.topSelectorRow}>
        <ZoomPillSelector
          zoomLevel={zoomLevel}
          onSelectZoom={z => {
            triggerHaptic.selection();
            onSelectZoom(z);
          }}
        />

        <View style={styles.modeTogglePill}>
          <TouchableOpacity
            onPress={() => handleModeToggle('single')}
            style={[styles.modeTab, shutterMode === 'single' && styles.modeTabActive]}
          >
            <Text style={[styles.modeTabText, shutterMode === 'single' && styles.modeTabTextActive]}>
              single
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleModeToggle('series')}
            style={[styles.modeTab, shutterMode === 'series' && styles.modeTabActive]}
          >
            <Text style={[styles.modeTabText, shutterMode === 'series' && styles.modeTabTextActive]}>
              series
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {shutterMode === 'series' && (
        <View style={styles.intervalRow}>
          <Text style={styles.intervalLabel}>burst interval:</Text>
          {BURST_INTERVALS.map(sec => (
            <TouchableOpacity
              key={sec}
              onPress={() => handleBurstInterval(sec)}
              style={[styles.intervalPill, burstInterval === sec && styles.intervalPillActive]}
            >
              <Text style={[styles.intervalPillText, burstInterval === sec && styles.intervalPillTextActive]}>
                {sec}s
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.shutterRow}>
        <View style={styles.galleryThumb}>
          {capturedCount > 0 ? (
            <Text style={styles.galleryCountText}>{capturedCount}</Text>
          ) : (
            <View style={styles.emptyGalleryIcon} />
          )}
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="take photo or start series"
          style={[styles.shutterOuterRing, isCapturing && styles.shutterOuterRingActive]}
          activeOpacity={0.8}
          onPress={handleShutterPress}
        >
          <View style={[styles.shutterInnerCircle, isCapturing && styles.shutterInnerCircleActive]} />
        </TouchableOpacity>

        <TouchableOpacity accessibilityLabel="flip camera" style={styles.circleButton} onPress={handleFlip}>
          <Text style={styles.flipIcon}>🔄</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(14, 13, 12, 0.95)',
    paddingVertical: space.xs,
  },
  topSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: space.marginMobile,
    marginBottom: space.xs,
  },
  modeTogglePill: {
    flexDirection: 'row',
    backgroundColor: 'rgba(252, 249, 244, 0.12)',
    borderRadius: radius.pill,
    padding: 2,
  },
  modeTab: { paddingHorizontal: space.sm, paddingVertical: 4, borderRadius: radius.pill },
  modeTabActive: { backgroundColor: colors.brand.espresso },
  modeTabText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    color: 'rgba(252, 249, 244, 0.65)',
  },
  modeTabTextActive: { color: colors.brand.gold, fontWeight: typography.fontWeight.bold },
  intervalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.xs,
    marginBottom: space.xs,
  },
  intervalLabel: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    color: 'rgba(252, 249, 244, 0.70)',
  },
  intervalPill: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(252, 249, 244, 0.10)',
  },
  intervalPillActive: { backgroundColor: colors.brand.gold },
  intervalPillText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    color: colors.text.inverse,
  },
  intervalPillTextActive: { color: colors.text.onGold, fontWeight: typography.fontWeight.bold },
  shutterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.marginMobile,
    height: 80,
  },
  galleryThumb: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: 'rgba(252, 249, 244, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(252, 249, 244, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryCountText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelLg,
    color: colors.brand.gold,
    fontWeight: typography.fontWeight.bold,
  },
  emptyGalleryIcon: { width: 16, height: 16, borderRadius: 4, backgroundColor: 'rgba(252, 249, 244, 0.30)' },
  shutterOuterRing: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 4,
    borderColor: colors.brand.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterOuterRingActive: { borderColor: colors.status.error },
  shutterInnerCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.background.primary },
  shutterInnerCircleActive: { width: 32, height: 32, borderRadius: radius.sm, backgroundColor: colors.status.error },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(252, 249, 244, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipIcon: { fontSize: 20 },
});
