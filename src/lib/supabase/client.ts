import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-supabase') && 
  !supabaseAnonKey.includes('your-supabase')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true, // Critical for OAuth redirect handling
      }
    })
  : null;

/**
 * Trigger Google OAuth Sign-In
 * Redirects to Google, then back to the app's origin URL
 */
export async function signInWithGoogleOAuth() {
  if (!supabase) {
    console.warn('Supabase not configured. Cannot perform Google OAuth.');
    return { data: null, error: new Error('Supabase not configured') };
  }

  // Redirect back to app's root URL after OAuth
  const redirectTo = typeof window !== 'undefined' 
    ? window.location.origin 
    : '';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
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
