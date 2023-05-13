import {createSlice} from '@reduxjs/toolkit';
import {OnPressType} from '../../enums';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {AppDispatch, RootState} from '../../store';
import type {ExpenseCenterState} from '../../types/slices';
import type {ExpenseCenterProps} from '../../types/components';

const initialState: ExpenseCenterState = {
	selectMode: false,
	deleteList: [],
	expenseCenters: []
};

export const expenseCenterSlice = createSlice({
	name: 'expenseCenter',
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
		setExpenseCenters: (state, action: PayloadAction<ExpenseCenterProps[]>) => {
			state.expenseCenters = action.payload;
		},
		addExpenseCenter: (state, action: PayloadAction<ExpenseCenterProps>) => {
			state.expenseCenters.push(action.payload);
		},
		updateExpenseCenter: (state, action: PayloadAction<ExpenseCenterProps>) => {
			state.expenseCenters = state.expenseCenters.map((expenseCenter) =>
				expenseCenter.id === action.payload.id ? action.payload : expenseCenter
			);
		},
		deleteExpenseCenters: (state) => {
			state.expenseCenters = state.expenseCenters.filter(
				(expenseCenter) => !state.deleteList.includes(expenseCenter.id)
			);
			if (state.selectMode) state.selectMode = false;
			state.deleteList = [];
		}
	}
});

export const {
	addToDeleteList,
	deleteFromDeleteList,
	cleanDeleteList,
	setExpenseCenters,
	addExpenseCenter,
	updateExpenseCenter,
	deleteExpenseCenters
} = expenseCenterSlice.actions;

export const onPressExpenseCenterRow =
	(
		selectMode: boolean,
		onList: boolean,
		id: number,
		type: OnPressType,
		goExpenseCenterDetail?: () => void
	) =>
	(dispatch: AppDispatch) => {
		if (selectMode) {
			if (onList) dispatch(deleteFromDeleteList(id));
			else dispatch(addToDeleteList(id));
		} else {
			if (type === OnPressType.Long) dispatch(addToDeleteList(id));
			else if (type === OnPressType.Normal) {
				goExpenseCenterDetail && goExpenseCenterDetail();
			}
		}
	};

export default expenseCenterSlice.reducer;
