import {Text, StyleSheet} from "react-native";
import {
	DrawerNavigationOptions,
	createDrawerNavigator
} from "@react-navigation/drawer";
import {SidebarDrawerParamList} from "../../types/navigation";
import {CategoryScreen, ExpenseScreen} from "../../screens";
import {MenuOption} from "../../components/header-options";
import DrawerContent from "../../components/drawer-content";
import {theme} from "../../styles";

const Drawer = createDrawerNavigator<SidebarDrawerParamList>();

const drawerOptions: DrawerNavigationOptions = {
	drawerStyle: {
		backgroundColor: "#fff"
	},
	drawerItemStyle: {
		borderRadius: 0,
		width: "100%",
		marginLeft: 0,
		paddingLeft: 8
	},
	drawerActiveBackgroundColor: 'black',
	//drawerInactiveBackgroundColor: 'red',
  drawerActiveTintColor: "white",
  drawerInactiveTintColor: 'black',
	headerLeft: () => <MenuOption />,
	headerStyle: {
		backgroundColor: "black",
		height: 110
	},
	headerTitleStyle: {
		color: "white"
	},
	headerLeftContainerStyle: {
		paddingLeft: 12
	},
	headerTitleAlign: "center"
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
				component={ExpenseScreen}
				options={{
					headerTitle: () => <Text style={styles.headerTitle}>Gastos</Text>,
					drawerLabel: (props) => <Text style={[styles.drawerLabel, {color: props.color}]}>Gastos</Text>
				}}
			/>
			<Drawer.Screen
				name="Category"
				component={CategoryScreen}
				options={{
					headerTitle: () => <Text style={styles.headerTitle}>Categorías</Text>,
					drawerLabel: (props) => <Text style={[styles.drawerLabel, {color: props.color}]}>Categorías</Text>
				}}
			/>
		</Drawer.Navigator>
	);
};

export default Sidebar;

const styles = StyleSheet.create({
	headerTitle: {
		color: "white",
		fontSize: theme.fontSize.xl,
		fontWeight: "500"
	},
	drawerLabel: {
		fontWeight: "600",
		fontSize: theme.fontSize.md
	}
});
