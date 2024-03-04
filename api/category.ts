import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';
import type { MutationProps, QueryProps, GeneralReq } from '../types/api';

const getCategories = async () => {
	const { data } = await supabase.auth.getUser();

	if (!data.user) throw new Error('Usuario no encontrado');

	const { data: categories, error } = await supabase
		.from('category')
		.select('id, name')
		.eq('active', true)
		.order('name', { ascending: true });

	if (error) throw new Error(error.message); //TODO: parse error

	return categories;
};

const addCategory = async ({ name }: GeneralReq) => {
	const { data: userData } = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const { data: categories, error: selectError } = await supabase
		.from('category')
		.select('id, name')
		.eq('name', name.trim())
		.eq('user_id', userData.user.id)
		.eq('active', true);

	if (selectError) throw new Error(selectError.message); //TODO: parse error

	if (categories.length > 0)
		throw new Error('La categoría ya existe');

	const { data: category, error } = await supabase
		.from('category')
		.insert([{ name: name.trim(), user_id: userData.user.id }])
		.select('id, name');

	if (error) throw new Error(error.message);

	return category[0];
};

const updateCategory = async ({ id, name }: GeneralReq) => {
	const { data: userData } = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const { data: categories, error: selectError } = await supabase
		.from('category')
		.select('id, name')
		.eq('name', name.trim())
		.eq('user_id', userData.user.id)
		.eq('active', true);

	if (selectError) throw new Error(selectError.message); //TODO: parse error

	if (categories.length > 0) {
		if (categories[0].id === id) return categories[0];
		else throw new Error('La categoría ya existe');
	}

	const { data: category, error } = await supabase
		.from('category')
		.update({ name: name.trim() })
		.eq('id', id)
		.select('id, name');

	if (error) throw new Error(error.message);

	return category[0];
};

const deleteCategories = async (deleteList: number[]) => {
	const { data: userData } = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const { data: categories, error } = await supabase
		.from('category')
		.update({ active: false })
		.in('id', deleteList)
		.select('id, name');

	if (error) throw new Error(error.message);

	return categories;
};

export const useGetCategories = ({
	onSuccess,
	onError,
	select
}: QueryProps) => {
	const getCategoriesQuery = useQuery({
		queryKey: ['category'],
		queryFn: getCategories,
		onSuccess,
		onError,
		select
	});

	return getCategoriesQuery;
};

export const useAddCategory = ({
	onSuccess,
	onError
}: MutationProps<GeneralReq>) => {
	const addCategoryQuery = useMutation({
		mutationKey: ['add_category'],
		mutationFn: addCategory,
		onSuccess,
		onError
	});

	return addCategoryQuery;
};

export const useUpdateCategory = ({
	onSuccess,
	onError
}: MutationProps<GeneralReq>) => {
	const updateCategoryQuery = useMutation({
		mutationKey: ['update_category'],
		mutationFn: updateCategory,
		onSuccess,
		onError
	});

	return updateCategoryQuery;
};

export const useDeleteCategories = ({
	onSuccess,
	onError
}: MutationProps<number[]>) => {
	const deleteCategoriesQuery = useMutation({
		mutationKey: ['delete_categories'],
		mutationFn: deleteCategories,
		onSuccess,
		onError
	});

	return deleteCategoriesQuery;
};
