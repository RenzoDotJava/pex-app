import {Text, StyleSheet} from 'react-native';
import {
	DrawerNavigationOptions,
	createDrawerNavigator
} from '@react-navigation/drawer';
import {useTranslation} from 'react-i18next';
import ExpenseNavigator from '../expense';
import {DrawerContent} from '../../components';
import {theme} from '../../styles';
import ConfigNavigator from '../config';
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
	const {t} = useTranslation("global");

	return (
		<Drawer.Navigator
			initialRouteName="ExpenseNav"
			screenOptions={drawerOptions}
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen
				name="ExpenseNav"
				component={ExpenseNavigator}
				options={{
					drawerLabel: (props) => (
						<Text style={[styles.drawerLabel, {color: props.color}]}>
							{t("expense.header")}
						</Text>
					)
				}}
			/>
			<Drawer.Screen
				name="ConfigNav"
				component={ConfigNavigator}
				options={{
					drawerLabel: (props) => (
						<Text style={[styles.drawerLabel, {color: props.color}]}>
							{t("config.header")}
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
		fontSize: theme.fontSize.lg
	}
});
