import type {RootState} from "../../store";
import {Text, StyleSheet} from "react-native";
import {
	DrawerNavigationOptions,
	createDrawerNavigator
} from "@react-navigation/drawer";
import {useSelector, useDispatch} from "react-redux";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {SidebarDrawerParamList} from "../../types/navigation";
import {setSelectMode, cleanDeleteList} from "../../slices/expense";
import {CategoryScreen, ExpenseScreen} from "../../screens";
import {DrawerContent} from "../../components";
import {IconButton} from "../../ui";
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
	drawerActiveBackgroundColor: "black",
	//drawerInactiveBackgroundColor: 'red',
	drawerActiveTintColor: "white",
	drawerInactiveTintColor: "black",
	headerStyle: {
		backgroundColor: "black",
		height: 95,
		shadowColor: "transparent"
	},
	headerTitleStyle: {
		color: "white"
	},
	headerLeftContainerStyle: {
		paddingLeft: 12
	},
	headerRightContainerStyle: {
		paddingRight: 12
	},
	headerTitleAlign: "center"
};

const Sidebar: React.FC = () => {
	const {selectMode} = useSelector((state: RootState) => state.expense);
	const dispatch = useDispatch();

	const quitSelectMode = () => {
		dispatch(setSelectMode(false));
		dispatch(cleanDeleteList());
	}; 

	return (
		<Drawer.Navigator
			useLegacyImplementation
			initialRouteName="Expense"
			screenOptions={({navigation}) => ({
				...drawerOptions,
				headerLeft: () => (
					<IconButton
						onPress={() => navigation.openDrawer()}
						icon={<Ionicons name="menu" size={24} color="white" />}
					/>
				)
			})}
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen
				name="Expense"
				component={ExpenseScreen}
				options={({navigation}) => ({
					headerStyle: {
						backgroundColor: !selectMode ? "black" : "gray",
						height: 95,
						shadowColor: "transparent"
					},
					headerLeft: () => (
						<IconButton
							onPress={() =>
								!selectMode
									? navigation.openDrawer()
									: quitSelectMode()
							}
							icon={
								<Ionicons
									name={!selectMode ? "menu" : "close"}
									size={24}
									color="white"
								/>
							}
						/>
					),
					headerRight: () => (
						<IconButton
							icon={
								!selectMode ? (
									<Ionicons name="md-options-outline" size={24} color="white" />
								) : (
									<MaterialIcons name="delete" size={24} color="white" />
								)
							}
						/>
					),
					headerTitle: () => <Text style={styles.headerTitle}>Gastos</Text>,
					drawerLabel: (props) => (
						<Text style={[styles.drawerLabel, {color: props.color}]}>
							Gastos
						</Text>
					)
				})}
			/>
			<Drawer.Screen
				name="Category"
				component={CategoryScreen}
				options={{
					headerTitle: () => <Text style={styles.headerTitle}>Categorías</Text>,
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
		color: "white",
		fontSize: theme.fontSize.xl,
		fontWeight: "500"
	},
	drawerLabel: {
		fontWeight: "600",
		fontSize: theme.fontSize.md
	}
});
