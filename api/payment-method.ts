import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';
import type { MutationProps, QueryProps, PaymentMethodReq } from '../types/api';

const getPaymentMethods = async () => {
	const { data } = await supabase.auth.getUser();

	if (!data.user) throw new Error('Usuario no encontrado');

	const { data: paymentMethods, error } = await supabase
		.from('payment_method')
		.select('id, name, color')
		.eq('active', true)
		.order('name', { ascending: true });

	if (error) throw new Error(error.message); //TODO: parse error

	return paymentMethods;
};

const addPaymentMethod = async ({ name, color }: PaymentMethodReq) => {
	const { data: userData } = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const { data: paymentMethods, error: selectError } = await supabase
		.from('payment_method')
		.select('id, name, color')
		.eq('name', name.trim())
		.eq('user_id', userData.user.id)
		.eq('active', true);

	if (selectError) throw new Error(selectError.message); //TODO: parse error

	if (paymentMethods.length > 0) throw new Error('El método de pago ya existe');

	const { data: paymentMethod, error } = await supabase
		.from('payment_method')
		.insert([{ name: name.trim(), user_id: userData.user.id, color: color }])
		.select('id, name, color');

	if (error) throw new Error(error.message);

	return paymentMethod[0];
};

const updatePaymentMethod = async ({ id, name, color }: PaymentMethodReq) => {
	const { data: userData } = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const { data: paymentMethods, error: selectError } = await supabase
		.from('payment_method')
		.select('id, name')
		.eq('name', name.trim())
		.eq('user_id', userData.user.id)
		.eq('active', true);

	if (selectError) throw new Error(selectError.message); //TODO: parse error

	if (paymentMethods.length > 0 && paymentMethods[0].id !== id) throw new Error('El método de pago ya existe');

	const { data: paymentMethod, error } = await supabase
		.from('payment_method')
		.update({ name: name.trim(), color: color })
		.eq('id', id)
		.select('id, name, color');

	if (error) throw new Error(error.message);

	return paymentMethod[0];
};

const deletePaymentMethods = async (deleteList: number[]) => {
	const { data: userData } = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const { data: paymentMethods, error } = await supabase
		.from('payment_method')
		.update({ active: false })
		.in('id', deleteList)
		.select('id, name');

	if (error) throw new Error(error.message);

	return paymentMethods;
};

export const useGetPaymentMethods = ({
	onSuccess,
	onError,
	select
}: QueryProps) => {
	const getPaymentMethodsQuery = useQuery({
		queryKey: ['payment_method'],
		queryFn: getPaymentMethods,
		onSuccess,
		onError,
		select
	});

	return getPaymentMethodsQuery;
};

export const useAddPaymentMethod = ({
	onSuccess,
	onError
}: MutationProps<PaymentMethodReq>) => {
	const addPaymentMethodQuery = useMutation({
		mutationKey: ['add_payment_method'],
		mutationFn: addPaymentMethod,
		onSuccess,
		onError
	});

	return addPaymentMethodQuery;
};

export const useUpdatePaymentMethod = ({
	onSuccess,
	onError
}: MutationProps<PaymentMethodReq>) => {
	const updatePaymentMethodQuery = useMutation({
		mutationKey: ['update_payment_method'],
		mutationFn: updatePaymentMethod,
		onSuccess,
		onError
	});

	return updatePaymentMethodQuery;
};

export const useDeletePaymentMethods = ({
	onSuccess,
	onError
}: MutationProps<number[]>) => {
	const deletePaymentMethodsQuery = useMutation({
		mutationKey: ['delete_payment_methods'],
		mutationFn: deletePaymentMethods,
		onSuccess,
		onError
	});

	return deletePaymentMethodsQuery;
};
