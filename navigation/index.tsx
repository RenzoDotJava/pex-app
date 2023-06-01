import {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import * as SplashScreen from 'expo-splash-screen';
import {LoginScreen, SignUpScreen} from '../screens';
import {setIsAuthenticated} from '../slices/navigation';
import {useAppDispatch, useAppSelector} from '../store';
import {NavigatorWrapper} from '../components';
import Sidebar from './sidebar';
import {supabase} from '../supabase';
import { setGlobalLanguage } from '../utils/locales';
import type {RootStackParamList} from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator: React.FC = () => {
	const {i18n} = useTranslation('global');
	const dispatch = useAppDispatch();
	const {isAuthenticated} = useAppSelector((state) => state.navigation);

	const onLayoutRootView = useCallback(async () => {
		setTimeout(async () => {
			await SplashScreen.hideAsync();
		}, 1000);
	}, [isAuthenticated]);

	useEffect(() => {
		setGlobalLanguage(i18n);

		const {data: listener} = supabase.auth.onAuthStateChange(
			(event, session) => {
				dispatch(setIsAuthenticated(session ? true : false));
			}
		);

		return () => {
			listener.subscription.unsubscribe();
		};
	}, []);

	return (
		<NavigatorWrapper onLayout={onLayoutRootView}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{headerShown: false}}>
					{!isAuthenticated ? (
						<Stack.Group>
							<Stack.Screen name="Login" component={LoginScreen} />
							<Stack.Screen name="SignUp" component={SignUpScreen} />
						</Stack.Group>
					) : (
						<Stack.Group>
							<Stack.Screen name="Sidebar" component={Sidebar} />
						</Stack.Group>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</NavigatorWrapper>
	);
};

export default Navigator;
