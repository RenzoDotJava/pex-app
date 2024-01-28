import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { ExpoSecureStoreAdapter } from '../utils/storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: ExpoSecureStoreAdapter as any,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false
	}
});

/* export const supabase = createClient('https://htefsrvuxfoctobiyzth.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0ZWZzcnZ1eGZvY3RvYml5enRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM2ODE5MTcsImV4cCI6MTk5OTI1NzkxN30.kdRMKbX8Zai5agX5zl9kOqCYVMyg-nQMLoRIj6ZiqYQ', {
	auth: {
		storage: ExpoSecureStoreAdapter as any,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false
	}
}); */
