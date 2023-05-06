import {
	Keyboard,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Button, FormInput} from '../../ui';
import {theme} from '../../styles';
import type {PaymentMethodFormProps, FormInputs} from '../../types/components';

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
	paymentMethod
}) => {
	const {
		control,
		handleSubmit,
		formState: {isValid}
	} = useForm<FormInputs>({
		defaultValues: paymentMethod
	});

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		console.log(data);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<View style={styles.form_group}>
					<Text>Nombre</Text>
					<FormInput
						control={control}
						name="name"
						variant="standard"
						rules={{
							required: 'Campo obligatorio'
						}}
					/>
				</View>
				<View style={{marginTop: 15}}>
					<Button
						text="Guardar"
						onPress={handleSubmit(onSubmit)}
						disabled={!isValid}
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
		backgroundColor: theme.color.secondary
	},
	form_group: {
		marginBottom: 20
	}
});
