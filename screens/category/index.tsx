import {SidebarDrawerParamList} from "../../types/navigation";
import {StyleSheet, Text, View} from "react-native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {useNavigation} from "@react-navigation/native";

type NavigationProp = DrawerNavigationProp<SidebarDrawerParamList, "Category">;

const CategoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();

	return (
		<View>
			<Text>CategoryScreen</Text>
		</View>
	);
};

export default CategoryScreen;

const styles = StyleSheet.create({});
