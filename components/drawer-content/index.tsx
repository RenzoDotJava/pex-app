import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {
	DrawerContentScrollView,
	DrawerContentComponentProps,
	DrawerItemList
} from "@react-navigation/drawer";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types/navigation";
import {theme} from "../../styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
	const navigation = useNavigation<NavigationProp>()

	const logOut = () => {
		navigation.navigate("Login")
	}

	return (
		<View style={styles.container}>
			<DrawerContentScrollView>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>
			<TouchableOpacity style={styles.footer} activeOpacity={0.6} onPress={logOut}>
				<Text style={styles.footerLabel}>Cerrar Sesión</Text>
			</TouchableOpacity>
		</View>
	);
};

export default DrawerContent;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	footer: {
		padding: 20,
		backgroundColor: "black"
	},
	footerLabel: {
		fontSize: theme.fontSize.md,
		color: "white",
		fontWeight: "500"
	}
});
