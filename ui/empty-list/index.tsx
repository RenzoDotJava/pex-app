import {StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import Button from "../button";
import {theme} from "../../styles";
import type {EmptyListProps} from "../../types/ui";

const EmptyList: React.FC<EmptyListProps> = ({text, onPress}) => {
	const {t} = useTranslation('global');
	return (
		<View style={styles.empty_container}>
			<Text style={styles.empty_text}>{text}</Text>
			{onPress &&
				<Button
					onPress={onPress}
					text={t("options.create")}
					height={35}
				/>}
		</View>
	)
};

export default EmptyList;

const styles = StyleSheet.create({
	empty_container: {
		gap: 15,
		paddingHorizontal: 95
	},
	empty_text: {
		textAlign: 'center',
		marginTop: 15,
		fontSize: theme.fontSize.md,
		fontWeight: '500'
	}
});