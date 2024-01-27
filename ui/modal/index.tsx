import {
	StyleSheet,
	Modal as ModalRN,
	View,
	Dimensions,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {theme} from '../../styles';
import type {ModalProps} from '../../types/ui';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Modal: React.FC<ModalProps> = ({
	visible,
	onRequestClose,
	children,
	title
}) => {
	return (
		<>
			<ModalRN
				animationType="fade"
				visible={visible}
				transparent
				onRequestClose={onRequestClose}
			>
				<TouchableWithoutFeedback onPress={onRequestClose}>
					<View style={styles.surface}>
						<TouchableWithoutFeedback>
							<View style={styles.modal}>
								<>
									<View style={styles.header}>
										<Text style={styles.title}>{title}</Text>
										<TouchableOpacity onPress={onRequestClose}>
											<Ionicons name="close-circle" size={26} color={theme.color.neutral.dark} />
										</TouchableOpacity>
									</View>
									<View style={styles.content}>{children}</View>
								</>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</ModalRN>
		</>
	);
};

export default Modal;

const styles = StyleSheet.create({
	surface: {
		position: 'relative',
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.30)'
	},
	modal: {
		width: windowWidth - 32,
		height: (1.2 * windowHeight) / 2,
		backgroundColor: theme.color.neutral.lightest,
		borderRadius: 16,
		padding: 16,
		position: 'absolute',
		top: windowHeight / 5,
		left: 16
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	title: {
		flex: 1,
		fontSize: theme.fontSize.xl,
		fontWeight: '500'
	},
	content: {
		flex: 1,
		marginVertical: 5
	}
});
