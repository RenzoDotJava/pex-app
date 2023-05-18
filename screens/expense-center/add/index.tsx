import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ExpenseCenterForm} from '../../../components';
import {useAddExpenseCenter} from '../../../api/expense-center';
import {useAppDispatch} from '../../../store';
import {addExpenseCenter} from '../../../slices/expense-center';
import type {ConfigParamList} from '../../../types/navigation';

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'ExpenseCenterNav'>;

const AddExpenseCenterScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const dispatch = useAppDispatch();
	const {mutate, isLoading} = useAddExpenseCenter({
		onSuccess: (data) => {
			if (data) dispatch(addExpenseCenter(data));
			navigation.navigate('ExpenseCenterNav', {screen: 'ExpenseCenter'});
		},
		onError: (error) => {
			console.log(error.message);
		}
	});

	return <ExpenseCenterForm action={mutate} isLoading={isLoading} />;
};

export default AddExpenseCenterScreen;
