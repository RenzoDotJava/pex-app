import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CategoryForm } from '../../../components';
import { useAppDispatch } from '../../../store';
import { useUpdateCategory } from '../../../api/category';
import { updateCategory } from '../../../slices/category';
import type { CategoryParamList, ConfigParamList } from '../../../types/navigation';
import type { GeneralReq } from '../../../types/api';
import { showToast } from '../../../utils';

type EditCategoryScreenRouteProp = RouteProp<CategoryParamList, 'EditCategory'>;

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'CategoryNav'>;

const EditCategoryScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const route = useRoute<EditCategoryScreenRouteProp>();
	const category = route.params;
	const dispatch = useAppDispatch();
	const { mutate, isLoading } = useUpdateCategory({
		onSuccess: (data) => {
			if (data) dispatch(updateCategory(data));
			navigation.navigate('CategoryNav', { screen: 'Category' });
		},
		onError: (error) => {
			showToast(error.message, 'long', 'error');
		}
	});

	const action = (data: GeneralReq) => {
		if (data.name !== category.name) {
			mutate(data);
		} else {
			navigation.navigate('CategoryNav', { screen: 'Category' });
		}
	};

	return (
		<CategoryForm
			category={category}
			action={action}
			isLoading={isLoading}
		/>
	);
};

export default EditCategoryScreen;
