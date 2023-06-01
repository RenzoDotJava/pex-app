import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
import {ExpoSecureStoreAdapter} from '../utils/storage';
import {SUPABASE_URL, SUPABASE_KEY} from '@env';

const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: ExpoSecureStoreAdapter as any,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false
	}
});
