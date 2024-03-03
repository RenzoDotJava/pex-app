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
import { Button, FormInput, ColorPicker } from '../../ui';
import { theme } from '../../styles';
import type { PaymentMethodFormProps, FormInputs } from '../../types/components';

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
	} = useForm<FormInputs>({
		defaultValues: paymentMethod
	});

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		action && action(data);
	};

	const [color, setColor] = useState('');

	const onColorChange = (color: string) => {
		console.log(color)
		setColor(color);
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
				<ColorPicker />
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
