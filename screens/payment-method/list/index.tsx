import {useCallback} from 'react';
import {FlatList} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {ListRow, ListWrapper} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../store';
import {OnPressType} from '../../../enums';
import {onPressCategoryRow} from '../../../slices/category';
import type {PaymentMethodProps} from '../../../types/components';
import type {ConfigParamList} from '../../../types/navigation';

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'PaymentMethodNav'>;

const PaymentMethodScreen = () => {
	const dispatch = useAppDispatch();
	const {selectMode, deleteList, paymentMethods} = useAppSelector(
		(state) => state.paymentMethod
	);

	const navigation = useNavigation<NavigationProp>();

	const goPaymentMethodDetail = (paymentMethod: PaymentMethodProps) => {
		navigation.navigate('PaymentMethodNav', {
			screen: 'EditPaymentMethod',
			params: paymentMethod
		});
	};

	const renderItem = useCallback(
		(item: PaymentMethodProps) => {
			const onList = deleteList.includes(item.id);
			const backgroundColor = onList ? 'rgba(255, 0, 0, 1)' : 'transparent';

			return (
				<ListRow
					id={item.id}
					name={item.name}
					backgroundColor={backgroundColor}
					onPress={() =>
						dispatch(
							onPressCategoryRow(
								selectMode,
								onList,
								item.id,
								OnPressType.Normal,
								() => goPaymentMethodDetail(item)
							)
						)
					}
					onLongPress={() =>
						dispatch(
							onPressCategoryRow(selectMode, onList, item.id, OnPressType.Long)
						)
					}
					extraData={{selectMode, onList}}
				/>
			);
		},
		[selectMode, deleteList]
	);

	return (
		<ListWrapper
			onPressAdd={() =>
				navigation.navigate('PaymentMethodNav', {screen: 'AddPaymentMethod'})
			}
		>
			<FlatList
				data={paymentMethods}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({item}) => renderItem(item)}
			/>
		</ListWrapper>
	);
};

export default PaymentMethodScreen;
