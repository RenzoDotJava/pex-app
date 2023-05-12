export const getVariantStyle = (
	variant: 'outlined' | 'standard' | undefined,
	styles: any
) => {
	switch (variant) {
		case 'outlined':
			return styles.outlined;
		case 'standard':
			return styles.standard;
		default:
			return styles.outlined;
	}
};

export const areEqual = (prevProps: any, nextProps: any): boolean => {
	const {extraData} = nextProps;
	const {extraData: prevExtraData} = prevProps;

	//TODO: use lodash or some object comparator in order to do a correct comparison
	const isEqual = JSON.stringify(extraData) === JSON.stringify(prevExtraData);

	return isEqual;
};

//TODO: use a better error parser, maybe use status code instead of the message
export const parseSupabaseError = (message: string) => {
	switch (message) {
		case 'Password should be at least 6 characters':
			return 'La contraseña debe tener al menos 6 caracteres';
		case 'User already registered':
			return 'El usuario ya está registrado';
		case 'Invalid login credentials':
			return 'Credenciales inválidas';
		default:
			return 'Hubo un error';
	}
};
