import moment from 'moment-timezone';
import { Alert, AlertButton } from 'react-native';
import Toast from 'react-native-root-toast';
import { theme } from '../styles';

export const getVariantStyle = (
	variant: 'outlined' | 'standard' | undefined,
	styles: any
) => {
	switch (variant) {
		case 'outlined':
			return styles.outlined;
		case 'standard':
			return styles.standard;
		default:
			return styles.outlined;
	}
};

export const areEqual = (prevProps: any, nextProps: any): boolean => {
	const { extraData } = nextProps;
	const { extraData: prevExtraData } = prevProps;

	//TODO: use lodash or some object comparator in order to do a correct comparison
	const isEqual = JSON.stringify(extraData) === JSON.stringify(prevExtraData);

	return isEqual;
};

//TODO: use a better error parser, maybe use status code instead of the message
export const parseSupabaseError = (message: string) => {
	switch (message) {
		case 'Password should be at least 6 characters':
			return 'La contraseña debe tener al menos 6 caracteres';
		case 'User already registered':
			return 'El usuario ya está registrado';
		case 'Invalid login credentials':
			return 'Credenciales inválidas';
		default:
			return message;
	}
};

export const showAlert = (
	title: string,
	message: string,
	buttons: AlertButton[]
) => {
	Alert.alert(title, message, buttons);
};

export const padNumber = (number: number, size: number) => {
	let s = String(number);
	while (s.length < (size || 2)) {
		s = '0' + s;
	}
	return s;
}

export const getCurrentDateToString = () => moment(new Date()).format('YYYY-MM-DD')

export const getDate = (date: string | undefined) => {
	//When you are getting the new Date(), is not necessary to add the offset
	//When you are setting the date using new Date('YYYY-mm-dd'), you need to add the offset
	const newDate = new Date(date!!);
	newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset())
	return newDate;
}

export const showToast = (message: string = '', toastDuration: 'short' | 'long' = 'long', variant: 'default' | 'error') => {

	let backgroundColor = '';

	switch (variant) {
		case 'error':
			backgroundColor = theme.color.error.medium;
			break;
		default:
			backgroundColor = theme.color.neutral.darkest;
			break;
	}

	Toast.show(message, {
		duration: toastDuration === 'long' ? Toast.durations.LONG : Toast.durations.SHORT,
		position: Toast.positions.TOP,
		backgroundColor: backgroundColor,
		shadowColor: backgroundColor,
		shadow: true,
		animation: true,
		hideOnPress: true,
		delay: 0,
	});
}