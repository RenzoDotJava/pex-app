import {useCallback} from 'react';
import {FlatList} from 'react-native';
import {ListWrapper, ListRow} from '../../components';
import {currencies} from '../../utils/currency';
import type {CurrencyProps} from '../../types/components';

const CurrencyScreen = () => {

  const renderItem = useCallback(
    (item: CurrencyProps) => {
      return (
        <ListRow
          id={item.id}
          //onPress={() => changeLanguage(item.code, i18n)}
          name={item.name + ' (' + item.code + ')'}
          //isSelected={item.code === i18n.language}
          backgroundColor="transparent"
        />
      );
    },
    []
  );

  return (
    <ListWrapper>
      <FlatList
        data={currencies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => renderItem(item)}
      />
    </ListWrapper>
  );
};

export default CurrencyScreen;
