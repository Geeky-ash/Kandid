import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { useCreditStore } from '../../stores/creditStore';
import { PillButton } from '../common/PillButton';
import { triggerHaptic } from '../../utils/haptics';

interface TopUpModalProps {
  visible: boolean;
  onClose: () => void;
}

const PACKAGES = [
  { id: 'pack_5', name: 'starter shoot pass', credits: 5, price: '$1.99' },
  { id: 'pack_20', name: 'editorial creator pack', credits: 20, price: '$5.99', tag: 'popular' },
  { id: 'pack_unlimited', name: 'kandid pro unlimited', credits: 100, price: '$9.99/mo', tag: 'best value' },
];

export const TopUpModal: React.FC<TopUpModalProps> = ({ visible, onClose }) => {
  const [selectedId, setSelectedId] = useState('pack_20');
  const [isSuccess, setIsSuccess] = useState(false);
  const addCredits = useCreditStore(state => state.addCredits);

  const selectedPkg = PACKAGES.find(p => p.id === selectedId) || PACKAGES[1];

  const handlePurchase = () => {
    triggerHaptic.success();
    addCredits(selectedPkg.credits, `purchased ${selectedPkg.name}`);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>top-up curation credits</Text>
          <Text style={styles.subtitle}>
            1 credit unlocks state-of-the-art vision ai analysis across your shoot to rank keepers.
          </Text>

          {isSuccess ? (
            <View style={styles.successBox}>
              <Text style={styles.successIcon}>✓</Text>
              <Text style={styles.successText}>+{selectedPkg.credits} credits added to your account</Text>
            </View>
          ) : (
            <View style={styles.packageList}>
              {PACKAGES.map(pkg => {
                const isSelected = selectedId === pkg.id;
                return (
                  <TouchableOpacity
                    key={pkg.id}
                    onPress={() => { triggerHaptic.selection(); setSelectedId(pkg.id); }}
                    style={[styles.packageCard, isSelected && styles.packageCardSelected]}
                  >
                    <View style={styles.cardHeader}>
                      <Text style={styles.packageName}>{pkg.name}</Text>
                      {pkg.tag && <View style={styles.tag}><Text style={styles.tagText}>{pkg.tag}</Text></View>}
                    </View>
                    <View style={styles.cardFooter}>
                      <Text style={styles.creditsText}>{pkg.credits} credits</Text>
                      <Text style={styles.priceText}>{pkg.price}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          <View style={styles.actions}>
            <PillButton
              label={isSuccess ? 'completed' : `purchase for ${selectedPkg.price}`}
              variant="primary"
              onPress={handlePurchase}
              disabled={isSuccess}
              style={styles.button}
            />
            <TouchableOpacity onPress={() => { triggerHaptic.light(); onClose(); }} style={styles.closeBtn}>
              <Text style={styles.closeText}>cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(28, 26, 24, 0.65)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    padding: space.xl,
    borderTopWidth: 1,
    borderColor: colors.border.subtle,
  },
  title: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineMd,
    color: colors.text.primary,
    marginBottom: space.xs,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.secondary,
    lineHeight: 18,
    marginBottom: space.md,
  },
  packageList: { gap: space.sm, marginBottom: space.md },
  packageCard: {
    backgroundColor: colors.background.surface,
    borderRadius: radius.xl,
    padding: space.md,
    borderWidth: 1.5,
    borderColor: colors.border.subtle,
  },
  packageCardSelected: { borderColor: colors.brand.gold, backgroundColor: 'rgba(197, 168, 128, 0.08)' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  packageName: { fontFamily: typography.fontFamilies.headline, fontSize: typography.fontSize.bodyLg, color: colors.text.primary },
  tag: { backgroundColor: colors.brand.gold, paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill },
  tagText: { fontFamily: typography.fontFamilies.body, fontSize: 12, fontWeight: typography.fontWeight.bold, color: colors.text.onGold },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: space.xs },
  creditsText: { fontFamily: typography.fontFamilies.body, fontSize: 12, color: colors.text.secondary },
  priceText: { fontFamily: typography.fontFamilies.headline, fontSize: typography.fontSize.bodyLg, color: colors.text.primary },
  successBox: { backgroundColor: 'rgba(91, 126, 104, 0.12)', padding: space.lg, borderRadius: radius.xl, alignItems: 'center', marginBottom: space.md },
  successIcon: { fontSize: 32, color: colors.brand.sage, marginBottom: space.xs },
  successText: { fontFamily: typography.fontFamilies.headline, fontSize: typography.fontSize.bodyLg, color: colors.brand.sage },
  actions: { gap: space.xs },
  button: { width: '100%' },
  closeBtn: { paddingVertical: space.sm, alignItems: 'center' },
  closeText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.bodySm, color: colors.text.secondary },
});
