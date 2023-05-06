import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {AppDispatch, RootState} from '../../store';
import type {CostCenterState} from '../../types/slices';
import {OnPressType} from '../../enums';

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

const initialState: CostCenterState = {
	selectMode: false,
	deleteList: [],
	costsCenter: list
};

export const costCenterSlice = createSlice({
	name: 'costCenter',
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
	costCenterSlice.actions;

export const onPressCostCenterRow =
	(
		selectMode: boolean,
		onList: boolean,
		id: number,
		type: OnPressType,
		goCostCenterDetail?: () => void
	) =>
	(dispatch: AppDispatch) => {
		if (selectMode) {
			if (onList) dispatch(deleteFromDeleteList(id));
			else dispatch(addToDeleteList(id));
		} else {
			if (type === OnPressType.Long) dispatch(addToDeleteList(id));
			else if (type === OnPressType.Normal) {
				goCostCenterDetail && goCostCenterDetail();
			}
		}
	};

export default costCenterSlice.reducer;
