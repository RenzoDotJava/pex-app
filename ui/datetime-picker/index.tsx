import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Keyboard, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import moment from 'moment-timezone'; //TODO: probar en producción quitando el timezone
import { useToggle } from '../../hooks';
import { theme } from '../../styles';
import { getDate, getVariantStyle, getCurrentDateToString } from '../../utils';
import type { DateTimePickerProps, FormControllerProps } from '../../types/ui';
import Calendar from '../calendar';
//https://es.stackoverflow.com/questions/149033/javascript-me-devuelve-fecha-err%C3%B3nea
const DateTimePicker: React.FC<DateTimePickerProps> = ({
	variant = 'outlined',
	value,
	onChange
}) => {
	const [isOpen, toggler] = useToggle({ onClose: () => Keyboard.dismiss() });
	const [date, setDate] = useState<string>(value ? value : getCurrentDateToString());

	const onConfirm = (date: string) => {
		setDate(date);
		onChange && onChange(date);
		toggler()
	}

	return (
		<>
			<TouchableOpacity
				style={[styles.input, getVariantStyle(variant, styles)]}
				onPress={toggler}
			>
				<Text style={styles.text}>
					{moment(getDate(date)).format('DD/MM/YYYY')}
				</Text>
				<AntDesign name="calendar" size={20} color={theme.color.primary} />
			</TouchableOpacity>
			<Calendar isOpen={isOpen} onCancel={toggler} onConfirm={onConfirm} date={date} />
		</>
	);
};

export const FormDateTimePicker: React.FC<
	FormControllerProps & DateTimePickerProps
> = ({ control, name, variant = 'outlined' }) => {
	const renderItem = (
		value: string,
		onChange: (name: number | string) => void
	) => {
		return (
			<DateTimePicker value={value} variant={variant} onChange={onChange} />
		);
	};

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onChange } }) => renderItem(value, onChange)}
		/>
	);
};

export default DateTimePicker;

const styles = StyleSheet.create({
	input: {
		height: 40,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'space-between',
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
