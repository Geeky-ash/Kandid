import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, space, typography } from '@kandid/ui-tokens';

interface PoseActionBarProps {
  isSaved: boolean;
  onToggleSave: () => void;
  onUsePose: () => void;
}

export const PoseActionBar: React.FC<PoseActionBarProps> = ({
  isSaved,
  onToggleSave,
  onUsePose,
}) => {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        {/* secondary outline pill: save to shoot */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={isSaved ? 'remove from saved' : 'save to shoot'}
          onPress={onToggleSave}
          activeOpacity={0.8}
          style={[styles.outlinePill, isSaved && styles.outlinePillSaved]}
        >
          <Text style={[styles.heartIcon, isSaved && styles.heartIconActive]}>
            {isSaved ? '♥' : '♡'}
          </Text>
          <Text style={styles.outlinePillText}>
            {isSaved ? 'saved' : 'save to shoot'}
          </Text>
        </TouchableOpacity>

        {/* primary champagne gold pill: use this pose */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="use this pose"
          onPress={onUsePose}
          activeOpacity={0.85}
          style={styles.primaryGoldPill}
        >
          <Text style={styles.primaryGoldPillText}>use this pose</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingHorizontal: space.marginMobile,
    paddingVertical: space.sm,
  },
  outlinePill: {
    flex: 1,
    height: 50,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.xs,
  },
  outlinePillSaved: {
    borderColor: colors.brand.gold,
    backgroundColor: 'rgba(197, 168, 128, 0.12)',
  },
  outlinePillText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelMd,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  heartIcon: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  heartIconActive: {
    color: colors.brand.gold,
  },
  primaryGoldPill: {
    flex: 1.4,
    height: 50,
    borderRadius: radius.pill,
    backgroundColor: colors.brand.gold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.brand.goldDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryGoldPillText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelMd,
    color: colors.text.onGold, // espresso #1C1A18 strictly on gold
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.normal,
  },
});
