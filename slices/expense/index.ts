import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment-timezone';
import { OnPressType } from '../../enums';
import { ExpenseProps } from '../../types/components';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../../store';
import type { ExpenseState } from '../../types/slices';
import { getCurrentDateToString, getDate, padNumber } from '../../utils';

type ExpensesByDateAccumulator = { [date: string]: ExpenseProps[] };

const groupExpensesByDate = (expenses: ExpenseProps[]) => {
	const expensesByDate = expenses.reduce((acc: ExpensesByDateAccumulator, expense) => {
		const date = expense.date;

		if (date) {
			if (!acc[date]) acc[date] = [];
			acc[date].push(expense);
		}

		return acc;
	}, {});

	return Object.entries(expensesByDate).map(([date, expenses]) => ({
		title: date,
		data: expenses,
	}));
}

const addExpenseMonthly = (expense: ExpenseProps, expensesByDateArray: { title: string, data: ExpenseProps[] }[]) => {
	const index = expensesByDateArray.findIndex(entry => entry.title === expense.date);
	if (index !== -1) {
		expensesByDateArray[index].data.push(expense);
	} else {
		// Insert new date entry in sorted order
		let insertIndex = 0;
		while (insertIndex < expensesByDateArray.length && moment(expensesByDateArray[insertIndex].title).isBefore(expense.date)) insertIndex++;
		expensesByDateArray.splice(insertIndex, 0, { title: expense.date, data: [expense] });
	}
}

const replaceExpense = (updatedExpense: ExpenseProps, expensesByDateArray: { title: string, data: ExpenseProps[] }[]) => {
	const index = expensesByDateArray.findIndex(entry => entry.data.some(expense => expense.id === updatedExpense.id));
	if (index !== -1) {
		const expenseIndex = expensesByDateArray[index].data.findIndex(expense => expense.id === updatedExpense.id);
		const currentDate = expensesByDateArray[index].title;
		if (expenseIndex !== -1) {
			if (currentDate === updatedExpense.date) {
				expensesByDateArray[index].data[expenseIndex] = updatedExpense;
			} else {
				// Remove expense from current date's array
				expensesByDateArray[index].data.splice(expenseIndex, 1);
				if (expensesByDateArray[index].data.length === 0) {
					expensesByDateArray.splice(index, 1);
				}
				// Add or create new date's array
				addExpenseMonthly(updatedExpense, expensesByDateArray)
			}
		}
	}
}

const initialState: ExpenseState = {
	selectMode: false,
	deleteList: [],
	expenses: [],
	expensesMonthly: [],
	date: getCurrentDateToString(),
	month: new Date().getMonth() + 1,
	yearMonth: new Date().getFullYear(),
	year: new Date().getFullYear(),
	mode: 'daily',
	startDate: getCurrentDateToString(),
	endDate: getCurrentDateToString(),
	onlyMajor: false,
	expenseType: 'both'
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
			if (state.mode === "daily") {
				state.expensesMonthly = []
			} else {
				state.expensesMonthly = groupExpensesByDate(action.payload)
			}
			state.expenses = action.payload;
		},
		addExpense: (state, action: PayloadAction<ExpenseProps>) => {
			let isOnDate = state.mode === 'daily' && state.date === action.payload.date || state.mode === 'monthly' && moment(getDate(action.payload.date)).month() + 1 === state.month && moment(getDate(action.payload.date)).year() === state.yearMonth || state.mode === 'yearly' && moment(getDate(action.payload.date)).year() === state.year

			if (isOnDate && (!state.onlyMajor || (state.onlyMajor && action.payload.major))) {
				state.expenses.push(action.payload);
				if (state.mode === 'monthly') addExpenseMonthly(action.payload, state.expensesMonthly)
			}
		},
		updateExpense: (state, action: PayloadAction<ExpenseProps>) => {
			let isOnDate = state.mode === 'daily' && state.date === action.payload.date || state.mode === 'monthly' && moment(getDate(action.payload.date)).month() + 1 === state.month && moment(getDate(action.payload.date)).year() === state.yearMonth || state.mode === 'yearly' && moment(getDate(action.payload.date)).year() === state.year

			if (isOnDate && (!state.onlyMajor || (state.onlyMajor && action.payload.major))) {
				state.expenses = state.expenses.map((expense) =>
					expense.id === action.payload.id ? action.payload : expense
				);
				if (state.mode === 'monthly') replaceExpense(action.payload, state.expensesMonthly)
			}
			else {
				state.expenses = state.expenses.filter(
					(expense) => expense.id !== action.payload.id
				);
				if (state.mode === "monthly") state.expensesMonthly = groupExpensesByDate(state.expenses)
			}
		},
		deleteExpenses: (state) => {
			state.expenses = state.expenses.filter(
				(expense) => !state.deleteList.includes(expense.id)
			);

			if (state.mode === "monthly") state.expensesMonthly = groupExpensesByDate(state.expenses)

			if (state.selectMode) state.selectMode = false;
			state.deleteList = [];
		},
		addDate: (state) => {
			if (state.mode === 'daily') {
				state.date = moment(getDate(state.date)).add(1, 'days').format('YYYY-MM-DD');
				state.startDate = state.date;
				state.endDate = state.date;
			} else if (state.mode === 'monthly') {
				if (state.month === 12) {
					state.yearMonth = state.yearMonth + 1
					state.month = 1
				} else
					state.month = state.month + 1

				let daysInMonth = moment(state.yearMonth + "-" + state.month, "YYYY-MM").daysInMonth()
				let auxStartDate = `${state.yearMonth}-${padNumber(state.month, 2)}-01`
				let auxEndDate = `${state.yearMonth}-${padNumber(state.month, 2)}-${daysInMonth}`

				state.startDate = moment(getDate(auxStartDate)).format('YYYY-MM-DD');
				state.endDate = moment(getDate(auxEndDate)).format('YYYY-MM-DD');
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
				if (state.month === 1) {
					state.yearMonth = state.yearMonth - 1
					state.month = 12
				} else
					state.month = state.month - 1

				let daysInMonth = moment(state.yearMonth + "-" + state.month, "YYYY-MM").daysInMonth()
				let auxStartDate = `${state.yearMonth}-${padNumber(state.month, 2)}-01`
				let auxEndDate = `${state.yearMonth}-${padNumber(state.month, 2)}-${daysInMonth}`

				state.startDate = moment(getDate(auxStartDate)).format('YYYY-MM-DD');
				state.endDate = moment(getDate(auxEndDate)).format('YYYY-MM-DD');

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

			//set start date and end date
			if (state.mode === 'daily') {
				state.startDate = state.date;
				state.endDate = state.date;
			} else if (state.mode === 'monthly') {
				let daysInMonth = moment(state.yearMonth + "-" + state.month, "YYYY-MM").daysInMonth()
				let auxStartDate = `${state.yearMonth}-${padNumber(state.month, 2)}-01`
				let auxEndDate = `${state.yearMonth}-${padNumber(state.month, 2)}-${daysInMonth}`

				state.startDate = moment(getDate(auxStartDate)).format('YYYY-MM-DD');
				state.endDate = moment(getDate(auxEndDate)).format('YYYY-MM-DD');
			} //TODO: missing yearly condition
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
		},
		setOnlyMajor: (state, action: PayloadAction<boolean>) => {
			state.onlyMajor = action.payload;
		},
		setExpenseType: (state, action: PayloadAction<'both' | 'minor' | 'major'>) => {
			state.expenseType = action.payload;
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
	setYearMonth,
	setOnlyMajor,
	setExpenseType
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
