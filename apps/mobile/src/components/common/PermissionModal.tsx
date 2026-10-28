import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { PillButton } from './PillButton';
import { triggerHaptic } from '../../utils/haptics';

interface PermissionModalProps {
  visible: boolean;
  onClose: () => void;
  onRequestPermissions: () => void;
}

export const PermissionModal: React.FC<PermissionModalProps> = ({
  visible,
  onClose,
  onRequestPermissions,
}) => {
  const handleGrant = () => {
    triggerHaptic.medium();
    onRequestPermissions();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.iconContainer}><Text style={styles.icon}>📷</Text></View>
          <Text style={styles.title}>device permissions</Text>
          <Text style={styles.subtitle}>
            kandid operates 100% privately on your device. we only ask for permissions needed to compose and save your photos.
          </Text>

          <View style={styles.permissionList}>
            <View style={styles.permissionItem}>
              <View style={styles.badge}><Text style={styles.badgeText}>camera</Text></View>
              <Text style={styles.itemText}>displays parametric pose lines and captures photos.</Text>
            </View>
            <View style={styles.permissionItem}>
              <View style={styles.badge}><Text style={styles.badgeText}>photos</Text></View>
              <Text style={styles.itemText}>saves your final editorial keeps to your camera roll.</Text>
            </View>
          </View>

          <View style={styles.privacyNote}>
            <Text style={styles.privacyIcon}>🔒</Text>
            <Text style={styles.privacyText}>
              zero cloud image retention. your photos never touch remote servers or training datasets.
            </Text>
          </View>

          <View style={styles.actions}>
            <PillButton label="grant permissions" variant="primary" onPress={handleGrant} style={styles.button} />
            <TouchableOpacity onPress={() => { triggerHaptic.light(); onClose(); }} style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>maybe later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(28, 26, 24, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: space.lg,
  },
  sheet: {
    width: '100%',
    backgroundColor: colors.background.primary,
    borderRadius: radius['2xl'],
    padding: space.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(197, 168, 128, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.sm,
  },
  icon: { fontSize: 22 },
  title: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineMd,
    color: colors.text.primary,
    marginBottom: space.xs,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.secondary,
    lineHeight: 18,
    marginBottom: space.md,
  },
  permissionList: { gap: space.sm, marginBottom: space.md },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    backgroundColor: colors.background.surface,
    padding: space.sm,
    borderRadius: radius.md,
  },
  badge: { backgroundColor: colors.brand.sage, paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill },
  badgeText: { fontFamily: typography.fontFamilies.body, fontSize: 12, fontWeight: typography.fontWeight.semibold, color: colors.text.inverse },
  itemText: { flex: 1, fontFamily: typography.fontFamilies.body, fontSize: 12, color: colors.text.primary, lineHeight: 16 },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    backgroundColor: 'rgba(91, 126, 104, 0.12)',
    padding: space.sm,
    borderRadius: radius.md,
    marginBottom: space.lg,
  },
  privacyIcon: { fontSize: 16 },
  privacyText: { flex: 1, fontFamily: typography.fontFamilies.body, fontSize: 12, color: colors.brand.sage, lineHeight: 16 },
  actions: { gap: space.xs },
  button: { width: '100%' },
  secondaryButton: { paddingVertical: space.sm, alignItems: 'center' },
  secondaryText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.bodySm, color: colors.text.secondary },
});
