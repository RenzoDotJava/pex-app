import {useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {Controller} from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone'; //TODO: probar en producción quitando el timezone
import {useToggle} from '../../hooks';
import {theme} from '../../styles';
import {getVariantStyle} from '../../utils';
import type {DateTimePickerProps, FormControllerProps} from '../../types/ui';

const DateTimePicker: React.FC<DateTimePickerProps> = ({
	variant = 'outlined',
	value,
	onChange
}) => {
	const [isOpen, toggler] = useToggle({onClose: () => Keyboard.dismiss()});
	const date = useRef(value ? new Date(value) : new Date());

	const onConfirm = (selectedDate?: Date) => {
		const currentDate = selectedDate!!;
		date.current = currentDate;
		onChange && onChange(moment(currentDate).format('YYYY-MM-DD'));
		toggler();
	};

	return (
		<>
			<TouchableOpacity
				style={[styles.input, getVariantStyle(variant, styles)]}
				onPress={toggler}
			>
				<Text style={styles.text}>
					{moment(date.current) /* .tz('America/Lima') */
						.format('DD/MM/YYYY')}
				</Text>
				<AntDesign name="calendar" size={20} color={theme.color.primary} />
			</TouchableOpacity>
			<DateTimePickerModal
				isVisible={isOpen}
				display="inline"
				mode="date"
				onConfirm={onConfirm}
				onCancel={toggler}
				confirmTextIOS="Confirmar"
				cancelTextIOS="Cancelar"
				date={date.current}
				locale="es-ES"
			//timeZoneOffsetInMinutes={+5}
			//locale='es-ES'
			/>
		</>
	);
};

export const FormDateTimePicker: React.FC<
	FormControllerProps & DateTimePickerProps
> = ({control, name, variant = 'outlined'}) => {
	const renderItem = (
		value: any,
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
			render={({field: {value, onChange}}) => renderItem(value, onChange)}
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
