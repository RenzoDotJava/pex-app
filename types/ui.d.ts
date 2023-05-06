import {StyleProp, ViewStyle, ModalProps as ModalRNProps} from 'react-native';
import {Control} from 'react-hook-form/dist/types';

type FormControllerProps = {
	control: Control<any>;
	name: string;
	rules?: Object;
};

type VariantProps = {
	variant?: 'outlined' | 'standard';
};

type SelectItemProps = {
	id: number | string;
	name: string;
};

type InputProps = VariantProps & {
	placeholder?: string;
	secureTextEntry?: boolean;
	keyboardType?: 'default' | 'numeric';
	value?: string;
	error?: boolean;
	onChangeText?: (text: string) => void;
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
	value?: string;
	onChange?: (name: number | string) => void;
};

type SelectProps = VariantProps & {
	title?: string;
	items: SelectItemProps[];
	text?: string;
	error?: boolean;
	onChange?: (name: number | string) => void;
};

type ModalProps = ModalRNProps & {
	title?: string;
	onRequestClose?: () => void;
};

type ItemListProps = {
	onPress?: () => void;
	name: string;
	extraData?: Object;
};

type EmptyListProps = {
	text: string;
	onPress?: () => void;
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
	FormControllerProps,
	EmptyListProps
};
