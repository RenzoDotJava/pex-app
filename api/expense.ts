import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { MutationProps, QueryProps } from '../types/api';
import { ExpenseFormInputs } from '../types/components';

const getExpenses = async (startDate?: string, endDate?: string, onlyMajor: boolean = false) => {
	const { data } = await supabase.auth.getUser();

	if (!data.user) throw new Error('Usuario no encontrado');

	let majorArray = []; //TODO: change this way to filter major expense ASAP UWU

	if (onlyMajor) majorArray = [true]
	else majorArray = [true, false]

	const { data: expenses, error } = await supabase
		.from('expense')
		.select(
			'id, amount, date, remark, major, expense_center (id, name), category (id, name), payment_method (id, name), place (id, name)'
		)
		.in('major', majorArray)
		.gte('date', startDate)
		.lte('date', endDate)
		.eq('active', true)
		.order('date', { ascending: true });

	if (error) throw new Error(error.message); //TODO: parse error

	return expenses;
};

const getExpensesBetweenDates = async ({ startDate, endDate, onlyMajor = false }: { startDate: string, endDate: string, onlyMajor: boolean }) => {
	const { data } = await supabase.auth.getUser();

	if (!data.user) throw new Error('Usuario no encontrado');

	let majorArray = []; //TODO: change this way to filter major expense ASAP UWU

	if (onlyMajor) majorArray = [true]
	else majorArray = [true, false]

	const { data: expenses, error } = await supabase
		.from('expense')
		.select(
			'id, amount, date, remark, major, expense_center (id, name), category (id, name), payment_method (id, name), place (id, name)'
		)
		.in('major', majorArray)
		.gte('date', startDate)
		.lte('date', endDate)
		.eq('active', true)
		.order('date', { ascending: true });

	if (error) throw new Error(error.message); //TODO: parse error

	return expenses;
}

const addExpense = async ({
	amount,
	categoryId,
	expenseCenterId,
	paymentMethodId,
	placeId,
	date,
	remark,
	major
}: ExpenseFormInputs) => {
	const { data: userData } = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const { data: expense, error } = await supabase
		.from('expense')
		.insert([
			{
				amount,
				date,
				category_id: categoryId,
				expense_center_id: expenseCenterId,
				payment_method_id: paymentMethodId,
				place_id: placeId,
				user_id: userData.user.id,
				remark: remark.trim(),
				major
			}
		])
		.select(
			'id, amount, date, remark, major, expense_center (id, name), category (id, name), payment_method (id, name), place (id, name)'
		);

	if (error) throw new Error(error.message);

	return expense[0];
};

const updateExpense = async ({
	id,
	amount,
	categoryId,
	expenseCenterId,
	paymentMethodId,
	placeId,
	date,
	remark,
	major
}: ExpenseFormInputs) => {
	const { data: userData } = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const { data: expense, error } = await supabase
		.from('expense')
		.update({
			amount,
			date,
			major,
			category_id: categoryId,
			expense_center_id: expenseCenterId,
			payment_method_id: paymentMethodId,
			place_id: placeId,
			remark: remark.trim()
		})
		.eq('id', id)
		.select(
			'id, amount, date, remark, major, expense_center (id, name), category (id, name), payment_method (id, name), place (id, name)'
		);

	if (error) throw new Error(error.message);

	return expense[0];
};

const deleteExpenses = async (deleteList: number[]) => {
	const { data: userData } = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const { data: expenses, error } = await supabase
		.from('expense')
		.update({ active: false })
		.in('id', deleteList)
		.select('id');

	if (error) throw new Error(error.message);

	return expenses;
};

export const useGetExpenses = ({
	startDate,
	endDate,
	onlyMajor,
	onSuccess,
	onError,
	select
}: QueryProps) => {
	const getExpensesQuery = useQuery({
		queryKey: ['expense', startDate, endDate, onlyMajor],
		queryFn: () => getExpenses(startDate, endDate, onlyMajor),
		onSuccess,
		onError,
		select,
	});

	return getExpensesQuery;
};

export const useGetExpensesBetweenDates = ({
	onSuccess,
	onError,
}: MutationProps<{ startDate: string, endDate: string }>) => {
	const getExpensesQuery = useMutation({
		mutationKey: ['get_expense_between_dates'],
		mutationFn: getExpensesBetweenDates,
		onSuccess,
		onError
	});

	return getExpensesQuery;
}

export const useAddExpense = ({
	onSuccess,
	onError
}: MutationProps<ExpenseFormInputs>) => {
	const addExpenseQuery = useMutation({
		mutationKey: ['add_expense'],
		mutationFn: addExpense,
		onSuccess,
		onError
	});

	return addExpenseQuery;
};

export const useUpdateExpense = ({
	onSuccess,
	onError
}: MutationProps<ExpenseFormInputs>) => {
	const updateExpenseQuery = useMutation({
		mutationKey: ['update_expense'],
		mutationFn: updateExpense,
		onSuccess,
		onError
	});

	return updateExpenseQuery;
};

export const useDeleteExpenses = ({
	onSuccess,
	onError
}: MutationProps<number[]>) => {
	const deleteExpensesQuery = useMutation({
		mutationKey: ['delete_expenses'],
		mutationFn: deleteExpenses,
		onSuccess,
		onError
	});

	return deleteExpensesQuery;
};
