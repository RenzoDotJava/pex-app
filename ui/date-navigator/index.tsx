import 'moment/locale/es';
import {StyleSheet, Text, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';
import moment from 'moment-timezone';
import {theme} from '../../styles';
import IconButton from '../icon-button';
import {useAppDispatch, useAppSelector} from '../../store';
import {addDate, subtractDate} from '../../slices/expense';

moment.locale('es');

const DateNavigator: React.FC = () => {
	const {i18n} = useTranslation('global');
	const dispatch = useAppDispatch();
	const {date} = useAppSelector((state) => state.expense); //TODO: make this component generic

	return (
		<View style={styles.container}>
			<IconButton
				icon={<AntDesign name="left" size={26} color={theme.color.secondary} onPress={() => dispatch(subtractDate())} />}
			/>
			<Text style={styles.label}>{moment(date).locale(i18n.language).format('LL')}</Text>
			<IconButton
				icon={
					<AntDesign name="right" size={26} color={theme.color.secondary} onPress={() => dispatch(addDate())} />
				}
			/>
		</View>
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
