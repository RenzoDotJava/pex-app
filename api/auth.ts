import {useMutation} from '@tanstack/react-query';
import {parseSupabaseError} from '../utils';
import {supabase} from '../supabase';
import type {MutationProps, AuthReq} from '../types/api';

const signUp = async ({email, password}: AuthReq) => {
	const {data, error} = await supabase.auth.signUp({
		email: email,
		password: password
	});

	if (error) throw new Error(parseSupabaseError(error.message));

	return data;
};

const signInWithPassword = async ({email, password}: AuthReq) => {
	const {data, error} = await supabase.auth.signInWithPassword({
		email: email,
		password: password
	});

	if (error) throw new Error(parseSupabaseError(error.message));

	return data;
};

export const useSignUpMutation = ({
	onSuccess,
	onError
}: MutationProps<AuthReq>) => {
	const signUpMutation = useMutation({
		mutationKey: ['signUp'],
		mutationFn: signUp,
		onSuccess,
		onError
	});

	return signUpMutation;
};

export const useSignInMutation = ({
	onSuccess,
	onError
}: MutationProps<AuthReq>) => {
	const signInMutation = useMutation({
		mutationKey: ['signInWithPassword'],
		mutationFn: signInWithPassword,
		onSuccess,
		onError
	});

	return signInMutation;
};
