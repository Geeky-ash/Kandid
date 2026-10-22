import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { copy } from '@kandid/content';
import { useCreditStore } from '../../src/stores/creditStore';
import { useAuthStore } from '../../src/stores/authStore';
import { requestBestShotsCuration } from '../../src/services/curationService';

// seed candidate photos for curation testing
const CANDIDATE_PHOTOS = [
  { id: 'p1', label: 'shot 01', tint: '#2C2825' },
  { id: 'p2', label: 'shot 02', tint: '#3A3430' },
  { id: 'p3', label: 'shot 03', tint: '#423B36' },
  { id: 'p4', label: 'shot 04', tint: '#24201D' },
  { id: 'p5', label: 'shot 05', tint: '#322C28' },
  { id: 'p6', label: 'shot 06', tint: '#2F2A26' },
];

export default function BestShotsScreen() {
  const router = useRouter();
  const { balance } = useCreditStore();
  const { user } = useAuthStore();
  const [selectedIds, setSelectedIds] = useState<string[]>(['p1', 'p2', 'p3']);
  const [isCurating, setIsCurating] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCurate = async () => {
    if (selectedIds.length < 2) return;
    setIsCurating(true);
    const result = await requestBestShotsCuration(user?.id || 'guest', selectedIds);
    setIsCurating(false);

    if (result.status === 'success') {
      router.push({
        pathname: '/curation-results' as any,
        params: { data: JSON.stringify(result) },
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* top header bar with credit pill */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>{copy.bestShots.title}</Text>
          <TouchableOpacity
            style={styles.creditPill}
            onPress={() => router.push('/auth' as any)}
          >
            <Text style={styles.creditPillIcon}>✦</Text>
            <Text style={styles.creditPillText}>{balance} credits</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>{copy.bestShots.subtitle}</Text>

        {/* zero-retention privacy callout */}
        <View style={styles.privacyCard}>
          <Text style={styles.privacyIcon}>🔒</Text>
          <Text style={styles.privacyText}>{copy.bestShots.privacyBadge}</Text>
        </View>

        {/* selection counter & cost notice */}
        <View style={styles.selectionBar}>
          <Text style={styles.selectionCount}>
            selected {selectedIds.length} of {CANDIDATE_PHOTOS.length} photos
          </Text>
          <Text style={styles.costBadge}>1 credit per burst</Text>
        </View>

        {/* photo selection grid */}
        <View style={styles.photoGrid}>
          {CANDIDATE_PHOTOS.map(photo => {
            const isSelected = selectedIds.includes(photo.id);
            return (
              <TouchableOpacity
                key={photo.id}
                onPress={() => toggleSelect(photo.id)}
                activeOpacity={0.8}
                style={[styles.photoCard, { backgroundColor: photo.tint }, isSelected && styles.photoCardSelected]}
              >
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.photoLabel}>{photo.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* curate primary action */}
        <TouchableOpacity
          accessibilityRole="button"
          onPress={handleCurate}
          disabled={selectedIds.length < 2 || isCurating}
          style={[styles.curateButton, (selectedIds.length < 2 || isCurating) && styles.curateButtonDisabled]}
        >
          <Text style={styles.curateButtonText}>
            {isCurating ? 'evaluating in-memory...' : `curate ${selectedIds.length} photos — 1 credit`}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background.primary },
  scrollContent: { paddingHorizontal: space.marginMobile, paddingVertical: space.md },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: space.xs },
  title: { fontFamily: typography.fontFamilies.headline, fontSize: typography.fontSize.headlineLg, color: colors.text.primary },
  creditPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(197, 168, 128, 0.20)', paddingHorizontal: space.sm, paddingVertical: 4, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.brand.gold },
  creditPillIcon: { color: colors.brand.goldDark, fontSize: 14, fontWeight: typography.fontWeight.bold },
  creditPillText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: colors.brand.goldDark, fontWeight: typography.fontWeight.bold },
  subtitle: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.bodySm, color: colors.text.secondary, marginBottom: space.md },
  privacyCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background.secondary, padding: space.sm, borderRadius: radius.lg, gap: space.xs, marginBottom: space.md, borderWidth: 1, borderColor: colors.border.subtle },
  privacyIcon: { fontSize: 14 },
  privacyText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.bodySm, color: colors.text.secondary, flex: 1 },
  selectionBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: space.sm },
  selectionCount: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: colors.text.primary, fontWeight: typography.fontWeight.semibold },
  costBadge: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: colors.brand.sageDark, fontWeight: typography.fontWeight.medium },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, marginBottom: space.lg },
  photoCard: { width: '30.5%', height: 110, borderRadius: radius.xl, borderWidth: 2, borderColor: 'transparent', padding: space.xs, justifyContent: 'space-between' },
  photoCardSelected: { borderColor: colors.brand.gold },
  checkbox: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: 'rgba(252, 249, 244, 0.50)', alignItems: 'center', justifyContent: 'center' },
  checkboxSelected: { backgroundColor: colors.brand.gold, borderColor: colors.brand.gold },
  checkmark: { color: colors.text.onGold, fontSize: 12, fontWeight: typography.fontWeight.bold },
  photoLabel: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: colors.text.inverse },
  curateButton: { height: 50, borderRadius: radius.pill, backgroundColor: colors.brand.gold, alignItems: 'center', justifyContent: 'center', shadowColor: colors.brand.goldDark, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 4 },
  curateButtonDisabled: { opacity: 0.45 },
  curateButtonText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelMd, color: colors.text.onGold, fontWeight: typography.fontWeight.bold },
  bottomSpacer: { height: 100 },
});
