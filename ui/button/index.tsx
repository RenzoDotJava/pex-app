import {
	StyleSheet,
	Text,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import { theme } from '../../styles';
import type { ButtonProps } from '../../types/ui';

const Button: React.FC<ButtonProps> = ({
	text,
	variant = 'standard',
	height = 45,
	onPress,
	disabled = false,
	loading = false,
	flexible = false
}) => {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				variant === 'outlined'
					? styles.button_outlined
					: styles.button_standard,
				{ height, opacity: disabled || loading ? 0.65 : 1, flex: flexible ? 1 : 0 }
			]}
			onPress={onPress}
			disabled={disabled || loading}
		>
			{!loading ? (
				<Text
					style={[
						styles.text,
						,
						variant === 'outlined' ? styles.text_outlined : styles.text_standard
					]}
				>
					{text}
				</Text>
			) : (
				<ActivityIndicator color={'white'} />
			)}
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		display: 'flex',
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
