import {useCallback} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons';
import {IconButton} from '../../../ui';
import {theme} from '../../../styles';
import {ListRow} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../store';
import {ExpenseCenterProps} from '../../../types/components';
import {OnPressType} from '../../../enums';
import {
	onPressExpenseCenterRow,
	setExpenseCenters
} from '../../../slices/expense-center';
import {useGetExpenseCenters} from '../../../api/expense-center';
import type {ConfigParamList} from '../../../types/navigation';

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'ExpenseCenterNav'>;

const ExpenseCenterScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const dispatch = useAppDispatch();
	const {selectMode, deleteList, expenseCenters} = useAppSelector(
		(state) => state.expenseCenter
	);
	const {isLoading, refetch} = useGetExpenseCenters({
		onSuccess: (data) => {
			dispatch(setExpenseCenters(data));
		}
	});

	const goExpenseCenterDetail = (expenseCenter: ExpenseCenterProps) => {
		navigation.navigate('ExpenseCenterNav', {
			screen: 'EditExpenseCenter',
			params: expenseCenter
		});
	};

	const renderItem = useCallback(
		(item: ExpenseCenterProps) => {
			const onList = deleteList.includes(item.id);
			const backgroundColor = onList ? 'rgba(255, 0, 0, 1)' : 'transparent';

			return (
				<ListRow
					id={item.id}
					name={item.name}
					backgroundColor={backgroundColor}
					onPress={() =>
						dispatch(
							onPressExpenseCenterRow(
								selectMode,
								onList,
								item.id,
								OnPressType.Normal,
								() => goExpenseCenterDetail(item)
							)
						)
					}
					onLongPress={() =>
						dispatch(
							onPressExpenseCenterRow(
								selectMode,
								onList,
								item.id,
								OnPressType.Long
							)
						)
					}
					extraData={{selectMode, onList, expenseCenters}}
				/>
			);
		},
		[selectMode, deleteList, expenseCenters]
	);

	return (
		<View style={styles.main}>
			<IconButton
				onPress={() =>
					navigation.navigate('ExpenseCenterNav', {screen: 'AddExpenseCenter'})
				}
				style={styles.plus}
				icon={<Entypo name="plus" size={30} color={theme.color.secondary} />}
			/>
			<FlatList
				data={expenseCenters}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({item}) => renderItem(item)}
				refreshControl={
					<RefreshControl
						refreshing={isLoading}
						onRefresh={refetch}
						colors={['#32373A']}
						tintColor={'#32373A'}
					/>
				}
			/>
		</View>
	);
};

export default ExpenseCenterScreen;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: theme.color.secondary
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
	}
});
