import {useMutation} from '@tanstack/react-query';
import {parseSupabaseError} from '../utils';
import {supabase} from '../supabase';
import type {HookProps, AuthReq} from '../types/api';

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

export const useSignUpMutation = ({onSuccess, onError}: HookProps<AuthReq>) => {
	const signUpMutation = useMutation({
		mutationKey: ['signUp'],
		mutationFn: signUp,
		onSuccess: onSuccess,
		onError: onError
	});

	return signUpMutation;
};

export const useSignInMutation = ({onSuccess, onError}: HookProps<AuthReq>) => {
	const signInMutation = useMutation({
		mutationKey: ['signInWithPassword'],
		mutationFn: signInWithPassword,
		onSuccess: onSuccess,
		onError: onError
	});

	return signInMutation;
};
