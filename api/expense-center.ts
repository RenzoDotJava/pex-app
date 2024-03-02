import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';
import type { MutationProps, QueryProps, GeneralReq } from '../types/api';

const getExpenseCenters = async () => {
	const { data } = await supabase.auth.getUser();

	if (!data.user) throw new Error('Usuario no encontrado');

	const { data: expenseCenters, error } = await supabase
		.from('expense_center')
		.select('id, name')
		.eq('active', true)
		.order('name', { ascending: true });

	if (error) throw new Error(error.message); //TODO: parse error

	return expenseCenters;
};

const addExpenseCenter = async ({ name }: GeneralReq) => {
	const { data: userData } = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const { data: expenseCenters, error: selectError } = await supabase
		.from('expense_center')
		.select('id, name')
		.eq('name', name.trim())
		.eq('active', true);

	if (selectError) throw new Error(selectError.message); //TODO: parse error

	if (expenseCenters.length > 0)
		throw new Error('El centro de gasto ya existe');

	const { data: expenseCenter, error } = await supabase
		.from('expense_center')
		.insert([{ name: name.trim(), user_id: userData.user.id }])
		.select('id, name');

	if (error) throw new Error(error.message);

	return expenseCenter[0];
};

const updateExpenseCenter = async ({ id, name }: GeneralReq) => {
	const { data: userData } = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const { data: expenseCenters, error: selectError } = await supabase
		.from('expense_center')
		.select('id, name')
		.eq('name', name.trim())
		.eq('active', true);

	if (selectError) throw new Error(selectError.message); //TODO: parse error

	if (expenseCenters.length > 0 && expenseCenters[0].id !== id)
		throw new Error('El centro de gasto ya existe');

	if (expenseCenters[0].id === id) return expenseCenters[0];

	const { data: expenseCenter, error } = await supabase
		.from('expense_center')
		.update({ name: name.trim() })
		.eq('id', id)
		.select('id, name');

	if (error) throw new Error(error.message);

	return expenseCenter[0];
};

const deleteExpenseCenters = async (deleteList: number[]) => {
	const { data: userData } = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const { data: expenseCenter, error } = await supabase
		.from('expense_center')
		.update({ active: false })
		.in('id', deleteList)
		.select('id, name');

	if (error) throw new Error(error.message);

	return expenseCenter;
};

export const useGetExpenseCenters = ({
	onSuccess,
	onError,
	select
}: QueryProps) => {
	const getExpenseCentersQuery = useQuery({
		queryKey: ['expense_centers'],
		queryFn: getExpenseCenters,
		onSuccess,
		onError,
		select
	});

	return getExpenseCentersQuery;
};

export const useAddExpenseCenter = ({
	onSuccess,
	onError
}: MutationProps<GeneralReq>) => {
	const addExpenseCenterQuery = useMutation({
		mutationKey: ['add_expense_center'],
		mutationFn: addExpenseCenter,
		onSuccess,
		onError
	});

	return addExpenseCenterQuery;
};

export const useUpdateExpenseCenter = ({
	onSuccess,
	onError
}: MutationProps<GeneralReq>) => {
	const updateExpenseCenterQuery = useMutation({
		mutationKey: ['update_expense_center'],
		mutationFn: updateExpenseCenter,
		onSuccess,
		onError
	});

	return updateExpenseCenterQuery;
};

export const useDeleteExpenseCenters = ({
	onSuccess,
	onError
}: MutationProps<number[]>) => {
	const deleteExpenseCentersQuery = useMutation({
		mutationKey: ['delete_expense_centers'],
		mutationFn: deleteExpenseCenters,
		onSuccess,
		onError
	});

	return deleteExpenseCentersQuery;
};
