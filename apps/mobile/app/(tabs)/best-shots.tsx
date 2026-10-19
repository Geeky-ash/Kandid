import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { copy } from '@kandid/content';
import { PillButton } from '../../src/components/common/PillButton';

export default function BestShotsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{copy.bestShots.title}</Text>
          <Text style={styles.subtitle}>{copy.bestShots.subtitle}</Text>
        </View>

        {/* zero-retention privacy callout */}
        <View style={styles.privacyCard}>
          <Text style={styles.privacyIcon}>🔒</Text>
          <Text style={styles.privacyText}>{copy.bestShots.privacyBadge}</Text>
        </View>

        {/* batch selection empty state */}
        <View style={styles.selectionCard}>
          <Text style={styles.cameraRollIcon}>🖼️</Text>
          <Text style={styles.selectionTitle}>{copy.bestShots.batchPickerTitle}</Text>
          <Text style={styles.costNotice}>{copy.bestShots.creditCostNotice}</Text>
          <PillButton
            label="select photos from library"
            variant="primary"
            onPress={() => {}}
            style={styles.selectButton}
          />
        </View>

        {/* verdicts preview section */}
        <View style={styles.columnsPreview}>
          <View style={styles.columnHeader}>
            <View style={[styles.columnBadge, styles.postBadge]}>
              <Text style={styles.columnBadgeText}>{copy.bestShots.columns.post}</Text>
            </View>
            <View style={[styles.columnBadge, styles.keepBadge]}>
              <Text style={styles.columnBadgeText}>{copy.bestShots.columns.keep}</Text>
            </View>
            <View style={[styles.columnBadge, styles.deleteBadge]}>
              <Text style={styles.columnBadgeText}>{copy.bestShots.columns.delete}</Text>
            </View>
          </View>
          <Text style={styles.previewHint}>
            your selected batch will be sorted here with plain-text advice on lighting, expressions, and angles.
          </Text>
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
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand.sageTint,
    borderRadius: radius.xl,
    padding: space.md,
    marginBottom: space.lg,
    borderWidth: 1,
    borderColor: 'rgba(91, 126, 104, 0.25)',
  },
  privacyIcon: {
    fontSize: 18,
    marginRight: space.sm,
  },
  privacyText: {
    flex: 1,
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.brand.sageDark,
    lineHeight: 16,
    fontWeight: typography.fontWeight.medium,
  },
  selectionCard: {
    backgroundColor: colors.background.surface,
    borderRadius: radius['2xl'],
    padding: space.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.subtle,
    marginBottom: space.lg,
  },
  cameraRollIcon: {
    fontSize: 36,
    marginBottom: space.sm,
  },
  selectionTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineSm,
    color: colors.text.primary,
    marginBottom: 4,
  },
  costNotice: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.secondary,
    marginBottom: space.lg,
  },
  selectButton: {
    width: '100%',
  },
  columnsPreview: {
    backgroundColor: colors.background.surface,
    borderRadius: radius['2xl'],
    padding: space.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  columnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: space.md,
  },
  columnBadge: {
    paddingHorizontal: space.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  postBadge: {
    backgroundColor: colors.status.post,
  },
  keepBadge: {
    backgroundColor: colors.status.keep,
  },
  deleteBadge: {
    backgroundColor: colors.status.delete,
  },
  columnBadgeText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.inverse,
  },
  previewHint: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 100,
  },
});
