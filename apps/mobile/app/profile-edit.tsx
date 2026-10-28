import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { useAuthStore } from '../src/stores/authStore';
import { triggerHaptic } from '../src/utils/haptics';

export default function ProfileEditScreen() {
  const router = useRouter();
  const { user, updateUserProfile, uploadUserAvatar } = useAuthStore();

  const [fullName, setFullName] = useState(user?.name || '');
  const [displayName, setDisplayName] = useState(user?.displayName || user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarUri, setAvatarUri] = useState<string | undefined>(user?.avatarUrl);
  const [hasNewAvatar, setHasNewAvatar] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePickAvatar = async () => {
    triggerHaptic.selection();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      setAvatarUri(result.assets[0].uri);
      setHasNewAvatar(true);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMsg(null);
    triggerHaptic.light();
    let finalUrl = avatarUri;
    if (hasNewAvatar && avatarUri) {
      const uploadRes = await uploadUserAvatar(avatarUri);
      if (uploadRes.url) finalUrl = uploadRes.url;
    }
    const res = await updateUserProfile({ fullName, displayName, bio, avatarUrl: finalUrl });
    setIsSaving(false);
    if (res.success) {
      triggerHaptic.success();
      router.back();
    } else {
      triggerHaptic.error();
      setErrorMsg(res.error || 'could not save profile');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>edit profile</Text>
          <View style={styles.placeholderBox} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* avatar picker */}
          <View style={styles.avatarSection}>
            <TouchableOpacity onPress={handlePickAvatar} style={styles.avatarWrap}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
              ) : (
                <View style={styles.avatarFallback}><Text style={styles.avatarInitials}>KC</Text></View>
              )}
              <View style={styles.cameraBadge}><Text style={styles.cameraIcon}>✎</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePickAvatar}><Text style={styles.changePhotoText}>change photo</Text></TouchableOpacity>
          </View>

          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

          {/* form */}
          <View style={styles.formCard}>
            <Text style={styles.label}>full name</Text>
            <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="your name" placeholderTextColor={colors.text.tertiary} />

            <Text style={styles.label}>display name</Text>
            <TextInput style={styles.input} value={displayName} onChangeText={setDisplayName} placeholder="display name" placeholderTextColor={colors.text.tertiary} />

            <Text style={styles.label}>bio / tagline</Text>
            <TextInput style={[styles.input, styles.multiline]} value={bio} onChangeText={setBio} placeholder="a short note about your style" placeholderTextColor={colors.text.tertiary} multiline numberOfLines={3} />
          </View>

          <TouchableOpacity style={[styles.saveBtn, isSaving && styles.disabled]} onPress={handleSave} disabled={isSaving}>
            {isSaving ? <ActivityIndicator color={colors.text.onGold} /> : <Text style={styles.saveBtnText}>save changes</Text>}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background.primary },
  flex: { flex: 1 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: space.marginMobile, paddingVertical: space.sm, borderBottomWidth: 1, borderColor: colors.border.subtle },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 24, color: colors.text.primary },
  headerTitle: { fontFamily: typography.fontFamilies.headline, fontSize: typography.fontSize.headlineSm, color: colors.text.primary },
  placeholderBox: { width: 40 },
  scroll: { paddingHorizontal: space.marginMobile, paddingVertical: space.lg },
  avatarSection: { alignItems: 'center', marginBottom: space.lg },
  avatarWrap: { width: 96, height: 96, borderRadius: 48, borderWidth: 2, borderColor: colors.brand.gold, overflow: 'hidden', position: 'relative' },
  avatarImg: { width: '100%', height: '100%' },
  avatarFallback: { flex: 1, backgroundColor: 'rgba(197, 168, 128, 0.2)', alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { fontFamily: typography.fontFamilies.headline, fontSize: 28, color: colors.brand.gold },
  cameraBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.brand.espresso, width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: colors.background.primary },
  cameraIcon: { color: colors.brand.gold, fontSize: 13 },
  changePhotoText: { fontFamily: typography.fontFamilies.body, fontSize: 13, color: colors.brand.gold, marginTop: space.xs, fontWeight: typography.fontWeight.semibold },
  formCard: { backgroundColor: colors.background.surface, borderRadius: radius['2xl'], padding: space.md, borderWidth: 1, borderColor: colors.border.subtle, marginBottom: space.lg },
  label: { fontFamily: typography.fontFamilies.body, fontSize: 12, color: colors.text.secondary, marginBottom: 4 },
  input: { height: 44, backgroundColor: colors.background.secondary, borderRadius: radius.lg, paddingHorizontal: space.md, fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.bodyMd, color: colors.text.primary, marginBottom: space.md },
  multiline: { height: 80, paddingTop: space.sm, textAlignVertical: 'top' },
  saveBtn: { height: 48, borderRadius: radius.pill, backgroundColor: colors.brand.gold, alignItems: 'center', justifyContent: 'center' },
  saveBtnText: { fontFamily: typography.fontFamilies.body, fontSize: typography.fontSize.labelMd, color: colors.text.onGold, fontWeight: typography.fontWeight.bold },
  disabled: { opacity: 0.6 },
  errorText: { color: colors.status.error, fontFamily: typography.fontFamilies.body, fontSize: 12, textAlign: 'center', marginBottom: space.sm },
});
