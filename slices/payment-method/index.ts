import {createSlice} from '@reduxjs/toolkit';
import {OnPressType} from '../../enums';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {AppDispatch} from '../../store';
import type {PaymentMethodState} from '../../types/slices';

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

const initialState: PaymentMethodState = {
	selectMode: false,
	deleteList: [],
	paymentMethods: list
};

export const paymentMethodSlice = createSlice({
	name: 'paymentMethod',
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
	paymentMethodSlice.actions;

export const onPressCategoryRow =
	(
		selectMode: boolean,
		onList: boolean,
		id: number,
		type: OnPressType,
		goPaymentMethodDetail?: () => void
	) =>
	(dispatch: AppDispatch) => {
		if (selectMode) {
			if (onList) dispatch(deleteFromDeleteList(id));
			else dispatch(addToDeleteList(id));
		} else {
			if (type === OnPressType.Long) dispatch(addToDeleteList(id));
			else if (type === OnPressType.Normal) {
				goPaymentMethodDetail && goPaymentMethodDetail();
			}
		}
	};

export default paymentMethodSlice.reducer;
