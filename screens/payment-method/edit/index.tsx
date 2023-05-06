import {RouteProp, useRoute} from '@react-navigation/native';
import {PaymentMethodForm} from '../../../components';
import type {PaymentMethodParamList} from '../../../types/navigation';

type EditPaymentMethodScreenRouteProp = RouteProp<
	PaymentMethodParamList,
	'EditPaymentMethod'
>;

const EditPaymentMethodScreen: React.FC = () => {
	const route = useRoute<EditPaymentMethodScreenRouteProp>();
	const paymentMethod = route.params;

	return <PaymentMethodForm paymentMethod={paymentMethod} />;
};

export default EditPaymentMethodScreen;
