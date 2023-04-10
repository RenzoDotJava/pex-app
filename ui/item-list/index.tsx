import {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ItemListProps} from '../../types/ui';
import {theme} from '../../styles';

const ItemList: React.FC<ItemListProps> = ({name, onPress}) => {
	return (
		<TouchableOpacity style={styles.item} onPress={onPress}>
			<Text style={styles.text}>{name}</Text>
		</TouchableOpacity>
	);
};

export default memo(ItemList);

const styles = StyleSheet.create({
	text: {
		flex: 1,
		fontSize: theme.fontSize.md
	},
	item: {
		paddingVertical: 14,
		borderBottomColor: '#e0e0e0',
		borderBottomWidth: 1
	}
});
