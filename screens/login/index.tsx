import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	Platform,
	StatusBar
} from 'react-native';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Button, FormInput} from '../../ui';
import {theme} from '../../styles';
import {useSignInMutation} from '../../api/auth';
import {setIsAuthenticated} from '../../slices/navigation';
import {useAppDispatch} from '../../store';
import type {RootStackParamList} from '../../types/navigation';
import type {SignInFormInputs} from '../../types/components';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
	const {t} = useTranslation("global");
	const dispatch = useAppDispatch();
	const [error, setError] = useState('');
	const navigation = useNavigation<NavigationProp>();

	const {mutate, isLoading} = useSignInMutation({
		onSuccess: () => {
			dispatch(setIsAuthenticated(true));
		},
		onError: (error) => {
			setError(error.message);
		}
	});

	const {control, handleSubmit} = useForm<SignInFormInputs>();

	const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
		Keyboard.dismiss();
		mutate({email: data.email, password: data.password});
	};

	return (
		<SafeAreaView style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View
					style={{
						marginTop:
							Platform.OS === 'android' ? StatusBar.currentHeight! + 90 : 140
					}}
				>
					<Text style={styles.title}>Pex</Text>
					<View style={{marginHorizontal: 48, rowGap: 20, marginTop: 20}}>
						<View>
							<Text style={styles.label}>{t("login.email")}</Text>
							<FormInput
								control={control}
								name="email"
								variant="standard"
								keyboardType="default"
								rules={{
									required: t("validation.required"),
									pattern: {
										value:
											/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
										message: t("validation.email")
									}
								}}
							/>
						</View>
						<View>
							<Text style={styles.label}>{t("login.password")}</Text>
							<FormInput
								control={control}
								name="password"
								variant="standard"
								keyboardType="default"
								rules={{
									required: t("validation.required")
								}}
								secureTextEntry
							/>
						</View>
					</View>
					<View style={{marginHorizontal: 48, marginTop: 30}}>
						<Button
							text={t("login.login")}
							onPress={handleSubmit(onSubmit)}
							loading={isLoading}
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
				<Text style={{fontSize: 16}}>{t("login.no-account")} </Text>
				<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
					<Text style={{fontWeight: 'bold', fontSize: 16}}>{t("login.signup")}</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1
		//paddingTop: 128
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
