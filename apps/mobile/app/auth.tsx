import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { useAuthStore } from '../src/stores/authStore';
import { triggerHaptic } from '../src/utils/haptics';

export default function AuthScreen() {
  const router = useRouter();
  const { signInWithEmail, signUpWithEmail, signInWithOAuth, continueAsGuest, isLoading, error } = useAuthStore();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!email || !password) return;
    triggerHaptic.light();
    const res = mode === 'signin' ? await signInWithEmail(email, password) : await signUpWithEmail(email, password);
    if (res.success) router.back();
  };

  const handleOAuth = async (provider: 'apple' | 'google') => {
    triggerHaptic.selection();
    const res = await signInWithOAuth(provider);
    if (res.success) router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.brandTitle}>kandid</Text>
            <Text style={styles.subtitle}>
              {mode === 'signin' ? 'welcome back — sign in to sync credits' : 'create your account & save shoots'}
            </Text>
          </View>

          {/* primary google oauth button */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => handleOAuth('google')}
            disabled={isLoading}
          >
            <View style={styles.googleIconBox}><Text style={styles.googleG}>G</Text></View>
            <Text style={styles.googleButtonText}>continue with google</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with email</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* segmented toggle */}
          <View style={styles.segmentedRow}>
            <TouchableOpacity onPress={() => setMode('signin')} style={[styles.segmentTab, mode === 'signin' && styles.segmentActive]}>
              <Text style={[styles.segmentText, mode === 'signin' && styles.segmentTextActive]}>sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMode('signup')} style={[styles.segmentTab, mode === 'signup' && styles.segmentActive]}>
              <Text style={[styles.segmentText, mode === 'signup' && styles.segmentTextActive]}>create account</Text>
            </TouchableOpacity>
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* inputs */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="you@kandid.app"
              placeholderTextColor={colors.text.tertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="password"
              placeholderTextColor={colors.text.tertiary}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading || !email || !password}
              style={[styles.submitButton, (!email || !password || isLoading) && styles.disabled]}
            >
              <Text style={styles.submitText}>{isLoading ? 'processing...' : mode === 'signin' ? 'sign in' : 'create account'}</Text>
            </TouchableOpacity>
          </View>

          {/* secondary actions */}
          <TouchableOpacity style={styles.appleButton} onPress={() => handleOAuth('apple')}>
            <Text style={styles.appleText}> continue with apple</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { continueAsGuest(); router.back(); }} style={styles.guestButton}>
            <Text style={styles.guestText}>continue as guest (offline mode)</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background.primary },
  flex: { flex: 1 },
  scroll: { paddingHorizontal: space.marginMobile, paddingVertical: space.md },
  header: { alignItems: 'center', marginBottom: space.md },
  brandTitle: { fontFamily: typography.fontFamilies.headline, fontSize: typography.fontSize.displayLg, color: colors.text.primary },
  subtitle: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.bodySm, color: colors.text.secondary, textAlign: 'center' },
  googleButton: { height: 50, borderRadius: radius.pill, backgroundColor: colors.background.surface, borderWidth: 1.5, borderColor: colors.brand.gold, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.sm, marginBottom: space.md },
  googleIconBox: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.brand.espresso, alignItems: 'center', justifyContent: 'center' },
  googleG: { color: colors.brand.gold, fontSize: 13, fontWeight: 'bold' },
  googleButtonText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelMd, color: colors.text.primary, fontWeight: typography.fontWeight.semibold },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: space.sm, gap: space.sm },
  dividerLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.border.subtle },
  dividerText: { fontFamily: typography.fontFamilies.body, fontSize: 12, color: colors.text.tertiary },
  segmentedRow: { flexDirection: 'row', backgroundColor: colors.background.secondary, borderRadius: radius.pill, padding: 3, marginBottom: space.md },
  segmentTab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: radius.pill },
  segmentActive: { backgroundColor: colors.brand.espresso },
  segmentText: { fontFamily: typography.fontFamilies.body, fontSize: 13, color: colors.text.secondary },
  segmentTextActive: { color: colors.background.primary, fontWeight: typography.fontWeight.bold },
  formContainer: { backgroundColor: colors.background.surface, padding: space.md, borderRadius: radius['2xl'], borderWidth: 1, borderColor: colors.border.subtle, marginBottom: space.md },
  input: { height: 46, backgroundColor: colors.background.secondary, borderRadius: radius.lg, paddingHorizontal: space.md, fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.bodyMd, color: colors.text.primary, marginBottom: space.sm },
  submitButton: { height: 46, borderRadius: radius.pill, backgroundColor: colors.brand.gold, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  submitText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelMd, color: colors.text.onGold, fontWeight: typography.fontWeight.bold },
  disabled: { opacity: 0.5 },
  errorText: { color: colors.status.error, fontFamily: typography.fontFamilies.body, fontSize: 12, textAlign: 'center', marginBottom: space.xs },
  appleButton: { height: 44, borderRadius: radius.pill, backgroundColor: colors.background.secondary, alignItems: 'center', justifyContent: 'center', marginBottom: space.sm },
  appleText: { fontFamily: typography.fontFamilies.body, fontSize: 13, color: colors.text.primary, fontWeight: typography.fontWeight.medium },
  guestButton: { alignItems: 'center', paddingVertical: space.sm },
  guestText: { fontFamily: typography.fontFamilies.body, fontSize: 12, color: colors.text.secondary, textDecorationLine: 'underline' },
});
