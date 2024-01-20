import 'moment/locale/es';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';
import { theme } from '../../styles';
import IconButton from '../icon-button';
import { useAppDispatch, useAppSelector } from '../../store';
import { addDate, subtractDate } from '../../slices/expense';

const DateNavigator: React.FC = () => {
	const { i18n } = useTranslation('global');
	const dispatch = useAppDispatch();
	const { date, mode, year, yearMonth, month } = useAppSelector((state) => state.expense); //TODO: make this component generic

	moment.locale(i18n.language);

	const monthOptions = moment.months().map((month, index) => ({ name: month, id: index + 1 }))

	const getDateText = () => {
		switch (mode) {
			case 'yearly':
				return year;
			case 'monthly':
				return monthOptions.find(m => m.id === month)?.name + ' ' + yearMonth;
			case 'daily':
				return moment(date).locale(i18n.language).format('LL');
			default:
				return date;
		}
	}

	return (
		<>
			<View style={styles.container}>
				<IconButton
					icon={<AntDesign name="left" size={26} color={theme.color.secondary} onPress={() => dispatch(subtractDate())} />}
				/>
				<TouchableOpacity style={{ flex: 1, alignItems: 'center', display: 'flex' }} /* onPress={toggler} */>
					<Text style={styles.label}>{getDateText()}</Text>
				</TouchableOpacity>
				<IconButton
					icon={
						<AntDesign name="right" size={26} color={theme.color.secondary} onPress={() => dispatch(addDate())} />
					}
				/>
			</View>
		</>
	);
};

export default DateNavigator;

const styles = StyleSheet.create({
	container: {
		height: 45,
		backgroundColor: theme.color.primary,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 12
	},
	label: {
		color: theme.color.secondary,
		fontSize: theme.fontSize.md
	}
});
