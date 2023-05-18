type AuthReq = {
	email: string;
	password: string;
};

type GeneralReq = {
	id?: number;
	name: string;
};

type MutationProps<T> = {
	onSuccess?: (data: any, variables: T) => void;
	onError?: (error: any, variables: T) => void;
};

type QueryProps = {
	onSuccess?: (data: any) => void;
	onError?: (error: any) => void;
	select?: (data: any) => void;
};

export {AuthReq, MutationProps, QueryProps, GeneralReq};
