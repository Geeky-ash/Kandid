import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { CurationResponse } from '../src/services/curationService';

export default function CurationResultsScreen() {
  const router = useRouter();
  const { data } = useLocalSearchParams<{ data?: string }>();

  let curation: CurationResponse = { status: 'success', bestShotIndex: 0, results: [] };
  if (data) {
    try {
      curation = JSON.parse(data);
    } catch {
      curation = { status: 'error', bestShotIndex: 0, results: [], error: 'invalid curation data' };
    }
  }

  const bestShot = curation.results[curation.bestShotIndex] || curation.results[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* top navigation bar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>curation results</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* top ranked hero photo */}
        {bestShot && (
          <View style={styles.heroCard}>
            <View style={styles.heroPhotoStub}>
              <View style={styles.bestShotBadge}>
                <Text style={styles.bestShotBadgeText}>✦ best shot</Text>
              </View>
              <View style={styles.scorePill}>
                <Text style={styles.scorePillText}>{bestShot.score} / 10</Text>
              </View>
            </View>

            <View style={styles.heroFeedback}>
              <Text style={styles.feedbackHeadline}>why it works:</Text>
              {bestShot.strengths.map((str, idx) => (
                <Text key={`str-${idx}`} style={styles.feedbackBullet}>• {str}</Text>
              ))}
            </View>
          </View>
        )}

        {/* batch breakdown section */}
        <Text style={styles.sectionTitle}>all evaluated shots ({curation.results.length})</Text>

        <View style={styles.resultsGrid}>
          {curation.results.map((shot, idx) => {
            const isWinner = idx === curation.bestShotIndex;
            const verdictColor =
              shot.verdict === 'post'
                ? colors.status.post
                : shot.verdict === 'keep'
                ? colors.status.keep
                : colors.status.delete;

            return (
              <View key={shot.id} style={[styles.shotCard, isWinner && styles.shotCardWinner]}>
                <View style={styles.shotPhotoStub}>
                  <View style={[styles.verdictBadge, { backgroundColor: verdictColor }]}>
                    <Text style={styles.verdictBadgeText}>{shot.verdict}</Text>
                  </View>
                  <Text style={styles.shotScoreText}>{shot.score}</Text>
                </View>

                <View style={styles.shotDetails}>
                  <Text style={styles.shotTitle}>shot #{idx + 1}</Text>
                  <Text style={styles.shotCue} numberOfLines={2}>
                    {shot.suggestions[0] || 'balanced exposure'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* bottom actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.savePill}
            onPress={() => router.replace('/(tabs)/best-shots' as any)}
          >
            <Text style={styles.savePillText}>save curated picks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.posesPill}
            onPress={() => router.replace('/(tabs)/poses' as any)}
          >
            <Text style={styles.posesPillText}>try another pose</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background.primary },
  scrollContent: { paddingHorizontal: space.marginMobile, paddingVertical: space.md },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: space.md },
  backButton: { paddingVertical: space.xs },
  backButtonText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelMd, color: colors.text.secondary },
  headerTitle: { fontFamily: typography.fontFamilies.headline, fontSize: typography.fontSize.headlineMd, color: colors.text.primary },
  headerSpacer: { width: 50 },
  heroCard: { backgroundColor: colors.background.surface, borderRadius: radius['2xl'], borderWidth: 1, borderColor: colors.brand.gold, overflow: 'hidden', marginBottom: space.lg, shadowColor: colors.brand.goldDark, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 4 },
  heroPhotoStub: { height: 200, backgroundColor: '#24201D', position: 'relative', justifyContent: 'space-between', padding: space.sm },
  bestShotBadge: { alignSelf: 'flex-start', backgroundColor: colors.brand.gold, paddingHorizontal: space.sm, paddingVertical: 4, borderRadius: radius.pill },
  bestShotBadgeText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: colors.text.onGold, fontWeight: typography.fontWeight.bold },
  scorePill: { alignSelf: 'flex-end', backgroundColor: 'rgba(28, 26, 24, 0.75)', paddingHorizontal: space.sm, paddingVertical: 4, borderRadius: radius.pill },
  scorePillText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: colors.background.primary, fontWeight: typography.fontWeight.bold },
  heroFeedback: { padding: space.md },
  feedbackHeadline: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: colors.text.secondary, fontWeight: typography.fontWeight.bold, marginBottom: space.xs },
  feedbackBullet: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.bodySm, color: colors.text.primary, lineHeight: 18, marginBottom: 2 },
  sectionTitle: { fontFamily: typography.fontFamilies.headline, fontSize: typography.fontSize.headlineSm, color: colors.text.primary, marginBottom: space.sm },
  resultsGrid: { gap: space.sm, marginBottom: space.xl },
  shotCard: { flexDirection: 'row', backgroundColor: colors.background.surface, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.subtle, overflow: 'hidden', padding: space.xs, gap: space.sm },
  shotCardWinner: { borderColor: colors.brand.gold, backgroundColor: 'rgba(197, 168, 128, 0.08)' },
  shotPhotoStub: { width: 80, height: 80, backgroundColor: '#2E2925', borderRadius: radius.lg, position: 'relative', justifyContent: 'space-between', padding: 4 },
  verdictBadge: { alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: radius.pill },
  verdictBadgeText: { color: colors.text.inverse, fontSize: 12, fontWeight: typography.fontWeight.bold },
  shotScoreText: { color: colors.text.inverse, fontSize: 12, fontWeight: typography.fontWeight.bold, alignSelf: 'flex-end' },
  shotDetails: { flex: 1, justifyContent: 'center' },
  shotTitle: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, fontWeight: typography.fontWeight.bold, color: colors.text.primary, marginBottom: 2 },
  shotCue: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.bodySm, color: colors.text.secondary },
  actionRow: { gap: space.sm, marginBottom: space.xl },
  savePill: { height: 48, borderRadius: radius.pill, backgroundColor: colors.brand.gold, alignItems: 'center', justifyContent: 'center' },
  savePillText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelMd, color: colors.text.onGold, fontWeight: typography.fontWeight.bold },
  posesPill: { height: 48, borderRadius: radius.pill, backgroundColor: colors.background.surface, borderWidth: 1, borderColor: colors.border.subtle, alignItems: 'center', justifyContent: 'center' },
  posesPillText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelMd, color: colors.text.primary },
});
