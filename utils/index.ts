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
