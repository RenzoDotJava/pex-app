import {useCallback} from 'react';
import {FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ListWrapper, ListRow} from '../../components';
import {langs, changeLanguage} from '../../utils/locales';
import type {LanguageProps} from '../../types/components';

const LanguagesScreen = () => {
	const {i18n} = useTranslation('global');

	const renderItem = useCallback(
		(item: LanguageProps) => {
			return (
				<ListRow
					id={item.id}
					onPress={() => changeLanguage(item.code, i18n)}
					name={item.name}
					isSelected={item.code === i18n.language}
					backgroundColor="transparent"
				/>
			);
		},
		[]
	);

	return (
		<ListWrapper>
			<FlatList
				data={langs}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({item}) => renderItem(item)}
			/>
		</ListWrapper>
	);
};

export default LanguagesScreen;
