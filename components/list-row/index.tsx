import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ListRowProps } from '../../types/components';
import { theme } from '../../styles';

const ListRow: React.FC<ListRowProps> = ({
	name,
	backgroundColor,
	isSelected,
	selectMode,
	onList,
	onPress,
	onLongPress
}) => {
	return (
		<TouchableOpacity
			style={[styles.container, { backgroundColor }]}
			activeOpacity={0.5}
			onPress={onPress}
			onLongPress={onLongPress}
			delayLongPress={400}
		>
			{selectMode && (<View style={{ justifyContent: 'center', marginRight: 12 }}>
				<View style={styles.check}>
					{onList && <AntDesign name="check" size={14} color={theme.color.primary.dark} />}
				</View>
			</View>)}
			<Text style={styles.text}>{name}</Text>
			{isSelected && <AntDesign name="check" size={24} color={theme.color.neutral.dark} />}
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
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 16,
		borderBottomColor: theme.color.neutral.medium,
		borderBottomWidth: 1
	},
	check: {
		width: 22,
		height: 22,
		borderRadius: 22 / 2,
		borderWidth: 2,
		borderColor: theme.color.primary.dark,
		alignItems: 'center',
		justifyContent: 'center',
	}
});
