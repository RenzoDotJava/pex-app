import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ExpenseCenterForm} from '../../../components';
import {useAppDispatch} from '../../../store';
import {useUpdateExpenseCenter} from '../../../api/expense-center';
import {updateExpenseCenter} from '../../../slices/expense-center';
import type {
	ConfigParamList,
	ExpenseCenterParamList
} from '../../../types/navigation';
import type {GeneralReq} from '../../../types/api';

type EditExpenseCenterScreenRouteProp = RouteProp<
	ExpenseCenterParamList,
	'EditExpenseCenter'
>;

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'ExpenseCenterNav'>;

const EditExpenseCenterScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const route = useRoute<EditExpenseCenterScreenRouteProp>();
	const expenseCenter = route.params;
	const dispatch = useAppDispatch();
	const {mutate, isLoading} = useUpdateExpenseCenter({
		onSuccess: (data) => {
			if (data) dispatch(updateExpenseCenter(data));
			navigation.navigate('ExpenseCenterNav', {screen: 'ExpenseCenter'});
		},
		onError: (error) => {
			console.log(error.message);
		}
	});

	const action = (data: GeneralReq) => {
		if (data.name !== expenseCenter.name) {
			mutate(data);
		} else {
			console.log("xd")
			navigation.navigate('ExpenseCenterNav', {screen: 'ExpenseCenter'});
		}
	};

	return (
		<ExpenseCenterForm
			expenseCenter={expenseCenter}
			action={action}
			isLoading={isLoading}
		/>
	);
};

export default EditExpenseCenterScreen;
