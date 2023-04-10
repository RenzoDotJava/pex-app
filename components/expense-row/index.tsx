import {memo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Badge} from '../../ui';
import {theme} from '../../styles';
import type {ExpenseRowProps} from '../../types/components';

const ExpenseRow: React.FC<ExpenseRowProps> = ({
	costCenter,
	category,
	place,
	paymentMethod,
	amount,
	backgroundColor,
	onPress,
	onLongPress
}) => {
	return (
		<TouchableOpacity
			style={[styles.container, {backgroundColor}]}
			activeOpacity={0.5}
			onPress={onPress}
			onLongPress={onLongPress}
			delayLongPress={400}
		>
			<View style={styles.container_left}>
				<Text style={styles.cost_center}>{costCenter}</Text>
				<Text style={styles.info}>
					{category} • {place}
				</Text>
			</View>
			<View style={styles.container_right}>
				<Badge text={paymentMethod} />
				<Text style={styles.amount}>S/. {amount.toFixed(2)}</Text>
			</View>
		</TouchableOpacity>
	);
};

const areEqual = (
	prevProps: ExpenseRowProps,
	nextProps: ExpenseRowProps
): boolean => {
	const {onList, selectMode} = nextProps;
	const {onList: prevOnList, selectMode: prevSelectMode} = prevProps;

	const onListEqual = selectMode === prevSelectMode && onList === prevOnList;

	return onListEqual;
};

export default memo(ExpenseRow, areEqual);

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderBottomColor: 'gray',
		borderBottomWidth: 1
	},
	container_left: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		gap: 1
	},
	container_right: {
		justifyContent: 'center',
		alignItems: 'flex-end',
		gap: 8
	},
	cost_center: {
		fontSize: theme.fontSize.lg,
		fontWeight: '500'
	},
	info: {
		fontSize: theme.fontSize.sm
	},
	amount: {
		fontSize: theme.fontSize['xl'],
		fontWeight: '600'
	}
});
