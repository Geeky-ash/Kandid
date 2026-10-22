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
  onToggleType?: () => void;
}

export const CueCard: React.FC<CueCardProps> = ({
  cueText,
  cueType,
  currentStep,
  totalSteps,
  onNextCue,
  onPrevCue,
  onToggleType,
}) => {
  const isSubject = cueType === 'subject';
  const pillLabel = isSubject ? 'for you' : 'for photographer';
  const stepLabel = `cue ${currentStep} of ${totalSteps}`;

  return (
    <View pointerEvents="box-none" style={styles.safeZoneDock}>
      <View style={styles.cardContainer}>
        {onPrevCue && currentStep > 1 && (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="previous cue"
            onPress={onPrevCue}
            style={styles.navButton}
            activeOpacity={0.7}
          >
            <Text style={styles.navArrow}>‹</Text>
          </TouchableOpacity>
        )}

        <View style={styles.contentColumn}>
          <View style={styles.metaRow}>
            <TouchableOpacity
              onPress={onToggleType}
              activeOpacity={onToggleType ? 0.75 : 1}
              style={[styles.typeBadge, isSubject ? styles.subjectBadge : styles.photographerBadge]}
            >
              <Text style={[styles.typeBadgeText, !isSubject && styles.photographerBadgeText]}>
                {pillLabel}
              </Text>
            </TouchableOpacity>
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
          style={styles.navButton}
          activeOpacity={0.7}
        >
          <Text style={styles.navArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeZoneDock: {
    position: 'absolute',
    bottom: 120, // docked in safe zone above shutter container
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
    paddingHorizontal: space.sm,
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
  contentColumn: { flex: 1, marginHorizontal: space.xs },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2, gap: space.xs },
  typeBadge: { paddingHorizontal: space.sm, paddingVertical: 2, borderRadius: radius.pill },
  subjectBadge: { backgroundColor: colors.brand.gold },
  photographerBadge: { backgroundColor: colors.brand.sageDark },
  typeBadgeText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onGold,
    textTransform: 'lowercase',
  },
  photographerBadgeText: { color: colors.text.inverse },
  stepText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.inverse,
    opacity: 0.8,
  },
  cueText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    lineHeight: 16,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.medium,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(252, 249, 244, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navArrow: {
    fontSize: 20,
    lineHeight: 22,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.bold,
  },
});
