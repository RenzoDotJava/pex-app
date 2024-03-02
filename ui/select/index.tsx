import { useCallback, useRef } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	Platform,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Controller, FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearch } from '../../hooks';
import { getVariantStyle } from '../../utils';
import { theme } from '../../styles';
import ItemList from '../item-list';
import BottomSheet from '../bottom-sheet';
import type {
	SelectProps,
	SelectItemProps,
	FormControllerProps
} from '../../types/ui';
import { BottomSheetFlatList, BottomSheetModal, BottomSheetTextInput, useBottomSheetModal } from '@gorhom/bottom-sheet';
import EmptyList from '../empty-list';


const Select: React.FC<SelectProps> = ({
	variant = 'outlined',
	items,
	selected,
	error,
	onChange,
	onAdd
}) => {
	const { dismiss } = useBottomSheetModal();
	const { t } = useTranslation('global');
	const [query, handleSearch, filteredItems, clear] = useSearch(items);
	const ref = useRef<BottomSheetModal>(null);

	const snapPoints = ['60%']

	const handleSnapPress = useCallback(() => {
		ref.current?.present();
	}, []);

	//TODO: Find a way to get rid of this function
	const onPressItem = (id: number | string) => {
		onChange && onChange(id);
		dismiss();
	};

	const renderItem = useCallback(
		(item: SelectItemProps) => {
			const isSelected = item.id === selected?.id;
			return (
				<ItemList
					onPress={() => onPressItem(item.id)}
					name={item.name}
					isSelected={isSelected}
					extraData={{ selected }}
				/>
			);
		},
		[selected]
	);

	return (
		<>
			<TouchableOpacity
				style={[
					styles.select,
					getVariantStyle(variant, styles),
					{ borderColor: !error ? theme.color.neutral.dark : theme.color.error.medium }
				]}
				onPress={handleSnapPress}
			>
				<Text style={styles.text}>{selected?.name}</Text>
				<AntDesign name="down" size={20} color={theme.color.neutral.dark} />
			</TouchableOpacity>
			<BottomSheet
				ref={ref}
				snapPoints={snapPoints}
				enablePanDownToClose={true}
				onClose={clear}
			>
				{Platform.OS === 'ios' && <Text style={styles.input_label}>{t("options.search")}</Text>}
				<BottomSheetTextInput placeholder={t("options.search") as string} style={styles.input} onChangeText={handleSearch} value={query} onSubmitEditing={() => ref.current?.snapToIndex(0)} />
				<BottomSheetFlatList
					data={filteredItems}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => renderItem(item)}
					contentContainerStyle={{ marginHorizontal: 10, marginTop: 5 }}
					ListEmptyComponent={() => <EmptyList text={t("options.no-results")} onPress={() => console.log('xd')}/>}
				/* showsVerticalScrollIndicator={false} */
				/>
			</BottomSheet>
		</>
	);
};

export const FormSelect: React.FC<FormControllerProps & SelectProps> = ({
	control,
	name,
	rules,
	variant = 'outlined',
	items,
	...props
}) => {
	const renderItem = (
		value: any,
		onChange: (name: number | string) => void,
		error: FieldError | undefined
	) => {
		const selected = items.find((item) => item.id === value);

		return (
			<>
				<Select
					variant={variant}
					items={items}
					selected={selected}
					onChange={onChange}
					error={!!error}
					{...props}
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
			render={({ field: { value, onChange }, fieldState: { error } }) =>
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
		color: theme.color.error.medium,
		marginTop: 5
	},
	input_label: {
		fontSize: theme.fontSize.sm,
		marginBottom: 5,
		marginHorizontal: 10,
		fontWeight: '500'
	},
	input: {
		height: 40,
		backgroundColor: 'transparent',
		alignItems: 'center',
		flexDirection: 'row',
		borderBottomWidth: 1,
		marginHorizontal: 10
	},
	plus: {
		backgroundColor: theme.color.primary.dark,
		width: 40,
		height: 40,
		borderRadius: 40 / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
