import {createSlice} from '@reduxjs/toolkit';
import {OnPressType} from '../../enums';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {AppDispatch} from '../../store';
import type {PlaceState} from '../../types/slices';
import type {PlaceProps} from '../../types/components';

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

const initialState: PlaceState = {
	selectMode: false,
	deleteList: [],
	places: []
};

export const placeSlice = createSlice({
	name: 'place',
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
		setPlaces: (state, action: PayloadAction<PlaceProps[]>) => {
			state.places = action.payload;
		},
		addPlace: (state, action: PayloadAction<PlaceProps>) => {
			state.places.push(action.payload);
		},
		updatePlace: (state, action: PayloadAction<PlaceProps>) => {
			state.places = state.places.map((place) =>
				place.id === action.payload.id ? action.payload : place
			);
		},
		deletePlace: (state) => {
			state.places = state.places.filter(
				(place) => !state.deleteList.includes(place.id)
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
	setPlaces,
	addPlace,
	updatePlace,
	deletePlace
} = placeSlice.actions;

export const onPressPlaceRow =
	(
		selectMode: boolean,
		onList: boolean,
		id: number,
		type: OnPressType,
		goPlaceDetail?: () => void
	) =>
	(dispatch: AppDispatch) => {
		if (selectMode) {
			if (onList) dispatch(deleteFromDeleteList(id));
			else dispatch(addToDeleteList(id));
		} else {
			if (type === OnPressType.Long) dispatch(addToDeleteList(id));
			else if (type === OnPressType.Normal) {
				goPlaceDetail && goPlaceDetail();
			}
		}
	};

export default placeSlice.reducer;
