import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { colors, radius, space, typography } from '@kandid/ui-tokens';

export interface CueCardProps {
  cueText: string;
  cueType: 'subject' | 'photographer';
  currentStep: number;
  totalSteps: number;
  onNextCue: () => void;
  onPrevCue?: () => void;
}

export const CueCard: React.FC<CueCardProps> = ({
  cueText,
  cueType,
  currentStep,
  totalSteps,
  onNextCue,
}) => {
  const isSubject = cueType === 'subject';
  const pillLabel = isSubject ? 'for you' : 'for photographer';
  const stepLabel = `cue ${currentStep} of ${totalSteps}`;

  return (
    <View pointerEvents="box-none" style={styles.safeZoneDock}>
      <View style={styles.cardContainer}>
        <View style={styles.contentColumn}>
          <View style={styles.metaRow}>
            <View style={[styles.typeBadge, isSubject ? styles.subjectBadge : styles.photographerBadge]}>
              <Text style={styles.typeBadgeText}>{pillLabel}</Text>
            </View>
            <Text style={styles.stepText}>{stepLabel}</Text>
          </View>
          <Text style={styles.cueText} numberOfLines={2}>
            {cueText}
          </Text>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="advance to next cue"
          onPress={onNextCue}
          style={styles.advanceButton}
          activeOpacity={0.7}
        >
          <Text style={styles.advanceArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // strictly docked above shutter container (bottom: 120px), leaving central 70% unobstructed
  safeZoneDock: {
    position: 'absolute',
    bottom: 120,
    left: space.marginMobile,
    right: space.marginMobile,
    alignItems: 'center',
    zIndex: 40,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 380,
    maxHeight: 72,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    backgroundColor: Platform.OS === 'android' ? colors.background.cueCardFallback : colors.background.cueCard,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(252, 249, 244, 0.20)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  contentColumn: {
    flex: 1,
    marginRight: space.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  typeBadge: {
    paddingHorizontal: space.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
    marginRight: space.sm,
  },
  subjectBadge: {
    backgroundColor: colors.brand.gold,
  },
  photographerBadge: {
    backgroundColor: colors.brand.sageDark,
  },
  typeBadgeText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onGold, // espresso text on gold
    textTransform: 'lowercase',
  },
  stepText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 11,
    color: colors.text.inverse,
    opacity: 0.75,
  },
  cueText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    lineHeight: 16,
    color: colors.text.inverse, // 15.2:1 contrast against dark scrim
    fontWeight: typography.fontWeight.medium,
  },
  advanceButton: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(252, 249, 244, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  advanceArrow: {
    fontSize: 16,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.bold,
  },
});
