import {useCallback} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {ListRow, ListWrapper} from '../../../components';
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
		<ListWrapper
			onPressAdd={() =>
				navigation.navigate('ExpenseCenterNav', {screen: 'AddExpenseCenter'})
			}
		>
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
		</ListWrapper>
	);
};

export default ExpenseCenterScreen;
