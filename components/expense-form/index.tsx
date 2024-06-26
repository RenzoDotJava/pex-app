import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	ActivityIndicator,
	ScrollView,
	Platform,
	KeyboardAvoidingView
} from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormInput, Button, FormDateTimePicker, FormSelect, FormSwitch } from '../../ui';
import { theme } from '../../styles';
import { useGetExpenseCenters, useAddExpenseCenter } from '../../api/expense-center';
import { useAddCategory, useGetCategories } from '../../api/category';
import { useAddPaymentMethod, useGetPaymentMethods } from '../../api/payment-method';
import { useAddPlace, useGetPlaces } from '../../api/place';
import { setCategories } from '../../slices/category';
import { setPaymentMethods } from '../../slices/payment-method';
import { setPlaces } from '../../slices/place';
import { setExpenseCenters } from '../../slices/expense-center';
import { useAppDispatch, useAppSelector } from '../../store';
import { getCurrentDateToString } from '../../utils';
import type { ExpenseFormInputs, ExpenseFormProps } from '../../types/components';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';

const ExpenseForm: React.FC<ExpenseFormProps> = ({
	expense,
	action,
	isLoading = false
}) => {
	const { dismiss } = useBottomSheetModal();
	const { t } = useTranslation('global');
	const {
		control,
		handleSubmit,
		setValue,
		formState: { isValid }
	} = useForm<ExpenseFormInputs>({
		defaultValues: {
			...expense,
			date: expense?.date || getCurrentDateToString(),
			categoryId: expense?.category.id,
			paymentMethodId: expense?.payment_method.id,
			expenseCenterId: expense?.expense_center.id,
			placeId: expense?.place.id,
			remark: expense?.remark || '',
			major: expense?.major || false
		}
	});
	const { categories } = useAppSelector(
		(state) => state.category
	);
	const { expenseCenters } = useAppSelector(
		(state) => state.expenseCenter
	);
	const { places } = useAppSelector(
		(state) => state.place
	);
	const { paymentMethods } = useAppSelector(
		(state) => state.paymentMethod
	);
	const dispatch = useAppDispatch();
	const { isLoading: isLoadingCategories } = useGetCategories({
		onSuccess: (data) => {
			dispatch(setCategories(data));
		}
	});
	const { isLoading: isLoadingExpenseCenters, refetch } = useGetExpenseCenters({
		onSuccess: (data) => {
			dispatch(setExpenseCenters(data));
		}
	});
	const { isLoading: isLoadingPaymentMethods } = useGetPaymentMethods({
		onSuccess: (data) => {
			dispatch(setPaymentMethods(data));
		}
	});
	const { isLoading: isLoadingPlaces } = useGetPlaces({
		onSuccess: (data) => {
			dispatch(setPlaces(data));
		}
	});

	const onSubmit: SubmitHandler<ExpenseFormInputs> = (data) => {
		action && action(data);
	};

	/* const onSuccessAdd = (key: "expenseCenterId" | "categoryId" | "placeId" | "paymentMethodId", id: number) => {
		console.log(id)
		setValue(key, id)
		refetch()
		dismiss()
	}

	const { mutate: mutateExpenseCenter, isLoading: isLoadingAddExpenseCenter } = useAddExpenseCenter({
		onSuccess: (data) => onSuccessAdd('expenseCenterId', data.id),
		onError: (error) => {
			console.log(error.message);
		}
	});

	const { mutate: mutateCategory, isLoading: isLoadingAddCategory } = useAddCategory({
		onSuccess: (data) => onSuccessAdd('categoryId', data.id),
		onError: (error) => {
			console.log(error.message);
		}
	});

	const { mutate: mutatePaymentMethod, isLoading: isLoadingPaymentMethod } = useAddPaymentMethod({
		onSuccess: (data) => onSuccessAdd('paymentMethodId', data.id),
		onError: (error) => {
			console.log(error.message);
		}
	});

	const { mutate: mutatePlace, isLoading: isLoadingAddPlace } = useAddPlace({
		onSuccess: (data) => onSuccessAdd('placeId', data.id),
		onError: (error) => {
			console.log(error.message);
		}
	}); */

	return (
		<>
			{isLoadingCategories || isLoadingExpenseCenters || isLoadingPaymentMethods || isLoadingPlaces ?
				<View style={styles.loading}>
					<ActivityIndicator color={theme.color.primary.dark} size={60} />
					<Text style={{ color: theme.color.neutral.dark, marginTop: 10, fontSize: theme.fontSize.lg }}>
						Cargando
					</Text>
				</View> :
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<KeyboardAvoidingView style={{ flex: 1 }}
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					>
						<ScrollView style={{ flex: 1, backgroundColor: theme.color.neutral.lightest }}>
							<View style={styles.container}>
								<View style={styles.form_group}>
									<Text>{t("forms.date")}</Text>
									<FormDateTimePicker control={control} name='date' variant='standard' />
								</View>
								<View style={styles.form_group}>
									<Text>{t("forms.amount")}</Text>
									<FormInput
										control={control}
										name="amount"
										variant="standard"
										keyboardType="numeric"
										rules={{
											required: t("validation.required"),
											validate: (value: number) =>
												value > 0 || t("validation.min-num")
										}}
									/>
								</View>
								<View style={styles.form_group}>
									<Text>{t("forms.remark")}</Text>
									<FormInput
										control={control}
										name="remark"
										variant="standard"
										keyboardType="default"
										rules={{
											validate: (value: string) =>
												value.length < 200 || t("validation.max-length")
										}}
									/>
								</View>
								<View style={styles.form_group}>
									<Text>{t("forms.expense-center")}</Text>
									<FormSelect
										control={control}
										name="expenseCenterId"
										variant="standard"
										items={expenseCenters}
										/* onAdd={(q) => mutateExpenseCenter({ name: q!! })}
										addButtonIsDisabled={isLoadingAddExpenseCenter} */
										rules={{
											required: t("validation.required")
										}}
									/>
								</View>
								<View style={styles.form_group}>
									<Text>{t("forms.category")}</Text>
									<FormSelect
										control={control}
										name="categoryId"
										variant="standard"
										items={categories}
										/* onAdd={(q) => mutateCategory({ name: q!! })}
										addButtonIsDisabled={isLoadingAddCategory} */
										rules={{
											required: t("validation.required")
										}}
									/>
								</View>
								<View style={styles.form_group}>
									<Text>{t("forms.payment-method")}</Text>
									<FormSelect
										control={control}
										name="paymentMethodId"
										variant="standard"
										items={paymentMethods}
										/* onAdd={(q) => mutatePaymentMethod({ name: q!! })}
										addButtonIsDisabled={isLoadingPaymentMethod} */
										rules={{
											required: t("validation.required")
										}}
									/>
								</View>
								<View style={styles.form_group}>
									<Text>{t("forms.place")}</Text>
									<FormSelect
										control={control}
										name="placeId"
										variant="standard"
										items={places}
										/* onAdd={(q) => mutatePlace({ name: q!! })}
										addButtonIsDisabled={isLoadingAddPlace} */
										rules={{
											required: t("validation.required")
										}}
									/>
								</View>
								<View style={[styles.form_group, { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: Platform.OS === "ios" ? 15 : 10 }]}>
									<FormSwitch
										control={control}
										name="major"
									/>
									<Text>{t("forms.major")}</Text>
								</View>
								<View>
									<Button
										text={t("options.save")}
										onPress={handleSubmit(onSubmit)}
										disabled={!isValid}
										loading={isLoading}
									/>
								</View>
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			}
		</>
	);
};

export default ExpenseForm;

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: Platform.OS === 'android' ? 20 : 0
	},
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 20,
		backgroundColor: theme.color.neutral.lightest
	},
	form_group: {
		marginBottom: 20
	},
	input: {
		height: 40,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		borderColor: theme.color.primary.medium
	},
	outlined: {
		borderWidth: 1,
		borderRadius: 6,
		paddingHorizontal: 8
	},
	standard: {
		borderBottomWidth: 1
	},
	text: {
		flex: 1,
		fontSize: theme.fontSize.md
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: theme.color.neutral.lightest,
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: theme.color.neutral.lightest,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});
