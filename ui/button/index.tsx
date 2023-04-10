import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {theme} from '../../styles';
import type {ButtonProps} from '../../types/ui';

const Button: React.FC<ButtonProps> = ({
	text,
	variant = 'standard',
	onPress
}) => {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				variant === 'outlined' ? styles.button_outlined : styles.button_standard
			]}
			onPress={onPress}
		>
			<Text
				style={[
					styles.text,
					,
					variant === 'outlined' ? styles.text_outlined : styles.text_standard
				]}
			>
				{text}
			</Text>
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		display: 'flex',
		//borderWidth: 1,
		//borderColor: theme.color.primary,
		height: 45,
		justifyContent: 'center',
		borderRadius: 6
	},
	button_outlined: {
		borderWidth: 1,
		borderColor: theme.color.primary
	},
	button_standard: {
		backgroundColor: theme.color.primary
	},
	text: {
		textAlign: 'center',
		fontSize: theme.fontSize.md
	},
	text_outlined: {
		color: theme.color.primary
	},
	text_standard: {
		color: theme.color.secondary
	}
});
