import React from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { useCreditStore, CreditTransaction } from '../../stores/creditStore';
import { PillButton } from '../common/PillButton';
import { triggerHaptic } from '../../utils/haptics';

interface TransactionHistoryModalProps {
  visible: boolean;
  onClose: () => void;
}

const formatDate = (timestamp: number) => {
  const d = new Date(timestamp);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export const TransactionHistoryModal: React.FC<TransactionHistoryModalProps> = ({ visible, onClose }) => {
  const { history, balance } = useCreditStore();

  const renderItem = ({ item }: { item: CreditTransaction }) => {
    const isPositive = item.amount > 0;
    return (
      <View style={styles.itemCard}>
        <View style={styles.itemMain}>
          <Text style={styles.itemReason}>{item.reason}</Text>
          <Text style={styles.itemDate}>{formatDate(item.timestamp)}</Text>
        </View>
        <View style={styles.itemAmountCol}>
          <Text style={[styles.itemAmount, isPositive ? styles.amountPositive : styles.amountNegative]}>
            {isPositive ? `+${item.amount}` : item.amount}
          </Text>
          <Text style={styles.itemStatus}>{item.status}</Text>
        </View>
      </View>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>credit ledger</Text>
              <Text style={styles.subtitle}>current balance: {balance} credits</Text>
            </View>
            <TouchableOpacity onPress={() => { triggerHaptic.light(); onClose(); }} style={styles.closeBtn}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {history.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>no credit transactions yet.</Text>
            </View>
          ) : (
            <FlatList
              data={history}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
          )}

          <View style={styles.footer}>
            <PillButton label="done" variant="primary" onPress={() => { triggerHaptic.light(); onClose(); }} style={styles.button} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(28, 26, 24, 0.65)', justifyContent: 'flex-end' },
  sheet: {
    maxHeight: '80%',
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    padding: space.xl,
    borderTopWidth: 1,
    borderColor: colors.border.subtle,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: space.md },
  title: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineMd,
    color: colors.text.primary,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.brand.gold,
    fontWeight: typography.fontWeight.semibold,
  },
  closeBtn: { padding: space.xs },
  closeIcon: { fontSize: 18, color: colors.text.secondary },
  list: { paddingBottom: space.md },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.surface,
    padding: space.md,
    borderRadius: radius.xl,
    marginBottom: space.sm,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  itemMain: { flex: 1, paddingRight: space.sm },
  itemReason: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.primary,
    marginBottom: 2,
  },
  itemDate: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.text.secondary,
  },
  itemAmountCol: { alignItems: 'flex-end' },
  itemAmount: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.bodyLg,
  },
  amountPositive: { color: colors.brand.sage },
  amountNegative: { color: colors.text.primary },
  itemStatus: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.text.secondary,
  },
  emptyBox: { paddingVertical: space.xl, alignItems: 'center' },
  emptyText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.secondary,
  },
  footer: { paddingTop: space.xs },
  button: { width: '100%' },
});
