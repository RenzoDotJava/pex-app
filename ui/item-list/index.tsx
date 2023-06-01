import {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {ItemListProps} from '../../types/ui';
import {areEqual} from '../../utils';
import {theme} from '../../styles';

const ItemList: React.FC<ItemListProps> = ({name, onPress, isSelected}) => {
	return (
		<TouchableOpacity style={styles.item} onPress={onPress}>
			<Text style={styles.text}>{name}</Text>
			{isSelected && <AntDesign name="check" size={24} color="black" />}
		</TouchableOpacity>
	)
};

export default memo(ItemList, areEqual);

const styles = StyleSheet.create({
	text: {
		flex: 1,
		fontSize: theme.fontSize.md
	},
	item: {
		paddingVertical: 14,
		paddingRight: 10,
		borderBottomColor: '#e0e0e0',
		borderBottomWidth: 1,
		display: 'flex',
		flexDirection: 'row'
	}
});
