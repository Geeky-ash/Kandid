import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { SoftLightColor } from '../../stores/cameraStore';

const COLOR_MAP: Record<SoftLightColor, { hex: string; label: string; desc: string }> = {
  neutral: { hex: '#FFFBF5', label: 'neutral', desc: 'clean pure white glow' },
  warm3200: { hex: '#FFD5A5', label: '3200k', desc: 'warm candlelight' },
  golden4500: { hex: '#FFE6C2', label: '4500k', desc: 'golden hour sunset' },
};
const BRIGHTNESS_STEPS = [0.35, 0.65, 0.85, 1.0] as const;

interface SoftLightModalProps {
  visible: boolean;
  onClose: () => void;
  color: SoftLightColor;
  onChangeColor: (c: SoftLightColor) => void;
  brightness: number;
  onChangeBrightness: (b: number) => void;
}

export const SoftLightModal: React.FC<SoftLightModalProps> = ({
  visible,
  onClose,
  color,
  onChangeColor,
  brightness,
  onChangeBrightness,
}) => {
  const activeHex = COLOR_MAP[color].hex;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.glowBackdrop, { backgroundColor: activeHex, opacity: brightness }]}>
        <View style={styles.viewfinderWindow} />
      </View>

      <SafeAreaView style={styles.overlayControls}>
        <View style={styles.topRow}>
          <Text style={styles.modalTitle}>soft light</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.panelContainer}>
          <Text style={styles.panelSectionLabel}>color temperature</Text>
          <View style={styles.colorPillsRow}>
            {(Object.keys(COLOR_MAP) as SoftLightColor[]).map(key => {
              const item = COLOR_MAP[key];
              const isSelected = color === key;
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => onChangeColor(key)}
                  style={[styles.colorPill, isSelected && styles.colorPillSelected]}
                >
                  <View style={[styles.colorSwatch, { backgroundColor: item.hex }]} />
                  <Text style={[styles.colorPillText, isSelected && styles.colorPillTextSelected]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.panelSectionLabel}>illumination level</Text>
          <View style={styles.brightnessRow}>
            {BRIGHTNESS_STEPS.map(level => {
              const isSelected = Math.abs(brightness - level) < 0.05;
              return (
                <TouchableOpacity
                  key={level}
                  onPress={() => onChangeBrightness(level)}
                  style={[styles.brightnessPill, isSelected && styles.brightnessPillSelected]}
                >
                  <Text style={[styles.brightnessPillText, isSelected && styles.brightnessPillTextSelected]}>
                    {Math.round(level * 100)}%
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  glowBackdrop: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  viewfinderWindow: {
    width: '74%',
    height: '52%',
    borderRadius: radius['3xl'],
    backgroundColor: 'rgba(28, 26, 24, 0.85)',
    borderWidth: 2,
    borderColor: 'rgba(252, 249, 244, 0.45)',
  },
  overlayControls: { ...StyleSheet.absoluteFill, justifyContent: 'space-between', paddingHorizontal: space.marginMobile },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: space.sm },
  modalTitle: { fontFamily: typography.fontFamilies.headline, fontSize: typography.fontSize.headlineMd, color: colors.text.primary },
  closeBtn: { width: 36, height: 36, borderRadius: radius.pill, backgroundColor: 'rgba(28, 26, 24, 0.65)', alignItems: 'center', justifyContent: 'center' },
  closeBtnText: { color: colors.text.inverse, fontSize: 16, fontWeight: typography.fontWeight.bold },
  panelContainer: {
    backgroundColor: 'rgba(28, 26, 24, 0.85)',
    padding: space.md,
    borderRadius: radius['2xl'],
    marginBottom: space.lg,
    borderWidth: 1,
    borderColor: 'rgba(252, 249, 244, 0.15)',
  },
  panelSectionLabel: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: 'rgba(252, 249, 244, 0.70)', marginBottom: space.xs },
  colorPillsRow: { flexDirection: 'row', gap: space.xs, marginBottom: space.md },
  colorPill: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: 'rgba(252, 249, 244, 0.10)' },
  colorPillSelected: { backgroundColor: colors.brand.gold },
  colorSwatch: { width: 12, height: 12, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(0,0,0,0.2)' },
  colorPillText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: colors.text.inverse },
  colorPillTextSelected: { color: colors.text.onGold, fontWeight: typography.fontWeight.bold },
  brightnessRow: { flexDirection: 'row', gap: space.xs },
  brightnessPill: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: radius.pill, backgroundColor: 'rgba(252, 249, 244, 0.10)' },
  brightnessPillSelected: { backgroundColor: colors.brand.gold },
  brightnessPillText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: colors.text.inverse },
  brightnessPillTextSelected: { color: colors.text.onGold, fontWeight: typography.fontWeight.bold },
});
