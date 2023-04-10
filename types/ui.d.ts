import {StyleProp, ViewStyle, ModalProps as ModalRNProps} from 'react-native';

type VariantProps = {
	variant?: 'outlined' | 'standard';
};

type SelectItemProps = {
	id: number;
	name: string;
}

type InputProps = VariantProps & {
	placeholder?: string;
	secureTextEntry?: boolean;
	keyboardType?: 'default' | 'numeric';
};

type IconButtonProps = {
	icon: React.ReactNode;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
};

type ButtonProps = VariantProps & {
	text: string;
	onPress?: () => void;
};

type BadgeProps = {
	text: string;
};

type DateTimePickerProps = VariantProps & {};

type SelectProps = VariantProps & {
	title?: string;
	items: SelectItemProps[];
};

type ModalProps = ModalRNProps & {
	title?: string;
	onRequestClose?: () => void;
}

export {
	InputProps,
	IconButtonProps,
	ButtonProps,
	BadgeProps,
	DateTimePickerProps,
	SelectProps,
	ModalProps
};
