import {AnyAction} from '@reduxjs/toolkit';
import {Control} from 'react-hook-form';
import {OnPressType} from '../enums';

type ExpenseFormInputs = {
	costCenter: string;
	category: string;
	place: string;
	paymentMethod: string;
	amount: number;
	date?: string;
};

type ExpenseProps = ExpenseFormInputs & {
	id: number;
};

type ExpenseRowProps = ExpenseProps & {
	selectMode: boolean;
	onList: boolean;
	backgroundColor: string;
	onPress: () => void;
	onLongPress: () => void;
};

export {ExpenseProps, ExpenseRowProps, ExpenseFormInputs};
