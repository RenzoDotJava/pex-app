import {useState, useCallback, memo} from 'react';
import {
	Keyboard,
	StyleSheet,
	Text,
	TouchableOpacity,
	FlatList,
	View
} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {getVariantStyle} from '../../utils';
import {theme} from '../../styles';
import Modal from '../modal';
import Input from '../input';
import ItemList from '../item-list';
import type {SelectProps, SelectItemProps} from '../../types/ui';
import Button from '../button';

const Select: React.FC<SelectProps> = ({variant, title, items, name}) => {
	const [showModal, setShowModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const toggleModal = () => {
		if (!showModal) Keyboard.dismiss();
		setShowModal(!showModal);
	};

	const onChangeSearchQuery = (query: string) => {
		setSearchQuery(query);
	};

	const onRequestClose = () => {
		toggleModal();
		setSearchQuery('');
	};

	const renderItem = useCallback(
		(item: SelectItemProps) => (
			<ItemList onPress={toggleModal} name={item.name} />
		),
		[]
	);

	const ListEmptyComponent = () => (
		<View style={styles.empty_container}>
			<Text style={styles.empty_text}>No hay resultados</Text>
			<Button
				onPress={() => console.log(searchQuery)}
				text="Crear"
				height={35}
			/>
		</View>
	);

	const filteredItems =
		searchQuery.trim() !== ''
			? items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
			: items;

	return (
		<>
			<TouchableOpacity
				style={[styles.select, getVariantStyle(variant, styles)]}
				onPress={toggleModal}
			>
				<Text style={styles.text}>Valezka</Text>
				<AntDesign name="down" size={20} color={theme.color.primary} />
			</TouchableOpacity>
			<Modal visible={showModal} onRequestClose={onRequestClose} title={title}>
				<Input
					placeholder="Buscar"
					variant="standard"
					onChangeText={onChangeSearchQuery}
				/>
				<FlatList
					style={{marginTop: 8}}
					data={filteredItems}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => renderItem(item)}
					ListEmptyComponent={ListEmptyComponent}
				/>
			</Modal>
		</>
	);
};

export default Select;

const styles = StyleSheet.create({
	select: {
		flexDirection: 'row',
		height: 40,
		alignItems: 'center'
	},
	outlined: {
		borderWidth: 1,
		borderRadius: 6,
		paddingHorizontal: 8
	},
	standard: {
		borderBottomWidth: 1
	},
	text: {
		flex: 1,
		fontSize: theme.fontSize.md
	},
	empty_container: {
		gap: 15,
		paddingHorizontal: 95
	},
	empty_text: {
		textAlign: 'center',
		marginTop: 15,
		fontSize: theme.fontSize.md,
		fontWeight: '500'
	}
});
