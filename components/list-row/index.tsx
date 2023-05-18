import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ListRowProps} from '../../types/components';
import {theme} from '../../styles';

const ListRow: React.FC<ListRowProps> = ({
	name,
	backgroundColor,
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
			<Text style={{fontSize: theme.fontSize.md}}>{name}</Text>
		</TouchableOpacity>
	);
};

export default ListRow;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		paddingHorizontal: 16,
		paddingVertical: 14,
		borderBottomColor: 'gray',
		borderBottomWidth: 1
	}
});
