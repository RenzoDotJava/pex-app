import {useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import {LoginScreen, SignUpScreen} from '../screens';
import {setIsAuthenticated} from '../slices/navigation';
import {useAppDispatch, useAppSelector} from '../store';
import Sidebar from './sidebar';
import {supabase} from '../supabase';
import type {RootStackParamList} from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator: React.FC = () => {
	const dispatch = useAppDispatch();
	const {isAuthenticated} = useAppSelector((state) => state.navigation);

	useLayoutEffect(() => {
		let timeout: NodeJS.Timeout;
		const hideSplashScreen = () => {
			timeout = setTimeout(async () => {
				await SplashScreen.hideAsync();
			}, 1500);
		};

		supabase.auth.onAuthStateChange((event, session) => {
			dispatch(setIsAuthenticated(session ? true : false));
		});

		hideSplashScreen();

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	return (
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
	);
};

export default Navigator;
