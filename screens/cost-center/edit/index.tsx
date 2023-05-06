import {RouteProp, useRoute} from '@react-navigation/native';
import {CostCenterForm} from '../../../components';
import type {CostCenterParamList} from '../../../types/navigation';

type EditCostCenterScreenRouteProp = RouteProp<
	CostCenterParamList,
	'EditCostCenter'
>;

const EditCostCenterScreen: React.FC = () => {
	const route = useRoute<EditCostCenterScreenRouteProp>();
	const costCenter = route.params;

	return <CostCenterForm costCenter={costCenter} />;
};

export default EditCostCenterScreen;
