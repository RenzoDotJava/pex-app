type AuthReq = {
	email: string;
	password: string;
};

type HookProps<T> = {
	onSuccess?: (data: any, variables: T) => void;
	onError?: (error: any, variables: T) => void;
};

export {
	AuthReq,
	HookProps
}
