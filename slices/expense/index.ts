import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment-timezone';
import { OnPressType } from '../../enums';
import { ExpenseProps } from '../../types/components';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../../store';
import type { ExpenseState } from '../../types/slices';
import { getCurrentDateToString, getDate, padNumber } from '../../utils';

const initialState: ExpenseState = {
	selectMode: false,
	deleteList: [],
	expenses: [],
	date: getCurrentDateToString(),
	month: new Date().getMonth() + 1,
	yearMonth: new Date().getFullYear(),
	year: new Date().getFullYear(),
	mode: 'daily',
	startDate: getCurrentDateToString(),
	endDate: getCurrentDateToString()
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
			if (state.mode === 'daily') {
				state.date = moment(state.date).add(1, 'days').format('YYYY-MM-DD');
				state.startDate = state.date;
				state.endDate = state.date;
			} else if (state.mode === 'monthly') {
				let daysInMonth = moment(state.yearMonth + "-" + state.month, "YYYY-MM").daysInMonth()
				let auxStartDate = `${state.yearMonth}-${padNumber(state.month, 2)}-01`
				let auxEndDate = `${state.yearMonth}-${padNumber(state.month, 2)}-${daysInMonth}`

				state.startDate = moment(auxStartDate).add(1, 'months').format('YYYY-MM-DD');
				state.endDate = moment(auxEndDate).add(1, 'months').format('YYYY-MM-DD');

				state.month = moment(state.endDate).month() + 1;
				state.yearMonth = moment(state.endDate).year();
			} else if (state.mode === 'yearly') {
				let auxStartDate = `${state.year}-01-01`
				let auxEndDate = `${state.year}-12-31`

				state.startDate = moment(auxStartDate).add(1, 'years').format('YYYY-MM-DD');
				state.endDate = moment(auxEndDate).add(1, 'years').format('YYYY-MM-DD');
				state.year = moment(state.endDate).year();
			}
		},
		subtractDate: (state) => {
			if (state.mode === 'daily') {
				state.date = moment(state.date).subtract(1, 'days').format('YYYY-MM-DD');
				state.startDate = state.date;
				state.endDate = state.date;
			} else if (state.mode === 'monthly') {
				let daysInMonth = moment(state.yearMonth + "-" + state.month, "YYYY-MM").daysInMonth()
				let auxStartDate = `${state.yearMonth}-${padNumber(state.month, 2)}-01`
				let auxEndDate = `${state.yearMonth}-${padNumber(state.month, 2)}-${daysInMonth}`

				state.startDate = moment(auxStartDate).subtract(1, 'months').format('YYYY-MM-DD');
				state.endDate = moment(auxEndDate).subtract(1, 'months').format('YYYY-MM-DD');
				state.month = moment(state.endDate).month() + 1;
				state.yearMonth = moment(state.endDate).year();
			} else if (state.mode === 'yearly') {
				let auxStartDate = `${state.year}-01-01`
				let auxEndDate = `${state.year}-12-31`

				state.startDate = moment(auxStartDate).subtract(1, 'years').format('YYYY-MM-DD');
				state.endDate = moment(auxEndDate).subtract(1, 'years').format('YYYY-MM-DD');
				state.year = moment(state.endDate).year();
			}
		},
		setMode: (state, action: PayloadAction<'daily' | 'monthly' | 'yearly'>) => {
			state.mode = action.payload;
		},
		setMonth: (state, action: PayloadAction<number>) => {
			state.month = action.payload;
		},
		setYearMonth: (state, action: PayloadAction<number>) => {
			state.yearMonth = action.payload;
		},
		setYear: (state, action: PayloadAction<number>) => {
			state.year = action.payload;
		},
		setDate: (state, action: PayloadAction<string>) => {
			state.date = action.payload;
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
	deleteExpenses,
	setMode,
	setMonth,
	setYear,
	setDate,
	setYearMonth
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
