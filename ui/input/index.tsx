import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {theme} from '../../styles';
import {getVariantStyle} from '../../utils';
import type {InputProps} from '../../types/ui';

const Input: React.FC<InputProps> = ({
	variant = 'outlined',
	placeholder,
	secureTextEntry,
	keyboardType = 'default'
}) => {
	return (
		<View style={[styles.input, getVariantStyle(variant, styles)]}>
			<TextInput
				style={styles.text}
				keyboardType={keyboardType}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
			/>
			{secureTextEntry && (
				<TouchableOpacity>
					<AntDesign name="eye" color={theme.color.primary} size={24} />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	label: {
		fontWeight: '500',
		fontSize: theme.fontSize.md,
		marginBottom: 4
	},
	input: {
		height: 40,
		backgroundColor: 'transparent',
		alignItems: 'center',
		flexDirection: 'row',
		borderColor: theme.color.primary
	},
	outlined: {
		borderWidth: 1,
		borderRadius: 6,
		paddingHorizontal: 8
	},
	standard: {
		borderBottomWidth: 1
	},
	text: {
		flex: 1,
		fontSize: theme.fontSize.md
	}
});
