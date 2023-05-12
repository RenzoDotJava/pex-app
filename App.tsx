import 'react-native-gesture-handler';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import Navigator from './navigation';
import {store} from './store';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const queryClient = new QueryClient();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<Navigator />
			</Provider>
		</QueryClientProvider>
	);
}
