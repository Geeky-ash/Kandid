import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { copy } from '@kandid/content';
import { PillButton } from '../src/components/common/PillButton';
import { useGuestStore } from '../src/stores/guestStore';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const completeOnboarding = useGuestStore(state => state.completeOnboarding);

  const handleGetStarted = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  const handleContinueAsGuest = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* top brand mark */}
        <View style={styles.topBar}>
          <Text style={styles.brandTitle}>{copy.brand.name}</Text>
        </View>

        {/* tilted photo collage hero section */}
        <View style={styles.collageSection}>
          <View style={[styles.photoCard, styles.photoCardLeft]}>
            <View style={styles.photoInner}>
              <Text style={styles.photoPlaceholderIcon}>🧍‍♀️</Text>
              <Text style={styles.photoCardCaption}>seated lean</Text>
            </View>
          </View>

          <View style={[styles.photoCard, styles.photoCardCenter]}>
            <View style={styles.photoInner}>
              <Text style={styles.photoPlaceholderIcon}>✨</Text>
              <Text style={styles.photoCardCaption}>city crosswalk</Text>
            </View>
          </View>

          <View style={[styles.photoCard, styles.photoCardRight]}>
            <View style={styles.photoInner}>
              <Text style={styles.photoPlaceholderIcon}>📷</Text>
              <Text style={styles.photoCardCaption}>golden turn</Text>
            </View>
          </View>
        </View>

        {/* copy block */}
        <View style={styles.copySection}>
          <Text style={styles.headlineText}>{copy.onboarding.welcomeTitle}</Text>
          <Text style={styles.subtitleText}>{copy.onboarding.welcomeSubtitle}</Text>

          {/* social proof badge */}
          <View style={styles.socialProofBadge}>
            <Text style={styles.socialProofIcon}>✦</Text>
            <Text style={styles.socialProofText}>
              coached thousands of candid poses with zero camera anxiety
            </Text>
          </View>
        </View>

        {/* action buttons */}
        <View style={styles.actionSection}>
          <PillButton
            label={copy.onboarding.getStarted}
            variant="primary"
            onPress={handleGetStarted}
            style={styles.ctaButton}
          />

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="continue as guest"
            onPress={handleContinueAsGuest}
            style={styles.guestLink}
            activeOpacity={0.7}
          >
            <Text style={styles.guestLinkText}>{copy.onboarding.continueAsGuest}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: space.marginMobile,
    justifyContent: 'space-between',
    paddingBottom: space.lg,
  },
  topBar: {
    paddingTop: space.sm,
    alignItems: 'center',
  },
  brandTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineMd,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    letterSpacing: typography.letterSpacing.tight,
  },
  collageSection: {
    height: 240,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: space.md,
  },
  photoCard: {
    position: 'absolute',
    width: width * 0.44,
    height: 190,
    borderRadius: radius['2xl'],
    backgroundColor: colors.background.surface,
    padding: space.xs,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 6,
  },
  photoCardLeft: {
    transform: [{ rotate: '-9deg' }, { translateX: -60 }],
    zIndex: 1,
  },
  photoCardCenter: {
    transform: [{ rotate: '0deg' }, { translateY: -10 }],
    zIndex: 3,
    borderColor: colors.brand.gold,
  },
  photoCardRight: {
    transform: [{ rotate: '10deg' }, { translateX: 60 }],
    zIndex: 2,
  },
  photoInner: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholderIcon: {
    fontSize: 40,
    marginBottom: space.xs,
  },
  photoCardCaption: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  copySection: {
    alignItems: 'center',
    paddingHorizontal: space.sm,
  },
  headlineText: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineLg,
    lineHeight: typography.lineHeight.headlineLg,
    color: colors.text.primary,
    textAlign: 'center',
    letterSpacing: typography.letterSpacing.tight,
    marginBottom: space.sm,
  },
  subtitleText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodyMd,
    lineHeight: typography.lineHeight.bodyMd,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: space.md,
  },
  socialProofBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand.sageTint,
    paddingHorizontal: space.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(91, 126, 104, 0.20)',
  },
  socialProofIcon: {
    color: colors.brand.sageDark,
    fontSize: 12,
    marginRight: 6,
  },
  socialProofText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.brand.sageDark,
    fontWeight: typography.fontWeight.medium,
  },
  actionSection: {
    width: '100%',
    alignItems: 'center',
    gap: space.md,
  },
  ctaButton: {
    width: '100%',
  },
  guestLink: {
    paddingVertical: space.xs,
  },
  guestLinkText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
    textDecorationLine: 'underline',
  },
});
