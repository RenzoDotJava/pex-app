import { useState } from 'react';
import {
	Keyboard,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, FormInput, FormColorPicker } from '../../ui';
import { theme } from '../../styles';
import type { PaymentMethodFormProps, FormInputs, PaymentMethodFormInputs } from '../../types/components';

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
	paymentMethod,
	action,
	isLoading = false
}) => {
	const { t } = useTranslation('global');
	const {
		control,
		handleSubmit,
		formState: { isValid }
	} = useForm<PaymentMethodFormInputs>({
		defaultValues: {
			name: paymentMethod?.name || "",
			color: paymentMethod?.color.toLocaleLowerCase() || theme.color.primary.medium
		}
	});

	const onSubmit: SubmitHandler<PaymentMethodFormInputs> = (data) => {
		action && action(data);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<View style={styles.form_group}>
					<Text>{t("forms.name")}</Text>
					<FormInput
						control={control}
						name="name"
						variant="standard"
						rules={{
							required: t("validation.required")
						}}
					/>
				</View>
				<View style={styles.form_group}>
					<Text style={{ marginBottom: 5 }}>Color</Text>
					<FormColorPicker
						control={control}
						name="color"
						variant='standard' />
				</View>
				<View style={{ marginTop: 15 }}>
					<Button
						text={t("options.save")}
						onPress={handleSubmit(onSubmit)}
						disabled={!isValid}
						loading={isLoading}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default PaymentMethodForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 20,
		backgroundColor: theme.color.neutral.lightest
	},
	form_group: {
		marginBottom: 20
	}
});
