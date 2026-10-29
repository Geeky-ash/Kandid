import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius, space, typography } from '@kandid/ui-tokens';

interface FallbackViewfinderProps {
  title: string;
  subtitle: string;
  onRequestPermission?: () => void;
}

export const FallbackViewfinder: React.FC<FallbackViewfinderProps> = ({
  title,
  subtitle,
  onRequestPermission,
}) => (
  <View style={styles.fallbackContainer}>
    <View style={styles.fallbackAperture}>
      <Text style={styles.apertureIcon}>📷</Text>
    </View>
    <Text style={styles.fallbackTitle}>{title}</Text>
    <Text style={styles.fallbackSubtitle}>{subtitle}</Text>
    {onRequestPermission && (
      <TouchableOpacity style={styles.grantButton} onPress={onRequestPermission}>
        <Text style={styles.grantButtonText}>grant camera permission</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  fallbackContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#0E0D0C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.lg,
  },
  fallbackAperture: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(252, 249, 244, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(197, 168, 128, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.md,
  },
  apertureIcon: { fontSize: 28 },
  fallbackTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineSm,
    color: colors.background.primary,
    marginBottom: space.xs,
    textAlign: 'center',
  },
  fallbackSubtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: 'rgba(252, 249, 244, 0.65)',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: space.md,
  },
  grantButton: {
    backgroundColor: colors.brand.gold,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderRadius: radius.pill,
  },
  grantButtonText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onGold,
  },
});
