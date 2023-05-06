import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import expenseReducer from './slices/expense';
import costCenterReducer from './slices/cost-center';
import categoryReducer from './slices/category';
import placeReducer from './slices/place';
import paymentMethodReducer from './slices/payment-method';

export const store = configureStore({
	reducer: {
		expense: expenseReducer,
		costCenter: costCenterReducer,
		category: categoryReducer,
		paymentMethod: paymentMethodReducer,
		place: placeReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
