import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, space, typography } from '@kandid/ui-tokens';
import { copy } from '@kandid/content';
import { UserProfileCard } from '../../src/components/profile/UserProfileCard';
import { CreditBalanceSection } from '../../src/components/profile/CreditBalanceSection';
import { PreferencesSection } from '../../src/components/profile/PreferencesSection';
import { PrivacySection } from '../../src/components/profile/PrivacySection';
import { TopUpModal } from '../../src/components/profile/TopUpModal';
import { TransactionHistoryModal } from '../../src/components/profile/TransactionHistoryModal';
import { PrivacyPolicyModal } from '../../src/components/profile/PrivacyPolicyModal';
import { PermissionModal } from '../../src/components/common/PermissionModal';
import { triggerHaptic } from '../../src/utils/haptics';

export default function ProfileScreen() {
  const [topUpVisible, setTopUpVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);
  const [permissionsVisible, setPermissionsVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{copy.profile.title}</Text>
        </View>

        <UserProfileCard />

        <CreditBalanceSection
          onOpenTopUp={() => setTopUpVisible(true)}
          onOpenHistory={() => setHistoryVisible(true)}
        />

        <PreferencesSection />

        <PrivacySection
          onOpenPrivacyModal={() => setPrivacyVisible(true)}
          onOpenPermissionsModal={() => setPermissionsVisible(true)}
        />

        {/* legal & version footer */}
        <View style={styles.legalSection}>
          <TouchableOpacity
            style={styles.legalRow}
            onPress={() => { triggerHaptic.light(); setPrivacyVisible(true); }}
          >
            <Text style={styles.legalText}>{copy.profile.legal.privacyPolicy}</Text>
            <Text style={styles.legalArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.legalRow}
            onPress={() => { triggerHaptic.light(); Linking.openURL('https://kandid.app/terms').catch(() => {}); }}
          >
            <Text style={styles.legalText}>{copy.profile.legal.termsOfService}</Text>
            <Text style={styles.legalArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.legalRow}
            onPress={() => { triggerHaptic.light(); Linking.openURL('https://kandid.app/eula').catch(() => {}); }}
          >
            <Text style={styles.legalText}>{copy.profile.legal.eula}</Text>
            <Text style={styles.legalArrow}>›</Text>
          </TouchableOpacity>
          <Text style={styles.copyrightText}>{copy.profile.legal.copyright}</Text>
          <Text style={styles.versionText}>version 1.0.0 (build 1) · m5 production ready</Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <TopUpModal visible={topUpVisible} onClose={() => setTopUpVisible(false)} />
      <TransactionHistoryModal visible={historyVisible} onClose={() => setHistoryVisible(false)} />
      <PrivacyPolicyModal visible={privacyVisible} onClose={() => setPrivacyVisible(false)} />
      <PermissionModal
        visible={permissionsVisible}
        onClose={() => setPermissionsVisible(false)}
        onRequestPermissions={() => {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background.primary },
  scrollContent: { paddingHorizontal: space.marginMobile, paddingTop: space.sm },
  header: { marginBottom: space.md },
  title: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineLg,
    color: colors.text.primary,
  },
  legalSection: { paddingVertical: space.md, alignItems: 'center' },
  legalRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: space.sm,
    borderBottomWidth: 1,
    borderColor: colors.border.subtle,
  },
  legalText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: colors.text.secondary,
  },
  legalArrow: { fontSize: 18, color: colors.text.secondary },
  copyrightText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: space.lg,
  },
  versionText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.brand.gold,
    marginTop: 4,
    fontWeight: typography.fontWeight.semibold,
  },
  bottomSpacer: { height: 110 },
});
