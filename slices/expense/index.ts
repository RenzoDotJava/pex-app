import type {RootState} from "../../store";
import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

export type ExpenseState = {
	selectMode: boolean;
	deleteList: number[];
};

const initialState: ExpenseState = {
	selectMode: false,
	deleteList: []
};

export const expenseSlice = createSlice({
	name: "expense",
	initialState,
	reducers: {
		setSelectMode: (state, action: PayloadAction<boolean>) => {
			if (state.selectMode !== action.payload)
				state.selectMode = action.payload;
		},
		addToDeleteList: (state, action: PayloadAction<number>) => {
			if (!state.deleteList.includes(action.payload))
				state.deleteList.push(action.payload);
		},
		deleteFromDeleteList: (state, action: PayloadAction<number>) => {
			state.deleteList = state.deleteList.filter((id) => id !== action.payload);
			if (state.deleteList.length === 0) state.selectMode = false;
		},
		cleanDeleteList: (state) => {
			state.deleteList = [];
		}
	}
});

export const {
	setSelectMode,
	addToDeleteList,
	deleteFromDeleteList,
	cleanDeleteList
} = expenseSlice.actions;

export const findExpenseInDeleteList = (state: RootState, id: number) => {
	return state.expense.deleteList.includes(id);
};

export default expenseSlice.reducer;
