import React, {useCallback, useEffect, useMemo, useState} from 'react';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import {Images} from '../../assets';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import {Switch} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from '../../navigation/routes';
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import Events from './components/Events';
import Calendars from './components/Calendars';
import SimpleSwitch from '../../components/SimpleSwitch/SimpleSwitch';

const EventScreen = () => {
  const {calendarCurrentTime, setSwitchCalendar, switchCalendar} =
    useRootStore().calendarStore;
  const navigation = useNavigation();

  const toggleSwitch = () => {
    setTimeout(() => {
      setSwitchCalendar();
    }, 1);
  };

  const renderCalendar = useCallback(() => {
    if (switchCalendar) {
      return <Calendars />;
    } else {
      return <Events />;
    }
  }, [switchCalendar]);

  const title = useMemo(() => {
    let t = '';
    if (switchCalendar) {
      t = 'Calendar';
    } else {
      t = 'Events';
    }
    return t;
  }, [switchCalendar]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={
              <RN.Text style={styles.currentTime}>
                {calendarCurrentTime}
              </RN.Text>
            }
            title={title}
          />
          <RN.View style={styles.calendarBox}>{renderCalendar()}</RN.View>
          <RN.View style={styles.bottomMenu}>
            <RN.TouchableOpacity>
              <SimpleSwitch
                active={switchCalendar}
                width={60}
                topMenu={-10}
                paddingVertical={10}
                handlePress={toggleSwitch}
                icon={
                  switchCalendar ? (
                    <Images.Svg.calendarChangeIcon1 />
                  ) : (
                    <Images.Svg.calendarChangeIcon2 />
                  )
                }
              />
            </RN.TouchableOpacity>
            <StartBtn
              subWidth={60}
              elWidth={45}
              primary={true}
              text={'+'}
              onPress={() => navigation.navigate(APP_ROUTES.NEW_EVENT as never)}
            />
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(EventScreen);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  calendarBox: {
    width: '100%',
  },
  bottomMenu: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: '13%',
    paddingHorizontal: 10,
  },
  currentTime: {
    marginTop: 2,
    color: '#fff',
    fontSize: 14,
    width: 65,
  },
});
