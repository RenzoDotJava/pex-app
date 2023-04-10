import {AnyAction} from "@reduxjs/toolkit";
import {OnPressType} from "../enums";

type ExpenseProps = {
	id: number;
	costCenter: string;
	category: string;
	place: string;
	paymentMethod: string;
	amount: number;
}

type ExpenseRowProps = ExpenseProps & {
	selectMode: boolean;
	onList: boolean;
	backgroundColor: string;
	onPress: () => void;
	onLongPress: () => void;
};

export {ExpenseProps, ExpenseRowProps};
