import {Alert, StyleSheet, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
	ExpensesScreen,
	AddExpenseScreen,
	EditExpenseScreen
} from '../../screens/expense';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Ionicons, MaterialIcons, AntDesign} from '@expo/vector-icons';
import {theme} from '../../styles';
import {IconButton} from '../../ui';
import {useAppDispatch, useAppSelector} from '../../store';
import {cleanDeleteList} from '../../slices/expense';
import type {
	ExpenseParamList
} from '../../types/navigation';
import {useRoute} from '@react-navigation/native';

const Stack = createNativeStackNavigator<ExpenseParamList>();

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

const ExpenseNavigator: React.FC = () => {
	const {selectMode} = useAppSelector((state) => state.expense);
	const dispatch = useAppDispatch();

	const showAlertDeleteExpense = () => {
		Alert.alert(
			'Eliminar',
			'¿Está seguro de eliminar los gastos seleccionados?',
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
		<Stack.Navigator initialRouteName="Expenses" screenOptions={stackOptions}>
			<Stack.Screen
				name="Expenses"
				component={ExpensesScreen}
				options={({navigation}) => ({
					headerStyle: {
						backgroundColor: !selectMode ? theme.color.primary : 'gray'
					},
					headerTitle: () => <Text style={styles.headerTitle}>Gastos</Text>,
					headerLeft: () => (
						<IconButton
							onPress={() =>
								!selectMode
									? navigation.openDrawer()
									: dispatch(cleanDeleteList())
							}
							icon={
								<Ionicons
									name={!selectMode ? 'menu' : 'close'}
									size={26}
									color={theme.color.secondary}
								/>
							}
						/>
					),
					headerRight: () => (
						<IconButton
							onPress={() =>
								!selectMode ? undefined : showAlertDeleteExpense()
							}
							icon={
								!selectMode ? (
									<Ionicons
										name="md-options-outline"
										size={26}
										color={theme.color.secondary}
									/>
								) : (
									<MaterialIcons
										name="delete"
										size={26}
										color={theme.color.secondary}
									/>
								)
							}
						/>
					)
				})}
			/>
			<Stack.Screen
				name="AddExpense"
				component={AddExpenseScreen}
				options={({navigation}) => ({
					headerTitle: () => (
						<Text style={styles.headerTitle}>Agregar Gasto</Text>
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
			<Stack.Screen name="EditExpense" component={EditExpenseScreen} />
		</Stack.Navigator>
	);
};

export default ExpenseNavigator;

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
