import {Alert, StyleSheet, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Ionicons, MaterialIcons, AntDesign} from '@expo/vector-icons';
import {
	AddPlaceScreen,
	PlaceScreen,
	EditPlaceScreen
} from '../../screens/place';
import {theme} from '../../styles';
import {IconButton} from '../../ui';
import {useAppDispatch, useAppSelector} from '../../store';
import {cleanDeleteList} from '../../slices/category';
import type {PlaceParamList} from '../../types/navigation';

const Stack = createNativeStackNavigator<PlaceParamList>();

const stackOptions: NativeStackNavigationOptions = {
	headerStyle: {
		backgroundColor: theme.color.primary
	},
	headerTitleStyle: {
		color: theme.color.secondary
	},
	headerTitleAlign: 'center',
	headerShadowVisible: false
};

const PlaceNavigator: React.FC = () => {
	const {selectMode} = useAppSelector((state) => state.place);
	const dispatch = useAppDispatch();

	const showAlertDeletePlace = () => {
		Alert.alert(
			'Eliminar',
			'¿Está seguro de eliminar los lugares seleccionados?',
			[
				{
					text: 'Cancelar',
					style: 'cancel'
				},
				{
					text: 'Eliminar'
					//onPress: () => dispatch(deleteExpenses())
				}
			]
		);
	};

	return (
		<Stack.Navigator initialRouteName="Place" screenOptions={stackOptions}>
			<Stack.Screen
				name="Place"
				component={PlaceScreen}
				options={({navigation}) => ({
					headerBackVisible: false,
					headerStyle: {
						backgroundColor: !selectMode ? theme.color.primary : 'gray'
					},
					headerTitle: () => <Text style={styles.headerTitle}>Lugares</Text>,
					headerLeft: () => (
						<IconButton
							onPress={() =>
								!selectMode ? navigation.goBack() : dispatch(cleanDeleteList())
							}
							icon={
								!selectMode ? (
									<AntDesign name="arrowleft" size={26} color="white" />
								) : (
									<Ionicons
										name={'close'}
										size={26}
										color={theme.color.secondary}
									/>
								)
							}
						/>
					),
					headerRight: () =>
						selectMode && (
							<IconButton
								onPress={showAlertDeletePlace}
								icon={
									<MaterialIcons
										name="delete"
										size={26}
										color={theme.color.secondary}
									/>
								}
							/>
						)
				})}
			/>
			<Stack.Screen
				name="AddPlace"
				component={AddPlaceScreen}
				options={({navigation}) => ({
					headerTitle: () => (
						<Text style={styles.headerTitle}>Agregar Lugar</Text>
					),
					headerBackVisible: false,
					headerLeft: () => (
						<IconButton
							onPress={navigation.goBack}
							icon={<AntDesign name="arrowleft" size={24} color="white" />}
						/>
					)
				})}
			/>
			<Stack.Screen
				name="EditPlace"
				component={EditPlaceScreen}
				options={({navigation}) => ({
					headerTitle: () => (
						<Text style={styles.headerTitle}>Editar Lugar</Text>
					),
					headerBackVisible: false,
					headerLeft: () => (
						<IconButton
							onPress={navigation.goBack}
							icon={<AntDesign name="arrowleft" size={24} color="white" />}
						/>
					)
				})}
			/>
		</Stack.Navigator>
	);
};

export default PlaceNavigator;

const styles = StyleSheet.create({
	headerTitle: {
		color: theme.color.secondary,
		fontSize: theme.fontSize.xl,
		fontWeight: '500'
	},
	drawerLabel: {
		fontWeight: '600',
		fontSize: theme.fontSize.md
	}
});