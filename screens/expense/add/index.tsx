import { ScrollView, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { ExpenseForm } from '../../../components';
import { useAppDispatch } from '../../../store';
import { useAddExpense } from '../../../api/expense';
import { addExpense } from '../../../slices/expense';
import type { SidebarDrawerParamList } from '../../../types/navigation';
import { theme } from '../../../styles';

type NavigationProp = DrawerNavigationProp<SidebarDrawerParamList, 'ExpenseNav'>;

const AddExpenseScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const dispatch = useAppDispatch();
	const { mutate, isLoading } = useAddExpense({
		onSuccess: (data) => {
			if (data) dispatch(addExpense(data));
			navigation.navigate('ExpenseNav', { screen: 'Expenses' });
		},
		onError: (error) => {
			console.log(error.message);
		}
	});
	return <ExpenseForm action={mutate} isLoading={isLoading} />
};

export default AddExpenseScreen;
