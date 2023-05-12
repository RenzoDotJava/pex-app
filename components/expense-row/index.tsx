import {memo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Badge} from '../../ui';
import {theme} from '../../styles';
import {areEqual} from '../../utils';
import type {ExpenseRowProps} from '../../types/components';

const ExpenseRow: React.FC<ExpenseRowProps> = ({
	expenseCenter,
	category,
	place,
	paymentMethod,
	amount,
	backgroundColor,
	onPress,
	onLongPress
}) => (
	<TouchableOpacity
		style={[styles.container, {backgroundColor}]}
		activeOpacity={0.5}
		onPress={onPress}
		onLongPress={onLongPress}
		delayLongPress={400}
	>
		<View style={styles.container_left}>
			<Text style={styles.expense_center}>{expenseCenter}</Text>
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
	expense_center: {
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
