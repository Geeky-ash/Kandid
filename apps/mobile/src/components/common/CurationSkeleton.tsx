import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors, radius, space } from '@kandid/ui-tokens';

export const CurationSkeleton: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.85,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.shimmerCard, { opacity: pulseAnim }]}>
        <View style={styles.imagePlaceholder} />
        <View style={styles.metaRow}>
          <View style={styles.badgePlaceholder} />
          <View style={styles.scorePlaceholder} />
        </View>
        <View style={styles.linePlaceholder} />
        <View style={[styles.linePlaceholder, { width: '60%' }]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: space.sm,
  },
  shimmerCard: {
    backgroundColor: colors.background.surface,
    borderRadius: radius['2xl'],
    padding: space.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(28, 26, 24, 0.08)',
    marginBottom: space.md,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: space.sm,
  },
  badgePlaceholder: {
    width: 80,
    height: 20,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(197, 168, 128, 0.25)',
  },
  scorePlaceholder: {
    width: 40,
    height: 20,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(28, 26, 24, 0.08)',
  },
  linePlaceholder: {
    width: '90%',
    height: 12,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(28, 26, 24, 0.06)',
    marginBottom: 6,
  },
});
