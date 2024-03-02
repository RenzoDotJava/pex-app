import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ExpenseForm } from '../../../components';
import { useAppDispatch } from '../../../store';
import { useUpdateExpense } from '../../../api/expense';
import { updateExpense } from '../../../slices/expense';
import type { ExpenseParamList, SidebarDrawerParamList } from '../../../types/navigation';
import type { ExpenseFormInputs } from '../../../types/components';

type EditExpenseScreenRouteProp = RouteProp<ExpenseParamList, 'EditExpense'>;

type NavigationProp = DrawerNavigationProp<SidebarDrawerParamList, 'ExpenseNav'>;

const EditExpenseScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const route = useRoute<EditExpenseScreenRouteProp>();
	const expense = route.params;
	const dispatch = useAppDispatch();
	const { mutate, isLoading } = useUpdateExpense({
		onSuccess: (data) => {
			if (data) dispatch(updateExpense(data));
			navigation.navigate('ExpenseNav', { screen: 'Expenses' });
		},
		onError: (error) => {
			console.log(error.message);
		}
	});

	const action = (data: ExpenseFormInputs) => {
		mutate(data);
	};

	return <ExpenseForm expense={expense} action={action} isLoading={isLoading} />;
};

export default EditExpenseScreen;
