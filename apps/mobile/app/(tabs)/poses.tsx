import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { copy, seedPoses, PoseCategory } from '@kandid/content';

export default function PosesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPoses = seedPoses.filter(pose => {
    const matchesCategory = selectedCategory === 'all' || pose.category === selectedCategory;
    const matchesSearch = pose.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pose.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* top header */}
        <View style={styles.header}>
          <Text style={styles.title}>{copy.navigation.poses}</Text>
          <Text style={styles.countBadge}>{filteredPoses.length} poses</Text>
        </View>

        {/* search input */}
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

        {/* filter chips horizontal scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {copy.poseLibrary.filterCategories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id as PoseCategory)}
                style={[styles.filterChip, isSelected && styles.filterChipActive]}
                activeOpacity={0.75}
              >
                <Text style={[styles.filterChipText, isSelected && styles.filterChipTextActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 2-column grid of poses */}
        <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.gridRow}>
            {filteredPoses.map(pose => (
              <TouchableOpacity
                key={pose.id}
                style={styles.poseCard}
                onPress={() => router.push('/camera')}
                activeOpacity={0.85}
              >
                <View style={styles.poseCardThumbnail}>
                  <Text style={styles.poseCardPlaceholder}>🧍</Text>
                  {pose.isPro && (
                    <View style={styles.proChip}>
                      <Text style={styles.proChipText}>pro</Text>
                    </View>
                  )}
                </View>
                <View style={styles.poseCardMeta}>
                  <Text style={styles.poseCardTitle}>{pose.title}</Text>
                  <Text style={styles.poseCardCategory}>{pose.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
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
    maxHeight: 44,
  },
  filterChip: {
    paddingHorizontal: space.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.background.surface,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  poseCardThumbnail: {
    height: 140,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poseCardPlaceholder: {
    fontSize: 48,
    opacity: 0.6,
  },
  proChip: {
    position: 'absolute',
    top: space.xs,
    right: space.xs,
    backgroundColor: colors.brand.gold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  proChipText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 10,
    color: colors.text.onGold,
    fontWeight: typography.fontWeight.bold,
  },
  poseCardMeta: {
    padding: space.sm,
  },
  poseCardTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: 2,
  },
  poseCardCategory: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 11,
    color: colors.text.secondary,
  },
  bottomSpacer: {
    height: 100,
  },
});
