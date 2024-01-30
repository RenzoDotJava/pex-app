import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {useAppSelector} from '../../store';
import type {NavigatorWrapperProps} from '../../types/components';
import { theme } from '../../styles';

const NavigatorWrapper: React.FC<NavigatorWrapperProps> = ({
	children,
	onLayout
}) => {
	const {isLoading} = useAppSelector((state) => state.navigation);

	return (
		<View style={{flex: 1, position: 'relative'}} onLayout={onLayout}>
			{isLoading && (
				<View style={styles.container}>
					<ActivityIndicator color={theme.color.neutral.lightest} size={60} />
					<Text style={{color: theme.color.neutral.lightest, marginTop: 10, fontSize: theme.fontSize.lg}}>
						Cargando
					</Text>
				</View>
			)}
			{children}
		</View>
	);
};

export default NavigatorWrapper;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'black',
		zIndex: 1,
		opacity: 0.4,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
