import { useState } from 'react';
import { Dimensions, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Calendar as CalendarRN, LocaleConfig } from 'react-native-calendars'; //https://github.com/wix/react-native-calendars
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';
import { CalendarProps } from '../../types/ui';
import { theme } from '../../styles';
import Button from '../button';
import { calendarLocales } from '../../locales';
import { getDate } from '../../utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**
 * @deprecated This components should not be used
 */
const Calendar: React.FC<CalendarProps> = ({ isOpen, onCancel, onConfirm, date }) => {
  const [selected, setSelected] = useState<string>(moment(getDate(date)).format('YYYY-MM-DD'));
  const { t, i18n } = useTranslation('global');

  LocaleConfig.locales['en'] = calendarLocales['en'];
  LocaleConfig.locales['es'] = calendarLocales['es'];

  LocaleConfig.defaultLocale = i18n.language;

  return (
    <Modal
      animationType="fade"
      visible={isOpen}
      transparent
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.surface}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <>
                <CalendarRN
                  onDayPress={day => { setSelected(day.dateString) }}
                  markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedColor: theme.color.primary.medium}
                  }}
                  theme={{
                    arrowColor: theme.color.primary.medium,
                  }}
                />
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20, flex: 1, gap: 10 }}>
                  <Button text={t("options.cancel")} variant='outlined' flexible onPress={onCancel} />
                  <Button text={t("options.confirm")} flexible onPress={() => { onConfirm && onConfirm(selected) }} />
                </View>
              </>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
export default Calendar;

const styles = StyleSheet.create({
  surface: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.30)'
  },
  modal: {
    width: windowWidth - 32,
    height: 'auto',
    backgroundColor: theme.color.neutral.lightest,
    borderRadius: 16,
    padding: 16,
    position: 'absolute',
    top: windowHeight / 5,
    left: 16,
    flex: 1,
    marginVertical: 5
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
});
