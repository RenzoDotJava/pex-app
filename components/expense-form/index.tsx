import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FormInput, Button, FormDateTimePicker, FormSelect} from '../../ui';
import type {ExpenseFormInputs, ExpenseFormProps} from '../../types/components';
import {theme} from '../../styles';

const expenseCenters = [
	{
		id: 1,
		name: 'Renzo'
	},
	{
		id: 2,
		name: 'Alimentación'
	},
	{
		id: 3,
		name: 'Efectivo'
	},
	{
		id: 4,
		name: 'Centro de gasto 4'
	},
	{
		id: 5,
		name: 'Centro de gasto 5'
	},
	{
		id: 6,
		name: 'Centro de gasto 6'
	},
	{
		id: 7,
		name: 'Centro de gasto 67'
	},
	{
		id: 8,
		name: 'Centro de gasto 68'
	}
];

const ExpenseForm: React.FC<ExpenseFormProps> = ({expense}) => {
	const {t} = useTranslation('global');
	const {
		control,
		handleSubmit,
		formState: {isValid}
	} = useForm<ExpenseFormInputs>({
		defaultValues: expense
	});

	const onSubmit: SubmitHandler<ExpenseFormInputs> = (data) => {
		console.log(data);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<View style={styles.form_group}>
					<Text>{t("forms.date")}</Text>
					<FormDateTimePicker
						name="date"
						variant="standard"
						control={control}
					/>
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
						items={expenseCenters}
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
						items={expenseCenters}
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
						items={expenseCenters}
						rules={{
							required: t("validation.required")
						}}
					/>
				</View>
				<View style={{marginTop: 15}}>
					<Button
						text={t("options.save")}
						onPress={handleSubmit(onSubmit)}
						disabled={!isValid}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ExpenseForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 20,
		backgroundColor: theme.color.secondary
	},
	form_group: {
		marginBottom: 20
	}
});
