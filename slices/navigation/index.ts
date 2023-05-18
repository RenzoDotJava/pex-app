import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {AppDispatch, RootState} from '../../store';
import type {NavigationState} from '../../types/slices';

const initialState: NavigationState = {
	isAuthenticated: false,
	isLoading: false
};

export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload;
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		}
	}
});

export const {setIsAuthenticated, setIsLoading} = navigationSlice.actions;

export default navigationSlice.reducer;
