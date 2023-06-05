import {createSlice} from '@reduxjs/toolkit';
import {OnPressType} from '../../enums';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {AppDispatch} from '../../store';
import type {CategoryState} from '../../types/slices';
import type {CategoryProps} from '../../types/components';

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
	categories: []
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
		},
		setCategories: (state, action: PayloadAction<CategoryProps[]>) => {
			state.categories = action.payload;
		},
		addCategory: (state, action: PayloadAction<CategoryProps>) => {
			state.categories.push(action.payload);
		},
		updateCategory: (state, action: PayloadAction<CategoryProps>) => {
			state.categories = state.categories.map((category) =>
				category.id === action.payload.id ? action.payload : category
			);
		},
		deleteCategories: (state) => {
			state.categories = state.categories.filter(
				(category) => !state.deleteList.includes(category.id)
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
	setCategories,
	addCategory,
	updateCategory,
	deleteCategories
} = categorySlice.actions;

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
