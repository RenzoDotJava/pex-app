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
