import {NavigatorScreenParams} from '@react-navigation/native';
import type {
	CategoryProps,
	CostCenterProps,
	ExpenseProps,
	PaymentMethodProps,
	PlaceProps
} from './components';

type RootStackParamList = {
	Login: undefined;
	Sidebar: NavigatorScreenParams<SidebarDrawerParamList>;
};

type SidebarDrawerParamList = {
	ExpenseNav: NavigatorScreenParams<ExpenseParamList>;
	ConfigNav: NavigatorScreenParams<ConfigParamList>;
};

type ExpenseParamList = {
	Expenses: undefined;
	AddExpense: undefined;
	EditExpense: ExpenseProps;
};

type CostCenterParamList = {
	CostCenter: undefined;
	AddCostCenter: undefined;
	EditCostCenter: CostCenterProps;
};

type CategoryParamList = {
	Category: undefined;
	AddCategory: undefined;
	EditCategory: CategoryProps;
};

type PaymentMethodParamList = {
	PaymentMethod: undefined;
	AddPaymentMethod: undefined;
	EditPaymentMethod: PaymentMethodProps;
};

type PlaceParamList = {
	Place: undefined;
	AddPlace: undefined;
	EditPlace: PlaceProps;
};

type ConfigParamList = {
	Config: undefined;
	CostCenterNav: NavigatorScreenParams<CostCenterParamList>;
	CategoryNav: NavigatorScreenParams<CategoryParamList>;
	PaymentMethodNav: NavigatorScreenParams<PaymentMethodParamList>;
	PlaceNav: NavigatorScreenParams<PlaceParamList>;
};

export {
	RootStackParamList,
	SidebarDrawerParamList,
	ExpenseParamList,
	CostCenterParamList,
	CategoryParamList,
	ConfigParamList,
	PaymentMethodParamList,
	PlaceParamList
};
