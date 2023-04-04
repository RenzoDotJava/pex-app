import {View, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {theme} from "../../styles";

type InputProps = {
	placeholder?: string;
	variant?: "outlined" | "standard";
	secureTextEntry?: boolean;
};

const Input: React.FC<InputProps> = ({
	variant = "outlined",
	placeholder,
	secureTextEntry
}) => {
	function getVariantStyle() {
		switch (variant) {
			case "outlined":
				return styles.outlined;
			case "standard":
				return styles.standard;
			default:
				return styles.outlined;
		}
	}

	return (
		<View style={[styles.input, getVariantStyle()]}>
			<TextInput
				style={{flex: 1}}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
			/>
			{secureTextEntry && (
				<TouchableOpacity>
					<AntDesign name="eye" color="black" size={24} />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	label: {
		fontWeight: "500",
		fontSize: theme.fontSize.md,
		marginBottom: 4
	},
	input: {
		height: 40,
		backgroundColor: "transparent",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		borderColor: "black"
	},
	outlined: {
		borderWidth: 1,
		borderRadius: 6,
		paddingHorizontal: 8
	},
	standard: {
		borderBottomWidth: 1
	}
});
