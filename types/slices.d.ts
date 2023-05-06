import type {CategoryProps, CostCenterProps, ExpenseProps, PaymentMethodProps} from './components';
import {PlaceProps} from './components';

type DeleteListProps = {
	selectMode: boolean;
	deleteList: number[];
};

type ExpenseState = DeleteListProps & {
	expenses: ExpenseProps[];
};

type CostCenterState = DeleteListProps & {
	costsCenter: CostCenterProps[];
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

export {ExpenseState, CostCenterState, CategoryState, PaymentMethodState, PlaceState};
