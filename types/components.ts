import {GeneralReq} from './api';

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
	expenseCenterId: number;
	categoryId: number;
	placeId: number;
	paymentMethodId: number;
	amount: number;
	date?: string;
};

type ExpenseProps = {
	expenseCenter: string;
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

type ExpenseCenterProps = {
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

type LanguageProps = {
	id: number;
	name: string;
	code: string;
};

type CurrencyProps = {
	id: number;
	name: string;
	code: string;
};

type ExpenseCenterFormProps = {
	expenseCenter?: ExpenseCenterProps;
	action?: (req: GeneralReq) => void;
	isLoading?: boolean;
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
	isSelected?: boolean;
};

type ExpenseRowProps = ExpenseProps & RowProps;

type SignInFormInputs = {
	email: string;
	password: string;
};

type SignUpFormInputs = SignInFormInputs & {
	confirmPassword: string;
};

type NavigatorWrapperProps = {
	children: React.ReactNode;
	onLayout?: () => void;
};

type ListWrapperProps = {
	children: React.ReactNode;
	onPressAdd?: () => void;
};

export {
	ExpenseProps,
	ExpenseRowProps,
	ExpenseFormInputs,
	ExpenseFormProps,
	ExpenseCenterProps,
	LanguageProps,
	ExpenseCenterFormProps,
	FormInputs,
	ListRowProps,
	CategoryProps,
	PaymentMethodProps,
	PlaceProps,
	CategoryFormProps,
	PaymentMethodFormProps,
	PlaceFormProps,
	SignUpFormInputs,
	SignInFormInputs,
	NavigatorWrapperProps,
	ListWrapperProps,
	CurrencyProps
};
