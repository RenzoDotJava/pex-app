import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import expenseReducer from './slices/expense';
import expenseCenterReducer from './slices/expense-center';
import categoryReducer from './slices/category';
import placeReducer from './slices/place';
import paymentMethodReducer from './slices/payment-method';
import navigationReducer from './slices/navigation';

export const store = configureStore({
	reducer: {
		expense: expenseReducer,
		expenseCenter: expenseCenterReducer,
		category: categoryReducer,
		paymentMethod: paymentMethodReducer,
		place: placeReducer,
		navigation: navigationReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
