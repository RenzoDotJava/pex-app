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
import { setMode, setMonth, setYear, setDate, setYearMonth, setExpenses, setExpenseType } from '../../../slices/expense';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx-js-style';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useGetExpensesBetweenDates } from '../../../api/expense';
import { getCurrentDateToString, getDate } from '../../../utils';
import { ExpenseProps } from '../../../types/components';

type NavigationProp = DrawerNavigationProp<
  SidebarDrawerParamList,
  'ExpenseNav'
>;

const selectorOptions: { value: 'daily' | 'monthly' | 'yearly' }[] = [
  { value: 'daily' },
  { value: 'monthly' },
  /* { value: 'yearly' } */
]

const ConfigExpenseScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { mode, month, year, date, yearMonth, onlyMajor, expenseType } = useAppSelector((state) => state.expense);
  const [selectedMode, setSelectedMode] = useState(mode)
  const [selectedDate, setSelectedDate] = useState(date)
  const [selectedMonth, setSelectedMonth] = useState(month)
  const [selectedYearMonth, setSelectedYearMonth] = useState(yearMonth)
  const [selectedYear, setSelectedYear] = useState(year)
  const [expenseTypeFilter, setExpenseTypeFilter] = useState(expenseType)
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation('global');

  moment.locale(i18n.language);

  const monthOptions = moment.months().map((month, index) => ({ name: month, id: index + 1 }))

  const { mutate, isLoading } = useGetExpensesBetweenDates({
    onSuccess: (data: ExpenseProps[]) => {
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

      dispatch(setExpenseType(expenseTypeFilter))
      dispatch(setMode(selectedMode))
      dispatch(setExpenses(data))

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
    if (selectedMode === 'daily') setSelectedDate(getCurrentDateToString())
    else if (selectedMode === 'monthly') {
      setSelectedMonth(moment(getCurrentDateToString()).month() + 1)
      setSelectedYearMonth(moment(getCurrentDateToString()).year())
    }
    else setSelectedYear(moment(getCurrentDateToString()).year())
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
      action === "generate" ? mutate({ startDate: selectedDate, endDate: selectedDate, expenseType: expenseTypeFilter }) : onConfirm({ startDate: selectedDate, endDate: selectedDate, expenseType: expenseTypeFilter })
    }
    else if (selectedMode === 'monthly') {
      let daysInMonth = moment(selectedYearMonth + "-" + selectedMonth, "YYYY-MM").daysInMonth()
      action === "generate" ? mutate({ startDate: `${selectedYearMonth}-${selectedMonth}-01`, endDate: `${selectedYearMonth}-${selectedMonth}-${daysInMonth.toString()}`, expenseType: expenseTypeFilter }) : onConfirm({ startDate: `${selectedYearMonth}-${selectedMonth}-01`, endDate: `${selectedYearMonth}-${selectedMonth}-${daysInMonth.toString()}`, expenseType: expenseTypeFilter })
    }
    else if (selectedMode === 'yearly') {
      action === "generate" ? mutate({ startDate: `${selectedYear}-01-01`, endDate: `${selectedYear}-12-31`, expenseType: expenseTypeFilter }) : onConfirm({ startDate: `${selectedYear}-01-01`, endDate: `${selectedYear}-12-31`, expenseType: expenseTypeFilter })
    }
  }

  const getExcelName = () => {
    if (selectedMode === 'daily') {
      return moment(getDate(selectedDate)).format('DD-MM-YYYY')
    }
    else if (selectedMode === 'monthly') {
      return `${monthOptions.find((item) => item.id === selectedMonth)?.name}-${selectedYearMonth}`
    }
    else if (selectedMode === 'yearly') {
      return `${selectedYear}`
    }
  }

  const generateExcel = (expenses: ExpenseProps[]) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet([
      ["Fecha", "Centro de gasto", "Categoría", "Método de pago", "Lugar", "Monto", "Observación"],
      ...expenses.map((expense) => [
        moment(getDate(expense.date)).format('DD/MM/YYYY'),
        expense.expense_center.name,
        expense.category.name,
        { v: expense.payment_method.name, s: { fill: { fgColor: { rgb: expense.payment_method.color.replace('#', '') } } } },
        expense.place.name,
        expense.amount,
        expense.remark,
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
            Platform.OS === 'android' ? StatusBar.currentHeight! : 45,
          paddingHorizontal: 15
        }]}>
          <IconButton
            style={styles.back}
            icon={<AntDesign name="close" size={30} color={theme.color.neutral.lightest} />}
            onPress={() => navigation.goBack()}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <View style={[styles.option_nav, { marginBottom: 5 }]}>
                <View style={styles.selector}>
                  {selectorOptions.map((option, index) => (
                    <TouchableOpacity key={index} style={[styles.option, selectedMode === option.value && styles.option_selected]} onPress={() => setSelectedMode(option.value)}>
                      <Text style={{ fontSize: theme.fontSize.md, fontWeight: selectedMode === option.value ? 'normal' : '500', color: selectedMode === option.value ? theme.color.neutral.lightest : theme.color.neutral.dark }}>{t("expense.config." + option.value)}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity onPress={setActualDate} style={[styles.option, { backgroundColor: theme.color.primary.dark, borderColor: theme.color.primary.dark }]}>
                  <Text style={{ fontSize: theme.fontSize.md, color: theme.color.neutral.lightest }}>Actual</Text>
                </TouchableOpacity>
              </View>
              {selectedMode === 'daily' &&
                <View style={styles.date_form}>
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
                <View style={styles.date_form}>
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
              <View>
                <View style={[styles.option_nav, { marginBottom: 16 }]}>
                  <Text style={{ fontSize: theme.fontSize.lg, fontWeight: 'bold', color: theme.color.neutral.dark }}>Filtros</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: theme.fontSize.md, color: theme.color.neutral.dark, fontWeight: '500' }}>Tipo de gasto</Text>
                  <View>
                    <View style={styles.expense_type_container}>
                      <TouchableOpacity
                        style={[styles.expense_type_option, expenseTypeFilter === 'both' && styles.expense_type_selected]}
                        onPress={() => setExpenseTypeFilter('both')}
                      >
                        <Text style={[styles.expense_type_text, expenseTypeFilter === 'both' && styles.expense_type_selected_text]}>Ambos</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.expense_type_option, expenseTypeFilter === 'minor' && styles.expense_type_selected]}
                        onPress={() => setExpenseTypeFilter('minor')}
                      >
                        <Text style={[styles.expense_type_text, expenseTypeFilter === 'minor' && styles.expense_type_selected_text]}>Menor</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.expense_type_option, expenseTypeFilter === 'major' && styles.expense_type_selected]}
                        onPress={() => setExpenseTypeFilter('major')}
                      >
                        <Text style={[styles.expense_type_text, expenseTypeFilter === 'major' && styles.expense_type_selected_text]}>Mayor</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20, gap: 10, paddingHorizontal: 20, paddingBottom: 50 }}>
              <Button text={t("options.cancel")} variant='outlined' flexible onPress={() => navigation.goBack()} />
              <Button text={t("options.confirm")} flexible onPress={getExpensesList} disabled={getIsDisabled()} loading={isLoading || isLoadingConfirm} />
              <IconButton
                style={styles.excel}
                icon={<FontAwesome name="file-excel-o" size={30} color={theme.color.neutral.lightest} />}
                disabled={getIsDisabled()}
                onPress={() => getExpensesList("generate")}
                loading={isLoading || isLoadingConfirm}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </>
    </View >
  )
}

export default ConfigExpenseScreen;


const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.color.neutral.lightest
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  back: {
    backgroundColor: theme.color.primary.medium,
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  excel: {
    backgroundColor: '#45A05E',
    borderRadius: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  option_nav: {
    borderWidth: 1,
    borderColor: theme.color.neutral.light,
    backgroundColor: '#EDEDED',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date_form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 6,
    paddingHorizontal: 20
  },
  option: {
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: theme.color.neutral.light,
    backgroundColor: theme.color.neutral.lightest,
  },
  option_selected: {
    backgroundColor: theme.color.primary.dark,
    borderColor: theme.color.primary.dark,
  },
  expense_type_container: {
    flexDirection: 'row',
    gap: 8,
    /* borderWidth: 1, */
    /* borderRadius: 8, */
    /* borderColor: theme.color.neutral.dark */
  },
  expense_type_option: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.color.neutral.dark,
  },
  expense_type_selected: {
    backgroundColor: theme.color.primary.dark,
    borderColor: theme.color.primary.dark,
  },
  expense_type_text: {
    fontSize: theme.fontSize.md,
    color: theme.color.neutral.dark,
    fontWeight: '500'
  },
  expense_type_selected_text: {
    color: theme.color.neutral.lightest
  }
});