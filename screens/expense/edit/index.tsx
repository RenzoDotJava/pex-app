import {RouteProp, useRoute} from '@react-navigation/native';
import {ExpenseForm} from '../../../components';
import type {ExpenseParamList} from '../../../types/navigation';

type EditExpenseScreenRouteProp = RouteProp<ExpenseParamList, 'EditExpense'>;

const EditExpenseScreen: React.FC = () => {
	const route = useRoute<EditExpenseScreenRouteProp>();
	const expense = route.params;

	return <ExpenseForm expense={expense} />;
};

export default EditExpenseScreen;
