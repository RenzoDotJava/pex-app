import {TouchableOpacity} from 'react-native';
import type {IconButtonProps} from '../../types/ui';

const IconButton: React.FC<IconButtonProps> = ({icon, onPress, style}) => {
	return (
		<TouchableOpacity style={style} onPress={onPress}>
			{icon}
		</TouchableOpacity>
	);
};

export default IconButton;
