import {NavigatorScreenParams} from "@react-navigation/native";

type RootStackParamList = {
	Login: undefined;
	Sidebar: NavigatorScreenParams<SidebarDrawerParamList>;
};

type SidebarDrawerParamList = {
	Expense: undefined;
	Category: undefined;
};

export {RootStackParamList, SidebarDrawerParamList};
