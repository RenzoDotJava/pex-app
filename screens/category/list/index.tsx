import { useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ListRow, ListWrapper } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../store';
import { EmptyList } from '../../../ui';
import { OnPressType } from '../../../enums';
import { onPressCategoryRow, setCategories } from '../../../slices/category';
import { useGetCategories } from '../../../api/category';
import type { CategoryProps } from '../../../types/components';
import type { ConfigParamList } from '../../../types/navigation';
import { theme } from '../../../styles';

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'CategoryNav'>;

const CategoryScreen = () => {
	const { t } = useTranslation('global');
	const navigation = useNavigation<NavigationProp>();
	const dispatch = useAppDispatch();
	const { selectMode, deleteList, categories } = useAppSelector(
		(state) => state.category
	);
	const { isLoading, refetch } = useGetCategories({
		onSuccess: (data) => {
			dispatch(setCategories(data));
		}
	});

	const goCategoryDetail = (category: CategoryProps) => {
		navigation.navigate('CategoryNav', {
			screen: 'EditCategory',
			params: category
		});
	};

	const renderItem = useCallback(
		(item: CategoryProps) => {
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
							onPressCategoryRow(
								selectMode,
								onList,
								item.id,
								OnPressType.Normal,
								() => goCategoryDetail(item)
							)
						)
					}
					onLongPress={() =>
						dispatch(
							onPressCategoryRow(selectMode, onList, item.id, OnPressType.Long)
						)
					}
					extraData={{ selectMode, onList, categories }}
				/>
			);
		},
		[selectMode, deleteList, categories]
	);

	return (
		<ListWrapper
			onPressAdd={() =>
				navigation.navigate('CategoryNav', { screen: 'AddCategory' })
			}
		>
			<FlatList
				data={categories}
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
				ListEmptyComponent={!isLoading ? <EmptyList text={t("category.empty")} /> : <></>}
			/>
		</ListWrapper>
	);
};

export default CategoryScreen;
