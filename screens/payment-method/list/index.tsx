import { useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ListRow, ListWrapper } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../store';
import { OnPressType } from '../../../enums';
import { useGetPaymentMethods } from '../../../api/payment-method';
import { onPressPaymentMethodRow, setPaymentMethods } from '../../../slices/payment-method';
import type { PaymentMethodProps } from '../../../types/components';
import type { ConfigParamList } from '../../../types/navigation';
import { EmptyList } from '../../../ui';
import { theme } from '../../../styles';

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'PaymentMethodNav'>;

const PaymentMethodScreen = () => {
	const { t } = useTranslation('global');
	const navigation = useNavigation<NavigationProp>();
	const dispatch = useAppDispatch();
	const { selectMode, deleteList, paymentMethods } = useAppSelector(
		(state) => state.paymentMethod
	);
	const { isLoading, refetch } = useGetPaymentMethods({
		onSuccess: (data) => {
			dispatch(setPaymentMethods(data));
		}
	});

	const goPaymentMethodDetail = (paymentMethod: PaymentMethodProps) => {
		navigation.navigate('PaymentMethodNav', {
			screen: 'EditPaymentMethod',
			params: paymentMethod
		});
	};

	const renderItem = useCallback(
		(item: PaymentMethodProps) => {
			const onList = deleteList.includes(item.id);

			return (
				<ListRow
					id={item.id}
					name={item.name}
					backgroundColor={'transparent'}
					selectMode={selectMode}
					onList={onList}
					onPress={() =>
						dispatch(
							onPressPaymentMethodRow(
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
							onPressPaymentMethodRow(selectMode, onList, item.id, OnPressType.Long)
						)
					}
					extraData={{ selectMode, onList }}
				/>
			);
		},
		[selectMode, deleteList, paymentMethods]
	);

	return (
		<ListWrapper
			onPressAdd={() =>
				navigation.navigate('PaymentMethodNav', { screen: 'AddPaymentMethod' })
			}
		>
			<FlatList
				data={paymentMethods}
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
				ListEmptyComponent={!isLoading ? <EmptyList text={t("payment-method.empty")} /> : <></>}
			/>
		</ListWrapper>
	);
};

export default PaymentMethodScreen;
