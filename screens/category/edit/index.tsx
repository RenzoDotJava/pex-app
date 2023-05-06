import {RouteProp, useRoute} from '@react-navigation/native';
import {CategoryForm} from '../../../components';
import type {CategoryParamList} from '../../../types/navigation';

type EditCategoryScreenRouteProp = RouteProp<CategoryParamList, 'EditCategory'>;

const EditCategoryScreen: React.FC = () => {
	const route = useRoute<EditCategoryScreenRouteProp>();
	const category = route.params;

	return <CategoryForm category={category} />;
};

export default EditCategoryScreen;
