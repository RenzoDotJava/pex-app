import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { PlaceForm } from '../../../components';
import { useAppDispatch } from '../../../store';
import { useUpdatePlace } from '../../../api/place';
import { updatePlace } from '../../../slices/place';
import type { ConfigParamList, PlaceParamList } from '../../../types/navigation';
import type { GeneralReq } from '../../../types/api';
import { showToast } from '../../../utils';

type EditPlaceScreenRouteProp = RouteProp<PlaceParamList, 'EditPlace'>;

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'PlaceNav'>;

const EditPlaceScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const route = useRoute<EditPlaceScreenRouteProp>();
	const place = route.params;
	const dispatch = useAppDispatch();
	const { mutate, isLoading } = useUpdatePlace({
		onSuccess: (data) => {
			if (data) dispatch(updatePlace(data));
			navigation.navigate('PlaceNav', { screen: 'Place' });
		},
		onError: (error) => {
			showToast(error.message, 'long', 'error');
		}
	});

	const action = (data: GeneralReq) => {
		if (data.name !== place.name) {
			mutate(data);
		} else {
			navigation.navigate('PlaceNav', { screen: 'Place' });
		}
	};

	return (
		<PlaceForm
			place={place}
			action={action}
			isLoading={isLoading}
		/>
	);
};

export default EditPlaceScreen;
