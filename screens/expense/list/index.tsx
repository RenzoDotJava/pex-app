import {useCallback} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Entypo} from '@expo/vector-icons';
import {ExpenseRow} from '../../../components';
import {DateNavigator, IconButton} from '../../../ui';
import {
	getTotalDeleteListAmount,
	onPressExpenseRow
} from '../../../slices/expense';
import {theme} from '../../../styles';
import {OnPressType} from '../../../enums';
import {useAppDispatch, useAppSelector} from '../../../store';
import type {SidebarDrawerParamList} from '../../../types/navigation';
import type {ExpenseProps} from '../../../types/components';

type NavigationProp = DrawerNavigationProp<
	SidebarDrawerParamList,
	'ExpenseNav'
>;

const ExpensesScreen: React.FC = () => {
	const dispatch = useAppDispatch();
	const {selectMode, deleteList, expenses} = useAppSelector(
		(state) => state.expense
	);
	const totalDeleteAmount = useAppSelector((state) =>
		getTotalDeleteListAmount(state)
	);
	const navigation = useNavigation<NavigationProp>();

	const goExpenseDetail = (expense: ExpenseProps) => {
		navigation.navigate('ExpenseNav', {screen: 'EditExpense', params: expense});
	};

	const renderItem = useCallback(
		(item: ExpenseProps) => {
			const onList = deleteList.includes(item.id);
			const backgroundColor = onList ? 'rgba(255, 0, 0, 1)' : 'transparent';

			return (
				<ExpenseRow
					id={item.id}
					costCenter={item.costCenter}
					category={item.category}
					place={item.place}
					paymentMethod={item.paymentMethod}
					amount={item.amount}
					backgroundColor={backgroundColor}
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
					extraData={{selectMode, onList}}
				/>
			);
		},
		[selectMode, deleteList]
	);

	return (
		<View style={styles.main}>
			{!selectMode ? (
				<>
					<IconButton
						onPress={() =>
							navigation.navigate('ExpenseNav', {screen: 'AddExpense'})
						}
						style={styles.plus}
						icon={
							<Entypo name="plus" size={30} color={theme.color.secondary} />
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
					{backgroundColor: !selectMode ? theme.color.primary : '#C0C0C0'}
				]}
			>
				<Text style={styles.subheader_text}>
					{!selectMode
						? `Total: S/. 980.00`
						: `${
								deleteList.length
						  } seleccionados ~ S/. -${totalDeleteAmount.toFixed(2)}`}
				</Text>
			</View>
			<FlatList
				data={expenses}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({item}) => renderItem(item)}
			/>
		</View>
	);
};

export default ExpensesScreen;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: theme.color.secondary
	},
	header_divider: {
		height: 45,
		backgroundColor: 'gray'
	},
	plus: {
		position: 'absolute',
		bottom: 40,
		right: 15,
		backgroundColor: theme.color.primary,
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
		color: theme.color.secondary,
		fontWeight: '500'
	},
	list: {
		flex: 1
	}
});
