import {StyleSheet, Text, View} from "react-native";
import Button from "../button";
import {theme} from "../../styles";
import type {EmptyListProps} from "../../types/ui";

const EmptyList: React.FC<EmptyListProps> = ({text, onPress}) => (
  <View style={styles.empty_container}>
    <Text style={styles.empty_text}>{text}</Text>
    <Button
      onPress={onPress}
      text="Crear"
      height={35}
    />
  </View>
);

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