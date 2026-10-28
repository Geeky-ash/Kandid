import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { useAuthStore } from '../../stores/authStore';
import { PillButton } from '../common/PillButton';
import { triggerHaptic } from '../../utils/haptics';

export const UserProfileCard: React.FC = () => {
  const router = useRouter();
  const { user, isGuest, signOut, fetchUserProfile } = useAuthStore();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleSignAction = () => {
    triggerHaptic.light();
    if (isGuest) {
      router.push('/auth');
    } else {
      signOut();
    }
  };

  const handleEditProfile = () => {
    triggerHaptic.selection();
    router.push('/profile-edit');
  };

  const displayName = user?.displayName || user?.name || 'guest creator';
  const displayEmail = user?.email || 'guest@kandid.app';
  const initials = isGuest ? 'GC' : displayName.slice(0, 2).toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.avatarRow}>
        <View style={styles.avatar}>
          {user?.avatarUrl ? (
            <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>{initials}</Text>
          )}
        </View>
        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>{displayName}</Text>
            <View style={[styles.tierBadge, isGuest ? styles.badgeGuest : styles.badgePro]}>
              <Text style={[styles.tierText, isGuest ? styles.textGuest : styles.textPro]}>
                {isGuest ? 'guest tier' : 'kandid pro'}
              </Text>
            </View>
          </View>
          <Text style={styles.email} numberOfLines={1}>{displayEmail}</Text>
          {user?.bio ? <Text style={styles.bioText} numberOfLines={1}>{user.bio}</Text> : null}
        </View>
      </View>

      <View style={styles.actionRow}>
        {!isGuest && (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={handleEditProfile}
            accessibilityRole="button"
          >
            <Text style={styles.editText}>edit profile</Text>
          </TouchableOpacity>
        )}
        <PillButton
          label={isGuest ? 'sign in to sync' : 'sign out'}
          variant="secondary"
          onPress={handleSignAction}
          style={!isGuest ? styles.signBtnCompact : styles.actionBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: colors.background.surface, borderRadius: radius['2xl'], padding: space.lg, borderWidth: 1, borderColor: colors.border.subtle, marginBottom: space.lg },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(197, 168, 128, 0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: colors.brand.gold, overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },
  avatarText: { fontFamily: typography.fontFamilies.headline, fontSize: typography.fontSize.headlineSm, color: colors.brand.gold },
  infoCol: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: space.xs, marginBottom: 2 },
  name: { fontFamily: typography.fontFamilies.headline, fontSize: typography.fontSize.headlineSm, color: colors.text.primary, maxWidth: 160 },
  tierBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill },
  badgeGuest: { backgroundColor: 'rgba(28, 26, 24, 0.08)' },
  badgePro: { backgroundColor: colors.brand.gold },
  tierText: { fontFamily: typography.fontFamilies.body, fontSize: 12, fontWeight: typography.fontWeight.semibold },
  textGuest: { color: colors.text.secondary },
  textPro: { color: colors.text.onGold },
  email: { fontFamily: typography.fontFamilies.body, fontSize: 12, color: colors.text.secondary },
  bioText: { fontFamily: typography.fontFamilies.body, fontSize: 12, color: colors.text.tertiary, marginTop: 2, fontStyle: 'italic' },
  actionRow: { marginTop: space.md, flexDirection: 'row', gap: space.sm },
  editBtn: { flex: 1, height: 44, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.brand.gold, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background.primary },
  editText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: colors.text.primary, fontWeight: typography.fontWeight.medium },
  actionBtn: { width: '100%' },
  signBtnCompact: { flex: 1 },
});
