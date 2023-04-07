import {StyleSheet, Text, View} from "react-native";
import {theme} from "../../styles";

type BadgeProps = {
	text: string;
};

const Badge: React.FC<BadgeProps> = ({text}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};

export default Badge;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: "black",
		paddingVertical: 2,
		paddingHorizontal: 10
	},
	text: {
		color: "white",
		fontSize: theme.fontSize.sm
	}
});
