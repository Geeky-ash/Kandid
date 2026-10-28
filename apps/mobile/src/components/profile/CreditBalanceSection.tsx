import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { useCreditStore } from '../../stores/creditStore';
import { PillButton } from '../common/PillButton';
import { triggerHaptic } from '../../utils/haptics';

interface CreditBalanceSectionProps {
  onOpenTopUp: () => void;
  onOpenHistory: () => void;
}

export const CreditBalanceSection: React.FC<CreditBalanceSectionProps> = ({
  onOpenTopUp,
  onOpenHistory,
}) => {
  const balance = useCreditStore(state => state.balance);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.title}>ai curation credits</Text>
          <Text style={styles.balance}>{balance} <Text style={styles.unit}>available</Text></Text>
        </View>
        <TouchableOpacity
          onPress={() => { triggerHaptic.light(); onOpenHistory(); }}
          style={styles.historyBtn}
        >
          <Text style={styles.historyText}>ledger history ›</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.explanation}>
        1 credit powers an in-memory vision pass across up to 30 shoot photos to rank sharpness, expression, and posture keepers.
      </Text>

      <PillButton
        label="top up credits"
        variant="primary"
        onPress={() => { triggerHaptic.light(); onOpenTopUp(); }}
        style={styles.topUpBtn}
      />
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: space.xs,
  },
  title: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineSm,
    color: colors.text.primary,
    marginBottom: 4,
  },
  balance: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineMd,
    color: colors.brand.gold,
  },
  unit: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.secondary,
  },
  historyBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  historyText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.brand.gold,
    fontWeight: typography.fontWeight.semibold,
  },
  explanation: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.secondary,
    lineHeight: 18,
    marginVertical: space.md,
  },
  topUpBtn: { width: '100%' },
});
