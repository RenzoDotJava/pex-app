import {StyleProp, TouchableOpacity, ViewStyle} from "react-native";

type IconButtonProps = {
	icon: React.ReactNode;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
};

const IconButton: React.FC<IconButtonProps> = ({icon, onPress, style}) => {
	return (
		<TouchableOpacity style={style} onPress={onPress}>
			{icon}
		</TouchableOpacity>
	);
};

export default IconButton;
