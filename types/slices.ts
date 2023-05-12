import type {
	CategoryProps,
	ExpenseCenterProps,
	ExpenseProps,
	PaymentMethodProps
} from './components';
import {PlaceProps} from './components';

type DeleteListProps = {
	selectMode: boolean;
	deleteList: number[];
};

type ExpenseState = DeleteListProps & {
	expenses: ExpenseProps[];
};

type ExpenseCenterState = DeleteListProps & {
	expenseCenters: ExpenseCenterProps[];
};

type CategoryState = DeleteListProps & {
	categories: CategoryProps[];
};

type PaymentMethodState = DeleteListProps & {
	paymentMethods: PaymentMethodProps[];
};

type PlaceState = DeleteListProps & {
	places: PlaceProps[];
};

type NavigationState = {
	isAuthenticated: boolean;
};

export {
	ExpenseState,
	ExpenseCenterState,
	CategoryState,
	PaymentMethodState,
	PlaceState,
	NavigationState
};