import {StyleSheet, View, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {SidebarDrawerParamList} from "../../types/navigation";

type NavigationProp = DrawerNavigationProp<SidebarDrawerParamList, "Expense">;

const ExpenseScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();

	return (
		<View>
		</View>
	);
};

export default ExpenseScreen;

const styles = StyleSheet.create({});
