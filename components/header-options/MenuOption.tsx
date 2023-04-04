import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {SidebarDrawerParamList} from "../../types/navigation";

type NavigationProp = DrawerNavigationProp<SidebarDrawerParamList>;

const Menu: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();

	return (
		<TouchableOpacity onPress={() => navigation.openDrawer()}>
			<Ionicons name="menu" size={24} color="white" />
		</TouchableOpacity>
	);
};

export default Menu;
