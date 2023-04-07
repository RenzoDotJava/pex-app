import type {RootState} from "../../store";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import {findExpenseInDeleteList} from "../../slices/expense";
import Badge from "../../ui/badge";
import {theme} from "../../styles";

type ExpenseRowProps = {
	id: number;
	costCenter: string;
	category: string;
	place: string;
	paymentMethod: string;
	amount: number;
	onPress: (onList: boolean, id: number, type: "normal" | "long") => void;
};

const ExpenseRow: React.FC<ExpenseRowProps> = ({
	id,
	costCenter,
	category,
	place,
	paymentMethod,
	amount,
	onPress
}) => {
	const onList = useSelector((state: RootState) =>
		findExpenseInDeleteList(state, id)
	);

	return (
		<TouchableOpacity
			style={[
				styles.container,
				{backgroundColor: onList ? "red" : "transparent"}
			]}
			activeOpacity={0.5}
			onPress={() => onPress(onList, id, "normal")}
			onLongPress={() => onPress(onList, id, "long")}
			delayLongPress={400}
		>
			<View style={styles.container_left}>
				<Text style={styles.cost_center}>{costCenter}</Text>
				<Text style={styles.info}>
					{category} • {place}
				</Text>
			</View>
			<View style={styles.container_right}>
				<Badge text={paymentMethod} />
				<Text style={styles.amount}>S/. {amount.toFixed(2)}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ExpenseRow;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderBottomColor: "gray",
		borderBottomWidth: 1
	},
	container_left: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		gap: 1
	},
	container_right: {
		justifyContent: "center",
		alignItems: "flex-end",
		gap: 8
	},
	cost_center: {
		fontSize: theme.fontSize.lg,
		fontWeight: "500"
	},
	info: {
		fontSize: theme.fontSize.sm
	},
	amount: {
		fontSize: theme.fontSize["xl"],
		fontWeight: "600"
	}
});
