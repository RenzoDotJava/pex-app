import { StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import {
	ExpensesScreen,
	AddExpenseScreen,
	EditExpenseScreen,
	ConfigExpenseScreen
} from '../../screens/expense';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { theme } from '../../styles';
import { IconButton } from '../../ui';
import { useAppDispatch, useAppSelector } from '../../store';
import { cleanDeleteList, deleteExpenses } from '../../slices/expense';
import { setIsLoading } from '../../slices/navigation';
import { useDeleteExpenses } from '../../api/expense';
import { showAlert } from '../../utils';
import type { ExpenseParamList } from '../../types/navigation';

const Stack = createNativeStackNavigator<ExpenseParamList>();

const stackOptions: NativeStackNavigationOptions = {
	headerStyle: {
		backgroundColor: theme.color.primary.medium
	},
	headerTitleStyle: {
		color: theme.color.neutral.lightest
	},
	headerTitleAlign: 'center',
	headerShadowVisible: false
};

const ExpenseNavigator: React.FC = () => {
	const { t } = useTranslation('global');
	const { selectMode, deleteList } = useAppSelector((state) => state.expense);
	const dispatch = useAppDispatch();
	const { mutate } = useDeleteExpenses({
		onSuccess: () => {
			dispatch(deleteExpenses());
			dispatch(setIsLoading(false));
		},
		onError: (error) => {
			console.log(error.message);
			dispatch(setIsLoading(false));
		}
	});

	const onDeleteExpense = () => {
		dispatch(setIsLoading(true));
		mutate(deleteList);
	};

	return (
		<Stack.Navigator initialRouteName="Expenses" screenOptions={stackOptions}>
			<Stack.Screen
				name="Expenses"
				component={ExpensesScreen}
				options={({ navigation }) => ({
					headerStyle: {
						backgroundColor: !selectMode ? theme.color.primary.medium : theme.color.primary.darkest
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
									color={theme.color.neutral.lightest}
								/>
							}
						/>
					),
					headerRight: () => (
						<IconButton
							onPress={() =>
								!selectMode ? navigation.navigate('ExpenseNav', { screen: 'ConfigExpense' }) : showAlert(
									t("options.delete"),
									t("options.delete-expense") as string,
									[
										{
											text: t("options.cancel") as string,
											style: 'cancel'
										},
										{
											text: t("options.delete") as string,
											onPress: onDeleteExpense
										}
									]
								)
							}
							icon={
								!selectMode ? (
									<Ionicons
										name="md-options-outline"
										size={26}
										color={theme.color.neutral.lightest}
									/>
								) : (
									<MaterialIcons
										name="delete"
										size={26}
										color={theme.color.neutral.lightest}
									/>
								)
							}
						/>
					),
					animation: 'slide_from_right',
					animationTypeForReplace: 'push'
				})}
			/>
			<Stack.Screen
				name="AddExpense"
				component={AddExpenseScreen}
				options={({ navigation }) => ({
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("expense.add")}</Text>
					),
					headerBackVisible: false,
					headerLeft: () => (
						<IconButton
							onPress={navigation.goBack}
							icon={<AntDesign name="arrowleft" size={24} color={theme.color.neutral.lightest} />}
						/>
					),
					animation: 'slide_from_right',
					animationTypeForReplace: 'push'
				})}
			/>
			<Stack.Screen
				name="EditExpense"
				component={EditExpenseScreen}
				options={({ navigation }) => ({
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("expense.edit")}</Text>
					),
					headerBackVisible: false,
					headerLeft: () => (
						<IconButton
							onPress={navigation.goBack}
							icon={<AntDesign name="arrowleft" size={24} color={theme.color.neutral.lightest} />}
						/>
					),
					animation: 'slide_from_right',
					animationTypeForReplace: 'push'
				})}
			/>
			<Stack.Screen
				name="ConfigExpense"
				component={ConfigExpenseScreen}
				options={() => ({
					/* presentation: 'modal', */
					header: () => null,
					/* animation: 'slide_from_bottom',
					animationTypeForReplace: 'push' */
				})}
			/>
		</Stack.Navigator>
	);
};

export default ExpenseNavigator;

const styles = StyleSheet.create({
	headerTitle: {
		color: theme.color.neutral.lightest,
		fontSize: theme.fontSize.xl,
		fontWeight: '500'
	},
	drawerLabel: {
		fontWeight: '600',
		fontSize: theme.fontSize.md
	}
});
