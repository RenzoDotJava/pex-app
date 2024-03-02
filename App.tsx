import 'react-native-gesture-handler';
import 'intl-pluralrules';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import i18next from 'i18next';
import Navigator from './navigation';
import { store } from './store';
import { en, es } from './locales';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const queryClient = new QueryClient();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

i18next.init({
	interpolation: { escapeValue: false }, // React already does escaping
	lng: 'en',
	resources: {
		en: {
			global: en
		},
		es: {
			global: es
		}
	}
});

export default function App() {

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<I18nextProvider i18n={i18next}>
				<BottomSheetModalProvider>
					<QueryClientProvider client={queryClient}>
						<Provider store={store}>
							<Navigator />
						</Provider>
					</QueryClientProvider>
				</BottomSheetModalProvider>
			</I18nextProvider>
		</GestureHandlerRootView>
	);
}
