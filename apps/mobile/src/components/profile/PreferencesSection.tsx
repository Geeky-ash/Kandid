import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { usePreferencesStore } from '../../stores/preferencesStore';
import { triggerHaptic } from '../../utils/haptics';

export const PreferencesSection: React.FC = () => {
  const {
    saveOriginals,
    hapticsEnabled,
    autoGrid,
    toggleSaveOriginals,
    toggleHaptics,
    toggleAutoGrid,
  } = usePreferencesStore();

  const handleToggle = (action: () => void) => {
    triggerHaptic.selection();
    action();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>capture preferences</Text>

      <View style={styles.row}>
        <View style={styles.labelCol}>
          <Text style={styles.rowLabel}>save original photos</Text>
          <Text style={styles.rowSub}>keep unguided camera shots in your photo library</Text>
        </View>
        <Switch
          value={saveOriginals}
          onValueChange={() => handleToggle(toggleSaveOriginals)}
          trackColor={{ false: 'rgba(28, 26, 24, 0.15)', true: colors.brand.gold }}
          thumbColor={colors.background.primary}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.labelCol}>
          <Text style={styles.rowLabel}>haptic feedback</Text>
          <Text style={styles.rowSub}>subtle tactile pulse on shutters and pose selection</Text>
        </View>
        <Switch
          value={hapticsEnabled}
          onValueChange={() => handleToggle(toggleHaptics)}
          trackColor={{ false: 'rgba(28, 26, 24, 0.15)', true: colors.brand.gold }}
          thumbColor={colors.background.primary}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.labelCol}>
          <Text style={styles.rowLabel}>viewfinder grid</Text>
          <Text style={styles.rowSub}>show rule-of-thirds composition guidelines</Text>
        </View>
        <Switch
          value={autoGrid}
          onValueChange={() => handleToggle(toggleAutoGrid)}
          trackColor={{ false: 'rgba(28, 26, 24, 0.15)', true: colors.brand.gold }}
          thumbColor={colors.background.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.surface,
    borderRadius: radius['2xl'],
    padding: space.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    marginBottom: space.lg,
  },
  sectionTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineSm,
    color: colors.text.primary,
    marginBottom: space.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: space.xs,
  },
  labelCol: { flex: 1, paddingRight: space.md },
  rowLabel: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  rowSub: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.subtle,
    marginVertical: space.sm,
  },
});
