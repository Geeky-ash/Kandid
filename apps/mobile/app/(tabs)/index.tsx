import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { copy } from '@kandid/content';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* top header bar */}
        <View style={styles.headerRow}>
          <Text style={styles.brandTitle}>{copy.brand.name}</Text>
          <View style={styles.proBadge}>
            <Text style={styles.proBadgeText}>guest mode</Text>
          </View>
        </View>

        {/* editorial headline */}
        <View style={styles.heroSection}>
          <Text style={styles.headlineText}>{copy.home.headerTitle}</Text>
          <Text style={styles.subtitleText}>{copy.home.headerSubtitle}</Text>
        </View>

        {/* dual mode selector cards */}
        <View style={styles.cardsContainer}>
          {/* mode card 1: pose camera */}
          <TouchableOpacity
            style={styles.modeCardPrimary}
            onPress={() => router.push('/camera')}
            activeOpacity={0.85}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={styles.modeCardIcon}>📸</Text>
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>{copy.home.modes.poseCamera.badge}</Text>
              </View>
            </View>
            <Text style={styles.modeCardTitle}>{copy.home.modes.poseCamera.title}</Text>
            <Text style={styles.modeCardSubtitle}>{copy.home.modes.poseCamera.subtitle}</Text>
          </TouchableOpacity>

          {/* mode card 2: hands-free series */}
          <TouchableOpacity
            style={styles.modeCardSecondary}
            onPress={() => router.push('/camera')}
            activeOpacity={0.85}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={styles.modeCardIcon}>⏱️</Text>
              <View style={styles.proPillBadge}>
                <Text style={styles.proPillBadgeText}>{copy.home.modes.handsFreeSeries.badge}</Text>
              </View>
            </View>
            <Text style={styles.modeCardTitleSecondary}>{copy.home.modes.handsFreeSeries.title}</Text>
            <Text style={styles.modeCardSubtitleSecondary}>{copy.home.modes.handsFreeSeries.subtitle}</Text>
          </TouchableOpacity>
        </View>

        {/* quick actions row */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>quick tools</Text>
        </View>

        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={styles.quickActionPill}
            onPress={() => router.push('/camera')}
            activeOpacity={0.8}
          >
            <Text style={styles.quickActionIcon}>💡</Text>
            <Text style={styles.quickActionLabel}>{copy.home.quickActions.softLight}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionPill}
            onPress={() => router.push('/(tabs)/poses')}
            activeOpacity={0.8}
          >
            <Text style={styles.quickActionIcon}>✨</Text>
            <Text style={styles.quickActionLabel}>{copy.home.quickActions.poseMe}</Text>
          </TouchableOpacity>
        </View>

        {/* bottom spacing for floating tab bar */}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: space.md,
  },
  brandTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineMd,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    letterSpacing: typography.letterSpacing.tight,
  },
  proBadge: {
    paddingHorizontal: space.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  proBadgeText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  heroSection: {
    marginBottom: space.lg,
  },
  headlineText: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineLg,
    lineHeight: typography.lineHeight.headlineLg,
    color: colors.text.primary,
    letterSpacing: typography.letterSpacing.tight,
    marginBottom: 6,
  },
  subtitleText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodyMd,
    color: colors.text.secondary,
  },
  cardsContainer: {
    gap: space.md,
    marginBottom: space.lg,
  },
  modeCardPrimary: {
    backgroundColor: colors.brand.gold,
    borderRadius: radius['2xl'],
    padding: space.lg,
    shadowColor: colors.brand.goldDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.20,
    shadowRadius: 16,
    elevation: 4,
  },
  modeCardSecondary: {
    backgroundColor: colors.background.surface,
    borderRadius: radius['2xl'],
    padding: space.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: space.md,
  },
  modeCardIcon: {
    fontSize: 28,
  },
  popularBadge: {
    backgroundColor: colors.text.onGold, // espresso badge on gold card
    paddingHorizontal: space.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  popularBadgeText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 11,
    color: colors.background.primary,
    fontWeight: typography.fontWeight.bold,
  },
  proPillBadge: {
    backgroundColor: colors.brand.sageTint,
    paddingHorizontal: space.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  proPillBadgeText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 11,
    color: colors.brand.sageDark,
    fontWeight: typography.fontWeight.bold,
  },
  modeCardTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineMd,
    color: colors.text.onGold, // strictly espresso text on gold
    marginBottom: 4,
  },
  modeCardSubtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: '#3A3228', // dark warm tone for contrast on gold
    lineHeight: 18,
  },
  modeCardTitleSecondary: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineMd,
    color: colors.text.primary,
    marginBottom: 4,
  },
  modeCardSubtitleSecondary: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  sectionHeader: {
    marginBottom: space.sm,
  },
  sectionTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineSm,
    color: colors.text.primary,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: space.md,
    marginBottom: space.xl,
  },
  quickActionPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.surface,
    paddingVertical: space.md,
    paddingHorizontal: space.sm,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    gap: space.xs,
  },
  quickActionIcon: {
    fontSize: 18,
  },
  quickActionLabel: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  bottomSpacer: {
    height: 100,
  },
});
