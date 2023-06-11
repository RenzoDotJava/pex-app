import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {PaymentMethodForm} from '../../../components';
import {useAppDispatch} from '../../../store';
import type {ConfigParamList} from '../../../types/navigation';
import {useAddPaymentMethod} from '../../../api/payment-method';
import {addPaymentMethod} from '../../../slices/payment-method';

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'PaymentMethodNav'>;

const AddPaymentMethodScreen = () => {
	const navigation = useNavigation<NavigationProp>();
	const dispatch = useAppDispatch();
	const {mutate, isLoading} = useAddPaymentMethod({
		onSuccess: (data) => {
			if (data) dispatch(addPaymentMethod(data));
			navigation.navigate('PaymentMethodNav', {screen: 'PaymentMethod'});
		},
		onError: (error) => {
			console.log(error.message);
		}
	});

	return <PaymentMethodForm action={mutate} isLoading={isLoading} />;
};

export default AddPaymentMethodScreen;
