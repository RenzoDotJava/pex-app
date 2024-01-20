import { TouchableOpacity } from 'react-native';
import type { IconButtonProps } from '../../types/ui';

const IconButton: React.FC<IconButtonProps> = ({ icon, onPress, style, disabled = false, loading = false }) => {
	return (
		<TouchableOpacity style={[style, { opacity: disabled || loading ? 0.65 : 1 }]} onPress={onPress} disabled={disabled || loading}>
			{icon}
		</TouchableOpacity>
	);
};

export default IconButton;
