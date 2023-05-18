import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import {createClient} from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
	getItem: (key: string) => {
		return SecureStore.getItemAsync(key);
	},
	setItem: (key: string, value: string) => {
		SecureStore.setItemAsync(key, value);
	},
	removeItem: (key: string) => {
		SecureStore.deleteItemAsync(key);
	}
};
//TODO: move it to env variables
const supabaseUrl = 'https://htefsrvuxfoctobiyzth.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0ZWZzcnZ1eGZvY3RvYml5enRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM2ODE5MTcsImV4cCI6MTk5OTI1NzkxN30.kdRMKbX8Zai5agX5zl9kOqCYVMyg-nQMLoRIj6ZiqYQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: ExpoSecureStoreAdapter as any,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false
	}
});
