import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { copy } from '@kandid/content';
import { PillButton } from '../../src/components/common/PillButton';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{copy.profile.title}</Text>
        </View>

        {/* guest status card */}
        <View style={styles.guestCard}>
          <Text style={styles.guestTitle}>guest account</Text>
          <Text style={styles.guestDesc}>{copy.profile.guestNotice}</Text>
          <View style={styles.signInGroup}>
            <PillButton
              label={copy.profile.signInWithApple}
              variant="secondary"
              onPress={() => {}}
              style={styles.signInButton}
            />
            <PillButton
              label={copy.profile.signInWithGoogle}
              variant="secondary"
              onPress={() => {}}
              style={styles.signInButton}
            />
          </View>
        </View>

        {/* stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>{copy.profile.shootsCompleted}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>{copy.profile.savedPoses}</Text>
          </View>
        </View>

        {/* privacy & data governance */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{copy.profile.privacySection}</Text>
          <Text style={styles.sectionBody}>{copy.profile.zeroRetentionDesc}</Text>
        </View>

        {/* legal links */}
        <View style={styles.legalSection}>
          <TouchableOpacity style={styles.legalRow}>
            <Text style={styles.legalText}>{copy.profile.legal.termsOfService}</Text>
            <Text style={styles.legalArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.legalRow}>
            <Text style={styles.legalText}>{copy.profile.legal.privacyPolicy}</Text>
            <Text style={styles.legalArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.legalRow}>
            <Text style={styles.legalText}>{copy.profile.legal.eula}</Text>
            <Text style={styles.legalArrow}>›</Text>
          </TouchableOpacity>
          <Text style={styles.copyrightText}>{copy.profile.legal.copyright}</Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    paddingHorizontal: space.marginMobile,
    paddingTop: space.sm,
  },
  header: {
    marginBottom: space.md,
  },
  title: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineLg,
    color: colors.text.primary,
  },
  guestCard: {
    backgroundColor: colors.background.surface,
    borderRadius: radius['2xl'],
    padding: space.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    marginBottom: space.lg,
  },
  guestTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineSm,
    color: colors.text.primary,
    marginBottom: 4,
  },
  guestDesc: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.secondary,
    lineHeight: 18,
    marginBottom: space.md,
  },
  signInGroup: {
    gap: space.sm,
  },
  signInButton: {
    width: '100%',
  },
  statsRow: {
    flexDirection: 'row',
    gap: space.md,
    marginBottom: space.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background.surface,
    borderRadius: radius.xl,
    padding: space.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineMd,
    color: colors.text.primary,
  },
  statLabel: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: colors.background.surface,
    borderRadius: radius.xl,
    padding: space.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    marginBottom: space.lg,
  },
  sectionTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  sectionBody: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 16,
  },
  legalSection: {
    paddingVertical: space.sm,
  },
  legalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: space.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  legalText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.primary,
  },
  legalArrow: {
    fontSize: 18,
    color: colors.text.tertiary,
  },
  copyrightText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 11,
    color: colors.text.tertiary,
    marginTop: space.md,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 100,
  },
});
