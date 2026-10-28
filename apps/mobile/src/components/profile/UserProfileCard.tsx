import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { useAuthStore } from '../../stores/authStore';
import { PillButton } from '../common/PillButton';
import { triggerHaptic } from '../../utils/haptics';

export const UserProfileCard: React.FC = () => {
  const { user, isGuest, signOut, signInWithEmail } = useAuthStore();

  const handleSignAction = () => {
    triggerHaptic.light();
    if (isGuest) {
      signInWithEmail('creator@kandid.app', 'demo');
    } else {
      signOut();
    }
  };

  const displayName = user?.name || 'guest creator';
  const displayEmail = user?.email || 'guest@kandid.app';
  const initials = isGuest ? 'GC' : displayName.slice(0, 2).toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.avatarRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{displayName}</Text>
            <View style={[styles.tierBadge, isGuest ? styles.badgeGuest : styles.badgePro]}>
              <Text style={[styles.tierText, isGuest ? styles.textGuest : styles.textPro]}>
                {isGuest ? 'guest tier' : 'kandid pro'}
              </Text>
            </View>
          </View>
          <Text style={styles.email}>{displayEmail}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <PillButton
          label={isGuest ? 'sign in to sync' : 'sign out'}
          variant="secondary"
          onPress={handleSignAction}
          style={styles.actionBtn}
        />
      </View>
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
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(197, 168, 128, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.brand.gold,
  },
  avatarText: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineSm,
    color: colors.brand.gold,
  },
  infoCol: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: space.xs, marginBottom: 2 },
  name: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineSm,
    color: colors.text.primary,
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  badgeGuest: { backgroundColor: 'rgba(28, 26, 24, 0.08)' },
  badgePro: { backgroundColor: colors.brand.gold },
  tierText: { fontFamily: typography.fontFamilies.body, fontSize: 12, fontWeight: typography.fontWeight.semibold },
  textGuest: { color: colors.text.secondary },
  textPro: { color: colors.text.onGold },
  email: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.text.secondary,
  },
  actionRow: { marginTop: space.md },
  actionBtn: { width: '100%' },
});
