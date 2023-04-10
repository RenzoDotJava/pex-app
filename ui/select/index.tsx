import {useState} from 'react';
import {
	Keyboard,
	StyleSheet,
	Text,
	TouchableOpacity,
	FlatList
} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {getVariantStyle} from '../../utils';
import {theme} from '../../styles';
import Modal from '../modal';
import type {SelectProps} from '../../types/ui';

const Select: React.FC<SelectProps> = ({variant, title, items}) => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		if (!showModal) Keyboard.dismiss();
		setShowModal(!showModal);
	};

	return (
		<>
			<TouchableOpacity
				style={[styles.select, getVariantStyle(variant, styles)]}
				onPress={toggleModal}
			>
				<Text style={styles.text}>Valezka</Text>
				<AntDesign name="down" size={20} color={theme.color.primary} />
			</TouchableOpacity>
			<Modal
				visible={showModal}
				onRequestClose={toggleModal}
				title={title}
			>
				<FlatList
					data={items}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => (
						<TouchableOpacity style={styles.item} onPress={toggleModal}>
							<Text style={styles.text}>{item.name}</Text>
						</TouchableOpacity>
					)}
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
	item: {
		paddingVertical: 14,
		borderBottomColor: "#e0e0e0",
		borderBottomWidth: 1
	}
});
