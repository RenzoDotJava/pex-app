import { useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ListRow, ListWrapper } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../store';
import { OnPressType } from '../../../enums';
import { onPressPlaceRow, setPlaces } from '../../../slices/place';
import { useGetPlaces } from '../../../api/place';
import { EmptyList } from '../../../ui';
import type { PlaceProps } from '../../../types/components';
import type { ConfigParamList } from '../../../types/navigation';
import { theme } from '../../../styles';

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'PlaceNav'>;

const PlaceScreen: React.FC = () => {
	const { t } = useTranslation('global');
	const navigation = useNavigation<NavigationProp>();
	const dispatch = useAppDispatch();
	const { selectMode, deleteList, places } = useAppSelector(
		(state) => state.place
	);
	const { isLoading, refetch } = useGetPlaces({
		onSuccess: (data) => {
			dispatch(setPlaces(data));
		}
	});

	const goCategoryPlace = (category: PlaceProps) => {
		navigation.navigate('PlaceNav', {
			screen: 'EditPlace',
			params: category
		});
	};

	const renderItem = useCallback(
		(item: PlaceProps) => {
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
							onPressPlaceRow(
								selectMode,
								onList,
								item.id,
								OnPressType.Normal,
								() => goCategoryPlace(item)
							)
						)
					}
					onLongPress={() =>
						dispatch(
							onPressPlaceRow(selectMode, onList, item.id, OnPressType.Long)
						)
					}
					extraData={{ selectMode, onList }}
				/>
			);
		},
		[selectMode, deleteList, places]
	);

	return (
		<ListWrapper
			onPressAdd={() =>
				navigation.navigate('PlaceNav', { screen: 'AddPlace' })
			}
		>
			<FlatList
				data={places}
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
				ListEmptyComponent={!isLoading ? <EmptyList text={t("place.empty")} /> : <></>}
			/>
		</ListWrapper>
	);
};

export default PlaceScreen;