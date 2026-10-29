import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { ShutterMode, ZoomLevel } from '../../stores/cameraStore';
import { ZoomPillSelector } from './ZoomPillSelector';
import { BurstIntervalSelector } from './BurstIntervalSelector';
import { triggerHaptic } from '../../utils/haptics';

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
  return (
    <View pointerEvents="auto" style={styles.container}>
      <View style={styles.topSelectorRow}>
        <ZoomPillSelector
          zoomLevel={zoomLevel}
          onSelectZoom={z => { triggerHaptic.selection(); onSelectZoom(z); }}
        />

        <View style={styles.modeTogglePill}>
          <TouchableOpacity
            onPress={() => { triggerHaptic.selection(); onToggleShutterMode('single'); }}
            style={[styles.modeTab, shutterMode === 'single' && styles.modeTabActive]}
          >
            <Text style={[styles.modeTabText, shutterMode === 'single' && styles.modeTabTextActive]}>single</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { triggerHaptic.selection(); onToggleShutterMode('series'); }}
            style={[styles.modeTab, shutterMode === 'series' && styles.modeTabActive]}
          >
            <Text style={[styles.modeTabText, shutterMode === 'series' && styles.modeTabTextActive]}>series</Text>
          </TouchableOpacity>
        </View>
      </View>

      {shutterMode === 'series' && (
        <BurstIntervalSelector burstInterval={burstInterval} onSelectBurstInterval={onSelectBurstInterval} />
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
          onPress={() => { triggerHaptic.heavy(); onPressShutter(); }}
        >
          <View style={[styles.shutterInnerCircle, isCapturing && styles.shutterInnerCircleActive]} />
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityLabel="flip camera"
          style={styles.circleButton}
          onPress={() => { triggerHaptic.medium(); onFlipCamera(); }}
        >
          <Text style={styles.flipIcon}>🔄</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: 'rgba(14, 13, 12, 0.95)', paddingVertical: space.xs },
  topSelectorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: space.marginMobile, marginBottom: space.xs },
  modeTogglePill: { flexDirection: 'row', backgroundColor: 'rgba(252, 249, 244, 0.12)', borderRadius: radius.pill, padding: 2 },
  modeTab: { paddingHorizontal: space.sm, paddingVertical: 4, borderRadius: radius.pill },
  modeTabActive: { backgroundColor: colors.brand.espresso },
  modeTabText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: 'rgba(252, 249, 244, 0.65)' },
  modeTabTextActive: { color: colors.brand.gold, fontWeight: typography.fontWeight.bold },
  shutterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: space.marginMobile, height: 80 },
  galleryThumb: { width: 44, height: 44, borderRadius: radius.md, backgroundColor: 'rgba(252, 249, 244, 0.15)', borderWidth: 1.5, borderColor: 'rgba(252, 249, 244, 0.35)', alignItems: 'center', justifyContent: 'center' },
  galleryCountText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelLg, color: colors.brand.gold, fontWeight: typography.fontWeight.bold },
  emptyGalleryIcon: { width: 16, height: 16, borderRadius: 4, backgroundColor: 'rgba(252, 249, 244, 0.30)' },
  shutterOuterRing: { width: 74, height: 74, borderRadius: 37, borderWidth: 4, borderColor: colors.brand.gold, alignItems: 'center', justifyContent: 'center' },
  shutterOuterRingActive: { borderColor: colors.status.error },
  shutterInnerCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.background.primary },
  shutterInnerCircleActive: { width: 32, height: 32, borderRadius: radius.sm, backgroundColor: colors.status.error },
  circleButton: { width: 44, height: 44, borderRadius: radius.pill, backgroundColor: 'rgba(252, 249, 244, 0.15)', alignItems: 'center', justifyContent: 'center' },
  flipIcon: { fontSize: 20 },
});
