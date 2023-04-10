import {StyleSheet, Text, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {IconButton} from '../../ui';
import {theme} from '../../styles';

const DateNavigator: React.FC = () => {
	return (
		<View style={styles.container}>
			<IconButton
				icon={<AntDesign name="left" size={26} color={theme.color.secondary} />}
			/>
			<Text style={styles.label}>4 de abril de 2023</Text>
			<IconButton
				icon={
					<AntDesign name="right" size={26} color={theme.color.secondary} />
				}
			/>
		</View>
	);
};

export default DateNavigator;

const styles = StyleSheet.create({
	container: {
		height: 45,
		backgroundColor: theme.color.primary,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 12
	},
	label: {
		color: theme.color.secondary,
		fontSize: theme.fontSize.md
	}
});
