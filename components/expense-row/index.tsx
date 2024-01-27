import { memo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Badge } from '../../ui';
import { theme } from '../../styles';
import { areEqual } from '../../utils';
import type { ExpenseRowProps } from '../../types/components';

const ExpenseRow: React.FC<ExpenseRowProps> = ({
	expense_center,
	category,
	place,
	payment_method,
	amount,
	backgroundColor,
	onList,
	selectMode,
	onPress,
	onLongPress
}) => (
	<TouchableOpacity
		style={[styles.container]}
		activeOpacity={0.5}
		onPress={onPress}
		onLongPress={onLongPress}
		delayLongPress={400}
	>
		{selectMode && (<View style={{ justifyContent: 'center', marginRight: 12 }}>
			<View style={styles.check}>
				{onList && <AntDesign name="check" size={18} color={theme.color.primary.dark} />}
			</View>
		</View>)}
		<View style={styles.container_left}>
			<Text style={styles.expense_center}>{expense_center.name}</Text>
			<Text style={styles.info}>
				{category.name} • {place.name}
			</Text>
		</View>
		<View style={styles.container_right}>
			<Badge text={payment_method.name} />
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
		borderBottomColor: theme.color.neutral.medium,
		borderBottomWidth: 1
	},
	container_left: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		gap: 4
	},
	container_right: {
		justifyContent: 'center',
		alignItems: 'flex-end',
		gap: 8
	},
	expense_center: {
		fontSize: theme.fontSize.lg,
		fontWeight: '500',
		color: theme.color.neutral.dark
	},
	info: {
		fontSize: theme.fontSize.sm,
		color: theme.color.neutral.dark
	},
	amount: {
		fontSize: theme.fontSize['xl'],
		fontWeight: '600',
		color: theme.color.neutral.dark
	},
	check: {
		width: 28,
		height: 28,
		borderRadius: 29 / 2,
		borderWidth: 2,
		borderColor: theme.color.primary.dark,
		alignItems: 'center',
		justifyContent: 'center',
	}
});
