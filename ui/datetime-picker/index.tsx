import {useState, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone'; //TODO: probar en producción quitando el timezone
import {theme} from '../../styles';
import {getVariantStyle} from '../../utils';
import type {DateTimePickerProps} from '../../types/ui';

const DateTimePicker: React.FC<DateTimePickerProps> = ({
	variant = 'outlined',
	name
}) => {
	const [showPicker, setShowPicker] = useState(false);
	const date = useRef(new Date());

	const toggleDatePicker = () => {
		if (!showPicker) Keyboard.dismiss();
		setShowPicker(!showPicker);
	};

	const onConfirm = (selectedDate?: Date) => {
		const currentDate = selectedDate!!;
		date.current = currentDate;
		toggleDatePicker();
	};

	return (
		<>
			<TouchableOpacity
				style={[styles.input, getVariantStyle(variant, styles)]}
				onPress={toggleDatePicker}
			>
				<Text style={styles.text}>
					{moment(date.current).tz('America/Lima').format('DD/MM/YYYY')}
				</Text>
				<AntDesign name="calendar" size={20} color={theme.color.primary} />
			</TouchableOpacity>
			<DateTimePickerModal
				isVisible={showPicker}
				display="inline"
				mode="date"
				onConfirm={onConfirm}
				onCancel={toggleDatePicker}
				confirmTextIOS="Confirmar"
				cancelTextIOS="Cancelar"
				date={date.current}
				//timeZoneOffsetInMinutes={}
				//locale='es-ES'
			/>
		</>
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
