import { supabase } from '../lib/supabase';

export interface ProfileData {
  id: string;
  fullName: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
}

export async function fetchProfile(userId: string): Promise<{
  data: ProfileData | null;
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, display_name, avatar_url, bio')
      .eq('id', userId)
      .single();

    if (error || !data) {
      return { data: null, error: error?.message };
    }

    return {
      data: {
        id: data.id,
        fullName: data.full_name || '',
        displayName: data.display_name || '',
        avatarUrl: data.avatar_url || '',
        bio: data.bio || '',
      },
    };
  } catch (err: any) {
    return { data: null, error: err?.message || 'failed to fetch profile' };
  }
}

export async function updateProfile(
  userId: string,
  updates: Partial<ProfileData>
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload: Record<string, any> = {
      id: userId,
      updated_at: new Date().toISOString(),
    };
    if (updates.fullName !== undefined) payload.full_name = updates.fullName;
    if (updates.displayName !== undefined) payload.display_name = updates.displayName;
    if (updates.bio !== undefined) payload.bio = updates.bio;
    if (updates.avatarUrl !== undefined) payload.avatar_url = updates.avatarUrl;

    const { error } = await supabase.from('profiles').upsert(payload);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'failed to update profile' };
  }
}

export async function uploadAvatar(
  userId: string,
  imageUri: string
): Promise<{ url?: string; error?: string }> {
  try {
    const ext = imageUri.split('.').pop()?.toLowerCase() || 'jpg';
    const filePath = `${userId}/${Date.now()}.${ext}`;

    const res = await fetch(imageUri);
    const blob = await res.blob();

    const { error } = await supabase.storage
      .from('avatars')
      .upload(filePath, blob, {
        contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
        upsert: true,
      });

    if (error) {
      // In offline / mock mode fallback to local uri
      return { url: imageUri };
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    return { url: data.publicUrl || imageUri };
  } catch {
    // Graceful offline fallback
    return { url: imageUri };
  }
}
