import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {AppDispatch, RootState} from '../../store';
import type {ExpenseState} from '../../types/slices';
import {OnPressType} from '../../enums';

const list = [
	{
		id: 1,
		expenseCenter: 'Micaela',
		expenseCenterId: 1,
		category: 'Salud',
		categoryId: 2,
		place: 'San Judas Mateo',
		placeId: 3,
		paymentMethod: 'Crédito',
		paymentMethodId: 4,
		amount: 100,
		date: '2023-04-12'
	},
	{
		id: 2,
		expenseCenter: 'Micaela',
		expenseCenterId: 1,
		category: 'Salud',
		categoryId: 2,
		place: 'San Judas Mateo',
		placeId: 3,
		paymentMethod: 'Crédito',
		paymentMethodId: 4,
		amount: 100,
		date: '2023-04-12'
	},
];

const initialState: ExpenseState = {
	selectMode: false,
	deleteList: [],
	expenses: list
};

export const expenseSlice = createSlice({
	name: 'expense',
	initialState,
	reducers: {
		addToDeleteList: (state, action: PayloadAction<number>) => {
			if (!state.selectMode && state.deleteList.length === 0)
				state.selectMode = true;
			if (!state.deleteList.includes(action.payload))
				state.deleteList.push(action.payload);
		},
		deleteFromDeleteList: (state, action: PayloadAction<number>) => {
			state.deleteList = state.deleteList.filter((id) => id !== action.payload);
			if (state.selectMode && state.deleteList.length === 0)
				state.selectMode = false;
		},
		cleanDeleteList: (state) => {
			state.deleteList = [];
			if (state.selectMode) state.selectMode = false;
		}
	}
});

export const {addToDeleteList, deleteFromDeleteList, cleanDeleteList} =
	expenseSlice.actions;

export const getTotalDeleteListAmount = (state: RootState): number =>
	state.expense.deleteList.reduce((total, id) => {
		const expense = state.expense.expenses.find((expense) => expense.id === id);
		if (expense) return total + expense.amount;
		else return total;
	}, 0);

export const onPressExpenseRow =
	(
		selectMode: boolean,
		onList: boolean,
		id: number,
		type: OnPressType,
		goExpenseDetail?: () => void
	) =>
	(dispatch: AppDispatch) => {
		if (selectMode) {
			if (onList) dispatch(deleteFromDeleteList(id));
			else dispatch(addToDeleteList(id));
		} else {
			if (type === OnPressType.Long) dispatch(addToDeleteList(id));
			else if (type === OnPressType.Normal) {
				goExpenseDetail && goExpenseDetail();
			}
		}
	};

export default expenseSlice.reducer;
