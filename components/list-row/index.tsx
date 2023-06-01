import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {ListRowProps} from '../../types/components';
import {theme} from '../../styles';

const ListRow: React.FC<ListRowProps> = ({
	name,
	backgroundColor,
	isSelected,
	onPress,
	onLongPress
}) => {
	return (
		<TouchableOpacity
			style={[styles.container, {backgroundColor}]}
			activeOpacity={0.5}
			onPress={onPress}
			onLongPress={onLongPress}
			delayLongPress={400}
		>
			<Text style={styles.text}>{name}</Text>
			{isSelected && <AntDesign name="check" size={24} color="black" />}
		</TouchableOpacity>
	);
};

export default ListRow;

const styles = StyleSheet.create({
	text: {
		flex: 1,
		fontSize: theme.fontSize.md
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		paddingHorizontal: 16,
		paddingVertical: 14,
		borderBottomColor: 'gray',
		borderBottomWidth: 1
	}
});
