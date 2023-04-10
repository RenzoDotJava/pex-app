import {NavigatorScreenParams} from "@react-navigation/native";

type RootStackParamList = {
	Login: undefined;
	Sidebar: NavigatorScreenParams<SidebarDrawerParamList>;
};

type SidebarDrawerParamList = {
	Expense: NavigatorScreenParams<ExpenseParamList>;
	Category: undefined;
};

type ExpenseParamList = {
	Expenses: undefined;
	AddExpense: undefined;
	EditExpense: undefined;
}

export {RootStackParamList, SidebarDrawerParamList, ExpenseParamList};
