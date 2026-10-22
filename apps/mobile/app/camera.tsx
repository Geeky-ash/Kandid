import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { seedPoses, getPoseById } from '@kandid/content';
import { MannequinView } from '../src/components/camera/MannequinView';
import { CueCard } from '../src/components/camera/CueCard';

const ZOOM_LEVELS = ['0.5x', '1x', '2x'] as const;

export default function CameraScreen() {
  const router = useRouter();
  const { poseId } = useLocalSearchParams<{ poseId?: string }>();
  const [activePoseIndex] = useState(0);
  const [currentCueIndex, setCurrentCueIndex] = useState(0);
  const [cueType, setCueType] = useState<'subject' | 'photographer'>('subject');
  const [zoomLevel, setZoomLevel] = useState<string>('1x');

  const activePose = (poseId ? getPoseById(poseId) : undefined) ?? seedPoses[activePoseIndex] ?? seedPoses[0];
  const cues = cueType === 'subject' ? activePose.subjectCues : activePose.photographerCues;
  const currentCue = cues[currentCueIndex % cues.length];

  const handleNextCue = () => {
    setCurrentCueIndex(prev => (prev + 1) % cues.length);
  };

  const toggleCueType = () => {
    setCueType(prev => (prev === 'subject' ? 'photographer' : 'subject'));
    setCurrentCueIndex(0);
  };

  return (
    <View style={styles.container}>
      {/* simulated camera viewfinder */}
      <View style={styles.viewfinderScrim}>
        {/* rule of thirds grid lines */}
        <View style={styles.gridLineH1} />
        <View style={styles.gridLineH2} />
        <View style={styles.gridLineV1} />
        <View style={styles.gridLineV2} />

        {/* parametric skia mannequin outline */}
        <MannequinView joints={activePose.skeletonJoints} topOffset={60} />

        {/* docked swipeable cue card in defined safe zone (bottom: 120px) */}
        <CueCard
          cueText={currentCue}
          cueType={cueType}
          currentStep={(currentCueIndex % cues.length) + 1}
          totalSteps={cues.length}
          onNextCue={handleNextCue}
        />
      </View>

      {/* top control bar */}
      <SafeAreaView edges={['top']} style={styles.topBarSafe}>
        <View style={styles.topBar}>
          <TouchableOpacity
            accessibilityLabel="close camera"
            onPress={() => router.back()}
            style={styles.circleButton}
          >
            <Text style={styles.circleButtonIcon}>✕</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleCueType} style={styles.pillToggle}>
            <Text style={styles.pillToggleText}>
              {cueType === 'subject' ? 'cue: for you' : 'cue: for photographer'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleButton}>
            <Text style={styles.circleButtonIcon}>⚡</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* bottom shutter container */}
      <SafeAreaView edges={['bottom']} style={styles.bottomBarSafe}>
        <View style={styles.bottomControls}>
          {/* hardware zoom pills */}
          <View style={styles.zoomContainer}>
            {ZOOM_LEVELS.map(level => {
              const isActive = zoomLevel === level;
              return (
                <TouchableOpacity
                  key={level}
                  onPress={() => setZoomLevel(level)}
                  style={[styles.zoomPill, isActive && styles.zoomPillActive]}
                >
                  <Text style={[styles.zoomText, isActive && styles.zoomTextActive]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* shutter row */}
          <View style={styles.shutterRow}>
            <View style={styles.galleryThumbStub} />

            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="take photo"
              style={styles.goldShutterButton}
              activeOpacity={0.85}
              onPress={() => {}}
            >
              <View style={styles.shutterInnerRing} />
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityLabel="flip camera"
              style={styles.circleButton}
              onPress={() => {}}
            >
              <Text style={styles.circleButtonIcon}>🔄</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0D0C',
  },
  viewfinderScrim: {
    ...StyleSheet.absoluteFill,
  },
  gridLineH1: {
    position: 'absolute',
    top: '33.33%',
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(252, 249, 244, 0.20)',
  },
  gridLineH2: {
    position: 'absolute',
    top: '66.66%',
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(252, 249, 244, 0.20)',
  },
  gridLineV1: {
    position: 'absolute',
    left: '33.33%',
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(252, 249, 244, 0.20)',
  },
  gridLineV2: {
    position: 'absolute',
    left: '66.66%',
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(252, 249, 244, 0.20)',
  },
  topBarSafe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: space.marginMobile,
    paddingVertical: space.sm,
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(28, 26, 24, 0.60)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(252, 249, 244, 0.15)',
  },
  circleButtonIcon: {
    color: colors.text.inverse,
    fontSize: 18,
  },
  pillToggle: {
    backgroundColor: 'rgba(28, 26, 24, 0.70)',
    paddingHorizontal: space.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(252, 249, 244, 0.15)',
  },
  pillToggleText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.semibold,
  },
  bottomBarSafe: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  bottomControls: {
    alignItems: 'center',
    paddingBottom: space.md,
  },
  zoomContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(28, 26, 24, 0.65)',
    borderRadius: radius.pill,
    padding: 3,
    marginBottom: space.md,
    borderWidth: 1,
    borderColor: 'rgba(252, 249, 244, 0.15)',
  },
  zoomPill: {
    paddingHorizontal: space.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  zoomPillActive: {
    backgroundColor: colors.brand.gold,
  },
  zoomText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 11,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.semibold,
  },
  zoomTextActive: {
    color: colors.text.onGold, // espresso on gold
  },
  shutterRow: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: space.marginMobile,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  galleryThumbStub: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.background.secondary,
    borderWidth: 1.5,
    borderColor: colors.text.inverse,
  },
  goldShutterButton: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.brand.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.text.inverse,
    shadowColor: colors.brand.goldDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.40,
    shadowRadius: 16,
    elevation: 8,
  },
  shutterInnerRing: {
    width: 58,
    height: 58,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.text.onGold,
  },
});
