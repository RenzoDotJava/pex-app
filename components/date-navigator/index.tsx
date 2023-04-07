import {StyleSheet, Text, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {IconButton} from "../../ui";
import {theme} from "../../styles";

const DateNavigator: React.FC = () => {
	return (
		<View style={styles.container}>
			<IconButton icon={<AntDesign name="left" size={24} color="white" />} />
			<Text style={styles.label}>4 de abril de 2023</Text>
			<IconButton icon={<AntDesign name="right" size={24} color="white" />} />
		</View>
	);
};

export default DateNavigator;

const styles = StyleSheet.create({
	container: {
		height: 45,
		backgroundColor: "black",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 12
	},
	label: {
		color: "white",
		fontSize: theme.fontSize.md
	}
});
