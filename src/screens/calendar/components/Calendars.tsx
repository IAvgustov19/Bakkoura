import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import LottieContent from '../../../components/LottieContent/LottieContent';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {Lotties} from '../../../lotties/lottie';
import {APP_ROUTES} from '../../../navigation/routes';
import {CalendarDataType} from '../../../types/calendar';
import {COLORS} from '../../../utils/colors';
import {windowHeight} from '../../../utils/styles';
import CalendarComp from './CalendarComp';

type Props = {
  // calendarDatas?: CalendarDataType;
};

const Calendars: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const {months, getOneMonth, oneMonth, calendarData} =
    useRootStore().calendarStore;
  const {themeState} = useRootStore().personalAreaStore;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1);
  }, []);

  const selectMonth = (data?: Date | string) => {
    getOneMonth(data as never);
    navigation.navigate(APP_ROUTES.ONE_MONTH_AND_EVENTS as never);
  };

  const renderMonth = useCallback(() => {
    return loading ? (
      <RN.View style={styles.loading}>
        <ActivityIndicator size={'large'} />
      </RN.View>
    ) : (
      calendarData?.map((item, indexMonth) => {
        return (
          <RN.View style={styles.calendar} key={indexMonth}>
            <RN.Text
              style={[
                styles.year,
                {color: themeState.title},
              ]}>{`${item?.year}`}</RN.Text>
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
      })
    );
  }, [months, oneMonth, loading]);

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
    height: windowHeight - windowHeight / 5,
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
  loading: {
    width: '100%',
    height: windowHeight - windowHeight / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
