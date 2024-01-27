import { Alert, StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import {
	AddPlaceScreen,
	PlaceScreen,
	EditPlaceScreen
} from '../../screens/place';
import { theme } from '../../styles';
import { IconButton } from '../../ui';
import { useAppDispatch, useAppSelector } from '../../store';
import { useDeletePlaces } from '../../api/place';
import { deletePlaces, cleanDeleteList } from '../../slices/place';
import { setIsLoading } from '../../slices/navigation';
import { showAlert } from '../../utils';
import type { PlaceParamList } from '../../types/navigation';

const Stack = createNativeStackNavigator<PlaceParamList>();

const stackOptions: NativeStackNavigationOptions = {
	headerStyle: {
		backgroundColor: theme.color.primary.medium
	},
	headerTitleStyle: {
		color: theme.color.neutral.lightest
	},
	headerTitleAlign: 'center',
	headerShadowVisible: false
};

const PlaceNavigator: React.FC = () => {
	const { t } = useTranslation('global');
	const { selectMode, deleteList } = useAppSelector((state) => state.place);
	const dispatch = useAppDispatch();
	const { mutate } = useDeletePlaces({
		onSuccess: () => {
			dispatch(deletePlaces());
			dispatch(setIsLoading(false));
		},
		onError: (error) => {
			console.log(error.message);
			dispatch(setIsLoading(false));
		}
	});

	const onDeletePlace = () => {
		dispatch(setIsLoading(true));
		mutate(deleteList);
	};

	return (
		<Stack.Navigator initialRouteName="Place" screenOptions={stackOptions}>
			<Stack.Screen
				name="Place"
				component={PlaceScreen}
				options={({ navigation }) => ({
					headerBackVisible: false,
					headerStyle: {
						backgroundColor: !selectMode ? theme.color.primary.medium : theme.color.primary.darkest
					},
					headerTitle: () => <Text style={styles.headerTitle}>{t("config.place")}</Text>,
					headerLeft: () => (
						<IconButton
							onPress={() =>
								!selectMode ? navigation.goBack() : dispatch(cleanDeleteList())
							}
							icon={
								!selectMode ? (
									<AntDesign name="arrowleft" size={26} color={theme.color.neutral.lightest} />
								) : (
									<Ionicons
										name={'close'}
										size={26}
										color={theme.color.neutral.lightest}
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
										t("options.delete-place") as string,
										[
											{
												text: t("options.cancel") as string,
												style: 'cancel'
											},
											{
												text: t("options.delete") as string,
												onPress: onDeletePlace
											}
										]
									)
								}
								icon={
									<MaterialIcons
										name="delete"
										size={26}
										color={theme.color.neutral.lightest}
									/>
								}
							/>
						),
					animation: 'slide_from_right',
					animationTypeForReplace: 'push'
				})}
			/>
			<Stack.Screen
				name="AddPlace"
				component={AddPlaceScreen}
				options={({ navigation }) => ({
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("place.add")}</Text>
					),
					headerBackVisible: false,
					headerLeft: () => (
						<IconButton
							onPress={navigation.goBack}
							icon={<AntDesign name="arrowleft" size={24} color={theme.color.neutral.lightest} />}
						/>
					),
					animation: 'slide_from_right',
					animationTypeForReplace: 'push'
				})}
			/>
			<Stack.Screen
				name="EditPlace"
				component={EditPlaceScreen}
				options={({ navigation }) => ({
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("place.edit")}</Text>
					),
					headerBackVisible: false,
					headerLeft: () => (
						<IconButton
							onPress={navigation.goBack}
							icon={<AntDesign name="arrowleft" size={24} color={theme.color.neutral.lightest} />}
						/>
					),
					animation: 'slide_from_right',
					animationTypeForReplace: 'push'
				})}
			/>
		</Stack.Navigator>
	);
};

export default PlaceNavigator;

const styles = StyleSheet.create({
	headerTitle: {
		color: theme.color.neutral.lightest,
		fontSize: theme.fontSize.xl,
		fontWeight: '500'
	},
	drawerLabel: {
		fontWeight: '600',
		fontSize: theme.fontSize.md
	}
});
