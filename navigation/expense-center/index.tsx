import {StyleSheet, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Ionicons, MaterialIcons, AntDesign} from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';
import {
	AddExpenseCenterScreen,
	ExpenseCenterScreen,
	EditExpenseCenterScreen
} from '../../screens/expense-center';
import {theme} from '../../styles';
import {IconButton} from '../../ui';
import {useAppDispatch, useAppSelector} from '../../store';
import {
	cleanDeleteList,
	deleteExpenseCenters
} from '../../slices/expense-center';
import {setIsLoading} from '../../slices/navigation';
import {useDeleteExpenseCenters} from '../../api/expense-center';
import {showAlert} from '../../utils';
import type {ExpenseCenterParamList} from '../../types/navigation';

const Stack = createNativeStackNavigator<ExpenseCenterParamList>();

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

const ExpenseCenterNavigator: React.FC = () => {
	const {t} = useTranslation('global');
	const {selectMode, deleteList} = useAppSelector(
		(state) => state.expenseCenter
	);
	const dispatch = useAppDispatch();
	const {mutate} = useDeleteExpenseCenters({
		onSuccess: () => {
			dispatch(deleteExpenseCenters());
			dispatch(setIsLoading(false));
		},
		onError: (error) => {
			console.log(error.message);
			dispatch(setIsLoading(false));
		}
	});

	const onDeleteExpenseCenter = () => {
		dispatch(setIsLoading(true));
		mutate(deleteList);
	};

	return (
		<Stack.Navigator
			initialRouteName="ExpenseCenter"
			screenOptions={stackOptions}
		>
			<Stack.Screen
				name="ExpenseCenter"
				component={ExpenseCenterScreen}
				options={({navigation}) => ({
					headerBackVisible: false,
					headerStyle: {
						backgroundColor: !selectMode ? theme.color.primary : 'gray'
					},
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("config.expense-center")}</Text>
					),
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
								onPress={() =>
									showAlert(
										t("options.delete"),
										t("options.delete-expense-center"),
										[
											{
												text: t("options.cancel") as string,
												style: 'cancel'
											},
											{
												text: t("options.delete") as string,
												onPress: onDeleteExpenseCenter
											}
										]
									)
								}
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
				name="AddExpenseCenter"
				component={AddExpenseCenterScreen}
				options={({navigation}) => ({
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("expense-center.add")}</Text>
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
				name="EditExpenseCenter"
				component={EditExpenseCenterScreen}
				options={({navigation}) => ({
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("expense-center.edit")}</Text>
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

export default ExpenseCenterNavigator;

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
