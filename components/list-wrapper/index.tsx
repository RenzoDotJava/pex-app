import { StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { theme } from '../../styles';
import { IconButton } from '../../ui';
import type { ListWrapperProps } from '../../types/components';

const ListWrapper: React.FC<ListWrapperProps> = ({ children, onPressAdd }) => {
	return (
		<View style={styles.main}>
			{onPressAdd && (
				<IconButton
					onPress={onPressAdd}
					style={styles.plus}
					icon={<Entypo name="plus" size={30} color={theme.color.neutral.lightest} />}
				/>
			)}
			{children}
		</View>
	);
};

export default ListWrapper;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: theme.color.neutral.lightest
	},
	plus: {
		position: 'absolute',
		bottom: 40,
		right: 15,
		backgroundColor: theme.color.primary.medium,
		width: 55,
		height: 55,
		borderRadius: 55 / 2,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1
	}
});
