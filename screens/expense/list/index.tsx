import { useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { ExpenseRow } from '../../../components';
import { DateNavigator, EmptyList, IconButton } from '../../../ui';
import {
	getTotalAmountByDate,
	getTotalDeleteListAmount,
	onPressExpenseRow,
	setExpenses
} from '../../../slices/expense';
import { theme } from '../../../styles';
import { OnPressType } from '../../../enums';
import { useAppDispatch, useAppSelector } from '../../../store';
import { useGetExpenses } from '../../../api/expense';
import type { SidebarDrawerParamList } from '../../../types/navigation';
import type { ExpenseProps } from '../../../types/components';
import moment from 'moment-timezone';
import { getDate } from '../../../utils';

type NavigationProp = DrawerNavigationProp<
	SidebarDrawerParamList,
	'ExpenseNav'
>;

const ExpensesScreen: React.FC = () => {
	const { t } = useTranslation('global');
	const dispatch = useAppDispatch();
	const { selectMode, deleteList, expenses, expensesMonthly, startDate, endDate, mode, majorExpenseFilter } = useAppSelector(
		(state) => state.expense
	);
	const totalByDate = useAppSelector((state) =>
		getTotalAmountByDate(state)
	);
	const totalDeleteAmount = useAppSelector((state) =>
		getTotalDeleteListAmount(state)
	);
	const { isLoading, refetch } = useGetExpenses({
		startDate,
		endDate,
		onlyMajor: majorExpenseFilter,
		onSuccess: (data) => {
			dispatch(setExpenses(data));
		}
	});

	const navigation = useNavigation<NavigationProp>();

	const goExpenseDetail = (expense: ExpenseProps) => {
		navigation.navigate('ExpenseNav', { screen: 'EditExpense', params: expense });
	};

	const renderItem = useCallback(
		(item: ExpenseProps) => {
			const onList = deleteList.includes(item.id);

			return (
				<ExpenseRow
					id={item.id}
					expense_center={item.expense_center}
					category={item.category}
					date={item.date}
					place={item.place}
					payment_method={item.payment_method}
					amount={item.amount}
					remark={item.remark}
					major={item.major}
					backgroundColor={item.major ? theme.color.secondary.light : 'transparent'}
					onList={onList}
					selectMode={selectMode}
					onPress={() =>
						dispatch(
							onPressExpenseRow(
								selectMode,
								onList,
								item.id,
								OnPressType.Normal,
								() => goExpenseDetail(item)
							)
						)
					}
					onLongPress={() =>
						dispatch(
							onPressExpenseRow(selectMode, onList, item.id, OnPressType.Long)
						)
					}
					extraData={{ selectMode, onList, expenses }}
				/>
			);
		},
		[selectMode, deleteList, expenses]
	);

	return (
		<View style={styles.main}>
			{!selectMode ? (
				<>
					<IconButton
						onPress={() =>
							navigation.navigate('ExpenseNav', { screen: 'AddExpense' })
						}
						style={styles.plus}
						icon={
							<Entypo name="plus" size={30} color={theme.color.neutral.lightest} />
						}
					/>
					<DateNavigator />
				</>
			) : (
				<View style={styles.header_divider}></View>
			)}
			<View
				style={[
					styles.subheader,
					{ backgroundColor: theme.color.primary.dark }
				]}
			>
				<Text style={styles.subheader_text}>
					{!selectMode
						? `Total: S/. ${totalByDate.toFixed(2)}`
						: `${deleteList.length
						} ${t("expense.selected")} ~ S/. -${totalDeleteAmount.toFixed(2)}`}
				</Text>
			</View>
			{mode === 'daily' ?
				<FlatList
					data={expenses}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => renderItem(item)}
					refreshControl={
						<RefreshControl
							refreshing={isLoading}
							onRefresh={refetch}
							colors={[theme.color.primary.dark]}
							tintColor={theme.color.primary.dark}
						/>
					}
					ListEmptyComponent={!isLoading ? <EmptyList text={t("expense.empty")} /> : <></>}
				/> :
				<SectionList
					refreshControl={
						<RefreshControl
							refreshing={isLoading}
							onRefresh={refetch}
							colors={[theme.color.primary.dark]}
							tintColor={theme.color.primary.dark}
						/>
					}
					sections={expensesMonthly}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => renderItem(item)}
					renderSectionHeader={({ section: { title } }) => (
						<View style={{ backgroundColor: '#ADADAD', paddingHorizontal: 16, paddingVertical: 8 }}>
							<Text style={{ fontWeight: 'bold', fontSize: theme.fontSize.md, color: theme.color.neutral.lightest }}>{moment(getDate(title)).format('DD/MM/YYYY')}</Text>
						</View>
					)}
					ListEmptyComponent={!isLoading ? <EmptyList text={t("expense.empty")} /> : <></>}
				/>
			}
		</View>
	);
};

export default ExpensesScreen;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: theme.color.neutral.lightest
	},
	header_divider: {
		height: 45,
		backgroundColor: theme.color.primary.darkest
	},
	plus: {
		position: 'absolute',
		bottom: 40,
		right: 15,
		backgroundColor: theme.color.primary.medium,
		width: 55,
		height: 55,
		borderRadius: 55 / 2,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1
	},
	subheader: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12
	},
	subheader_text: {
		color: theme.color.neutral.lightest,
		fontWeight: '500'
	},
	list: {
		flex: 1
	}
});
