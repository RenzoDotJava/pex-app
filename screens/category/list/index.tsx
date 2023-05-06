import {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons';
import {IconButton} from '../../../ui';
import {theme} from '../../../styles';
import {ListRow} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../store';
import {OnPressType} from '../../../enums';
import {onPressCategoryRow} from '../../../slices/category';
import type {CategoryProps} from '../../../types/components';
import type {ConfigParamList} from '../../../types/navigation';

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'CategoryNav'>;

const CategoryScreen = () => {
	const dispatch = useAppDispatch();
	const {selectMode, deleteList, categories} = useAppSelector(
		(state) => state.category
	);

	const navigation = useNavigation<NavigationProp>();

	const goCategoryDetail = (category: CategoryProps) => {
		navigation.navigate('CategoryNav', {
			screen: 'EditCategory',
			params: category
		});
	};

	const renderItem = useCallback(
		(item: CategoryProps) => {
			const onList = deleteList.includes(item.id);
			const backgroundColor = onList ? 'rgba(255, 0, 0, 1)' : 'transparent';

			return (
				<ListRow
					id={item.id}
					name={item.name}
					backgroundColor={backgroundColor}
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
					extraData={{selectMode, onList}}
				/>
			);
		},
		[selectMode, deleteList]
	);

	return (
		<View style={styles.main}>
			<IconButton
				onPress={() =>
					navigation.navigate('CategoryNav', {screen: 'AddCategory'})
				}
				style={styles.plus}
				icon={<Entypo name="plus" size={30} color={theme.color.secondary} />}
			/>
			<FlatList
				data={categories}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({item}) => renderItem(item)}
			/>
		</View>
	);
};

export default CategoryScreen;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: theme.color.secondary
	},
	plus: {
		position: 'absolute',
		bottom: 40,
		right: 15,
		backgroundColor: theme.color.primary,
		width: 55,
		height: 55,
		borderRadius: 55 / 2,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1
	}
});
