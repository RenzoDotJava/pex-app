import {StyleSheet, Text, TouchableOpacity} from "react-native";
import theme from "../../styles";

type ButtonProps = {
	text: string;
  onPress: () => void;
};

const Button: React.FC<ButtonProps> = ({text, onPress}) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		display: "flex",
		borderWidth: 1,
		borderColor: "black",
		height: 40,
		justifyContent: "center",
		borderRadius: 6
	},
	text: {
		textAlign: "center",
		fontSize: theme.fontSize.md
	}
});
