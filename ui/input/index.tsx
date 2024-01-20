import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Text
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Controller, FieldError } from 'react-hook-form';
import { theme } from '../../styles';
import { getVariantStyle } from '../../utils';
import type { FormControllerProps, InputProps } from '../../types/ui';

const Input: React.FC<InputProps> = ({
	variant = 'outlined',
	placeholder,
	secureTextEntry,
	keyboardType = 'default',
	onChangeText,
	value,
	error = false,
	flexible = false
}) => {
	return (
		<View
			style={[
				styles.input,
				getVariantStyle(variant, styles),
				{ borderColor: !error ? theme.color.primary : theme.color.error, flex: flexible ? 1 : 0 }
			]}
		>
			<TextInput
				style={styles.text}
				keyboardType={keyboardType}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
				onChangeText={onChangeText}
				value={value}
			/>
			{secureTextEntry && (
				<TouchableOpacity>
					<AntDesign name="eye" color={theme.color.primary} size={24} />
				</TouchableOpacity>
			)}
		</View>
	);
};

export const FormInput: React.FC<FormControllerProps & InputProps> = ({
	control,
	name,
	rules,
	variant = 'outlined',
	placeholder,
	secureTextEntry,
	keyboardType = 'default'
}) => {
	const renderItem = (
		value: any,
		onChange: (...event: any[]) => void,
		error: FieldError | undefined
	) => (
		<>
			<Input
				variant={variant}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
				keyboardType={keyboardType}
				value={value?.toString()}
				onChangeText={onChange}
				error={!!error}
			/>
			{error && <Text style={styles.text_error}>{error.message}</Text>}
		</>
	);

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) =>
				renderItem(value, onChange, error)
			}
		/>
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
		flexDirection: 'row'
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
	},
	text_error: {
		color: theme.color.error,
		marginTop: 5
	}
});
