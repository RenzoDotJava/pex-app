import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { PaymentMethodForm } from '../../../components';
import { useAppDispatch } from '../../../store';
import { useUpdatePaymentMethod } from '../../../api/payment-method';
import { updatePaymentMethod } from '../../../slices/payment-method';
import { showToast } from '../../../utils';
import type { PaymentMethodReq } from '../../../types/api';
import type { ConfigParamList, PaymentMethodParamList } from '../../../types/navigation';

type EditPaymentMethodScreenRouteProp = RouteProp<
	PaymentMethodParamList,
	'EditPaymentMethod'
>;

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'PaymentMethodNav'>;

const EditPaymentMethodScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const route = useRoute<EditPaymentMethodScreenRouteProp>();
	const paymentMethod = route.params;
	const dispatch = useAppDispatch();
	const { mutate, isLoading } = useUpdatePaymentMethod({
		onSuccess: (data) => {
			if (data) dispatch(updatePaymentMethod(data));
			navigation.navigate('PaymentMethodNav', { screen: 'PaymentMethod' });
		},
		onError: (error) => {
			showToast(error.message, 'long', 'error');
		}
	});

	const action = (data: PaymentMethodReq) => {
		if (data.name.trim() !== paymentMethod.name.trim() || data.color !== paymentMethod.color) {
			mutate({
				id: paymentMethod.id,
				...data
			});
		} else {
			navigation.navigate('PaymentMethodNav', { screen: 'PaymentMethod' });
		}
	};

	return (
		<PaymentMethodForm
			paymentMethod={paymentMethod}
			action={action}
			isLoading={isLoading}
		/>
	);
};

export default EditPaymentMethodScreen;
