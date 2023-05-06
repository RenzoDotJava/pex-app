import {
	StyleSheet,
	Text,
	ScrollView,
	View,
	TouchableOpacity
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {theme} from '../../styles';
import type {ConfigParamList} from '../../types/navigation';

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'Config'>;

const ConfigScreen = () => {
	const navigation = useNavigation<NavigationProp>();

	return (
		<ScrollView>
			<View style={styles.section}>
				<Text style={styles.section_title}>Información de gasto</Text>
			</View>
			<TouchableOpacity
				style={styles.subsection}
				onPress={() =>
					navigation.navigate('CostCenterNav', {screen: 'CostCenter'})
				}
			>
				<Text style={styles.subsection_title}>Centros de costo</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.subsection}
				onPress={() => navigation.navigate('CategoryNav', {screen: 'Category'})}
			>
				<Text style={styles.subsection_title}>Categorías</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.subsection}
				onPress={() =>
					navigation.navigate('PaymentMethodNav', {screen: 'PaymentMethod'})
				}
			>
				<Text style={styles.subsection_title}>Métodos de pago</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.subsection}
				onPress={() => navigation.navigate('PlaceNav', {screen: 'Place'})}
			>
				<Text style={styles.subsection_title}>Lugares</Text>
			</TouchableOpacity>
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
