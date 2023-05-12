import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import {
	DrawerContentScrollView,
	DrawerContentComponentProps,
	DrawerItemList
} from '@react-navigation/drawer';
import {theme} from '../../styles';
import {supabase} from '../../supabase';
import {setIsAuthenticated} from '../../slices/navigation';
import {useAppDispatch} from '../../store';

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
	const dispatch = useAppDispatch();

	const logOut = async () => {
		try {
			const {error} = await supabase.auth.signOut();
			if (error) throw new Error(error.message);
			dispatch(setIsAuthenticated(false));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<DrawerContentScrollView>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>
			<TouchableOpacity
				style={styles.footer}
				activeOpacity={0.6}
				onPress={logOut}
			>
				<Text style={styles.footerLabel}>Cerrar Sesión</Text>
			</TouchableOpacity>
		</View>
	);
};

export default DrawerContent;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	footer: {
		paddingTop: 20,
		paddingLeft: 20,
		paddingBottom: Platform.OS === 'android' ? 20 : 40,
		backgroundColor: theme.color.primary
	},
	footerLabel: {
		fontSize: theme.fontSize.lg,
		color: theme.color.secondary,
		fontWeight: '500'
	}
});
