import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Input, Button} from '../../ui';
import {theme} from '../../styles';
import type {RootStackParamList} from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
	const navigation = useNavigation<NavigationProp>();

	return (
		<SafeAreaView style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View>
					<Text style={styles.title}>Pex</Text>
					<View style={{marginHorizontal: 48, rowGap: 20, marginTop: 20}}>
						<View>
							<Text style={styles.label}>Email</Text>
							<Input placeholder={'Email'} variant="standard" />
						</View>
						<View>
							<Text style={styles.label}>Password</Text>
							<Input
								placeholder={'Password'}
								variant="standard"
								secureTextEntry
							/>
						</View>
					</View>
					<View style={{marginHorizontal: 48, marginTop: 30}}>
						<Button
							text="Ingresar"
							onPress={() =>
								navigation.navigate('Sidebar', {
									screen: 'Expense',
									params: {screen: 'Expenses'}
								})
							}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 128 //TODO: agregar el status bar height
	},
	title: {
		fontSize: theme.fontSize['5xl'],
		textAlign: 'center',
		fontWeight: 'bold',
		marginBottom: 8
	},
	label: {
		fontWeight: '500',
		fontSize: theme.fontSize.md,
		lineHeight: 24,
		marginBottom: 4
	}
});
