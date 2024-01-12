import { Alert, StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import {
	AddPaymentMethodScreen,
	EditPaymentMethodScreen,
	PaymentMethodScreen
} from '../../screens/payment-method';
import { theme } from '../../styles';
import { IconButton } from '../../ui';
import { useAppDispatch, useAppSelector } from '../../store';
import { useDeletePaymentMethods } from '../../api/payment-method';
import { cleanDeleteList, deletePaymentMethods } from '../../slices/payment-method';
import { setIsLoading } from '../../slices/navigation';
import type { PaymentMethodParamList } from '../../types/navigation';
import { showAlert } from '../../utils';

const Stack = createNativeStackNavigator<PaymentMethodParamList>();

const stackOptions: NativeStackNavigationOptions = {
	headerStyle: {
		backgroundColor: theme.color.primary
	},
	headerTitleStyle: {
		color: theme.color.secondary
	},
	headerTitleAlign: 'center',
	headerShadowVisible: false
};

const PaymentMethodNavigator: React.FC = () => {
	const { t } = useTranslation('global');
	const { selectMode, deleteList } = useAppSelector((state) => state.paymentMethod);
	const dispatch = useAppDispatch();
	const { mutate } = useDeletePaymentMethods({
		onSuccess: () => {
			dispatch(deletePaymentMethods());
			dispatch(setIsLoading(false));
		},
		onError: (error) => {
			console.log(error.message);
			dispatch(setIsLoading(false));
		}
	});

	const onDeletePaymentMethod = () => {
		dispatch(setIsLoading(true));
		mutate(deleteList);
	};

	return (
		<Stack.Navigator
			initialRouteName="PaymentMethod"
			screenOptions={stackOptions}
		>
			<Stack.Screen
				name="PaymentMethod"
				component={PaymentMethodScreen}
				options={({ navigation }) => ({
					headerBackVisible: false,
					headerStyle: {
						backgroundColor: !selectMode ? theme.color.primary : 'gray'
					},
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("config.payment-method")}</Text>
					),
					headerLeft: () => (
						<IconButton
							onPress={() =>
								!selectMode ? navigation.goBack() : dispatch(cleanDeleteList())
							}
							icon={
								!selectMode ? (
									<AntDesign name="arrowleft" size={26} color="white" />
								) : (
									<Ionicons
										name={'close'}
										size={26}
										color={theme.color.secondary}
									/>
								)
							}
						/>
					),
					headerRight: () =>
						selectMode && (
							<IconButton
								onPress={() =>
									showAlert(
										t("options.delete"),
										t("options.delete-payment-method") as string,
										[
											{
												text: t("options.cancel") as string,
												style: 'cancel'
											},
											{
												text: t("options.delete") as string,
												onPress: onDeletePaymentMethod
											}
										]
									)
								}
								icon={
									<MaterialIcons
										name="delete"
										size={26}
										color={theme.color.secondary}
									/>
								}
							/>
						),
					animation: 'slide_from_right',
					animationTypeForReplace: 'push'
				})}
			/>
			<Stack.Screen
				name="AddPaymentMethod"
				component={AddPaymentMethodScreen}
				options={({ navigation }) => ({
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("payment-method.add")}</Text>
					),
					headerBackVisible: false,
					headerLeft: () => (
						<IconButton
							onPress={navigation.goBack}
							icon={<AntDesign name="arrowleft" size={24} color="white" />}
						/>
					),
					animation: 'slide_from_right',
					animationTypeForReplace: 'push'
				})}
			/>
			<Stack.Screen
				name="EditPaymentMethod"
				component={EditPaymentMethodScreen}
				options={({ navigation }) => ({
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("payment-method.edit")}</Text>
					),
					headerBackVisible: false,
					headerLeft: () => (
						<IconButton
							onPress={navigation.goBack}
							icon={<AntDesign name="arrowleft" size={24} color="white" />}
						/>
					),
					animation: 'slide_from_right',
					animationTypeForReplace: 'push'
				})}
			/>
		</Stack.Navigator>
	);
};

export default PaymentMethodNavigator;

const styles = StyleSheet.create({
	headerTitle: {
		color: theme.color.secondary,
		fontSize: theme.fontSize.xl,
		fontWeight: '500'
	},
	drawerLabel: {
		fontWeight: '600',
		fontSize: theme.fontSize.md
	}
});
