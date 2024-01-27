import {useMutation, useQuery} from '@tanstack/react-query';
import {supabase} from '../supabase';
import type {MutationProps, QueryProps, GeneralReq} from '../types/api';

const getPlaces = async () => {
	const {data} = await supabase.auth.getUser();

	if (!data.user) throw new Error('Usuario no encontrado');

	const {data: places, error} = await supabase
		.from('place')
		.select('id, name')
		.eq('active', true)
		.order('created_at', {ascending: true});

	if (error) throw new Error(error.message); //TODO: parse error

	return places;
};

const addPlace = async ({name}: GeneralReq) => {
	const {data: userData} = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const {data: places, error: selectError} = await supabase
		.from('place')
		.select('id, name')
		.eq('name', name.trim())
		.eq('active', true);

	if (selectError) throw new Error(selectError.message); //TODO: parse error

	if (places.length > 0)
		throw new Error('El lugar ya existe');

	const {data: place, error} = await supabase
		.from('place')
		.insert([{name: name.trim(), user_id: userData.user.id}])
		.select('id, name');

	if (error) throw new Error(error.message);

	return place[0];
};

const updatePlace = async ({id, name}: GeneralReq) => {
	const {data: userData} = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const {data: place, error} = await supabase
		.from('place')
		.update({name: name.trim()})
		.eq('id', id)
		.select('id, name');

	if (error) throw new Error(error.message);

	return place[0];
};

const deletePlaces = async (deleteList: number[]) => {
	const {data: userData} = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const {data: places, error} = await supabase
		.from('place')
		.update({active: false})
		.in('id', deleteList)
		.select('id, name');

	if (error) throw new Error(error.message);

	return places;
};

export const useGetPlaces = ({
	onSuccess,
	onError,
	select
}: QueryProps) => {
	const getPlacesQuery = useQuery({
		queryKey: ['place'],
		queryFn: getPlaces,
		onSuccess,
		onError,
		select
	});

	return getPlacesQuery;
};

export const useAddPlace = ({
	onSuccess,
	onError
}: MutationProps<GeneralReq>) => {
	const addPlaceQuery = useMutation({
		mutationKey: ['add_place'],
		mutationFn: addPlace,
		onSuccess,
		onError
	});

	return addPlaceQuery;
};

export const useUpdatePlace = ({
	onSuccess,
	onError
}: MutationProps<GeneralReq>) => {
	const updatePlaceQuery = useMutation({
		mutationKey: ['update_place'],
		mutationFn: updatePlace,
		onSuccess,
		onError
	});

	return updatePlaceQuery;
};

export const useDeletePlaces = ({
	onSuccess,
	onError
}: MutationProps<number[]>) => {
	const deletePlacesQuery = useMutation({
		mutationKey: ['delete_places'],
		mutationFn: deletePlaces,
		onSuccess,
		onError
	});

	return deletePlacesQuery;
};
