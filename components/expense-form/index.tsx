import {StyleSheet, Text, View} from 'react-native';
import {SubmitHandler, useForm} from 'react-hook-form';
import {FormInput, Button, DateTimePicker, Select} from '../../ui';
import type {ExpenseFormInputs} from '../../types/components';

const costCenters = [
	{
		id: 1,
		name: 'Centro de costo 1'
	},
	{
		id: 2,
		name: 'Centro de costo 2'
	},
	{
		id: 3,
		name: 'Centro de costo 3'
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

const ExpenseForm = () => {
	const {
		control,
		handleSubmit,
		formState: {isValid}
	} = useForm<ExpenseFormInputs>();

	const onSubmit: SubmitHandler<ExpenseFormInputs> = (data) => {
		console.log(data);
	};

	return (
		<>
			<View style={styles.form_group}>
				<Text>Fecha</Text>
				<DateTimePicker name="date" variant="standard" />
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
				<Select
					name="costCenter"
					variant="standard"
					title="Centro de costo"
					items={costCenters}
				/>
			</View>
			<View style={styles.form_group}>
				<Text>Categoría</Text>
				<Select
					name="category"
					variant="standard"
					title="Categoría"
					items={costCenters}
				/>
			</View>
			<View style={styles.form_group}>
				<Text>Forma de pago</Text>
				<Select
					name="paymentMethod"
					variant="standard"
					title="Forma de pago"
					items={costCenters}
				/>
			</View>
			<View style={{marginTop: 15}}>
				<Button
					text="Guardar"
					onPress={handleSubmit(onSubmit)}
					disabled={!isValid}
				/>
			</View>
		</>
	);
};

export default ExpenseForm;

const styles = StyleSheet.create({
	form_group: {
		marginBottom: 20
	}
});
