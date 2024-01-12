import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	ActivityIndicator,
} from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';
import { FormInput, Button, FormDateTimePicker, FormSelect } from '../../ui';
import { theme } from '../../styles';
import { useGetExpenseCenters } from '../../api/expense-center';
import { useGetCategories } from '../../api/category';
import { useGetPaymentMethods } from '../../api/payment-method';
import { useGetPlaces } from '../../api/place';
import { setCategories } from '../../slices/category';
import { setPaymentMethods } from '../../slices/payment-method';
import { setPlaces } from '../../slices/place';
import { setExpenseCenters } from '../../slices/expense-center';
import { useAppDispatch, useAppSelector } from '../../store';
import type { ExpenseFormInputs, ExpenseFormProps } from '../../types/components';

const ExpenseForm: React.FC<ExpenseFormProps> = ({
	expense,
	action,
	isLoading = false
}) => {
	const { t } = useTranslation('global');
	const {
		control,
		handleSubmit,
		formState: { isValid }
	} = useForm<ExpenseFormInputs>({
		defaultValues: {
			...expense,
			date: expense?.date || moment(new Date()).format('YYYY-MM-DD'),
			categoryId: expense?.category.id,
			paymentMethodId: expense?.payment_method.id,
			expenseCenterId: expense?.expense_center.id,
			placeId: expense?.place.id,
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
	const { isLoading: isLoadingExpenseCenters } = useGetExpenseCenters({
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

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			{isLoadingCategories || isLoadingExpenseCenters || isLoadingPaymentMethods || isLoadingPlaces ?
				<View style={styles.loading}>
					<ActivityIndicator color={'black'} size={60} />
					<Text style={{ color: 'black', marginTop: 10, fontSize: 18 }}>
						Cargando
					</Text>
				</View> :
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
						<Text>{t("forms.expense-center")}</Text>
						<FormSelect
							control={control}
							name="expenseCenterId"
							variant="standard"
							title={t("forms.expense-center") as string}
							items={expenseCenters}
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
							title={t("forms.category") as string}
							items={categories}
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
							title={t("forms.payment-method") as string}
							items={paymentMethods}
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
							title={t("forms.place") as string}
							items={places}
							rules={{
								required: t("validation.required")
							}}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<Button
							text={t("options.save")}
							onPress={handleSubmit(onSubmit)}
							disabled={!isValid}
							loading={isLoading}
						/>
					</View>
				</View>}
		</TouchableWithoutFeedback>
	);
};

export default ExpenseForm;

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 20,
		backgroundColor: theme.color.secondary
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
		borderColor: theme.color.primary
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
		backgroundColor: 'white',
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
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});
