import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { triggerHaptic } from '../../utils/haptics';

interface PrivacySectionProps {
  onOpenPrivacyModal: () => void;
  onOpenPermissionsModal: () => void;
}

export const PrivacySection: React.FC<PrivacySectionProps> = ({
  onOpenPrivacyModal,
  onOpenPermissionsModal,
}) => {
  const [clearedNotice, setClearedNotice] = useState(false);

  const handleClearCache = () => {
    triggerHaptic.medium();
    Alert.alert(
      'clear local cache',
      'this will remove temporary image previews and cached pose guidelines from device storage.',
      [
        { text: 'cancel', style: 'cancel' },
        {
          text: 'clear now',
          style: 'destructive',
          onPress: () => {
            triggerHaptic.success();
            setClearedNotice(true);
            setTimeout(() => setClearedNotice(false), 2500);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>privacy & local storage</Text>
      <Text style={styles.sectionDesc}>
        kandid is architected with a strict zero-image retention policy. your photos never touch cloud storage or training pipelines.
      </Text>

      <TouchableOpacity onPress={() => { triggerHaptic.light(); onOpenPrivacyModal(); }} style={styles.actionRow}>
        <View style={styles.textCol}>
          <Text style={styles.actionTitle}>zero-storage architecture</Text>
          <Text style={styles.actionSub}>read our 4-pillar privacy commitment</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity onPress={() => { triggerHaptic.light(); onOpenPermissionsModal(); }} style={styles.actionRow}>
        <View style={styles.textCol}>
          <Text style={styles.actionTitle}>manage device permissions</Text>
          <Text style={styles.actionSub}>camera and photo library access controls</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity onPress={handleClearCache} style={styles.actionRow}>
        <View style={styles.textCol}>
          <Text style={styles.actionTitle}>clear temporary cache</Text>
          <Text style={styles.actionSub}>free up local preview buffers and guidelines</Text>
        </View>
        <Text style={styles.clearBtnText}>clear</Text>
      </TouchableOpacity>

      {clearedNotice && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>✓ local cache cleared successfully</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.surface,
    borderRadius: radius['2xl'],
    padding: space.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    marginBottom: space.lg,
  },
  sectionTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineSm,
    color: colors.text.primary,
    marginBottom: 4,
  },
  sectionDesc: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.secondary,
    lineHeight: 18,
    marginBottom: space.md,
  },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: space.xs },
  textCol: { flex: 1, paddingRight: space.sm },
  actionTitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  actionSub: { fontFamily: typography.fontFamilies.body, fontSize: 12, color: colors.text.secondary },
  arrow: { fontSize: 20, color: colors.text.secondary },
  clearBtnText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
    color: colors.brand.gold,
  },
  divider: { height: 1, backgroundColor: colors.border.subtle, marginVertical: space.sm },
  toast: {
    backgroundColor: 'rgba(91, 126, 104, 0.12)',
    borderRadius: radius.md,
    padding: space.sm,
    alignItems: 'center',
    marginTop: space.sm,
  },
  toastText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    fontWeight: typography.fontWeight.semibold,
    color: colors.brand.sage,
  },
});
