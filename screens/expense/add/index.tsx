import {
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import {ExpenseForm} from '../../../components';
import {theme} from '../../../styles';

const AddExpenseScreen = () => {
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<ExpenseForm />
			</View>
		</TouchableWithoutFeedback>
	);
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 20,
		backgroundColor: theme.color.secondary
	}
});
