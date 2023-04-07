import "react-native-gesture-handler";
import {Provider} from "react-redux";
import Navigator from "./navigation";
import {store} from "./store";

export default function App() {
	return (
		<Provider store={store}>
			<Navigator />
		</Provider>
	);
}
