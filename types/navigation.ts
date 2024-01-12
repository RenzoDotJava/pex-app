import { NavigatorScreenParams } from '@react-navigation/native';
import type {
	CategoryProps,
	ExpenseCenterProps,
	ExpenseProps,
	PaymentMethodProps,
	PlaceProps
} from './components';

type RootStackParamList = {
	Login: undefined;
	SignUp: undefined;
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
	ConfigExpense: undefined;
};

type ExpenseCenterParamList = {
	ExpenseCenter: undefined;
	AddExpenseCenter: undefined;
	EditExpenseCenter: ExpenseCenterProps;
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
	ExpenseCenterNav: NavigatorScreenParams<ExpenseCenterParamList>;
	CategoryNav: NavigatorScreenParams<CategoryParamList>;
	PaymentMethodNav: NavigatorScreenParams<PaymentMethodParamList>;
	PlaceNav: NavigatorScreenParams<PlaceParamList>;
	Languages: undefined;
	Currencies: undefined;
};

export {
	RootStackParamList,
	SidebarDrawerParamList,
	ExpenseParamList,
	ExpenseCenterParamList,
	CategoryParamList,
	ConfigParamList,
	PaymentMethodParamList,
	PlaceParamList
};
