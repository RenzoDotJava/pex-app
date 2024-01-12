import { Alert, StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import {
	AddCategoryScreen,
	CategoryScreen,
	EditCategoryScreen
} from '../../screens/category';
import { theme } from '../../styles';
import { IconButton } from '../../ui';
import { useAppDispatch, useAppSelector } from '../../store';
import { cleanDeleteList, deleteCategories } from '../../slices/category';
import { useDeleteCategories } from '../../api/category';
import { setIsLoading } from '../../slices/navigation';
import { showAlert } from '../../utils';
import type { CategoryParamList } from '../../types/navigation';

const Stack = createNativeStackNavigator<CategoryParamList>();

const stackOptions: NativeStackNavigationOptions = {
	headerStyle: {
		backgroundColor: theme.color.primary
	},
	headerTitleStyle: {
		color: theme.color.secondary
	},
	headerTitleAlign: 'center',
	headerShadowVisible: false
};

const CategoryNavigator: React.FC = () => {
	const { t } = useTranslation('global');
	const { selectMode, deleteList } = useAppSelector((state) => state.category);
	const dispatch = useAppDispatch();
	const { mutate } = useDeleteCategories({
		onSuccess: () => {
			dispatch(deleteCategories());
			dispatch(setIsLoading(false));
		},
		onError: (error) => {
			console.log(error.message);
			dispatch(setIsLoading(false));
		}
	});

	const onDeleteCategory = () => {
		dispatch(setIsLoading(true));
		mutate(deleteList);
	};

	return (
		<Stack.Navigator initialRouteName="Category" screenOptions={stackOptions}>
			<Stack.Screen
				name="Category"
				component={CategoryScreen}
				options={({ navigation }) => ({
					headerBackVisible: false,
					headerStyle: {
						backgroundColor: !selectMode ? theme.color.primary : 'gray'
					},
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("config.category")}</Text>
					),
					headerLeft: () => (
						<IconButton
							onPress={() =>
								!selectMode ? navigation.goBack() : dispatch(cleanDeleteList())
							}
							icon={
								!selectMode ? (
									<AntDesign name="arrowleft" size={26} color="white" />
								) : (
									<Ionicons
										name={'close'}
										size={26}
										color={theme.color.secondary}
									/>
								)
							}
						/>
					),
					headerRight: () =>
						selectMode && (
							<IconButton
								onPress={() =>
									showAlert(
										t("options.delete"),
										t("options.delete-category") as string,
										[
											{
												text: t("options.cancel") as string,
												style: 'cancel'
											},
											{
												text: t("options.delete") as string,
												onPress: onDeleteCategory
											}
										]
									)
								}
								icon={
									<MaterialIcons
										name="delete"
										size={26}
										color={theme.color.secondary}
									/>
								}
							/>
						),
					animation: 'slide_from_right',
					animationTypeForReplace: 'push'
				})}
			/>
			<Stack.Screen
				name="AddCategory"
				component={AddCategoryScreen}
				options={({ navigation }) => ({
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("category.add")}</Text>
					),
					headerBackVisible: false,
					headerLeft: () => (
						<IconButton
							onPress={navigation.goBack}
							icon={<AntDesign name="arrowleft" size={24} color="white" />}
						/>
					),
					animation: 'slide_from_right',
					animationTypeForReplace: 'push'
				})}
			/>
			<Stack.Screen
				name="EditCategory"
				component={EditCategoryScreen}
				options={({ navigation }) => ({
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("category.edit")}</Text>
					),
					headerBackVisible: false,
					headerLeft: () => (
						<IconButton
							onPress={navigation.goBack}
							icon={<AntDesign name="arrowleft" size={24} color="white" />}
						/>
					),
					animation: 'slide_from_right',
					animationTypeForReplace: 'push'
				})}
			/>
		</Stack.Navigator>
	);
};

export default CategoryNavigator;

const styles = StyleSheet.create({
	headerTitle: {
		color: theme.color.secondary,
		fontSize: theme.fontSize.xl,
		fontWeight: '500'
	},
	drawerLabel: {
		fontWeight: '600',
		fontSize: theme.fontSize.md
	}
});
