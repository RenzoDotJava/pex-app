import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LoginScreen} from "../screens";
import {RootStackParamList} from "../types/navigation";
import {NavigationContainer} from "@react-navigation/native";
import Sidebar from "./sidebar";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator: React.FC = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Sidebar" component={Sidebar} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigator;
