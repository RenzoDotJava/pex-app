import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {AppDispatch, RootState} from '../../store';
import type {ExpenseState} from '../../types/slices';
import {OnPressType} from '../../enums';

const list = [
	{
		id: 1,
		costCenter: 'Micaela',
		category: 'Salud',
		place: 'San Judas Mateo',
		paymentMethod: 'Crédito',
		amount: 100
	},
	{
		id: 2,
		costCenter: 'Renzo',
		category: 'Alimentación',
		place: 'Quiosco',
		paymentMethod: 'Efectivo',
		amount: 0.8
	},
	{
		id: 3,
		costCenter: 'Valezka',
		category: 'Ropa',
		place: 'H&M',
		paymentMethod: 'Débito',
		amount: 200
	},
	{
		id: 4,
		costCenter: 'Valezka',
		category: 'Ropa',
		place: 'H&M',
		paymentMethod: 'Débito',
		amount: 200
	},
	{
		id: 5,
		costCenter: 'Valezka',
		category: 'Ropa',
		place: 'H&M',
		paymentMethod: 'Débito',
		amount: 200
	},
	{
		id: 6,
		costCenter: 'Valezka',
		category: 'Ropa',
		place: 'H&M',
		paymentMethod: 'Débito',
		amount: 200
	},
	{
		id: 7,
		costCenter: 'Valezka',
		category: 'Ropa',
		place: 'H&M',
		paymentMethod: 'Débito',
		amount: 200
	},
	{
		id: 8,
		costCenter: 'Valezka',
		category: 'Ropa',
		place: 'H&M',
		paymentMethod: 'Débito',
		amount: 200
	},
	{
		id: 9,
		costCenter: 'Valezka',
		category: 'Ropa',
		place: 'H&M',
		paymentMethod: 'Débito',
		amount: 200
	},
	{
		id: 10,
		costCenter: 'Valezka',
		category: 'Ropa',
		place: 'H&M',
		paymentMethod: 'Débito',
		amount: 200
	},
	{
		id: 11,
		costCenter: 'Valezka',
		category: 'Ropa',
		place: 'H&M',
		paymentMethod: 'Débito',
		amount: 200
	}
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
	(selectMode: boolean, onList: boolean, id: number, type: OnPressType) =>
	(dispatch: AppDispatch) => {
		if (selectMode) {
			if (onList) dispatch(deleteFromDeleteList(id));
			else dispatch(addToDeleteList(id));
		} else {
			if (type === OnPressType.Long) dispatch(addToDeleteList(id));
			else if (type === OnPressType.Normal) {
				//TODO: navigate to expense detail
				//navigation.navigate("ExpenseDetail", {id});
			}
		}
	};

export default expenseSlice.reducer;
