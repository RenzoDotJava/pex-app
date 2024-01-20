import React, { useState } from 'react'
import { Keyboard, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment-timezone';
import { Button, IconButton, Input, Select } from '../../../ui'
import { SidebarDrawerParamList } from '../../../types/navigation';
import { theme } from '../../../styles';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setMode, setMonth, setYear, setDate, setYearMonth, setExpenses } from '../../../slices/expense';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useGetExpensesBetweenDates } from '../../../api/expense';

type NavigationProp = DrawerNavigationProp<
  SidebarDrawerParamList,
  'ExpenseNav'
>;

const selectorOptions: { value: 'daily' | 'monthly' | 'yearly' }[] = [
  { value: 'daily' },
  { value: 'monthly' },
  { value: 'yearly' }
]

const ConfigExpenseScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { mode, month, year, date, yearMonth } = useAppSelector((state) => state.expense);
  const [selectedMode, setSelectedMode] = useState(mode)
  const [selectedDate, setSelectedDate] = useState(date)
  const [selectedMonth, setSelectedMonth] = useState(month)
  const [selectedYearMonth, setSelectedYearMonth] = useState(yearMonth)
  const [selectedYear, setSelectedYear] = useState(year)
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation('global');

  moment.locale(i18n.language);

  const monthOptions = moment.months().map((month, index) => ({ name: month, id: index + 1 }))

  const { mutate, isLoading } = useGetExpensesBetweenDates({
    onSuccess: (data) => {
      generateExcel(data)
    },
    onError: (error) => {
      console.log(error.message);
    }
  });

  const { mutate: onConfirm, isLoading: isLoadingConfirm } = useGetExpensesBetweenDates({
    onSuccess: (data) => {
      if (selectedMode === 'daily') dispatch(setDate(selectedDate))
      else if (selectedMode === 'monthly') {
        dispatch(setMonth(selectedMonth))
        dispatch(setYearMonth(selectedYearMonth))
      }
      else dispatch(setYear(selectedYear))
      dispatch(setExpenses(data))
      dispatch(setMode(selectedMode))
      navigation.goBack()
    },
    onError: (error) => {
      console.log(error.message);
    }
  });

  const onChangeDate = (input: string, type: "day" | "month" | "year") => {
    const splitDate = selectedDate.split('-')
    const year = type === "year" ? input : splitDate[0]
    const month = type === "month" ? input : splitDate[1]
    let daysInMonth = moment(year + "-" + month, "YYYY-MM").daysInMonth()

    if (type === "year") {
      if (input.length > 4) return
      else if (input.length === 0) setSelectedDate(`-${splitDate[1]}-${splitDate[2]}`)
      else {
        let day = parseInt(splitDate[2]) > daysInMonth || splitDate[2] === "" ? daysInMonth : parseInt(splitDate[2])
        setSelectedDate(`${input}-${splitDate[1]}-${day.toString()}`)
      }
    } else if (type === "month") {
      let day = parseInt(splitDate[2]) > daysInMonth || splitDate[2] === "" ? daysInMonth : parseInt(splitDate[2])
      setSelectedDate(`${splitDate[0]}-${input}-${day.toString()}`)
    }
    else if (type === "day") {
      if (input.length > 2 || parseInt(input) > daysInMonth) return
      else if (input.length === 0) setSelectedDate(`${splitDate[0]}-${splitDate[1]}-`)
      else setSelectedDate(`${splitDate[0]}-${splitDate[1]}-${input}`)
    }
  }

  const onChangeYear = (value: string) => {
    if (value.length > 4) return
    else if (value.length === 0) selectedMode === 'monthly' ? setSelectedYearMonth(0) : setSelectedYear(0);
    else selectedMode === 'monthly' ? setSelectedYearMonth(parseInt(value)) : setSelectedYear(parseInt(value));
  }

  const setActualDate = () => {
    if (selectedMode === 'daily') setSelectedDate(moment(new Date()).format('YYYY-MM-DD'))
    else if (selectedMode === 'monthly') {
      setSelectedMonth(moment(new Date()).month() + 1)
      setSelectedYearMonth(moment(new Date()).year())
    }
    else setSelectedYear(moment(new Date()).year())
  }

  const getIsDisabled = () => {
    if (selectedMode === 'daily') {
      if (selectedDate.split('-')[0] === '' || selectedDate.split('-')[1] === '' || selectedDate.split('-')[2] === '') return true
      else return false
    }
    else if (selectedMode === 'monthly') {
      if (selectedMonth === 0 || selectedYearMonth < 2000 || selectedYearMonth > 2100) return true
      else return false
    }
    else if (selectedMode === 'yearly') {
      if (selectedYear < 2000 || selectedYearMonth > 2100) return true
      else return false
    }
  }

  const getExpensesList = (action: "confirm" | "generate" = "confirm") => {
    if (selectedMode === 'daily') {
      action === "generate" ? mutate({ startDate: selectedDate, endDate: selectedDate }) : onConfirm({ startDate: selectedDate, endDate: selectedDate })
    }
    else if (selectedMode === 'monthly') {
      let daysInMonth = moment(selectedYearMonth + "-" + selectedMonth, "YYYY-MM").daysInMonth()
      action === "generate" ? mutate({ startDate: `${selectedYearMonth}-${selectedMonth}-01`, endDate: `${selectedYearMonth}-${selectedMonth}-${daysInMonth.toString()}` }) : onConfirm({ startDate: `${selectedYearMonth}-${selectedMonth}-01`, endDate: `${selectedYearMonth}-${selectedMonth}-${daysInMonth.toString()}` })
    }
    else if (selectedMode === 'yearly') {
      action === "generate" ? mutate({ startDate: `${selectedYear}-01-01`, endDate: `${selectedYear}-12-31` }) : onConfirm({ startDate: `${selectedYear}-01-01`, endDate: `${selectedYear}-12-31` })
    }
  }

  const getExcelName = () => {
    if (selectedMode === 'daily') {
      return moment(selectedDate).format('DD-MM-YYYY')
    }
    else if (selectedMode === 'monthly') {
      return `${monthOptions.find((item) => item.id === selectedMonth)?.name}-${selectedYearMonth}`
    }
    else if (selectedMode === 'yearly') {
      return `${selectedYear}`
    }
  }

  const generateExcel = (expenses: any[]) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet([
      ["Fecha", "Centro de gasto", "Categoría", "Método de pago", "Lugar", "Monto"],
      ...expenses.map((expense) => [
        moment(expense.date).format('DD/MM/YYYY'),
        expense.expense_center.name,
        expense.category.name,
        expense.payment_method.name,
        expense.place.name,
        expense.amount
      ])
    ])

    XLSX.utils.book_append_sheet(wb, ws, "Expenses", true);

    const base64 = XLSX.write(wb, { type: 'base64' });
    const filename = FileSystem.documentDirectory + `pex-${getExcelName()}.xlsx`;
    FileSystem.writeAsStringAsync(filename, base64, { encoding: FileSystem.EncodingType.Base64 }).then(() => {
      Sharing.shareAsync(filename)
    })
  }

  return (
    <View style={styles.main}>
      <>
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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 5 }}>
                <View style={styles.selector}>
                  {selectorOptions.map((option, index) => (
                    <TouchableOpacity key={index} style={[styles.option, selectedMode === option.value && styles.option_selected]} onPress={() => setSelectedMode(option.value)}>
                      <Text style={{ fontSize: theme.fontSize["md"], color: selectedMode === option.value ? theme.color.secondary : 'black' }}>{t("expense.config." + option.value)}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity onPress={setActualDate}>
                  <Text style={{ fontWeight: 'bold', fontSize: theme.fontSize['md'] }}>Actual</Text>
                </TouchableOpacity>
              </View>
              {selectedMode === 'daily' &&
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20, paddingVertical: 20, paddingHorizontal: 20 }}>
                  <View style={{ flex: 1, gap: 10 }}>
                    <Text>{t("expense.config.day")}</Text>
                    <Input keyboardType="numeric" onChangeText={(val) => onChangeDate(val, 'day')} flexible value={selectedDate.split('-')[2]} />
                  </View>
                  <View style={{ flex: 1, gap: 10 }}>
                    <Text>{t("expense.config.month")}</Text>
                    <Select items={monthOptions} selected={monthOptions.find((item) => item.id === parseInt(selectedDate.split('-')[1]))} onChange={(val) => onChangeDate(val.toString(), 'month')} />
                  </View>
                  <View style={{ flex: 1, gap: 10 }}>
                    <Text>{t("expense.config.year")}</Text>
                    <Input keyboardType="numeric" onChangeText={(val) => onChangeDate(val, 'year')} flexible value={selectedDate.split('-')[0]} />
                  </View>
                </View>
              }
              {selectedMode === 'monthly' &&
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20, paddingVertical: 20, paddingHorizontal: 20 }}>
                  <View style={{ flex: 1, gap: 10 }}>
                    <Text>{t("expense.config.month")}</Text>
                    <Select items={monthOptions} selected={monthOptions.find((item) => item.id === selectedMonth)} onChange={(value) => setSelectedMonth(parseInt(value.toString()))} />
                  </View>
                  <View style={{ flex: 1, gap: 10 }}>
                    <Text>{t("expense.config.year")}</Text>
                    <Input keyboardType="numeric" onChangeText={onChangeYear} flexible value={selectedYearMonth.toString()} />
                  </View>
                </View>
              }
              {selectedMode === 'yearly' &&
                <View style={{ paddingHorizontal: 20, gap: 10, paddingVertical: 20 }}>
                  <Text>{t("expense.config.year")}</Text>
                  <Input keyboardType="numeric" onChangeText={onChangeYear} value={selectedYear.toString()} />
                </View>
              }
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20, gap: 10, paddingHorizontal: 20, paddingBottom: 50 }}>
              <Button text={t("options.cancel")} variant='outlined' flexible onPress={() => navigation.goBack()} />
              <Button text={t("options.confirm")} flexible onPress={getExpensesList} disabled={getIsDisabled()} loading={isLoading || isLoadingConfirm} />
              <IconButton
                style={styles.excel}
                icon={<FontAwesome name="file-excel-o" size={30} color={theme.color.secondary} />}
                disabled={getIsDisabled()}
                onPress={() => getExpensesList("generate")}
                loading={isLoading || isLoadingConfirm}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </>
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
  },
  excel: {
    backgroundColor: theme.color.primary,
    /* width: 55,
    height: 55, */
    borderRadius: 6,
    paddingHorizontal: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    /* justifyContent: 'space-between', */
    gap: 10,
  },
  option: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 8
  },
  option_selected: {
    backgroundColor: theme.color.primary,
  }
});