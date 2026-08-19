import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vpjsmgvmequzhgzotbph.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Trigger Google OAuth Sign-In
 */
export async function signInWithGoogleOAuth() {
  if (!supabase) {
    console.warn('Supabase anon key not configured in environment variables. Falling back to Google account workspace auth.');
    return { data: null, error: new Error('Supabase Anon Key not configured in .env.local') };
  }

  const callbackUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}` 
    : 'https://vpjsmgvmequzhgzotbph.supabase.co/auth/v1/callback';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  return { data, error };
}

/**
 * Sign Out User
 */
export async function signOutSupabase() {
  if (!supabase) return;
  await supabase.auth.signOut();
}
