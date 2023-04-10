import {ExpenseProps} from "./components";

type ExpenseState = {
	selectMode: boolean;
	deleteList: number[];
	expenses: ExpenseProps[];
};

export {ExpenseState}