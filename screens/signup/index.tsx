import {
	View,
	Text,
	SafeAreaView,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	StyleSheet,
	Platform,
	StatusBar
} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Button, FormInput} from '../../ui';
import {theme} from '../../styles';
import {useSignUpMutation} from '../../api/auth';
import type {RootStackParamList} from '../../types/navigation';
import type {SignUpFormInputs} from '../../types/components';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
//TODO: add toast notifications
const SignUpScreen: React.FC = () => {
	const [error, setError] = useState('');
	const navigation = useNavigation<NavigationProp>();
	const {
		control,
		handleSubmit,
		watch,
		formState: {isValid}
	} = useForm<SignUpFormInputs>();
	const signUpMutation = useSignUpMutation({
		onSuccess: () => {
			navigation.navigate('Login');
		},
		onError: (error) => {
			setError(error.message);
		}
	});

	const watchPassword = watch('password');

	const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
		signUpMutation.mutate({email: data.email, password: data.password});
	};

	return (
		<SafeAreaView style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View
					style={{
						marginTop:
							Platform.OS === 'android' ? StatusBar.currentHeight! + 100 : 110
					}}
				>
					<Text style={styles.title}>Pex</Text>
					<View style={{marginHorizontal: 48, rowGap: 20, marginTop: 15}}>
						<View>
							<Text style={styles.label}>Email</Text>
							<FormInput
								control={control}
								name="email"
								variant="standard"
								keyboardType="default"
								rules={{
									required: 'Campo obligatorio',
									pattern: {
										value:
											/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
										message: 'Email inválido'
									}
								}}
							/>
						</View>
						<View>
							<Text style={styles.label}>Contraseña</Text>
							<FormInput
								control={control}
								name="password"
								variant="standard"
								keyboardType="default"
								rules={{
									required: 'Campo obligatorio',
									validate: {
										greaterThan: (value: string) =>
											value.length >= 6 ||
											'La contraseña debe tener al menos 6 caracteres'
									}
								}}
								secureTextEntry
							/>
						</View>
						<View>
							<Text style={styles.label}>Repetir contraseña</Text>
							<FormInput
								control={control}
								name="confirmPassword"
								variant="standard"
								keyboardType="default"
								rules={{
									required: 'Campo obligatorio',
									validate: {
										areEqual: (value: string) =>
											value === watchPassword ||
											'Las contraseñas deben ser iguales'
									}
								}}
								secureTextEntry
							/>
						</View>
					</View>
					<View style={{marginHorizontal: 48, marginTop: 30}}>
						<Button
							text="Crear cuenta"
							onPress={handleSubmit(onSubmit)}
							disabled={!isValid}
							loading={signUpMutation.isLoading}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
			{error && error.trim() !== '' && (
				<View
					style={{
						borderWidth: 1,
						borderRadius: 4,
						borderColor: '#fd3d3d',
						marginHorizontal: 48,
						marginTop: 30,
						paddingVertical: 20,
						backgroundColor: '#ffe6e6'
					}}
				>
					<Text style={{textAlign: 'center', color: '#fd3d3d', lineHeight: 22}}>
						{error}
					</Text>
				</View>
			)}
			<View
				style={{
					flex: 1,
					display: 'flex',
					alignItems: 'flex-end',
					justifyContent: 'center',
					paddingBottom: 25,
					flexDirection: 'row'
				}}
			>
				<Text style={{fontSize: 16}}>¿Ya tienes una cuenta? </Text>
				<TouchableOpacity onPress={() => navigation.navigate('Login')}>
					<Text style={{fontWeight: 'bold', fontSize: 16}}>Ingresa!</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default SignUpScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	title: {
		fontSize: theme.fontSize['6xl'],
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
