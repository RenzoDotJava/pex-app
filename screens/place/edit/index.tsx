import {RouteProp, useRoute} from '@react-navigation/native';
import {PlaceForm} from '../../../components';
import type {PlaceParamList} from '../../../types/navigation';

type EditPlaceScreenRouteProp = RouteProp<PlaceParamList, 'EditPlace'>;

const EditPlaceScreen: React.FC = () => {
	const route = useRoute<EditPlaceScreenRouteProp>();
	const place = route.params;

	return <PlaceForm place={place} />;
};

export default EditPlaceScreen;
