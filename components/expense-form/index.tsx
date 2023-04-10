import {StyleSheet, Text, View} from 'react-native';
import {Input, Button, DateTimePicker, Select} from '../../ui';

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
		name: 'Centro de costo 7'
	},
	{
		id: 8,
		name: 'Centro de costo 8'
	}
]

const ExpenseForm = () => {
	return (
		<>
			<View style={styles.form_group}>
				<Text>Fecha</Text>
				{/* <Input variant="standard" /> */}
				<DateTimePicker variant="standard" />
			</View>
			<View style={styles.form_group}>
				<Text>Cantidad</Text>
				<Input variant="standard" keyboardType="numeric" />
			</View>
			<View style={styles.form_group}>
				<Text>Centro de costo</Text>
				{/* <Input variant="standard" /> */}
				<Select variant="standard" title="Centro de costo" items={costCenters}/>
			</View>
			<View style={styles.form_group}>
				<Text>Categoría</Text>
				<Input variant="standard" />
			</View>
			<View style={styles.form_group}>
				<Text>Forma de pago</Text>
				<Input variant="standard" />
			</View>
			<View style={{marginTop: 15}}>
				<Button text="Guardar" onPress={() => console.log('Guardar')} />
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
