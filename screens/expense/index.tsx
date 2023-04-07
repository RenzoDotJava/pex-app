import type {RootState} from "../../store";
import {StyleSheet, View, Text, FlatList} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {Entypo} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {SidebarDrawerParamList} from "../../types/navigation";
import {IconButton} from "../../ui";
import {DateNavigator, ExpenseRow} from "../../components";
import {
	setSelectMode,
	addToDeleteList,
	deleteFromDeleteList
} from "../../slices/expense";

const list = [
	{
		id: 1,
		costCenter: "Micaela",
		category: "Salud",
		place: "San Judas Mateo",
		paymentMethod: "Crédito",
		amount: 100
	},
	{
		id: 2,
		costCenter: "Renzo",
		category: "Alimentación",
		place: "Quiosco",
		paymentMethod: "Efectivo",
		amount: 0.8
	},
	{
		id: 3,
		costCenter: "Valezka",
		category: "Ropa",
		place: "H&M",
		paymentMethod: "Débito",
		amount: 200
	},
	{
		id: 4,
		costCenter: "Valezka",
		category: "Ropa",
		place: "H&M",
		paymentMethod: "Débito",
		amount: 200
	},
	{
		id: 5,
		costCenter: "Valezka",
		category: "Ropa",
		place: "H&M",
		paymentMethod: "Débito",
		amount: 200
	},
	{
		id: 6,
		costCenter: "Valezka",
		category: "Ropa",
		place: "H&M",
		paymentMethod: "Débito",
		amount: 200
	},
	{
		id: 7,
		costCenter: "Valezka",
		category: "Ropa",
		place: "H&M",
		paymentMethod: "Débito",
		amount: 200
	},
	{
		id: 8,
		costCenter: "Valezka",
		category: "Ropa",
		place: "H&M",
		paymentMethod: "Débito",
		amount: 200
	},
	{
		id: 9,
		costCenter: "Valezka",
		category: "Ropa",
		place: "H&M",
		paymentMethod: "Débito",
		amount: 200
	},
	{
		id: 10,
		costCenter: "Valezka",
		category: "Ropa",
		place: "H&M",
		paymentMethod: "Débito",
		amount: 200
	},
	{
		id: 11,
		costCenter: "Valezka",
		category: "Ropa",
		place: "H&M",
		paymentMethod: "Débito",
		amount: 200
	}
];

type NavigationProp = DrawerNavigationProp<SidebarDrawerParamList, "Expense">;

const ExpenseScreen: React.FC = () => {
	const dispatch = useDispatch();
	const {selectMode} = useSelector((state: RootState) => state.expense);
	const navigation = useNavigation<NavigationProp>();

	const onPress = (onList: boolean, id: number, type: "normal" | "long") => {
		if (selectMode) {
			if (onList) {
				dispatch(deleteFromDeleteList(id));
			} else {
				dispatch(addToDeleteList(id));
			}
		} else {
			if (type === "long") {
				dispatch(setSelectMode(true));
				dispatch(addToDeleteList(id));
			} else if (type === "normal") {
				//TODO: navigate to expense detail
				//navigation.navigate("ExpenseDetail", {id});
			}
		}
	};

	/* const onLongPress = (onList: boolean, id: number) => {
		if (selectMode) {
			if (onList) {
				dispatch(deleteFromDeleteList(id));
			} else {
				dispatch(addToDeleteList(id));
			}
		} else {
			dispatch(setSelectMode(true));
			dispatch(addToDeleteList(id));
		}
	} */

	return (
		<View style={styles.main}>
			<IconButton
				style={styles.plus}
				icon={<Entypo name="plus" size={30} color="white" />}
			/>
			{!selectMode ? (
				<DateNavigator />
			) : (
				<View style={styles.header_divider}></View>
			)}
			<View
				style={[
					styles.subheader,
					{backgroundColor: !selectMode ? "black" : "#C0C0C0"}
				]}
			>
				<Text style={styles.subheader_text}>Total: S/. 980.00</Text>
			</View>
			<FlatList
				data={list}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({item}) => (
					<ExpenseRow
						id={item.id}
						costCenter={item.costCenter}
						category={item.category}
						place={item.place}
						paymentMethod={item.paymentMethod}
						amount={item.amount}
						onPress={onPress}
						//onLongPress={onLongPress}
					/>
				)}
			/>
		</View>
	);
};

export default ExpenseScreen;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: "white"
	},
	header_divider: {
		height: 45,
		backgroundColor: "gray"
	},
	plus: {
		position: "absolute",
		bottom: 40,
		right: 15,
		backgroundColor: "black",
		width: 55,
		height: 55,
		borderRadius: 55 / 2,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 1
	},
	subheader: {
		//backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12
	},
	subheader_text: {
		color: "white"
	},
	list: {
		flex: 1
	}
});
