import {Alert, StyleSheet, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
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
import type {ExpenseParamList} from '../../types/navigation';

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
	const {t} = useTranslation('global');
	const {selectMode} = useAppSelector((state) => state.expense);
	const dispatch = useAppDispatch();

	const showAlertDeleteExpense = () => {
		Alert.alert(
			t("options.delete"),
			t("options.delete-expense") as string,
			[
				{
					text: t("options.cancel") as string,
					style: 'cancel'
				},
				{
					text: t("options.delete") as string
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
					headerTitle: () => <Text style={styles.headerTitle}>{t("expense.header")}</Text>,
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
						<Text style={styles.headerTitle}>{t("expense.add")}</Text>
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
				name="EditExpense"
				component={EditExpenseScreen}
				options={({navigation}) => ({
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("expense.edit")}</Text>
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
