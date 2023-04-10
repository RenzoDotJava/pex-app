import {Text, StyleSheet} from 'react-native';
import {
	DrawerNavigationOptions,
	createDrawerNavigator
} from '@react-navigation/drawer';
import {CategoryScreen} from '../../screens';
import ExpenseNavigator from '../expense';
import {DrawerContent} from '../../components';
import {theme} from '../../styles';
import type {SidebarDrawerParamList} from '../../types/navigation';

const Drawer = createDrawerNavigator<SidebarDrawerParamList>();

const drawerOptions: DrawerNavigationOptions = {
	drawerStyle: {
		backgroundColor: '#fff'
	},
	drawerItemStyle: {
		borderRadius: 0,
		width: '100%',
		marginLeft: 0,
		paddingLeft: 8
	},
	drawerActiveBackgroundColor: theme.color.primary,
	//drawerInactiveBackgroundColor: 'red',
	drawerActiveTintColor: theme.color.secondary,
	drawerInactiveTintColor: theme.color.primary,
	headerShown: false
};

const Sidebar: React.FC = () => {
	return (
		<Drawer.Navigator
			useLegacyImplementation
			initialRouteName="Expense"
			screenOptions={drawerOptions}
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen
				name="Expense"
				component={ExpenseNavigator}
				options={{
					drawerLabel: (props) => (
						<Text style={[styles.drawerLabel, {color: props.color}]}>
							Gastos
						</Text>
					)
				}}
			/>
			<Drawer.Screen
				name="Category"
				component={CategoryScreen}
				options={{
					drawerLabel: (props) => (
						<Text style={[styles.drawerLabel, {color: props.color}]}>
							Categorías
						</Text>
					)
				}}
			/>
		</Drawer.Navigator>
	);
};

export default Sidebar;

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
