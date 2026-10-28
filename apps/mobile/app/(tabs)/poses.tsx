import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { copy, seedPoses, PoseCategory } from '@kandid/content';
import { useGuestStore } from '../../src/stores/guestStore';
import { MannequinView } from '../../src/components/camera/MannequinView';

import { triggerHaptic } from '../../src/utils/haptics';

export default function PosesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const toggleSavePose = useGuestStore(state => state.toggleSavePose);
  const isPoseSaved = useGuestStore(state => state.isPoseSaved);

  const filteredPoses = seedPoses.filter(pose => {
    const matchesCategory = selectedCategory === 'all' || pose.category === selectedCategory;
    const matchesSearch = pose.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pose.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return seedPoses.length;
    return seedPoses.filter(p => p.category === categoryId).length;
  };

  const handleCategoryPress = (catId: string) => {
    triggerHaptic.selection();
    setSelectedCategory(catId as PoseCategory);
  };

  const handleSavePress = (poseId: string) => {
    triggerHaptic.selection();
    toggleSavePose(poseId);
  };

  const handlePosePress = (poseId: string) => {
    triggerHaptic.light();
    router.push(`/pose/${poseId}` as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* top header */}
        <View style={styles.header}>
          <Text style={styles.title}>{copy.poseLibrary.headerTitle}</Text>
          <Text style={styles.countBadge}>{filteredPoses.length} poses</Text>
        </View>

        {/* rounded search input */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={copy.poseLibrary.searchPlaceholder}
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
        </View>

        {/* category filter pills with count badges */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {copy.poseLibrary.filterCategories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => handleCategoryPress(cat.id)}
                style={[styles.filterChip, isSelected && styles.filterChipActive]}
                activeOpacity={0.75}
              >
                <Text style={[styles.filterChipText, isSelected && styles.filterChipTextActive]}>
                  {cat.label}
                </Text>
                <View style={[styles.filterBadge, isSelected && styles.filterBadgeActive]}>
                  <Text style={[styles.filterBadgeText, isSelected && styles.filterBadgeTextActive]}>
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 2-column pose grid */}
        <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.gridRow}>
            {filteredPoses.map(pose => {
              const saved = isPoseSaved(pose.id);
              return (
                <TouchableOpacity
                  key={pose.id}
                  style={styles.poseCard}
                  onPress={() => handlePosePress(pose.id)}
                  activeOpacity={0.85}
                >
                  {/* mannequin preview container */}
                  <View style={styles.mannequinPreview}>
                    <MannequinView joints={pose.skeletonJoints} width={130} height={120} />

                    {/* pro badge */}
                    {pose.isPro && (
                      <View style={styles.proChip}>
                        <Text style={styles.proChipText}>pro</Text>
                      </View>
                    )}

                    {/* heart save button */}
                    <TouchableOpacity
                      accessibilityLabel="save pose"
                      style={styles.heartButton}
                      onPress={() => handleSavePress(pose.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.heartIcon, saved && styles.heartIconActive]}>
                        {saved ? '♥' : '♡'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* meta details */}
                  <View style={styles.poseCardMeta}>
                    <Text style={styles.poseCardTitle} numberOfLines={1}>{pose.title}</Text>
                    <View style={styles.categoryRow}>
                      <Text style={styles.poseCardCategory}>{pose.category}</Text>
                      <Text style={styles.difficultyDot}>•</Text>
                      <Text style={styles.difficultyText}>{pose.difficulty}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.bottomSpacer} />
        </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: space.marginMobile,
    paddingTop: space.sm,
    marginBottom: space.sm,
  },
  title: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineLg,
    color: colors.text.primary,
  },
  countBadge: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.surface,
    marginHorizontal: space.marginMobile,
    paddingHorizontal: space.md,
    height: 44,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    marginBottom: space.sm,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: space.xs,
  },
  searchInput: {
    flex: 1,
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.primary,
  },
  filterScroll: {
    paddingHorizontal: space.marginMobile,
    paddingVertical: space.xs,
    gap: space.xs,
    maxHeight: 46,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.background.surface,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    gap: 6,
  },
  filterChipActive: {
    backgroundColor: colors.text.primary,
    borderColor: colors.text.primary,
  },
  filterChipText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelMd,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  filterChipTextActive: {
    color: colors.background.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  filterBadge: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: radius.pill,
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(252, 249, 244, 0.25)',
  },
  filterBadgeText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 10,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.bold,
  },
  filterBadgeTextActive: {
    color: colors.background.primary,
  },
  gridContainer: {
    paddingHorizontal: space.marginMobile,
    paddingTop: space.md,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: space.md,
  },
  poseCard: {
    width: '47%',
    backgroundColor: colors.background.surface,
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: colors.border.subtle,
    overflow: 'hidden',
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  mannequinPreview: {
    height: 140,
    backgroundColor: '#1C1A18', // dark backdrop to highlight golden mannequin lines
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  proChip: {
    position: 'absolute',
    top: space.xs,
    left: space.xs,
    backgroundColor: colors.brand.gold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.pill,
    zIndex: 10,
  },
  proChipText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 10,
    color: colors.text.onGold,
    fontWeight: typography.fontWeight.bold,
  },
  heartButton: {
    position: 'absolute',
    top: space.xs,
    right: space.xs,
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(28, 26, 24, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  heartIcon: {
    fontSize: 15,
    color: colors.text.inverse,
  },
  heartIconActive: {
    color: '#E06D63', // warm crimson heart
  },
  poseCardMeta: {
    padding: space.sm,
  },
  poseCardTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  poseCardCategory: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 11,
    color: colors.text.secondary,
  },
  difficultyDot: {
    fontSize: 10,
    color: colors.text.tertiary,
  },
  difficultyText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 10,
    color: colors.text.secondary,
  },
  bottomSpacer: {
    height: 100,
  },
});
