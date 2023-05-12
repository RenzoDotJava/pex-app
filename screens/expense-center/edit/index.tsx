import {RouteProp, useRoute} from '@react-navigation/native';
import {ExpenseCenterForm} from '../../../components';
import type {ExpenseCenterParamList} from '../../../types/navigation';

type EditExpenseCenterScreenRouteProp = RouteProp<
	ExpenseCenterParamList,
	'EditExpenseCenter'
>;

const EditExpenseCenterScreen: React.FC = () => {
	const route = useRoute<EditExpenseCenterScreenRouteProp>();
	const expenseCenter = route.params;

	return <ExpenseCenterForm expenseCenter={expenseCenter} />;
};

export default EditExpenseCenterScreen;
