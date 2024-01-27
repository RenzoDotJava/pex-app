import {
	View,
	Text,
	SafeAreaView,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	StyleSheet,
	Platform,
	StatusBar,
	Image
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, FormInput } from '../../ui';
import { theme } from '../../styles';
import { useSignUpMutation } from '../../api/auth';
import { showAlert } from '../../utils';
import type { RootStackParamList } from '../../types/navigation';
import type { SignUpFormInputs } from '../../types/components';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = () => {
	const { t } = useTranslation("global");
	const [error, setError] = useState('');
	const navigation = useNavigation<NavigationProp>();
	const { control, handleSubmit, watch } = useForm<SignUpFormInputs>();
	const { mutate, isLoading } = useSignUpMutation({
		onSuccess: () => {
			showAlert('Info', t("signup.success"), [
				{
					text: t("options.confirm") as string
				}
			]);
		},
		onError: (error) => {
			setError(error.message);
		}
	});

	const watchPassword = watch('password');

	const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
		Keyboard.dismiss();
		mutate({ email: data.email, password: data.password });
	};

	return (
		<SafeAreaView style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View
					style={{
						marginTop:
							Platform.OS === 'android' ? StatusBar.currentHeight! + 100 : 130
					}}
				>
					<Image
						source={require('../../assets/pex-high-resolution-logo-transparent.png')}
						style={{ width: 200, height: 100, alignSelf: 'center' }}
					/>
					<View style={{ marginHorizontal: 48, rowGap: 20, marginTop: 40 }}>
						<View>
							<Text style={styles.label}>{t("signup.email")}</Text>
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
							<Text style={styles.label}>{t("signup.password")}</Text>
							<FormInput
								control={control}
								name="password"
								variant="standard"
								keyboardType="default"
								rules={{
									required: t("validation.required"),
									validate: {
										greaterThan: (value: string) =>
											value.length >= 6 || t("validation.create-password")
									}
								}}
								secureTextEntry
							/>
						</View>
						<View>
							<Text style={styles.label}>{t("signup.confirm-password")}</Text>
							<FormInput
								control={control}
								name="confirmPassword"
								variant="standard"
								keyboardType="default"
								rules={{
									required: t("validation.required"),
									validate: {
										areEqual: (value: string) =>
											value === watchPassword || t("validation.equal-passoword")
									}
								}}
								secureTextEntry
							/>
						</View>
					</View>
					<View style={{ marginHorizontal: 48, marginTop: 30 }}>
						<Button
							text={t("signup.create")}
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
					<Text style={{ textAlign: 'center', color: '#fd3d3d', lineHeight: 22 }}>
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
				<Text style={{ fontSize: theme.fontSize.md, color: theme.color.neutral.dark }}>{t("signup.already-account")} </Text>
				<TouchableOpacity onPress={() => navigation.navigate('Login')}>
					<Text style={{ fontWeight: 'bold', fontSize: theme.fontSize.md, color: theme.color.neutral.dark }}>{t("signup.login")}</Text>
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
		color: theme.color.primary.dark,
		textAlign: 'center',
		fontWeight: 'bold',
		marginBottom: 8
	},
	label: {
		fontWeight: '500',
		fontSize: theme.fontSize.md,
		lineHeight: 24,
		marginBottom: 4,
		color: theme.color.neutral.dark
	}
});
