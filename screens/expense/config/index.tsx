import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from '../../../ui'
import { SidebarDrawerParamList } from '../../../types/navigation';
import { theme } from '../../../styles';

type NavigationProp = DrawerNavigationProp<
  SidebarDrawerParamList,
  'ExpenseNav'
>;

const ConfigExpenseScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.main}>
      <View style={[styles.header, {
        marginTop:
          Platform.OS === 'android' ? StatusBar.currentHeight! + 25 : 25,
        paddingHorizontal: 15
      }]}>
        <IconButton
          style={styles.back}
          icon={<AntDesign name="close" size={30} color={theme.color.secondary} />}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  )
}

export default ConfigExpenseScreen;


const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.color.secondary
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  back: {
    backgroundColor: theme.color.primary,
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});