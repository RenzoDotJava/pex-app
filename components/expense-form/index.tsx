import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import {FormInput, Button, FormDateTimePicker, FormSelect} from '../../ui';
import type {ExpenseFormInputs, ExpenseFormProps} from '../../types/components';
import {theme} from '../../styles';

const costCenters = [
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
		name: 'Centro de costo 4'
	},
	{
		id: 5,
		name: 'Centro de costo 5'
	},
	{
		id: 6,
		name: 'Centro de costo 6'
	},
	{
		id: 7,
		name: 'Centro de costo 67'
	},
	{
		id: 8,
		name: 'Centro de costo 68'
	}
];

const ExpenseForm: React.FC<ExpenseFormProps> = ({expense}) => {
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
					<Text>Fecha</Text>
					<FormDateTimePicker
						name="date"
						variant="standard"
						control={control}
					/>
				</View>
				<View style={styles.form_group}>
					<Text>Cantidad</Text>
					<FormInput
						control={control}
						name="amount"
						variant="standard"
						keyboardType="numeric"
						rules={{
							required: 'Campo obligatorio',
							validate: (value: number) =>
								value > 0 || 'El monto debe ser mayor a 0'
						}}
					/>
				</View>
				<View style={styles.form_group}>
					<Text>Centro de costo</Text>
					<FormSelect
						control={control}
						name="costCenterId"
						variant="standard"
						title="Centro de costo"
						items={costCenters}
						rules={{
							required: 'Campo obligatorio'
						}}
					/>
				</View>
				<View style={styles.form_group}>
					<Text>Categoría</Text>
					<FormSelect
						control={control}
						name="categoryId"
						variant="standard"
						title="Categoría"
						items={costCenters}
						rules={{
							required: 'Campo obligatorio'
						}}
					/>
				</View>
				<View style={styles.form_group}>
					<Text>Forma de pago</Text>
					<FormSelect
						control={control}
						name="paymentMethodId"
						variant="standard"
						title="Forma de pago"
						items={costCenters}
						rules={{
							required: 'Campo obligatorio'
						}}
					/>
				</View>
				<View style={styles.form_group}>
					<Text>Lugar</Text>
					<FormSelect
						control={control}
						name="placeId"
						variant="standard"
						title="Lugar"
						items={costCenters}
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
