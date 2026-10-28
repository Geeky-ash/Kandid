import React from 'react';
import { View, Text, StyleSheet, Modal, ScrollView } from 'react-native';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { PillButton } from '../common/PillButton';
import { triggerHaptic } from '../../utils/haptics';

interface PrivacyPolicyModalProps {
  visible: boolean;
  onClose: () => void;
}

const PILLARS = [
  {
    title: '1. 100% on-device capture',
    desc: 'camera feeds, parametric pose mannequin lines, and editorial look shaders render entirely on your phone gpu with zero network transmission.',
  },
  {
    title: '2. zero cloud image retention',
    desc: 'kandid does not operate persistent cloud image buckets. your photos are never saved to remote disks or external servers.',
  },
  {
    title: '3. ephemeral in-memory curation',
    desc: 'when you select photos for best-shots ranking, images stream via tls 1.3 straight into temporary memory, evaluate statelessly, and evaporate instantly.',
  },
  {
    title: '4. strict zero-training guarantee',
    desc: 'enterprise api compliance strictly prohibits logging or training ai models on user photos. your personal moments remain exclusively yours.',
  },
];

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>privacy & data governance</Text>
          <Text style={styles.subtitle}>our zero-storage architecture guarantees your privacy by design.</Text>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {PILLARS.map((p, idx) => (
              <View key={idx} style={styles.pillarCard}>
                <Text style={styles.pillarTitle}>{p.title}</Text>
                <Text style={styles.pillarDesc}>{p.desc}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <PillButton
              label="understood"
              variant="primary"
              onPress={() => { triggerHaptic.light(); onClose(); }}
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(28, 26, 24, 0.65)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '85%',
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
  scrollView: { marginBottom: space.md },
  pillarCard: {
    backgroundColor: colors.background.surface,
    padding: space.md,
    borderRadius: radius.xl,
    marginBottom: space.sm,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  pillarTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.bodyLg,
    color: colors.text.primary,
    marginBottom: 4,
  },
  pillarDesc: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 17,
  },
  footer: { paddingTop: space.xs },
  button: { width: '100%' },
});
