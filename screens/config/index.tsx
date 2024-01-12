import {
	StyleSheet,
	Text,
	ScrollView,
	View,
	TouchableOpacity,
	Switch
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useTranslation} from 'react-i18next';
import {theme} from '../../styles';
import type {ConfigParamList} from '../../types/navigation';

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'Config'>;

const ConfigScreen = () => {
	const {t} = useTranslation('global');
	const navigation = useNavigation<NavigationProp>();

	return (
		<ScrollView>
			<View style={styles.section}>
				<Text style={styles.section_title}>{t("config.expense-info")}</Text>
			</View>
			<TouchableOpacity
				style={styles.subsection}
				onPress={() =>
					navigation.navigate('ExpenseCenterNav', {screen: 'ExpenseCenter'})
				}
			>
				<Text style={styles.subsection_title}>{t("config.expense-center")}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.subsection}
				onPress={() => navigation.navigate('CategoryNav', {screen: 'Category'})}
			>
				<Text style={styles.subsection_title}>{t("config.category")}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.subsection}
				onPress={() =>
					navigation.navigate('PaymentMethodNav', {screen: 'PaymentMethod'})
				}
			>
				<Text style={styles.subsection_title}>{t("config.payment-method")}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.subsection}
				onPress={() => navigation.navigate('PlaceNav', {screen: 'Place'})}
			>
				<Text style={styles.subsection_title}>{t("config.place")}</Text>
			</TouchableOpacity>
			<View style={styles.section}>
				<Text style={styles.section_title}>{t("config.personal-config")}</Text>
			</View>
			{/* <TouchableOpacity
				style={styles.subsection}
				onPress={() => navigation.navigate('Currencies')}
			>
				<Text style={styles.subsection_title}>{t("config.currency")}</Text>
			</TouchableOpacity> */}
			<TouchableOpacity
				style={styles.subsection}
				onPress={() => navigation.navigate('Languages')}
			>
				<Text style={styles.subsection_title}>{t("config.language")}</Text>
			</TouchableOpacity>
			{/* <View
				style={[
					styles.subsection,
					{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center'
					}
				]}
			>
				<Text style={styles.subsection_title}>{t("config.dark-mode")}</Text>
				<Switch style={{marginVertical: -15}} />
			</View> */}
		</ScrollView>
	);
};

export default ConfigScreen;

const styles = StyleSheet.create({
	section: {
		backgroundColor: 'gray',
		height: 45,
		display: 'flex',
		justifyContent: 'center',
		paddingHorizontal: 10
	},
	section_title: {
		fontSize: theme.fontSize.sm,
		color: theme.color.secondary
	},
	subsection: {
		//height: 60,
		display: 'flex',
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderColor: 'gray',
		paddingVertical: 15,
		paddingHorizontal: 10,
		backgroundColor: theme.color.secondary
	},
	subsection_title: {
		fontSize: theme.fontSize.md
	}
});
