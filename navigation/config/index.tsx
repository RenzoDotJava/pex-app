import {StyleSheet, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Ionicons} from '@expo/vector-icons';
import {theme} from '../../styles';
import {IconButton} from '../../ui';
import {ConfigScreen} from '../../screens';
import ExpenseCenterNavigator from '../expense-center';
import CategoryNavigator from '../category';
import PaymentMethodNavigator from '../payment-method';
import PlaceNavigator from '../place';
import type {ConfigParamList} from '../../types/navigation';

const Stack = createNativeStackNavigator<ConfigParamList>();

const stackOptions: NativeStackNavigationOptions = {
	headerStyle: {
		backgroundColor: theme.color.primary
	},
	headerTitleStyle: {
		color: theme.color.secondary
	},
	headerTitleAlign: 'center',
	headerShadowVisible: false
};

const ConfigNavigator: React.FC = () => {
	return (
		<Stack.Navigator initialRouteName="Config" screenOptions={stackOptions}>
			<Stack.Screen
				name="Config"
				component={ConfigScreen}
				options={({navigation}) => ({
					headerStyle: {
						backgroundColor: theme.color.primary
					},
					headerTitle: () => (
						<Text style={styles.headerTitle}>Configuración</Text>
					),
					headerLeft: () => (
						<IconButton
							onPress={navigation.openDrawer}
							icon={
								<Ionicons
									name={'menu'}
									size={26}
									color={theme.color.secondary}
								/>
							}
						/>
					)
				})}
			/>
			<Stack.Screen
				name="ExpenseCenterNav"
				component={ExpenseCenterNavigator}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="CategoryNav"
				component={CategoryNavigator}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="PaymentMethodNav"
				component={PaymentMethodNavigator}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="PlaceNav"
				component={PlaceNavigator}
				options={{headerShown: false}}
			/>
		</Stack.Navigator>
	);
};

export default ConfigNavigator;

const styles = StyleSheet.create({
	headerTitle: {
		color: theme.color.secondary,
		fontSize: theme.fontSize.xl,
		fontWeight: '500'
	},
	drawerLabel: {
		fontWeight: '600',
		fontSize: theme.fontSize.md
	}
});
