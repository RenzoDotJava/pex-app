import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {AppDispatch, RootState} from '../../store';
import type {NavigationState} from '../../types/slices';

const initialState: NavigationState = {
	isAuthenticated: false
};

export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload;
		}
	}
});

export const {setIsAuthenticated} = navigationSlice.actions;

export default navigationSlice.reducer;
