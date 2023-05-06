import {AnyAction} from '@reduxjs/toolkit';
import {Control} from 'react-hook-form';
import {OnPressType} from '../enums';

//TODO: ver si trae id y name o luego hacer un nuevo request para traer los ids
type RowProps = {
	extraData?: Object;
	backgroundColor: string;
	onPress?: () => void;
	onLongPress?: () => void;
};

type FormInputs = {
	name: string;
};

type ExpenseFormInputs = {
	costCenterId: number;
	categoryId: number;
	placeId: number;
	paymentMethodId: number;
	amount: number;
	date?: string;
};

type ExpenseProps = {
	costCenter: string;
	category: string;
	place: string;
	paymentMethod: string;
	amount: number;
	date?: string;
	id: number;
};

type ExpenseFormProps = {
	expense?: ExpenseProps;
};

type CostCenterProps = {
	id: number;
	name: string;
};

type CategoryProps = {
	id: number;
	name: string;
};

type PaymentMethodProps = {
	id: number;
	name: string;
};

type PlaceProps = {
	id: number;
	name: string;
};

type CostCenterFormProps = {
	costCenter?: CostCenterProps;
};

type CategoryFormProps = {
	category?: CategoryProps;
};

type PaymentMethodFormProps = {
	paymentMethod?: PaymentMethodProps;
};

type PlaceFormProps = {
	place?: PlaceProps;
};

type ListRowProps = RowProps & {
	id: number;
	name: string;
};

type ExpenseRowProps = ExpenseProps & RowProps;

export {
	ExpenseProps,
	ExpenseRowProps,
	ExpenseFormInputs,
	ExpenseFormProps,
	CostCenterProps,
	CostCenterFormProps,
	FormInputs,
	ListRowProps,
	CategoryProps,
	PaymentMethodProps,
	PlaceProps,
	CategoryFormProps,
	PaymentMethodFormProps,
	PlaceFormProps
};
