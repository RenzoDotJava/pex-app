import {StyleSheet, Text, View} from "react-native";
import {theme} from "../../styles";
import type {BadgeProps} from "../../types/ui";

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
		backgroundColor: theme.color.primary,
		paddingVertical: 2,
		paddingHorizontal: 10
	},
	text: {
		color: theme.color.secondary,
		fontSize: theme.fontSize.sm
	}
});
