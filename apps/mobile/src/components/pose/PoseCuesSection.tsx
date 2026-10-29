import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pose } from '@kandid/content';
import { colors, radius, space, typography } from '@kandid/ui-tokens';

interface PoseCuesSectionProps {
  pose: Pose;
}

export const PoseCuesSection: React.FC<PoseCuesSectionProps> = ({ pose }) => {
  const [activeTab, setActiveTab] = useState<'subject' | 'photographer'>('subject');
  const cues = activeTab === 'subject' ? pose.subjectCues : pose.photographerCues;

  return (
    <View style={styles.container}>
      {/* tab selector */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'subject' }}
          style={[styles.tabButton, activeTab === 'subject' && styles.tabButtonActive]}
          onPress={() => setActiveTab('subject')}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.tabButtonText, activeTab === 'subject' && styles.tabButtonTextActive]}
          >
            for you ({pose.subjectCues.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'photographer' }}
          style={[styles.tabButton, activeTab === 'photographer' && styles.tabButtonActive]}
          onPress={() => setActiveTab('photographer')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'photographer' && styles.tabButtonTextActive,
            ]}
          >
            for photographer ({pose.photographerCues.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* cue cards list */}
      <View style={styles.cuesList}>
        {cues.map((cue, index) => {
          const stepNumber = String(index + 1).padStart(2, '0');
          return (
            <View key={`cue-${index}`} style={styles.cueCard}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>{stepNumber}</Text>
              </View>
              <Text style={styles.cueText}>{cue}</Text>
            </View>
          );
        })}
      </View>

      {/* framing guidelines summary */}
      <View style={styles.framingCard}>
        <Text style={styles.framingHeading}>framing notes</Text>
        <View style={styles.framingRow}>
          <View style={styles.framingItem}>
            <Text style={styles.framingItemLabel}>recommended lens</Text>
            <Text style={styles.framingItemValue}>{pose.framingGuides.recommendedLens}</Text>
          </View>
          <View style={styles.dividerV} />
          <View style={styles.framingItem}>
            <Text style={styles.framingItemLabel}>camera angle</Text>
            <Text style={styles.framingItemValue}>
              {pose.framingGuides.cameraAngle.replace('_', ' ')}
            </Text>
          </View>
          <View style={styles.dividerV} />
          <View style={styles.framingItem}>
            <Text style={styles.framingItemLabel}>grid anchor</Text>
            <Text style={styles.framingItemValue}>
              {pose.framingGuides.ruleOfThirdsLine.replace('_', ' ')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: space.marginMobile,
    marginTop: space.sm,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.background.surface,
    padding: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    marginBottom: space.md,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.pill,
  },
  tabButtonActive: {
    backgroundColor: colors.brand.espresso,
  },
  tabButtonText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelMd,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  tabButtonTextActive: {
    color: colors.background.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  cuesList: {
    gap: space.sm,
    marginBottom: space.lg,
  },
  cueCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background.surface,
    padding: space.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    gap: space.md,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(197, 168, 128, 0.20)', // light gold accent
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepBadgeText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    fontWeight: typography.fontWeight.bold,
    color: colors.brand.goldDark,
  },
  cueText: {
    flex: 1,
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodyMd,
    color: colors.text.primary,
    lineHeight: 20,
  },
  framingCard: {
    backgroundColor: colors.background.secondary,
    padding: space.md,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.border.subtle,
    marginBottom: space.xl,
  },
  framingHeading: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineSm,
    color: colors.text.primary,
    marginBottom: space.sm,
  },
  framingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: space.xs,
  },
  framingItem: {
    flex: 1,
    alignItems: 'center',
  },
  framingItemLabel: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.text.tertiary,
    marginBottom: 2,
  },
  framingItemValue: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  dividerV: {
    width: StyleSheet.hairlineWidth,
    height: 24,
    backgroundColor: colors.border.subtle,
  },
});
