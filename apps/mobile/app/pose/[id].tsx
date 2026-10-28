import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPoseById } from '@kandid/content';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { useGuestStore } from '../../src/stores/guestStore';
import { PoseHero } from '../../src/components/pose/PoseHero';
import { PoseCuesSection } from '../../src/components/pose/PoseCuesSection';
import { PoseActionBar } from '../../src/components/pose/PoseActionBar';

import { triggerHaptic } from '../../src/utils/haptics';

export default function PoseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const pose = id ? getPoseById(id) : undefined;
  const isSaved = useGuestStore(state => (id ? state.isPoseSaved(id) : false));
  const toggleSavePose = useGuestStore(state => state.toggleSavePose);

  if (!pose) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>pose not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← back to poses</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleUsePose = () => {
    triggerHaptic.medium();
    router.push({
      pathname: '/camera',
      params: { poseId: pose.id },
    });
  };

  const handleToggleSave = () => {
    triggerHaptic.selection();
    toggleSavePose(pose.id);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* top navigation bar */}
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityLabel="go back"
          onPress={() => router.back()}
          style={styles.circleButton}
        >
          <Text style={styles.circleIcon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {pose.title}
        </Text>

        <TouchableOpacity
          accessibilityLabel="save pose"
          onPress={handleToggleSave}
          style={styles.circleButton}
        >
          <Text style={[styles.circleIcon, isSaved && styles.heartActive]}>
            {isSaved ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* scrollable pose content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <PoseHero pose={pose} />
        <PoseCuesSection pose={pose} />
      </ScrollView>

      {/* bottom actions */}
      <PoseActionBar
        isSaved={isSaved}
        onToggleSave={() => toggleSavePose(pose.id)}
        onUsePose={handleUsePose}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.marginMobile,
    paddingVertical: space.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  headerTitle: {
    flex: 1,
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineMd,
    color: colors.text.primary,
    textAlign: 'center',
    marginHorizontal: space.sm,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.background.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  circleIcon: {
    fontSize: 18,
    color: colors.text.primary,
  },
  heartActive: {
    color: colors.brand.gold,
  },
  scrollContent: {
    paddingBottom: space.xl,
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: space.xl,
  },
  notFoundTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineLg,
    color: colors.text.primary,
    marginBottom: space.lg,
  },
  backButton: {
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    backgroundColor: colors.background.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  backButtonText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelMd,
    color: colors.text.primary,
  },
});
