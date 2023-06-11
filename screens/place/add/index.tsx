import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../../store';
import {PlaceForm} from '../../../components';
import {useAddPlace} from '../../../api/place';
import {addPlace} from '../../../slices/place';
import type {ConfigParamList} from '../../../types/navigation';

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'PlaceNav'>;

const AddPlaceScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const dispatch = useAppDispatch();
	const {mutate, isLoading} = useAddPlace({
		onSuccess: (data) => {
			if (data) dispatch(addPlace(data));
			navigation.navigate('PlaceNav', {screen: 'Place'});
		},
		onError: (error) => {
			console.log(error.message);
		}
	});

	return <PlaceForm action={mutate} isLoading={isLoading} />;
};

export default AddPlaceScreen;
