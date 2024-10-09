import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useMemo, useState, useCallback} from 'react';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import {months} from '../../constants/calendar';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import CalendarComp from './components/CalendarComp';
import Events from './components/Events';
import OneMonth from './components/OneMonth';

const OneMonthAndEvents = () => {
  const {oneMonth, cloneAllEventsData, allEventsData} =
    useRootStore().calendarStore;
  const navigation = useNavigation();

  const currentDay = new Date();
  const currentYear = new Date(oneMonth).getFullYear();
  const currentMonth = months[new Date(oneMonth).getMonth()];

  const renderEvents = useCallback(() => {
    return (
      <OneMonth
        date={currentDay}
        selectedDays={cloneAllEventsData.map(item => item.date)}
      />
    );
  }, [cloneAllEventsData, allEventsData]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={
              <ArrowLeftBack
                title={`${currentYear}`}
                onPress={() => navigation.goBack()}
                titleColor={COLORS.yellow}
              />
            }
            title={`${currentMonth} ${currentYear}`}
            rightItem={<Images.Svg.timerLogo />}
          />
          <RN.View style={styles.yearBottom}>
            <Images.Svg.calendarMonthBottom />
          </RN.View>
          <RN.View style={styles.calendar}>{renderEvents()}</RN.View>
          <RN.View style={styles.events}>
            <Events borderRaduis={0} isShowDate={true} leftLine={true} withoutDelete={true}/>
          </RN.View>
          <RN.View style={styles.createBtn}>
            <StartBtn
              icon={<Images.Svg.btnAddIcon />}
              elWidth={55}
              subWidth={70}
              primary
              textSize={30}
              onPress={() => navigation.navigate(APP_ROUTES.NEW_EVENT as never)}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(OneMonthAndEvents);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    gap: 5,
    height: '100%',
    alignItems: 'center',
  },
  calendar: {},
  calendarBox: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  yearBottom: {
    alignItems: 'center',
    marginBottom: 5,
  },
  events: {
    width: '100%',
    maxHeight: '40%',
  },
  createBtn: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 5,
    justifyContent: 'center',
    width: '100%',
  },
});
