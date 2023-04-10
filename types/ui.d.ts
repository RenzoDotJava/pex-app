import {StyleProp, ViewStyle, ModalProps as ModalRNProps} from 'react-native';
import {Control} from 'react-hook-form/dist/types';

type FormControllerProps = {
	control: Control<any>;
	name: string;
	rules: Object;
};

type VariantProps = {
	variant?: 'outlined' | 'standard';
};

type SelectItemProps = {
	id: number;
	name: string;
};

type InputProps = VariantProps & {
	placeholder?: string;
	secureTextEntry?: boolean;
	keyboardType?: 'default' | 'numeric';
	onChangeText?: (text: string) => void;
	value?: string;
	error?: boolean;
};

type IconButtonProps = {
	icon: React.ReactNode;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
};

type ButtonProps = VariantProps & {
	text: string;
	onPress?: () => void;
	height?: number;
	disabled?: boolean;
};

type BadgeProps = {
	text: string;
};

type DateTimePickerProps = VariantProps & {
	name?: string;
};

type SelectProps = VariantProps & {
	title?: string;
	items: SelectItemProps[];
	name?: string;
};

type ModalProps = ModalRNProps & {
	title?: string;
	onRequestClose?: () => void;
};

type ItemListProps = {
	onPress?: () => void;
	name: string;
};

export {
	InputProps,
	IconButtonProps,
	ButtonProps,
	BadgeProps,
	DateTimePickerProps,
	SelectProps,
	SelectItemProps,
	ModalProps,
	ItemListProps,
	FormControllerProps
};
