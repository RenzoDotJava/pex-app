import {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../../styles';
import {ListRow, ListWrapper} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../store';
import {OnPressType} from '../../../enums';
import {onPressPlaceRow} from '../../../slices/place';
import type {PlaceProps} from '../../../types/components';
import type {ConfigParamList} from '../../../types/navigation';

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'PlaceNav'>;

const PlaceScreen: React.FC = () => {
	const dispatch = useAppDispatch();
	const {selectMode, deleteList, places} = useAppSelector(
		(state) => state.place
	);

	const navigation = useNavigation<NavigationProp>();

	const goCategoryPlace = (category: PlaceProps) => {
		navigation.navigate('PlaceNav', {
			screen: 'EditPlace',
			params: category
		});
	};

	const renderItem = useCallback(
		(item: PlaceProps) => {
			const onList = deleteList.includes(item.id);
			const backgroundColor = onList ? 'rgba(255, 0, 0, 1)' : 'transparent';

			return (
				<ListRow
					id={item.id}
					name={item.name}
					backgroundColor={backgroundColor}
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
					extraData={{selectMode, onList}}
				/>
			);
		},
		[selectMode, deleteList]
	);

	return (
		<ListWrapper
			onPressAdd={() =>
				navigation.navigate('CategoryNav', {screen: 'AddCategory'})
			}
		>
			<FlatList
				data={places}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({item}) => renderItem(item)}
			/>
		</ListWrapper>
	);
};

export default PlaceScreen;