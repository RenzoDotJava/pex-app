import {createSlice} from '@reduxjs/toolkit';
import {OnPressType} from '../../enums';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {AppDispatch} from '../../store';
import type {CategoryState} from '../../types/slices';

const list = [
	{
		id: 1,
		name: 'Micaela'
	},
	{
		id: 2,
		name: 'Renzo'
	},
	{
		id: 3,
		name: 'Valezka'
	}
];

const initialState: CategoryState = {
	selectMode: false,
	deleteList: [],
	categories: list
};

export const categorySlice = createSlice({
	name: 'category',
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
	categorySlice.actions;

export const onPressCategoryRow =
	(
		selectMode: boolean,
		onList: boolean,
		id: number,
		type: OnPressType,
		goCategoryDetail?: () => void
	) =>
	(dispatch: AppDispatch) => {
		if (selectMode) {
			if (onList) dispatch(deleteFromDeleteList(id));
			else dispatch(addToDeleteList(id));
		} else {
			if (type === OnPressType.Long) dispatch(addToDeleteList(id));
			else if (type === OnPressType.Normal) {
				goCategoryDetail && goCategoryDetail();
			}
		}
	};

export default categorySlice.reducer;
