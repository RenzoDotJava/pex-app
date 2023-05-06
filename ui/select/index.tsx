import {useCallback} from 'react';
import {
	Keyboard,
	StyleSheet,
	Text,
	TouchableOpacity,
	FlatList
} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {Controller, FieldError} from 'react-hook-form';
import {useToggle, useSearch} from '../../hooks';
import {getVariantStyle} from '../../utils';
import {theme} from '../../styles';
import Modal from '../modal';
import Input from '../input';
import ItemList from '../item-list';
import EmptyList from '../empty-list';
import type {
	SelectProps,
	SelectItemProps,
	FormControllerProps
} from '../../types/ui';

const Select: React.FC<SelectProps> = ({
	variant = 'outlined',
	title,
	items,
	text,
	error,
	onChange
}) => {
	const [query, handleSearch, filteredItems] = useSearch(items);
	const [isOpen, toggler] = useToggle({onClose: () => Keyboard.dismiss()});

	//TODO: Find a way to get rid of this function
	const onPressItem = (id: number | string) => {
		onChange && onChange(id);
		toggler();
	};

	const renderItem = useCallback(
		(item: SelectItemProps) => (
			<ItemList
				onPress={() => onPressItem(item.id)}
				name={item.name}
				extraData={{isOpen}}
			/>
		),
		[isOpen]
	);

	return (
		<>
			<TouchableOpacity
				style={[
					styles.select,
					getVariantStyle(variant, styles),
					{borderColor: !error ? theme.color.primary : theme.color.error}
				]}
				onPress={toggler}
			>
				<Text style={styles.text}>{text}</Text>
				<AntDesign name="down" size={20} color={theme.color.primary} />
			</TouchableOpacity>
			<Modal visible={isOpen} onRequestClose={toggler} title={title}>
				<Input
					placeholder="Buscar"
					variant="standard"
					onChangeText={handleSearch}
					value={query}
				/>
				<FlatList
					style={{marginTop: 8}}
					data={filteredItems}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => renderItem(item)}
					ListEmptyComponent={<EmptyList text="No hay resultados" />}
				/>
			</Modal>
		</>
	);
};

export const FormSelect: React.FC<FormControllerProps & SelectProps> = ({
	control,
	name,
	rules,
	variant = 'outlined',
	title,
	items
}) => {
	const renderItem = (
		value: any,
		onChange: (name: number | string) => void,
		error: FieldError | undefined
	) => {
		const item = items.find((item) => item.id === value);

		return (
			<>
				<Select
					variant={variant}
					title={title}
					items={items}
					text={item?.name}
					onChange={onChange}
					error={!!error}
				/>
				{error && <Text style={styles.text_error}>{error.message}</Text>}
			</>
		);
	};

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({field: {value, onChange}, fieldState: {error}}) =>
				renderItem(value, onChange, error)
			}
		/>
	);
};

export default Select;

const styles = StyleSheet.create({
	select: {
		flexDirection: 'row',
		height: 40,
		alignItems: 'center'
	},
	outlined: {
		borderWidth: 1,
		borderRadius: 6,
		paddingHorizontal: 8
	},
	standard: {
		borderBottomWidth: 1
	},
	text: {
		flex: 1,
		fontSize: theme.fontSize.md
	},
	empty_container: {
		gap: 15,
		paddingHorizontal: 95
	},
	empty_text: {
		textAlign: 'center',
		marginTop: 15,
		fontSize: theme.fontSize.md,
		fontWeight: '500'
	},
	text_error: {
		color: theme.color.error,
		marginTop: 5
	}
});
