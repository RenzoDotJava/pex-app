import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment-timezone';
import {OnPressType} from '../../enums';
import {ExpenseProps} from '../../types/components';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {AppDispatch, RootState} from '../../store';
import type {ExpenseState} from '../../types/slices';

const initialState: ExpenseState = {
	selectMode: false,
	deleteList: [],
	expenses: [],
	date: moment(new Date()).format('YYYY-MM-DD')
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
		},
		setExpenses: (state, action: PayloadAction<ExpenseProps[]>) => {
			state.expenses = action.payload;
		},
		addExpense: (state, action: PayloadAction<ExpenseProps>) => {
			if (state.date === action.payload.date)
				state.expenses.push(action.payload);
		},
		updateExpense: (state, action: PayloadAction<ExpenseProps>) => {
			if (state.date === action.payload.date)
				state.expenses = state.expenses.map((expense) =>
					expense.id === action.payload.id ? action.payload : expense
				);
			else
				state.expenses = state.expenses.filter(
					(expense) => expense.id !== action.payload.id
				);
		},
		deleteExpenses: (state) => {
			state.expenses = state.expenses.filter(
				(expense) => !state.deleteList.includes(expense.id)
			);
			if (state.selectMode) state.selectMode = false;
			state.deleteList = [];
		},
		addDate: (state) => {
			state.date = moment(state.date).add(1, 'days').format('YYYY-MM-DD');
		},
		subtractDate: (state) => {
			state.date = moment(state.date).subtract(1, 'days').format('YYYY-MM-DD');
		}
	}
});

export const {
	addToDeleteList,
	deleteFromDeleteList,
	cleanDeleteList,
	setExpenses,
	addDate,
	subtractDate,
	addExpense,
	updateExpense,
	deleteExpenses
} = expenseSlice.actions;

export const getTotalDeleteListAmount = (state: RootState): number =>
	state.expense.deleteList.reduce((total, id) => {
		const expense = state.expense.expenses.find((expense) => expense.id === id);
		if (expense) return total + expense.amount;
		else return total;
	}, 0);

export const getTotalAmountByDate = (state: RootState): number =>
	state.expense.expenses.reduce((total, expense) => {
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
