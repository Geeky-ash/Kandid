import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { triggerHaptic } from '../../utils/haptics';

const BURST_INTERVALS = [2, 3, 5] as const;

interface BurstIntervalSelectorProps {
  burstInterval: number;
  onSelectBurstInterval: (s: number) => void;
}

export const BurstIntervalSelector: React.FC<BurstIntervalSelectorProps> = ({
  burstInterval,
  onSelectBurstInterval,
}) => {
  return (
    <View style={styles.intervalRow}>
      <Text style={styles.intervalLabel}>burst interval:</Text>
      {BURST_INTERVALS.map(sec => (
        <TouchableOpacity
          key={sec}
          onPress={() => {
            triggerHaptic.selection();
            onSelectBurstInterval(sec);
          }}
          style={[styles.intervalPill, burstInterval === sec && styles.intervalPillActive]}
        >
          <Text style={[styles.intervalPillText, burstInterval === sec && styles.intervalPillTextActive]}>
            {sec}s
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  intervalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.xs,
    marginBottom: space.xs,
  },
  intervalLabel: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    color: 'rgba(252, 249, 244, 0.70)',
  },
  intervalPill: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(252, 249, 244, 0.10)',
  },
  intervalPillActive: { backgroundColor: colors.brand.gold },
  intervalPillText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    color: colors.text.inverse,
  },
  intervalPillTextActive: { color: colors.text.onGold, fontWeight: typography.fontWeight.bold },
});
