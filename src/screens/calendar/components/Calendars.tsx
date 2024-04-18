import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {APP_ROUTES} from '../../../navigation/routes';
import {CalendarDataType} from '../../../types/calendar';
import {COLORS} from '../../../utils/colors';
import {windowHeight} from '../../../utils/styles';
import CalendarComp from './CalendarComp';

type Props = {
  calendarDatas?: CalendarDataType;
};

const Calendars: React.FC<Props> = ({calendarDatas}) => {
  const navigation = useNavigation();
  const {months, getOneMonth, oneMonth} = useRootStore().calendarStore;

  const selectMonth = (data?: Date | string) => {
    getOneMonth(data as never);
    navigation.navigate(APP_ROUTES.ONE_MONTH_AND_EVENTS as never);
  };

  const renderMonth = useCallback(() => {
    return calendarDatas?.map((item, indexMonth) => {
      return (
        <RN.View style={styles.calendar} key={indexMonth}>
          <RN.Text style={styles.year}>{`${item?.year}`}</RN.Text>
          <RN.View style={styles.month}>
            {item.months?.map((month, index) => {
              return (
                <CalendarComp
                  key={index}
                  calendarWidth={'31.5%'}
                  date={month as never}
                  dayFontSize={10}
                  selectMonth={() => selectMonth(month)}
                  dateWidth={13}
                  dateHeight={15}
                  showWeekDays={false}
                  currentDateFontSize={18}
                  weekGap={5}
                />
              );
            })}
          </RN.View>
        </RN.View>
      );
    });
  }, [months, oneMonth]);

  return (
    <RN.View style={styles.container}>
      <RN.ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <RN.View style={styles.month}>{renderMonth()}</RN.View>
      </RN.ScrollView>
    </RN.View>
  );
};

export default observer(Calendars);

const styles = RN.StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollView: {
    height: windowHeight - windowHeight / 4,
  },
  calendar: {
    paddingBottom: 30,
  },
  month: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 10,
  },
  oneMonth: {
    width: '100%',
  },
  year: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 38,
    color: COLORS.white,
  },
});
