import {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons';
import {IconButton} from '../../../ui';
import {theme} from '../../../styles';
import {ListRow} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../store';
import {CostCenterProps} from '../../../types/components';
import {OnPressType} from '../../../enums';
import {onPressCostCenterRow} from '../../../slices/cost-center';
import type {ConfigParamList} from '../../../types/navigation';

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'CostCenterNav'>;

const CostCenterScreen = () => {
	const dispatch = useAppDispatch();
	const {selectMode, deleteList, costsCenter} = useAppSelector((state) => state.costCenter);

	const navigation = useNavigation<NavigationProp>();

	const goCostCenterDetail = (costCenter: CostCenterProps) => {
		navigation.navigate('CostCenterNav', {screen: 'EditCostCenter', params: costCenter});
	};

	const renderItem = useCallback(
		(item: CostCenterProps) => {
			const onList = deleteList.includes(item.id);
			const backgroundColor = onList ? 'rgba(255, 0, 0, 1)' : 'transparent';

			return (
				<ListRow
					id={item.id}
					name={item.name}
					backgroundColor={backgroundColor}
					onPress={() =>
						dispatch(
							onPressCostCenterRow(
								selectMode,
								onList,
								item.id,
								OnPressType.Normal,
								() => goCostCenterDetail(item)
							)
						)
					}
					onLongPress={() =>
						dispatch(
							onPressCostCenterRow(selectMode, onList, item.id, OnPressType.Long)
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
					navigation.navigate('CostCenterNav', {screen: 'AddCostCenter'})
				}
				style={styles.plus}
				icon={<Entypo name="plus" size={30} color={theme.color.secondary} />}
			/>
			<FlatList
				data={costsCenter}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({item}) => renderItem(item)}
			/>
		</View>
	);
};

export default CostCenterScreen;

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
