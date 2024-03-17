import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useMemo, useState} from 'react';
import {Calendar, CalendarList} from 'react-native-calendars';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {DateDataType} from '../../../types/calendar';
import {COLORS} from '../../../utils/colors';
import EventItem from './EventItem';
import Events from './Events';

const Calendars = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const {onRepeatItemPress, allEventsData, filterEvents} =
    useRootStore().calendarStore;

  const markedDates = useMemo(() => {
    return {
      [selectedDate]: {
        selected: true,
        selectedColor: COLORS.yellow,
        selectedTextColor: COLORS.black,
        dotColor: COLORS.yellow,
        marked: true,
      },
    };
  }, [selectedDate]);

  const selectDay = (data: DateDataType) => {
    filterEvents(data);
    setSelectedDate(data.dateString);
  };

  return (
    <RN.View style={styles.container}>
      <Calendar
        style={styles.calendar}
        onDayPress={day => selectDay(day)}
        markedDates={markedDates}
        theme={{
          calendarBackground: COLORS.transparent,
          dayTextColor: COLORS.white,
          textDisabledColor: COLORS.grey,
          backgroundColor: COLORS.transparent,
          selectedDayTextColor: COLORS.blue,
          selectedDotColor: COLORS.blue,
          monthTextColor: COLORS.white,
          textSectionTitleColor: COLORS.white,
        }}
      />
      <RN.View style={styles.events}>
        <Events />
      </RN.View>
    </RN.View>
  );
};

export default observer(Calendars);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: '100%',
    // flexDirection: 'row',
    // flexDirection: 'row',
  },
  calendar: {
    // height: '40%',
    // width: '30%',
    backgroundColor: 'transparent',
  },
  events: {
    width: '100%',
    height: '35%',
    marginVertical: 20,
  },
});
