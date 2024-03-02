import { StyleProp, ViewStyle, ModalProps as ModalRNProps } from 'react-native';
import { Control } from 'react-hook-form/dist/types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

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
	flexible?: boolean;
	onChangeText?: (text: string) => void;
};

type IconButtonProps = {
	icon: React.ReactNode;
	onPress?: () => void;
	disabled?: boolean;
	loading?: boolean;
	style?: StyleProp<ViewStyle>;
};

type ButtonProps = VariantProps & {
	text: string;
	onPress?: () => void;
	height?: number;
	disabled?: boolean;
	loading?: boolean;
	flexible?: boolean;
};

type BadgeProps = {
	text: string;
};

type CalendarProps = {
	isOpen?: boolean;
	date: string;
	onCancel?: () => void;
	onConfirm?: (date: string) => void;
};

type DateTimePickerProps = VariantProps & {
	value?: string;
	onChange?: (name: number | string) => void;
};

type SelectProps = VariantProps & {
	items: SelectItemProps[];
	selected?: SelectItemProps;
	error?: boolean;
	onChange?: (name: number | string) => void;
	onAdd?: (query?: string) => void;
};

type ModalProps = ModalRNProps & {
	title?: string;
	onRequestClose?: () => void;
};

type ItemListProps = {
	onPress?: () => void;
	name: string;
	isSelected?: boolean;
	extraData?: Object;
};

type EmptyListProps = {
	text: string;
	onPress?: () => void;
};

type SwitchProps = {
	value?: boolean;
	onChange?: (value: boolean) => void;
}

type BottomSheetProps = {
	snapPoints?: string[];
	enablePanDownToClose?: boolean;
	enableDynamicSizing?: boolean;
	children?: React.ReactNode;
	onOpen?: () => void;
	onClose?: () => void;
}

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
	EmptyListProps,
	CalendarProps,
	SwitchProps,
	BottomSheetProps
};
