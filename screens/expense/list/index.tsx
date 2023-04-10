import {StyleSheet, View, Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Entypo} from '@expo/vector-icons';
import {IconButton} from '../../../ui';
import {DateNavigator, ExpenseRow} from '../../../components';
import {
	getTotalDeleteListAmount,
	onPressExpenseRow
} from '../../../slices/expense';
import {theme} from '../../../styles';
import {OnPressType} from '../../../enums';
import {useAppDispatch, useAppSelector} from '../../../store';
import type {SidebarDrawerParamList} from '../../../types/navigation';
import type {ExpenseProps} from '../../../types/components';

type NavigationProp = DrawerNavigationProp<SidebarDrawerParamList, 'Expense'>;

const ExpensesScreen: React.FC = () => {
	const dispatch = useAppDispatch();
	const {selectMode, deleteList, expenses} = useAppSelector(
		(state) => state.expense
	);
	const totalDeleteAmount = useAppSelector((state) =>
		getTotalDeleteListAmount(state)
	);
	const navigation = useNavigation<NavigationProp>();

	const renderItem = (item: ExpenseProps) => {
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
				selectMode={selectMode}
				onList={onList}
				backgroundColor={backgroundColor}
				onPress={() =>
					dispatch(
						onPressExpenseRow(selectMode, onList, item.id, OnPressType.Normal)
					)
				}
				onLongPress={() =>
					dispatch(
						onPressExpenseRow(selectMode, onList, item.id, OnPressType.Long)
					)
				}
			/>
		);
	};

	return (
		<View style={styles.main}>
			{!selectMode ? (
				<>
					<IconButton
						onPress={() =>
							navigation.navigate('Expense', {screen: 'AddExpense'})
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
