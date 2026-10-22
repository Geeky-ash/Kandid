import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { useAuthStore } from '../src/stores/authStore';

export default function AuthScreen() {
  const router = useRouter();
  const { signInWithEmail, signUpWithEmail, signInWithOAuth, continueAsGuest, isLoading, error } =
    useAuthStore();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!email || !password) return;
    const res =
      mode === 'signin'
        ? await signInWithEmail(email, password)
        : await signUpWithEmail(email, password);
    if (res.success) {
      router.back();
    }
  };

  const handleOAuth = async (provider: 'apple' | 'google') => {
    const res = await signInWithOAuth(provider);
    if (res.success) {
      router.back();
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* header */}
          <View style={styles.header}>
            <Text style={styles.brandTitle}>kandid</Text>
            <Text style={styles.subtitle}>
              {mode === 'signin' ? 'welcome back — sign in to sync credits' : 'create your account & save shoots'}
            </Text>
          </View>

          {/* segmented toggle */}
          <View style={styles.segmentedRow}>
            <TouchableOpacity
              onPress={() => setMode('signin')}
              style={[styles.segmentTab, mode === 'signin' && styles.segmentTabActive]}
            >
              <Text style={[styles.segmentText, mode === 'signin' && styles.segmentTextActive]}>sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMode('signup')}
              style={[styles.segmentTab, mode === 'signup' && styles.segmentTabActive]}
            >
              <Text style={[styles.segmentText, mode === 'signup' && styles.segmentTextActive]}>create account</Text>
            </TouchableOpacity>
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* form inputs */}
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>email address</Text>
            <TextInput
              style={styles.input}
              placeholder="you@kandid.app"
              placeholderTextColor={colors.text.tertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.inputLabel}>password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={colors.text.tertiary}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              accessibilityRole="button"
              onPress={handleSubmit}
              disabled={isLoading}
              style={[styles.submitButton, (!email || !password || isLoading) && styles.submitButtonDisabled]}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? 'processing...' : mode === 'signin' ? 'sign in' : 'create account'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* oauth section */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.oauthRow}>
            <TouchableOpacity style={styles.oauthButton} onPress={() => handleOAuth('apple')}>
              <Text style={styles.oauthIcon}></Text>
              <Text style={styles.oauthLabel}>apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.oauthButton} onPress={() => handleOAuth('google')}>
              <Text style={styles.oauthIcon}>G</Text>
              <Text style={styles.oauthLabel}>google</Text>
            </TouchableOpacity>
          </View>

          {/* guest mode bypass */}
          <TouchableOpacity onPress={handleGuest} style={styles.guestLinkButton}>
            <Text style={styles.guestLinkText}>continue as guest (offline mode)</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background.primary },
  keyboardContainer: { flex: 1 },
  scrollContent: { paddingHorizontal: space.marginMobile, paddingVertical: space.lg },
  header: { alignItems: 'center', marginBottom: space.lg },
  brandTitle: { fontFamily: typography.fontFamilies.headline, fontSize: typography.fontSize.displayLg, color: colors.text.primary, marginBottom: space.xs },
  subtitle: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.bodySm, color: colors.text.secondary, textAlign: 'center' },
  segmentedRow: { flexDirection: 'row', backgroundColor: colors.background.secondary, borderRadius: radius.pill, padding: 4, marginBottom: space.lg },
  segmentTab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: radius.pill },
  segmentTabActive: { backgroundColor: colors.brand.espresso },
  segmentText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: colors.text.secondary, fontWeight: typography.fontWeight.medium },
  segmentTextActive: { color: colors.background.primary, fontWeight: typography.fontWeight.bold },
  formContainer: { backgroundColor: colors.background.surface, padding: space.md, borderRadius: radius['2xl'], borderWidth: 1, borderColor: colors.border.subtle, marginBottom: space.lg },
  inputLabel: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: colors.text.secondary, marginBottom: space.xs },
  input: { height: 48, backgroundColor: colors.background.secondary, borderRadius: radius.lg, paddingHorizontal: space.md, fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.bodyMd, color: colors.text.primary, marginBottom: space.md },
  submitButton: { height: 48, borderRadius: radius.pill, backgroundColor: colors.brand.gold, alignItems: 'center', justifyContent: 'center', marginTop: space.xs },
  submitButtonDisabled: { opacity: 0.5 },
  submitButtonText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelMd, color: colors.text.onGold, fontWeight: typography.fontWeight.bold },
  errorText: { color: colors.status.error, fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.bodySm, textAlign: 'center', marginBottom: space.sm },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: space.md, gap: space.sm },
  dividerLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.border.subtle },
  dividerText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: colors.text.tertiary },
  oauthRow: { flexDirection: 'row', gap: space.md, marginBottom: space.lg },
  oauthButton: { flex: 1, height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.xs, borderRadius: radius.pill, backgroundColor: colors.background.surface, borderWidth: 1, borderColor: colors.border.subtle },
  oauthIcon: { fontSize: 18, color: colors.text.primary },
  oauthLabel: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelSm, color: colors.text.primary, fontWeight: typography.fontWeight.semibold },
  guestLinkButton: { alignItems: 'center', paddingVertical: space.sm },
  guestLinkText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.bodySm, color: colors.text.secondary, textDecorationLine: 'underline' },
});
