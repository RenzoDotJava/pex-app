import 'moment/locale/es';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';
import moment from 'moment-timezone';
import {theme} from '../../styles';
import IconButton from '../icon-button';

moment.locale('es');

const DateNavigator: React.FC = () => {
	const {i18n} = useTranslation('global');
	const [date, setDate] = useState(new Date());

	const addDate = () => {
		setDate(moment(date).add(1, 'days').toDate());
	}

	const subtractDate = () => {
		setDate(moment(date).subtract(1, 'days').toDate());
	}

	return (
		<View style={styles.container}>
			<IconButton
				icon={<AntDesign name="left" size={26} color={theme.color.secondary} onPress={subtractDate} />}
			/>
			<Text style={styles.label}>{moment(date).locale(i18n.language).format('LL')}</Text>
			<IconButton
				icon={
					<AntDesign name="right" size={26} color={theme.color.secondary} onPress={addDate} />
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
