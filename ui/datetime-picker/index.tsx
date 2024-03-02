import { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import moment from 'moment-timezone';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { theme } from '../../styles';
import BottomSheet from '../bottom-sheet';
import { getDate, getVariantStyle, getCurrentDateToString } from '../../utils';
import { calendarLocales } from '../../locales';
import type { DateTimePickerProps, FormControllerProps } from '../../types/ui';

//https://es.stackoverflow.com/questions/149033/javascript-me-devuelve-fecha-err%C3%B3nea
const DateTimePicker: React.FC<DateTimePickerProps> = ({
	variant = 'outlined',
	value,
	onChange
}) => {
	const { dismiss } = useBottomSheetModal();
	const { i18n } = useTranslation('global');
	const ref = useRef<BottomSheetModal>(null);
	const [date, setDate] = useState<string>(value ? value : getCurrentDateToString());

	LocaleConfig.locales['en'] = calendarLocales['en'];
	LocaleConfig.locales['es'] = calendarLocales['es'];

	LocaleConfig.defaultLocale = i18n.language;

	const handleSnapPress = useCallback(() => {
		ref.current?.present();
	}, []);

	const onConfirm = (date: string) => {
		setDate(date);
		onChange && onChange(date);
		dismiss()
	}

	return (
		<>
			<TouchableOpacity
				style={[styles.input, getVariantStyle(variant, styles)]}
				onPress={handleSnapPress}
			>
				<Text style={styles.text}>
					{moment(getDate(date)).format('DD/MM/YYYY')}
				</Text>
				<AntDesign name="calendar" size={20} color={theme.color.neutral.dark} />
			</TouchableOpacity>
			<BottomSheet
				ref={ref}
				enableDynamicSizing
				enablePanDownToClose
			>
				<BottomSheetScrollView>
					<Calendar
						onDayPress={day => { onConfirm(day.dateString) }}
						markedDates={{
							[value!!]: { selected: true, disableTouchEvent: true, selectedColor: theme.color.primary.medium }
						}}
						theme={{
							arrowColor: theme.color.primary.medium,
							todayTextColor: theme.color.primary.medium,
						}}
						style={{ paddingBottom: Platform.OS === 'ios' ? 45 : 20 }}
					/>
				</BottomSheetScrollView>
			</BottomSheet>
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
		borderColor: theme.color.neutral.dark
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
